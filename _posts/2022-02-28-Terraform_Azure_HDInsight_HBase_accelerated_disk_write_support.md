---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Terraform - Azure HDInsight HBase accelerated disk write support
author: Satyajit Roy
date: 2022-02-28
image: "/assets/uploads/01-terraform-hdinsight.png"
cross_post_url: "https://awstip.com/terraform-azure-hdinsight-hbase-accelerated-disk-write-support-bfeed54aba28/"
toc: true
categories: [Infrastructure]
tags: [DevOps, SRE, Terraform, Azure]
---

There has been a long-standing request in the community to support **HBase Accelerated Disk Write** in the [`terraform-provider-azurerm`](https://github.com/hashicorp/terraform-provider-azurerm).

- **GitHub Issue**: [Accelerated disk write #9142](https://github.com/hashicorp/terraform-provider-azurerm/issues/9142)

According to Azure APIs, specific flags must be set to enable accelerated writes:

![Azure API Insight](https://cdn-images-1.medium.com/fit/c/800/95/1*K3_srEoFa-CCtXUMkuT-Ww.png)

### The Problem

In the Terraform provider's schema (specifically `hdinsight/schema.go`), the `HDInsightNodeDefinition` struct defines whether disks can be specified:

```go
type HDInsightNodeDefinition struct { 
  CanSpecifyInstanceCount  bool 
  MinInstanceCount         int 
  MaxInstanceCount         *int 
  CanSpecifyDisks          bool 
  MaxNumberOfDisksPerNode  *int 
  FixedMinInstanceCount    *int32 
  FixedTargetInstanceCount *int32 
  CanAutoScaleByCapacity   bool 
  CanAutoScaleOnSchedule   bool
}
```

However, the plugin code had a hardcoded definition for [`hdInsightHBaseClusterWorkerNodeDefinition`](https://github.com/hashicorp/terraform-provider-azurerm/blob/main/internal/services/hdinsight/hdinsight_hbase_cluster_resource.go#L29) that disabled disk specification:

```go
var hdInsightHBaseClusterWorkerNodeDefinition = HDInsightNodeDefinition{ 
  CanSpecifyInstanceCount: true, 
  MinInstanceCount:        1, 
  CanSpecifyDisks:         false, // This was the blocker
  CanAutoScaleOnSchedule:  true,
}
```

### The Solution

To enable this feature, I modified the definition to allow disks and set the required parameters:

```go
var hdInsightHBaseClusterWorkerNodeDefinitionWithAcceleratedWrites = HDInsightNodeDefinition{ 
  CanSpecifyInstanceCount: true, 
  MinInstanceCount:        1, 
  CanSpecifyDisks:         true, // Enabled
  CanAutoScaleOnSchedule:  true, 
  MaxNumberOfDisksPerNode: utils.Int(1),
}
```

I also added a new configuration parameter `enable_accelerated_writes` to the Terraform plugin schema to give users the choice:

```go
"enable_accelerated_writes": {    
  Type:     pluginsdk.TypeBool,    
  Optional: true,    
  ForceNew: true,  // The resource will be re-created if this changes
  Default:  false,   
},
```

Then, I implemented logic to decide which node definition to use based on that flag:

```go
func decideHDInsightNodeDefinition(enableWrites bool) hdInsightRoleDefinition {
  var hbaseRoles hdInsightRoleDefinition
  if enableWrites {
    hbaseRoles = hdInsightRoleDefinition{
      HeadNodeDef:      hdInsightHBaseClusterHeadNodeDefinition,
      WorkerNodeDef:    hdInsightHBaseClusterWorkerNodeDefinitionWithAcceleratedWrites,
      ZookeeperNodeDef: hdInsightHBaseClusterZookeeperNodeDefinition,
    }
  } else {
    hbaseRoles = hdInsightRoleDefinition{
      HeadNodeDef:      hdInsightHBaseClusterHeadNodeDefinition,
      WorkerNodeDef:    hdInsightHBaseClusterWorkerNodeDefinition,
      ZookeeperNodeDef: hdInsightHBaseClusterZookeeperNodeDefinition,
    }
  }
  return hbaseRoles
}
```

### Usage

After these changes, I was able to create an HBase Cluster with accelerated disk writes using standard Terraform HCL:

```hcl
resource "azurerm_hdinsight_hbase_cluster" "example" {
  name                      = "example-hdicluster"
  resource_group_name       = azurerm_resource_group.example.name
  location                  = azurerm_resource_group.example.location
  cluster_version           = "3.6"
  enable_accelerated_writes = true 
  tier                      = "Standard"

  component_version {}
  gateway {}
  storage_account {}
  roles {
    head_node {}
    worker_node {}
    zookeeper_node {}
  }
}
```

You can find my forked version of the Azure provider here: [tfproviders/terraform-provider-azurerm](https://github.com/tfproviders/terraform-provider-azurerm).

## Happy Terraforming!!
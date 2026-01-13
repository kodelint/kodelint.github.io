---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Terraform - Build Amazon Redis Cache from SNAPShots not are supported. Wait What!!
author: Satyajit Roy
date: 2022-02-16
image: "/assets/uploads/01-terraform-hdinsight.png"
cross_post_url: "https://awstip.com/terraform-azure-hdinsight-hbase-accelerated-disk-write-support-bfeed54aba28/"
toc: true
categories: [Infrastructure]
tags: [DevOps, SRE, Terraform]
---


One more dangling HDInsight request in the community to have support for **HBase Accelerated Disk Write** available in [terraform-provider-azurerm](https://github.com/hashicorp/terraform-provider-azurerm)

  1. **Accelerated disk write :****[GitHub Issue](https://github.com/hashicorp/terraform-provider-azurerm/issues/9142)**



As per **Azure** APIs following needs to be set to enable **accelerated writes**

![](https://cdn-images-1.medium.com/fit/c/800/95/1*K3_srEoFa-CCtXUMkuT-Ww.png) ✍︎

As per [terraform-provider-azurerm/hdinsight/schema.go](https://github.com/hashicorp/terraform-provider-azurerm/blob/main/internal/services/hdinsight/schema.go#L733) below is the `HDInsightNodeDefinition` and `CanSpecifyDisks` needs to be **true** to specify `diskPerNode`
    
    
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

However, terraform plugin code seems to have hardcoded definition for the [`hdInsightHadoopClusterWorkerNodeDefinition`](https://github.com/hashicorp/terraform-provider-azurerm/blob/main/internal/services/hdinsight/hdinsight_hbase_cluster_resource.go#L29)
    
    
    var hdInsightHBaseClusterWorkerNodeDefinition =      HDInsightNodeDefinition{ 
      CanSpecifyInstanceCount: true, 
      MinInstanceCount:        1, 
      **CanSpecifyDisks:         false,**
      CanAutoScaleOnSchedule:  true,
    }

To enable that I had to change the definition to [following](https://github.com/tfproviders/terraform-provider-azurerm/blob/main/internal/services/hdinsight/hdinsight_hbase_cluster_resource.go#L37):
    
    
    var hdInsightHBaseClusterWorkerNodeDefinitionWithAcceleratedWrites = HDInsightNodeDefinition{ 
      CanSpecifyInstanceCount: true, 
      MinInstanceCount:        1, 
      **CanSpecifyDisks:         true,**
      CanAutoScaleOnSchedule:  true, 
      MaxNumberOfDisksPerNode: utils.Int(1),
    }

At the same time I needed the original definition intact to provide a choice for the user. Now added **configuration parameter** [`enable_accelerated_writes`](https://github.com/tfproviders/terraform-provider-azurerm/blob/main/internal/services/hdinsight/hdinsight_hbase_cluster_resource.go#L82)` `to **enable** or **disable** accelerated writes for **terraform** plugin schema:
    
    
    "enable_accelerated_writes": {    
      Type:     pluginsdk.TypeBool,    
      Optional: true,    
      **ForceNew: true,**  **#The resource will be re-created if this changes**
      Default:  false,   
    },

If user provides the `enable_accelerated_writes = true` then `hdInsightHBaseClusterWorkerNodeDefinitionWithAcceleratedWrites` will be used otherwise default is `hdInsightHBaseClusterWorkerNodeDefinition` Checked [`decideHDInsightNodeDefinition`](https://github.com/tfproviders/terraform-provider-azurerm/blob/main/internal/services/hdinsight/hdinsight_hbase_cluster_resource.go#L472)
    
    
    func decideHDInsightNodeDefinition(enableWrites bool) hdInsightRoleDefinition {
    	
      var hbaseRoles hdInsightRoleDefinition
      if enableWrites {
        hbaseRoles = hdInsightRoleDefinition{
    		HeadNodeDef:    hdInsightHBaseClusterHeadNodeDefinition,
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

After all these changes in the plugin I was able to write my **terraform code** something like below, to create **HBase Cluster with accelerated disk writes** enabled.
    
    
    resource "azurerm_hdinsight_hbase_cluster" "example" {
      name                      = "example-hdicluster"
      resource_group_name       = azurerm_resource_group.example.name
      location                  = azurerm_resource_group.example.location
      cluster_version           = "3.6"
      **enable_accelerated_writes = true** 
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

Here is my forked terraform azure provider [tfproviders/terraform-proivder-azurerm](https://github.com/tfproviders/terraform-provider-azurerm).

## Happy Terraforming!!

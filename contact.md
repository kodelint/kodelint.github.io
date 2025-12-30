---
title: "Contact Me"
layout: "page"
---

<form name="CONTACT FORM" method="POST">
  <input type="hidden" name="form-name" value="CONTACT FORM" />
  
  <label for="name">Name</label>
  <input
    type="text"
    name="Name"
    id="name"
    placeholder="Your name"
    required
  />
  
  <label for="email">Email address</label>
  <input
    type="email"
    id="email"
    placeholder="Your email"
    name="Email"
    required
  />
  
  <label for="query">Your message</label>
  <textarea
    name="Message"
    id="query"
    rows="5"
    placeholder="What's on your mind?"
    required
  ></textarea>
  
  <button type="submit">Send Message</button>
</form>
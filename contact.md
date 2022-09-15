---
title: "Contact Me"
layout: "page"
---

<form name="CONTACT FORM" method="POST">
  <input type="hidden" name="form-name" value="CONTACT FORM" />
  <label for="name">Name</label>
  <input
    type="text"
    class="form-control"
    name="Name"
    id="name"
    placeholder="Your name"
  />
  <label for="email">Email address</label>
  <input
    type="email"
    class="form-control"
    id="email"
    placeholder="Your email"
    name="Email"
  />
  <label for="query">Your message</label>
  <br />
  <textarea
    name="Message"
    class="form-control"
    id="query"
    rows="3"
    placeholder="Your message ..."
    ></textarea>
  <br />
  <button type="submit" class="btn btn-danger btn-block">Send Message</button>
</form>

<style>
  label {
    font-weight: bold;
  }
  input {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    margin: 1rem 0rem;
    font-family: 'Roboto', sans-serif;
  }
  textarea {
    font-family: 'Roboto', sans-serif;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    padding: 0.5rem;
    margin: 1rem 0rem;
  }
  textarea,
  input {
    border: 1px solid gray;
    border-radius: 0px;
    padding: 10px;
  }
  textarea:focus,
  input:focus {
    outline-color: #777;
  }
  button {
    font-family: 'PT Sans Narrow', sans-serif;
    background: #666;
    color: #fff;
    border: none;
    padding: 10px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 4px;
    transition-duration: 0.4s;
    box-shadow: 0px 1px 2px #777;
    outline-color: transparent;
    transition-duration: 0.2s;
    border: 2px solid transparent;
  }
  button:hover {
    background: #888;
  }
  button:active {
    box-shadow: none;
    border: 2px solid #ffffff;
  }
</style>

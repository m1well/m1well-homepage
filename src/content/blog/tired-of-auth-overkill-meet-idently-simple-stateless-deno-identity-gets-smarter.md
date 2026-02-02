---
title:
  "Tired of Auth Overkill? Meet idently - Simple, Stateless Deno Identity Gets
  Smarter"
date: 2025-05-04
author: "Michael Wellner"
description:
  "At its heart, idently is my take on dead-simple, stateless authentication
  built with Deno. The core idea? Forget emails and passwords. Just give users a
  secret code. They send the code, they get a JSON Web Token (JWT) back."
featuredImage: "/images/blog_idently.png"
---

Ever find yourself needing to protect a small internal tool, an admin panel, or
a simple API? You reach for authentication solutions, and suddenly you're
wrestling with OAuth flows, complex SDKs, or heavyweight identity providers. It
often feels like bringing a bazooka to a knife fight. I've been there, and that
frustration is exactly why **idently** was born.

At its heart, **idently** is my take on dead-simple, stateless authentication
built with Deno. The core idea? Forget emails and passwords. Just give users a
secret code. They send the code, they get a JSON Web Token (JWT) back. Simple.
User data lives in a straightforward `dummy.json` file - easy to manage, easy to
understand.

### From Basic Need to Added Flexibility

Initially, **idently** focused purely on that core loop: code in, JWT out. But
as with any tool you start using, refinements become obvious. First, sending the
secret code directly in the request body felt a little… exposed. While HTTPS
encrypts the traffic, moving the code to a custom header (`Security-Code` by
default) felt like better hygiene. A small change, but a step in the right
direction.

Then came the token lifetimes. Sometimes you need a token that expires quickly
(like 3 minutes for a quick action), other times you need something
longer-lasting (maybe 5 hours for a work session). So, **idently** gained two
distinct endpoints: /token/short and /token/long, each issuing a JWT with a
configurable expiry time set via environment variables
(`TOKEN_SHORT_EXPIRES_IN_S`, `TOKEN_LONG_EXPIRES_IN_S`).

### Adding a Layer of Control: Audience Checks

The latest evolution addresses a common scenario: what if you have multiple
applications using **idently**, but you want to ensure a token generated for
accessing the 'AdminPanel' can't be used to hit the 'ReportingAPI'?

You create a file for each client you have and set a `clientName` in the file.
Now, when requesting a token via /token/short or /token/long, the client must
also send an `Source` specifying which application (source = 'audience') the
token is intended for.

// Example dummy.json file

```json
{
  "clientName": "dummy",
  "users": [
    {
      "code": "supersecretcode123",
      "systemRole": "admin",
      "claims": {
        "firstName": "John",
        "lastName": "Stone",
        "availableSince": "2025-04-02",
        "customProperty": 4711
      }
    }
  ]
}
```

**idently** checks if there is a JSON file for the requested source in the
header. If it's not a match, no token is issued. Furthermore, the /token/verify
endpoint now also requires the `Source` header to ensure the token being
verified was actually intended for that specific application. It adds a simple
but effective layer of authorization on top of the authentication.

### Tailoring Your Tokens: Custom Attributes and Claims

Beyond basic identification and audience, often your applications need a bit
more user-specific context directly within the JWT payload. Maybe it's a
specific role within an app, a user ID from another system, or even a budget
limit.  
**idently** makes this easy. You can just extend the `claims` section in the
JSON for each user. For example, you might add `specificRole` or `budget` or
just something else.

### Still Simple at Heart

Despite these additions, **idently** remains true to its core philosophy. It's
still stateless, configured primarily via environment variables, runs in a
minimal Docker container (~50MB), and leverages the power and simplicity of
Deno. Getting started locally is as easy as cloning the repo, copying
.env.example to .env, tweaking your settings, and running `deno task start`. An
example Kubernetes deployment file is also included.

### Is idently for You?

If you need robust, enterprise-grade authentication with complex user
management, **idently** isn't the right fit. But if you're looking for a
no-fuss, code-based authentication layer for your internal tools or simple APIs,
and appreciate the elegance of Deno, give **idently** a look.

Check out the project on GitHub:
[GitHub repository](https://github.com/m1well/idently)

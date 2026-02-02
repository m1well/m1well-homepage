---
title:
  "Tired of Auth Overkill? Meet idently - Simple, Stateless Deno Identity Gets
  Smarter"
date: 2025-05-04
author: "Michael Wellner"
description:
  "idently is stateless authentication with Deno that does one thing: a user
  sends a secret code, they get a JWT back. No email, no password, no session
  store. Since the first version it also has audience checks, two token
  lifetimes and custom claims."
featuredImage: "/images/blog_idently.png"
---

Protecting a small internal tool, an admin panel or a throwaway API usually ends
with you wrestling an OAuth flow, an SDK with its own opinions, or a whole
identity provider. It often feels like bringing a bazooka to a knife fight. That
is why I wrote idently.

idently is stateless authentication with Deno, and it does one thing: a user
sends a secret code, they get a JSON Web Token back. No email, no password, no
session store. The users live in a `dummy.json` file that you can read and edit
without a tool.

### What changed since the first version

The first version took the secret code from the request body. HTTPS encrypts it
either way, but a code in a body ends up in more logs and proxies than a code in
a header, so it moved to a custom header, `Security-Code` by default.

Token lifetimes were the other thing. Sometimes you want three minutes for a
single action, sometimes five hours for a work session. So there are two
endpoints now, /token/short and /token/long, and both expiries are set through
environment variables (`TOKEN_SHORT_EXPIRES_IN_S`, `TOKEN_LONG_EXPIRES_IN_S`).

### Audience checks

If two applications share an idently instance, a token minted for the
'AdminPanel' should not open the 'ReportingAPI'. So every client gets its own
file with a `clientName` in it, and every token request carries a `Source`
header naming the application the token is meant for. That source is the
audience.

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

idently looks for a JSON file matching the source in the header. No file, no
token. /token/verify wants the `Source` header too, so a token can only be
verified against the application it was issued for.

### Custom claims

Applications usually need more than an identity. A role inside that one app, a
user id from another system, a budget limit. Extend the `claims` section per
user in the JSON and it ends up in the JWT payload.

### Still simple

Stateless, configured through environment variables, runs in a Docker container
of around 50MB. Locally it is clone the repo, copy .env.example to .env, adjust
the settings, `deno task start`. An example Kubernetes deployment file is in
there as well.

If you need user management, groups and a real directory behind your auth,
idently is the wrong tool. For an internal tool or a small API where you just
want a code and a JWT, have a look at the
[GitHub repository](https://github.com/m1well/idently).

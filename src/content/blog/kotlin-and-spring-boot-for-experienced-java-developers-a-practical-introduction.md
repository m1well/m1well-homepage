---
title:
  "Kotlin and Spring Boot for experienced Java developers - A practical
  introduction"
date: 2025-08-18
author: "Michael Wellner"
description:
  "After eight years of shipping services in Java and Spring Boot, I took over a
  week to really try Kotlin. I expected Java but nicer. What I got is a language
  that feels familiar in all the right places and surprisingly opinionated where
  it matters."
featuredImage: "/images/blog_kotlin.png"
---

### Basics

The things that change your day immediately. Kotlin pushes you toward
immutability: `val` is an immutable reference, the equivalent of final, `var` is
mutable. With type inference you rarely write explicit types locally, and the
code gets tighter without turning cryptic.

Equality trips muscle memory. `==` is structural equality and calls equals,
`===` checks reference identity. That is what we usually meant in Java, but the
operators sit the other way round from what your fingers expect.

Collections are where half-remembered facts live. Kotlin separates read-only
interfaces from mutable ones: `listOf` gives you a read-only List,
`mutableListOf` a mutable one. Read-only here means no mutators in the type, not
a deeply immutable persistent structure. It lets you state intent at the type
level and avoid accidental changes, and that is all it promises.

Lambdas you will use constantly. A single-parameter lambda can use `it`
implicitly, which keeps pipelines compact as long as you do not stack them. With
trailing-lambda syntax, filter and map end up quieter than Java Streams.

Functions are declared with `fun`, and the language keeps nudging you toward
expressions. You catch yourself returning a value where you would have set a
mutable var, because it reads better.

```kotlin
val names = listOf("Ana", "Bob", "Clara")
val shortUpper = names.filter { it.length <= 4 }.map { it.uppercase() }
```

### Null-safety

Kotlin puts nullability into the type. `String` cannot be null, `String?` can,
and the compiler makes you handle absence at the point where it can happen. You
get the safe-call operator `?.` for "call only if non-null", the Elvis operator
`?:` for defaults, and `!!` for "I know this is not null, crash if I am wrong".

```kotlin
val domain = user.email?.substringAfter('@') ?: "unknown"
```

Java interop is where that gets thinner. Types coming from Java arrive as
platform types, and the compiler does not know their nullability. What works:
design your Kotlin APIs with honest nullability, annotate the Java code you own
with `@Nullable` and `@NonNull`, and lean on constructor injection so your
Spring beans are non-null by construction. That combination keeps most of your
code NPE-free without gymnastics.

### Default parameters

No telescoping constructors, no dozen overloads. You define sensible defaults
and the call site reads like documentation. When Java callers need your Kotlin
API, `@JvmOverloads` generates the Java-style overloads. Inside Kotlin, defaults
plus named arguments cover it 99% of the time.

### Scope functions

They are everywhere and easy to overdo. The mental model that stuck for me:

- `let` passes the value as it and returns the block's result, good for
  null-safety and small transformations.
- `apply` runs a block with this as the receiver and returns the receiver, good
  for configuration.
- `also` passes it and returns the receiver, use it for side effects like
  logging.
- `run` and `with` are `let` with `this`, returning the block result.

Used thoughtfully they read cleanly. Nest them recklessly and your teammates
will invent creative names for you. My rule of thumb: when a lambda grows beyond
a line or two, give the parameter a name and stop leaning on it.

```kotlin
val request = HttpRequest().apply {
   method = "POST"
   path = "/users"
}.also { logger.debug("Built request {}", it) }
```

### With Spring Boot

Almost everything works the same. MVC or WebFlux, Spring Data JPA, Spring
Security with OAuth2 or Keycloak: your existing knowledge carries straight
across. The differences are idiomatic and mostly in your favour.

Constructor injection becomes your default everywhere. Kotlin's primary
constructors make DI neat and self-documenting, and you will not miss Lombok.

```kotlin
@Service
class InvoiceService(
  private val repo: InvoiceRepository,
  private val clock: Clock
) {
  fun totalFor(customerId: Long) =
    repo.findByCustomerId(customerId).sumOf { it.amount }
}
```

For configuration, `@Value` is fine for simple scalars and clumsy for lists and
maps, and it costs you type-safe binding and metadata. Use a separate class
annotated with `@ConfigurationProperties` and bind through the constructor. It
reads cleanly in Kotlin, supports defaults and works with validation. That pays
off the first time you have to evolve the config surface.

JPA has a few gotchas, all of them fixable with plugins. Kotlin classes are
final by default, while Hibernate wants to proxy entities and wants a no-arg
constructor. The kotlin-spring and kotlin-jpa Gradle plugins open the right
classes and generate the constructors.

One rule I would not bend: entities are not data classes. Data classes generate
equals and hashCode from the properties, which fights JPA's identity model and
its proxies. Data classes for DTOs and API payloads, regular classes for
entities.

The security DSL reads nicely in Kotlin thanks to lambdas, but it is the same
Spring Security underneath. Your OAuth2 and Keycloak setup and your JWT story
carry over unchanged.

A few habits kept my Kotlin and Spring codebase pleasant to work in:

- Prefer explicit names over heroic chains. Introducing a local `val` to break a
  pipeline is fine.
- Use named arguments when a call would otherwise be ambiguous. Multiple
  booleans are the classic trap.
- Keep nullability honest at module boundaries. If something can be absent,
  model it as `T?` and let the compiler guide you.
- For Java interop, annotate thrown exceptions with `@Throws` when you expect
  Java callers to handle them, and expose defaults with `@JvmOverloads` when you
  publish Kotlin APIs to Java code.

### The verdict

Null-safety removes a whole class of bugs, and that is the win. Default
parameters and named arguments make APIs simpler to design and safer to call.
Data classes take the DTO boilerplate out. In Spring Boot specifically,
constructor injection plus type-safe configuration plus Jackson's Kotlin module
let you drop Lombok without growing ceremony somewhere else.

What to watch is readability. Kotlin hands you a lot of stylistic tools and the
slide from expressive to clever is short. Nested scope functions, dense
pipelines and `it` everywhere turn code into a puzzle. Agree on a style in the
team: when `apply` and when `let`, when to extract a local name, how many
chained operations are acceptable, how explicit you want to be with parameters.

If you write some TypeScript, a lot of this will feel familiar. Default
parameters, non-null types by default, and the same bias toward making the
common path simple. That makes the switch smoother for anyone hopping between
frontend and backend.

After a focused week, Kotlin earns its spot in a backend Spring project. It
reduces noise without magic, and the type system catches things my tests missed.
The framework side carries over unchanged, minus a couple of Kotlin-aware
plugins and the Jackson module. Take the obvious wins, null-safety, default
parameters and constructor injection, and treat the fancier stylistic tools as
optional.

---
title:
  "Kotlin and Spring Boot for experienced Java developers - A practical
  introduction"
date: 2025-08-18
author: "Michael Wellner"
description:
  "After eight years of shipping services in Java & Spring Boot, I took over a week
to really try Kotlin. I expected “Java but nicer.” What I found is a language
that feels familiar in all the right places and surprisingly opinionated where
it matters."
featuredImage: "/images/blog_kotlin.png"
---

### Basics

Let’s start with the basics that actually change your day-to-day. Kotlin pushes
you toward immutability: val is an immutable reference (like final), var is
mutable. With type inference - local code gets tighter without becoming cryptic.
Most of the time, you won’t write explicit types, and that’s fine. Equality is
another small but important difference: `==` means structural equality (calls
equals), while `===` checks reference identity. That matches what we usually
meant in Java, but the operators are different enough to trip muscle memory.

Collections are a frequent source of half-remembered “facts”. Kotlin
distinguishes read-only interfaces and mutable ones. `listOf` gives you a
read-only List, `mutableListOf` gives you a mutable list. Read-only here means
“no mutators in the type,” not “deeply immutable persistent structure.” It’s a
practical design that lets you communicate intent at the type level and avoid
accidental changes.

Then there are lambdas. You’ll use them a lot. Single-parameter lambdas can use
`it` implicitly, which makes pipelines compact but still readable when used
sparingly. Combined with trailing-lambda syntax, higher‑order functions like
filter/map feel less noisy than Java Streams.

Kotlin functions (methods in Java) are literally declared with `fun`, and the
language nudges you to write more expression-style code. You’ll notice yourself
returning values instead of setting mutable vars just because it reads better.

Here’s a tiny taste, keeping it simple:

```kotlin
val names = listOf("Ana", "Bob", "Clara")
val shortUpper = names.filter { it.length <= 4 }.map { it.uppercase() }
```

### Null-safety

Now, the headline feature: null-safety. Kotlin bakes nullability into types.
`String` is non-null while `String?` can be null. The compiler forces you to
deal with absence at the point where it can happen. You get the safe-call
operator `?.`. for “call only if non-null,” the Elvis operator `?:` for
defaults, and the nuclear option `!!` for “I know this isn’t null - crash if I’m
wrong.”

```kotlin
val domain = user.email?.substringAfter('@') ?: "unknown"
```

Interop with Java is where theory meets reality. Types from Java come in as
“platform types,” meaning the compiler doesn’t know their nullability. Practical
fix: design your Kotlin APIs with honest nullability, annotate Java code you own
with `@Nullable` / `@NonNull`, and lean on constructor injection so your Spring
beans are non-null by design. That combination keeps most of your code NPE-free
without gymnastics.

### Default parameters

Default parameters and named arguments are another big quality-of-life win. No
more telescoping constructors or a dozen overloads. You define sensible
defaults, and call sites read like documentation. When Java callers need to use
your Kotlin APIs, add `@JvmOverloads` to generate Java-style overloads. Within
Kotlin, defaults + named args are enough 99% of the time.

### Scope functions

Scope functions deserve a quick tour because they’re everywhere and easy to
overdo. The mental model that stuck for me:

- `let` passes the value as it and returns the block’s result - great for
  null-safety and small transformations.
- `apply` runs a block with this as the receiver and returns the receiver -
  perfect for configuration.
- `also` passes it and returns the receiver - use it for side effects like
  logging.
- `run` and `with` are like `let` but with `this`, returning the block result.
  Used thoughtfully, they make code read cleanly. Nest them recklessly and your
  teammates will invent creative names for you. My rule of thumb: when a lambda
  grows beyond a line or two, give the parameter a name; don’t lean on it
  everywhere.

A small, non-clever example:

```kotlin
val request = HttpRequest().apply {
   method = "POST"
   path = "/users"
}.also { logger.debug("Built request {}", it) }
```

### Spring Boot Apps

So how does all this play with Spring Boot? The reassuring answer is: almost
everything works the same. MVC or WebFlux, Spring Data JPA, Spring Security with
OAuth2 or Keycloak - you can bring your existing knowledge straight across. The
differences are idiomatic and mostly helpful.

Constructor injection becomes your default everywhere. Kotlin’s primary
constructors make DI neat and self-documenting, and you won’t miss Lombok.

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

Configuration is where Kotlin nudges you toward better patterns. `@Value` is
fine for simple scalars, but it gets clumsy for lists and maps, and you lose
type-safe binding and metadata. Prefer a separate class annotated with
`@ConfigurationProperties` and bind via the constructor. It reads cleanly in
Kotlin, supports defaults, and plays nicely with validation. You’ll thank
yourself later when you need to evolve the config surface.

JPA with Kotlin has a few gotchas you can neutralize with the right plugins.
Kotlin classes are final by default, but Hibernate needs to proxy entities and
likes a no-arg constructor. The kotlin-spring and kotlin-jpa Gradle plugins take
care of that by opening the right classes and generating no-arg constructors.
One more tip: Don’t make entities data classes. Data classes generate
equals/hashCode based on properties, which fights JPA’s identity model and
proxies. Use data classes for DTOs and API payloads; keep entities as regular
classes.

On the security side, the DSL reads nicely in Kotlin thanks to lambdas, but it’s
the same Spring Security under the hood. Your OAuth2/Keycloak setup and JWT
story carry over unchanged.

A few habits kept my Kotlin + Spring codebase pleasant to work in:

- Prefer explicit names over heroic chains - it’s fine to introduce a local
  `val` and break a pipeline.
- Use named arguments when a call would otherwise be ambiguous (multiple
  booleans are the classic trap).
- Keep nullability honest at module boundaries: if something can be absent,
  model it as `T?` and let the compiler guide you.
- For Java interop, annotate thrown exceptions with `@Throws` when you expect
  Java callers to handle them, and expose defaults with `@JvmOverloads` when
  you’re publishing Kotlin APIs to Java code.

### Closing thoughts

What feels better than Java? Null-safety is the obvious win - not because it’s
trendy, but because it removes a whole class of bugs. Default parameters and
named arguments make APIs simpler to design and safer to call. Data classes
obliterate DTO boilerplate. And in Spring Boot specifically, constructor
injection plus type-safe configuration and Jackson’s Kotlin module let you ditch
Lombok without growing ceremony.

What to watch for? Readability. Kotlin gives you many stylistic tools, and it’s
very easy to slide from expressive to clever. Nested scope functions, dense
pipelines, and overuse of it can turn code into a puzzle. Teams should agree on
a style: when to use `apply` vs `let`, when to extract a local name, how many
chained operations are acceptable, how explicit you want to be with parameters.
Used with restraint, Kotlin’s expressiveness is a superpower. Used
indiscriminately, you’ll find yourself missing Java’s “boring on purpose” vibe.

If you speak some TypeScript, Kotlin will feel cozy: default parameters,
non-null types by default, and a general “make the common path simple” ethos.
That familiarity makes the switch smoother, especially for folks who hop between
frontend and backend.

My verdict after a focused look at it: Kotlin earns its spot in backend Spring
projects. It reduces noise without magic, and the type system catches things
tests often miss. On the Spring side, your frameworks and mental model carry
straight over - add a couple of Kotlin-aware plugins and the Jackson module, and
you’re in business. Grab the obvious wins - null-safety, default parameters,
constructor injection - and treat the fancier stylistic tools as just that:
tools. Keep readability as the north star, and Kotlin gives you less ceremony,
more intent, and fewer late-night NPE hunts.

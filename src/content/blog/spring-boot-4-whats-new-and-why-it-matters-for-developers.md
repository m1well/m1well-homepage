---
title: "Spring Boot 4 - What’s New and Why It Matters for Developers"
date: 2025-11-08
author: "Michael Wellner"
description:
  "Spring Boot 4 (GA expected in November 2025) is built on top of the new
  Spring Framework 7 - and it’s more than a version bump. This release is a
  structural upgrade that modernizes how Spring applications are built,
  configured, and deployed. For developers running Java applications in
  production today, this version delivers meaningful improvements in startup
  performance, modularity, and developer experience."
featuredImage: "/images/blog_spring_boot.png"
---

Spring Boot 4 (GA expected in November 2025) is built on top of the new Spring
Framework 7 - and it’s more than a version bump. This release is a structural
upgrade that modernizes how Spring applications are built, configured, and
deployed. For developers running Java applications in production today, this
version delivers meaningful improvements in startup performance, modularity, and
developer experience.

## A Modern Java Baseline and Virtual Threads

Spring Boot 4 now requires Java 17+, with strong recommendations for Java 21
or 25. This unlocks new JVM features like virtual threads (Project Loom), sealed
classes, and record patterns.

Enable virtual‑thread execution simply with:
`spring.threads.virtual.enabled=true`

The practical result: high‑throughput microservices that handle thousands of
concurrent requests with minimal memory overhead - no complex thread pooling
required.

Support for GraalVM 24 makes native image builds faster and leaner as well. The
improved AOT processing means near‑instant startup times and reduced memory
use - perfect for Kubernetes or serverless environments.

## Jakarta EE 11 and Library Upgrades

Spring Boot 4 fully aligns with Jakarta EE 11, officially retiring the old
javax.\* packages.

This brings modernized APIs and containers:

- Servlet 6.1
- JPA 3.2 / Hibernate 7.0
- Bean Validation 3.1 Migrating is straightforward: just replace `javax._`
  imports with their `jakarta._` equivalents and verify that third‑party
  dependencies are Jakarta‑ready.

## Leaner Autoconfiguration Through Modularization

Spring Boot’s internals have been refactored into smaller, focused modules.
Previously, many core libraries and auto‑configurations were bundled together.
In Spring Boot 4, they’re now split into fine‑grained modules that can be
selectively processed - especially during AOT or native compilation.

What this means for you:

- Faster startup and smaller classpaths
- Cleaner dependency management
- Easier maintenance for teams contributing custom auto‑configs
- As a developer using the standard starter artifacts, you don’t need to change
  anything - the improvements happen transparently.

## Smarter Configuration and Metadata

Configuration properties get a big boost. The new
`@ConfigurationPropertiesSource` ensures that metadata is fully generated even
when configuration classes live in separate modules.

Record‑based config classes are first‑class citizens now:

```java
@ConfigurationProperties("app.payment")
public record PaymentProperties(String provider, int timeout) {}
```

This design improves validation, readability, and IDE completion while reducing
configuration boilerplate.

## Observability Built In: Micrometer 2 + OpenTelemetry

Spring Boot 4 adopts Micrometer 2 and native OpenTelemetry integration, unifying
metrics, logs, and traces under a single telemetry model.

For anyone deploying on Kubernetes, this means fewer moving parts: export
metrics to Prometheus, visualize with Grafana, trace calls with Zipkin - all
consistent and standardized without heavy manual setup.

## Declarative HTTP Clients

Spring Boot now introduces declarative HTTP interfaces, inspired by Feign but
fully integrated into the Spring ecosystem.

```java
@HttpExchange("https://api.example.com")
public interface TodoClient {

  @GetExchange("/todos/{id}")
  Todo getTodoById(@PathVariable long id);

}
```

Easily register the client with:

```java
@Configuration
@ImportHttpServices(TodoClient.class)
class ClientsConfig {}
```

Spring automatically handles instantiation, serialization, retries, and
observability - zero boilerplate REST code.

## Elegant API Versioning

API versioning finally becomes a first‑class feature. You can now define
versions right in your controller mappings:

```java
@GetMapping(value = "/users", version = "2")
public List<User> getUsersV2() { ... }
```

Versions can be resolved by path segment, query parameter, media type, or
header. No custom interceptors or route hacks needed - versioning is consistent
and framework‑managed.

## Built‑In Resilience and Concurrency Control

Spring Framework 7 introduces native resilience annotations. Enable them via
`@EnableResilientMethods`:

```java
@Service
@EnableResilientMethods
public class PaymentService {

  @Retryable(maxAttempts = 3, delay = 100)
  @ConcurrencyLimit(2)
  public void processPayment(String paymentId) {
    // retry logic and concurrency limit
  }

}
```

These built‑ins make retry and backoff control feel natural - no external
library required.

## Testing and Developer Experience

Spring Boot 4 improves both test speed and infrastructure handling:

- Built‑in Testcontainers integration: `spring.testcontainers.enabled=true`
  Databases or services now start automatically for tests and shut down
  gracefully.

- RestTestClient: a fluent, expressive client for testing REST endpoints.
  Perfect for integration or smoke tests without pulling in a reactive stack.

Combined with smarter test‑context caching, these changes make large test suites
faster and more predictable.

## Security and Ecosystem Alignments

Security lands on Spring Security 7, bringing:

- Better OAuth 2.2 / OIDC integration
- Updated crypto defaults
- Simplified configuration APIs

## Migration Checklist

Before upgrading:

1. Move all code to Java 17+ (preferably 21 or 25)
2. Replace javax imports with jakarta equivalents
3. Drop XML configs in favor of Java‑based configuration
4. Update to JUnit 5 and Jackson 3.x
5. Review GraalVM hints if you build native images

| Deprecated     | Replacement            |
| -------------- | ---------------------- |
| `javax.*`      | `jakarta.*`            |
| Jackson 2.x    | Jackson 3.x            |
| JUnit 4        | JUnit 5                |
| XML MVC config | Java/Kotlin config     |
| `spring-jcl`   | Apache Commons Logging |

Nothing mission‑critical, but each cleanup contributes to a more modern
baseline.

Spring Boot 3.5 remains supported until June 2026, giving teams plenty of time
to adapt.

## Final Thoughts

Spring Boot 4 rethinks the framework from the ground up while staying true to
its core principle - convention over configuration. From virtual threads to
modular auto‑configs and native resilience, it’s designed for the next decade of
Java development. If you’ve been holding off on modernization, Spring Boot 4
gives you every reason to start.

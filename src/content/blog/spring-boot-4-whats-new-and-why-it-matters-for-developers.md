---
title: "Spring Boot 4 - What's New and Why It Matters for Developers"
date: 2025-11-08
author: "Michael Wellner"
description:
  "Java 17 as the floor with virtual threads on top, Jakarta EE 11, modular
  autoconfiguration, and declarative HTTP clients, API versioning and retries
  moving out of a library and into the framework. With the migration checklist."
featuredImage: "/images/blog_spring_boot.png"
---

Spring Boot 4 (GA expected in November 2025) is built on the new Spring
Framework 7. It changes more than the usual release: the Java baseline moves up,
the internals are split into smaller modules, and a few things that used to need
an extra library now ship with the framework.

## A modern Java baseline and virtual threads

Spring Boot 4 requires Java 17+, with a strong recommendation for Java 21 or 25.
That opens up virtual threads (Project Loom), sealed classes and record
patterns.

Virtual-thread execution is one property: `spring.threads.virtual.enabled=true`

For a high-throughput microservice that means thousands of concurrent requests
without the memory overhead, and without hand-tuned thread pools.

GraalVM 24 support makes native image builds faster and leaner. The improved AOT
processing cuts startup close to instant and reduces memory use, which is what
you want on Kubernetes or in a serverless runtime.

## Jakarta EE 11 and library upgrades

Spring Boot 4 aligns with Jakarta EE 11 and retires the old javax packages for
good. That brings:

- Servlet 6.1
- JPA 3.2 / Hibernate 7.0
- Bean Validation 3.1

The migration itself is mechanical: replace `javax.*` imports with their
`jakarta.*` equivalents and check that your third-party dependencies are
Jakarta-ready.

## Leaner autoconfiguration through modularization

Spring Boot's internals have been refactored into smaller, focused modules.
Before, many core libraries and auto-configurations came bundled together. Now
they are fine-grained enough to be processed selectively, which matters during
AOT and native compilation.

That gives you faster startup, smaller classpaths, cleaner dependency management
and less maintenance work if your team contributes custom auto-configs. If you
use the standard starter artifacts, you change nothing and get the improvements
anyway.

## Configuration and metadata

The new `@ConfigurationPropertiesSource` generates metadata even when the
configuration classes live in a separate module.

Record-based config classes work properly now:

```java
@ConfigurationProperties("app.payment")
public record PaymentProperties(String provider, int timeout) {}
```

Less boilerplate, and validation and IDE completion both work off the record.

## Observability: Micrometer 2 and OpenTelemetry

Spring Boot 4 adopts Micrometer 2 with native OpenTelemetry integration, so
metrics, logs and traces sit under one telemetry model.

On Kubernetes that means fewer moving parts: metrics to Prometheus, dashboards
in Grafana, traces in Zipkin, without the manual wiring each of those used to
need.

## Declarative HTTP clients

Declarative HTTP interfaces, the Feign idea, built into Spring:

```java
@HttpExchange("https://api.example.com")
public interface TodoClient {

  @GetExchange("/todos/{id}")
  Todo getTodoById(@PathVariable long id);

}
```

Register the client with:

```java
@Configuration
@ImportHttpServices(TodoClient.class)
class ClientsConfig {}
```

Spring handles instantiation, serialization, retries and observability from
there.

## API versioning

Versions go straight into the controller mapping:

```java
@GetMapping(value = "/users", version = "2")
public List<User> getUsersV2() { ... }
```

They can be resolved by path segment, query parameter, media type or header.
That replaces the custom interceptors and route hacks most projects had written
themselves.

## Resilience and concurrency control

Spring Framework 7 brings native resilience annotations, switched on with
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

Retry and backoff without pulling in an external library.

## Testing and developer experience

Testcontainers integration is built in via `spring.testcontainers.enabled=true`.
Databases and services start automatically for tests and shut down gracefully
afterwards.

RestTestClient is a fluent client for testing REST endpoints, useful for
integration or smoke tests when you do not want a reactive stack in the
classpath for it.

Together with smarter test-context caching, large suites get faster and more
predictable.

## Security

Security moves to Spring Security 7 with better OAuth 2.2 and OIDC integration,
updated crypto defaults and simplified configuration APIs.

## Migration checklist

1. Move all code to Java 17+, preferably 21 or 25
2. Replace javax imports with jakarta equivalents
3. Drop XML configs in favor of Java-based configuration
4. Update to JUnit 5 and Jackson 3.x
5. Review GraalVM hints if you build native images

| Deprecated     | Replacement            |
| -------------- | ---------------------- |
| `javax.*`      | `jakarta.*`            |
| Jackson 2.x    | Jackson 3.x            |
| JUnit 4        | JUnit 5                |
| XML MVC config | Java/Kotlin config     |
| `spring-jcl`   | Apache Commons Logging |

None of it is dramatic, and Spring Boot 3.5 stays supported until June 2026, so
there is time to do it properly.

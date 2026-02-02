---
title: "Data-Oriented Programming in Java - More Data, Less Magic"
date: 2025-06-14
author: "Michael Wellner"
description:
  "Data-Oriented Programming models data as immutable structures and keeps
  behavior in services. With record, sealed interface and pattern matching, Java
  21 makes that idiomatic instead of a workaround. Worked through on payment
  methods, plus where entities do not fit."
featuredImage: null
---

There are already a few blog posts on this, and I still never took the time to
properly look at Data-Oriented Programming. It is one of those concepts that
sounds familiar enough that you nod and move on. Applying it deliberately in
Java changed how I model things.

Most of us have spent years writing `order.pay()` and `user.activate()`. DOP
goes the other way. It sounds like functional-fanboy talk until you try it with
what modern Java gives you. Below: what it is, where it differs from OOP, and
how it sits next to domain models, entities and DTOs.

### What is Data-Oriented Programming?

Data is data, behavior is behavior. OOP bundles both inside objects, the fat
object everybody has met. DOP separates them on purpose: you model your domain
as clean immutable data structures and process them explicitly in functions or
services.

```java
// OOP-style:
order.pay();

// DOP-style:
PaymentService.pay(order);
```

Your data is transparent that way. You can log it, validate it, test it and
transform it, and nothing hides side effects inside a method you cannot see
into.

### Core principles

- A data type describes the structure of the data and nothing else.
- Immutability is the default. No setters, no internal state changes.
- Behavior lives outside, in pure functions or services.
- Sum types instead of inheritance.
- Data stays open, not buried behind getters and setters.

### Java's toolkit: record, sealed interface and pattern matching

#### `record`

Since Java 16, records are a concise way to declare immutable data classes:

```java
record User(String name, int age) {}
```

That is a final class with the given fields plus constructor, equals, hashCode
and toString, all generated, all immutable.

#### `sealed interface`

Java 17 and up lets you restrict which classes may implement an interface, which
is what you need for sum types:

```java
sealed interface PaymentMethod permits CreditCard, PayPal, Invoice {}
```

#### Pattern matching for `switch`

Java 21 brings exhaustive, type-safe pattern matching, so you deconstruct and
match on types declaratively:

```java
switch (payment) {
  case CreditCard cc -> System.out.println("Using card: " + cc.cardNumber());
  case PayPal pp -> System.out.println("Paying via PayPal: " + pp.email());
  case Invoice inv -> System.out.println("Invoice: " + inv.invoiceNumber());
}
```

If all subtypes come from a sealed interface, the compiler knows the hierarchy
is complete. No default case, and a compile error the moment you miss one.

### A real example: payment methods

A checkout that supports credit card, PayPal and invoice, modelled DOP style:

```java
sealed interface PaymentMethod permits CreditCard, PayPal, Invoice {}

record CreditCard(String cardNumber, String holder, YearMonth expiry) implements PaymentMethod {}
record PayPal(String email) implements PaymentMethod {}
record Invoice(String invoiceNumber, LocalDate dueDate) implements PaymentMethod {}
```

No behavior, no setters, no base classes. Now the fees per method:

```java
class FeeCalculator {
  public static BigDecimal calculate(PaymentMethod method, BigDecimal amount) {
    return switch (method) {
      case CreditCard cc -> amount.multiply(BigDecimal.valueOf(0.025)); // 2.5%
      case PayPal pp -> amount.multiply(BigDecimal.valueOf(0.03));      // 3.0%
      case Invoice inv -> BigDecimal.ZERO;                              // no fee
    };
  }
}
```

### Validating the payment method

```java
class PaymentValidator {
  public static List<String> validate(PaymentMethod method) {
    return switch (method) {
      case CreditCard cc -> {
        List<String> errors = new ArrayList<>();
        if (cc.cardNumber().length() != 16) {
          errors.add("Card number must be 16 digits");
        }
        if (cc.expiry().isBefore(YearMonth.now())) {
          errors.add("Card is expired");
        }
        yield errors;
      }
      case PayPal pp -> {
        if (!pp.email().contains("@")) {
          yield List.of("Invalid PayPal email address");
        } else {
          yield List.of();
        }
      }
      case Invoice inv -> {
        if (inv.dueDate().isBefore(LocalDate.now())) {
          yield List.of("Invoice due date is in the past");
        } else {
          yield List.of();
        }
      }
    };
  }
}
```

### Putting it together

```java
class PaymentService {
  public void processPayment(PaymentMethod method, BigDecimal amount) {
    var errors = PaymentValidator.validate(method);
    if (!errors.isEmpty()) {
      throw new IllegalArgumentException("Invalid payment method: " + String.join(", ", errors));
    }

    var fee = FeeCalculator.calculate(method, amount);
    System.out.printf("Processing %s payment. Fee: %.2f EUR%n",
      method.getClass().getSimpleName(), fee);
  }
}
```

### What about domain, entities and DTOs?

In a Spring Boot codebase this still has its place, mostly in how you split
responsibilities.

DTOs are the easy one. Flat, serializable carriers between layers or across
service boundaries, which is exactly what a record is for.

Domain models often work as records too, at least value objects and the simpler
types, especially where they have to be immutable and side-effect free. The core
logic then lives in services or use cases.

Entities are where it stops. A lightweight one might survive as a record, but
the moment persistence shows up, with JPA annotations, lazy loading and
@OneToMany relations, a record is the wrong shape. Entities want mutability,
proxies and a no-arg constructor, and a record gives you none of the three. Use
regular classes there, and separate logic from data where you still can.

### Takeaways

- DOP refines how you model. It does not replace OOP.
- `record`, `sealed interface` and pattern matching are what make this idiomatic
  in Java. Without them you would be building it by hand.
- What you get out of it: predictable models, easier testing and logging, less
  coupling and fewer side effects.

Next time you are writing a `User` class with 12 getters, 12 setters and 5 state
mutation methods, stop and ask what it would look like as a `record` with the
logic in a service.

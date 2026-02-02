---
title: "Data-Oriented Programming in Java - More Data, Less Magic"
date: 2025-06-14
author: "Michael Wellner"
description:
  "Data-Oriented Programming in Java promotes modeling data as immutable
  structures and separating behavior into services. With Java's record, sealed
  interface, and pattern matching, this approach becomes clean and powerful -
  enhancing readability, testability, and domain clarity compared to traditional
  object-oriented design."
featuredImage: null
---

Yeah, sure - there are already a few blog posts out there on this topic. But
honestly, I (and I suspect many others) have never really taken the time to
seriously dig into Data-Oriented Programming (DOP). It's one of those concepts
that sounds familiar, maybe even obvious, but once you start applying it
deliberately - especially in Java - it opens up a whole new way of thinking
about code.

While many of us have spent years coding in a good old object-oriented way
(order.pay(), user.activate(), etc.), a new concept has been gaining traction
lately: **Data-Oriented Programming (DOP)**. It might sound like
functional-fanboy buzz or a new trend, but it's actually a very practical and
clean way of thinking - especially with the features modern Java offers.

In this article, we'll explore what DOP is all about, how it's different from
OOP, and why Java (from version 21 onward) is a great fit for it. We'll walk
through real examples (like payment methods), see how to model and process data,
and briefly touch on how this approach fits with concepts like Domain, Entity,
and DTO. Sound good? Let's go.

### What is Data-Oriented Programming?

Put simply: **Data is data, behavior is behavior!**  
Unlike OOP, where data and behavior are bundled inside objects (the infamous
"fat object"), DOP deliberately separates them. You model your domain as clean,
immutable data structures and process these structures explicitly using
functions or services.

A quick example:

```java
// OOP-style:
order.pay();

// DOP-style:
PaymentService.pay(order);
```

Why is this better? Because your data is transparent, easy to log, validate,
test, and transform - and you avoid hidden side effects in opaque methods.

### Core Principles of DOP

- **Separate data from behavior**: A data type should _only_ describe the
  structure of the data.
- **Immutability is the default**: No setters, no internal state changes, no
  surprises.
- **Behavior is externalized**: Write pure functions or services that operate on
  the data.
- **Avoid inheritance**: Favor composition and type hierarchies using sum types.
- **Data is open and transparent**: Avoid hiding data behind getters/setters.

With modern Java, this approach is now both clean and idiomatic.

### Java's Toolkit for DOP: record, sealed interface, and Pattern Matching

#### `record`

Since Java 16, records provide a concise way to declare immutable data classes:
This creates a final class with the given fields, constructor, equals, hashCode,
toString - all auto-generated and immutable.

```java
record User(String name, int age) {}
```

#### `sealed interface`

Introduced in Java 17+, this allows you to restrict which classes implement an
interface - perfect for modeling sum types:

```java
sealed interface PaymentMethod permits CreditCard, PayPal, Invoice {}
```

#### Pattern Matching for `switch`

Java 21 introduces exhaustive and type-safe pattern matching: This allows you to
_deconstruct_ and match on types in a readable and declarative way. What's
especially nice here: if you've modeled all subtypes using a sealed interface,
the compiler knows the type hierarchy is complete. That means you don't need a
default case AND if you miss one, you'll get a compile error. It's safe and
self-documenting.

```java
switch (payment) {
  case CreditCard cc -> System.out.println("Using card: " + cc.cardNumber());
  case PayPal pp -> System.out.println("Paying via PayPal: " + pp.email());
  case Invoice inv -> System.out.println("Invoice: " + inv.invoiceNumber());
}
```

### Real Example: Modeling Payment Methods

Let's say you're building a checkout system that supports multiple payment
methods: credit card, PayPal, and invoice. Here's how you'd model this in a DOP
style:

```java
sealed interface PaymentMethod permits CreditCard, PayPal, Invoice {}

record CreditCard(String cardNumber, String holder, YearMonth expiry) implements PaymentMethod {}
record PayPal(String email) implements PaymentMethod {}
record Invoice(String invoiceNumber, LocalDate dueDate) implements PaymentMethod {}
```

Notice: no behavior, no setters, no base classes - just clean and focused data
types. Now let's calculate fees depending on the payment method:

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

### Validating the Payment Method

Let's implement a validator that checks the validity of each method:

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

### Putting It Together

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

This is DOP in action: pure data, clean processing, and full transparency.

### What About Domain, Entities, and DTOs?

In the context of Spring Boot, Data-Oriented Programming can still play an
important role - especially in the way we structure and isolate
responsibilities:

- **DTOs:** These are a perfect fit for record. They're designed to be flat,
  serializable data carriers for communication between layers or across service
  boundaries.
- **Domain Models:** You can often model value objects or simpler domain types
  as records - especially when they are or have to be immutable and side-effect
  free. Core domain logic can then live in services or use cases.
- **Entities:** This is where it gets trickier. While some lightweight entities
  might work as record, the moment you introduce persistence concerns-like JPA
  annotations, lazy loading, @OneToMany relations—record becomes a poor fit.
  Entities often require mutability, proxies, and a no-arg constructor, all of
  which conflict with the nature of record. In such cases, stick to traditional
  classes, but still try to separate logic and data where it makes sense.

### Takeaways

- DOP is not anti-OOP - it's a refinement for clearer thinking and modeling.
- With `record`, `sealed interface`, and Pattern Matching, Java is finally ready
  for this style.
- You'll get:
  - Transparent and predictable models
  - Easier testing and logging
  - Less coupling and fewer side effects
- This approach can make your domain models sharper and your codebase easier to
  reason about.

So next time you're writing a `User` class with 12 getters, setters, and 5 state
mutation methods - take a breath and ask: _"What if this were just a `record`
and all logic lived in a service?"_

You might like the result.

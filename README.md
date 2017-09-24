# Option

### A container for possible values inspired by rust's Option type

## Usage:

Wrap a possibly undefined or null value

```javascript
let state = {
    a: 4,
    b: {
        c: 'hello',
        /* d: undefined */
    }
}

const existant = Option(state.a)
existant.isSome() // true
existant.isNone() // false

const nonExistant = Option(state.b.d)
nonExistant.isSome() // false
nonExistant.isNone() // true
```
Unwrap will return the value if it exists or throw an error if it doesn't
```javascript
existant.unwrap() // 4
nonExistant.unwrap() // Error: Tried to unwrap nonexistant value
```

Use unwrapOr to provide an alternative
```javascript
existant.unwrapOr('No value') // 4
nonExistant.unwrapOr('No value') // No value
```

Map applies an operation to the value, if there is one, and returns a new Option
```javascript
existant.map(n => n + 1) // Option(5)
nonExistant.map(n => n + 1) // Option()
```

Maps can be chained
```javascript
existant
    .map(n => n * 2)
    .map(n => `The value is ${n}`)
    .unwrapOr('No value') // The value is 8

nonExistant
    .map(n => n * 2)
    .map(n => `The value is ${n}`)
    .unwrapOr('No value') // No value
```

If the function supplied to map returns `null` or `undefined` the returned option becomes None
```javascript
existant
    .map(n => n * 2)
    .map(n => null)
    .map(n => `The value is ${n}`)
    .isNone() // true
```

`flatMap` allows for the flattening of nested options

This is a nested prop getter using `flatMap`
```javascript
const prop = prop => obj => Option(obj[prop])

prop('b')(state).map(prop('c')) // Option(Option('hello'))

prop('b')(state).flatMap(prop('c')) // Option('hello')
prop('b')(state).flatMap(prop('d')) // Option()

```

Each method has a static equivalent
```javascript
Option.unwrap(existant) // 4
Option.isSome(existant) // true
Option.isNone(nonExistant) // true
```

Methods with more than one argument are curried

The Option is always the last argument
```javascript
const unwrapOrHello = Option.unwrapOr('Hello')
unwrapOrHello(nonExistant) // Hello

const optionDoubler = Option.map(n => n * 2)
optionDoubler(existant).unwrap() // 8
```

Use static methods for arrays of Options
```javascript
const optionList = [Option(1), Option(2), Option(3), Option(null)]

optionList
    .map(optionDoubler)
    .map(unwrapOrHello) // [2, 4, 6, 'Hello']
```

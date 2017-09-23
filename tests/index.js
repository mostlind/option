const Option = require("../index.js");
const { test } = require("ava");

const isObject = value =>
  typeof value === "object" && value !== null && !Array.isArray(value);
// Option is a function
test(t => {
  t.is(typeof Option, "function");
});

// Option returns an object
test(t => {
  t.is(isObject(Option()), true);
});

// Option has isNone, isSome, map, and unwrap methods
test(t => {
  let o = Option();
  t.is(typeof o.isNone, "function");
  t.is(typeof o.isSome, "function");
  t.is(typeof o.map, "function");
  t.is(typeof o.unwrap, "function");
});

// Calling unwrap on an Option with value returns the value
test(t => {
  t.is(Option(1).unwrap(), 1);
});

// Calling unwrap on an Option without a value throws an error
test(t => {
  try {
    Option().unwrap();
  } catch (e) {
    return t.pass();
  }

  t.fail();
});

// calling isSome on Option with value returns true
test(t => {
  t.is(Option(1).isSome(), true);
});

// calling isNone on Option with value returns false
test(t => {
  t.is(Option(1).isNone(), false);
});

// calling isSome on Option with no arguments returns false
test(t => {
  t.is(Option().isSome(), false);
});

// calling isNone on Option with no arguments returns true
test(t => {
  t.is(Option().isNone(), true);
});

// calling isSome on Option of null returns false
test(t => {
  t.is(Option(null).isSome(), false);
});

// calling isNone on Option of null returns true
test(t => {
  t.is(Option(null).isNone(), true);
});

// calling isSome on Option of undefined returns false
test(t => {
  t.is(Option(undefined).isSome(), false);
});

// calling isNone on Option of undefined returns true
test(t => {
  t.is(Option(undefined).isNone(), true);
});

// calling unwrapOr on Option with value returns wrapped value
test(t => {
  t.is(Option(1).unwrapOr(2), 1);
});

//calling unwrapOr on Option that isNone returns value passed to unwrapOr
test(t => {
  t.is(Option().unwrapOr(2), 2);
});

// map returns new Option
test(t => {
  let o = Option().map(a => a);
  t.is(typeof o.isNone, "function");
  t.is(typeof o.isSome, "function");
  t.is(typeof o.map, "function");
  t.is(typeof o.unwrap, "function");
});

// passing identity function to map to Option that isSome returns Option that isSome
test(t => {
  let o = Option(1).map(a => a);
  t.is(o.isSome(), true);
});

// returning null from map function returns Option that isNone
test(t => {
  let o = Option(1).map(a => null);
  t.is(o.isSome(), false);
  t.is(o.isNone(), true);
});

// returning undefined from map function returns Option that isNone
test(t => {
  let o = Option(1).map(a => undefined);
  t.is(o.isSome(), false);
  t.is(o.isNone(), true);
});

// passing identity function to map return new Option with same value
test(t => {
  let o = Option(1).map(a => a);
  t.is(o.unwrap(), 1);
});

// map returns new Option with function applied to value
test(t => {
  let o = Option(1).map(a => a + 1);
  t.is(o.unwrap(), 2);
});

// maps can be chained
test(t => {
  let o = Option(1)
    .map(a => a + 1)
    .map(a => a + 2);
  t.is(o.unwrap(), 4);
});

// map can be applied to Options that are None
test(t => {
  let o = Option().map(a => a + 1);
  t.is(o.isNone(), true);
});

// if any map returns undefined Option becomes None
test(t => {
  let o = Option(1)
    .map(a => a + 1)
    .map(a => undefined)
    .map(a => a + 2);
  t.is(o.isNone(), true);
});

// if any map returns null Option becomes None
test(t => {
  let o = Option(1)
    .map(a => a + 1)
    .map(a => null)
    .map(a => a + 2);
  t.is(o.isNone(), true);
});

// Option.unwrap returns correct value
test(t => {
  t.is(Option.unwrap(Option(1)), 1);
});

// Option.unwrapOr returns a function when passed a value
test(t => {
  t.is(typeof Option.unwrapOr(1), "function");
});

// Option.unwrapOr(val) accepts an option and calls unwrapOr with that value
test(t => {
  t.is(Option.unwrapOr(1)(Option()), 1);
});

// Option.isNone returns correct value
test(t => {
  t.is(Option.isNone(Option(null)), true);
  t.is(Option.isNone(Option(1)), false);
});

// Option.isSome return correct value
test(t => {
  t.is(Option.isSome(Option(null)), false);
  t.is(Option.isSome(Option(1)), true);
});

// Option.map returns a function when passed a function
test(t => {
  t.is(typeof Option.map(a => a), "function");
});

// Option.map(fn) accepts an Option and applies fn to that Option
test(t => {
  let opt = Option.map(a => a + 1)(Option(1));
  t.is(opt.unwrap(), 2);
});

test(t => {
  const opts = [Option(1), Option(2), Option(3)];
  const add1toOption = Option.map(a => a + 1);
  const values = opts.map(add1toOption).map(Option.unwrap);

  t.deepEqual(values, [2, 3, 4]);
});

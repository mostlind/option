const Option = require("../index.js");
const { test } = require("ava");

const isObject = value =>
  typeof value === "object" && value !== null && !Array.isArray(value);

test("Option is a function", t => {
  t.is(typeof Option, "function");
});

test("Option returns an object", t => {
  t.is(isObject(Option()), true);
});

test("Option has isNone, isSome, map, and unwrap methods", t => {
  let o = Option();
  t.is(typeof o.isNone, "function");
  t.is(typeof o.isSome, "function");
  t.is(typeof o.map, "function");
  t.is(typeof o.unwrap, "function");
});

test("Calling unwrap on an Option with value returns the value", t => {
  t.is(Option(1).unwrap(), 1);
});

test("Calling unwrap on an Option without a value throws an error", t => {
  try {
    Option().unwrap();
  } catch (e) {
    return t.pass();
  }

  t.fail();
});

test("calling isSome on Option with value returns true", t => {
  t.is(Option(1).isSome(), true);
});

test("calling isNone on Option with value returns false", t => {
  t.is(Option(1).isNone(), false);
});

test("calling isSome on Option with no arguments returns false", t => {
  t.is(Option().isSome(), false);
});

test("calling isNone on Option with no arguments returns true", t => {
  t.is(Option().isNone(), true);
});

test("calling isSome on Option of null returns false", t => {
  t.is(Option(null).isSome(), false);
});

test("calling isNone on Option of null returns true", t => {
  t.is(Option(null).isNone(), true);
});

test("calling isSome on Option of undefined returns false", t => {
  t.is(Option(undefined).isSome(), false);
});

test("calling isNone on Option of undefined returns true", t => {
  t.is(Option(undefined).isNone(), true);
});

test("calling unwrapOr on Option with value returns wrapped value", t => {
  t.is(Option(1).unwrapOr(2), 1);
});

test("calling unwrapOr on Option that isNone returns value passed to unwrapOr", t => {
  t.is(Option().unwrapOr(2), 2);
});

test("map returns new Option", t => {
  let o = Option().map(a => a);
  t.is(typeof o.isNone, "function");
  t.is(typeof o.isSome, "function");
  t.is(typeof o.map, "function");
  t.is(typeof o.unwrap, "function");
});

test("passing identity function to map to Option that isSome returns Option that isSome", t => {
  let o = Option(1).map(a => a);
  t.is(o.isSome(), true);
});

test("returning null from map function returns Option that isNone", t => {
  let o = Option(1).map(a => null);
  t.is(o.isSome(), false);
  t.is(o.isNone(), true);
});

test("returning undefined from map function returns Option that isNone", t => {
  let o = Option(1).map(a => undefined);
  t.is(o.isSome(), false);
  t.is(o.isNone(), true);
});

test("passing identity function to map return new Option with same value", t => {
  let o = Option(1).map(a => a);
  t.is(o.unwrap(), 1);
});

test("map returns new Option with function applied to value", t => {
  let o = Option(1).map(a => a + 1);
  t.is(o.unwrap(), 2);
});

test("maps can be chained", t => {
  let o = Option(1)
    .map(a => a + 1)
    .map(a => a + 2);
  t.is(o.unwrap(), 4);
});

test("map can be applied to Options that are None", t => {
  let o = Option().map(a => a + 1);
  t.is(o.isNone(), true);
});

test("if any map returns undefined Option becomes None", t => {
  let o = Option(1)
    .map(a => a + 1)
    .map(a => undefined)
    .map(a => a + 2);
  t.is(o.isNone(), true);
});

test("if any map returns null Option becomes None", t => {
  let o = Option(1)
    .map(a => a + 1)
    .map(a => null)
    .map(a => a + 2);
  t.is(o.isNone(), true);
});

test("flatMap unwraps nested option", t => {
  let o = Option(1).flatMap(a => Option(a + 1));

  t.is(o.unwrap(), 2);
});

test("flatMap of none is none", t => {
  let o = Option().flatMap(a => Option(a + 1));

  t.true(o.isNone());
});

test("Option.unwrap returns correct value", t => {
  t.is(Option.unwrap(Option(1)), 1);
});

test("Option.unwrapOr returns a function when passed a value", t => {
  t.is(typeof Option.unwrapOr(1), "function");
});

test("Option.unwrapOr(val) accepts an option and calls unwrapOr with that value", t => {
  t.is(Option.unwrapOr(1)(Option()), 1);
});

test("Option.isNone returns correct value", t => {
  t.is(Option.isNone(Option(null)), true);
  t.is(Option.isNone(Option(1)), false);
});

test("Option.isSome return correct value", t => {
  t.is(Option.isSome(Option(null)), false);
  t.is(Option.isSome(Option(1)), true);
});

test("Option.map returns a function when passed a function", t => {
  t.is(typeof Option.map(a => a), "function");
});

test("Option.map(fn) accepts an Option and applies fn to that Option", t => {
  let opt = Option.map(a => a + 1)(Option(1));
  t.is(opt.unwrap(), 2);
});

test(t => {
  const opts = [Option(1), Option(2), Option(3)];
  const add1toOption = Option.map(a => a + 1);
  const values = opts.map(add1toOption).map(Option.unwrap);

  t.deepEqual(values, [2, 3, 4]);
});

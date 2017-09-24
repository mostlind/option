let Option = _value => {
  const isNone = () => _value === null || _value === undefined;
  const isSome = () => !isNone();
  const map = fn => (isNone() ? Option(_value) : Option(fn(_value)));
  const flatMap = fn => (isNone() ? Option() : fn(_value));
  const unwrap = () => {
    if (isSome()) {
      return _value;
    } else {
      throw new Error("Tried to unwrap a nonexistant value");
    }
  };
  const unwrapOr = alt => (isSome() ? _value : alt);

  return {
    isNone,
    isSome,
    map,
    unwrap,
    unwrapOr,
    flatMap
  };
};

Option.unwrap = opt => opt.unwrap();
Option.unwrapOr = alt => opt => opt.unwrapOr(alt);
Option.isNone = opt => opt.isNone();
Option.isSome = opt => opt.isSome();
Option.map = fn => opt => opt.map(fn);
Option.flatMap = fn => opt => opt.flatMap(fn);

module.exports = Option;
// export default Option;

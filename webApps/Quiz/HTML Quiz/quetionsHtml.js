const JS_OUTPUT_QUESTIONS = [
  {
    q: "console.log(typeof null);",
    options: ["'null'", "'object'", "'undefined'", "'number'"],
    correctIndex: 1
  },
  {
    q: "console.log(1 + '2' + 3);",
    options: ["6", "'123'", "NaN", "'15'"],
    correctIndex: 1
  },
  {
    q: "console.log(+'5' + 5);",
    options: ["'55'", "10", "NaN", "5"],
    correctIndex: 1
  },
  {
    q: "let x; console.log(x);",
    options: ["null", "'undefined'", "Error", "0"],
    correctIndex: 1
  },
  {
    q: "console.log([1,2,3] == [1,2,3]);",
    options: ["true", "false", "undefined", "Error"],
    correctIndex: 1
  },
  {
    q: "console.log('5' - 2);",
    options: ["3", "'52'", "NaN", "undefined"],
    correctIndex: 0
  },
  {
    q: "console.log(true + false);",
    options: ["1", "0", "true", "NaN"],
    correctIndex: 0
  },
  {
    q: "console.log([] == 0);",
    options: ["true", "false", "NaN", "Error"],
    correctIndex: 0
  },
  {
    q: "console.log(('b' + 'a' + + 'a' + 'a').toLowerCase());",
    options: ["'baNaNa'", "'banana'", "'baaa'", "'error'"],
    correctIndex: 1
  },
  {
    q: "console.log(typeof NaN);",
    options: ["'NaN'", "'undefined'", "'number'", "'object'"],
    correctIndex: 2
  }
];

const { MarkovMachine } = require("./markov");


describe('markov machine', function () {
  test('makes chains', function () {
    let mm = new MarkovMachine("aa bb cc aa BB aa BB");

    expect(mm.chains).toEqual(new Map([
      ["aa", ["bb", "BB", "BB"]],
      ["bb", ["cc"]],
      ["cc", ["aa"]],
      ["BB", ["aa", null]]]));
  });

  test('choice picks from array', function () {
    expect(MarkovMachine.choice([1, 1, 1])).toEqual(1);
    expect([1, 2, 3]).toContain(MarkovMachine.choice([1, 2, 3]));
  });

  test('generates semi-predictable text', function () {
    let mm = new MarkovMachine("a b c");
    let text = mm.makeText();
    expect(["a b c", "b c", "c"]).toContain(text);
  });

  test('generates valid text', function () {
    let bigrams = ["the cat", "cat in", "in the", "the hat", "hat "];
    let mm = new MarkovMachine("the cat in the hat");
    let output = mm.makeText();
    expect(output.endsWith('hat')).toBe(true);

    let outputWords = mm.makeText().split(/[ \r\n]+/);

    for (let i = 0; i < outputWords.length - 1; i++) {
      expect(bigrams).toContain(outputWords[i] + " " + outputWords[i + 1]);
    }
  });

  test('cuts off at length', function () {
    let bigrams = ["the cat", "cat in", "in the", "the hat", "hat "];
    let mm = new MarkovMachine("the cat in the hat");
    let output = mm.makeText(2);

    let outputWords = output.split(/[ \r\n]+/);
    expect([1, 2]).toContain(outputWords.length);
  });
});

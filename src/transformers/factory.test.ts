import { TRANSFORMER_DEFINITION_REGEX } from "./factory";

describe('TransformerFactory', () => {
  it('TRANSFORMER_DEFINITION_REGEX', () => {
    const validTransformerDefinitions = [
      'foo',
      'foo-ttt_fff',
      'foo()',
      'foo(a)',
      'foo(a, b, c)'
    ];

    for (const def of validTransformerDefinitions) {
      expect(def).toMatch(new RegExp(TRANSFORMER_DEFINITION_REGEX));
    }
  });
});

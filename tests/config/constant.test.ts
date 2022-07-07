import { load } from "cheerio";
import { ConfigFactory } from "../../src";

const yaml = `
constant: foo
`;

describe('ConstantConfig', () => {
  it('Basic', () => {
    const $ = load('');
    const conf = ConfigFactory.fromYAML(yaml);
    const result = conf.extract($, $.root());
    const expected = 'foo';
  
    expect(result).toBe(expected);
  });
});

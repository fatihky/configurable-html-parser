import { load } from 'cheerio';
import { ConfigFactory } from '../../src';

const yaml = `
constant: foo
`;

describe('ConstantConfig', () => {
  it('Basic', () => {
    const $ = load('');
    const conf = ConfigFactory.fromYAML(yaml);
    const result = conf.extract({
      $,
      $el: $.root(),
      url: 'https://example.com',
    });
    const expected = 'foo';

    expect(result).toBe(expected);
  });
});

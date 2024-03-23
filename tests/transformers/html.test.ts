import { load } from 'cheerio';
import { readFileSync } from 'fs';
import { ConfigFactory } from '../../src';
import { rootProp } from '../../src/core/property';

const yaml = `
selector: .foo
transform: html
`;

describe('HTML', () => {
  it('CorrectlyExtractHTML', () => {
    const $ = load(readFileSync('tests/fixtures/basic.html').toString());
    const config = ConfigFactory.fromYAML(yaml);
    const result = config.extract({
      $,
      $el: $.root(),
      url: 'https://example.com',
      property: rootProp,
    });
    const expected = $('.foo').html();

    expect(result).toBe(expected);
  });
});

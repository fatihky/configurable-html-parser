import { load } from 'cheerio';
import { ConfigFactory, extract } from '../src';

const SAMPLE = `<div>
  some
  <span>nested</span>
  <p>elements</p>
</div>`;

describe('Extract', () => {
  // The extract() must start from the $.root() so we'll get
  // the outer-most element at beginning
  it('SelectRootElement', () => {
    const $ = load(SAMPLE);
    const config = ConfigFactory.fromYAML('{}');
    const result = extract($, config, 'https://example.com');
    const expected = $.root().text();

    expect(result).toBe(expected);
  });
});

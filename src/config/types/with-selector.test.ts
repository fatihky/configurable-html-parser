import { load } from 'cheerio';
import ConfigWithSelector from './with-selector';

class FakeWithSelector extends ConfigWithSelector {
  constructor(readonly selector: ConfigWithSelector['selector']) {
    super();
  }

  extract() {
    return '';
  }
}

const html = `
<div id="foo">
  <span id="bar">
    baz
  </span>
</div>
`;

describe('ConfigWithSelector', () => {
  it('ReturnSelf', () => {
    const $ = load(html);
    const $el = $.root();
    const conf = new FakeWithSelector(null);
    const $match = conf.getSelectorMatches($el, false);
    const expected = $el;

    expect($match).toBe(expected);
  });
});

import { load } from "cheerio";
import { SELECTOR_SELF } from "../../constants";
import ConfigWithSelector, { ConfigWithSelectorExtractParams } from "./with-selector";

class FakeWithSelector extends ConfigWithSelector {
  constructor(selector: string) {
    super();

    this.selector = selector;
  }

  extract($: cheerio.Root, $el: cheerio.Cheerio, opts?: ConfigWithSelectorExtractParams | undefined) {
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
    const $el = $('*');
    const conf = new FakeWithSelector(SELECTOR_SELF);
    const $match = conf.getSelectorMatches($el, false);
    const expected = $el;

    expect($match).toBe(expected);
  });
});

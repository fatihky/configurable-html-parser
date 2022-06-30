import { Config } from '../config';
import ConfigWithSelector, { ConfigWithSelectorExtractParams } from './with-selector';

export default class UnionConfig extends Config {
  private constructor(
    private readonly configs: ConfigWithSelector[]
  ) {
    super();
  }

  extract($: cheerio.Root, $parent: cheerio.Cheerio, opts?: ConfigWithSelectorExtractParams) {
    for (const config of this.configs) {
      const $el = config.getSelectorMatches($parent, false);

      if ($el.length === 0) {
        continue;
      }

      return config.extract($, $el, { ...(opts ? opts : {}), elementAlreadyMatched: true });
    }

    return null;
  }

  static generate(configs: []) {
    return new UnionConfig(configs);
  }
}

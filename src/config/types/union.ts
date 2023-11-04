import { Config, ExtractParams } from '../config';
import ConfigWithSelector, {
  ConfigWithSelectorExtractParams,
} from './with-selector';

export default class UnionConfig extends Config {
  private constructor(private readonly configs: Config[]) {
    super();
  }

  extract($: cheerio.Root, $parent: cheerio.Cheerio, opts: ExtractParams) {
    for (const config of this.configs) {
      if (config instanceof ConfigWithSelector) {
        const $el = config.getSelectorMatches($parent, false);

        if ($el.length === 0) {
          continue;
        }

        return config.extract($, $el, {
          ...(opts ? opts : {}),
          elementAlreadyMatched: true,
          url: opts.url,
        });
      } else {
        return config.extract($, $(''), opts);
      }
    }

    return null;
  }

  static generate(configs: Config[]) {
    return new UnionConfig(configs);
  }
}

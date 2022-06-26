import { Config } from './config';
import ConfigWithSelector, { ConfigWithSelectorExtractParams } from './with-selector';

export class ObjectConfig extends ConfigWithSelector {
  properties: {
    [key: string]: Config
  } = {};

  private constructor() {
    super();
  }

  extract($: cheerio.Root, $parent: cheerio.Cheerio, opts?: ConfigWithSelectorExtractParams) {
    let $el = this.getSelectorMatches($parent, (opts && opts.elementAlreadyMatched) || false);

    if ($el.length === 0) {
      return null;
    }

    const props = this.properties;
    const keys = Object.keys(props);

    return keys.reduce((acc, key) => {
      const config = props[key];

      acc[key] = config.extract($, $el);

      return acc;
    }, {});
  }

  static generate(
    selector: string,
    properties?: ObjectConfig["properties"]
  ): ObjectConfig {
    const conf = new ObjectConfig()

    conf.selector = selector;

    if (properties) {
      conf.properties = properties;
    }

    return conf
  }
}

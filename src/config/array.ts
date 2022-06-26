import { Config, ExtractParams } from './config';
import { PrimitiveValueConfig, Transform } from './primitive';
import ConfigWithSelector, { ConfigWithSelectorExtractParams } from './with-selector';

export class ArrayConfig extends ConfigWithSelector {
  transform?: Transform
  items?: Config

  private constructor() {
    super();
  }

  extract($: cheerio.Root, $parent:  cheerio.Cheerio) {
    const $el = this.getSelectorMatches($parent, false);
    let conf = this.items || PrimitiveValueConfig.generate('', this.transform);
    const extractOpts = conf instanceof ConfigWithSelector
      ? { elementAlreadyMatched: true } as ConfigWithSelectorExtractParams
      : {} as ExtractParams;

    return $el
      .toArray()
      .map((el) => {
        return conf.extract($, $(el), extractOpts);
      });
  }

  static generate(selector: string, items?: ArrayConfig['items'], transform?: Transform): ArrayConfig {
    const conf = new ArrayConfig();

    conf.selector = selector;

    if (items) {
      conf.items = items;
    }

    if (transform) {
      conf.transform = transform;
    }

    return conf;
  }
}

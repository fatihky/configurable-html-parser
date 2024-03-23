import { Config, ExtractParams } from '../config';
import { PrimitiveValueConfig, Transform } from './primitive';
import ConfigWithSelector, {
  ConfigWithSelectorExtractParams,
} from './with-selector';

export class ArrayConfig extends ConfigWithSelector {
  transform?: Transform;
  items?: Config;

  private constructor() {
    super();
  }

  extract(params: ConfigWithSelectorExtractParams) {
    const $el = this.getSelectorMatches(params.$el, false);
    const conf =
      this.items || PrimitiveValueConfig.generate(null, this.transform);
    const extractOpts = { ...params } satisfies ExtractParams;

    return $el.toArray().map((el) => {
      return conf.extract({ ...extractOpts, $el: params.$(el) });
    });
  }

  static generate(
    selector: ConfigWithSelector['selector'],
    items?: ArrayConfig['items'],
    transform?: Transform
  ): ArrayConfig {
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

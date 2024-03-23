import { Config, ExtractParams } from '../config';
import ConfigWithSelector from './with-selector';

export default class UnionConfig extends Config {
  private constructor(private readonly configs: Config[]) {
    super();
  }

  extract(params: ExtractParams) {
    const $parent = params.$el;

    for (const config of this.configs) {
      if (config instanceof ConfigWithSelector) {
        const $el = config.getSelectorMatches($parent, false);

        if ($el.length === 0) {
          continue;
        }

        return config.extract({
          ...params,
          $el,
          elementAlreadyMatched: true,
        });
      } else {
        return config.extract({ ...params, $el: params.$('') });
      }
    }

    return null;
  }

  static generate(configs: Config[]) {
    return new UnionConfig(configs);
  }
}

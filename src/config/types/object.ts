import { Property, rootProp } from '../../core/property';
import { Config } from '../config';
import ConfigWithSelector, {
  ConfigWithSelectorExtractParams,
} from './with-selector';

export class ObjectConfig extends ConfigWithSelector {
  static generate(
    selector: ConfigWithSelector['selector'],
    properties?: ObjectConfig['properties']
  ): ObjectConfig {
    const conf = new ObjectConfig();

    conf.selector = selector;

    if (properties) {
      conf.properties = properties;
    }

    return conf;
  }

  properties: {
    [key: string]: Config;
  } = {};

  private constructor() {
    super();
  }

  extract(params: ConfigWithSelectorExtractParams) {
    const $parent = params.$el;
    const $el = this.getSelectorMatches(
      $parent,
      params.elementAlreadyMatched ?? false
    );

    if ($el.length === 0) {
      return null;
    }

    const props = this.properties;
    const keys = Object.keys(props);

    return keys.reduce((acc, key) => {
      const config = props[key];

      acc[key] = config.extract({
        ...params,
        property: this.makeProperty(params.property, key),
      });

      return acc;
    }, {} as Record<string, unknown>);
  }

  private makeProperty(property: Property, prop: string): Property {
    if (property === rootProp) {
      return prop;
    }

    return `${property}.${prop}`;
  }
}

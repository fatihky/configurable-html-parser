import { parse } from 'yaml';
import { ArrayConfig } from './array';
import { Config } from './config';
import { ObjectConfig } from './object';
import { PrimitiveValueConfig } from './primitive';
import UnionConfig from './union';
import { ConfigValidator } from './validator';

export class ConfigFactory {
  static fromYAML(yaml: string): Config {
    const plain = parse(yaml);

    return this.generate(plain);
  }

  private static generate(plain: any): Config {
    const validator = new ConfigValidator(plain);

    validator.validate();

    const {
      selector: selectorOrig,
      type,
      transform,
      properties,
      items,
      union,
    } = plain;

    const selector = Array.isArray(selectorOrig)
      ? selectorOrig.join(', ')
      : selectorOrig;

    const expectedType =
      (properties || type === 'object')
      ? 'object'
      : (items || type === 'array')
        ? 'array'
        : union
          ? 'union'
          : 'primitive';

    switch (expectedType) {
      case 'object':
        let propConfigs: ObjectConfig['properties'] | undefined = undefined;

        if (properties) {
          propConfigs = Object.keys(properties).reduce((acc, key) => {
            acc[key] = this.generate(properties[key]);

            return acc;
          }, {});
        }

        return ObjectConfig.generate(selector, propConfigs);
      case 'array':
        return ArrayConfig.generate(selector, items, transform);
      case 'union':
        return UnionConfig.generate(union.map(cfg => this.generate(cfg)));
      default:
        return PrimitiveValueConfig.generate(selector, transform);
    }
  }
}

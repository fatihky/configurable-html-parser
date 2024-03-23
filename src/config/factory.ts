import { parse } from 'yaml';
import { Transformer } from '../core/transformer';
import { TransformerFactory } from '../transformers/factory';
import { Config } from './config';
import { PlainConfigObject, PlainConfigSelector } from './plain-config';
import { ArrayConfig } from './types/array';
import ConstantConfig from './types/constant';
import { ObjectConfig } from './types/object';
import { PrimitiveValueConfig } from './types/primitive';
import UnionConfig from './types/union';
import ConfigWithSelector from './types/with-selector';
import { ConfigValidator } from './validator';

export class ConfigFactory {
  static fromYAML(yaml: string): Config {
    const plain = parse(yaml);

    return this.generate(plain);
  }

  private static generate(plain: PlainConfigObject): Config {
    const validator = new ConfigValidator(plain);
    const errors = validator.validate();

    if (errors) {
      throw new Error(
        `Invalid config provided. Got validation errors: ${JSON.stringify(
          errors
        )}. Plain config: ${JSON.stringify(plain)}`
      );
    }

    const {
      constant,
      selector: selectorOrig,
      transform: transformOrig,
      properties,
      items,
      union,
    } = plain;

    const selector = ConfigFactory.generateSelector(selectorOrig);

    const expectedType = ConfigFactory.detectExpectedType(plain);
    const transform = transformOrig
      ? ConfigFactory.generateTransform(transformOrig)
      : undefined;

    switch (expectedType) {
    case 'constant':
      return ConstantConfig.generate(constant);
    case 'object': {
      let propConfigs: ObjectConfig['properties'] | undefined = undefined;

      if (properties) {
        propConfigs = Object.keys(properties).reduce((acc, key) => {
          acc[key] = this.generate(properties[key]);

          return acc;
        }, {} as Record<string, Config>);
      }

      return ObjectConfig.generate(selector, propConfigs);
    }
    case 'array':
      return ArrayConfig.generate(
        selector,
        items && this.generate(items),
        transform
      );
    case 'union':
      return UnionConfig.generate(union!.map((cfg) => this.generate(cfg)));
    default:
      return PrimitiveValueConfig.generate(selector, transform);
    }
  }

  private static generateSelector(
    selector: PlainConfigSelector
  ): ConfigWithSelector['selector'] {
    if (typeof selector === 'string') {
      return selector || null;
    }

    if (Array.isArray(selector)) {
      const joined = selector
        .map((s) => ConfigFactory.generateSelector(s))
        .filter((s) => typeof s === 'string')
        .join(', ');

      return ConfigFactory.generateSelector(joined);
    }

    if (typeof selector === 'object') {
      const { selector: nselector } = selector;

      return ConfigFactory.generateSelector(nselector);
    }

    if (typeof selector === 'undefined') {
      return null;
    }

    throw new Error(
      `Unexpected selector type: ${typeof selector}. Selector: ${JSON.stringify(
        selector
      )}`
    );
  }

  private static generateTransform(
    transform: string | string[]
  ): Transformer | Transformer[] {
    if (typeof transform === 'string') {
      return TransformerFactory.create(transform);
    }

    return transform.map((tr: string) => {
      return TransformerFactory.create(tr);
    });
  }

  private static detectExpectedType(conf: PlainConfigObject) {
    if ('properties' in conf || conf.type === 'object') {
      return 'object';
    }

    if ('items' in conf || conf.type === 'array') {
      return 'array';
    }

    if ('union' in conf) {
      return 'union';
    }

    if ('constant' in conf) {
      return 'constant';
    }

    return 'primitive';
  }
}

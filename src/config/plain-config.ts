import ConfigWithSelector from './types/with-selector';

export type PlainConfigSelector =
  | string
  | string[]
  | { selector: string }
  | undefined;

export type PlainConfigObject = {
  selector?: PlainConfigSelector;
  properties?: Record<string, PlainConfigObject>;
  type?: 'string' | 'object' | 'array';
  constant?: unknown;
  transform?: string | string[];
  items?: PlainConfigObject;
  union?: PlainConfigObject[];
};

export type PlainConfig = PlainConfigObject | ConfigWithSelector;

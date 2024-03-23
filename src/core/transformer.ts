import { PrimitiveTypes } from './primitive-types';

export interface TransformParams {
  val: unknown;
  $el: cheerio.Cheerio;
  url: string;
}

export abstract class Transformer {
  static getName(): string {
    throw new Error('Not implemented');
  }

  abstract inputType(): PrimitiveTypes;

  abstract outputType(): PrimitiveTypes;

  abstract transform(params: TransformParams): unknown;
}

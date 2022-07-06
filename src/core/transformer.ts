import { PrimitiveTypes } from './primitive-types';

export abstract class Transformer {
  static getName(): string {
    throw new Error('Not implemented');
  }

  abstract inputType(): PrimitiveTypes

  abstract outputType(): PrimitiveTypes

  abstract transform(val: any, $el: cheerio.Cheerio): any
}


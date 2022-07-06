import { PrimitiveTypes, STRING } from '../core/primitive-types';
import { Transformer } from '../core/transformer';

export default class Trim extends Transformer {
  static getName(): string {
    return 'trim';
  }

  inputType(): PrimitiveTypes {
    return STRING;
  }

  outputType(): PrimitiveTypes {
    return STRING;
  }

  transform(val: any, $el: cheerio.Cheerio) {
    if (typeof val === 'string') {
      return val.trim();
    }

    throw new Error(`Trim: invalid value type: ${typeof val}`);
  }
}

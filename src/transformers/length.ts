import { NUMBER, PrimitiveTypes, STRING } from '../core/primitive-types';
import { Transformer } from '../core/transformer';

export default class Length extends Transformer {
  static getName(): string {
    return 'length';
  }

  inputType(): PrimitiveTypes {
    return STRING;
  }

  outputType(): PrimitiveTypes {
    return NUMBER;
  }

  transform(val: any, $el: cheerio.Cheerio) {
    if (typeof val === 'string' || Array.isArray(val)) {
      return val.length;
    }

    throw new Error(`Length.transform: invalid value type: ${typeof val}`);
  }
}

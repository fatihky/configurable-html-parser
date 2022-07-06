import { NUMBER, PrimitiveTypes, STRING } from '../core/primitive-types';
import { Transformer } from '../core/transformer';

export default class NumberTransformer extends Transformer {
  static getName(): string {
    return 'number';
  }

  inputType(): PrimitiveTypes {
    return STRING;
  }

  outputType(): PrimitiveTypes {
    return NUMBER;
  }

  transform(val: any, $el: cheerio.Cheerio) {
    if (typeof val === 'string') {
      return Number(val);
    }

    throw new Error(`NumberTransformer.transform: invalid value type: ${typeof val}`);
  }
}

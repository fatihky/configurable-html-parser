import { BOOLEAN, PrimitiveTypes, STRING } from '../core/primitive-types';
import { Transformer } from '../core/transformer';

export default class Exists extends Transformer {
  static getName(): string {
    return 'exists';
  }

  inputType(): PrimitiveTypes {
    return STRING;
  }

  outputType(): PrimitiveTypes {
    return BOOLEAN;
  }

  transform(val: any, $el: cheerio.Cheerio) {
    return $el.length > 0;
  }
}

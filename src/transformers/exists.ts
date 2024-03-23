import { BOOLEAN, PrimitiveTypes, STRING } from '../core/primitive-types';
import { TransformParams, Transformer } from '../core/transformer';

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

  transform({ $el }: TransformParams) {
    return $el.length > 0;
  }
}

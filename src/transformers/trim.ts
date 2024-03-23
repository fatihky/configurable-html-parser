import { PrimitiveTypes, STRING } from '../core/primitive-types';
import { TransformParams, Transformer } from '../core/transformer';
import { InvalidParseInputError } from '../errors/invalid-parse-input-error';

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

  transform({ property, val }: TransformParams) {
    if (val === null) {
      return null;
    }

    if (typeof val === 'string') {
      return val.trim();
    }

    throw new InvalidParseInputError(
      property,
      `Trim: invalid value type: ${typeof val}`
    );
  }
}

import { URL } from 'url';
import { PrimitiveTypes, STRING } from '../core/primitive-types';
import { TransformParams, Transformer } from '../core/transformer';
import { InvalidParseInputError } from '../errors/invalid-parse-input-error';

export default class ResolveTransformer extends Transformer {
  static getName(): string {
    return 'resolve';
  }

  inputType(): PrimitiveTypes {
    return STRING;
  }

  outputType(): PrimitiveTypes {
    return STRING;
  }

  transform({ property, val, url }: TransformParams) {
    if (typeof val === 'string') {
      return new URL(val, url).toString();
    }

    throw new InvalidParseInputError(
      property,
      `ResolveTransformer.transform: invalid value type: ${typeof val}`
    );
  }
}

import { URL } from 'url';
import { PrimitiveTypes, STRING } from '../core/primitive-types';
import { TransformParams, Transformer } from '../core/transformer';

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

  transform({ val, url }: TransformParams) {
    if (typeof val === 'string') {
      return new URL(val, url).toString();
    }

    throw new Error(
      `ResolveTransformer.transform: invalid value type: ${typeof val}`
    );
  }
}

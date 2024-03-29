import { STRING } from '../core/primitive-types';
import { TransformParams, Transformer } from '../core/transformer';

export default class AttributeTransformer extends Transformer {
  constructor(private readonly args: string[]) {
    super();
  }

  static getName(): string {
    return 'attr';
  }

  inputType(): typeof STRING {
    return STRING;
  }

  outputType(): typeof STRING {
    return STRING;
  }

  transform({ $el }: TransformParams): unknown {
    const { args } = this;

    switch (args.length) {
    case 0:
      return $el.attr();
    case 1:
      return AttributeTransformer.getAttrValue($el, args[0]);
    default:
      return args.reduce((acc, arg) => {
        acc[arg] = AttributeTransformer.getAttrValue($el, arg);
        return acc;
      }, {} as Record<string, unknown>);
    }
  }

  private static getAttrValue(
    $el: cheerio.Cheerio,
    attr: string
  ): string | null {
    const val = $el.attr(attr);

    if (val === undefined) {
      return null;
    }

    return val;
  }
}

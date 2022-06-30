import { PrimitiveTypes, STRING } from "../core/primitive-types";
import { Transformer } from "../core/transformer";

export default class HTMLTransformer extends Transformer {
  getName(): string {
    return 'html';
  }

  inputType(): PrimitiveTypes {
    return STRING;
  }

  outputType(): PrimitiveTypes {
    return STRING;
  }

  transform(val: any, $el: cheerio.Cheerio) {
    return $el.html();
  }
}

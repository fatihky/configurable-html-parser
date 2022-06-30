import { Transformer } from '../../core/transformer';
import { Transformers } from '../../transformers';
import ConfigWithSelector, { ConfigWithSelectorExtractParams } from './with-selector';

export type Transform = (string | Transformer) | (string | Transformer)[]

export class PrimitiveValueConfig extends ConfigWithSelector {
  private transform?: Transform;

  private constructor() {
    super();
  }

  extract($: cheerio.Root, $parent: cheerio.Cheerio, opts?: ConfigWithSelectorExtractParams) {
    let val: any = null;
    let $el = this.getSelectorMatches($parent, (opts && opts.elementAlreadyMatched) || false);

    if ($el.length > 0) {
      val = $el.text();
    }

    if (!this.transform) {
      return val;
    }

    return this.transformVal(this.transform, val, $el);
  }

  static generate(
    selector: string,
    transform?: Transform
  ) {
    const conf = new PrimitiveValueConfig()

    conf.selector = selector;
    conf.transform = transform;

    return conf
  }

  protected transformVal(transformer: Transform, val: any, $el: cheerio.Cheerio) {
    let transform = transformer;

    if (typeof transform === 'string') {
      const found = Transformers.getByName(transform);

      if (!found) {
        throw new Error(`Transformer ${transform} is not found!`);
      }

      transform = found;
    }

    if (transform instanceof Transformer) {
      return transform.transform(val, $el);
    }

    return transform.reduce((acc, tr) => {
      if (typeof tr === 'string') {
        return this.transformVal(tr, acc, $el);
      }

      return tr.transform(acc, $el);
    }, val);
  }
}

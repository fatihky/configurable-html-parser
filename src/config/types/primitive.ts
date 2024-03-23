import { TransformParams, Transformer } from '../../core/transformer';
import ConfigWithSelector, {
  ConfigWithSelectorExtractParams,
} from './with-selector';

export type Transform = Transformer | Transformer[];

export class PrimitiveValueConfig extends ConfigWithSelector {
  private transform?: Transform;

  private constructor() {
    super();
  }

  extract(params: ConfigWithSelectorExtractParams) {
    let val: unknown = null;
    const $el = this.getSelectorMatches(
      params.$el,
      params.elementAlreadyMatched ?? false
    );

    if ($el.length > 0) {
      val = $el.text();
    }

    if (!this.transform) {
      return val;
    }

    return this.transformVal(this.transform, { ...params, $el, val });
  }

  static generate(
    selector: ConfigWithSelector['selector'],
    transform?: Transform
  ) {
    const conf = new PrimitiveValueConfig();

    conf.selector = selector;
    conf.transform = transform;

    return conf;
  }

  protected transformVal(
    transformer: Transform,
    transformParams: TransformParams
  ): unknown {
    const transform = transformer;

    if (transform instanceof Transformer) {
      return transform.transform(transformParams);
    }

    return transform.reduce((acc, tr) => {
      if (typeof tr === 'string') {
        return this.transformVal(tr, { ...transformParams, val: acc });
      }

      return tr.transform({ ...transformParams, val: acc });
    }, transformParams.val);
  }
}

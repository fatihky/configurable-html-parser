import { load } from 'cheerio';
import { PrimitiveTypes, STRING } from '../../core/primitive-types';
import { rootProp } from '../../core/property';
import { TransformParams, Transformer } from '../../core/transformer';
import { ExtractParams } from '../config';
import { ObjectConfig } from './object';
import { PrimitiveValueConfig } from './primitive';

const html = `<div id="root">
  <div id="a">foo</div>
  <div id="b">bar</div>
  <div id="c">baz</div>
</div>`;

class FakeTransformer extends Transformer {
  inputType(): PrimitiveTypes {
    return STRING;
  }

  outputType(): PrimitiveTypes {
    return STRING;
  }

  transform({ val }: TransformParams): unknown {
    return val;
  }
}

describe('object', () => {
  let params: ExtractParams;

  beforeAll(() => {
    const $ = load(html);
    const $el = $.root();

    params = { $, $el, property: rootProp, url: 'https://example.com' };
  });

  it('should extract object properties', () => {
    const config = ObjectConfig.generate('#root div', {
      a: PrimitiveValueConfig.generate('#a'),
      b: PrimitiveValueConfig.generate('#b'),
      c: PrimitiveValueConfig.generate('#c'),
    });

    const result = config.extract(params);

    expect(result).toBeInstanceOf(Object);
    expect(result).toEqual({ a: 'foo', b: 'bar', c: 'baz' });
  });

  it('should correctly set property', () => {
    const transfomer = new FakeTransformer();
    const spy = jest.spyOn(transfomer, 'transform');
    const config = ObjectConfig.generate('#root div', {
      a: PrimitiveValueConfig.generate('#a', transfomer),
      b: PrimitiveValueConfig.generate('#b', transfomer),
      c: PrimitiveValueConfig.generate('#c', transfomer),
    });

    const property = 'some.nested.prop';
    const result = config.extract({ ...params, property });

    expect(result).toEqual({ a: 'foo', b: 'bar', c: 'baz' });

    const baseParams = { ...params, $el: expect.anything() };

    expect(spy).toHaveBeenNthCalledWith(1, {
      ...baseParams,
      property: 'some.nested.prop.a',
      val: 'foo',
    });
    expect(spy).toHaveBeenNthCalledWith(2, {
      ...baseParams,
      property: 'some.nested.prop.b',
      val: 'bar',
    });
    expect(spy).toHaveBeenNthCalledWith(3, {
      ...baseParams,
      property: 'some.nested.prop.c',
      val: 'baz',
    });
  });
});

import { load } from 'cheerio';
import { ConfigFactory } from '../../src';
import { ExtractParams } from '../../src/config';
import { rootProp } from '../../src/core/property';

const SAMPLE = `
  <div id="root">
    <no-attributes>
      no attributes defined
    </no-attributes>

    <span id="one-attr">
      only id attribute is defined
    </span>

    <multiple-attributes foo="bar" baz="abc" other="attribute value">
      multiple attributes defined
    </multiple-attributes>

    <list>
      <item a="a1" b="b1" c="c1" />
      <item a="a2" b="b2" c="c2" />
      <item a="a3" b="b3" c="c3" />
      <item a="a4" b="b4" c="c4" />
    </list>

    <nested-list>
      <nested-item>
        <a a="a1">foo</a>
      </nested-item>

      <nested-item>
        <a a="a2">bar</a>
      </nested-item>

      <nested-item>
        <a a="a3">baz</a>
      </nested-item>
    </nested-list>
  </div>
`;

describe('AttrTransformer', () => {
  let $: cheerio.Root, $el: cheerio.Cheerio;
  let extractParams: ExtractParams;

  beforeAll(() => {
    $ = load(SAMPLE);
    $el = $.root();
    extractParams = {
      $,
      $el,
      url: 'https://example.com',
      property: rootProp,
    };
  });

  it('ReturnAttributeValue', () => {
    const yaml = `
selector: '#root'
transform: attr(id)`;
    const conf = ConfigFactory.fromYAML(yaml);
    const result = conf.extract(extractParams);
    const expected = 'root';

    expect(result).toBe(expected);
  });

  it('ReturnNullWhenAttributeIsNotDefined', () => {
    const yaml = `
selector: '#root'
transform: attr(non-existing-attribute)`;
    const conf = ConfigFactory.fromYAML(yaml);
    const result = conf.extract(extractParams);
    const expected = null;

    expect(result).toBe(expected);
  });

  it('ReturnAllAttributesWhenNoAttrNameGiven', () => {
    const yaml = `
selector: multiple-attributes
transform: attr()`;
    const conf = ConfigFactory.fromYAML(yaml);
    const result = conf.extract(extractParams);
    const expected = {
      foo: 'bar',
      baz: 'abc',
      other: 'attribute value',
    };

    expect(result).toMatchObject(expected);
  });

  it('ReturnEmptyObjectWhenNoAttrDefined', () => {
    const yaml = `
selector: no-attributes
transform: attr()`;
    const conf = ConfigFactory.fromYAML(yaml);
    const result = conf.extract(extractParams);
    const expected = {};

    expect(result).toMatchObject(expected);
  });

  it('SelectMultipleAttributes', () => {
    const yaml = `
selector: multiple-attributes
transform: attr(foo, baz)`;
    const conf = ConfigFactory.fromYAML(yaml);
    const result = conf.extract(extractParams);
    const expected = {
      foo: 'bar',
      baz: 'abc',
    };

    expect(result).toMatchObject(expected);
  });

  it('should select multiple attributes for array elems', () => {
    const yaml = `
selector: list item
items: { transform: 'attr(a, b)' }`;
    const conf = ConfigFactory.fromYAML(yaml);
    const result = conf.extract(extractParams);
    const expected = [
      { a: 'a1', b: 'b1' },
      { a: 'a2', b: 'b2' },
      { a: 'a3', b: 'b3' },
      { a: 'a4', b: 'b4' },
    ];

    expect(result).toStrictEqual(expected);
  });

  it('nested list', async () => {
    const yaml = `
selector: nested-list nested-item
items: { selector: 'a[a]', transform: attr(a) }`;
    const conf = ConfigFactory.fromYAML(yaml);
    const result = conf.extract(extractParams);
    const expected = ['a1', 'a2', 'a3'];

    expect(result).toStrictEqual(expected);
  });
});

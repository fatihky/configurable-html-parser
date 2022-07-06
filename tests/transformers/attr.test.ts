import { load } from "cheerio";
import { ConfigFactory } from "../../src";

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
  </div>
`;

describe('AttrTransformer', () => {
  let $, $el;

  beforeAll(() => {
    $ = load(SAMPLE);
    $el = $('*');
  });

  it('ReturnAttributeValue', () => {
    const yaml = `
selector: '#root'
transform: attr(id)`;
    const conf = ConfigFactory.fromYAML(yaml);
    const result = conf.extract($, $el);
    const expected = 'root';

    expect(result).toBe(expected);
  });

  it('ReturnNullWhenAttributeIsNotDefined', () => {
    const yaml = `
selector: '#root'
transform: attr(non-existing-attribute)`;
    const conf = ConfigFactory.fromYAML(yaml);
    const result = conf.extract($, $el);
    const expected = null;

    expect(result).toBe(expected);
  });

  it('ReturnAllAttributesWhenNoAttrNameGiven', () => {
    const yaml = `
selector: multiple-attributes
transform: attr()`;
    const conf = ConfigFactory.fromYAML(yaml);
    const result = conf.extract($, $el);
    const expected = {
      foo: 'bar',
      baz: 'abc',
      other: 'attribute value'
    };

    expect(result).toMatchObject(expected);
  });

  it('ReturnEmptyObjectWhenNoAttrDefined', () => {
    const yaml = `
selector: no-attributes
transform: attr()`;
    const conf = ConfigFactory.fromYAML(yaml);
    const result = conf.extract($, $el);
    const expected = {};

    expect(result).toMatchObject(expected);
  });

  it('SelectMultipleAttributes', () => {
    const yaml = `
selector: multiple-attributes
transform: attr(foo, baz)`;
    const conf = ConfigFactory.fromYAML(yaml);
    const result = conf.extract($, $el);
    const expected = {
      foo: 'bar',
      baz: 'abc'
    };

    expect(result).toMatchObject(expected);
  });
});

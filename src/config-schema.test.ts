describe('Base', () => {
  it('AllowEmptyConfigs', () => expect({}).toBeValidConfig());
  it('NoAdditionalProperties', () =>
    expect({ foo: 'bar' }).not.toBeValidConfig()
  );
});

describe('Selector', () => {
  it('MustBeStringOrStringArray', () => {
    expect({ selector: 123 }).not.toBeValidConfig();
    expect({ selector: true }).not.toBeValidConfig();
    expect({ selector: {} }).not.toBeValidConfig();
    expect({ selector: '.foo' }).toBeValidConfig();
    expect({ selector: ['.foo'] }).toBeValidConfig();
  });

  it('CannotBeEmpty', () => {
    expect({ selector: '' }).not.toBeValidConfig();
    expect({ selector: [] }).not.toBeValidConfig();
  });
});

describe('String', () => {
  it('Selector', () => expect({ selector: '.foo' }).toBeValidConfig());
});

describe('Object', () => {
  it('ImplyTypeToBeObjectWhenPropertiesPresent', () => {
    expect({
      selector: '.foo',
      properties: { foo: { selector: '.bar' } },
      type: 'object',
    }).toBeValidConfig();
    expect({
      selector: '.foo',
      properties: { foo: { selector: '.bar' } },
      type: 'string',
    }).not.toBeValidConfig();
  });

  it('PropertiesMustBeValidConfigs', () => {
    expect({ properties: { x: 123 } }).not.toBeValidConfig();
    expect({
      selector: '.ttt',
      properties: { x: { selector: '.foo' } },
    }).toBeValidConfig();
  });

  it('PropertiesMustBeDefinedWhenTypeIsObject', () => {
    expect({ selector: '.bar', type: 'object' }).not.toBeValidConfig();
  });

  it('CannotHaveTransform', () => {
    const conf = {
      selector: '.foo',
      properties: {
        x: { selector: '.x' },
      },
      transform: 'length'
    };

    expect(conf).not.toBeValidConfig();
  });
});

describe('Array', () => {
  it('ImplyTypeToBeArrayWhenItemsPresent', () => {
    expect({
      selector: '.foo',
      items: { selector: '.tt' },
      type: 'array',
    }).toBeValidConfig();

    expect({
      selector: '.foo',
      items: { selector: '.tt' },
      type: 'string',
    }).not.toBeValidConfig();
  });

  it('CannotHaveTransformAndItemsTogether', () => {
    const conf = {
      selector: '.foo',
      type: 'array',
      items: {
        selector: '.x',
      },
      transform: 'length'
    };

    expect(conf).not.toBeValidConfig();
  });
});

describe('Union', () => {
  it('MustNotBeEmpty', () => {
    expect({ union: [] }).not.toBeValidConfig();
  });

  it('MustNotContainInvalidConfig', () => {
    expect({ union: [123] }).not.toBeValidConfig();
    expect({ union: [{ selector: 123 }] }).not.toBeValidConfig();
  })

  it('MustForbidAnyOtherProps', () => {
    expect({ union: [{ selector: '.foo' }], selector: '.bar' }).not.toBeValidConfig();
  });
});

describe('Transform', () => {
  it('FailOnNonStringValues', () => expect({ selector: '.foo', transform: 123 }).not.toBeValidConfig());

  it('ValidTransformer', () => {
    expect({ selector: '.foo', transform: 'length' }).toBeValidConfig();
  });

  it('AllowStringArray', () => {
    expect({ selector: '.foo', transform: ['length', 'trim'] }).toBeValidConfig();
  });

  it('StringArrayCannotBeEmpty', () => {
    expect({ selector: '.foo', transform: [] }).not.toBeValidConfig();
  });
});

describe('Constant', () => {
  it('String', () => {
    expect({ constant: 'foo' }).toBeValidConfig();
  });

  it('Number', () => {
    expect({ constant: 123 }).toBeValidConfig();
  });

  it('Boolean', () => {
    expect({ constant: true }).toBeValidConfig();
  });

  it('Object', () => {
    expect({ constant: { foo: 'bar' } }).toBeValidConfig();
  });

  it('Array', () => {
    expect({ constant: [ 'foo' ] }).toBeValidConfig();
  });
});

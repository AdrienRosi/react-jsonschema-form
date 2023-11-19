import { schemaRequiresConstValue } from '../src';

describe('schemaRequiresConstValue()', () => {
  it('const', () => {
    expect(schemaRequiresConstValue({ const: 'foo' })).toBe(true);
  });
  it('enum with multiple', () => {
    expect(schemaRequiresConstValue({ enum: ['foo', 'bar'] })).toBe(false);
  });
  it('enum with one', () => {
    expect(schemaRequiresConstValue({ enum: ['foo'] })).toBe(true);
  });
  it('anyOf with multiple', () => {
    expect(
      schemaRequiresConstValue({
        anyOf: [{ type: 'string' }, { type: 'number' }],
      })
    ).toBe(false);
  });
  it('anyOf with one that would require true', () => {
    expect(
      schemaRequiresConstValue({
        anyOf: [{ const: 'foo' }],
      })
    ).toBe(true);
  });
  it('anyOf with one that would not require true', () => {
    expect(
      schemaRequiresConstValue({
        anyOf: [{ type: 'string' }],
      })
    ).toBe(false);
  });
  it('oneOf with multiple', () => {
    expect(
      schemaRequiresConstValue({
        oneOf: [{ type: 'string' }, { type: 'number' }],
      })
    ).toBe(false);
  });
  it('oneOf with one that would require true', () => {
    expect(
      schemaRequiresConstValue({
        oneOf: [{ const: 'foo' }],
      })
    ).toBe(true);
  });
  it('oneOf with one that would not require true', () => {
    expect(
      schemaRequiresConstValue({
        oneOf: [{ type: 'string' }],
      })
    ).toBe(false);
  });
  it('allOf with multiple', () => {
    expect(
      schemaRequiresConstValue({
        allOf: [{ type: 'string' }, { type: 'number' }],
      })
    ).toBe(false);
  });
  it('allOf with one that would require true', () => {
    expect(
      schemaRequiresConstValue({
        allOf: [{ const: true }],
      })
    ).toBe(true);
  });
  it('allOf with one that would not require true', () => {
    expect(
      schemaRequiresConstValue({
        allOf: [{ type: 'string' }],
      })
    ).toBe(false);
  });
  it('simply doesn`t require true', () => {
    expect(schemaRequiresConstValue({ type: 'string' })).toBe(false);
  });
});

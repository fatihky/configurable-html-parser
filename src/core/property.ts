export const rootProp: unique symbol = Symbol('rootProp');

export type Property = typeof rootProp | string;

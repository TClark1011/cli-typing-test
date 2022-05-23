const subtractFrom = (a: number, b: number) => a - b;

export const _subtractFrom = (b: number) => (a: number) => subtractFrom(a, b);

export default subtractFrom;

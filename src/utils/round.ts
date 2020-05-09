/**
 * Round a number to a defined precision.
 *
 * @export
 * @param {number} number
 * @param {number} [precision=0]
 * @returns {number}
 */
export function round(number: number, precision: number = 0): number {
  const pow = Math.pow(10, precision);
  return Math.round(number * pow) / pow;
}

import { it, expect, describe } from "vitest";
import { formatMoney } from "./money.ts";

describe('formatMoney', () => {
  it('formats 1999 as $19.99', () => {
    expect(formatMoney(1999)).toBe('19.99')
  })
  it('formats 100 as $1.00', () => {
    expect(formatMoney(100)).toBe('1.00')
  })
})

import { evaluate } from "mathjs";

export const calculate = (formula: string | undefined) => {
  if (!formula) {
    return 0;
  }
  try {
    const input = formula.includes(",")
      ? formula.replaceAll(",", ".")
      : formula;
    const result = evaluate(input);
    return +result;
  } catch {
    return 0;
  }
};

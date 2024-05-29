export const calculate = (formula: string | undefined) => {
  const tryToNumber = Number(formula);
  if (!isNaN(tryToNumber)) {
    return tryToNumber;
  }

  return 10;
};

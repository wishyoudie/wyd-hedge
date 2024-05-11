export const getSearchParam = (
  searchParams: Record<string, string>,
  param: string,
  fallback: string,
) => {
  if (searchParams) {
    if (param in searchParams) {
      return searchParams[param]!;
    }
  }

  return fallback;
};

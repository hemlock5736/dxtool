export const match = (item: string, criteria: string) => {
  return criteria.toLowerCase().includes(item.toLowerCase());
};

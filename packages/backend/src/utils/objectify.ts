export const objectify = <T>(records: T[], key: keyof T): { key: T } => {
  const entries = records.map((record) => [record[key], record]);
  const object = Object.fromEntries(entries);
  return object;
};

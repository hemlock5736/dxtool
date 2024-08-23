export const makeRowContents = <T>(object: T, columnNames: (keyof T)[]) => {
  return columnNames.map((columnName) => object[columnName]);
};

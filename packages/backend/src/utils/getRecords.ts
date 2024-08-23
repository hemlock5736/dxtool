import { SheetName } from "../types/SheetName";

export const getRecords = <T>(sheetName: SheetName): [T[], (keyof T)[]] => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    return [[], []];
  }
  const range = sheet.getDataRange();
  const values = range.getValues();
  const columnNames = values[0];
  const records = values.slice(1);
  const objects = records.map((record) => {
    const entries = columnNames.map((columnName, i) => [columnName, record[i]]);
    return Object.fromEntries(entries);
  });
  return [objects, columnNames];
};

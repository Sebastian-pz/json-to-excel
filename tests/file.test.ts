import { describe, expect, test, beforeAll } from "@jest/globals";
import fs from "fs";

import { ExcelFromJSON } from "../index.ts";
import { bookName, outputDir, sheetName, users } from "./utils/index.ts";

let file: ExcelFromJSON;

beforeAll(() => {
  file = new ExcelFromJSON();
});

describe("Excel from JSON class", () => {
  test("File should be an instance of ExcelFromJSON", () => {
    expect(file).toBeInstanceOf(ExcelFromJSON);
  });

  test("Should create WorkBook", () => {
    file.createBook(bookName);
    expect(file.book).not.toBeUndefined();
  });

  test(`WorkBook's name should be ${bookName}`, () => {
    expect(file.bookName).toBe(bookName);
  });

  test("Should create user sheet into the book", () => {
    file.createSheets([{ jsonData: users, name: sheetName }]);
    expect(file.totalSheets).toBe(1);
  });

  test("Should save book in local system", () => {
    file.saveBook(outputDir);
    const savedBook = fs.readFileSync(`${outputDir}/${bookName}.xlsx`);
    expect(savedBook).not.toBeUndefined();
  });
});

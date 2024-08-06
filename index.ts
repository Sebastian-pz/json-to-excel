import { WorkBook, WorkSheet } from "xlsx";
import { SheetDataI } from "./utils/interfaces.ts";

export class ExcelFromJSON {
  private xlsx: any;
  public book: WorkBook | undefined;
  public bookName: string = "default";
  public totalSheets: number = 0;

  constructor(xlsx: any) {
    this.xlsx = xlsx;
  }

  createBook(bookName: string) {
    this.book = this.xlsx.utils.book_new();
    this.bookName = bookName;
    return this;
  }

  createSheets(sheetsData: Array<SheetDataI>) {
    sheetsData.forEach((sheet) => {
      const newSheet = this.xlsx.utils.json_to_sheet(sheet.jsonData);
      this.addSheetToBook(sheet.name, newSheet);
      this.totalSheets++;
    });
    return this;
  }

  private addSheetToBook(sheetName: string, workSheet: WorkSheet) {
    if (!this.book) throw new Error("Book is undefined");
    this.xlsx.utils.book_append_sheet(this.book, workSheet, sheetName);
    return this;
  }

  public saveBook(outputDir: string) {
    if (!this.book) throw new Error("Book is undefined");
    this.xlsx.writeFile(this.book, `${outputDir}/${this.bookName}.xlsx`);
    return this;
  }
}

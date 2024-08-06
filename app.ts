import xlsx from "xlsx";

import { ExcelFromJSON } from "./index.ts";

const n = new ExcelFromJSON(xlsx);
n.createBook("Example Book");
if (n instanceof ExcelFromJSON) {
  console.log("App working well");
} else {
  console.error("Something went wrong");
}

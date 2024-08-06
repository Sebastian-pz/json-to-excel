import { ExcelFromJSON } from "./index.ts";

const n = new ExcelFromJSON();
n.createBook("Example Book");
if (n instanceof ExcelFromJSON) {
  console.log("App working well");
} else {
  console.error("Something went wrong");
}

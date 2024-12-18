import fs from "fs";
import path from "path";

// Path to the countries.json file
const filePath = path.join("./public/countries.json");

// Read the countries.json file
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Parse the JSON data
  let countries = JSON.parse(data);

  // Sort the countries by id in ascending order
  countries.sort((a, b) => parseInt(a.id) - parseInt(b.id));

  // Write the sorted data back to the file
  fs.writeFile(filePath, JSON.stringify(countries, null, 2), "utf8", (err) => {
    if (err) {
      console.error("Error writing the file:", err);
      return;
    }
    console.log("Countries sorted by id and saved successfully.");
  });
});

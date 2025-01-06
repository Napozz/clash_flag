import fs from "fs";
import path from "path";

// Path to the countries.json file
const filePath = path.join("./public/countries.json");
const countries = JSON.parse(fs.readFileSync(filePath, "utf8"));

// Read the countries.json file
const sortedCountries = countries.sort(
  (a, b) => parseInt(a.id) - parseInt(b.id)
);

// Reindex IDs sequentially
const reindexedCountries = sortedCountries.map((country, index) => ({
  ...country,
  id: (index + 1).toString(),
}));

// Write back to file with pretty formatting
fs.writeFileSync(filePath, JSON.stringify(reindexedCountries, null, 2), "utf8");

console.log("Countries sorted and reindexed successfully");

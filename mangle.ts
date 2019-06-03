import { parse, ParseConfig } from "papaparse";
import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

import parties from "./parties.json";
import wahlgebiete from "./wahlgebiete.json";

function mapParties(dataSet: any) {
  for (const [key, party] of Object.entries<string>(parties)) {
    dataSet[party] = dataSet[key];
    delete dataSet[key];
  }
  return dataSet;
}

function loadData(fileName: string) {
  const parsed = parse(
    readFileSync(resolve(__dirname, "orig", fileName), {
      encoding: "utf8"
    }),
    {
      delimiter: ";",
      header: true,
      transformHeader: (header: keyof typeof parties): string =>
        parties[header] || header,
      skipEmptyLines: true
    } as ParseConfig
  );

  return parsed.data;
}

const strassen = loadData("./opendata-strassen.csv");
const wahllokale = loadData("./opendata-wahllokale.csv");
const ergebnisse_stadt = loadData("./Open-Data-Europawahl203.csv");
const ergebnisse_wahlbezirke = (function(data) {
  return data;
})(loadData("./Open-Data-Europawahl206.csv"));
const ergebnisse_stadtbezirke = loadData("./Open-Data-Europawahl208.csv");

const combined = {
  wahlgebiete,
  strassen,
  wahllokale,
  ergebnisse_stadt,
  ergebnisse_stadtbezirke,
  ergebnisse_wahlbezirke
};

writeFileSync(resolve(__dirname, "combined.json"), JSON.stringify(combined));

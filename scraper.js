import fetchData from "./fetchdata.js";
import fs from "fs";

async function scrape() {
  const data = await fetchData(1000);

  if (data.errors) {
    console.log(data.errors);
    return;
  }
  let processedData = data.data;

  console.log(data);
  data.data.fs_ts_search.forEach(({ address }) => {
    console.log(address);
  });

  try {
    fs.writeFileSync("data.json", JSON.stringify(processedData));
  } catch (error) {
    console.log(error);
  }
}

scrape();

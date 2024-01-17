
async function logJSONData() {
    const response = await fetch("https://data.goteborg.se/BikeService/v1.2/PumpStations/31f2822c-1bbc-4818-b6ef-ab13ff6a2b22?format=json");
    const jsonData = await response.json();
    console.log(jsonData);
  }
logJSONData();
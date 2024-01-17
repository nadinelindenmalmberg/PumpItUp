const fetchPumpStations = async (req, res) => {
    try {
        const response = await fetch("https://data.goteborg.se/BikeService/v1.2/PumpStations/31f2822c-1bbc-4818-b6ef-ab13ff6a2b22?format=json");
        const jsonData = await response.json();

        // Filter out objects with invalid values
        const filteredData = jsonData.filter(
            (obj) =>
                obj.Lat !== 1000 && obj.Lon !== 1000 && obj.ID !== 29
        );

        // Return the filtered data as a JSON object
        res.status(200).json(filteredData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
    fetchPumpStations,
};

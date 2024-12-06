const getRegions = async (location) => {
    const username = 'guc_dashboard';
    if (location === 'San Francisco') {
        location = 'SanFrancisco';
    }
    const url = `http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${username}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return data.geonames[0].countryName;
    }
    catch (error) {
        console.log(error);
    }
};

module.exports = getRegions;

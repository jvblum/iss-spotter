const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) return callback(Error(`Status Code ${response.statusCode} when fetching coodinates by IP: ${body}`), null);
    const coords = {lat: JSON.parse(body).latitude, lon: JSON.parse(body).longitude};
    callback(null, (null, coords));
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(` https://iss-pass.herokuapp.com/json/?lat=${coords.lat}&lon=${coords.lon}`, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) return callback(Error(`Status Code ${response.statusCode} when fetching ISS flyover times: ${body}`), null);
    callback(null, (null, JSON.parse(body).response));
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) return console.log(`Failed to fetch IP\n\n${error}`);

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) return console.log(`Failed to fetch coordinates by IP\n\n${error}`);

      fetchISSFlyOverTimes(coords, (error, issData) => {
        if (error) return console.log(`Failed to fetch ISS data\n\n${error}`);
        callback(null, issData);
      });
    });
  });
};

module.exports = nextISSTimesForMyLocation;
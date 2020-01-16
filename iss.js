const request = require('request');
  

const fetchMyIp = function(callback) {
  let ip, err;
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if (err) {
      err = "api call failed.";
    } else if (response.statusCode !== 200) {
      err = Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`);
    } else {
      ip = JSON.parse(body);
    }
    callback(err, ip);
  });
};

//

const fetchCoordsByIp = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (err, response, body) => {
    if (err)
      return callback(err, null);
    else if (response.statusCode !== 200)
      return callback(`Response status code of ${response.statusCode}, exiting.`);
    else {
      const geoData = JSON.parse(body).data;
      callback(err, { latitude: geoData.latitude, longitude: geoData.longitude });
    }
  });
};


module.exports = {
  fetchMyIp,
  fetchCoordsByIp
};


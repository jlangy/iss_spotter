const request = require('request');
  

const fetchMyIp = function(callback) {
  let ip, err;
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if (err) {
      err = "api call failed.";
    } else if (response.statusCode !== 200) {
      err = Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`);
    } else {
      ip = JSON.parse(body).ip;
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
      return callback(Error(`Response status code of ${response.statusCode}, exiting.`));
    else {
      const geoData = JSON.parse(body).data;
      callback(err, { latitude: geoData.latitude, longitude: geoData.longitude });
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (err,response, body) => {
    if (err)
      return callback(err, null);
    else if (response.statusCode !== 200) {
      return callback(Error(`Response status code of ${response.statusCode}, exiting.`));
    } 
      const flyoversTImes = JSON.parse(body).response;
      callback(err, flyoversTImes);    
  });
};

const nextISSTimesForMyLocation = function(callback){
  fetchMyIp((err, ip) => {
    if(err)
      return callback(err, null);
    fetchCoordsByIp(ip, (err, coords) => {
      if(err)
        return callback(err, null);
      fetchISSFlyOverTimes(coords, (err, flyoversTImes) => {
        if(err)
          return callback(err, null);
        callback(err,flyoversTImes);
      });
    })
  });
}

module.exports = {
  fetchMyIp,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};


const request = require('request-promise-native');

const fetchMyIp = function(){
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIp = function(ip){
  const ipAddress = JSON.parse(ip).ip;
  return request('https://ipvigilante.com/' + ipAddress);
}

const fetchISSFlyOverTimes = function(geoData){
  geoData = JSON.parse(geoData).data;
  const latitude = geoData.latitude;
  const longitude = geoData.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`)
}

const nextISSTimesForMyLocation = function(){
  return fetchMyIp()
    .then(fetchCoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then(flyOverTimes => {
      return JSON.parse(flyOverTimes).response;
    });
}


module.exports = { nextISSTimesForMyLocation }
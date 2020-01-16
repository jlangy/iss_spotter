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


module.exports = { fetchMyIp };


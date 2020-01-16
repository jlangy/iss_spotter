const request = require('request');
const IpURL = 'https://api.ipify.org?format=json';
  

const fetchMyIp = function(IpURL, callback) {
  let ip, err;
  request(IpURL, (err, response, body) => {
    if (err) {
      err = "api call failed.";
    } else {
      ip = JSON.parse(body);
    }
    callback(err, ip);
  });
};

fetchMyIp(IpURL, console.log);
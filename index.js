
const { fetchMyIp, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchCoordsByIp('44216.232.132.90', (err, coords) => {
//   if(err)
//     console.log(err);
//   else
//     console.log('All working, coords: ', coords);
// });

// fetchMyIp((err, ip) => {
//   if(err)
//     console.log(err);
//   else {
//     console.log(ip);
//   }
// });

// fetchISSFlyOverTimes({latitude: 45, longitude: 45}, (err, flyoverTimes) => {
//   if (err)
//     console.log(err);
//   else {
//     console.log(flyoverTimes);
//   }
// });

nextISSTimesForMyLocation((err, times) => {
  if(error){
    return console.log('Error:', err)
  } else {
    console.log('Working, ', times);
  }
});
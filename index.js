
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
  if(err){
    return console.log('Error:', err)
  } else {
    times.forEach(time => {
      const flyByDate = new Date(time.risetime * 1000).toUTCString();
      console.log(`Next pass at ${flyByDate} for ${time.duration} seconds!`);
    });
  }
});
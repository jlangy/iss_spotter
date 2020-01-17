const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((response) => {
    response.forEach(timesObj => {
      var date = new Date(timesObj.risetime * 1000).toUTCString();
      console.log(`Next pass at ${date} for ${timesObj.duration} seconds!`);      
    });
  })
  .catch((error) => {
    console.log(error.message);
  });


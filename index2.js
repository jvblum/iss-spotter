const iss = require('./iss_promised');

const printPassTimes = function(passTimes) { // cp
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

iss()
  .then(passTimes => printPassTimes(passTimes))
  .catch(error => console.log(`\n${error}\n`));
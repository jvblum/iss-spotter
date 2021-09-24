const iss = require('./iss');

const printPassTimes = function(passTimes) { // cp
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

iss((error, passTime) => {
  if (error) return console.log("It didn't work!");
  printPassTimes(passTime);
});
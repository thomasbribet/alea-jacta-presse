const fetch = require("node-fetch");

const wakeUpDyno = (url, interval = 25) => {
  const milliseconds = interval * 60000;
  setTimeout(() => {
    try {
      console.log(`setTimeout called.`);
      // Request to the dyno's url
      fetch(url).then(() => console.log(`Fetching ${url}.`));
    } catch (err) {
      console.log(`Error fetching ${url}: ${err.message} 
            Will try again in ${interval} minutes...`);
    } finally {
      // Do it all again
      return wakeUpDyno(url, interval);
    }
  }, milliseconds);
};

module.exports = wakeUpDyno;

const cron = require("node-cron");
const syncEvent = require("./syncEvent.ts");

cron.schedule("15 * * * * *", function () {
  console.log("running a task every minute");
  syncEvent();
});

syncEvent();

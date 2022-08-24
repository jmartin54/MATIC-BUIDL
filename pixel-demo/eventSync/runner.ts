const eventSync = require("./eventSync.ts");
const syncEvent = require("./syncEvent.ts");
function ok() {
  //   eventSync();
  syncEvent();
  console.log(";P");
}
ok();

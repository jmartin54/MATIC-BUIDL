"use strict";

const fs = require("fs");

function FileSystemsAndShit() {
  let ohnoiceyogapants;
  try {
    const fuckingolddddata = fs.readFileSync("shisdo.json");
    ohnoiceyogapants = JSON.parse(fuckingolddddata);
  } catch (err) {
    console.log(err);
    ohnoiceyogapants = [];
  }
  const someFuckingData = [
    {
      lol: "event",
      whenthefcuk: Date.now(),
    },
  ];
  const data = JSON.stringify([...ohnoiceyogapants, ...someFuckingData]);
  fs.writeFile("shisdo.json", data, (err) => {
    if (err) throw err;
    console.log("donnneee.sotrueeee");
  });
}

FileSystemsAndShit();

module.exports = FileSystemsAndShit;

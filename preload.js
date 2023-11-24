// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("main-button").addEventListener("click", async function () {
    const ports = await SerialPort.list();
    console.log(ports);

    console.log(ports[0].path);
    const port = new SerialPort({ path: ports[0].path, baudRate: 9600 });
    console.log(port);

    const parser = new ReadlineParser();
    port.pipe(parser);

    parser.on("data", (line) => console.log(line));

    // Write the data to the serial port
    port.write("ROBOT POWER ON");
    port.write("ROBOT POWER ON");
  });
});

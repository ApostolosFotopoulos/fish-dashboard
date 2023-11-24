// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { SerialPort } = require("serialport");
const tableify = require("tableify");

async function listSerialPorts() {
  try {
    const ports = await SerialPort.list();

    if (ports.length === 0) {
      document.getElementById("error").textContent = "No ports discovered";
    }

    const tableHTML = tableify(ports);
    document.getElementById("ports").innerHTML = tableHTML;
  } catch (error) {
    document.getElementById("error").textContent = error.message;
  }
}

function listPorts() {
  listSerialPorts();
  setTimeout(listPorts, 2000);
}

// Set a timeout that will check for new serialPorts every 2 seconds.
// This timeout reschedules itself.
setTimeout(listPorts, 2000);

listSerialPorts();

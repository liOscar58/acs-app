var SerialPort = require('serialport'); // include the serialport library
var portName = process.argv[2]; // get the port name from the command line
var myPort = new SerialPort(portName, 9600);// open the port
 
// these are the definitions for the serial events:
myPort.on('open', openPort); // called when the serial port opens
 
function openPort() {
    console.log('port open');
    console.log('baud rate: ' + myPort.baudRate);
}
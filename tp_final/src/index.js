const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');

var osu = require('node-os-utils');
var cpu = osu.cpu;

var osu = require('node-os-utils');
var mem = osu.mem;

var osu = require('node-os-utils');
var os = osu.os;

const server = express();

server.set('port', process.env.PORT || 5000);

server.use(express.json());

server.use(cors());

server.use(require('./routes/route.clientes'));
server.use(require('./routes/route.equipos'));


const servidor = server.listen(server.get('port'), () => {
	console.log('Servidor corriendo en el puerto:',server.get('port'));
});

const socket = socketio(servidor);

socket.on('connection', (socket)=> {

	setInterval(() => {
		cpu.usage()
		.then(cpuPercentage => {
		socket.emit('cpu_porcentual',cpuPercentage)
		});
		mem.info()
		.then(mem => {
		socket.emit('mem_info',mem)
		});
		os.oos()
		.then(OS => {
		socket.emit('distro',OS)
		});
	},1000);
});

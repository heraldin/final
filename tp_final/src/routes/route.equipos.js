const express = require('express');
const router = express.Router();

const inet = require("inet");

const db = require('../database');

//listar los equipos
router.get('/equipos', async (req,res) => {

    await db.query('select id_host,hostname,inet_ntoa(dir_ip) as dir_ip,date_format(fecha_carga,"%Y-%m-%d") as fecha_carga,cliente from equipos', (err,rows) => {
		if(!err){
			res.json(rows);
		}else{
			res.json('Error al traer los datos de la tabla equipos');
		}
	});

});

//Guarda un equipo
router.post('/equipos', async (req,res) => {
	const unEqp = {
        hostname:req.body.hostname,
        dir_ip:inet.aton(req.body.dir_ip),
        fecha_carga:req.body.fecha_carga,
        cliente:req.body.cliente,
    }
	await db.query('insert into equipos set ?',[unEqp]);
	res.json('El equipo se guardo correctamente');
});

//actualizar equipo
router.put('/equipos/:cod', async (req,res) => {
	const ID = req.params.cod;
	const unEqp = {
        hostname:req.body.hostname,
        dir_ip:inet.aton(req.body.dir_ip),
        fecha_carga:req.body.fecha_carga,
        cliente:req.body.cliente,
    }
	await db.query('update equipos set ? where id_host = ?',[unEqp,ID]);
	res.json('El equipo se actualizo correctamente!');
});

//Elimina un equipo
router.delete('/equipos/:ID', (req,res) => {
	var ID = req.params.ID;
	db.query('delete from equipos where id_host = ?',[ID]);
	res.json('El equipo fue eliminado con exito');
});

module.exports = router;
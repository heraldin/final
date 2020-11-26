const express = require('express');
const router = express.Router();

const db = require('../database');

//listar los articulos
router.get('/clientes', (req,res) => {

    db.query('select * from clientes', (err,rows) => {
		if(!err){
			res.json(rows);
		}else{
			res.json('Error al traer los datos de la tabla clientes');
		}
	});

});

//Guarda un cliente
router.post('/clientes', (req,res) => {
	const unCli = req.body;
	db.query('insert into clientes set ?',[unCli])
	res.json('El cliente se guardado exitosamente');
});

//actualizar cliente
router.put('/clientes/:codigo', (req,res) => {
	const id = req.params.codigo;
	const unCli = req.body;
	db.query('update clientes set ? where id_cliente = ?',[unCli,id]);
	res.json('El cliente se actualizo exitosamente');
});

//Elimina un articulo
router.delete('/clientes/:id', (req,res) => {
	var id = req.params.id;
	db.query('delete from clientes where id_cliente = ?',[id]);
	res.json('El cliente fue eliminado con exito');
});

module.exports = router;
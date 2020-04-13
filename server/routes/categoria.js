const express = require('express')
let { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion')

let app = express();

let Categoria = require('../models/categoria');

//==============================   
// Mostrar todas las categorias
//==============================
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({}) // Si podia haber puesto como callback, pero si hago tareas (polulate) antes debo poner .exec
        .sort('descripcion')
        .populate('usuario', 'nombre email') // Para que no salga solo el object id, sino toda la informacion
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            })

        })

});

//==============================   
// Mostrar categoria por ID
//==============================
app.get('/categoria/:id', verificaToken, (req, res) => {

    Categoria.findById(req.params.id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    })

});

//==============================   
// Crear nueva categoria
//==============================
app.post('/categoria', verificaToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    })

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    })
})

//==============================   
// Actualizar categoria
//==============================
app.put('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    })

})

//==============================   
// Eliminar categoria
//==============================
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {

    let id = req.params.id;


    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria Borrada'
        })

    })

})


//Grabar todos los servicios en postmam


module.exports = app;
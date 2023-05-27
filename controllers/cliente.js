const Cliente = require('../models/cliente')
const { request, response} = require('express')

// crear
const createCliente = async (req = request, 
    res = response) => {
    try{
        const nombre = req.body.nombre 
            ? req.body.nombre.toUpperCase()
            : ''
        const email=req.body.email

        const clienteDB = await Cliente.findOne({nombre})//select * from cliente where nombre=?
        
        if(clienteDB){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre:nombre, // nombre: nombre
            email:email
        }
        const cliente = new Cliente(data)
        console.log(cliente)
        await cliente.save()
        return res.status(201).json(cliente)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

//listar todos
const getClientes = async (req = request, 
    res = response) => {
        try{
            const { estado } = req.query
            const clientesDB = await Cliente.find({estado})//select * from cliente where estado=?
            return res.json(clientesDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

// actualizar por ID
const updateClienteByID = async (req = request,
    res = response) => {
    try{
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id


        /*const tipoproyectoDB = await Cliente.findById(id)
        if(!tipoproyectoDB){
            return res.json({msg: 'No existe el tipo proyecto'})
        }*/



        data.fechaActualizacion = new Date()
        console.log(data)
        const cliente = await Cliente.findByIdAndUpdate(id, data, {new: true})
        return res.json(cliente)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}

module.exports = { createCliente, getClientes, updateClienteByID}
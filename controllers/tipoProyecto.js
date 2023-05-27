const TipoProyecto = require('../models/tipoProyecto')
const { request, response} = require('express')

// crear
const createTipoProyecto = async (req = request, 
    res = response) => {
    try{
        const nombre = req.body.nombre 
            ? req.body.nombre.toUpperCase()
            : ''
        const email=req.body.email

        const tipoProyectoDB = await TipoProyecto.findOne({nombre})//select * from tipoProyecto where nombre=?
        
        if(tipoProyectoDB){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre:nombre, // nombre: nombre
            email:email
        }
        const tipoProyecto = new TipoProyecto(data)
        console.log(tipoProyecto)
        await tipoProyecto.save()
        return res.status(201).json(tipoProyecto)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

//listar todos
const getTipoProyectos = async (req = request, 
    res = response) => {
        try{
            const { estado } = req.query
            const tipoProyectosDB = await TipoProyecto.find({estado})//select * from tipoProyecto where estado=?
            return res.json(tipoProyectosDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

// actualizar por ID
const updateTipoProyectoByID = async (req = request,
    res = response) => {
    try{
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        
        data.nombre = req.body.nombre
        console.log(data)
        const tipoProyecto = await TipoProyecto.findByIdAndUpdate(id, data, {new: true})
        return res.json(tipoProyecto)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}

module.exports = { createTipoProyecto, getTipoProyectos, updateTipoProyectoByID}
const Universidad = require('../models/universidad')
const { request, response} = require('express')

// crear
const createUniversidad = async (req = request, 
    res = response) => {
    try{
        const nombre = req.body.nombre 
            ? req.body.nombre.toUpperCase()
            : ''
        const direccion=req.body.direccion
        const telefono=req.body.telefono




        const universidadDB = await Universidad.findOne({nombre})//select * from universidad where nombre=?
        
        if(universidadDB){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre:nombre, // nombre: nombre
            direccion:direccion,
            telefono:telefono
        }
        const universidad = new Universidad(data)
        console.log(universidad)
        await universidad.save()
        return res.status(201).json(universidad)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

//listar todos
const getUniversidad = async (req = request, 
    res = response) => {
        try{
            const { estado } = req.query
            const universidadsDB = await Universidad.find({estado})//select * from universidad where estado=?
            return res.json(universidadsDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

// actualizar por ID
const updateUniversidadByID = async (req = request,
    res = response) => {
    try{
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        
        data.nombre = req.body.nombre
        console.log(data)
        const universidad = await Universidad.findByIdAndUpdate(id, data, {new: true})
        return res.json(universidad)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}


module.exports = { createUniversidad, getUniversidad, updateUniversidadByID}
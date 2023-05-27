const { Router } = require('express')
const { createCliente,getClientes,updateClienteByID} =
 require('../controllers/cliente')

const router = Router()

// crear
router.post('/', createCliente)

//consultar todos
router.get('/', getClientes)

//edita
router.put('/:id',updateClienteByID)

module.exports = router;
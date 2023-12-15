//doghouses.js
const routes = require('express').Router()

const {
    findAll,
    findByObjectId,
    findById,
    save,
    update,
    remove
} = require('../controllers/doghouses');

routes.get("/", findAll)
routes.get("/:id", findByObjectId)
routes.get("/id/:id", findById)
routes.post("/", save)
routes.put("/:id", update)
routes.delete("/:id", remove)

module.exports=routes
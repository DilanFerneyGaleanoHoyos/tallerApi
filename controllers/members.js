// dogs.js
const Dog = require('../models/model-dog');
const Doghouse = require('../models/model-doghouse');

module.exports = {
    findAll: async (req, res) => {
        try {
            const data = await Dog.find({});
            return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }
    },

    findByObjectId: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await Dog.findById(id);
            return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }
    },

    findById: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await Dog.find({ id: id });
            return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }
    },

    save: async (req, res) => {
        const { id } = req.params;

        try {
            const doghouse = await Doghouse.findById(id);

            if (doghouse) {
                try {
                    const dog = new Dog(req.body);
                    dog.doghouse = doghouse;
                    const result = await dog.save();
                    doghouseObject = doghouse.toObject();
                    doghouseObject.residents.push(dog);
                    await doghouse.updateOne(doghouseObject);
                    return res.status(200).json({ "status": true, "data": result });
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({ "status": false, "error": error });
                }
            } else {
                return res.status(404).json({ "status": false, "error": "La Casa de Perros No Existe" });
            }
        } catch (error) {
            return res.status(500).json({ "status": false, "error": "El id está incompleto" });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await Dog.findByIdAndUpdate(id, req.body);
            return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }
    },

    remove: async (req, res) => {
        const { id } = req.params;
        try {
            const dog = await Dog.findById(id);
            if (dog) {
                const doghouseId = dog.doghouse;
                const data = await Dog.findByIdAndDelete(id);
                if (data) {
                    const doghouse = await Doghouse.findById(doghouseId);
                    doghouse.residents.pull(id);
                    await doghouse.save();
                    return res.status(200).json({ "status": true, "data": data });
                } else {
                    return res.status(404).json({ "status": false, "error": "Perro no encontrado" });
                }
            } else {
                return res.status(404).json({ "status": false, "error": "Perro no encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ "status": false, "error": error });
        }
    }
};

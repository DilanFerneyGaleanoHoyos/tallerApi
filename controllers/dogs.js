const Dog = require('../models/model-dog');
const DogHouse = require('../models/model-doghouse'); // Asumiendo que existe un modelo de 'doghouses'

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
        try {
            const dogHouseId = req.body.doghouses; // Assuming 'doghouses' is provided in the request body
            const dogHouse = await DogHouse.findById(dogHouseId);

            if (dogHouse) {
                try {
                    const dog = new Dog(req.body);
                    dog.doghouses = dogHouse;
                    const result = await dog.save();

                    // Update doghouse with new dog
                    dogHouse.dogs.push(dog);
                    await dogHouse.save();

                    return res.status(200).json({ "status": true, "data": result });
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({ "status": false, "error": error });
                }
            } else {
                return res.status(404).json({ "status": false, "error": "La casa para perros no existe" });
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
                const dogHouseId = dog.doghouses;
                const data = await Dog.findByIdAndDelete(id);
                if (data) {
                    const dogHouse = await DogHouse.findById(dogHouseId);
                    dogHouse.dogs.pull(id);
                    await dogHouse.save();
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

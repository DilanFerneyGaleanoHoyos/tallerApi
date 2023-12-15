// doghouse.js
const Doghouse = require('../models/model-doghouses');
const Dog = require('../models/model-dogs');

module.exports = {
    findAll: async (req, res) => {
        try {
            const data = await Doghouse.find({}).populate('dogs');
            return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }
    },

    findByObjectId: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await Doghouse.findById(id).populate('dogs');
            return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }},

    findById: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await Doghouse.find({ id: id }).populate('dogs');
            return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }
    },

    save: async (req, res) => {
        const doghouse = new Doghouse(req.body);

        try {
            const data = await doghouse.save();
            return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await Doghouse.findByIdAndUpdate(id, req.body);
            return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }
    },

    remove: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await Doghouse.findByIdAndDelete(id, req.body);
            await Dog.deleteMany({ doghouse: id });
            return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }
    }
};

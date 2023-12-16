// doghouse.js
const Band = require('../models/model-doghouses');
const Member = require('../models/model-dogs');

module.exports = {
    findAll: async (req, res) => {
        try {
            const data = await Band.find({}).populate('dogs')
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    findByObjectId: async (req, res) => {
        const { id } = req.params
        try {
            const data = await Band.findById(id).populate('dogs')
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }


    },

    findById: async (req, res) => {
        const { id } = req.params
        try {
            const data = await Band.find({ id: id }).populate('dogs')
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    save: async (req, res) => {
        const band = new Band(req.body)

        try {
            const data = await band.save()
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    update: async (req, res) => {
        const { id } = req.params
        try {
            const data = await Band.findByIdAndUpdate(id, req.body)
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    remove: async (req, res) => {
        const { id } = req.params
        try {
            const data = await Band.findByIdAndDelete(id, req.body)
            await Member.deleteMany({ band: id });
            return res.status(200).json({ "state":true,"data": data})
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    }
}
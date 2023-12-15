// dogs.js
const Member = require('../models/model-dogs');
const Band = require('../models/model-doghouses');

module.exports={
    findAll:async(req, res)=>{
        try{
            const data = await Member.find({})
            return res.status(200).json({"state":true, "data":data})
        }catch(error){
            return res.status(500).json({"state":false,"error":error})
        }
    },

    findByObjectId:async(req, res)=>{
        const {id}=req.params
        try{
            const data = await Member.findById(id)
            return res.status(200).json({"state":true, "data":data})
        }catch(error){
            return res.status(500).json({"state":false,"error":error})
        }
    },

    findById:async(req, res)=>{
        const {id} = req.params
        try{
            const data = await Member.find({id:id})
            return res.status(200).json({"state":true, "data":data})
        }catch(error){
            return res.status(500).json({"state":false,"error":error})
        }
    },

    save: async (req, res) => {
        const { id } = req.params;
    
        try {
            const band = await Band.findById(id)
    
            if (band) {
                try {
                    const member = new Member(req.body)
                    member.band = band
                    const result = await member.save()
                    bandObject = band.toObject()
                    bandObject.members.push(member)
                    await band.updateOne(bandObject)
                    return res.status(200).json({ "status": true, "data": result })
                } catch (error) {
                    console.log(error)
                    return res.status(500).json({ "status": false, "error": error })
                }
            } else {
                return res.status(404).json({ "status": false, "error": "La Banda No Existe" })
            }
        } catch (error) {
            return res.status(500).json({ "status": false, "error": "El id esta incompleto" })
        }
    },

    update:async(req, res)=>{
        const { id } = req.params
        try{
            const data = await Member.findByIdAndUpdate(id, req.body)
            return res.status(200).json({ "state": true, "data": data })
        }catch(error){
            return res.status(500).json({"state":false,"error":error})
        }
    },

    remove: async (req, res) => {
        const { id } = req.params
        try {
            const member = await Member.findById(id)
            if (member) {
                const bandId = member.band
                const data = await Member.findByIdAndDelete(id)
                if (data) {
                    const band = await Band.findById(bandId)
                    band.members.pull(id)
                    await band.save()
                    return res.status(200).json({ "status": true, "data": data })
                } else {
                    return res.status(404).json({ "status": false, "error": "Miembro no encontrado" })
                }
            } else {
                return res.status(404).json({ "status": false, "error": "Miembro no encontrado" })
            }
        } catch (error) {
            return res.status(500).json({ "status": false, "error": error })
        }
    }
}    
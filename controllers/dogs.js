const Dog = require('../models/model-dogs');
const Doghouse = require('../models/model-doghouses');

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

    // Verificamos que el id es válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        "status": false,
        "error": "Id inválido"
      });
    }

    // Usamos la función `findOne()`
    const doghouse = await Doghouse.findOne({ id: id });

    if (!doghouse) {
      return res.status(404).json({
        "status": false,
        "error": "La casa de perro no existe"
      });
    }

    return res.status(200).json({ "status": true, "data": doghouse });
  },

  findById: async (req, res) => {
    const { id } = req.params;

    // Verificamos que el id es válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        "status": false,
        "error": "Id inválido"
      });
    }

    // Manejamos el error de casteo
    try {
      const doghouse = await Doghouse.findById(id);
    } catch (error) {
      return res.status(400).json({
        "status": false,
        "error": "Id inválido"
      });
    }

    if (!doghouse) {
      return res.status(404).json({
        "status": false,
        "error": "La casa de perro no existe"
      });
    }

    return res.status(200).json({ "status": true, "data": doghouse });
  },

  save: async (req, res) => {
    const { id } = req.params;

    // Buscamos la casa de perro
    const doghouse = await Doghouse.findById(id);

    if (!doghouse) {
      return res.status(404).json({
        "status": false,
        "error": "La casa de perro no existe"
      });
    }

    // Creamos el nuevo perro
    const dog = new Dog(req.body);

    // Asignamos la casa de perro al perro
    dog.doghouses = doghouse.id;

    // Guardamos el perro
    const savedDog = await dog.save();

    // Actualizamos la lista de residentes de la casa de perro
    doghouse.residents.push(savedDog.id);
    await doghouse.save();

    // Devolvemos la información del perro guardado
    return res.status(200).json({ "status": true, "data": savedDog });
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
      }
    } catch (error) {
      return res.status(500).json({ "status": false, "error": error });
    }
  }};
const { Compost } = require('../models');

const compostController = {
  getAllcomposts: async (req, res) => {
    try {
      const composts = await Compost.findAll({
        include: [
          { association: 'user' },
          { association: 'wasteCategories' }
        ]
      });
      res.json(composts);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOneCompost: async (req, res) => {
    try {
      const compostId = req.params.id;
      const compost = await Compost.findByPk({
        compostId,
        include: [
          { association: 'user' },
          { association: 'wasteCategories' }
        ]
      });
      if (compost) {
        res.json(compost)
      } else {
        res.status(404).json('there is no compost with id:' + compostId);
      };
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  createCompost: async (req, res) => {
    try {
      const newCompost = req.body;
      await Compost.create(newCompost);
      res.json(newCompost);
    } catch (error) {
      res.status(404).json(error.toString());
    }
  },

  // Update an delete methods here
  updateCompost: async (req, res) => {
    let compostId = req.params.id;
    try {
      const { address, longitude, latitude, availability} = req.body;
      const compost = await Compost.findByPk(compostId);
      if (!compost) {
        return res.status(404).json('can\'t find compost with id:'+ compostId); 
      };
      // if compost was found, he was updated
      compost.address = address || compost.address;
      compost.longitude = longitude || compost.longitude;
      compost.latitude = latitude || compost.latitude;
      compost.availability = availability || compost.availability;
      await compost.save();
      res.json(compost);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  deleteCompost: async (req, res) => {
    let compostId = req.body.id;
    try{
      const compost = await Compost.findByPk(compostId);
      if(!compost) {
        return res.status(404).json("Can't delete compost with id: " + compostId);
      }

      await compost.destroy();
      res.json('Compost deleted !');
    } catch (error) {
      res.status(500).json(error.toString());
    }
  }
};

module.exports = compostController;
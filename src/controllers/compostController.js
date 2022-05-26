const { Compost, User, Waste_category } = require('../models');

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
        let compostId = req.params.id;
    try {
        const compost = await Compost.findByPk(compostId,{
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
    let userId = req.body.UserId;
    try {
      const user = await User.findByPk(userId);
    if (userId != user.id) {
      res.status(404).json('there is no user with id' + userId)
    } 
      
      const newCompost = await Compost.create({
        address : req.body.address,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        availability: req.body.availability,
        UserId : req.body.UserId
      });

      
      res.json(newCompost);
    } catch (error) {
      res.status(404).json(error.toString());
    }
  },

  
  updateCompost: async (req, res) => {
    let compostId = req.params.id;
    try {
      const { address, longitude, latitude, availability} = req.body;
      const compost = await Compost.findByPk(compostId);
    if (!compost) {
      return res.status(404).json('can\'t find compost with id:'+ compostId); 
    };
      // if compost was found, it was updated
      compost.update(
      compost.address = address || compost.address,
      compost.longitude = longitude || compost.longitude,
      compost.latitude = latitude || compost.latitude,
      compost.availability = availability || compost.availability,
      )
      
      await compost.save();
      res.json(compost);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  deleteCompost: async (req, res) => {
    let compostId = req.params.id;
    try{
      const compost = await Compost.findByPk(compostId);
      if(!compost) {
        return res.status(404).json("Can't find compost with id: " + compostId);
      }

      await compost.destroy();
      res.json('Compost deleted !');
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },

  addWasteCategory: async (req, res) => {
    const wasteCategoryId = req.body.id;
    const wasteCategory = await Waste_category.findByPk(wasteCategoryId)
    console.log(wasteCategory)
    try {
      const compost = await Compost.findByPk(req.params.id, {include: ['wasteCategories']});
      await compost.addWasteCategory(wasteCategory, {through: ['wastecategories']})
    } catch (error) {
      console.trace(error)
      res.status(500).json(error.toString());
    }
  }
};

module.exports = compostController;
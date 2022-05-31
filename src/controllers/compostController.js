const { Compost, User, Waste_category } = require('../models');
const { sequelize } = require('../models/user');

const compostController = {
  getAllcomposts: async (req, res) => {
    try {
      const composts = await Compost.findAll({
        attributes: ['address', 'availability'],
        include: [
          { association: 'user', attributes: ['username'] },
          { association: 'wasteCategories', attributes: ['label'] }
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
        res.status(404).send({
          success: false,
          message :'there is no compost with id:' + compostId
        });
      };
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  createCompost: async (req, res) => {
    let userId = req.body.UserId;
    const t = await sequelize.transaction();
    try {
      const user = await User.findByPk(userId);
    if (userId != user.id) {
      res.status(404).send({
        success: false,
        message :'there is no user with id:' + userId
      });
    }     
          const newCompost = await Compost.create({
          address : req.body.address,
          longitude: req.body.longitude,
          latitude: req.body.latitude,
          availability: req.body.availability,
          UserId : req.body.UserId
        },{transaction: t})   
      
        await t.commit();
      
      res.json(newCompost);
    } catch (error) {
      res.status(404).json(error.toString());
      await t.rollback();
    }
  },

  
  updateCompost: async (req, res) => {
    let compostId = req.params.id;
    const t = await sequelize.transaction();
    try {
      const { address, longitude, latitude, availability} = req.body;
      const compost = await Compost.findByPk(compostId);
    if (!compost) {
      return res.status(404).send({
        success: false,
        message :'there is no compost with id:' + compostId
      });
    };
      // if compost was found, it was updated
      await compost.update({
        address : address || compost.address,
        longitude : longitude || compost.longitude,
        latitude : latitude || compost.latitude,
        availability : availability || compost.availability
      },{transaction : t})

      await t.commit();
      
      res.json(compost);
    } catch (error) {
      await t.rollback();
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  deleteCompost: async (req, res) => {
    let compostId = req.params.id;
    try{
      const compost = await Compost.findByPk(compostId);
      if(!compost) {
        return res.status(404).send({
          success: false,
          message :'there is no compost with id:' + compostId
        });
      }

      await compost.destroy();
      res.json('Compost deleted !');
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },

  addWasteCategory: async (req, res) => {
    const wasteCategoryId = req.body.id;
    
    try {
      const wasteCategory = await Waste_category.findByPk(wasteCategoryId)
      if(!wasteCategory){
        return res.status(404).send({
          success: false, 
          message:'can\'t find wasteCategory with id:'+ wasteCategoryId}); 
      }
        const compost = await Compost.findByPk(req.params.id, {include: ['wasteCategories']});
        await compost.addWasteCategory(wasteCategory, {through: ['wastecategories']});
        res.json(compost);
      
      
    } catch (error) {
      console.trace(error)
      res.status(500).json(error.toString());
    }
  }
};

module.exports = compostController;
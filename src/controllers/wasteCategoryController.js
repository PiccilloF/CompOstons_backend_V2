const { Waste_category } = require('../models');

const wasteCategoryController = {

  getAllWasteCategories: async (req, res) => {
    try {
      // get all waste categories in db
      const wastes = await Waste_category.findAll();
      // responses will returned in json format
      res.json(wastes);
    } catch (error) {
      // if error, msg will returned in console
      console.trace(error);
      // error is sent to client
      res.status(500).json(error.toString());
    }
  },

  
  createWasteCategory: async (req, res) => {
    try {
      // category name is collected form the request body
      const category = req.body;
      // Category was created
      await Waste_category.create(category);
      res.json(category);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },


  modifyWasteCategory: async (req, res) => {
    try {
    // The id of the waste who want to modify was colected 
      const wasteId = req.params.id;
      const category = req.body;
      const waste = await Waste_category.findByPk(wasteId);
      if (!waste) {
        return res.status(404).json('can\'t find waste with id:'+ wasteId)
      };
      // if waste was found, his category was modified
      waste.update(
        waste.category_name = category || waste.category_name
      )
      
      await waste.save();
      res.json(waste);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },


  deleteWasteCategory: async (req, res) => {
    try {
      const wastId = req.params.id;
      const waste = await Waste_category.findByPk(wastId);
      if (!waste) {
        return res.status(404).json('Can\'t delete waste with id' + ' ' + wastId);
      }
      // else waste was destroyed
      await waste.destroy();
      res.json('ok');
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  }

};

module.exports = wasteCategoryController;

const { Waste_category } = require('../models');

const wasteCategoryController = {
  // return all waste categories
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

  // create waste category
  createWasteCategory: async (req, res) => {
    try {
      // category name is collected form the request body
      const category = req.body;
      console.log(category)
      // Category was added local
      await Waste_category.create(category);
      res.json(category);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  // Modify waste category
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
      waste.category_name = category || waste.category_name;
      await waste.save();
      res.json(waste);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  // Delete a category
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

const { Waste_category } = require('../models');
const { sequelize } = require('../models/user');

const wasteCategoryController = {

  getAllWasteCategories: async (req, res) => {
    try {
      // get all waste categories in db
      const category = await Waste_category.findAll({attributes: ['label']});
      // responses will returned in json format
      res.json(category);
    } catch (error) {
      // if error, msg will returned in console
      console.trace(error);
      // error is sent to client
      res.status(500).json(error.toString());
    }
  },

  
  createWasteCategory: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      // category name is collected form the request body
      const category = req.body;
      // Category was created
      await Waste_category.create({
        label: req.body.label
      }, {transaction: t});

      await t.commit();

      return res.status(200).send({
            success: true,
            message: 'Waste_category successfully created',
          })
    } catch (error) {
      await t.rollback();
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },


  modifyWasteCategory: async (req, res) => {
    const t = await sequelize.transaction();
    try {
    // The id of the waste who want to modify was colected 
      const wasteId = req.params.id;
      const category = req.body.label;
      const waste = await Waste_category.findByPk(wasteId);
      if (!waste) {
        return res.status(404).json('can\'t find waste with id:'+ wasteId)
      };
      // if waste was found, his category was modified
      await waste.update(
        { 
          label : category || waste.category_name
        }, {transaction: t});
      
        await t.commit();

        return res.status(200).send({
            success: true,
            message: 'Waste_category successfully updated',
          })
    } catch (error) {
      await t.rollback();
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

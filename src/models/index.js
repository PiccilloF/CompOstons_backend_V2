const User = require('../models/user');
const Compost = require('../models/compost');
const Waste_category = require('./waste_category');
const Article = require('./article.js');

// Compost have many waste categories
Compost.belongsToMany(Waste_category, {
  as: 'wasteCategories',
  through: 'compost_has_wasteCategory',
  foreignKey: 'WasteCategoryId',
  otherKey: 'CompostId'
})

// Waste belongs to many compost
Waste_category.belongsToMany(Compost, {
  as: 'composts',
  through: 'compost_has_wasteCategory',
  foreignKey: 'CompostId',
  otherKey: 'WasteCategoryId'
})

// User can write Many articles
Compost.belongsTo(User, {
  foreignKey: 'UserId',
  as: 'user'
})

// User can write many articles
Article.belongsTo(User, {
  foreignKey: 'UserId',
  as: 'redacteur'
})

User.hasMany(Article, {
  as: 'articles'
});

User.hasMany(Compost, {
  as: 'composts'
});



module.exports = { User, Compost, Waste_category, Article };
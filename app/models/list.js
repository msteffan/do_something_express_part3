// module.exports = [
//   {id: 1, title:"Errands"},
//   {id: 2, title:"Things that are better than WDI"},
//   {id: 3, title:"WDI To-Dos"}
// ]

module.exports = function(sequelize, Sequelize){
  return sequelize.define("list", {
    title: Sequelize.STRING
  });
}

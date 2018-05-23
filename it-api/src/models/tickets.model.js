// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const tickets = sequelizeClient.define('tickets', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT
    },
    state: {
      type: DataTypes.ENUM,
      values: ['unassigned', 'assigned', 'waiting_for_answers', 'solved'],
      defaultValue: 'unassigned'
    }
  }, {
    hooks: {
      beforeCount (options) {
        options.raw = true
      }
    }
  })

  tickets.associate = function (models) {
    tickets.belongsTo(models.users, {foreignKey: {allowNull: false}})
    tickets.belongsTo(models.solvers, {foreignKey: {allowNull: true}})
  }

  return tickets
}

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const secondaryQuestions = sequelizeClient.define('secondary_questions', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.ENUM,
      values: ['unassigned', 'assigned', 'waiting_for_answers', 'solved']
    }
  }, {
    hooks: {
      beforeCount (options) {
        options.raw = true
      }
    }
  })

  secondaryQuestions.associate = function (models) {
    secondaryQuestions.belongsTo(models.tickets)
    secondaryQuestions.belongsTo(models.departments)
  }

  return secondaryQuestions
}

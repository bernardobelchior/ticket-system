// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const secondaryQuestions = sequelizeClient.define('secondary_questions', {
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
      values: ['waiting_for_answers', 'solved'],
      defaultValue: 'waiting_for_answers',
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount (options) {
        options.raw = true
      }
    }
  })

  secondaryQuestions.associate = function (models) {
    secondaryQuestions.belongsTo(models.users, {foreignKey: {allowNull: false}})
  }

  return secondaryQuestions
}

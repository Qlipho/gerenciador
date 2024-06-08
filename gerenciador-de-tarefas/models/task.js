const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('gerenciador_de_tarefas', 'root', 'senha', {
    host: 'localhost',
    dialect: 'mysql',
})

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error)
    })

const Task = sequelize.define('tarefas', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    completa: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true
})

module.exports = {
    sequelize,
    Task
}
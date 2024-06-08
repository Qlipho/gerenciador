const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { sequelize, Task } = require('./models/task')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))

sequelize.sync().then(() => {
    console.log('Database synced')
})

app.get('/tasks', async (req, res) => {
    const tasks = await Task.findAll()
    res.json(tasks)
})

app.post('/tasks', async (req, res) => {
    const task = await Task.create(req.body)
    res.json(task)
})

app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id)
    if (task) {
        await task.update(req.body)
        res.json(task)
    } else {
        res.status(404).send('Task not found')
    }
})

app.delete('/tasks/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id)
    if (task) {
        await task.destroy()
        res.json({ message: 'Task deleted' })
    } else {
        res.status(404).send('Task not found')
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

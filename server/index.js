const express = require('express')
const { Pool } = require('pg')
const app = express()
const PORT = 4000

const pool = new Pool({
    user: 'shannonbrooks',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'fullstack'
})

app.use(express.json())//access req.body

//get all tasks
app.get("/tasks", async (req, res) =>{
    try {
        const allTasks = await pool.query("SELECT * FROM todo")
        res.json(allTasks.rows)
    } catch (error) {
        console.log(error.message)
    }
})


//get one task
app.get('/tasks/:id', async (req, res) =>{
    try {
        const {id} = req.params
        const task = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id])
    } catch (error) {
        console.error(error.message)
    }
})


//create a task
app.post("/tasks", async (req, res) =>{
    try {
        const {task} = req.body 
        const newTask = await pool.query("INSERT INTO todo (task) VALUES ($1) RETURNING *", [task])
        res.json(newTask.rows)
    } catch (error) {
        console.log(error.message)
    }
})


//update a task
app.put('/tasks/:id', async (req, res) =>{
    try {
        const {id} = req.params
        const {task} = req.body
        const updateTask = await pool.query('UPDATE todo SET task = $1 WHERE todo_id = $2', [task, id])
        res.json('Task was updated')
    } catch (error) {
        console.error(error.message)
    }
})


//delete a task
app.delete('/tasks/:id', async (req, res) =>{
    try {
        const {id} = req.params
        const deleteTask = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id])
        res.json('Task was deleted')
    } catch (error) {
        console.log(error.message)
    }
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})


const { response } = require('express');
const express = require('express');
const { request } = require('http');
const db = require('./db');
const app = express()

// Получение всех данных
app.get("/api/users", (req, response) => {
    db.query("SELECT * FROM `users`", (err, result) => {
        if(err) throw err
        // if(!result[2]) response.send({data: {message: "Пользователей не существует"}})
        response.send(result)
    })
})

// Получение данные по ID
app.get("/api/users/:id", (req, response) => {
    const id = req.params.id;
    db.query("SELECT * FROM `users` WHERE `id` = ?", id, (err, result) => {
        if(err) throw err
        response.send(result)
    })
})

// POST запрос на добавление записи
app.post('/api/users', (req, response) => {
    db.query("INSERT INTO `users` SET `name` = 'Максим', `password` = 'asdasdlkaasdaskdjDSLKJK', `phone` = '+7 (928) 412-35-77', `login` = 'Krov'", (err, result) => {
        if(err) throw err
        response.status(201).send('Пользователь успешно добавлен')
    })
})

// PUT запрос на обновление записи
app.put('/api/users/:id', (req, response) => {
    const id = req.params.id

    db.query("UPDATE `users` SET `name` = 'Игорь' WHERE id = ?", id, (err, result) => {
        if(err) throw err
        response.send(`Пользователь c id:${id} успешно изменён`)
    })
})

// DELETE удаление конкретного пользователя
app.delete('/api/users/:id', (req, response) => {
    const id = req.params.id
    db.query("DELETE FROM `users` WHERE `id` = ?", id, (err, result) => {
        if(err) throw err
        response.send(`Пользователь с id:${id} успешно удалён`)
    })
})

app.listen(3000, () => console.log('Server has been started...'))
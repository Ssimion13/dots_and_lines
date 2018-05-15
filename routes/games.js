const express = require('express')
const gameRoutes = express.Router()
const Game = require('../models/games')

gameRoutes.get('/', (req, res) =>{
    Game.find({user: req.user._id},(err, games) => {
        if(err) return res.status(500).send(err)
        return res.send(games)
    })
})

gameRoutes.post('/:id/moves', (req, res) => {
    Game.findById(req.params.id, (err, game) => {
        if(err) return res.status(500).send(err)
        game.moves.push(req.body)
        game.save(err => {
            if(err) return res.status(500).send(err)
            return res.status(201).send(game)
        })
    })
})

gameRoutes.post('/', (req, res) => {
    const newGame = new Game(req.body)
    newGame.user = req.user._id
    newGame.save(err => {
        if(err) return res.status(500).send(err)
        return res.status(201).send(newGame)
    })
})

module.exports = gameRoutes

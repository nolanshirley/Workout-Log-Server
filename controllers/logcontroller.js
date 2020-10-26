const router = require('express').Router(); 
const Log = require('../Db').import('../models/log'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const validateSession = require('../middleware/validateSession'); 

router.post('/', validateSession, (req, res) => {
    Log.create({ 
        description: req.body.description, 
        definition: req.body.definition, 
        result: req.body.result, 
        owner_id: req.user.id 
    })
    .then(response => res.status(200).json(response)) 
    .catch(err => res.json({error: err}))
})

router.get('/', validateSession, (req, res) => {
    Log.findAll({
        where: {
            owner_id: req.user.id
        }
    })
    .then(r => res.status(200).json(r))
    .then(err => res.status(500).json({error: err}))
})
// this id is not for the user but for the specific log attached to the user 
router.get('/:id', (req, res) => {
    Log.findOne({
        where: {
            id: req.params.id 
        }
    })
    .then(result => res.status(200).json(result))
    .then(err => res.status(500).json({ error: err }))
})

router.put('/:id', validateSession, (req, res) => {
    Log.update(req.body, {
        where: { id: req.params.id }
    }) 
    .then(r => res.status(200).json(r))
    .then(err => res.status(500).json({ error: err }))
})

router.delete('/:id', validateSession, async (req, res) => {
    try {
        const result = await Log.destroy({
            where: { id : req.params.id }
        })
        res.status(200).json(result); 
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

module.exports = router; 
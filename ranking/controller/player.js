const express = require('express');
const router = express.Router();
const {Deta} = require('deta');
const db = Deta().Base('player');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', async (req, res) => {
    let result = await db.fetch();
    let all = result.items;
    while (result.last) {
        result = await db.fetch({}, {last: result.last});
        all = all.concat(result.items);
    }
    return res.send(all);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send('Player: Id is missing');
    }
    return res.send(await db.get(id));
});

router.post('/', async (req, res) => {
    const body = req.body;
    console.log(body);
    if (!body.name) {
        return res.status(400).send('Player: Required fields missing');
    }
    return res.status(201).send(await db.put({
        name: body.name,
        active: true,
        created: new Date().getTime()
    }));
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send('Player: Id is missing');
    }
    const body = req.body;
    if (!body.name) {
        return res.status(400).send('Player: Name is missing');
    }
    return res.status(201).send(await db.update({name: body.name}, id));
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send('Player: Id is missing');
    }
    return res.send(await db.delete(id));
});

module.exports = router;
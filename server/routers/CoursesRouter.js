const router = require('express').Router();
const Util = require('../services/Util');
const videosLocation = `/Users/eliasmj/Documents/egghead`;

router.get('/courses', (req, res) => {
    const names = Util.getFilesFromFolder(`${videosLocation}`)
    res
        .status(200)
        .json(names)
        .end();
})

router.get('/courses/:id', (req, res) => {
    const names = Util.getFilesFromFolder(`${videosLocation}/${req.params.id}`)
    res
        .status(200)
        .json(names)
        .end();
})
router.get('/courses/:folder/:id', (req, res) => {
    const {folder, id} = req.params;

    console.log(folder, id)
})

module.exports = router;
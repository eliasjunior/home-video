const router = require('express').Router();
const fs = require('fs');
const Util = require('../services/Util');
//const videosLocation = `${__dirname}/videos/`
const videosLocation = `/Users/eliasmj/Documents/Vuze Downloads`;

router.get('/list', (req, res) => {
    fs.readdir(`${videosLocation}`, (err, items) => {
        const names = items.filter(name => name.indexOf('.') !== 0)
        res
            .status(200)
            .json(names)
            .end();
    })
})
router.get('/list/:id', (req, res) => {
    const folder = `${videosLocation}/${req.params.id}`
    const { id: fileName } = req.params

    const fullPath = `${folder}/${fileName}.mp4`;
    //get file info, size
    let statInfo;
    try {
        statInfo = fs.statSync(`${folder}/${fileName}.mp4`)
    } catch (error) {
        res
            .status(500) 
            .send({message: 'Something went wrong, file not found, maybe folder has a different name'})
            .end();
        throw new Error(error)  
    }
    const { size } = statInfo;

    const range = req.headers.range;

    if (range) {
        console.log('range', range)
        const positions = range.replace(/bytes=/, "").split('-')
        console.log('positions', positions)

        const start = Number(positions[0])
        const end = positions[1] ? Number(positions[1]) : size - 1;

        const videoStream = fs
            .createReadStream(fullPath, { start, end });

        console.log('start', start)
        console.log('end', end)
        const chunksize = (end - start) + 1;
        console.log('chunksize', chunksize)

        const head = {
            "Content-Range": `bytes ${start}-${end}/${size}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4"
        }
        res.writeHead('206', head)

        videoStream.on('open', () => {
            console.log('Stream Opened!');
            videoStream.pipe(res);
        })

        videoStream.on('close', () => {
            console.log('Stream has been Closed');
        })

        videoStream.on('error', error => {
            console.log('##################---ERROR---###################')
            console.log(error)
            console.log('##################---END error---###################')
        })
    } else {
        const head = {
            'Content-Length': size,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs
            .createReadStream(fullPath)
            .pipe(res)
    }
})

module.exports = router
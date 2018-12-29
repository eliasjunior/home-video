const router = require('express').Router();
const Util = require('../services/Util');
const fs = require('fs');
//const videosLocation = `/Users/eliasmj/Documents/egghead`;
const videosLocation = "/Users/eliasmj/Documents/Vuze Downloads";
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
//Algorithms/01-egghead-javascript-introduction-to-algorithms-in-javascript
router.get('/courses/:folder/:id', (req, res) => {
    const {folder, id: fileName} = req.params;

    //TODO: reuse code moviesrouter
    const fullPath = `${videosLocation}/${folder}/${fileName}`;
    console.log('**** fullPath *** ',fullPath)
    //get file info, size
    let statInfo;
    try {
        statInfo = fs.statSync(fullPath)
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
        const positions = range.replace(/bytes=/, "").split('-')

        const start = Number(positions[0])
        const end = positions[1] ? Number(positions[1]) : size - 1;

        const videoStream = fs
            .createReadStream(fullPath, { start, end });

        const chunksize = (end - start) + 1;

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

module.exports = router;
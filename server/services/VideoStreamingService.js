const fs = require('fs');

function sendStream({response, range, size, fullPath}) {
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
        response.writeHead('206', head)

        videoStream.on('open', () => {
            console.log('Stream Opened!');
            videoStream.pipe(response);
        })

        videoStream.on('close', () => {
            console.log('Stream has been Closed');
        })

        videoStream.on('error', error => {
            console.log('ERROR ###################')
            console.log(error)
        })
    } else {
        const head = {
            'Content-Length': size,
            'Content-Type': 'video/mp4',
        }
        response.writeHead(200, head)
        fs
            .createReadStream(fullPath)
            .pipe(response);
    }
}

module.exports = {
    sendStream
}
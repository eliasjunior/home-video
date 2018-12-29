const fs = require('fs');

function getFilesFromFolder(videosLocation) {
    const items = fs.readdirSync(videosLocation)
    return items.filter(name => name.indexOf('.') !== 0)
}

function readFolder(videosLocation) {
    const items = fs.readdirSync(`${videosLocation}`);
    return items.filter(name => name.indexOf('.') !== 0)
}

function getFileDirInfo(fullPath, response) {
     //get file info, size
    try {
        return fs.statSync(`${fullPath}`)
    } catch (error) {
        response
            .status(500)
            .send({ message: 'Something went wrong, file not found, maybe folder has a different name' })
            .end();
        throw new Error(error)
    }
}

module.exports = {
    getFilesFromFolder,
    readFolder,
    getFileDirInfo
}
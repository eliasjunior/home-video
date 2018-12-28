const fs = require('fs');

function getFilesFromFolder(videosLocation) {
    console.log('>>>>', videosLocation)
    const items = fs.readdirSync(videosLocation)
    console.log('>>>>e', items)
    return items.filter(name => name.indexOf('.') !== 0)
}

module.exports = {
    getFilesFromFolder
}
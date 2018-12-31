const router = require('express').Router();
const VideoStreamingService = require('../services/VideoStreamingService');
const AppServerConstatnt = require('../AppServerContant');
const Util = require('../services/Util');

router.get('/movies', (req, response) => {
    const baseLocation = AppServerConstatnt.USER_LOCATION +
        AppServerConstatnt.MOVIES_LOCATION;
    const options = {
        response,
        baseLocation,
        videosLocation: ''
    };
    getFiles(options);
})
router.get('/courses', (req, response) => {
    const baseLocation = AppServerConstatnt.USER_LOCATION +
        AppServerConstatnt.COURSE_LOCATION;
    const options = {
        response,
        baseLocation,
        videosLocation: ''
    };
    getFiles(options);
})
router.get('/videos/:folder/:fileName', (request, response) => {
    let baseLocation = AppServerConstatnt.USER_LOCATION
    const { folder, fileName } = request.params;
    
    
    //workaround for now
    const separateIndex = folder.indexOf('_');
    const tempFolder = folder.slice(separateIndex + 1);
    const backwordsIndex = separateIndex - 6;
    const baseFolder = folder.slice(backwordsIndex, separateIndex)   

    if(baseFolder === 'movies') {
        baseLocation =  baseLocation.concat(AppServerConstatnt.MOVIES_LOCATION);
    } else {
        baseLocation = baseLocation.concat(AppServerConstatnt.COURSE_LOCATION);
    }
    
    const fullPath = `${baseLocation}/${tempFolder}/${fileName}`;
    const options = {
        request,
        response,
        fullPath,
        baseLocation
    }
    readOrStream(options);
});

function readOrStream({ request, response, fullPath, baseLocation }) {
    const { fileName } = request.params;
    const { range } = request.headers;

    if (fileName.indexOf('.mp4') !== -1) {
        let statInfo = Util.getFileDirInfo(fullPath, response);
        const { size } = statInfo;

        const options = {
            response,
            range,
            size,
            fullPath
        }
        VideoStreamingService.sendStream(options);
    } else {
        const options = {
            response,
            baseLocation,
            videosLocation: `/${fileName}`
        };
        getFiles(options);
    }
}

function getFiles({ response, baseLocation, videosLocation }) {
    const filepath = baseLocation + videosLocation;
    const folders = Util.readFolder(filepath);

    const createFolderWithFiles = (prev, folderName) => {
        prev[folderName] = Util.readFolder(`${filepath}/${folderName}`);
        return prev;
    };
    const videos = folders.reduce(createFolderWithFiles, {});
    response
        .status(200)
        .json(videos)
        .end();
}

module.exports = router
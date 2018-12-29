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
// router.get('/courses', (req, response) => {
//     const baseLocation = AppServerConstatnt.USER_LOCATION +
//         AppServerConstatnt.COURSE_LOCATION;
//     const options = {
//         response,
//         baseLocation,
//         videosLocation: ''
//     };
//     getFiles(options);
// })
//TODO: workaround need add nested route
router.get('/movies/:id', (request, response) => {
    const baseLocation = AppServerConstatnt.USER_LOCATION +
        AppServerConstatnt.MOVIES_LOCATION;

    const fullPath = `${baseLocation}/${request.params.id}`;
    const options = {
        request,
        response,
        fullPath,
        baseLocation
    }
    readOrStream(options);
});
router.get('/movies/:folder/:id', (request, response) => {
    const baseLocation = AppServerConstatnt.USER_LOCATION +
        AppServerConstatnt.MOVIES_LOCATION;

    const { folder, id: fileName } = request.params;
    const fullPath = `${baseLocation}/${folder}/${fileName}`;
    const options = {
        request,
        response,
        fullPath,
        baseLocation
    }
    readOrStream(options);
});

function readOrStream({ request, response, fullPath, baseLocation }) {
    const { id } = request.params;
    if (id.indexOf('.mp4') !== -1) {
        let statInfo = Util.getFileDirInfo(fullPath, response);

        const { size } = statInfo;

        const range = request.headers.range;

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
            videosLocation: `/${id}`
        };
        getFiles(options);
    }
}

function getFiles({ response, baseLocation, videosLocation }) {
    const names = Util.readFolder(baseLocation + videosLocation);
    const fileSystem = {
        path: videosLocation,
        files: names
    }
    response
        .status(200)
        .json(fileSystem)
        .end();
}

module.exports = router
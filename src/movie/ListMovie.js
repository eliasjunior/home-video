import React, {useState, useEffect} from 'react'
import './movie.css';
import { Link } from "react-router-dom";
import Footer from '../footer/Footer';
import {getVideos} from "../services/VideosService"
import {VALID_FORMATS} from "../common/Constants"
import Loading from "../common/Loading"

function ListMovie(props){
    const { baseFolder, match } = props;
    const [folderOrFiles, setFolderOrFiles] = useState([])
    const [folders, setFolders] = useState([])
    const [selectedFolder, setSelectedFolder] = useState("")
    useEffect(() => {
        async function fecthData() {
            const options = {
                urlResource:  match.url.slice(1), //remove slashgetUrlResource(props),
            };
            const response = await getVideos(options);
           // const folderOrFiles = Object.keys(response);
            console.log("response **", response)
            //TODO review here undefined values
            const folderOrFiles = Object.keys(response);
            setFolders(response)
            setFolderOrFiles(folderOrFiles)
        }
        fecthData()
    }, [])

    const setUpMovie = (movie) => {
        console.log('folders',folders)
        console.log("param movie", movie)
        setFolderOrFiles(folders[movie])
        setSelectedFolder(movie)
    }
    const diplayLink = (movie) => {
        const { onHandleVideoPath } = props;
        //workaround for now baseFolder
        const videoPath = `/videos/${baseFolder}_${selectedFolder}/${movie}`;
        console.log('-->',movie.slice(-3), videoPath)  
        const isVideoFile = () => {
            return VALID_FORMATS.get(movie.slice(-3))
        }  
        if (isVideoFile()) {
            return <Link
                className="link-base link-btn"
                to={`/display/${movie}`}
                onClick={() => onHandleVideoPath(videoPath)}>
                {movie}
            </Link>
        } else {
            return <button
                className="link-base link-btn"
                onClick={() => setUpMovie( movie)}>
                {movie}
            </button>
        }
    }
    const displayList = () => {
        return (
            <ul>
                {folderOrFiles.map(movieName => <li key={movieName}>{diplayLink(movieName)}</li>)}
            </ul>
        )
    }
    if (!folderOrFiles || folderOrFiles.length === 0) {
        return <Loading></Loading>
    }
    return <div>
        {displayList()}
        <Footer></Footer>
    </div>
}

export default ListMovie;
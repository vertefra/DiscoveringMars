 // EXPLORE MARS
import { 
    api_key,
    cameraObj,
    roverObj
} from './settings.js'

import {
    setCameraInState,
    setRoverInState,
    loadPicsFromApi
} from './script/lib.js'

import {
    renderRoverPanel,
    renderHeader
} from './script/dom.js'


const appState = {
    rovers: roverObj,
    cameras: cameraObj,
    sol: '40',
    selectedCamera: "",
    selectedRover: "",
    images: [],
    pages: 1
}

// loadPicsFromApi(
//     appState, 
//     roverName, 
//     sol, 
//     selectedCamera, 
//     pages, 
//     api_key
// )
console.log(appState)

// TARGET DOM ANCHORS

const $header = $('#header')

renderHeader($header, appState)


// EVENT LISTENER





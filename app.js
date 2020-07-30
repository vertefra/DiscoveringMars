 // EXPLORE MARS
import { 
    api_key,
    cameraObj,
    roverObj
} from './settings.js'

import {
    setRoverInState,
    loadPicsFromApi
} from './script/lib.js'

import {
    renderRoverPanel,
    renderHeader
} from './script/dom.js'


const roverName = roverObj.curiosity.name
const sol = '100'
const selectedCamera = cameraObj.navcam.value
const pages = 1

const appState = {
    rovers: roverObj,
    selectedRover: "",
    images: [],
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





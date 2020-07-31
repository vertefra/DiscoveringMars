 // EXPLORE MARS
import { 
    cameraObj,
    roverObj
} from './settings.js'

import {
    renderHeader
} from './script/dom.js'

const appState = {
    rovers: roverObj,
    cameras: cameraObj,
    sol: 1,
    selectedCamera: "",
    selectedRover: "",
    images: [],
    pages: 1
}

const $header = $('#header')

renderHeader($header, appState)







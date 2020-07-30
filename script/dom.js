import {
    loadPicsFromApi,
    setCameraInState, 
    setRoverInState 
} from './lib.js'

import { cameraObj, api_key } from '../settings.js'

const renderHeader = ($DOMelement, appState) => {
    $DOMelement.html(`
    <header>
        <h1>Exploring Mars</h1>
        <h2>${appState.selectedRover}</h2>
        <label for="sol">Martian Sol</label>
        <input type="number" id="sol">
        <button id="curiosity">Curiosity</button>
        <button id="spirit">Spirit</button>
        <button id="opportunity">Opportunity</button>
    </header>
    `)

    // init click events
    $('#curiosity').on("click", (event)=>{
        console.log('click')
        appState.images = []
        renderCarusel(appState, $('#carusel'))
        setRoverInState(event, appState, $DOMelement, renderHeader)
        renderRoverPanel($('#rover-img'), appState)
    })
    
    $('#spirit').on("click", (event)=>{
        setRoverInState(event, appState, $DOMelement, renderHeader)
        renderRoverPanel($('#rover-img'), appState)
    })
    
    $('#opportunity').on("click", (event)=>{
        console.log('click')
        setRoverInState(event, appState, $DOMelement, renderHeader)
        renderRoverPanel($('#rover-img'), appState)
    })
}

const renderRoverPanel = ($DOMelement, appState) => {
    if(appState.selectedRover!==''){
        console.log(appState.rovers[appState.selectedRover].img_path)
        $DOMelement.css(
            'background-image',`url("${appState.rovers[appState.selectedRover].img_path}")`)
        $DOMelement.css('background-size','cover')
        appendCameraButtons(appState, appState.rovers[appState.selectedRover].cameras)
    }
}

const appendCameraButtons = (appState, cameraObjList) => {
    console.log(cameraObjList)
    const $cameraButtons = $('#camera-buttons')
    const $h3 = $(`<h3>Cameras:</h3>`)
    $cameraButtons.empty()
    for (let cameraObj of cameraObjList){
        const $camBtn = $(`<button id="${cameraObj.value}">
        ${cameraObj.value}</button>`)
        $camBtn.appendTo($cameraButtons)
        initCameraButtons($camBtn, appState)
    }
}

const initCameraButtons = ($DOMelement, appState) => {
    $DOMelement.on("click", (event)=>{
        appState.selectedCamera = event.target.id
        loadRelatedPics(appState)
    })
}

const loadRelatedPics = (appState) => {
    console.log(appState)
    const roverName = appState.selectedRover  
    const sol = appState.sol
    const selectedCamera = appState.selectedCamera
    const pages = appState.pages
    loadPicsFromApi(
        appState, 
        roverName,
        sol,
        selectedCamera,
        pages,
        api_key,
    )
}

const renderPicsControlButtons = (appState, $DOMelement, imgIdx) => {
    const leftBtn = $('<button id="left-btn" class="control"><</button>')
    const rightBtn = $('<button id="right-btn" class="control">></button>')
    $DOMelement.append(leftBtn, rightBtn)
    leftBtn.on("click", (event)=>{
        console.log('click idx= ', imgIdx)
        imgIdx===0 ? imgIdx=appState.images.length-1 : imgIdx--
        renderCarusel(appState, $('#carusel'), imgIdx)
    } )
    rightBtn.on("click", (event)=>{
        console.log('click idx= ', imgIdx)
        imgIdx<appState.images.length-1 ? imgIdx ++ : imgIdx = 0
        renderCarusel(appState, $('#carusel'), imgIdx)
    } )
}

const renderCarusel = (appState, $DOMelement, imgIdx=0) => {
    $DOMelement.html(`
    <div id='pics-container'>
        <img src='${appState.images[imgIdx].img_src}'>
    </div>
    `)
    

    const $picsContainer = $('#pics-container')
    renderPicsControlButtons(appState, $picsContainer, imgIdx)
}



export { renderHeader, renderRoverPanel, renderCarusel }
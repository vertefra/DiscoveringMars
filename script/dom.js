import {
    loadPicsFromApi,
    setRoverInState, 
    setSolInState
} from './lib.js'

import { cameraObj, api_key } from '../settings.js'

const renderHeader = ($DOMelement, appState) => {
    $DOMelement.html(`
    <header>
        <h1>Exploring Mars</h1>
        <label for="sol">Martian Sol</label>
        <input type="number" id="sol" value="${appState.sol}">
        <button id="curiosity">Curiosity</button>
        <button id="spirit">Spirit</button>
        <button id="opportunity">Opportunity</button>
    </header>
    `)

    setSolInState(appState, $('#sol'))
    
    // init click events
    $('#curiosity').on("click", (event)=>{
        console.log('click')
        appState.images = []
        $('#info').empty()
        renderCarusel(appState, $('#carusel'))
        setRoverInState(event, appState, $DOMelement, renderHeader)
        renderRoverPanel($('#rover-img'), appState)
    })
    
    $('#spirit').on("click", (event)=>{
        appState.images = []
        $('#info').empty()
        renderCarusel(appState, $('#carusel'))
        setRoverInState(event, appState, $DOMelement, renderHeader)
        renderRoverPanel($('#rover-img'), appState)
    })
    
    $('#opportunity').on("click", (event)=>{
        appState.images = []
        $('#info').empty()

        renderCarusel(appState, $('#carusel'))
        setRoverInState(event, appState, $DOMelement, renderHeader)
        renderRoverPanel($('#rover-img'), appState)
    })
}

const renderRoverPanel = ($DOMelement, appState) => {
    if(appState.selectedRover!==''){
        $('#rover-img').children('#rover-name').remove()
        const $roverName = $('<h3 id="rover-name">')
        $roverName.text(appState.selectedRover)
        $('#rover-img').append($roverName)
        console.log(appState.rovers[appState.selectedRover].img_path)
        $DOMelement.css(
            'background-image',`url("${appState.rovers[appState.selectedRover].img_path}")`)
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
        $('#info').empty()
        appState.selectedCamera = event.target.id
        appState.images = []
        renderCarusel(appState, $('#carusel'))
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
    let currentPic = appState.images[imgIdx]
    let path = ''
    if (appState.images.length===0){
        path=''
    } else { 
        path=currentPic.img_src
    }
    renderPicInfo(appState, currentPic, imgIdx)
    $DOMelement.html(`
    <div id='pics-container'>
        <img src='${path}'>
    </div>
    `)
    
    const $picsContainer = $('#pics-container')
    renderPicsControlButtons(appState, $picsContainer, imgIdx)
}

const renderPicInfo = (appState, pic, idx) => {
    if(pic){
        const totPics = appState.images.length
        const $infoPanel = $('#info')
        $infoPanel.empty()
        console.log(pic)
        $infoPanel.html(`
        <div id="pic-info">
            <div>
                <h3>Earth day: ${pic.earth_date}</h3> 
                <h3>Rover: ${pic.rover.name}</h3>
            </div>
            <div>
                <h3>Camera: ${pic.camera.full_name}</h3>
                <h3>Pic ${idx+1}/${totPics}</h3>
            <div>
        </div> 
        `)
    }

}



export { renderHeader, renderRoverPanel, renderCarusel }
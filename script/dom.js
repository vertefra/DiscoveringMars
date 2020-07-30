import { setRoverInState } from './lib.js'
import { cameraObj } from '../settings.js'

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
        setRoverInState(event, appState, $DOMelement, renderHeader)
        renderRoverPanel($('#rover-img'), appState)
    })
    
    $('#spirit').on("click", (event)=>{
        console.log('click')
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
        appendCameraButtons(appState.rovers[appState.selectedRover].cameras)
    }
}

const appendCameraButtons = (cameraObjList) => {
    console.log(cameraObjList)
    const $cameraButtons = $('#camera-buttons')
    const $h3 = $(`<h3>Cameras:</h3>`)
    $cameraButtons.empty()
    for (let cameraObj of cameraObjList){
        $(`<button id="camera-btn">
        ${cameraObj.value}</button>`).appendTo($cameraButtons)
    }
}

export { renderHeader, renderRoverPanel }
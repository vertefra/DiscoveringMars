import { renderCarusel } from './dom.js'

const loadPics = (state, data) => {
    const picsObj = data.photos
    const keys = Object.keys(picsObj)
    for (let key of keys){
        state.images.push(picsObj[key])
    }
    if (state.images.length > 0){
        console.log('render carusel after this')
        renderCarusel(state, $('#carusel'))
        return {
            success: true,
            message: 'pics are loaded'
        }
    } else {
        return {
            success: false,
            message: 'failed to load pics'
        }
    }
} 

const fetchURL = (url, state, callBack) => {
    fetch(url)
    .then(response => response.json()
    )
    .then(data=>{
        return callBack(state, data)
    }).catch(err=> console.log(err))
}

const loadPicsFromApi = async (appState, roverName, sol, camera, pages, api_key) => {
    const baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/'
    const url = `
    ${baseUrl}rovers/${roverName}/photos?sol=${sol}&camera=${camera}&page=${pages}&api_key=${api_key}`
    console.log(url)
    return fetchURL(url, appState, loadPics)
    
}

const setRoverInState = (
    event, 
    appState,
    DOMElement, 
    renderCallBack) => {
        const roverObj = 
        appState.selectedRover = event.target.id
        renderCallBack(DOMElement, appState)
}

const setCameraInState = (
    event,
    appState,) => {
        const cameraObj =
        appState.selectedCamera = event.target.id
}

const setSolInState = (appState, $DOMelement) => {
    console.log($DOMelement)
    $DOMelement.attr('value')
    $DOMelement.on("change", (event)=>{
        appState.sol = event.target.value
    })
}

export { loadPicsFromApi, setRoverInState, setCameraInState, setSolInState }
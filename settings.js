// documentation:
// https://api.nasa.gov/

const api_key = 'DEMO_KEY'
const cameraObj = {
    fhaz:{
        value: 'fhaz',
        description: 'Front Hazard Avoidance Camera'
    },
    rhaz:{
        value: 'rhaz',
        description: 'Rear Hazard Avoidance Camera'
    },
    mast:{
        value: 'mast',
        description: 'mast camera'
    },
    chemcam:{
        value: 'chemcam',
        description: 'Chemistry and Camera Complex'
    },
    mahli:{
        value: 'mahli',
        description: 'Mars Hand Lens Imager'   
    },
    mardi:{
        value: 'mardi',
        description: 'Mars Descent Imager'
    },
    navcam:{
        value: 'navcam',
        description: 'Navigation Cam'
    },
    pancam:{
        value: 'pancam',
        description: 'Panoramic Camera'
    },
    minites:{
        value: 'minites',
        description: 'Miniature Thermal Emission Spectrometer (Mini-TES)'
    }
}

const roverObj = {
    curiosity: {
        name: 'curiosity',
        img_path: './img/curiosity.jpg',
        cameras: [
            cameraObj.fhaz,
            cameraObj.rhaz,
            cameraObj.mast,
            cameraObj.chemcam,
            cameraObj.mahli,
            cameraObj.mardi,
            cameraObj.navcam
        ]
    },
    opportunity: {
        name: 'opportunity',
        img_path: './img/opportunity.jpg',
        cameras:[
            cameraObj.fhaz,
            cameraObj.rhaz,
            cameraObj.navcam,
            cameraObj.pancam,
            cameraObj.minites
        ]
    },
    spirit: {
        name:'spirit',
        img_path: './img/spirit.jpg',
        cameras: [
            cameraObj.fhaz,
            cameraObj.rhaz,
            cameraObj.navcam,
            cameraObj.pancam,
            cameraObj.minites
        ]
    }
}

export {roverObj, cameraObj, api_key }
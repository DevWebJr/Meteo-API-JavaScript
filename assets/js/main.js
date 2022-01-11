const CLEFAPI = "d1b8c5d7810b4e04d6a7026ff65999c0";

let resultats;

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position=> {
        console.log(position);

    }, ()=> {
        alert(`Veuillez activer la géolocalisation!`)
    } )
}
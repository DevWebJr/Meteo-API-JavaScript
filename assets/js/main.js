import joursEnOrdre from './Utilitaire/gestionTemps.js';

const CLEFAPI = "d1b8c5d7810b4e04d6a7026ff65999c0";
let resultatsAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position=> {
        //console.log(position);
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        AppelApi(long,lat);

    }, ()=> {
        alert(`Veuillez activer la géolocalisation!`)
    } )
}

function AppelApi(long, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&lang=fr&units=metric&appid=${CLEFAPI}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        // console.log(data);
        resultatsAPI = data;

        temps.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerHTML = `${Math.trunc(resultatsAPI.current.temp)}°`;
        localisation.innerHTML = resultatsAPI.timezone;

        let heureActuelle = new Date().getHours();

        for (let i = 0; i < heure.length; i++) {

            let heureIncr = heureActuelle + i * 3;

            if (heureIncr > 24) {
                heure[i].innerText = `${heureIncr - 24} h`;
            } else if (heureIncr === 24) {
                heure[i].innerText = "00 h"
            } else {
                heure[i].innerText = `${heureIncr} h`;
            }
        }

        for (let j = 0; j < tempPourH.length; j++) {
            tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`
        }   

        for (let k = 0; k < joursEnOrdre.length; k++) {
            joursDiv[k].innerText = joursEnOrdre[k].slice(0,3)
        }

        for (let l = 0; l < 7; l++) {
            tempJoursDiv[l].innerText = `${Math.trunc(resultatsAPI.daily[l+1].temp.day)}°`;
        }

        if (heureActuelle >= 6 && heureActuelle < 21) {
            imgIcone.src = `assets/ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`;
        } else {
            imgIcone.src = `assets/ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`;
        }


        chargementContainer.classList.add('disparition');

    })
}

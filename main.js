// Clé de l'API
let key = "c1d69414b1df0de21dcfcfaac7ab4a8c";

// Evénement lié à l'input de la ville recherchée
document.getElementById("ville").addEventListener("change", geocodeAndDisplayWeather);

function geocodeAndDisplayWeather(e){
    const ville = e.target.value;
    // Geocodage : récupération de la latitude et de la longitude
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + ville + "&limit=5&appid=" + key)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value){
        const localisation = value[0].name + ", " + value[0].country;
        document.getElementById("localisation").innerHTML = localisation;
        const lat = value[0].lat;
        const long = value[0].lon;
        displayWeather(lat, long);
    })
}

// Affichage de la méteo
function displayWeather(lat, long){
    // Appel de l'API pour current weather
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + key + "&units=metric")
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        // Affichage de current weather
        .then(function(value){
            const weather = value.weather[0].id;
            // Traduction de l'ID en météo en français
            const weatherFr = traduireIdEnMeteo(weather);
            document.getElementById("icone").innerHTML = "";
            var newImg = document.createElement("img");
            document.getElementById("icone").appendChild(newImg);
            newImg.src = weatherFr[1] + ".svg";
            document.getElementById("weather").innerHTML = weatherFr[0];
            document.getElementById("temperature").innerHTML = Math.round(value.main.temp) + "°C";
            document.getElementById("humidity").innerHTML = value.main.humidity + "%";
            document.getElementById("wind").innerHTML = Math.round((value.wind.speed)*3.6) + " km/h";
            document.getElementById("cadre").style.backgroundColor = weatherFr[2];
            document.getElementById("meteoCourante").style.visibility = "visible";
        })
        // Appel de l'API pour la météo à 5 jours
        // Effacer les données précédentes
        document.getElementById("previsions").innerHTML = "";
        fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=" + key + "&units=metric")
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value){
            for (let prevision of value.list){
                // Traitement des données pour extraire l'heure souhaitée (15h00)
                const date = prevision.dt_txt.split(" ");
                const heure = date[1].split(":");
                if(heure[0] == 15){
                    // Traduction de l'ID en météo en français
                    const weatherFr = traduireIdEnMeteo(prevision.weather[0].id);
                    creerDiv(date[0], weatherFr[0], weatherFr[1], weatherFr[2], prevision.main.temp, prevision.main.humidity, prevision.wind.speed);
                }
            }
        })
}

// Traduction de l'ID en météo en français
function traduireIdEnMeteo(id){
    // https://openweathermap.org/weather-conditions
    let icone = "";
    let weatherFr = "données indisponibles";
    let color = "white";
    switch (id) {
        case 200: //thunderstorm with light rain
        case 201: //thurderstorm with rain
        case 202: //thurderstorm with heavy rain
            weatherFr = "Orage avec pluie";
            icone = "orage";
            color = "#787A91";
            break;
        case 210: //light thunderstorm
        case 201: //thunderstorm
        case 211:
        case 212: //heavy thunderstorm
        case 221: //ragged thunderstorm
            weatherFr = "Orage"
            icone = "orage";
            color = "#787A91";
            break;
        case 230: //thunderstorm with light drizzle
        case 231: //thunderstorm with drizzle
        case 232: //thunderstorm with heavy drizzle
            weather = "Orage avec bruine";
            icone = "orage";
            color = "#787A91";
            break;
        case 300: //light intensity drizzle
        case 301: //drizzle
        case 302: //heavy intensity drizzle
        case 310: //light intensity drizzle rain
        case 311: //drizzle rain
            weather = "Bruine";
            icone = "bruine";
            color = "#719FB0";
            break;
        case 312: //heavy intensity drizzle rain 
        case 313: //shower rain and drizzle
        case 314: //heavy shower rain and drizzle
        case 321: //shower drizzle
            weather = "Bruine de forte intensité";
            icone = "bruine";
            color = "#719FB0";
            break;
        case 500: //light rain
        case 501: //moderate rain
            weatherFr = "Pluie";
            icone = "pluie";
            color = "#03506F";
            break;
        case 502: //heavy intensity rain
        case 503: //very heavy rain
        case 504: //extreme rain
        case 511: //freezing rain
        case 520: //light intensity shower rain
        case 521: //shower rain
        case 522: //heavy intensity shower rain
        case 531: //ragged shower rain
            weatherFr = "Pluie intense";
            icone = "pluie_intense";
            color = "#03506F";
            break;
        case 600: //light snow
        case 601: //snow
            weatherFr = "flocons éparses";
            icone = "flocons_eparses";
            color = "#E7F6F2";
            break;
        case 602: //heavy snow
        case 611: //sleet
        case 612: //light shower sleet
        case 613: //shower sleet
        case 615: //light rain and snow
        case 616: //rain and snow
        case 620: //light shower snow
        case 621: //shower snow
        case 622: //heavy shower snow
            weatherFr = "Neige";
            icone = "neige";
            color = "#E7F6F2";
            break;
        case 701: //mist
        case 721: //haze
            weatherFr = "Brume";
            icone = "brume";
            color = "#787A91";
            break;
        case 711: //smoke
            weatherFr = "Fumée";
            icone = "brume";
            color = "#787A91";
            break;
        case 731: //sand / dust whirls
        case 751: //sand
            weatherFr = "sable";
            icone = "brume";
            color = "#E6B325";
            break;
        case 741: //fog
            weatherFr = "brouillard";
            icone = "brume";
            color = "#787A91";
            break;
        case 761: //dust
            weatherFr = "poussière";
            icone = "brume";
            color = "#787A91";
            break;
        case 762: //ash
            weatherFr = "cendre volcanique";
            icone = "volcan";
            color = "#990000";
            break;
        case 771: //squalls
            weatherFr = "bourrasques";
            icone = "bourrasque";
            color = "#827397";
            break;
        case 781: //tornado
            weatherFr = "tornade";
            icone = "tornade";
            color = "#827397";
            break;
        case 800: 
            weatherFr = "ciel dégagé";
            icone = "soleil";
            color = "#FFCD38";
            break;
        case 801: //few clouds
        case 802: //scattered clouds
        case 803: // broken clouds
        case 804: // overcast clouds
            weatherFr = "nuageux";
            icone = "nuageux";
            color = "#92A9BD";
            break;
        default:
            break;
    }
    return [weatherFr, icone, color];
}

// Création d'une div et de cinq p pour l'affichage d'une prévision
function creerDiv(date, meteo, icone, color, temperature, humidite, vent){
    var newDiv = document.createElement("div");
    newDiv.classList.add("jour");
    document.getElementById("previsions").appendChild(newDiv);
    newDiv.style.backgroundColor = color;
    // creation de la div transparente
    var divTransp = document.createElement("div");
    divTransp.classList.add("transparent");
    newDiv.appendChild(divTransp); 
    // création d'une div contenant date et météo
    var divGauche = document.createElement("div");
    divTransp.appendChild(divGauche);
    // création du paragraphe date
    var pDate = document.createElement("p");
    divGauche.appendChild(pDate);
    pDate.innerHTML = traduireDate(date);
    // creation de l'image icone
    var pIcone = document.createElement("img");
    pIcone.classList.add("petiteIcone");
    divGauche.appendChild(pIcone);
    pIcone.src = icone + ".svg";
    // création du paragraphe meteo
    var pMeteo = document.createElement("p");
    divGauche.appendChild(pMeteo);
    pMeteo.innerHTML = meteo
    // création d'une div contenant température, humidité et vitesse du vent
    var divDroite = document.createElement("div");
    divTransp.appendChild(divDroite);
    // création du paragraphe température
    var pTemperature = document.createElement("p");
    pTemperature.classList.add("temp");
    divDroite.appendChild(pTemperature);
    pTemperature.innerHTML = Math.round(temperature) + "°C";
    // création du paragraphe humidité
    var pHumidite = document.createElement("p");
    divDroite.appendChild(pHumidite);
    pHumidite.innerHTML = "Humidité : " + humidite + "%";
    // création du paragraphe vitesse du vent
    var pVent = document.createElement("p");
    divDroite.appendChild(pVent);
    pVent.innerHTML = "Vent : " + Math.round((vent)*3.6) + " km/h";
    document.getElementById("previsions").style.visibility = "visible";
}

// transforme une date au format 2022-08-05 en 05 août
function traduireDate (dateUS){
    const dateFr = dateUS.split("-");
    let mois = dateFr[1];
    if (mois == "01"){
        mois = "janvier";
    }
    else if (mois == "02"){
        mois = "février";
    }
    else if (mois == "03"){
        mois = "mars";
    }
    else if (mois == "04"){
        mois = "avril";
    }
    else if (mois == "05"){
        mois = "mai";
    }
    else if (mois == "06"){
        mois = "juin";
    }
    else if (mois == "07"){
        mois = "juillet";
    }
    else if (mois == "08"){
        mois = "août";
    }
    else if (mois == "09"){
        mois = "septembre";
    }
    else if (mois == "10"){
        mois = "octobre";
    }
    else if (mois == "11"){
        mois = "novembre";
    }
    else if (mois == "12"){
        mois = "décembre";
    }
    return dateFr[2] + " " + mois;
}
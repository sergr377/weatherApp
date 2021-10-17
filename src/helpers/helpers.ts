import StrongWind from '../../src/svg/wi-strong-wind.svg'
import DayRainWind from '../../src/svg/wi-day-rain-wind.svg'
import NRainWind from '../../src/svg/wi-night-rain-wind.svg'
import DayRain from '../../src/svg/wi-day-rain.svg'
import DaySnow from '../../src/svg/wi-day-snow.svg'
import DaySunny from '../../src/svg/wi-day-sunny.svg'
import NightClear from '../../src/svg/wi-night-clear.svg'
import Cloud from '../../src/svg/wi-cloud.svg'
import NCloud from '../../src/svg/wi-night-cloudy.svg'
import Na from '../../src/svg/wi-na.svg'
import Fog from '../../src/svg/wi-fog.svg'
import {mainData} from "../components/app/types";

export const imgHandler = (code: string) => {
    switch (code) {
        case '01d':
            return DaySunny
        case '01n':
            return NightClear

        case '02d':
            return Cloud
        case '02n':
            return NCloud

        case '03d':
            return Cloud
        case '03n':
            return NCloud

        case '04d':
            return Cloud
        case '04n':
            return NCloud

        case '09d':
            return DayRainWind
        case '09n':
            return NRainWind

        case '10d':
            return DayRain
        case '10n':
            return DayRain

        case '11d':
            return StrongWind
        case '11n':
            return StrongWind

        case '13d':
            return DaySnow
        case '13n':
            return DaySnow

        case '50d':
            return Fog
        case '50n':
            return Fog

        default:
            return Na
    }
}


export function getInfo(city: string, unit: boolean, setData: (data: mainData) => void) {

    const API_KEY = "14067ca47d30fb0bcb278f67509d646d";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit ? 'metric' : 'imperial'}&APPID=${API_KEY}&lang=ru`)
        .then(response => response.json()).then(data => {
        if (data.cod === "404") {
            return;
        }
        if (data.cod === "400") {
            return;
        }
            setData(data)
        }
    ).catch(err => {
        console.log(err);
    });
}

export function getPlace(lat: number, lon: number, callback:(name: string)=>void) {
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
    const token = "e352d574f32dc4f146c1607d71e6dfc53af5bd92";
    const query = { lat, lon, count:1 };

    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify(query)
    }

    // @ts-ignore
    fetch(url, options)
        .then(response => response.json())
        .then((result: any) => callback(result?.suggestions[0]?.data?.city))
        .catch(error => console.log("error", error));
}
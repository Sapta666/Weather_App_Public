import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environment/environment";

@Injectable({
    providedIn: "root"
})
export class WeatherGeoLocationService {

    constructor(
        private _httpClient: HttpClient
    ) {

    }

    public getWeatherInfo(latitude: number, longitude: number): Observable<any> {
        return this._httpClient.get<any>(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=uv_index_max,sunrise,sunset,temperature_2m_max,temperature_2m_min,weather_code&hourly=weather_code,temperature_2m,wind_speed_10m,precipitation,wind_direction_10m,surface_pressure,uv_index&current=surface_pressure,wind_speed_10m,wind_direction_10m,relative_humidity_2m,temperature_2m,apparent_temperature,weather_code,precipitation&timezone=Asia%2FKolkata`);
    }

    public getAirQualityInfo(latitude: number, longitude: number): Observable<any> {
        return this._httpClient.get<any>(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi,european_aqi&timezone=Asia%2FKolkata`);
    }

    public getLocationFromCoordinates(latitude: number, longitude: number): Observable<any> {
        return this._httpClient.get<any>(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C+${longitude}&key=${environment.openCage_ApiKey}`);
    }

}
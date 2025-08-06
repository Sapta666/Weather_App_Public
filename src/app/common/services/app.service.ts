import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class AppService {

    constructor() {

    }

    public clearSessionStorage(): void {
        sessionStorage.clear();
    }

    public setWeatherInfo(data): void {
        sessionStorage.setItem("WeatherInfo",JSON.stringify(data));
    }

    public getWeatherInfo() {
        return JSON.parse(sessionStorage.getItem("WeatherInfo"));
    }

    public setLocationInfo(data): void {
        sessionStorage.setItem("LocationInfo",JSON.stringify(data));
    }

    public getLocationInfo() {
        return JSON.parse(sessionStorage.getItem("LocationInfo"));
    }

}
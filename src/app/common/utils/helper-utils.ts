import { WeatherCodesDto } from "../models/WeatherCodesDto.model";

export class HelperUtils {

    public static getDispHoursDate(date: Date): string {
        let result: string = "";
        let hours: string = String(date.getHours() - (date.getHours() > 12 ? 12 : 0)).padStart(2,"0");


        result = `${hours}: 00 ${date.getHours() >= 12 ? "PM" : "AM"}`

        return result;
    }
    

}		
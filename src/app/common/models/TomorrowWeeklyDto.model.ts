export interface TomorrowWeeklyDto {
    Text: string;
    Value_Max: number;
    Value_Min: number;
    WeatherImgSrc: string;
}

export function getTomorrowWeeklyInstance(): TomorrowWeeklyDto {
    return {
        Text: "",
        Value_Max: 0,
        Value_Min: 0,
        WeatherImgSrc: "",
    }
}
export interface WeatherCodesDto {
    Codes: number[];
    Description: string;
    ImgSrc: string;
}

export function getWeatherCodesInstance(): WeatherCodesDto {
    return {
        Codes: [0],
        Description: "",
        ImgSrc: "",
    }
}
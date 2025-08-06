import { WeatherCodesDto } from "../models/WeatherCodesDto.model";

export class WeatherUtils {

    private static WeatherCodes: WeatherCodesDto[] = [
        { Codes: [0], Description: "Clear sky", ImgSrc: "clear-day.svg", },
        { Codes: [1, 2, 3], Description: "Mainly clear, partly cloudy, and overcast", ImgSrc: "partly-cloudy.svg", },
        { Codes: [45, 48], Description: "Fog and depositing rime fog", ImgSrc: "foggy.svg", },
        { Codes: [51, 53, 55], Description: "Clear skyDrizzle: Light, moderate, and dense intensity", ImgSrc: "raining.svg", },
        { Codes: [56, 57], Description: "Freezing Drizzle: Light and dense intensity", ImgSrc: "raining.svg", },
        { Codes: [61, 63, 65], Description: "Rain: Slight, moderate and heavy intensity", ImgSrc: "raining.svg", },
        { Codes: [66, 67], Description: "Freezing Rain: Light and heavy intensity", ImgSrc: "raining.svg", },
        { Codes: [71, 73, 75], Description: "Snow fall: Slight, moderate, and heavy intensity", ImgSrc: "snowy.svg", },
        { Codes: [77], Description: "Snow grains", ImgSrc: "snowy.svg", },
        { Codes: [80, 81, 82], Description: "Rain showers: Slight, moderate, and violent", ImgSrc: "raining.svg", },
        { Codes: [85, 86], Description: "Snow showers slight and heavy", ImgSrc: "snowy.svg", },
        { Codes: [95], Description: "Thunderstorm: Slight or moderate", ImgSrc: "thunder.svg", },
        { Codes: [96, 99], Description: "Thunderstorm with slight and heavy hail", ImgSrc: "thunder.svg", },
    ];

    public static getWindSpeedType(speed: number): string {
        let result: string = "";
        speed = speed - speed % 1;

        if (1)
            result = "Calm";
        else if (speed >= 1 && speed <= 5)
            result = "Light Air";
        else if (speed >= 6 && speed <= 11)
            result = "Light Breeze";
        else if (speed >= 12 && speed <= 19)
            result = "Gentle Breeze";
        else if (speed >= 20 && speed <= 28)
            result = "Moderate Breeze";
        else if (speed >= 29 && speed <= 38)
            result = "Fresh Breeze";
        else if (speed >= 39 && speed <= 61)
            result = "Strong Wind";
        else if (speed >= 62 && speed <= 74)
            result = "Fresh Gale";
        else if (speed >= 75 && speed <= 88)
            result = "Strong Gale";
        else if (speed >= 89 && speed <= 102)
            result = "Whole Gale";
        else if (speed >= 103 && speed <= 117)
            result = "Storm";
        else if (speed > 117)
            result = "Hurricane";

        return result;
    }

    public static getWindDirectionBasedOnAngule(angle: number): string {
        let result: string = "";

        if ((angle >= 0 && angle <= 25)
            || (angle >= 335 && angle <= 360))
            result = "North";
        else if (angle > 25 && angle <= 65)
            result = "Northeast";
        else if (angle > 65 && angle <= 115)
            result = "East";
        else if (angle > 115 && angle <= 155)
            result = "Southeast";
        else if (angle > 155 && angle <= 205)
            result = "South";
        else if (angle > 205 && angle <= 245)
            result = "Southwest";
        else if (angle > 245 && angle <= 295)
            result = "West";
        else if (angle > 295 && angle <= 335)
            result = "Northwest";

        return result;
    }

    public static getHumidityLevelTypeFromRelativeVal(value: number): string {
        let result: string = "";

        if (value > 70)
            result = "High";
        else if (value >= 60 && value < 70)
            result = "Above Average";
        else if (value >= 30 && value < 60)
            result = "Moderate";
        else if (value >= 25 && value < 30)
            result = "Fair";
        else if (value < 25)
            result = "Poor";

        return result;
    }


    /**
     * Gives the severity level based on the pressure value.
     * 
     * @param value atmospheric pressure, in hPa , 1 kPa = 10 hPa
     */
    public static getSurfacePressureTypeFromValue(value: number): string {
        let result: string = "";

        if (value > 108)
            return "Above Critical";
        else if (value >= 105 && value < 108)
            return "Warning";
        else if (value >= 98 && value < 105)
            return "Comfortable";
        else if (value >= 95 && value < 98)
            return "Warning";
        else if (value < 95)
            return "Below Critical";

        return result;
    }

    /**
     * Gives Severity value of uv index based on its value.
     * 
     * @param value 
     * 
     * @returns severity value
     */
    public static getUVIndexSeverityLevelByValue(value: number): string {
        let result = "";

        if (value >= 11)
            result = "Extreme";
        else if (value > 7 && value < 11)
            result = "Very High";
        else if (value >= 6 && value < 7)
            result = "High";
        else if (value >= 2 && value < 6)
            result = "Medium";
        else if (value >= 1 && value < 2)
            result = "Low";
        else if (value < 1)
            result = "NIL";

        return result;
    }

    public static getWeatherDataByCode(weatherCode: number): WeatherCodesDto {
        return WeatherUtils.WeatherCodes.find(item => item.Codes.indexOf(weatherCode) > -1);
    }


}		
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MajorTabCarrCntComponent } from './components/major-tab-card/major-tab-card-cnt.component';
import { MiniDispCardCntComponent } from './components/mini-display-card/mini-disp-card-cnt.component';
import { AirPollutionCardCntComponent } from './components/air-pollution-card/air-pollution-card-cnt.component';
import { CommonModule } from '@angular/common';
import { SunriseSunsetCardCntComponent } from './components/sunrise-sunset-card/sunrise-sunset-card-cnt.component';
import { NextDayWeeklyDataCardCntComponent } from './components/next-day-weekly-data-card/next-day-weekly-data-card-cnt.component';
import { WeatherGeoLocationService } from './common/services/weather-geo-location.service';
import { AppService } from './common/services/app.service';
import { getWeatherCodesInstance, WeatherCodesDto } from './common/models/WeatherCodesDto.model';
import { WeatherUtils } from './common/utils/weather-utils';
import { HelperUtils } from './common/utils/helper-utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MajorTabCarrCntComponent, MiniDispCardCntComponent, AirPollutionCardCntComponent,
    CommonModule, SunriseSunsetCardCntComponent, NextDayWeeklyDataCardCntComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  //#region Variables Section

  protected title = 'weather_app';
  protected currentDate: Date = new Date();
  protected totalHeight: number = 500;

  protected locationInfo: any = null;
  protected weatherInfo: any = null;
  protected airQualityInfo: any = null;
  protected currentWeatherCode: WeatherCodesDto = { ...getWeatherCodesInstance() };

  protected windSpeedType: string = "";
  protected windDirectionText: string = "";
  protected humidityLevelText: string = "";
  protected dewPointTemperture: number = 0;
  protected uvIndex: number = 0;
  protected uvIndex_SeverityText: string = "";

  protected sunriseTime: string = "";
  protected sunsetTime: string = "";
  protected leftCardConElement = null;

  //#endregion

  //#region Life Cycle Hooks

  constructor(
    private _appService: AppService,
    private _weatherGeoLocationService: WeatherGeoLocationService
  ) {

  }

  ngOnInit(): void {
    this._appService.clearSessionStorage();
    setTimeout(() => {
      this.leftCardConElement = document.getElementById("left-card-con");
    }, 300)

    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position.coords.latitude, position.coords.longitude);
      this.getGeoLocationInfo(position.coords.latitude, position.coords.longitude);
      this.getWeatherInfo(position.coords.latitude, position.coords.longitude);
      this.getAirQualityInfo(position.coords.latitude, position.coords.longitude);
    }, (error) => {
      console.log(error);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.totalHeight = this.leftCardConElement.clientHeight - 50;
  }

  //#endregion

  //#region Api Functions

  private getGeoLocationInfo(latitude: number, longitude: number): void {
    this._weatherGeoLocationService
      .getLocationFromCoordinates(latitude, longitude)
      .subscribe(response => {
        console.log(response);
        this.locationInfo = response;
        this.locationInfo?.results[0]?.components;
        this._appService.setLocationInfo(response);

        setTimeout(() => {
          this.totalHeight = this.leftCardConElement.clientHeight - 50;
        }, 300);
      });
  }

  private getWeatherInfo(latitude: number, longitude: number): void {
    this._weatherGeoLocationService
      .getWeatherInfo(latitude, longitude)
      .subscribe(response => {
        console.log(response);
        this.weatherInfo = response;

        this.currentWeatherCode = WeatherUtils.getWeatherDataByCode(this.weatherInfo.current.weather_code);
        this.windSpeedType = WeatherUtils.getWindSpeedType(this.weatherInfo.current.wind_speed_10m);
        this.windDirectionText = WeatherUtils.getWindDirectionBasedOnAngule(this.weatherInfo.current.wind_direction_10m);
        this.humidityLevelText = WeatherUtils.getHumidityLevelTypeFromRelativeVal(this.weatherInfo.current.relative_humidity_2m);

        this.dewPointTemperture = this.weatherInfo.current.temperature_2m - (100 - this.weatherInfo?.current?.relative_humidity_2m) / 5;
        this.dewPointTemperture = Math.floor((this.dewPointTemperture * 100)) / 100;

        this.uvIndex = this.weatherInfo?.hourly?.uv_index.find((value, index) => {
          let currentDate: Date = new Date();
          let tempIndex: number = index + 1 >= this.weatherInfo?.hourly?.time?.length
            ? index
            : index + 1;
          let tempDate: Date = new Date(this.weatherInfo?.hourly?.time[tempIndex]);

          if (currentDate < tempDate)
            return true;

          return false;
        }); this.weatherInfo?.hourly?.uv_index
        this.uvIndex_SeverityText = WeatherUtils.getUVIndexSeverityLevelByValue(this.uvIndex);

        this.sunriseTime = HelperUtils.getDispHoursDate(new Date(this.weatherInfo.daily?.sunrise.find(value => {
          let tempDate: Date = new Date(value);
          let currentDate: Date = new Date();

          if (tempDate.getDate() == currentDate.getDate()
            && tempDate.getMonth() == currentDate.getMonth()
            && tempDate.getFullYear() == currentDate.getFullYear())
            return true;

          return false;
        })));
        this.sunsetTime = HelperUtils.getDispHoursDate(new Date(this.weatherInfo.daily?.sunset.find(value => {
          let tempDate: Date = new Date(value);
          let currentDate: Date = new Date();

          if (tempDate.getDate() == currentDate.getDate()
            && tempDate.getMonth() == currentDate.getMonth()
            && tempDate.getFullYear() == currentDate.getFullYear())
            return true;

          return false;
        })));

        this._appService.setWeatherInfo(response);

        setTimeout(() => {
          this.totalHeight = this.leftCardConElement.clientHeight - 50;
        }, 300);
      });
  }

  private getAirQualityInfo(latitude: number, longitude: number): void {
    this._weatherGeoLocationService
      .getAirQualityInfo(latitude, longitude)
      .subscribe(response => {
        console.log(response);
        this.airQualityInfo = response;

        setTimeout(() => {
          this.totalHeight = this.leftCardConElement.clientHeight - 50;
        }, 300);
      });
  }


  //#endregion

}

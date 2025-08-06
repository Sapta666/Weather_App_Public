import { Component, Input, OnInit } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MeasureDispCardCntComponent } from '../measure-disp-card/measure-disp-card-cnt.component';
import { TomorrowWeeklyDto } from '../../common/models/TomorrowWeeklyDto.model';
import { CommonModule } from '@angular/common';
import { HelperUtils } from '../../common/utils/helper-utils';
import { WeatherUtils } from '../../common/utils/weather-utils';

@Component({
  selector: 'app-next-day-weekly-data-card-cnt',
  standalone: true,
  imports: [MatButtonToggleModule, CommonModule],
  templateUrl: './next-day-weekly-data-card-cnt.component.html'
})
export class NextDayWeeklyDataCardCntComponent implements OnInit {

  //#region Variables Section


  private _weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  private _weatherInfo: any = null;

  private _hourly_TomorrowData: TomorrowWeeklyDto[] = [];
  private _daily_WeekData: TomorrowWeeklyDto[] = [];

  protected selectedBtn: "tomorrow" | "weekly" = "tomorrow";
  protected displayData: TomorrowWeeklyDto[] = [];

  protected element = null;

  protected isMouseInMainZone: boolean = false;
  protected isMousePressed: boolean = false;


  //#endregion

  //#region Attributes

  @Input() pTotalHeight: number = 500;
  @Input() set pWeather_Info(weatherInfo: any) {
    this._weatherInfo = weatherInfo;

    this.getWeatherData();
  }

  //#endregion

  //#region Lifecycle Hooks 

  constructor() {

  }

  ngOnInit(): void {
    this.getWeatherData();
    setTimeout(() => {
      this.element = document.getElementById("card-display-con");
    },200);
  }

  //#endregion

  //#region Private Methods

  //#endregion

  //#region Local Methods

  protected onDisplayTypeChange(changeData: MatButtonToggleChange): void {
    console.log(changeData)
    this.selectedBtn = changeData.value;

    if (this.selectedBtn == 'tomorrow')
      this.displayData = this._hourly_TomorrowData;
    else if (this.selectedBtn == "weekly")
      this.displayData = this._daily_WeekData;
  }

    protected onMouseMove(event): void {
    if (this.isMouseInMainZone && this.isMousePressed) {
      this.element.scrollTop -= event.movementY;
    }
  }

  protected onMouseEnter(): void {
    this.isMouseInMainZone = true;
  }

  protected onMouseLeave(): void {
    this.isMouseInMainZone = false;
    this.element.style.cursor = "unset";
  }

  protected onMouseDown(): void {
    this.isMousePressed = true;
    this.element.style.cursor = "grab";
  }

  protected onMouseUp(): void {
    this.isMousePressed = false;
    this.element.style.cursor = "unset";
  }

  //#endregion

  //#region Api Functions

  private getWeatherData(): void {
    this._daily_WeekData = [];
    this._daily_WeekData = this._weatherInfo?.daily?.time.map((value, index) => {
      let tomorrowWeekly: TomorrowWeeklyDto = {
        Text: new Date().getDate() == new Date(value).getDate()
          ? "Today"
          : (new Date().getDate() + 1 == new Date(value).getDate() + 1
            ? "Tomorrow"
            : this._weekday[new Date(value).getDay()]),
        Value_Max: this._weatherInfo?.daily?.temperature_2m_max[index],
        Value_Min: this._weatherInfo?.daily?.temperature_2m_min[index],
        WeatherImgSrc: WeatherUtils.getWeatherDataByCode(this._weatherInfo?.daily?.weather_code[index]).ImgSrc
      }

      return tomorrowWeekly;
    });

    this._hourly_TomorrowData = [];

    for (let cc = 0; cc < this._weatherInfo?.hourly?.time.length; cc++) {
      let tempDate: Date = new Date(this._weatherInfo?.hourly?.time[cc]);
      let currentDate: Date = new Date();
      currentDate.setDate(currentDate.getDate() + 1);

      if (tempDate.getDate() == currentDate.getDate()
        && tempDate.getMonth() == currentDate.getMonth()
        && tempDate.getFullYear() == currentDate.getFullYear()) {
        let tomorrowWeekly: TomorrowWeeklyDto = {
          Text: HelperUtils.getDispHoursDate(tempDate),
          Value_Max: this._weatherInfo?.hourly?.temperature_2m[cc],
          Value_Min: 0,
          WeatherImgSrc: WeatherUtils.getWeatherDataByCode(this._weatherInfo?.hourly?.weather_code[cc]).ImgSrc
        }
        this._hourly_TomorrowData.push(tomorrowWeekly);
      }
    }

    this.displayData = this._hourly_TomorrowData;
  }

  //#endregion

}

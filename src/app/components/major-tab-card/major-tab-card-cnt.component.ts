import { Component, Input, OnInit } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MeasureDispCardCntComponent } from '../measure-disp-card/measure-disp-card-cnt.component';
import { TextValueDto } from '../../common/models/TextValueDto.model';
import { HelperUtils } from '../../common/utils/helper-utils';

@Component({
  selector: 'app-major-tab-card-cnt',
  standalone: true,
  imports: [MatButtonToggleModule, MeasureDispCardCntComponent],
  templateUrl: './major-tab-card-cnt.component.html'
})
export class MajorTabCarrCntComponent implements OnInit {

  //#region Variables Section  

  private _hourly_TemperatureData: TextValueDto[] = [];
  private _hourly_WindSpeedData: TextValueDto[] = [];
  private _hourly_PrecipitationData: TextValueDto[] = [];

  protected weatherInfo: any = null;
  protected element = null;

  protected selectedBtn: "hourly" | "wind" | "precipitation" = "hourly";
  protected displayData: TextValueDto[] = [];
  protected maxPrecipitation: number = 0;

  protected isMouseInMainZone: boolean = false;
  protected isMousePressed: boolean = false;

  //#endregion

  //#region Attributes

  @Input() set pWeatherInfo(value) {
    this.weatherInfo = value;

    this.maxPrecipitation = value?.hourly.precipitation.sort((a, b) => {
      return b - a;
    })[0];

    this.getWeatherData();

  }

  //#endregion

  //#region Lifecycle Hooks 

  constructor() {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.element = document.getElementById("major-display-con");
    }, 300);
  }

  //#endregion

  //#region Private Methods

  //#endregion

  //#region Local Methods

  protected onDisplayTypeChange(changeData: MatButtonToggleChange): void {
    console.log(changeData)
    this.selectedBtn = changeData.value;

    if (this.selectedBtn == 'hourly')
      this.displayData = this._hourly_TemperatureData;
    else if (this.selectedBtn == "wind")
      this.displayData = this._hourly_WindSpeedData;
    else
      this.displayData = this._hourly_PrecipitationData;
  }

  protected onMouseMove(event): void {
    if (this.isMouseInMainZone && this.isMousePressed) {
      this.element.scrollLeft -= event.movementX;
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
    this._hourly_TemperatureData = [];
    this._hourly_WindSpeedData = [];
    this._hourly_PrecipitationData = [];

    this.weatherInfo?.hourly?.time.forEach((value, index) => {
      let tempDate = new Date(value);
      let currentDate = new Date();
      // currentDate

      if (tempDate.getFullYear() == currentDate.getFullYear()
        && tempDate.getMonth() == currentDate.getMonth()
        && tempDate.getDate() == currentDate.getDate()) {
        this._hourly_TemperatureData.push({
          Text: HelperUtils.getDispHoursDate(tempDate),
          Value: this.weatherInfo?.hourly?.temperature_2m[index] + '',
          Value_Num: this.weatherInfo?.hourly?.temperature_2m[index]
        });
        this._hourly_WindSpeedData.push({
          Text: HelperUtils.getDispHoursDate(tempDate),
          Value: this.weatherInfo?.hourly?.wind_speed_10m[index] + '', // for display
          Value_Num: this.weatherInfo?.hourly?.wind_direction_10m[index]  // for direction
        });
        this._hourly_PrecipitationData.push({
          Text: HelperUtils.getDispHoursDate(tempDate),
          Value: this.weatherInfo?.hourly?.precipitation[index] + '',
          Value_Num: this.weatherInfo?.hourly?.precipitation[index]
        });
      }
    });

    this.displayData = this._hourly_TemperatureData;
  }

  //#endregion

}

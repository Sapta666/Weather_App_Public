import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';


@Component({
  selector: 'app-sunrise-sunset-card-cnt',
  standalone: true,
  imports: [MatButtonToggleModule, MatSliderModule, CommonModule,],
  templateUrl: './sunrise-sunset-card-cnt.component.html'
})
export class SunriseSunsetCardCntComponent implements OnInit {

  //#region Variables Section

  protected time_to_degrees: number = -90; // -90 for offset to start from midnight
  protected timeDisp: string = "";

  //#endregion

  //#region Attributes  

  @Input() set pCurrent_Time(date: Date) {
    const timeHours: number = date.getHours()+date.getMinutes()/60;

    this.time_to_degrees = timeHours/24 * 360 - 90;

    this.timeDisp = `${date.getHours() - (date.getHours() > 12 ? 12 : 0)} : ${
      String(date.getMinutes()).padStart(2,"0")
    } ${date.getHours() >= 12 ? "PM" : "AM"}`;
  };
  @Input() pSunriseTime: string = "";
  @Input() pSunsetTime: string = "";

  //#endregion

  //#region Lifecycle Hooks 

  constructor() {

  }

  ngOnInit(): void {

  }

  //#endregion

  //#region Private Methods

  //#endregion

  //#region Api Functions

  //#endregion

}

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { PollutionInfoHelperCntComponent } from '../pollution-info-helper/pollution-info-helper-cnt.component';


@Component({
  selector: 'app-air-pollution-card-cnt',
  standalone: true,
  imports: [MatButtonToggleModule, MatSliderModule, CommonModule,
    PollutionInfoHelperCntComponent
  ],
  templateUrl: './air-pollution-card-cnt.component.html'
})
export class AirPollutionCardCntComponent implements OnInit {

  //#region Variables Section

  protected pollution_Value: number = 0;
  protected pollution_State: string = "";

  protected showHelperDialog: boolean = false;

  //#endregion

  //#region Attributes  

  @Input() set pPollution_Value(value: number) {
    this.pollution_Value = value;

    if (this.pollution_Value > 300)
      this.pollution_Value = 300;
    else if (this.pollution_Value < 0)
      this.pollution_Value = 0;

    this.calcPollutionState();
  };


  //#endregion

  //#region Lifecycle Hooks 

  constructor() {

  }

  ngOnInit(): void {

  }

  //#endregion

  //#region Private Methods

  private calcPollutionState(): void {
    if (this.pollution_Value >= 0 && this.pollution_Value <= 50)
      this.pollution_State = "Good";
    else if (this.pollution_Value >= 51 && this.pollution_Value <= 100)
      this.pollution_State = "Moderate";
    else if (this.pollution_Value >= 101 && this.pollution_Value <= 150)
      this.pollution_State = "Unhealthy for Sensitive Groups";
    else if (this.pollution_Value >= 151 && this.pollution_Value <= 200)
      this.pollution_State = "Unhealthy";
    else if (this.pollution_Value >= 201 && this.pollution_Value <= 300)
      this.pollution_State = "Very Unhealthy";
    else if (this.pollution_Value > 300)
      this.pollution_State = "Hazardous";
  }

  //#endregion

  //#region Api Functions

  //#endregion

}

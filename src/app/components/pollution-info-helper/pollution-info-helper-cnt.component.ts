import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';


@Component({
  selector: 'app-pollution-info-helper-cnt',
  standalone: true,
  imports: [MatButtonToggleModule, MatSliderModule, CommonModule],
  templateUrl: './pollution-info-helper-cnt.component.html'
})
export class PollutionInfoHelperCntComponent implements OnInit {

  //#region Variables Section

  protected pollution_Value: number = 0;
  protected pollution_State: string = "";

  protected showHelperDialog: boolean = false;

  //#endregion

  //#region Lifecycle Hooks 

  constructor() {

  }

  ngOnInit(): void {

  }

  //#endregion

}

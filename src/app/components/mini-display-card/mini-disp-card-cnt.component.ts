import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatSliderModule} from '@angular/material/slider';


@Component({
  selector: 'app-mini-disp-card-cnt',
  standalone: true,
  imports: [MatButtonToggleModule, MatSliderModule,CommonModule],
  templateUrl: './mini-disp-card-cnt.component.html'
})
export class MiniDispCardCntComponent implements OnInit {

  //#region Variables Section

  protected magTypeColor: string[] = ["#62b3ff9c", "#2b66e69c", "#7c2be69c"];
  protected magTypeColor_Pointer: string[] = ["#5caddd","#032a80ff","#400094ff"];  

  //#endregion

  //#region Attributes

  @Input() pHeading: string = "";
  @Input() pValue: string = "";
  @Input() pUOM: string = "";
  @Input() pValueMagnitude: string = "";
  @Input() pSecondaryHeader: string = "";
  @Input() pSecondaryText: string = "";
  @Input() pValueMagType: "direction" | "progress" | "none" = "none";
  @Input() pIsMagLabelNumeric: boolean = true;
  @Input() pValueMagType_Value: number = 0; // for direction value should be in degrees
  @Input() pMagType_ColorIndex: 1 | 2 | 3 = 1;


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

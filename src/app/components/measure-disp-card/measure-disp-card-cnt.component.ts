import { Component, Input } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { getTextValueInstance, TextValueDto } from '../../common/models/TextValueDto.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-measure-disp-card-cnt',
  standalone: true,
  imports: [MatButtonToggleModule, CommonModule],
  templateUrl: './measure-disp-card-cnt.component.html'
})
export class MeasureDispCardCntComponent {

  //#region Variables Section  

  //#endregion

  //#region Attributes

  @Input() pDataItem: TextValueDto = { ...getTextValueInstance() };
  @Input() pIsForWind: boolean = false;

  //#endregion

  //#region Lifecycle Hooks 

  //#endregion

  //#region Private Methods

  //#endregion

  //#region Local Methods

  //#endregion

}

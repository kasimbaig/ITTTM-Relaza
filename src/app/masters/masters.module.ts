import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersRoutingModule } from './masters-routing.module';
import { MastersComponent } from './masters.component';
import { FormBuildingComponent } from './form-building/form-building.component';
import { SrarModule } from '../srar/srar.module';

@NgModule({
  declarations: [
    MastersComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
    FormBuildingComponent,
    SrarModule
  ],
  exports: [
    MastersComponent
  ]
})
export class MastersModule { }

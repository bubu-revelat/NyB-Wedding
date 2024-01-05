import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComidaPage } from './comida';

@NgModule({
  declarations: [
    ComidaPage,
  ],
  imports: [
    IonicPageModule.forChild(ComidaPage),
  ],
})
export class ComidaPageModule {}

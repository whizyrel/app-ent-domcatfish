import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { SnackbarmsgComponent } from './snackbarmsg/snackbarmsg.component';
import { DialogComponent } from './dialog/dialog.component';

import {
  ModulesList, ComponentsList, ServicesList,
  SharedComponents, AdminComponents
} from './common/app-module-imports';

@NgModule({
  declarations: [
    ...ComponentsList,
    ...SharedComponents,
    ...AdminComponents
  ],
  imports: [...ModulesList],
  providers: [...ServicesList],
  bootstrap: [AppComponent],
  entryComponents: [
    SnackbarmsgComponent,
    DialogComponent
  ],
})
export class AppModule { }

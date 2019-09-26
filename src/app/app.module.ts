import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SnackbarmsgComponent } from './snackbarmsg/snackbarmsg.component';
import { DialogComponent } from './dialog/dialog.component';

import { ServicesList, GuardsList, ModulesList, ComponentsList } from './common/app-module-imports';

@NgModule({
  declarations: new ComponentsList().getList,
  imports: new  ModulesList().getList,
  providers: new ServicesList().getList,
  bootstrap: [AppComponent],
  entryComponents: [
    SnackbarmsgComponent, DialogComponent
  ],
})
export class AppModule {}

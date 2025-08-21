import { NgModule } from '@angular/core';

import { SharedModule } from './shared-module';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    SharedModule,
  ],
})
export class SharedTestingModule {}

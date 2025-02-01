import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomainRoutingModule } from './domain-routing.module';
import { DomainComponent } from './domain.component';


@NgModule({
  declarations: [
    DomainComponent
  ],
  imports: [
    CommonModule,
    DomainRoutingModule
  ]
})
export class DomainModule { }

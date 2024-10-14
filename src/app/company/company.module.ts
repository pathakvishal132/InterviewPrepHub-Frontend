import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CompanyDetailsComponent } from '../company-details/company-details.component';

import { PaginationModule } from '../pagination/pagination.module';
const routes: Routes = [
    {
        path: '',
        component: CompanyComponent
    },
    {
        path: 'details/:id',
        component: CompanyDetailsComponent
    }
];

@NgModule({
    declarations: [
        CompanyComponent,
        CompanyDetailsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        PaginationModule
    ]
})
export class CompanyModule { }

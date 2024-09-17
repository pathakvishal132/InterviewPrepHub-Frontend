// src/app/questions/questions.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
    {
        path: '',
        component: CompanyComponent
    }
];

@NgModule({
    declarations: [CompanyComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export class CompanyModule { }

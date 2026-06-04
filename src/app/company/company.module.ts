import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CompanyDetailsComponent } from '../company-details/company-details.component';
import { CompanyCodingComponent } from '../company-coding/company-coding.component';
import { CodingEditorComponent } from '../coding-editor/coding-editor.component';
import { MonacoEditorComponent } from '../monaco-editor/monaco-editor.component';

import { PaginationModule } from '../pagination/pagination.module';
const routes: Routes = [
    {
        path: '',
        component: CompanyComponent
    },
    {
        path: 'details/:id',
        component: CompanyDetailsComponent
    },
    {
        path: 'coding/:id',
        component: CompanyCodingComponent
    },
    {
        path: 'coding/:id/question/:questionId',
        component: CodingEditorComponent
    }
];

@NgModule({
    declarations: [
        CompanyComponent,
        CompanyDetailsComponent,
        CompanyCodingComponent,
        CodingEditorComponent,
        MonacoEditorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        PaginationModule
    ]
})
export class CompanyModule { }

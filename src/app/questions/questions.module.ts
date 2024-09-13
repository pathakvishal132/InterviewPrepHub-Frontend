// src/app/questions/questions.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
    {
        path: '',
        component: QuestionsComponent
    }
];

@NgModule({
    declarations: [QuestionsComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export class QuestionsModule { }

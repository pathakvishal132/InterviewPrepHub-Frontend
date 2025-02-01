import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
// import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [PaginationComponent],
    imports: [CommonModule, FormsModule],
    exports: [PaginationComponent]
})
export class PaginationModule { }

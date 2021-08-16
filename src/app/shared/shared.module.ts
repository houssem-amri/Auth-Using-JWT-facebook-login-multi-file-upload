import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface,
    PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [CommonModule, PerfectScrollbarModule, ClickOutsideModule, ReactiveFormsModule,
        FormsModule],
    exports: [CommonModule, PerfectScrollbarModule, ClickOutsideModule, ReactiveFormsModule,
        FormsModule],
    declarations: [],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class SharedModule { }

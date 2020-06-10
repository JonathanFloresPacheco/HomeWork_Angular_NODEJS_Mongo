import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

const Routes3: Routes = [
{
    path: '',
    component: HomeComponent
}
];

@NgModule({
imports: [
    CommonModule,
    RouterModule.forChild(Routes3)
],
exports: [
    RouterModule
],
declarations: []
})
export class HomeRoutingModule { }

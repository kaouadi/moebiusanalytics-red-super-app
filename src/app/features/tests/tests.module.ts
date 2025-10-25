import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { RunTestsComponent } from './pages/run-tests/run-tests.component';
import { ResultsComponent } from './pages/results/results.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'run-tests',
    pathMatch: 'full'
  },
  {
    path: 'run-tests',
    component: RunTestsComponent
  },
  {
    path: 'results',
    component: ResultsComponent
  }
];

@NgModule({
  declarations: [
    RunTestsComponent,
    ResultsComponent  
],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class TestsModule { }
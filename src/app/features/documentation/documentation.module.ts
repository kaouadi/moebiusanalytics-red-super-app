import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GuidesComponent } from './pages/guides/guides.component';
import { TutorialsComponent } from './pages/tutorials/tutorials.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'guides',
    pathMatch: 'full'
  },
  {
    path: 'guides',
    component: GuidesComponent
  },
  {
    path: 'tutorials',
    component: TutorialsComponent
  }
];

@NgModule({
  declarations: [
    GuidesComponent,
    TutorialsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DocumentationModule { }
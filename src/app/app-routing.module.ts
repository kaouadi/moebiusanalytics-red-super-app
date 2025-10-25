import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'documentation',
    pathMatch: 'full'
  },
  {
    path: 'documentation',
    loadChildren: () => 
      import('./features/documentation/documentation.module')
        .then(m => m.DocumentationModule)
  },
  {
    path: 'tests',
    loadChildren: () => 
      import('./features/tests/tests.module')
        .then(m => m.TestsModule)
  },
  {
    path: '**',
    redirectTo: 'documentation'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
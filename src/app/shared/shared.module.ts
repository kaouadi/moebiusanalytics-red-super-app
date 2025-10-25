import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Composants
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { BottomNavigationComponent } from './components/bottom-navigation/bottom-navigation.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    DrawerComponent,
    BottomNavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule  // ← Important pour routerLink et routerLinkActive
  ],
  exports: [
    MainLayoutComponent,
    DrawerComponent,
    BottomNavigationComponent
  ]
})
export class SharedModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// NgRx
import { navigationReducer } from './core/store/navigation/navigation.reducer';
import { NavigationEffects } from './core/store/navigation/navigation.effects';

import { environment } from '../environments/environment.production';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    // NgRx Store
    StoreModule.forRoot({
      navigation: navigationReducer
    }),
    
    // NgRx Effects
    EffectsModule.forRoot([NavigationEffects]),
    
    // NgRx DevTools
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
      trace: false,
      traceLimit: 75
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

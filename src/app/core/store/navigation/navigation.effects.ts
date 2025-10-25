import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as NavigationActions from './navigation.actions';
import { NavigationDataService } from '../../services/navigation-data.service';

@Injectable()
export class NavigationEffects {
  
  setCurrentFeature$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NavigationActions.setCurrentFeature),
      map(({ featureId }) => {
        const config = this.navigationDataService.getFeatureConfig(featureId);
        
        if (config) {
          return NavigationActions.setCurrentFeatureSuccess({
            feature: config.feature,
            services: config.services
          });
        }
        
        return NavigationActions.setCurrentFeatureFailure({
          error: `Feature ${featureId} not found`
        });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private navigationDataService: NavigationDataService
  ) {}
}
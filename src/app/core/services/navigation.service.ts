import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as NavigationActions from '../store/navigation/navigation.actions';
import * as NavigationSelectors from '../store/navigation/navigation.selector';
import { Feature, Service } from '../models/feature.model';
import { NavigationDataService } from './navigation-data.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  
  // Observables pour les composants
  drawerOpen$: Observable<boolean>;
  currentFeature$: Observable<Feature | null>;
  currentServices$: Observable<Service[]>;
  navigationData$: Observable<{
    drawerOpen: boolean;
    currentFeature: Feature | null;
    currentServices: Service[];
  }>;

  constructor(
    private store: Store,
    private navigationDataService: NavigationDataService
  ) {
    this.drawerOpen$ = this.store.select(NavigationSelectors.selectDrawerOpen);
    this.currentFeature$ = this.store.select(NavigationSelectors.selectCurrentFeature);
    this.currentServices$ = this.store.select(NavigationSelectors.selectCurrentServices);
    this.navigationData$ = this.store.select(NavigationSelectors.selectNavigationData);
  }

  // Actions
  toggleDrawer(): void {
    this.store.dispatch(NavigationActions.toggleDrawer());
  }

  openDrawer(): void {
    this.store.dispatch(NavigationActions.openDrawer());
  }

  closeDrawer(): void {
    this.store.dispatch(NavigationActions.closeDrawer());
  }

  setCurrentFeature(featureId: string): void {
    this.store.dispatch(NavigationActions.setCurrentFeature({ featureId }));
  }

  // Getters synchrones (si nécessaire)
  getFeatures(): Feature[] {
    return this.navigationDataService.getFeatures();
  }

  getServicesForFeature(featureId: string): Service[] {
    return this.navigationDataService.getServicesForFeature(featureId);
  }
}
// navigation.service.ts
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

  /**
   * Définit la feature courante en fonction d'une route
   * @param routeSegment Premier segment de l'URL (ex: 'documentation', 'tests')
   */
  setCurrentFeatureByRoute(routeSegment: string): void {
    const featureId = this.navigationDataService.getFeatureIdByRoute(routeSegment);
    
    if (featureId) {
      this.setCurrentFeature(featureId);
    }
  }

  getFeatures(): Feature[] {
    return this.navigationDataService.getFeatures();
  }

  getServicesForFeature(featureId: string): Service[] {
    return this.navigationDataService.getServicesForFeature(featureId);
  }
}
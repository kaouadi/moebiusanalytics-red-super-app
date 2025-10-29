import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NavigationState } from './navigation.state';

export const selectNavigationState = createFeatureSelector<NavigationState>('navigation');

export const selectDrawerOpen = createSelector(
  selectNavigationState,
  (state) => state.drawerOpen
);

export const selectCurrentFeature = createSelector(
  selectNavigationState,
  (state) => state.currentFeature
);

export const selectCurrentServices = createSelector(
  selectNavigationState,
  (state) => state.currentServices
);

// Selector pour récupérer le service par défaut
export const selectDefaultService = createSelector(
  selectCurrentServices,
  (services) => services.find(service => service.default === true)
);

// Selector pour récupérer l'URL du service par défaut
export const selectDefaultServiceUrl = createSelector(
  selectDefaultService,
  (service) => service?.route || null
);

// Selector combiné pour optimiser les performances
export const selectNavigationData = createSelector(
  selectDrawerOpen,
  selectCurrentFeature,
  selectCurrentServices,
  selectDefaultService,
  selectDefaultServiceUrl,
  (drawerOpen, currentFeature, currentServices, defaultService, defaultServiceUrl) => ({
    drawerOpen,
    currentFeature,
    currentServices,
    defaultService,
    defaultServiceUrl
  })
);
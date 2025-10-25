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

// Selector combiné pour optimiser les performances
export const selectNavigationData = createSelector(
  selectDrawerOpen,
  selectCurrentFeature,
  selectCurrentServices,
  (drawerOpen, currentFeature, currentServices) => ({
    drawerOpen,
    currentFeature,
    currentServices
  })
);
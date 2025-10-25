import { createReducer, on } from '@ngrx/store';
import { NavigationState, initialNavigationState } from './navigation.state';
import * as NavigationActions from './navigation.actions';

export const navigationReducer = createReducer(
  initialNavigationState,

  // Drawer
  on(NavigationActions.toggleDrawer, (state) => ({
    ...state,
    drawerOpen: !state.drawerOpen
  })),

  on(NavigationActions.openDrawer, (state) => ({
    ...state,
    drawerOpen: true
  })),

  on(NavigationActions.closeDrawer, (state) => ({
    ...state,
    drawerOpen: false
  })),

  // Feature
  on(NavigationActions.setCurrentFeatureSuccess, (state, { feature, services }) => ({
    ...state,
    currentFeature: feature,
    currentServices: services
  }))
);
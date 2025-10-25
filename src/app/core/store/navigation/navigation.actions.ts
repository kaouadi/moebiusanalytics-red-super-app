import { createAction, props } from '@ngrx/store';
import { Feature, Service } from '../../models/feature.model';

// Drawer Actions
export const toggleDrawer = createAction('[Navigation] Toggle Drawer');
export const openDrawer = createAction('[Navigation] Open Drawer');
export const closeDrawer = createAction('[Navigation] Close Drawer');

// Feature Actions
export const setCurrentFeature = createAction(
  '[Navigation] Set Current Feature',
  props<{ featureId: string }>()
);

export const setCurrentFeatureSuccess = createAction(
  '[Navigation] Set Current Feature Success',
  props<{ feature: Feature; services: Service[] }>()
);

export const setCurrentFeatureFailure = createAction(
  '[Navigation] Set Current Feature Failure',
  props<{ error: string }>()
);
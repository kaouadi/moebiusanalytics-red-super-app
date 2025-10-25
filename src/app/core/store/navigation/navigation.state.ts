import { Feature, Service } from '../../models/feature.model';

export interface NavigationState {
  drawerOpen: boolean;
  currentFeature: Feature | null;
  currentServices: Service[];
}

export const initialNavigationState: NavigationState = {
  drawerOpen: false,
  currentFeature: null,
  currentServices: []
};
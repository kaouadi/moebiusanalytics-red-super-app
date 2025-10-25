import { Injectable } from '@angular/core';
import { FeatureConfig } from '../models/feature.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationDataService {
  
  private featuresConfig: FeatureConfig[] = [
    {
      feature: {
        id: 'documentation',
        name: 'Documentation',
        icon: 'description',
        route: '/documentation',
        description: 'Guides et références'
      },
      services: [
        { id: 'guides', name: 'Guides', icon: 'menu_book', route: '/documentation/guides' },
        { id: 'tutorials', name: 'Tutorials', icon: 'school', route: '/documentation/tutorials' },
      ]
    },
    {
      feature: {
        id: 'tests',
        name: 'Tests',
        icon: 'bug_report',
        route: '/tests',
        description: 'Gestion des tests'
      },
      services: [
        { id: 'run', name: 'Run Tests', icon: 'play_arrow', route: '/tests/run-tests' },
        { id: 'results', name: 'Results', icon: 'assessment', route: '/tests/results', badge: 3 },
      ]
    }
  ];

  getFeatures() {
    return this.featuresConfig.map(fc => fc.feature);
  }

  getFeatureConfig(featureId: string) {
    return this.featuresConfig.find(fc => fc.feature.id === featureId);
  }

  getServicesForFeature(featureId: string) {
    const config = this.getFeatureConfig(featureId);
    return config?.services || [];
  }
}
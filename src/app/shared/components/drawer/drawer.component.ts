import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from '../../../core/services/navigation.service';
import { Feature } from '../../../core/models/feature.model';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  
  // Observables pour le template
  drawerOpen$: Observable<boolean>;
  currentFeature$: Observable<Feature | null>;
  
  // Liste des features à afficher
  features: Feature[] = [];

  constructor(
    public navService: NavigationService,
    private router: Router
  ) {
    // Initialiser les observables
    this.drawerOpen$ = this.navService.drawerOpen$;
    this.currentFeature$ = this.navService.currentFeature$;
  }

  ngOnInit(): void {
    // Récupérer la liste des features
    this.features = this.navService.getFeatures();
  }

  /**
   * Sélectionner une feature et naviguer vers sa route
   * @param route - La route de la feature
   */
  selectFeature(route: string): void {
    this.router.navigate([route]);
    this.navService.closeDrawer();
  }

  /**
   * Fermer le drawer
   */
  closeDrawer(): void {
    this.navService.closeDrawer();
  }
}
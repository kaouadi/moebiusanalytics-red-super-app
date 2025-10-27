// main-layout.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NavigationService } from '../../../core/services/navigation.service';
import { Feature } from '../../../core/models/feature.model';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  
  drawerOpen$: Observable<boolean>;
  currentFeature$: Observable<Feature | null>;

  constructor(
    public navService: NavigationService,
    private router: Router
  ) {
    this.drawerOpen$ = this.navService.drawerOpen$;
    this.currentFeature$ = this.navService.currentFeature$;

    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => {
        return event instanceof NavigationEnd;
      })
    ).subscribe((event: NavigationEnd) => {
      this.updateCurrentFeature(event.url);
    });
  }

  ngOnInit(): void {
    this.updateCurrentFeature(this.router.url);
  }

  private updateCurrentFeature(url: string): void {
    // Extraire le premier segment de l'URL
    const firstSegment = this.extractFirstSegment(url);
    
    if (firstSegment) {
      // Déléguer la logique au service
      this.navService.setCurrentFeatureByRoute(firstSegment);
    }
  }

  /**
   * Extrait le premier segment de l'URL
   * Exemples:
   * - '/documentation/guides' -> 'documentation'
   * - '/tests/run' -> 'tests'
   * - '/dashboard' -> 'dashboard'
   */
  private extractFirstSegment(url: string): string {
    // Retirer les query params et fragments
    const cleanUrl = url.split('?')[0].split('#')[0];
    
    // Extraire le premier segment
    const segments = cleanUrl.split('/').filter(segment => segment.length > 0);
    
    return segments[0] || '';
  }

  toggleDrawer(): void {
    this.navService.toggleDrawer();
  }
}
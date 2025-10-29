// main-layout.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent, RoutesRecognized } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
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
  defaultServiceUrl$: Observable<string | null>;

  constructor(
    public navService: NavigationService,
    private router: Router
  ) {
    this.drawerOpen$ = this.navService.drawerOpen$;
    this.currentFeature$ = this.navService.currentFeature$;
    this.defaultServiceUrl$ = this.navService.defaultServiceUrl$

    /*
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => {
        return event instanceof NavigationEnd;
      })
    ).subscribe((event: NavigationEnd) => {
      this.updateCurrentFeature(event.url);
    });

    */

    this.router.events
  .pipe(
    filter((event: RouterEvent) : event is RoutesRecognized  => {
      return event instanceof RoutesRecognized;
    })
  )
  .subscribe((event: RoutesRecognized) => {
    console.log('URL demandée:', event.url);                // '/'
    console.log('URL finale:', event.urlAfterRedirects);     // '/tests/dashboard'
    
    if (event.url !== event.urlAfterRedirects) {
      console.log('🔄 REDIRECTION DÉTECTÉE !');
    }
      this.updateCurrentFeature(event.urlAfterRedirects);
  });
  }

  ngOnInit(): void {
    //this.updateCurrentFeature(this.router.url);
  }

  private updateCurrentFeature(url: string): void {
    // Extraire le premier segment de l'URL

    const firstSegment = this.extractFirstSegment(url);

    console.log('firstSegment', firstSegment)
    console.log('url', url)

    
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

  private _checkIfDefaultServiceUrl(currentUrl: string): Observable<boolean> {
    return this.defaultServiceUrl$.pipe(
      take(1), // Prendre seulement la première valeur
      map(defaultUrl => {
        if (!defaultUrl) {
          console.log('⚠️ Aucun service par défaut défini');
          return false;
        }

        const isDefaultService = this._compareUrls(currentUrl, defaultUrl);
        
        console.log('Comparaison des URLs:');
        console.log('  - URL courante:', currentUrl);
        console.log('  - URL par défaut:', defaultUrl);
        console.log('  - Résultat:', isDefaultService ? '✅ MATCH' : '❌ NO MATCH');
        
        return isDefaultService;
      })
    );
  }
    private _compareUrls(url1: string, url2: string): boolean {
    const cleanUrl1 = this._cleanUrl(url1);
    const cleanUrl2 = this._cleanUrl(url2);
    
    return cleanUrl1 === cleanUrl2;
  }

  /**
   * Nettoie une URL en retirant query params, fragments et trailing slash
   */
  private _cleanUrl(url: string): string {
    let cleanUrl = url.split('?')[0].split('#')[0];
    
    if (cleanUrl.endsWith('/') && cleanUrl.length > 1) {
      cleanUrl = cleanUrl.slice(0, -1);
    }
    
    return cleanUrl;
  }
}
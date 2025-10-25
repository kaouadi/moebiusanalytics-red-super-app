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

    // ✅ SOLUTION 2 : Avec type guard complet
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
    if (url.includes('/documentation')) {
      this.navService.setCurrentFeature('documentation');
    } else if (url.includes('/tests')) {
      this.navService.setCurrentFeature('tests');
    }
  }

  toggleDrawer(): void {
    this.navService.toggleDrawer();
  }
}
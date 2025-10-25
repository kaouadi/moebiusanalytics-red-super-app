import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from '../../../core/services/navigation.service';
import { Service } from '../../../core/models/service.model';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss']
})
export class BottomNavigationComponent implements OnInit {
  
  // Observable des services de la feature courante
  currentServices$: Observable<Service[]>;

  constructor(
    public navService: NavigationService
  ) {
    // Initialiser l'observable
    this.currentServices$ = this.navService.currentServices$;
  }

  ngOnInit(): void {
    // Initialisation si nécessaire
  }
}
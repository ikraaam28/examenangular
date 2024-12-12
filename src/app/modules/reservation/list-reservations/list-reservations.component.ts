import { Component } from '@angular/core';
import { Menu } from 'src/app/models/Menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.css']
})
export class ListReservationsComponent {
  userId: number = 1;  // ID de l'utilisateur connecté
  reservations: Menu[] = [];  // Liste des menus réservés par l'utilisateur

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    // Récupérer les réservations de l'utilisateur
    this.menuService.getUserReservations(this.userId).subscribe({
      next: (menus) => {
        this.reservations = menus;  // Affecter les réservations
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des réservations :', err);
      }
    });
  }
}

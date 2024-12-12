import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/Menu';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  approvedMenus: Menu[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getApprovedMenus().subscribe({
      next: (menus) => {
        this.approvedMenus = menus;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des menus :', err);
      },
    });
  }
  reserve(menuId: number): void {
    const userId = 1; // Remplacez par l'ID de l'utilisateur connecté
    this.menuService.reserveMenu(menuId, userId).subscribe({
      next: () => {
        alert('Réservation réussie');
      },
      error: (err) => {
        console.error('Erreur de réservation:', err);
      },
    });
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/Menu';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css']
})
export class MenuDetailsComponent {
  menu!: Menu;
  newMark: number | null = null;  // Variable pour stocker la nouvelle note
  isError: boolean = false; // Variable pour gérer l'affichage du message d'erreur

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du menu depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');  // 'id' est une chaîne

    if (id) {
      this.menuService.getMenuById(id).subscribe({
        next: (menu) => {
          this.menu = menu;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du menu :', err);
        },
      });
    }
  }

  // Méthode pour valider la note
  validateNote(): void {
    if (this.newMark < 1 || this.newMark > 5 || isNaN(this.newMark)) {
      this.isError = true;  // Afficher le message d'erreur
    } else {
      this.isError = false;  // Cacher le message d'erreur
    }
  }

  // Méthode pour soumettre la note
  submitRating(): void {
    if (this.newMark !== null && !this.isError) {
      // Calcul de la nouvelle note en fonction de la formule
      let updatedMark: number;

      if (this.menu.mark === 0) {
        updatedMark = this.newMark;  // Si la note est 0, on met la note saisie
      } else {
        updatedMark = (this.menu.mark + this.newMark) / 2;  // Sinon, calcul de la moyenne
      }

      // Appeler le service pour mettre à jour la note
      this.menuService.updateMenuMark(this.menu.id, updatedMark).subscribe({
        next: () => {
          this.menu.mark = updatedMark;  // Mettre à jour la note affichée
          alert('Votre note a été enregistrée');
        },
        error: (err) => {
          console.error('Erreur lors de la soumission de la note :', err);
        },
      });
    } else {
      alert('Veuillez entrer une note valide entre 1 et 5.');
    }
  }
}

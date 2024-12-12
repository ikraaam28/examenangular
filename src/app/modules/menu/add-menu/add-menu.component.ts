import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menu } from 'src/app/models/Menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent {
  menuForm: FormGroup;

  constructor(private fb: FormBuilder, private menuService: MenuService) {
    this.menuForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image: ['']  // Vous pouvez ajouter un champ pour l'image si nécessaire
    });
  }

  onSubmit() {
    if (this.menuForm.valid) {
      const newMenu: Menu = {
        ...this.menuForm.value,
        approved: false,
        mark: 0,

        reservations: []
      };

      this.menuService.addMenu(newMenu).subscribe({
        next: (menu) => {
          console.log('Menu ajouté dans db.json :', menu);
          alert('Menu ajouté avec succès !');
          this.menuForm.reset();
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du menu :', err);
        },
      });
    }
  }
}

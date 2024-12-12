import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Menu } from '../models/Menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = 'http://localhost:3000/Menu'; // Notez que le chemin correspond à votre endpoint

  constructor(private http: HttpClient) {}

  addMenu(menu: Menu): Observable<Menu> {
    return this.generateUniqueId().pipe(
      map((newId) => {
        const newMenu = { ...menu, id: newId };  // Ajouter le nouvel ID au menu
        return newMenu;
      }),
      switchMap((newMenu) => this.http.post<Menu>(this.apiUrl, newMenu)) // Ajouter le menu dans db.json
    );
  }
  getApprovedMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}?approved=true`);
  }
  getMenuById(id: string): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiUrl}?id=${id}`).pipe(
      map(menus => menus[0])  // On s'assure de récupérer le premier menu qui correspond à l'ID
    );
  }
  reserveMenu(menuId: number, userId: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiUrl}/${menuId}`).pipe(
      // Ajouter l'ID de l'utilisateur aux réservations du menu
      switchMap((menu) => {
        if (!menu.reservations) {
          menu.reservations = [];
        }
        menu.reservations.push(userId);
        return this.http.put<Menu>(`${this.apiUrl}/${menuId}`, menu);
      })
    );
  }
  updateMenuMark(menuId: number, newMark: number): Observable<Menu> {
    return this.http.patch<Menu>(`${this.apiUrl}/${menuId}`, { mark: newMark });
  }
  getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl);
  }
  generateUniqueId(): Observable<string> {
    return this.getMenus().pipe(
      map((menus) => {
        // Récupérer le dernier ID et calculer le nouvel ID
        const lastId = menus.length > 0 ? Math.max(...menus.map((m) => m.id)) : 0;  // Utiliser le dernier ID
        const newId = (lastId + 1).toString();  // Convertir l'ID en chaîne
        return newId;  // Retourner le nouvel ID sous forme de chaîne
      })
    );
  }
  getUserReservations(userId: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl).pipe(
      map((menus) => {
        // Filtrer les menus où l'utilisateur est présent dans la liste des réservations
        return menus.filter(menu => menu.reservations.includes(userId));
      })
    );
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { MenuDetailsComponent } from './menu-details/menu-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'reservations', loadChildren: () => import('./modules/reservation/reservation.module').then(m => m.ReservationModule) },
  { path: 'menu/details/:id', component: MenuDetailsComponent },

  { path: 'menu', loadChildren: () => import('./modules/menu/menu.module').then(m => m.MenuModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

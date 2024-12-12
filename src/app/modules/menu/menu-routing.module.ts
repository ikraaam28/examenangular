import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuDetailsComponent } from 'src/app/menu-details/menu-details.component';
import { MenuComponent } from 'src/app/menu/menu.component';
import { AddMenuComponent } from './add-menu/add-menu.component';


const routes: Routes = [
  { path: '', component: AddMenuComponent },
  { path: 'details/:id', component: MenuDetailsComponent },
  { path: 'add', component: AddMenuComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }

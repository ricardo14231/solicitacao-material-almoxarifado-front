import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/main/home/home.component';
import { MainSectorComponent } from './components/crud-modules/sector/main/main-sector.component';
import { ListSectorComponent } from './components/crud-modules/sector/list-sector/list-sector.component';
import { FormSectorComponent } from './components/crud-modules/sector/form-sector/form-sector.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},  
  
  { path: 'home', component: HomeComponent },

  { path: 'homeSector', component: MainSectorComponent,
      children: [
        { path: 'list', component: ListSectorComponent },
        { path: 'new', component: FormSectorComponent },
        /*{ path: 'edit', component: FormUpdateCreatePavilionComponent }, */
      ]
  },

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

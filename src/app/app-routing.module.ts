import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/main/home/home.component';
import { MainSectorComponent } from './components/crud-modules/sector/main/main-sector.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},  
  { path: 'home', component: HomeComponent },

  { path: 'homeSector', component: MainSectorComponent,
      children: [
        { path: 'list', component: MainSectorComponent },
       /*  { path: 'new', component: FormUpdateCreatePavilionComponent },
        { path: 'edit', component: FormUpdateCreatePavilionComponent }, */
      ]
  },

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

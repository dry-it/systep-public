import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './pages/home/home-routing.module';

import { LoginComponent } from './pages/login/login.component';
import { AdminRoutingModule } from './admin/admin-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/start',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  }
  ,

  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    HomeRoutingModule,
    AdminRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

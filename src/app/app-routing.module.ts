import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './pages/home/home-routing.module';

import { LoginComponent } from './pages/login/login.component';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { LoadResourcesComponent } from './components/load-resources/load-resources.component';

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
    path: 'load',
    component: LoadResourcesComponent
  }
  ,

  {
    path: 'landing',
    component: LandingPageComponent
  },

  {
    path: 'resetpassword',
    component: PasswordRecoveryComponent
  },

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

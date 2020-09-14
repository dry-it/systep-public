import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';

import { LoginComponent } from './pages/login/login.component';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { ProtocolViewComponent } from './dryfix/protocol-view/protocol-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/start',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'protocol-viewer/:projectid/:protocolid',
    component: ProtocolViewComponent
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
    DetailRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

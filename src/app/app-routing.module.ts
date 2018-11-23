import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { SummaryComponent } from './summary/summary.component';
import { ContentComponent } from './content/content.component';
import { RequestedComponent } from './requested/requested.component';
import { HistorizationComponent } from './historization/historization.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
      children: [
        { path: 'content', component: ContentComponent, canActivate: [AuthGuard] },
        { path: 'requested', component: RequestedComponent, canActivate: [AuthGuard] },
        { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] },
        { path: 'history', component: HistorizationComponent, canActivate: [AuthGuard] },
        { path: '', redirectTo: 'content', pathMatch: 'prefix'},
      ]
  },
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' },
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';


const routes: Routes = [
  { path: 'home', component: ContentComponent,
      children: [
          // { path: 'events', component: EventsComponent },
          // { path: 'destinations', component: DestinationsComponent },
          // { path: 'destinations/new-destination', component: NewDestinationComponent },
      ]
  },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '/index' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

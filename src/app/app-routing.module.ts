import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {routesHospitalization} from './hospitalization/routes';
import {NotFoundComponent} from './pages/not-found/not-found.component';


const routes: Routes = [
  ...routesHospitalization,
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

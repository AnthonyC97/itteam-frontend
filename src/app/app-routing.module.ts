import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Components */
import { OffersComponent } from './pages/offers/offers.component';

const routes: Routes = [
  { path: 'offers', component: OffersComponent },
  { path: '**', redirectTo: '/offers', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewJoineeComponent } from './new-joinee/new-joinee.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ScannerComponent } from './scanner/scanner.component';
import { WebcamComponent } from './webcam/webcam.component';
import { GenerateCardComponent } from './generate-card/generate-card.component';

const routes: Routes = [
  { path: 'new-joinee', component: NewJoineeComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'scanner', component: ScannerComponent },
  { path: 'webcam', component: WebcamComponent },
  { path: 'idCard', component: GenerateCardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewJoineeComponent } from './new-joinee/new-joinee.component';
import { WebcamComponent } from './webcam/webcam.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ScannerComponent } from './scanner/scanner.component';
import { HeaderComponent } from './header/header.component';
import { GenerateCardComponent } from './generate-card/generate-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NewJoineeComponent,
    WebcamComponent,
    HomepageComponent,
    ScannerComponent,
    HeaderComponent,
    GenerateCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ZXingScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

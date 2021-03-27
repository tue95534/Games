import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlackjackComponent } from './blackjack/blackjack.component';
import { NavpaneComponent } from './navpane/navpane.component';

@NgModule({
  declarations: [
    AppComponent,
    BlackjackComponent,
    NavpaneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

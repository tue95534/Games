import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlackjackComponent } from './blackjack/blackjack.component';
import { MatchingpairsComponent } from './matchingpairs/matchingpairs.component';
import { TictactoeComponent } from './tictactoe/tictactoe.component';


@NgModule({
  declarations: [
    AppComponent,
    BlackjackComponent,
    routingComponents,
    MatchingpairsComponent,
    TictactoeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

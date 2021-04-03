import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlackjackComponent } from './blackjack/blackjack.component';
import { HomeComponent } from './home/home.component';
import { MatchingcardsComponent } from './matchingcards/matchingcards.component';
import { MatchingpairsComponent } from './matchingpairs/matchingpairs.component';
import { TictactoeComponent } from './tictactoe/tictactoe.component';

const routes: Routes = [
  {path: '', component: HomeComponent }, 
  {path: 'home', component: HomeComponent }, 
  {path: 'blackjack', component: BlackjackComponent},
  {path: 'matching', component: MatchingcardsComponent}, 
  {path: 'pairs', component: MatchingpairsComponent},
  {path: 'tictactoe', component: TictactoeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [HomeComponent, BlackjackComponent, MatchingcardsComponent, MatchingpairsComponent]

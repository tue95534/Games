import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Card } from './card';

@Component({
  selector: 'app-matchingcards',
  templateUrl: './matchingcards.component.html',
  styleUrls: ['./matchingcards.component.css']
})
export class MatchingcardsComponent implements OnInit {


  playerHand:{ rank: string; suit: string; value: number; }[] = [];
  computerHand:{ rank: string; suit: string; value: number; }[] = [];
  fieldHand:{ rank: string; suit: string; value: number; }[] = [];
  instructionDisplay:string = "";
  playerURLs:string[] = [];
  computerURLs:string[] = [];
  fieldURLs:string[] = [];
  playerScore:number = 0;
  computerScore:number = 0;
  deck:{ rank: string; suit: string; value: number; }[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
    this.playerHand = [];
    this.fieldHand = []
    this.computerHand = [];
    this.computerScore = 0;
    this.playerScore = 0;
    this.createDeck();
    this.shuffleDeck();
    this.initialDeal();
    this.generateURLS();
  }

  createDeck() {
    var suits = ["D", "H", "C", "S"];
    var faceCards = ["J", "Q", "K"];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 2; j < 11; j++) {
        var stringValue = j + "";
        var card = {
          rank: stringValue, 
          suit: suits[i], 
          value: j
        }
        this.deck.push(card);
      }
      for (let k = 0; k < 3; k++) {
        var card1 = {
          rank: faceCards[k], 
          suit: suits[i], 
          value: 10
        }
        this.deck.push(card1);
      }
      var card2 = {
        rank: "A", 
        suit: suits[i], 
        value: 1
      }
      this.deck.push(card2);
    }
  }

  shuffleDeck() {
    var copyDeck = [];
    for (let i = 52; i > 0; i--) {
      const randomNum = Math.floor(Math.random() * i);
      copyDeck.push(this.deck[randomNum]);
      this.deck.splice(randomNum, 1);
    }
    this.deck = copyDeck;
  }

  initialDeal() {
    for (let i = 0; i < 13; i++) {
      this.fieldHand.push(this.deck.pop()!);
    }
    for (let i = 0; i < 4; i++) {
      this.playerHand.push(this.deck.pop()!);
      this.computerHand.push(this.deck.pop()!);
    }
  }

  deal() {
    for (let i = 0; i < 4; i++) {
      this.playerHand.push(this.deck.pop()!);
      this.computerHand.push(this.deck.pop()!);
    }
  }

  public trackItem (item:any, index:any) {
    return `${item.id}-${index}`;
  }

  playCard(rank:string, suit:string) {
    var scoreToAdd = 0;

    if (rank == "J") {
      this.playerScore += this.fieldHand.length + 1;
      this.fieldHand = [];
      for (let i = this.playerHand.length - 1; i >= 0; i--) {
        if (this.playerHand[i].rank == rank && this.playerHand[i].suit == suit) {this.playerHand.splice(i, 1);}
      }
    }
    else {
      for (let i = this.fieldHand.length - 1; i >= 0; i--) {
        if (rank == this.fieldHand[i].rank) {
          this.fieldHand.splice(i, 1);
          scoreToAdd++;
        }
      }
    }

    if (scoreToAdd > 0) { 
      this.playerScore = this.playerScore + scoreToAdd + 1; 
      for (let j = this.playerHand.length - 1; j >= 0; j--) {
        if (this.playerHand[j].rank == rank && this.playerHand[j].suit == suit) {this.playerHand.splice(j, 1);}
      }
    }
    else {
      for (let j = this.playerHand.length - 1; j >= 0; j--) {
        if (this.playerHand[j].rank == rank && this.playerHand[j].suit == suit) {
          this.fieldHand.push(this.playerHand[j]);
          this.playerHand.splice(j, 1);
        }
      }
    }

    this.computerTurn();
    if (this.playerHand.length == 0) {
      if (this.deck.length >= 8) {
        this.deal();
      }
      else {
        var result = this.resultOfGame();
        this.instructionDisplay = "Game Over! " + result;
        setTimeout(() => {
          this.instructionDisplay = "";
        }, 4000);
      }
    }
  }

  computerTurn() {
    var played = false;
    var jackLoop = 0;
    while (jackLoop < this.computerHand.length && !played) {
      if (this.computerHand[jackLoop].rank == "J" && this.fieldHand.length > 3) {
        var url = `assets/images/${this.computerHand[jackLoop].rank}${this.computerHand[jackLoop].suit}.PNG`;
        this.computerURLs[jackLoop] = url;
        played = true;
        setTimeout(() => {
          this.computerHand.splice(jackLoop, 1);
          this.computerScore += this.fieldHand.length + 1;
          this.fieldHand = [];
          this.generateURLS();
        }, 1500);
      }
      jackLoop++;
    }
    var matchingLoop = 0;
    while (matchingLoop < this.computerHand.length && !played) {
      var found = -1;
      var scoreToAdd = 0;
      var fieldHandCopy: { rank: string; suit: string; value: number; }[] = [];
      for (let i = 0; i < this.fieldHand.length; i++) {
        fieldHandCopy.push(this.fieldHand[i]);
      }
      for (let j = this.fieldHand.length-1; j >= 0; j--) {
        if (this.computerHand[matchingLoop].rank == this.fieldHand[j].rank) {
          var url = `assets/images/${this.computerHand[matchingLoop].rank}${this.computerHand[matchingLoop].suit}.PNG`;
          console.log(2);
          this.computerURLs[matchingLoop] = url;
          fieldHandCopy.splice(j, 1);
          played = true;
          scoreToAdd++;
        }
      }
      if (played) {
        setTimeout(() => {
          this.computerHand.splice(matchingLoop, 1);
          this.fieldHand = fieldHandCopy;
          this.computerScore += scoreToAdd + 1;
          this.generateURLS();
        }, 1500);
      }
      else { matchingLoop++; }
    }
    if (!played) {
      this.computerURLs[0] = `assets/images/${this.computerHand[0].rank}${this.computerHand[0].suit}.PNG`;
      setTimeout(() => {
        if (this.computerHand[0].rank == "J") {
          this.computerScore += this.fieldHand.length + 1;
          this.computerHand.splice(0, 1);
          this.fieldHand = [];
          this.generateURLS();
        }
        else {
          this.fieldHand.push(this.computerHand[0]);
          this.computerHand.splice(0, 1);
          this.generateURLS();
        }
      }, 1500);
    }
  }

  resultOfGame():string {
    if (this.playerScore > this.computerScore) {
      return "YOU WON!";
    }
    else if (this.playerScore < this.computerScore) {
      return "YOU LOST!";
    }
    else {
      return "YOU TIED!";
    }
  }

  generateURLS() {
    this.computerURLs = [];
    for (let i = 0; i < this.computerHand.length; i++) {
      this.computerURLs.push("assets/images/CARDBACK.png")
    }
  }

  flipCard(index:number) {

  }
}
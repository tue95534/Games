import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matchingpairs',
  templateUrl: './matchingpairs.component.html',
  styleUrls: ['./matchingpairs.component.css']
})
export class MatchingpairsComponent implements OnInit {

  ngOnInit(): void {
  }

  deck: { rank:string, suit:string, index:number, url:string }[] = [];
  matchedCards: { rank:string, suit:string, index:number }[] = [];
  buttonsClicked: { rank:string, suit:string, index:number }[] = [];
  backgroundImages:string[] = ["assets/images/image1.jpeg", "assets/images/image2.jpeg", "assets/images/image3.jpeg"];
  backgroundImage:string = this.backgroundImages[0];
  current:number = 0;

  constructor() {
    this.createDeck(1);
    this.deck = this.shuffleDeck(this.deck);
    this.changeBackground();
  }

  changeBackground() {
    setInterval(() => {
      if (this.current > 2) {
        this.current = 0;
      }
      this.backgroundImage = this.backgroundImages[this.current];
      this.current++;
    }, 5000);
  }


  createDeck(numOfDecks:number) {
    for (let a = 0; a < numOfDecks; a++) {
      const suits = ["S", "H", "C", "D"];
      const faceCards = ["J", "Q", "K"];
      for (let i = 0; i < suits.length; i++) {
        for (let j = 2; j < 11; j++) {
          var stringJ = j + "";
          var card = {
            rank: stringJ, 
            suit: suits[i],
            index: j,
            url: "assets/images/CARDBACK.png"
          }
          this.deck.push(card);
        }
        for (let k = 0; k < faceCards.length; k++) {
          var card1 = {
            rank: faceCards[k], 
            suit: suits[i],
            index: 10,
            url: "assets/images/CARDBACK.png"
          }
          this.deck.push(card1);
        }
      }
    }
  }


  shuffleDeck(deck: any[]):{ rank:string, suit:string, index:number, url:string }[] {
    var copyDeck = [];
    const length = deck.length;
    for (let i = length; i > 0; i--) {
      const randomNum = Math.floor(Math.random() * i);
      copyDeck.push(deck[randomNum]);
      deck.splice(randomNum, 1);
    }
    for (let l = 0; l < copyDeck.length; l++) {
      copyDeck[l].index = l;
    }
    return copyDeck;
  }


  clicked(rank:string, suit:string, index:number) {
    if (this.checkIfValidClick(index) || this.buttonsClicked.length > 1) {
      return;
    }
    var buttonAdd = {
      rank: rank, 
      suit: suit, 
      index: index
    };
    this.buttonsClicked.push(buttonAdd);

    if (this.buttonsClicked.length == 1) {
      this.deck[this.buttonsClicked[this.buttonsClicked.length-1].index].url = `assets/images/${rank}${suit}.PNG`;
    }

    if (this.buttonsClicked.length == 2) {
      this.deck[this.buttonsClicked[1].index].url = `assets/images/${rank}${suit}.PNG`;

      setTimeout(() => {
        const match = this.checkIfMatch();
        if (match) {
          for (let i = 0; i < this.buttonsClicked.length; i++) {
            this.matchedCards.push(this.buttonsClicked[i]);
          }
          this.buttonsClicked = [];
        }
        else {
          console.log("worked");
          this.deck[this.buttonsClicked[0].index].url = "assets/images/CARDBACK.png";
          this.deck[this.buttonsClicked[1].index].url = "assets/images/CARDBACK.png";
          this.buttonsClicked = [];
        }
      }, 1200);
    }
  }


  checkIfMatch():boolean {
    if (this.buttonsClicked[0].rank == this.buttonsClicked[1].rank) {
      return true;
    }
    else {
      return false;
    }
  }

  checkIfValidClick(index: number):boolean {
    var notValid = false;
    for (let i = 0; i < this.matchedCards.length; i++) {
      if (this.matchedCards[i].index == index) {
        notValid = true;
      }
    }
    return notValid;
  }


  public trackItem (item: any, index: any) {
    return `${item.id}-${index}`;
  }

}

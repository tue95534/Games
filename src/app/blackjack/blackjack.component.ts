import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})
export class BlackjackComponent implements OnInit {

  deck:string[] = [];
  playerHand:string[] = [];
  computerHand:string[] = [];
  wager:number = 0;
  instructionDisplay:string = "";
  numOf500s:number = 8;
  numOf100s:number = 9;
  numOf10s:number = 9;
  numOf1s:number = 10;
  playerBank:number = this.numOf500s*500 + this.numOf100s*100 + this.numOf10s*10 + this.numOf1s*1; 
  playerTurnScore:number = 0;
  computerTurnScore:number = 0;
  oneMessage = "1";
  tenMessage = "10";
  oneHundredMessage = "100";
  fiveHundredMessage = "500";
  playerURLs:string[] = [];
  computerURLs:string[] = [];
  wagePlaced:boolean = false;

  constructor() {
    this.createDeck();
    this.instructionDisplay = "PLACE A WAGER!";
   }

  ngOnInit(): void {
  }

  startGame() {
    this.instructionDisplay = "PLACE A WAGER!";
    this.playerHand = [];
    this.computerHand = [];
    this.playerURLs = [];
    this.computerURLs= [];
    this.createDeck();
    this.initialDeal();
  }

  createDeck() {
    for (let i = 2; i < 11; i++) {
      this.deck.push(i + "H" + i);
      this.deck.push(i + "S" + i);
      this.deck.push(i + "C" + i);
      this.deck.push(i + "D" + i);
    }
    const remaining = ["A", "J", "Q", "K"];
    const remainingValues = [1, 10, 10, 10];
    for (let i = 0; i < 4; i++) {
      this.deck.push(remaining[i] + "H" + remainingValues[i]);
      this.deck.push(remaining[i] + "S" + remainingValues[i]);
      this.deck.push(remaining[i] + "C" + remainingValues[i]);
      this.deck.push(remaining[i] + "D" + remainingValues[i]);
    }
    this.shuffleDeck();
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

  wagerPlaced() {
    if (this.wagePlaced == false && this.wager > 0) {
      this.computerHand.push(this.deck.pop()!);
      this.playerHand.push(this.deck.pop()!);
      this.computerHand.push(this.deck.pop()!);
      this.playerHand.push(this.deck.pop()!);
      this.imgURLGenerator();
      this.imgURLCompGenerator();
      this.wagePlaced = true;
    }
    else if (this.wagePlaced == false && this.wager == 0) {
      this.instructionDisplay = "YOU MUST PLACE A WAGER FIRST!";
    }
  }

  initialDeal() {
    this.computerHand.push(this.deck[0]);
    this.playerHand.push(this.deck[1]);
    this.computerHand.push(this.deck[2]);
    this.playerHand.push(this.deck[3]);
    this.deck.splice(0, 4);
    this.imgURLGenerator();
    this.imgURLCompGenerator();
    this.instructionDisplay = "PLACE YOUR WAGER!";
  }

  wager500() {
    if (!this.wagePlaced) {
      if (this.numOf500s > 0) {
        this.numOf500s--;
        this.wager = this.wager + 500;
      }
      if (this.numOf500s == 0) {
        this.fiveHundredMessage = "Empty";
      }
    }
  }

  wager100() {
    if (!this.wagePlaced) {
      if (this.numOf100s > 0) {
        this.numOf100s--;
        this.wager = this.wager + 100;
      }
      if (this.numOf100s == 0) {
        this.oneHundredMessage = "Empty";
      }
    }
  }

  wager10() {
    if (!this.wagePlaced) {
      if (this.numOf10s > 0) {
        this.numOf10s--;
        this.wager = this.wager + 10;
      }
      if (this.numOf10s == 0) {
        this.tenMessage = "Empty";
      }
    }
  }

  wager1() {
    if (!this.wagePlaced) {
      if (this.numOf1s > 0) {
        this.numOf1s--;
        this.wager = this.wager + 1;
      }
      if (this.numOf1s == 0) {
        this.oneMessage = "Empty";
      }
    }
  }

  checkIfOver(hand: string[]):boolean {
    const total = this.checkScore(hand);
    if (total > 50) {return true;}
    else {return false;}
  }

  lostTurn() {
    this.instructionDisplay = "YOU LOST THIS TURN!";
    this.wager = 0;
    this.playerHand.splice(0, this.playerHand.length);
    this.computerHand.splice(0, this.computerHand.length);
    this.wagePlaced = false;
  }

  wonTurn() {
    this.instructionDisplay = "YOU WON THIS TURN!";
    var num500s = Math.floor(this.wager/500)*2;
    this.numOf500s = this.numOf500s + num500s;
    this.wager = this.wager - num500s*250;
    var num100s = Math.floor(this.wager/100)*2;
    this.numOf100s = this.numOf100s + num100s;
    this.wager = this.wager - num100s*50;
    var num10s = Math.floor(this.wager/10)*2;
    this.numOf10s = this.numOf10s + num10s;
    this.wager = this.wager - num10s*5;
    var num1s = Math.floor(this.wager/1)*2;
    this.numOf1s = this.numOf1s + num1s;
    this.wager = this.wager - num1s*0.5;

    this.wagePlaced = false;
    this.playerHand.splice(0, this.playerHand.length);
    this.computerHand.splice(0, this.computerHand.length);
  }

  tieTurn() {
    this.instructionDisplay = "DRAW THIS TURN!";
    var num500s = Math.floor(this.wager/500);
    this.numOf500s = this.numOf500s + num500s;
    this.wager = this.wager - num500s*500;
    var num100s = Math.floor(this.wager/100);
    this.numOf100s = this.numOf100s + num100s;
    this.wager = this.wager - num100s*100;
    var num10s = Math.floor(this.wager/10);
    this.numOf10s = this.numOf10s + num10s;
    this.wager = this.wager - num10s*10;
    var num1s = Math.floor(this.wager/1);
    this.numOf1s = this.numOf1s + num1s;
    this.wager = this.wager - num1s*1;

    this.wagePlaced = false;
    this.playerHand.splice(0, this.playerHand.length);
    this.computerHand.splice(0, this.computerHand.length);
  }

  wantsCard() {
    if (this.wagePlaced) {
      this.playerHand.push(this.deck.pop()!);
      this.imgURLGenerator();
      if (this.checkIfOver(this.playerHand)) {
        this.instructionDisplay = "YOU LOST THIS TURN!";
        this.lostTurn();
      }
    }
    else {
      this.instructionDisplay = "YOU MUST PLACE A WAGER FIRST";
    }
  }

  get playerCards() {
    return this.playerHand;
  }

  get computerCards() {
    return this.computerHand;
  }

  stay() {
    if (this.wagePlaced) {
      this.computerTurn();
      if (this.checkIfOver(this.computerHand)) {
        this.wonTurn();
      }
      else if (this.checkScore(this.playerHand) > this.checkScore(this.computerHand)) {
        this.wonTurn();
      }
      else if (this.checkScore(this.playerHand) < this.checkScore(this.computerHand)) {
        this.lostTurn();
      }
      else {
        this.tieTurn();
      } 
    }
  }

  checkScore(hand: string | any[]):number {
    var total = 0;
    for (let i = 0; i < hand.length; i++) {
      if (hand[i].length == 3) {
        var numToAdd = parseInt(hand[i].charAt(2));
        total = total + numToAdd;
      }
      else if (hand[i].length == 4) {
        var numToAdd = parseInt(hand[i].charAt(2) + hand[i].charAt(3));
        total = total + numToAdd;
      }
      else {
        var numToAdd = parseInt(hand[i].charAt(3) + hand[i].charAt(4));
        total = total + numToAdd;
      }
    }
    return total;
  }

  computerTurn() {
    while (this.checkScore(this.computerHand) < this.checkScore(this.playerHand) && !this.checkIfOver(this.computerHand)) {
      this.computerHand.push(this.deck.pop()!);
      this.imgURLCompGenerator();
    }
  }

  public trackItem (item: any, index: any) {
    return `${item.id}-${index}`;
  }

  imgURLGenerator() {
    this.playerURLs = [];
    for(let i = 0; i < this.playerHand.length; i++) {
      if (this.playerHand[i].length < 5) {
        this.playerURLs.push("assets/images/" + this.playerHand[i].charAt(0) + this.playerHand[i].charAt(1) + ".PNG");
      }
      else {
        this.playerURLs.push("assets/images/" +  this.playerHand[i].charAt(0) + this.playerHand[i].charAt(1) + this.playerHand[i].charAt(2) + ".PNG");
      }
    }
  }

  imgURLCompGenerator() {
    this.computerURLs = [];
    for(let i = 0; i < this.computerHand.length; i++) {
      if (this.computerHand[i].length < 5) {
        this.computerURLs.push("assets/images/" + this.computerHand[i].charAt(0) + this.computerHand[i].charAt(1) + ".PNG");
      }
      else {
        this.computerURLs.push("assets/images/" +  this.computerHand[i].charAt(0) + this.computerHand[i].charAt(1) + this.computerHand[i].charAt(2) + ".PNG");
      }
    }
  }

}

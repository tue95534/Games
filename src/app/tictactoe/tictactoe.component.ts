import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements OnInit {

  board: string[] = ["_","_","_","_","_","_","_","_","_"];
  winCombos: string[] = ["012", "345", "678", "036", "147", "258", "246", "048"];
  wins:number = 0;
  losses:number = 0;
  ties:number = 0;
  result:string = "";
  nametoAdd:string = "";
  topScoresNames: string[] = [];
  topScores: number[] = [];
  corners: number[] = [0, 2, 6, 8];

  constructor() { 
    this.sortScores(); 
   }

   ngOnInit(): void {
    var random_boolean = Math.random() < 0.5;
    if (random_boolean) {
      this.board[4] = "O";
    }
  }

  getName(val: any) {
   this.nametoAdd = val.fname;
   this.addScore(this.nametoAdd, this.wins, this.losses, this.ties);
   this.sortScores();
  }

  async fetchScore(playerId: number) {
    const response = await fetch(`http://localhost:3003/entries/${playerId}`);
    const json = await response.json();
    console.log(json);
    return json;
  }

  async sortScores() {
    const response = await fetch(`http://localhost:3003/sort/`);
    const json = await response.json();
    var topScoresNew: any[] = [];
    var topScoresNameNew: any[] = [];
    
    var count = 0;
    json.forEach(function(item: any) {
      if (count < 3) {
        topScoresNameNew.push(item.playerName);
        topScoresNew.push(item.wins);
        topScoresNew.push(item.losses);
        topScoresNew.push(item.ties);
        count++;
      }
    })
    this.topScores = topScoresNew;
    this.topScoresNames = topScoresNameNew;
    return json;
  }

  
  addScore = (playerName: string, winsP: number, lossesP: number, tiesP: number) => {
    console.log(playerName);
    fetch(`http://localhost:3003/insert/${playerName}/${winsP}/${lossesP}/${tiesP}`)
      .then(response => {
        console.log(response);
      })
  }

  btnClicked(btn:number) {
    var played = false;
    if (this.board[btn] == "_") {
      this.board[btn] = "X";
      played = true;
    }
    if (this.win() && played) {
      this.wins++;
      console.log("you win");
    }
    else if (played) {
      if (this.computerPlay("O")) {
        this.losses++;
      }
      else {
        if (this.tie()) {
          this.ties++;
        }
        else {
          if (this.computerPlay("X")) {
            return;
          }
          if (this.specialMoves()) {
            return;
          }
          if (this.board[4] == "_") {
            this.board[4] = "O";
            return;
          }
          for (let i = 0; i < this.corners.length; i++) {
            if (this.board[this.corners[i]] == "_") {
              this.board[this.corners[i]] = "O";
              return;
            }
          }
          for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] == "_") {
              this.board[i] = "O";
              break;
            }
          }
        }
      }
    }
  }

  lose() {
    for (let i=0; i < this.winCombos.length; i++) {
      let count = 0;
      for (let j=0; j < this.winCombos[i].length; j++) {
        let winNum: number = +this.winCombos[i][j];
        if (this.board[winNum] == "O") {
          count++;
        }
      }
      if (count == 3) {
        this.clearSpaces();
        this.result = "YOU LOST!";
        return true;
      }
    }
    return false;
  }

  tie() {
    var count = 0;
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] == "_") {
        count++;
        break;
      }
    }
    if (count > 0) {
      return false;
    }
    else {
      this.clearSpaces();
      this.result = "YOU TIED!";
      return true;
    }
  }

  clearSpaces() {
    for (let i=0; i < this.board.length; i++) {
      if (this.board[i] == "_") {
        this.board[i] = " ";
      }
    }
  }

  win() {
    for (let i=0; i < this.winCombos.length; i++) {
      let count = 0;
      for (let j=0; j < this.winCombos[i].length; j++) {
        let winNum: number = +this.winCombos[i][j];
        if (this.board[winNum] == "X") {
          count++;
        }
      }
      if (count == 3) {
        this.clearSpaces();
        this.result = "YOU WON!";
        return true;
      }
    }
    return false;
  }

  computerPlay(letter:string):boolean {
    var won = false;
    for (let i=0; i < this.winCombos.length; i++) {
      let word = "";
      for (let j=0; j < this.winCombos[i].length; j++) {
        let winNum: number = +this.winCombos[i][j];
        word = word + this.board[winNum];
      }
      console.log(word);
      let changeNum = 0; 
      if (word == letter+letter+"_") {
        changeNum = +this.winCombos[i][2];
        console.log(changeNum);
        won = true;
      }
      if (word == letter+"_"+letter){
        changeNum = +this.winCombos[i][1];
        console.log(changeNum);
        won = true;
      }
      if (word == "_"+letter+letter){
        changeNum = +this.winCombos[i][0];
        console.log(changeNum);
        won = true;
      }
      if (won && letter == "O") {
        this.board[changeNum] = "O";
        this.result = "YOU LOST!";
        this.clearSpaces();
        return true;
      }
      else if (won && letter == "X") {
        this.board[changeNum] = "O";
        return true;
      }
    }
    return false;
  }

  specialMoves():boolean {
    if (this.board[2] == "X" && this.board[6] == "X") {
      if (this.board[0] == "_" && this.board[1] == "_" && this.board[7] == "_") {
        this.board[1] = "O";
        return true;
      }
    }
    if (this.board[0] == "X" && this.board[8] == "X") {
      if (this.board[3] == "_" && this.board[6] == "_" && this.board[7] == "_") {
        this.board[7] = "O";
        return true;
      }
    }
    if (this.board[3] == "X" && this.board[8] == "X") {
      if (this.board[0] == "_" && this.board[6] == "_" && this.board[7] == "_") {
        this.board[7] = "O";
        return true;
      }
    }
    return false;
  }

  clearBoard() {
    for (let i=0; i < this.board.length; i++) {
      this.board[i] = "_";
    }
    this.result = "";
  }

  clearScore() {
    this.wins = 0;
    this.ties = 0;
    this.losses = 0;
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  backgroundImages:string[] = ["assets/images/image1.jpeg", "assets/images/image2.jpeg", "assets/images/image3.jpeg"];
  backgroundImage:string = this.backgroundImages[0];
  current:number = 0;

  constructor() { }

  ngOnInit(): void {
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

}

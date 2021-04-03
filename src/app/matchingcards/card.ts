import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class Card {
    rank:string | undefined;
    suit:string | undefined;
    value:number | undefined;
  }
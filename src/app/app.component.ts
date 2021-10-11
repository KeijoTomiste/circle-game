import { Component, OnInit } from '@angular/core';
import { Circle } from "./models/circle";
import { GameField } from "./models/gameField";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public playField: Circle[][] = [];

  private readonly gameField: GameField;

  constructor() {
    this.gameField = new GameField();
  }

  public ngOnInit(): void {
    this.playField = this.gameField.getPlayField();
  }

  public increaseCircleValue(circle: Circle) {
    this.gameField.increaseCircleValue(circle);
  }
}

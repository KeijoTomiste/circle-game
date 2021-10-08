import { Component, OnInit } from '@angular/core';
import { Circle } from "./models/circle";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public readonly playField: Circle[][] = [];
  private readonly layers = 4;
  private readonly maxValue = 6;
  private readonly shuffleTime = 1;

  public ngOnInit(): void {
    this.generatePlayField();
    this.populateSiblings();
    // TODO: this should prolly be game controls
    this.shuffleValues();
  }

  public increaseCircleValue(circle: Circle) {
    circle.increaseValue();
    circle.getSiblingNodes().forEach((sibling) => sibling.increaseValue());
  }

  private generatePlayField() {
    const layerListLength = this.layers * 2 - 1;

    for (let i = 0; i < layerListLength; i++) {
      const layer: Circle[] = [];
      let elementCount = this.layers;

      if (i < layerListLength / 2) {
        elementCount += i;
      } else {
        elementCount += layerListLength - i - 1;
      }

      for (let j = 0; j < elementCount; j++) {
        layer.push(
          new Circle(
            [i, j],
            1,
            this.maxValue,
          ),
        );
      }

      this.playField.push(layer);
    }

  }

  private populateSiblings() {
    for (let i = 0; i < this.playField.length; i++) {
      const row = this.playField[i];
      for (let j = 0; j < row.length; j++) {
        const currentCircle = row[j];

        // set following circle
        if (row[j + 1]) {
          const nextCircle = row[j + 1];
          currentCircle.setSiblingNode(nextCircle);
          nextCircle.setSiblingNode(currentCircle);
        }

        // if has next row
        if (this.playField[i + 1]) {
          const nextRow = this.playField[i + 1];

          // set next row current index
          if (nextRow[j]) {
            const nextRowCircle = nextRow[j];

            currentCircle.setSiblingNode(nextRowCircle);
            nextRowCircle.setSiblingNode(currentCircle);
          }

          // set next row next index if longer list
          if (nextRow.length > row.length) {
            if (nextRow[j + 1]) {
              const nextRowNextCircle = nextRow[j + 1];

              currentCircle.setSiblingNode(nextRowNextCircle);
              nextRowNextCircle.setSiblingNode(currentCircle);
            }
          } else {
            // set next row previous index if shorter list
            if (nextRow[j - 1]) {
              const nextRowNextCircle = nextRow[j - 1];

              currentCircle.setSiblingNode(nextRowNextCircle);
              nextRowNextCircle.setSiblingNode(currentCircle);
            }
          }
        }
      }
    }
  }

  private shuffleValues() {
    const endDate = new Date();
    endDate.setSeconds(endDate.getSeconds() + this.shuffleTime);
    while (new Date() < endDate) {
      const randomRowIndex = Math.floor(Math.random() * this.playField.length);
      const randomItemIndex = Math.floor(Math.random() * this.playField[randomRowIndex].length);

      this.increaseCircleValue(
        this.playField[randomRowIndex][randomItemIndex],
      );
    }
  }
}

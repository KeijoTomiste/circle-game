import { BehaviorSubject } from "rxjs";

export class Circle {
  private id: [number, number];
  private readonly value: BehaviorSubject<number>;
  private readonly maxValue: number;
  private siblingNodes = new Set<Circle>();

  constructor(id: [number, number], value: number, maxValue: number) {
    this.id = id;
    this.value = new BehaviorSubject(value);
    this.maxValue = maxValue;
  }

  public setSiblingNode(node: Circle) {
    this.siblingNodes.add(node);
  }

  public getValue() {
    return this.value;
  }

  public increaseValue() {
    let newValue = this.value.getValue() + 1;

    if (newValue > this.maxValue) {
      newValue = 1;
    }

    this.value.next(newValue);
  }

  public getSiblingNodes() {
    return this.siblingNodes;
  }
}

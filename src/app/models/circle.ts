
export class Circle {
  private id: [number, number];
  private value: number;
  private maxValue: number;
  private siblingNodes = new Set<Circle>();

  constructor(id: [number, number], value: number, maxValue: number) {
    this.id = id;
    this.value = value;
    this.maxValue = maxValue;
  }

  public setSiblingNode(node: Circle) {
    this.siblingNodes.add(node);
  }

  public getValue() {
    return this.value;
  }

  public increaseValue() {
    let newValue = this.value + 1;

    if (newValue > this.maxValue) {
      newValue = 1;
    }

    this.value = newValue;
  }

  public getSiblingNodes() {
    return this.siblingNodes;
  }
}

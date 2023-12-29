const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { outResult, outDebug } = require('../../utils/output');

class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
  }

  getPoints() {
    const smallestX = Math.min(this.x1, this.x2);
    const largestX = Math.max(this.x1, this.x2);
    const smallestY = Math.min(this.y1, this.y2);
    const largestY = Math.max(this.y1, this.y2);
    const points = [];

    if (this.x1 === this.x2) {
      // Horizontal
      for (let i = smallestY; i <= largestY; i++) {
        points.push(`${this.x1}:${i}`);
      }
    } else if (this.y1 === this.y2) {
      // Vertical
      for (let i = smallestX; i <= largestX; i++) {
        points.push(`${i}:${this.y1}`);
      }
    } else if (this.x1 === smallestX && this.y1 === smallestY) {
      // right-bottom diagonal
      let tempY = smallestY;

      for (let tempX = smallestX; tempX <= largestX; tempX++) {
        points.push(`${tempX}:${tempY++}`);
      }
    } else if (this.x2 === smallestX && this.y1 === smallestY) {
      // left-bottom diagonal
      let tempY = smallestY;

      for (let tempX = largestX; tempX >= smallestX; tempX--) {
        points.push(`${tempX}:${tempY++}`);
      }
    } else if (this.x2 === smallestX && this.y2 === smallestY) {
      // left-top diagonal
      let tempY = largestY;

      for (let tempX = largestX; tempX >= smallestX; tempX--) {
        points.push(`${tempX}:${tempY--}`);
      }
    } else if (this.x1 === smallestX && this.y2 === smallestY) {
      // right-top diagonal
      let tempY = largestY;

      for (let tempX = smallestX; tempX <= largestX; tempX++) {
        points.push(`${tempX}:${tempY--}`);
      }
    }

    return points;
  }
}

const lines = strToLines(getInput());
const activePoints = new Set();
const intersectPoints = new Set();

const addPoint = (point) => {
  if (activePoints.has(point) && !intersectPoints.has(point)) {
    intersectPoints.add(point);
  } else {
    activePoints.add(point);
  }
};

lines.forEach((line) => {
  const [startCoords, endCoords] = line.split(' -> ');
  const [x1, y1] = startCoords.split(',').map((coord) => parseInt(coord, 10));
  const [x2, y2] = endCoords.split(',').map((coord) => parseInt(coord, 10));
  const vector = new Line(x1, y1, x2, y2);

  vector.getPoints().forEach((point) => addPoint(point));
});

outResult(intersectPoints.size);

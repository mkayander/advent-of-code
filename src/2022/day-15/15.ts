type Location = { x: number; y: number };
type Sensor = {
  location: Location;
  target: Location;
  distance: number;
  bounds: Bounds;
};
type Bounds = {
  x: { min: number; max: number };
  y: { min: number; max: number };
};

class Solution {
  sensors: Sensor[] = [];
  grid: Record<number, Record<number, string>> = {};
  bounds: Bounds = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
  maxDistance = 0;

  constructor(input: string) {
    this.sensors = input.split('\n').map((line) => {
      const [[, x, y], [, bx, by]] = line.matchAll(/x=(-?\d+), y=(-?\d+)/g);

      const location = { x: Number(x), y: Number(y) };
      const target = { x: Number(bx), y: Number(by) };

      const distance = this.getDistance(location, target);
      this.maxDistance = Math.max(this.maxDistance, distance);

      const bounds = this.getSensorRangeBounds(location, distance);
      this.updateBoundsByRange(bounds);

      return {
        location,
        target,
        distance,
        bounds,
      };
    });
  }

  updateBounds(location: Location) {
    if (location.x < this.bounds.x.min) {
      this.bounds.x.min = location.x;
    } else if (location.x > this.bounds.x.max) {
      this.bounds.x.max = location.x;
    }

    if (location.y < this.bounds.y.min) {
      this.bounds.y.min = location.y;
    } else if (location.y > this.bounds.y.max) {
      this.bounds.y.max = location.y;
    }
  }

  updateBoundsByRange(bounds: Bounds) {
    this.updateBounds({ x: bounds.x.min, y: bounds.y.min });
    this.updateBounds({ x: bounds.x.max, y: bounds.y.max });
  }

  ensureElementExists(location: Location, value = '.') {
    if (!this.grid[location.y]) {
      this.grid[location.y] = {};
    }

    if (!this.grid[location.y][location.x]) {
      this.grid[location.y][location.x] = value;
    }

    this.updateBounds(location);
  }

  getDistance(location: Location, target: Location) {
    return Math.abs(location.x - target.x) + Math.abs(location.y - target.y);
  }

  fillInGaps() {
    for (let x = this.bounds.x.min; x <= this.bounds.x.max; x++) {
      for (let y = this.bounds.y.min; y <= this.bounds.y.max; y++) {
        this.ensureElementExists({ x, y });
      }
    }
  }

  generateGrid() {
    this.sensors.forEach((sensor) => {
      this.ensureElementExists(sensor.location, 'S');
      this.ensureElementExists(sensor.target, 'B');
    });

    // this.fillInGaps();
  }

  isInSensorsRange(sensor: Sensor, location: Location) {
    // console.log(sensor, location);
    return this.getDistance(sensor.location, location) <= sensor.distance;
  }

  getSensorRangeBounds(location: Location, distance: number): Bounds;
  getSensorRangeBounds(sensor: Sensor): Bounds;
  getSensorRangeBounds(input: Sensor | Location, distance?: number): Bounds {
    let location: Location | null = null;

    if ('distance' in input) {
      distance = input.distance;
      location = input.location;
    } else {
      location = input;
    }

    if (distance === undefined) throw new Error('Distance is undefined.');
    if (!location) throw new Error('Location is undefined');

    const { x, y } = location;

    return {
      x: { min: x - distance, max: x + distance },
      y: { min: y - distance, max: y + distance },
    };
  }

  getSensorsInRangeByY(y: number) {
    return this.sensors.filter((sensor) => {
      return y >= sensor.bounds.y.min && y <= sensor.bounds.y.max;
    });
  }

  getSensorsInBounds(bounds: Bounds) {
    return this.sensors.filter((sensor) => {
      return (
        sensor.bounds.x.min >= bounds.x.min &&
        sensor.bounds.x.max <= bounds.x.max &&
        sensor.bounds.y.min >= bounds.y.min &&
        sensor.bounds.y.max <= bounds.y.max
      );
    });
  }

  getSensorsThatIntersectBounds(bounds: Bounds) {
    return this.sensors.filter((sensor) => {
      return (
        sensor.bounds.x.min <= bounds.x.max &&
        sensor.bounds.x.max >= bounds.x.min &&
        sensor.bounds.y.min <= bounds.y.max &&
        sensor.bounds.y.max >= bounds.y.min
      );
    });
  }

  getEffectiveRange(sensor: Sensor, pos: Location): number {
    return Math.max(
      sensor.distance - this.getDistance(sensor.location, pos),
      0
    );
  }

  getMaxEffectiveRangeFromSensors(pos: Location): number {
    let max = 0;

    this.sensors.forEach((sensor) => {
      max = Math.max(max, this.getEffectiveRange(sensor, pos));
    });

    return max;
  }

  // Part 2
  getFreeSpot(bounds: Bounds) {
    const sensors = this.getSensorsThatIntersectBounds(bounds);

    console.log(sensors.length);

    for (let y = bounds.y.min; y <= bounds.y.max; y++) {
      for (let x = bounds.x.min; x <= bounds.x.max; x++) {
        const location = { x, y };

        if (
          sensors.every((sensor) => !this.isInSensorsRange(sensor, location))
        ) {
          return location;
        }

        const effectiveRange = this.getMaxEffectiveRangeFromSensors(location);

        x += effectiveRange;
      }
    }

    return null;
  }

  getGridString() {
    let gridString = '';

    for (let y = this.bounds.y.min; y <= this.bounds.y.max; y++) {
      for (let x = this.bounds.x.min; x <= this.bounds.x.max; x++) {
        gridString += this.grid[y]?.[x] || ' ';
      }
    }

    return gridString;
  }
}

export const beaconExclusionZone = (input: string) => {
  const solution = new Solution(input);

  solution.generateGrid();

  console.log(solution.sensors);
  console.log(solution.grid);

  const targetLine = 2000000;
  const targetSensors = solution.getSensorsInRangeByY(targetLine);

  let observedLocationsCount = 0;

  for (let x = solution.bounds.x.min; x <= solution.bounds.x.max; x++) {
    const location = { x, y: targetLine };

    if (solution.grid[targetLine][x]) continue;

    const sensorsInRange = targetSensors.filter((sensor) =>
      solution.isInSensorsRange(sensor, location)
    );

    if (sensorsInRange.length > 0) {
      observedLocationsCount++;
    }
  }

  console.log(solution.sensors.length, targetSensors.length);

  console.log('observedLocationsCount: ', observedLocationsCount); // Part 1 answer

  // Part 2

  const searchRange: Bounds = {
    x: { min: 0, max: 4000000 },
    y: { min: 0, max: 4000000 },
  };

  const freeSpot = solution.getFreeSpot(searchRange);

  console.log('freeSpot: ', freeSpot);

  if (!freeSpot) return null;

  return freeSpot.x * 4000000 + freeSpot.y; // Part 2 answer
};

console.time('beaconExclusionZone');
console.log(
  beaconExclusionZone(await Deno.readTextFile('./src/2022/day-15/input-15.txt'))
);
console.timeEnd('beaconExclusionZone');

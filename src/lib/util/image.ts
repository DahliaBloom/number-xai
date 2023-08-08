import { pixelToVec, type Vec } from "./math";

export function getImageValues(points: Vec[]): number[] {
  let values = new Array(28 ** 2).fill(0);

  for (const point of points) {
    const { x, y } = point;

    values = values.map((value, n) => {
      const tile = pixelToVec(n);

      const dist = Math.hypot(tile.x - x, tile.y - y);

      let penValue = 0.8 - (dist / 2) ** 2;
      penValue = Math.min(Math.max(0, penValue), 1);
      return value + (1 - value) * penValue;
    });
  }

  return values;
}

export function normalizeParams(image: number[]): {
  scale: number;
  center: Vec;
} {
  let left = Infinity;
  let right = -Infinity;
  let top = Infinity;
  let bottom = -Infinity;

  let centerX = 0;
  let centerY = 0;
  let totalValue = 0;

  for (let n = 0; n < image.length; n++) {
    const x = n % 28;
    const y = Math.floor(n / 28);
    const value = image[n];

    centerX += x * value;
    centerY += y * value;
    totalValue += value;

    if (value > 0.05) {
      left = Math.min(left, x);
      right = Math.max(right, x);
      top = Math.min(top, y);
      bottom = Math.max(bottom, y);
    }
  }

  centerX /= totalValue;
  centerY /= totalValue;

  const width = right - left;
  const height = bottom - top;
  const scale = 20 / Math.max(width, height);

  return { scale, center: { x: centerX, y: centerY } };
}

export function normalizeTransformation(
  points: Vec[],
  scale: number,
  center: Vec,
  time = 1
): Vec[] {
  return points.map((point) => {
    let { x, y } = point;

    x -= center.x;
    y -= center.y;

    x *= scale;
    y *= scale;

    x += 14;
    y += 14;

    return {
      ...point,
      x: point.x + (x - point.x) * time,
      y: point.y + (y - point.y) * time,
    };
  });
}

export function center(image: number[], points: Vec[]): Vec[] {
  const { scale, center } = normalizeParams(image);
  return normalizeTransformation(points, scale, center);
}

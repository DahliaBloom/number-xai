export type Position = {
  x: number;
  y: number;
};

export function getAbsolutePosition(element: HTMLElement): Position {
  let clientRect = element.getBoundingClientRect();
  return {
    x: clientRect.left + document.body.scrollLeft,
    y: clientRect.top + document.body.scrollTop,
  };
}

export const getX = (p: number) => p % 28;
export const getY = (p: number) => Math.floor(p / 28);

export const toPosition = (p: number): Position => {
  return {
    x: getX(p),
    y: getY(p),
  };
};

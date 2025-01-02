export function generateNewId<T extends object>(
  arr: T[],
  getId?: (obj: T) => number
) {
  getId = getId ?? ((obj: any) => +obj.id);
  return (Math.max(...arr.map(getId)) + 1).toString();
}

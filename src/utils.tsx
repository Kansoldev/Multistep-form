export function capitalizeFirstLetter(value: string) {
  return value.substring(0, 1).toUpperCase() + value.substring(1);
}

export function findArrayIndex(arrayItem, item2: { name: string }) {
  return arrayItem.findIndex((item) => item.name === item2.name);
}

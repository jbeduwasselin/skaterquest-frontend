export function addToSet(list, element) {
  return Array.from(new Set([...list, element]));
}

export function removeFromSet(list, element) {
  return list.filter((e) => e != element);
}

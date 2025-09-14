export function capitalize(value: string) {
  if (!value || value.length === 0) return '';

  return `${value[0].toUpperCase()}${value.slice(1)}`;
}
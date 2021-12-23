// Acorta el nombre de los archivos largos, y al final le añade la extension del archivo
// Ej: superlargoarchivo...jpg
export const shortName = (text, max=15) => {
  return text.substr(0, max) + '...' + text.split('.').pop()
}

// Acorta el nombre de los archivos largos, y al final le añade la extension del archivo
// Ej: superlargoarchivo...jpg
export const shortName = (text, max = 15) => {
  return text.substr(0, max) + '...' + text.split('.').pop()
}

export const stringToColor = (string) => {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.substr(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

export const stringAvatar = (name, sx) => {
  return {
    sx: {
      ...sx,
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`.toUpperCase(),
  }
}

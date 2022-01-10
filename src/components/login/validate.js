export default function validate(values, name) {
  let errors = {}
  if (name === 'user') {
    if (!values.user) {
      errors.user = 'Usuario o mail requerido'
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.user)) {
      errors.user = `Must be a valid email`
    }
  } else {
    if (!values.password) {
      errors.password = 'Password requerido'
    }
  }
  return errors
}

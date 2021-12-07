export default function Validate(values) {
    let errors = {}
    if (!values.user) {
      errors.user = 'Usuario o mail requerido'
    }
    if (!values.password) {
      errors.password = 'Password requerido'
    }
    return errors
}

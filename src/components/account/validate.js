const PASSWORD_MUST_MATCH = 'Las contraseñas deben coincidir'

export default function validate(inputs, error) {
  let errors = { ...error }
  if (
    (inputs['password'] || inputs['repeatPassword']) &&
    inputs['password'] !== inputs['repeatPassword']
  ) {
    errors['password'] = PASSWORD_MUST_MATCH
    errors['repeatPassword'] = PASSWORD_MUST_MATCH
  } else {
    errors = {}
  }

  return errors
}

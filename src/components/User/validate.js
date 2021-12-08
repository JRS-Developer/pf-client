export default function validate(input, name, error) {
  let errors = { ...error };
  if (name === "firstName" || name === "lastName" || name === "country") {
    if (!input[name]) {
      errors[name] = `This field is required`;
    } else if (!/^[a-zA-Z À-ÿ\u00f1\u00d1]+$/.test(input[name])) {
      errors[name] = `This field can only contain letters`;
    } else {
      delete errors[name];
    }
  } else if (name === "email") {
    if (!input[name]) {
      errors[name] = `This field is required`;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input[name])){
      errors[name] = `Must be a valid email`;
    } else {
      delete errors[name];
    }
  } else if (name === "role" || name === "birthday"){
    if (!input[name]) {
      errors[name] = `This field is required`;
    } else{
      delete errors[name];
    }
  } else if (name === "id"){
    if (!input[name]) {
      errors[name] = `This field is required`;
    } else if (!/^[0-9]+$/.test(input[name])){
      errors[name] = `This field can only contain numbers`;
    } else {
      delete errors[name];
    }
  }
  return errors;
}
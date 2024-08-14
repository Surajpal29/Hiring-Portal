const validate = (required_fields, input_fields) => {
  let errors = {};
  required_fields.forEach((field) => {
    if (!input_fields[field]) {
      errors[field] = `${field} is required`;
    }
  });
  return errors;
};

export default validate;

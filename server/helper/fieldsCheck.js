const validate = (required_fields, data) => {
  const error = {};

  for (let i of required_fields) {
    if (!data[i]) {
      error[i] = `${i} is required`;
    }
  }

  return error;
};

export default validate;

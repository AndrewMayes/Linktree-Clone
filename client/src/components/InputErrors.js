const inputErrors = values => {
  let errors = {};

  const names = Object.keys(values);

  names.map(name => {
    switch (name) {
      case 'username':
        if (!values.username) {
        errors.username = "Required username";
        };
        break;
      case 'email':
        if (!values.email) {
          errors.email = "Required Email";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = "Invalid email address";
        }
        break;
      case 'password':
        if (!values.password) {
          errors.password = "Required Password";
        } else if (values.password.length < 6) {
          errors.password = "Password must be at least 6 characters";
        }
        break;
    }
  });

  return errors;
}

export default inputErrors;
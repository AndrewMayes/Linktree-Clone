const inputErrors = values => {
  let errors = {};

  const names = Object.keys(values);

  names.forEach(name => {
    switch (name) {
      case 'username':
        if (!values.username) {
        errors.username = "Required username.";
        };
        break;
      case 'email':
        if (!values.email) {
          errors.email = "Required Email.";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = "Invalid email address.";
        }
        break;
      case 'password':
        if (!values.password) {
          errors.password = "Required Password.";
        } else if (values.password.length < 6) {
          errors.password = "Password must be at least 6 characters.";
        }
        break;
      case 'url':
        if (!values.url) {
          errors.url = "Required URL.";
        } else if (!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(values.url)) {
          errors.url = "Invalid URL.";
        }
        break;
      case 'linkTitle':
        if (!values.linkTitle) {
          errors.linkTitle = "Required Title.";
        }
        break;
      default:
        break;
    }
  });

  return errors;
}

export default inputErrors;
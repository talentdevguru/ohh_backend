const isEmail = email => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = string => {
  if (string.trim() === "") return true;
  else return false;
};

exports.validateSignupData = data => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }
  if (isEmpty(data.password)) errors.password = "Must not be empty";
  if (isEmpty(data.firstname)) errors.firstname = "Must not be empty";
  if (isEmpty(data.lastname)) errors.lastname = "Must not be empty";
  if (isEmpty(data.phone_number)) errors.phone_number = "Must not be empty";
  if (isEmpty(data.address)) errors.address = "Must not be empty";
  if (isEmpty(data.city)) errors.city = "Must not be empty";
  if (isEmpty(data.country)) errors.country = "Must not be empty";
  if (isEmpty(data.postal_code)) errors.postal_code = "Must not be empty";
  if (isEmpty(data.state)) errors.state = "Must not be empty";
  if (isEmpty(data.birthday)) errors.birthday = "Must not be empty";
  if (isEmpty(data.story1)) errors.story1 = "Must not be empty";
  if (isEmpty(data.story2)) errors.story2 = "Must not be empty";
  if (isEmpty(data.story3)) errors.story3 = "Must not be empty";
  if (isEmpty(data.representation)) errors.representation = "Must not be empty";
  if (isEmpty(data.metric)) errors.metric = "Must not be empty";
  if (isEmpty(data.bust)) errors.bust = "Must not be empty";
  if (isEmpty(data.height)) errors.height = "Must not be empty";
  if (isEmpty(data.eye)) errors.eye = "Must not be empty";
  if (isEmpty(data.waist)) errors.waist = "Must not be empty";
  if (isEmpty(data.shoe)) errors.shoe = "Must not be empty";
  if (isEmpty(data.cup)) errors.cup = "Must not be empty";
  if (isEmpty(data.hip)) errors.hip = "Must not be empty";
  if (isEmpty(data.hair)) errors.hair = "Must not be empty";

  return {
    errors,

    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateLoginData = data => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }
  if (isEmpty(data.password)) errors.password = "Must not be empty";

  return {
    errors,

    valid: Object.keys(errors).length === 0 ? true : false
  };
};

export const translateErrorMessage = msg => {
  let text;

  switch (true) {
    case msg === "EMAIL_EXISTS":
      text = "This email is occupied";
      break;
    case msg.startsWith("WEAK_PASSWORD"):
      text = "Password should be at least 6 characters";
      break;
    case msg === "INVALID_PASSWORD":
      text = "Password is incorrect";
      break;
    case msg === "EMAIL_NOT_FOUND":
      text = "Email is not found";
      break;
    default:
      text = msg;
  }

  return text;
};

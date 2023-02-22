module.exports.getRandomPassword = (length = 8, input = "alpha-numeric") => {
  var alphabet = "abcdefghijklmnopqrstuvwxyz";
  var password = "";
  if (input == "alpha") {
    alphabet = "abcdefghijklmnopqrstuvwxyz";
  } else if (input == "alpha-caps") {
    alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  } else if (input == "alpha-numeric") {
    alphabet = "abcdefghijklmnopqrstuvwxyz1234567890";
  } else if (input == "alpha-numeric-caps") {
    alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  } else if (input == "alpha-numeric-symbols") {
    alphabet = "abcdefghijklmnopqrstuvwxyz1234567890~!@#$%^&*()_+-=";
  } else if (input == "alpha-numeric-caps-symbols") {
    alphabet =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^&*()_+-=";
  }
  var alphabet_length = alphabet.length - 1;
  for (var i = 0; i < length; i++) {
    var random_number = Math.floor(Math.random() * alphabet_length) + 1;
    password += alphabet[random_number];
  }
  return password;
};

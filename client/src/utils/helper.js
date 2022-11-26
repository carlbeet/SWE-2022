
const validate = (validation, error) => data =>
validation(data) ? true : error;

const validateUsername = validate(regexValidation, 
    errorInvalidCharacters);
const validatePassword = validate(passwordValidation, errorPasswordLength)

//validateUsername(details.name)
//validateUsername(details.email)
//validateUsername(details.password)
//validatePassword(details.password)


passwordValidation = data => data && data.length > 8
regexValidation = data => data && data.match(/^[0-9a-zA-Z@.!]{1,32}$/) //limits input to alphanumeric characters and length 1-32

errorLogin = "Either your email or password is incorrect";
errorInvalidCharacters = "Data includes invalid characters. Please enter alphanumeric characters and @ . !";
errorPasswordLength = "Please enter a password with at least 8 characters";
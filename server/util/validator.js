
const isStrongPassword = (password) => {
    const isLongEnough = password.length >= 7;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    const hasSpecialCharacters = /[\!\@\#\$\%\^\&\*\(\)_\+\-\=\{\}\[\]:;"'\<\>\?\/\|,]/g.test(password);
    return isLongEnough && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialCharacters;
};

const isUsernameValid = (userName) => {
    const doesNotContainSpaces = !userName.includes(' ');
    const doesNotStartWithNumber = !/^\d/.test(userName);

    return doesNotContainSpaces && doesNotStartWithNumber;
};

const isValiduserData = (userData) => {
    if (!isUsernameValid(userData.userName)) return [false, 'User name should start with a letter and should not contain spaces or numbers'];
    if (!isStrongPassword(userData.password)) return [false, 'Password should be at least  8 characters long and contain a mix of upper  '];

    return [true, "valid data"];
}
module.exports = { isValiduserData }
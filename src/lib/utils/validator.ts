const mobileNumberValidatorRegex = /^[0-9]*$/; // NOSONAR
const nameValidatorRegex = /^[a-zA-Z]{1}[a-zA-Z \\s]*$/; // NOSONAR
const emailValidatorRegex =
  /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/; // NOSONAR

export { emailValidatorRegex, mobileNumberValidatorRegex, nameValidatorRegex };

export const validatePhoneNumber = (phoneNumber) => {
  if (!(/^((1[3-9][0-9])+\d{8})$/.test(phoneNumber))) {
    return false;
  }
  return true;
};

export const validateVerifyCode = (verifyCode) => {
  if (verifyCode.length !== 6) {
    return false;
  }
  return true;
};

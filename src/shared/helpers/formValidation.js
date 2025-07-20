export const isEmail = (mail) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail);

export const isMobile = (number) => /^[6-9]\d{9}$/.test(number);

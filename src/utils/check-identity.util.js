import createError from "./create-error.util.js";

export default function (identity) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identity);
  const mobileRegex = /^[0-9]{10,15}$/.test(identity);

  let identityKey = '';
  if (emailRegex) return identityKey = 'email';
  if (mobileRegex) return identityKey = 'mobile';

  if(!identityKey)createError(400, 'identity only accept Email or Mobile phone');

  // Oneliner cool code
  // return emailRegex ? 'email' : mobileRegex ? 'mobile' : null
}
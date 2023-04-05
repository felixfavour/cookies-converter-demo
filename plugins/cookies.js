import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export default () => {
  const inSixHours = 0.25
  const config = useRuntimeConfig();
  const cookiesFunc = Cookies.withAttributes({
    secure: true,
    sameSite: 'Strict',
    expires: inSixHours
  }).withConverter({
    read: function (value) {
      const decryptedValue = CryptoJS.AES.decrypt(
        value,
        config.public.encKey
      ).toString(CryptoJS.enc.Utf8);
      return decryptedValue;
    },
    write: function (value) {
      const encryptedValue = CryptoJS.AES.encrypt(
        value,
        config.public.encKey
      ).toString();
      return encryptedValue;
    },
  });
  return cookiesFunc;
};

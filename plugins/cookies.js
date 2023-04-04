import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export default () => {
  const config = useRuntimeConfig();
  const cookies = Cookies.withConverter({
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
  return cookies;
};

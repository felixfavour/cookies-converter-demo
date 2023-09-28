import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

export default () => {
  const inSixHours = 0.25
  const cookies = Cookies.withAttributes({
    secure: true,
    sameSite: 'Strict',
    expires: inSixHours
  }).withConverter({
    read (value) {
      const decryptedValue = CryptoJS.AES.decrypt(
        value,
        process.env.ENC_KEY
      ).toString(CryptoJS.enc.Utf8)
      return decryptedValue
    },
    write (value) {
      const encryptedValue = CryptoJS.AES.encrypt(
        value,
        process.env.ENC_KEY
      ).toString()
      return encryptedValue
    }
  })
  return cookies
}

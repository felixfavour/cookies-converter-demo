<template>
  <div class="cookies-home">
    <div class="inner">
      <h1>Cookies Converter Demo</h1>
      <h3>Submit to store cookie</h3>
      <form @submit.prevent>
        <label for="word">
          Phrase/Word
          <input v-model="word" type="text" id="word">
        </label>
        <button :disabled="!(word.length > 1)" type="submit" @click="submit">
          Submit
        </button>
      </form>
      <hr style="margin-top: 2rem">
      <h3>My previously saved cookies</h3>
      <div>
        <b>Phrase/Word: </b>
        <span>{{ cookies.get('word') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Cookies from 'js-cookie'
  import CryptoJS from 'crypto-js'

  const word = ref('')
  const config = useRuntimeConfig()

  const cookies = Cookies.withConverter({
    read: function(value) {
      console.log(value)
      const decryptedValue = CryptoJS.AES.decrypt(value, config.public.encKey).toString(CryptoJS.enc.Utf8)
      console.log('DECRYPTED', decryptedValue);
      return decryptedValue
    },
    write: function (value) {
      console.log(value)
      const encryptedValue = CryptoJS.AES.encrypt(value, config.public.encKey).toString()
      console.log('ENCRYPTED', encryptedValue);
      return encryptedValue
    }
  })

  const submit = () => {
    alert('Cookie Stored')
    cookies.set('word', word.value)
  }
</script>

<style scoped>
  
  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
  }
  .cookies-home {
    display: grid;
    place-items: center;
  }
  .cookies-home .inner {
    max-width: 400px;
  }
</style>
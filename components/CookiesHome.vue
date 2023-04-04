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
        <button :disabled="!(email.length > 4 && password.length > 1)" type="submit" @click="submit">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
  import Cookies from 'js-cookie'
  import CryptoJS from 'crypto-js'

  const word = ref('')
  const password = ref('')
  const config = useRuntimeConfig()

  const submit = () => {
    alert('Cookie Stored')
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
<template>
  <div class="cookies-home">
    <div class="inner">
      <h1>Cookies Converter Demo</h1>
      <h3>Submit to store cookie</h3>
      <form @submit.prevent>
        <label for="word">
          Phrase/Word
          <input v-model="word" type="text" id="word" />
        </label>
        <button :disabled="!(word.length > 1)" type="submit" @click="submit">
          Submit
        </button>
      </form>
      <hr style="margin-top: 2rem" />
      <h3>My previously saved cookies</h3>
      <div>
        <b>Phrase/Word: </b>
        <span>{{ wordDecrypted }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import cookiesFunc from "~~/plugins/cookies"
const cookies = cookiesFunc()

const word = ref("")
const wordDecrypted = ref("")

const submit = () => {
  alert("Cookie Stored")
  cookies.set("word", word.value)
  wordDecrypted.value = cookies.get("word")
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

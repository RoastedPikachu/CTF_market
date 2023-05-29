<template>
  <div id="Cookie" v-if="isCookieOpen">
      <p>Мы используем файлы-cookie, чтобы пользоваться сайтом было удобно</p>

      <button @click="store.dispatch('changeIsCookieOpen')">Понятно</button>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import store from '@/store';

  const isCookieOpen = ref(store.state.isCookieOpen);

  watch(() => store.state.isCookieOpen, () => {
      isCookieOpen.value = store.state.isCookieOpen;
  })
</script>

<style lang="scss" scoped>
  #Cookie {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: 20px;
    left: 10%;
    padding: 5px 10px 5px 30px;
    width: calc(80% - 40px);
    height: 60px;
    background-color: #2c2d2d;
    border-radius: 35px;
    p {
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      font-family: 'DM Sans', sans-serif;
    }
    button {
      width: 180px;
      height: 50px;
      background-color: #42d4ba;
      border: none;
      border-radius: 30px;
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      font-family: 'DM Sans', sans-serif;
      outline: none;
      cursor: pointer;
    }
  }
</style>
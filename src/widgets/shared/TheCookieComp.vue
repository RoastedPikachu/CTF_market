<template>
  <div id="Cookie" v-if="isCookieOpen">
      <p>Мы используем файлы-cookie, чтобы пользоваться сайтом было удобно</p>

      <button @click="store.dispatch('changeIsCookieOpen')">Понятно</button>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import store from '@/store';

  const isCookieOpen = computed(() => store.state.isCookieOpen);
</script>

<style lang="scss" scoped>
  #Cookie {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: 20px;
    left: 10%;
    padding: 5px 17.5px 5px 30px;
    width: calc(80% - 47.5px);
    height: calc(70px - 3px);
    background-color: #2c2d2d;
    border: 1.5px solid #707070;
    border-radius: 45px;
    z-index: 20;
    p {
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      font-family: 'DM Sans', sans-serif;
    }
    button {
      width: 170px;
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
      transition: 250ms ease;
    }
    button:hover {
      background-color: rgba(46, 236, 197, 0.1);
      border: 1.5px solid #2eecc5;
      color: #42d4ba;
    }
  }

  @media(max-width: 480px) {
    #Cookie {
      justify-content: center;
      flex-wrap: wrap;
      bottom: 0;
      left: 0;
      padding: 15px 0;
      width: calc(100% - 3px);
      height: 130px;
      border-radius: 0;
      p {
        font-size: 20px;
        font-weight: 500;
        text-align: center;
      }
      button {
        width: 65%;
        height: 40px;
        font-size: 20px;
      }
    }
  }

  @media(max-width: 400px) {
    #Cookie {
      p {
        font-size: 18px;
      }
    }
  }

  @media(max-width: 360px) {
    #Cookie {
      p {
        font-size: 16px;
      }
    }
  }
</style>
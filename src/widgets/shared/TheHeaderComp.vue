<template>
  <header>
      <img src="" alt="Профиль" id="ProfileImg">
      <nav>
          <router-link to="/" class="route">Главная</router-link>
          <router-link to="/shopItems" class="route">Товары</router-link>
          <router-link to="/signIn" class="route">Вход</router-link>
          <router-link to="/token" class="route">Регистрация</router-link>
      </nav>
      <span>
          <img src="@/assets/shoppingCartIcon.svg" alt="Корзина">
          <p>{{ countOfPoints }}</p>
      </span>
  </header>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const countOfPoints = ref(0);
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 5%;
    width: 90%;
    height: 100px;
    #ProfileImg {
      width: 40px;
      height: 40px;
      background-color: #747474;
      border-radius: 10px;
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 40%;
      .route {
        color: #ffffff;
        font-size: 20px;
        font-weight: 700;
        font-family: 'DM Sans', sans-serif;
        text-decoration: none;
      }
    }
    span {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 5%;
      img {
        width: 40%;
        cursor: pointer;
      }
      p {
        margin-left: 10px;
        color: #ffffff;
        font-size: 24px;
        font-weight: 500;
        font-family: 'Montserrat', sans-serif;
      }
    }
  }
</style>
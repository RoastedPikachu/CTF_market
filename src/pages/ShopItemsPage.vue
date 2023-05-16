<template>
  <TheHeaderComp/>
  <main>
      <img src="@/assets/shopItemsLogo.svg" alt="CTFMarket. Летняя школа CTF 2023" id="ShopItemsLogo">
      <div id="ShopItemsNav">
          <button>
              <img src="@/assets/filterIcon.svg" alt="Фильтры">
              Фильтры
          </button>
          <p>Категория</p>
          <p>Размеры</p>
          <p>Цена</p>
      </div>
      <div id="ModalFilterWindow">

      </div>
      <section id="ShopItemsContainer">
          <div class="shopItem" v-for="shopItem of shopItems" :key="shopItem.id">
              <img src="" :alt="shopItem.title">
              <span>

              </span>
              <button>
                  Подробнее
                  <img src="@/assets/arrowRightIcon.svg" alt="Подробнее">
              </button>
          </div>
      </section>
  </main>
  <TheFooterComp/>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import TheHeaderComp from '@/widgets/shared/TheHeaderComp.vue';
  import TheFooterComp from '@/widgets/shared/TheFooterComp.vue';
</script>

<style lang="scss" scoped>
  main {
    margin: 0 10%;
    width: 80%;
    height: 1300px;
    #ShopItemsLogo {
      width: 50%;
      height: 150px;
    }
    #ShopItemsNav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 60%;
      height: 120px;
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        width: 195px;
        height: 60px;
        background-color: #42d4ba;
        border: none;
        border-radius: 25px;
        color: #ffffff;
        font-size: 24px;
        font-weight: 500;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        img {
          margin-right: 10px;
        }
      }
      p {
        color: #ffffff;
        font-size: 24px;
        font-weight: 500;
        font-family: 'DM Sans', sans-serif;
      }
      p:nth-child(2) {
        margin-left: -30px;
      }
    }
    #ModalFilterWindow {
      width: 100%;
      height: 350px;
      border: 3px solid #979797;
      border-radius: 25px;
    }
    #ShopItemsContainer {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 20px;
      padding: 20px 0;
      width: 100%;
      height: auto;
      min-height: 600px;
      .shopItem {

      }
    }
  }
</style>
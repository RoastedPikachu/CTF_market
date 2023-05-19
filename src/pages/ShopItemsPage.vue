<template>
  <TheHeaderComp/>
  <main>
      <img src="@/assets/shopItemsLogo.svg" alt="CTFMarket. Летняя школа CTF 2023" id="ShopItemsLogo">

      <div id="ShopItemsNav">
          <button>
              <img src="@/assets/filterIcon.svg" alt="Фильтры">
              Фильтры
          </button>

<!--          <p>Категория</p>-->

<!--          <p>Размеры</p>-->

<!--          <p>Цена</p>-->
      </div>

      <div id="ModalFilterWindow">

      </div>
      <section id="ShopItemsContainer">
          <div class="shopItem" v-for="shopItem of shopItems" :key="shopItem.id">
              <img src="@/assets/testShopItem.svg" :alt="shopItem.title" class="shopItemImage">

              <div>
                  <span>
                      <p>От {{ shopItem.price }}&#8381;</p>
                      <p>От {{ shopItem.deliveryTime }}</p>
                  </span>

                  <button>
                      Подробнее
                      <img src="@/assets/arrowRightIcon.svg" alt="Подробнее">
                  </button>
              </div>
          </div>
      </section>
  </main>
  <TheFooterComp/>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import TheHeaderComp from '@/widgets/shared/TheHeaderComp.vue';
  import TheFooterComp from '@/widgets/shared/TheFooterComp.vue';

  interface ShopItem {
      id: number,
      title: string,
      price: string,
      deliveryTime: string,
      image: string
  }

  const shopItems = ref([
      {
          id: 0,
          title: 'Футболочка',
          price: '10000',
          deliveryTime: '15 дней',
          image: ''
      },
      {
          id: 1,
          title: 'Футболочка',
          price: '10000',
          deliveryTime: '15 дней',
          image: ''
      },
      {
          id: 2,
          title: 'Футболочка',
          price: '10000',
          deliveryTime: '15 дней',
          image: ''
      },
      {
          id: 3,
          title: 'Футболочка',
          price: '10000',
          deliveryTime: '15 дней',
          image: ''
      }
  ] as ShopItem[]);
</script>

<style lang="scss" scoped>
  main {
    margin: 0 10%;
    width: 80%;
    min-height: 1300px;
    height: auto;
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
      align-items: center;
      flex-wrap: wrap;
      padding: 20px 0;
      width: 100%;
      height: auto;
      .shopItem {
          position: relative;
          margin-top: 20px;
          padding: 20px 20px;
          width: 320px;
          height: 420px;
          background: linear-gradient(168.64deg, #313134 9.31%, #292929 61.88%, #282828 111.76%);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 35px;
          .shopItemImage {
              width: 100%;
              height: 340px;
              background-color: #ffffff;
              border-radius: 30px;
          }
          div {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 20px;
              width: 100%;
              span {
                  display: flex;
                  align-items: center;
                  flex-wrap: wrap;
                  width: 40%;
                  height: 55px;
                  p {
                      font-weight: 500;
                      font-family: 'Ruberoid', sans-serif;
                  }
                  p:first-child {
                      color: #ffffff;
                      font-size: 22px;
                  }
                  p:last-child {
                      color: rgba(255, 255, 255, 0.4);
                      font-size: 16px;
                  }
              }
              button {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  padding-top: 2px;
                  width: 50%;
                  height: 50px;
                  background-color: rgba(46, 236, 197, 0.1);
                  border: 1.5px solid #2eecc5;
                  border-radius: 40px;
                  box-shadow: 0 0 38px rgba(46, 236, 197, 0.1);
                  color: #ffffff;
                  font-size: 16px;
                  font-weight: 500;
                  font-family: 'Ruberoid', sans-serif;
                  cursor: pointer;
                  img {
                      margin-left: 10px;
                      height: 14px;
                  }
              }
          }
      }
    }
  }
</style>
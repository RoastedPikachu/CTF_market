<template>
  <TheHeaderComp/>

  <main>
      <img src="@/assets/shopItemsLogo.svg" alt="CTFMarket. Летняя школа CTF 2023" id="ShopItemsLogo">

      <div id="ShopItemsNav">
          <button @click="isModalFilterActive = !isModalFilterActive">
              <img src="@/assets/filterIcon.svg" alt="Фильтры">
              Фильтры
          </button>

<!--          <p>Категория</p>-->

<!--          <p>Размеры</p>-->

<!--          <p>Цена</p>-->
      </div>

      <Transition>
          <div id="ModalFilterWindow" v-if="isModalFilterActive">
              <div id="ModalFilterWindow_Categories">
                  <p>Категория</p>

                  <span>
                  <p
                      v-for="category of categories"
                      :key="category.id"
                      :class="{ categoryActive: category.isActive }"
                      @click="category.isActive = !category.isActive"
                  >
                      {{ category.title }}
                  </p>
              </span>
              </div>

              <div id="ModalFilterWindow_Sizes">
                  <p>Размеры</p>

                  <div>
                      <button
                          v-for="size of sizes"
                          :key="size.id"
                          :class="{ active: size.isActive }"
                          @click="size.isActive = !size.isActive"
                      >
                          {{ size.prop }}
                      </button>
                  </div>
              </div>

              <div id="ModalFilterWindow_Price">
                  <p>Цена</p>

                  <div>
                      <input type="text" placeholder="Мин. цена" v-model="minPrice">

                      <input type="text" placeholder="Макс. цена" v-model="maxPrice">
                  </div>
              </div>

              <button id="ModalFilterWindow_Accept">Применить</button>

              <button id="ModalFilterWindow_Reset">Сбросить фильтры</button>
          </div>
      </Transition>

      <section id="ShopItemsContainer">
          <div class="shopItem" v-for="shopItem of shopItems" :key="shopItem.id">
              <img src="@/assets/testShopItem.svg" :alt="shopItem.title" class="shopItemImage">

              <div>
                  <span>
                      <p>От {{ shopItem.price }}&#8381;</p>
                      <p>От {{ shopItem.deliveryTime }}</p>
                  </span>

                  <button @click="addItemToShoppingCart(shopItem)">
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
  import store from '@/store';
  import TheHeaderComp from '@/widgets/shared/TheHeaderComp.vue';
  import TheFooterComp from '@/widgets/shared/TheFooterComp.vue';

  interface ShopItem {
      id: number,
      title: string,
      price: string,
      deliveryTime: string,
      image: string
  }

  interface Category {
      id: number,
      title: string,
      isActive: boolean,
  }

  interface Size {
      id: number,
      prop: string,
      isActive: boolean,
  }

  const isModalFilterActive = ref(false);
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
  const categories = ref([
      {
          id: 1,
          title: 'Кружки',
          isActive: false,
      },
      {
          id: 2,
          title: 'Футболки',
          isActive: false,
      },
      {
          id: 3,
          title: 'Толстовки',
          isActive: false,
      },
      {
          id: 4,
          title: 'Браслеты',
          isActive: false,
      },
  ] as Category[]);
  const sizes = ref([
      {
          id: 1,
          prop: 'XS',
          isActive: false,
      },
      {
          id: 2,
          prop: 'S',
          isActive: false,
      },
      {
          id: 3,
          prop: 'M',
          isActive: false,
      },
      {
          id: 4,
          prop: 'L',
          isActive: false,
      },
      {
          id: 5,
          prop: 'XL',
          isActive: false,
      },
  ] as Size[]);

  const minPrice = ref('');
  const maxPrice = ref('');

  const addItemToShoppingCart = (item:ShopItem) => {
      store.dispatch('addItemToShoppingCart', {
          id: item.id,
          image: item.image,
          title: item.title,
          cost: item.price,
          count: 1
      });
  }
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
    .v-enter-active,
    .v-leave-active {
        transition: 250ms ease;
    }
    .v-enter-from {
        margin-top: -20px;
        opacity: 0;
    }
    .v-enter-to {
        margin-top: 0px;
        opacity: 1;
    }
    .v-leave-from {
        margin-top: 0px;
        opacity: 1;
    }
    .v-leave-to {
        margin-top: -20px;
        opacity: 0;
    }
    #ModalFilterWindow {
        width: 100%;
        height: 500px;
        #ModalFilterWindow_Categories {
            height: 90px;
            p {
                color: #ffffff;
                font-size: 28px;
                font-weight: 500;
                font-family: 'DM Sans', sans-serif;
            }
            span {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 55%;
                height: 50px;
                p {
                    color: #7f7f7f;
                    font-size: 24px;
                    font-weight: 400;
                    cursor: pointer;
                    transition: 250ms ease;
                }
                .categoryActive {
                    padding: 5px 20px;
                    background-color: #42d4ba;
                    border-radius: 30px;
                    color: #ffffff;
                }
            }
        }
        #ModalFilterWindow_Sizes {
            margin-top: 15px;
            height: 130px;
            p {
                color: #ffffff;
                font-size: 28px;
                font-weight: 500;
                font-family: 'DM Sans', sans-serif;
            }
            div {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                margin-top: 15px;
                width: 27.5%;
                height: 80px;
                button {
                    display: flex;
                    align-items: center;
                    padding: 2px 15px 0px;
                    width: auto;
                    height: 50px;
                    background-color: #434343;
                    border: 1px solid #7f7f7f;
                    border-radius: 10px;
                    color: #ffffff;
                    font-size: 18px;
                    cursor: pointer;
                    transition: 400ms ease;
                }
                .active {
                    background-color: #42d4ba;
                    border: 1px solid #42d4ba;
                }
            }
        }
        #ModalFilterWindow_Price {
            height: 110px;
            p {
                color: #ffffff;
                font-size: 28px;
                font-weight: 500;
                font-family: 'DM Sans', sans-serif;
            }
            div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 15px;
                width: 37.5%;
                height: 50px;
                input {
                    padding: 0 15px;
                    height: 100%;
                    width: 40%;
                    background-color: #434343;
                    border: 1px solid #bababa;
                    border-radius: 15px;
                    color: #bababa;
                    font-size: 20px;
                    font-weight: 700;
                    outline: none;
                }
                ::placeholder {
                    color: #bababa;
                    font-size: 20px;
                    font-weight: 700;
                }
            }
        }
        #ModalFilterWindow_Accept {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 15px;
            width: 32.5%;
            height: 60px;
            background-color: #42d4ba;
            border: none;
            border-radius: 15px;
            color: #ffffff;
            font-size: 22px;
            font-weight: 700;
            font-family: 'DM Sans', sans-serif;
            cursor: pointer;
        }
        #ModalFilterWindow_Reset {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 15px;
            width: 32.5%;
            height: 60px;
            background-color: #434343;
            border: none;
            border-radius: 15px;
            color: #ffffff;
            font-size: 22px;
            font-weight: 700;
            font-family: 'DM Sans', sans-serif;
            cursor: pointer;
        }
    }
    #ShopItemsContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        margin-top: -20px;
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
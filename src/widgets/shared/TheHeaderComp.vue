<template>
  <header>
      <img src="@/assets/userAvatar.svg" alt="Профиль" id="ProfileImg" @click="isModalProfileActive = !isModalProfileActive">

      <div id="ModalProfileWindow" v-if="isModalProfileActive">
          <img src="@/assets/x-markIcon.png" alt="Закрыть">

          <div>
              <img src="@/assets/userAvatar.svg" alt="Профиль">

              <span>
                  <p></p>
                  <p></p>
              </span>
          </div>

          <div>
              <p>Почта</p>

              <p></p>
          </div>

          <button>Выйти из аккаунта</button>

          <span>
              <p>Баланс: </p>
              <p>{{ countOfPoints }}</p>
          </span>
      </div>

      <nav>
          <router-link :to="{ name: 'home', params: { token: route.params.token }}" class="route">Главная</router-link>
          <router-link :to="{ name: 'shopItems', params: { token: route.params.token }}" class="route">Товары</router-link>
          <router-link :to="{ name: 'signIn', params: { token: route.params.token }}" class="route">Вход</router-link>
          <router-link to="/registration" class="route">Регистрация</router-link>
      </nav>

      <span>
          <img src="@/assets/shoppingCartIcon.svg" alt="Корзина" @click="isModalShoppingCartActive = !isModalShoppingCartActive">

          <p>{{ countOfItemsInShoppingCart }}</p>
      </span>

      <div id="ModalShoppingCart" v-if="isModalShoppingCartActive">
          <span>
              <img src="@/assets/x-markIcon.png" alt="Назад" @click="isModalShoppingCartActive = !isModalShoppingCartActive">

              <p>Корзина</p>

              <img src="@/assets/binIcon.svg" alt="Очистить корзину" @click="clearShoppingCart()">
          </span>

          <div id="shoppingCartItemsWrapper">
              <div class="shoppingCartItem" v-for="shoppingCartItem of shoppingCartItems" :key="shoppingCartItem.id">
                  <img :src="shoppingCartItem.image" :alt="shoppingCartItem.title" class="shoppingCartItemImage">

                  <div class="shoppingCartItem_Right">
                  <span>
                      <p>{{ shoppingCartItem.title }}</p>

                      <p>{{ shoppingCartItem.cost }} баллов</p>
                  </span>

                      <div>
                      <span>
                          <button @click="decreaseShoppingCartItemCount(shoppingCartItem)">&mdash;</button>

                          <p>{{ shoppingCartItem.count }}</p>

                          <button @click="increaseShoppingCartItemCount(shoppingCartItem)">+</button>
                      </span>

                          <img src="@/assets/itemBinIcon.svg" alt="Удалить" @click="removeShoppingCartItem(shoppingCartItem.id)">
                      </div>
                  </div>
              </div>
          </div>

          <div id="ShoppingCart_Bottom">
              <span id="ShoppingCart_BottomBalance">
                  <p>Баланс</p>

                  <p>{{ balance }} баллов</p>
              </span>

              <span>
                  <p>К ОПЛАТЕ</p>

                  <p>{{ totalCost }}</p>
              </span>

              <input type="text" placeholder="Введите адрес" v-model="address">

              <button :class="{ active: isPointsEnough }">
                  Оплатить
                  <img src="@/assets/arrowRightIcon.svg" alt="Оплатить">
              </button>
          </div>
      </div>
  </header>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { ref, onMounted, watch } from 'vue';
  import store from '@/store';

  const route = useRoute();

  const isModalProfileActive = ref(false);
  const isModalShoppingCartActive = ref(false);
  const isPointsEnough = ref(false);
  const countOfPoints = ref(0);
  const countOfItemsInShoppingCart = ref(store.state.countOfItemsInShoppingCart);
  const shoppingCartItems = ref(store.state.shoppingCart);
  const balance = ref(30000);
  const totalCost = ref(0);
  const address = ref('');

  onMounted(() => {
      if(shoppingCartItems.value.length) {
          const accumArr = shoppingCartItems.value.map(item => +item.cost);
          totalCost.value = accumArr.reduce((accum, item) => accum += item);
      } else {
          totalCost.value = 0;
      }

      isPointsEnough.value = totalCost.value < balance.value;
  })

  watch(() => store.state.countOfItemsInShoppingCart, () => {
      countOfItemsInShoppingCart.value = store.state.countOfItemsInShoppingCart;
  });

  watch(() => store.state.shoppingCart, () => {
      shoppingCartItems.value = store.state.shoppingCart;

      if(shoppingCartItems.value.length) {
          const accumArr = shoppingCartItems.value.map(item => +item.cost);
          totalCost.value = accumArr.reduce((accum, item) => accum += item);
      } else {
          totalCost.value = 0;
      }

      isPointsEnough.value = totalCost.value < balance.value;
  }, {deep: true});

  const removeShoppingCartItem = (id:number) => {
      store.dispatch('removeItemFromShoppingCart', id);
  }

  const clearShoppingCart = () => {
      store.dispatch('clearShoppingCart');
  }

  const increaseShoppingCartItemCount = (item:any) => {
      item.count++;
      store.dispatch('changeItemFromShoppingCart', item);
  }

  const decreaseShoppingCartItemCount = (item:any) => {
      if(item.count > 1) {
          item.count--;
          store.dispatch('changeItemFromShoppingCart', item);
      } else {
          store.dispatch('removeItemFromShoppingCart', item.id);
      }
  }
</script>

<style lang="scss" scoped>
  header {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%;
    width: 90%;
    height: 100px;
    background-color: #1e1e1e;
    z-index: 10;
    #ProfileImg {
      width: 50px;
      height: 50px;
      background-color: #747474;
      border-radius: 50%;
      cursor: pointer;
    }
    #ModalProfileWindow {
        position: absolute;
        top: 25px;
        left: 5%;
        width: 300px;
        height: 350px;
        background-color: #1e1e1e;
        border: 2px solid #4b4b4b;
        border-radius: 20px;
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
        outline: none;
      }
    }
    span {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 60px;
      img {
        width: 32.5px;
        cursor: pointer;
      }
      p {
        margin-left: 15px;
        color: #ffffff;
        font-size: 24px;
        font-weight: 400;
        font-family: 'Montserrat', sans-serif;
      }
    }
    #ModalShoppingCart {
        position: absolute;
        top: 70px;
        right: 5%;
        padding: 20px 35px;
        width: 305px;
        height: 650px;
        background-color: #1e1e1e;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        z-index: 10;
        span {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 70px;
            img:first-child {
                width: 22px;
                height: 22px;
            }
            img:last-child {
                width: 26px;
            }
            p {
                color: #ffffff;
                font-size: 18px;
                font-weight: 700;
                font-family: 'Montserrat', 'sans-serif';
            }
        }
        #shoppingCartItemsWrapper {
            margin-top: 20px;
            width: 100%;
            height: auto;
            min-height: 350px;
            .shoppingCartItem {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 20px;
                width: 100%;
                height: 85px;
                .shoppingCartItemImage {
                    width: 85px;
                    height: 100%;
                    background-color: #ffffff;
                    border-radius: 10px;
                }
                .shoppingCartItem_Right {
                    width: 67.5%;
                    height: 100%;
                    span {
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        width: 100%;
                        height: 50%;
                        p {
                            margin-left: 0;
                            width: 100%;
                            color: #ffffff;
                            font-size: 16px;
                            font-weight: 500;
                            font-family: 'DM Sans', sans-serif;
                        }
                        p:last-child {
                            font-size: 14px;
                            font-weight: 700;
                        }
                    }
                    div {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 5px;
                        width: 100%;
                        height: 50%;
                        span {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            flex-wrap: nowrap;
                            width: 60%;
                            height: 100%;
                            button {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                width: 60px;
                                height: 30px;
                                background-color: #ffffff;
                                border: none;
                                border-radius: 10px;
                                font-size: 18px;
                                cursor: pointer;
                            }
                            button:last-child {
                                font-size: 22px;
                            }
                            p {
                                text-align: center;
                            }
                        }
                        img {
                            cursor: pointer;
                        }
                    }
                }
            }
            .shoppingCartItem:first-child {
                margin-top: 0;
            }
        }
        #ShoppingCart_Bottom {
            margin-top: 10px;
            width: 100%;
            height: 160px;
            span {
                height: 40px;
                p {
                    margin-left: 0;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 24px;
                    font-weight: 700;
                    font-family: 'DM Sans', sans-serif;
                }
                p:last-child {
                    color: #ffffff;
                    font-size: 16px;
                }
            }
            #ShoppingCart_BottomBalance {
                p {
                    font-size: 16px;
                }
            }
            input {
                margin-top: 10px;
                padding: 0 20px;
                width: calc(100% - 44px);
                height: 41px;
                background-color: #434343;
                border: 1px solid rgba(255, 255, 255, 0.6);
                border-radius: 10px;
                color: #bababa;
                font-size: 14px;
                font-weight: 700;
                font-family: 'DM Sans', sans-serif;
                outline: none;
            }
            ::placeholder {
                color: #bababa;
                font-size: 14px;
                font-weight: 700;
                font-family: 'DM Sans', sans-serif;
            }
            button {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;
                padding: 0 20px;
                width: 100%;
                height: 50px;
                background-color: #434343;
                border: none;
                border-radius: 10px;
                color: #ffffff;
                font-size: 16px;
                font-weight: 700;
                font-family: 'DM Sans', sans-serif;
                cursor: pointer;
            }
            .active {
                background-color: #42d4ba;
            }
        }
    }
  }
</style>
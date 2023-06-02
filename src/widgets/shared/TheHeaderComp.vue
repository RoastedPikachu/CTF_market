<template>
  <header>
      <img src="@/assets/userAvatar.svg" alt="Профиль" id="ProfileImg" @click="isModalProfileActive = !isModalProfileActive">

      <img src="@/assets/hamburgerIcon.svg" alt="Меню" id="HamburgerMenu" @click="isModalProfileActive = !isModalProfileActive">

      <div id="ModalProfileWindow" v-if="isModalProfileActive && isSignIn">
          <img src="@/assets/x-markIcon.png" alt="Закрыть" id="ModalProfileWindow_Close" @click="isModalProfileActive = !isModalProfileActive">

          <div id="ModalProfileWindow_UserBrieflyInfo">
              <img src="@/assets/userAvatar.svg" alt="Профиль">

              <span>
                  <p>{{ fullName }}</p>

                  <p>{{ phone }}</p>
              </span>
          </div>

          <div id="ModalProfileWindow_Email">
              <p>Почта</p>

              <p>{{ email }}</p>
          </div>

          <button @click="signOut()">Выйти из аккаунта</button>

          <span id="ModalProfileWindow_Balance">
              <p>Баланс: </p>

              <span>
                  <p>{{ balance }}</p>

                  <img src="@/assets/ctfCoinIcon.svg" alt="CTFCoin">
              </span>
          </span>
      </div>

      <nav>
          <router-link to="/" class="route">Главная</router-link>
          <router-link to="/shopItems" class="route">Товары</router-link>
          <span>
              <router-link to="/signIn" class="route" :disabled="!isSignIn">Вход/</router-link>
              <router-link to="/registration" class="route" :disabled="!isSignIn">Регистрация</router-link>
          </span>
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
                  <img :src="shoppingCartItem.photo" :alt="shoppingCartItem.title" class="shoppingCartItemImage">

                  <div class="shoppingCartItem_Right">
                  <span>
                      <p>{{ shoppingCartItem.title }}</p>

                      <p>{{ shoppingCartItem.price * shoppingCartItem.count }} баллов</p>
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

                  <p>{{ balance || 0 }} баллов</p>
              </span>

              <span>
                  <p>К ОПЛАТЕ</p>

                  <p>{{ totalCost }} баллов</p>
              </span>

              <input type="text" placeholder="г. Москва, ул. Моросейка, д. 10, кв. 40" v-model="address">

              <button :class="{ active: isPointsEnough }" @click="makeAnOrder()">
                  Оплатить
                  <img src="@/assets/arrowRightIcon.svg" alt="Оплатить">
              </button>
          </div>
      </div>
  </header>
</template>

<script lang="ts" setup>
  import { ref, onMounted, watch } from 'vue';
  import store from '@/store';
  import axios from 'axios';

  const isSignIn = ref(store.state.isSignIn);
  const isModalProfileActive = ref(false);
  const isModalShoppingCartActive = ref(false);
  const isPointsEnough = ref(false);

  const countOfItemsInShoppingCart = ref(store.state.countOfItemsInShoppingCart);
  const shoppingCartItems = ref(store.state.shoppingCart);

  const balance = ref(0);
  const totalCost = ref(store.state.totalCost);

  const phone = ref('');
  const email = ref('');
  const address = ref('');
  const fullName = ref('');

  onMounted(() => {
      if(shoppingCartItems.value.length) {
          const accumArr = shoppingCartItems.value.map(item => item.count > 1 ? +item.price * item.count : +item.price);

          store.dispatch('changeTotalCostValue', accumArr.reduce((accum, item) => accum += item));
      } else {
          store.dispatch('changeTotalCostValue', 0);
      }

      if(isSignIn.value) {
          getInfoAboutUserByToken();
      }
  })

  watch(() => store.state.isSignIn, () => {
      isSignIn.value = store.state.isSignIn;
  });

  watch(() => store.state.totalCost, () => {
      totalCost.value = store.state.totalCost;
  });

  watch(() => store.state.countOfItemsInShoppingCart, () => {
      countOfItemsInShoppingCart.value = store.state.countOfItemsInShoppingCart;
  });

  watch(() => store.state.shoppingCart, () => {
      shoppingCartItems.value = store.state.shoppingCart;

      if(shoppingCartItems.value.length) {
          const accumArr = shoppingCartItems.value.map(item => item.count > 1 ? +item.price * item.count : +item.price);

          store.dispatch('changeTotalCostValue', accumArr.reduce((accum, item) => accum += item));
      } else {
          store.dispatch('changeTotalCostValue', 0);
      }

      isPointsEnough.value = totalCost.value <= balance.value;
  }, {deep: true});

  const makeAnOrder = () => {
      if(shoppingCartItems.value.length && address.value) {
          const url = new URL('https://ctfmarket.ru:8080/api/v1/product/buy');

          const token = getCookie('token');

          axios.post(url.toString(), {
              token: token,
              address: address.value,
              products: shoppingCartItems.value
          }, {
              headers: { 'Content-Type': 'application/json;charset=utf-8' }
          })
              .then(res => {
                  store.dispatch('clearShoppingCart');
                  address.value = '';

                  getInfoAboutUserByToken();
              })
              .catch(error => {
                  console.log(error);
              })
      } else {
          console.log('Нельзя сделать заказ с пустой корзиной');
      }
  }

  const removeShoppingCartItem = (id:number) => {
      store.dispatch('removeItemFromShoppingCart', id);
  }

  const clearShoppingCart = () => {
      store.dispatch('clearShoppingCart');
  }

  const increaseShoppingCartItemCount = (item:any) => {
      item.count++;

      store.dispatch('changeItemFromShoppingCart', item);
      store.dispatch('changeTotalCostValue', totalCost.value + item.price);
  }

  const decreaseShoppingCartItemCount = (item:any) => {
      if(item.count > 1) {
          item.count--;

          store.dispatch('changeItemFromShoppingCart', item);
          store.dispatch('changeTotalCostValue', totalCost.value - item.price);
      } else {
          store.dispatch('removeItemFromShoppingCart', item.id);
      }
  }

  const signOut = () => {
      balance.value = 0;

      email.value = '';
      fullName.value = '';
      phone.value = '';

      store.dispatch('changeIsSignIn');
  }

  const getCookie = (name:string) => {
      let matches = document.cookie.match(new RegExp(
          //eslint-disable-next-line
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  const getInfoAboutUserByToken = () => {
      const url = new URL('https://ctfmarket.ru:8080/api/v1/user/get');

      const token = getCookie('token');

      axios.post(url.toString(), { token: token }, {
          headers: { 'Content-Type': 'application/json;charset=utf-8' }
      })
          .then((res) => {
              balance.value = res.data.score;

              email.value = res.data.email;
              fullName.value = `${res.data.first_name} ${res.data.last_name}`;
              phone.value = `+${res.data.phone.slice(0, 1)}(${res.data.phone.slice(1, 4)})${res.data.phone.slice(4, 7)}-${res.data.phone.slice(7, 9)}-${res.data.phone.slice(9, 11)}`;

              isPointsEnough.value = totalCost.value <= balance.value;
          })
          .catch((error) => {
              console.log(error);
          })
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
    #HamburgerMenu {
        display: none;
    }
    #ModalProfileWindow {
        position: absolute;
        top: 25px;
        left: 5%;
        padding: 20px 0;
        width: 260px;
        height: 260px;
        background-color: #1e1e1e;
        border: 2px solid #4b4b4b;
        border-radius: 20px;
        #ModalProfileWindow_Close {
            position: absolute;
            top: 30px;
            right: 20px;
            width: 15px;
            height: 15px;
            cursor: pointer;
        }
        #ModalProfileWindow_UserBrieflyInfo {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px 15px;
            width: calc(100% - 40px);
            height: 65px;
            border: 1px solid #4b4b4b;
            border-width: 0 0 1px 0;
            img {
                width: 60px;
                height: 60px;
            }
            span {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                margin-left: 0;
                width: calc(100% - 70px);
                height: 35px;
                p {
                    margin-left: 0;
                    width: 100%;
                    color: #ffffff;
                    font-size: 16px;
                    font-weight: 500;
                    font-family: 'DM Sans', sans-serif;
                }
                p:last-child {
                    margin-top: 7.5px;
                    font-size: 14px;
                }
            }
        }
        #ModalProfileWindow_Email {
            padding: 12.5px 20px;
            width: calc(100% - 40px);
            height: 50px;
            border: 1px solid #4b4b4b;
            border-width: 1px 0 1px 0;
            p {
                color: #ffffff;
                font-size: 18px;
                font-weight: 500;
                font-family: 'DM Sans', sans-serif;
            }
            p:last-child {
                margin-top: 7.5px;
                font-size: 16px;
            }
        }
        button {
            display: flex;
            align-items: center;
            padding: 0 20px;
            width: 100%;
            height: 60px;
            background-color: transparent;
            border: 1px solid #4b4b4b;
            border-width: 1px 0 1px 0;
            color: #fa3e3e;
            font-size: 18px;
            font-weight: 700;
            font-family: 'DM Sans', sans-serif;
            cursor: pointer;
            outline: none;
        }
        #ModalProfileWindow_Balance {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            width: calc(100% - 40px);
            height: 60px;
            p {
                margin-left: 0;
                color: #ffffff;
                font-size: 18px;
                font-weight: 700;
                font-family: 'DM Sans', sans-serif;
            }
            span {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                p {
                    font-size: 24px;
                }
                img {
                    margin-left: 5px;
                    width: 25px;
                    height: 25px;
                    cursor: default;
                }
            }
            p:last-child {
                margin-left: 20px;
                font-size: 20px;
            }
        }
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: -10%;
      width: 35%;
      .route {
        color: #ffffff;
        font-size: 20px;
        font-weight: 700;
        font-family: 'DM Sans', sans-serif;
        text-decoration: none;
        outline: none;
      }
      span {
          display: flex;
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
                font-size: 1.125em;
                font-weight: 700;
                font-family: 'Montserrat', 'sans-serif';
            }
        }
        #shoppingCartItemsWrapper {
            margin-top: 20px;
            width: 100%;
            height: 350px;
            overflow: scroll;
            overflow-x: hidden;
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
                            font-size: 0.875em;
                            font-weight: 500;
                            font-family: 'DM Sans', sans-serif;
                        }
                        p:last-child {
                            font-size: 0.875em;
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
                                font-size: 1.125em;
                                cursor: pointer;
                            }
                            button:last-child {
                                font-size: 1.375em;
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
        #shoppingCartItemsWrapper::-webkit-scrollbar {
            width: 10px;
        }

        #shoppingCartItemsWrapper::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            border-radius: 10px;
        }

        #shoppingCartItemsWrapper::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
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
                    font-size: 1.5em;
                    font-weight: 700;
                    font-family: 'DM Sans', sans-serif;
                }
                p:last-child {
                    color: #ffffff;
                    font-size: 1em;
                }
            }
            #ShoppingCart_BottomBalance {
                p {
                    font-size: 1em;
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
                font-size: 0.875em;
                font-weight: 700;
                font-family: 'DM Sans', sans-serif;
                outline: none;
            }
            ::placeholder {
                color: #bababa;
                font-size: 0.875em;
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
                color: #9a9a9a;
                font-size: 1em;
                font-weight: 700;
                font-family: 'DM Sans', sans-serif;
                cursor: pointer;
            }
            .active {
                background-color: #42d4ba;
                color: #ffffff;
            }
        }
    }
  }

  @media(max-width: 480px) {
    header {
        height: 50px;

        #ProfileImg {
            display: none;
        }

        #HamburgerMenu {
            display: block;
            width: 25px;
            cursor: pointer;
        }

        nav {
            margin-left: 0;
            width: 75%;

            .route {
                font-size: 0.75em;
            }

            span {
                width: 40%;
            }
        }

        span {
            width: 25px;
            img {
                width: 25px;
            }

            p {
                display: none;
            }
        }
    }
  }

  @media(max-width: 380px) {
      header {
          #HamburgerMenu {
              width: 22.5px;
          }

          nav {
              .route {
                  font-size: 0.625em;
              }
          }

          span {
              width: 22.5px;

              img {
                  width: 22.5px;
              }
          }
      }
  }
  @media(max-width: 360px) {
      header {
          #HamburgerMenu {
              width: 20px;
          }

          span {
              width: 20px;

              img {
                  width: 20px;
              }
          }
      }
  }

  @media(max-width: 330px) {
      header {
          #HamburgerMenu {
              width: 17.5px;
          }

          span {
              width: 17.5px;

              img {
                  width: 17.5px;
              }
          }
      }
  }

  @media(min-width: 2560px) and (min-height: 1440px) {
      header {
          height: 130px;

          #ProfileImg {
              width: 50px;
              height: 50px;
          }

          nav {
              .route {
                  font-size: 26px;
              }
          }

          span {
              width: 50px;
              height: 50px;

              img {
                  width: 42.5px;
                  height: 42.5px;
              }

              p {
                  font-size: 28px;
              }
          }
      }
  }
</style>
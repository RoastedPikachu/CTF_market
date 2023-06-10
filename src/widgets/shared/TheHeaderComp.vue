<template>
  <header>
      <img src="@/assets/userAvatar.svg" alt="Профиль" id="ProfileImg"
           @click="isModalProfileWindowOpen = !isModalProfileWindowOpen"
      >

      <img src="@/assets/hamburgerIcon.svg" alt="Меню" id="HamburgerMenu"
           @click="isModalProfileWindowOpen = !isModalProfileWindowOpen"
      >

      <ModalProfileWindow
          :phone="phone"
          :email="email"
          :address="address"
          :fullName="fullName"
          :balance="balance"
          :isSignIn="isSignIn"
          :isModalProfileWindowOpen="isModalProfileWindowOpen"

          v-if="isModalProfileWindowOpen && isSignIn"

          @changeModalProfileOpen="(isOpen) => isModalProfileWindowOpen = isOpen"
          @clearUserData="balance = 0; email = ''; fullName = ''; phone = '';"
      />

      <nav>
          <router-link to="/" class="route">Главная</router-link>

          <router-link to="/shopItems" class="route">Товары</router-link>

          <span>
              <router-link
                  to="/signIn"
                  :class="{ disabledRoute: isSignIn }"
                  class="route"
              >Вход/</router-link>

              <router-link
                  to="/registration"
                  :class="{ disabledRoute: isSignIn }"
                  class="route"
              >Регистрация</router-link>
          </span>
      </nav>

      <span>
          <img src="@/assets/shoppingCartIcon.svg" alt="Корзина" @click="changeIsModalShoppingCartOpenStatus()">

          <p>{{ countOfItemsInShoppingCart }}</p>
      </span>

      <ModalShoppingCartWindow
          :token="getCookie('token')"
          :balance="balance"
          :totalCost="totalCost"
          :isPointsEnough="isPointsEnough"
          :isOrderPayed="isOrderPayed"
          :shoppingCartItems="shoppingCartItems"

          v-if="isModalShoppingCartOpen"

          @changeModalShoppingCartActive="changeIsModalShoppingCartOpenStatus()"
          @order="isOrderPayed = true; getInfoAboutUserByToken();"
      />
  </header>
</template>

<script lang="ts" setup>
  import { ref, onMounted, watch, computed } from 'vue';
  import store from '@/store';
  import axios from 'axios';
  import ModalProfileWindow from "@/widgets/features/modalWindows/ModalProfileWindow.vue";
  import ModalShoppingCartWindow from "@/widgets/features/modalWindows/ModalShoppingCartWindow.vue";

  const isSignIn = computed(() => store.state.isSignIn);
  const isModalProfileWindowOpen = ref(false);
  let isModalShoppingCartOpen = ref(false);
  const isOrderPayed = ref(false);
  const isPointsEnough = ref(false);

  const totalCost = computed(() => store.state.totalCost);

  const countOfItemsInShoppingCart = computed(() => store.state.countOfItemsInShoppingCart);

  const shoppingCartItems = computed(() => store.state.shoppingCart);

  const balance = ref(0);

  const phone = ref('');
  const email = ref('');
  const address = ref('');
  const fullName = ref('');

  watch(() => store.state.shoppingCart, () => {
      if(shoppingCartItems.value.length) {
          const accumArr = shoppingCartItems.value.map(item => item.count > 1 ? +item.price * item.count : +item.price);

          store.dispatch('changeTotalCostValue', accumArr.reduce((accum, item) => accum += item));
      } else {
          store.dispatch('changeTotalCostValue', 0);
      }

      isPointsEnough.value = totalCost.value <= balance.value;
  }, {deep: true});

  const changeIsModalShoppingCartOpenStatus = () => {
      if (isModalShoppingCartOpen.value) {
          isOrderPayed.value = false;
      }

      isModalShoppingCartOpen.value = !isModalShoppingCartOpen.value;
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
              phone.value = res.data.phone;

              isPointsEnough.value = totalCost.value <= balance.value;

              if(res.data.is_admin) {
                  store.dispatch('changeIsAdmin');
              }
          })
          .catch((error) => {
              console.log(error);
          })
  }

  onMounted(() => {
      if(isSignIn.value) {
          getInfoAboutUserByToken();
      }

      window.addEventListener('click', event => {
          if(event.target !== null) {
              const target = event.target as HTMLElement;

              if(!target.closest('header')) {
                  if(isModalShoppingCartOpen.value) {
                      isModalShoppingCartOpen.value = false;
                  } else if(isModalProfileWindowOpen.value) {
                      isModalProfileWindowOpen.value = false;
                  }
              }
          }
      });
  })
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

      .disabledRoute {
          pointer-events: none;
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
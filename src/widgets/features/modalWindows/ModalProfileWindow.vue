<template>
    <div id="ModalProfileWindow">
        <img src="@/assets/x-markIcon.svg" alt="Закрыть" id="ModalProfileWindow_Close"
             v-if="!isMobile"
             @click="$emit('changeModalProfileOpen', isOpen = !isOpen)"
        />

        <img src="@/assets/hamburgerIcon.svg" alt="Закрыть" id="ModalProfileWindow_HamburgerClose"
             v-if="isMobile"
             @click="$emit('changeModalProfileOpen', isOpen = !isOpen)"
        />

        <div id="ModalProfileWindow_UserBrieflyInfo">
            <img src="@/assets/userAvatar.svg" alt="Профиль"/>

            <span>
                  <p>{{ props.fullName }}</p>

                  <p>{{ props.phone }}</p>
              </span>
        </div>

        <div id="ModalProfileWindow_Email">
            <p>Почта</p>

            <p>{{ props.email }}</p>
        </div>

        <button class="hamburgerMenuRoute" v-if="props.isSignIn && isMobile">
            <router-link to="/" class="hamburgerMenuRoute_Text">Главная</router-link>
        </button>

        <button class="hamburgerMenuRoute" v-if="props.isSignIn && isMobile">
            <router-link to="/shopItems" class="hamburgerMenuRoute_Text">Товары</router-link>
        </button>

        <button class="hamburgerMenuRoute" v-if="props.isSignIn && isMobile">
            <router-link to="/signIn" class="hamburgerMenuRoute_Text">Вход</router-link>
        </button>

        <button class="hamburgerMenuRoute" v-if="props.isSignIn && isMobile">
            <router-link to="/registration" class="hamburgerMenuRoute_Text">Регистрация</router-link>
        </button>

        <button @click="signOut()">Выйти из аккаунта</button>

        <span id="ModalProfileWindow_Balance">
              <p>Баланс: </p>

              <span>
                  <p>{{ props.balance }}</p>

                  <img src="@/assets/ctfCoinIcon.svg" alt="CTFCoin"/>
              </span>
          </span>
    </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, defineProps, defineEmits } from 'vue';
  import store from "@/store";

  interface Props {
      phone: string,
      email: string,
      address: string,
      fullName: string,
      balance: number,
      isSignIn: boolean,
      isModalProfileWindowOpen: boolean
  }

  const props = defineProps<Props>();

  const emit:any = defineEmits(['clearUserData', 'changeModalProfileOpen']);

  const isMobile = ref(false);
  const isOpen = ref(props.isModalProfileWindowOpen);

  const signOut = () => {
      emit('clearUserData');

      if(store.state.isAdmin) {
          store.dispatch('changeIsAdmin');
      }

      store.dispatch('changeIsSignIn');
      store.dispatch('clearShoppingCart');
      store.dispatch('clearIsCookieOpen');

      (function deleteAllCookies() {
          let cookies = document.cookie.split(";");

          for(let i = 0; i < cookies.length; i++) {
              let cookie = cookies[i];
              let eqPos = cookie.indexOf("=");
              let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
              document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
          }
      })();

      window.location.reload();
  }

  onMounted(() => {
      isMobile.value = window.innerWidth < 480;
  });

</script>

<style lang="scss" scoped>
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

    @media(max-width: 480px) {
        #ModalProfileWindow {
            top: 0;
            left: 0;
            padding: 30px 40px;
            width: calc(100% - 84px);
            height: calc(100vh - 64px);
            border-radius: 0;

            #ModalProfileWindow_HamburgerClose {
                width: 25px;
                height: 25px;
                cursor: pointer;
            }

            p {
                display: block;
            }

            #ModalProfileWindow_UserBrieflyInfo {
                padding: 10px 0 10px 0;
                width: 100%;
                border-width: 0 0 2px 0;

                span {
                    height: auto;

                    p {
                        font-size: 18px;
                    }

                    p:last-child {
                        font-size: 16px;
                    }
                }
            }

            #ModalProfileWindow_Email {
                padding: 10px 0 10px 0;
                width: 100%;
                border-width: 0 0 0.5px 0;
            }

            .hamburgerMenuRoute {
                padding: 20px 0 20px 0;
                width: 100%;
                height: 60px;
                border: 0.5px solid #4b4b4b;
                border-width: 0.5px 0 0.5px 0;
                outline: none;

                .hamburgerMenuRoute_Text {
                    color: #ffffff;
                    font-size: 18px;
                    font-weight: 700;
                    font-family: 'DM Sans', sans-serif;
                    text-decoration: none;
                }
            }

            button {
                width: 100%;
                padding: 10px 0 10px 0;
            }

            #ModalProfileWindow_Balance {
                padding: 0;
                width: 100%;
                border: 0.5px solid #4b4b4b;
                border-width: 0.5px 0 0 0 ;
            }
        }
    }
</style>
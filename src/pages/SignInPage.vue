<template>
  <main>
      <div id="SignIn">
          <img id="SignIn_Logo" src="@/assets/Logo.svg" alt="CTFMarket">

          <form>
              <div>
                  <img src="@/assets/emailIcon.svg" alt="Почта">
                  <input type="text" placeholder="Почта" v-model="email">
              </div>

              <div>
                  <img src="@/assets/passwordIcon.svg" alt="Пароль">
                  <input type="password" placeholder="Пароль" v-model="password">
              </div>

              <p id="SignIn_Error" v-if="error">{{ error }}</p>

              <p>Забыли пароль?</p>

              <button type="button">Войти</button>
          </form>

          <p id="SignIn_Register">У вас ещё нет аккаунта? <router-link to="/registration" class="route">Зарегистрироваться</router-link></p>
      </div>
  </main>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const email = ref('');
    const password = ref('');
    const error = ref('У тебя хуй видно');
</script>

<style lang="scss" scoped>
    @import '@/assets/styles/mixins.scss';

    main {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        background-image: url('@/assets/SignInBackground.svg');
        background-size: cover;
        background-repeat: no-repeat;
        #SignIn {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            width: 430px;
            height: 500px;
            background-color: transparent;
            backdrop-filter: blur(6px);
            border: 0.5px solid rgba(255, 255, 255, 0.4);
            border-radius: 30px;
            #SignIn_Logo {
                margin-top: 20px;
                margin-left: 15px;
                width: 75%;
                height: 65px;
            }
            form {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                margin-top: -30px;
                height: 300px;
                div {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-left: 15px;
                    width: 310px;
                    height: 50px;
                    background-color: #ffffff;
                    border: none;
                    border-radius: 10px;
                    img {
                        width: 22.5px;
                    }
                    input {
                        @include input(4px, 10px);
                    }
                    ::placeholder {
                        color: #bababa;
                        font-size: 14px;
                        font-weight: 400;
                        font-family: 'DM Sans', sans-serif;
                    }
                }
                p {
                    width: 100%;
                    color: #ffffff;
                    font-size: 14px;
                    font-weight: 700;
                    font-family: 'DM Sans', sans-serif;
                    text-align: center;
                    cursor: pointer;
                }
                button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 230px;
                    height: 60px;
                    background-color: rgba(46, 236, 197, 0.1);
                    border: 1.5px solid #2eecc5;
                    border-radius: 40px;
                    box-shadow: 0 0 38px rgba(46, 236, 197, 0.1);
                    color: #42d4ba;
                    font-size: 20px;
                    font-weight: 700;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                }
                #SignIn_Error {
                    width: 100%;
                    color: #fa3e3e;
                    font-size: 14px;
                    font-weight: 500;
                    font-family: 'DM Sans', sans-serif;
                    text-align: center;
                }
            }
            #SignIn_Register {
                margin-top: -40px;
                color: #ffffff;
                font-size: 14px;
                font-weight: 400;
                font-family: 'DM Sans', sans-serif;
                text-align: center;
                .route {
                    color: #42d4ba;
                    font-weight: 600;
                }
            }
        }
    }

    @media(max-width: 480px) {
        main {
            #SignIn {
                width: 85%;
                height: 460px;
                #SignIn_Logo {
                    margin-top: 0px;
                    margin-left: 10px;
                    width: 77.5%;
                    height: 70px;
                }
                form {
                    margin-top: -40px;
                    height: 260px;
                    div {
                        width: 75%;
                        img {
                            width: 20px;
                        }
                    }
                    button {
                        width: 200px;
                        height: 50px;
                        font-size: 18px;
                    }
                }
                #SignIn_Register {
                    width: 75%;
                    line-height: 22px;
                }
            }
        }
    }
</style>
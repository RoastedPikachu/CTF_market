<template>
  <main>
      <div id="Register">
          <img id="Register_Logo" src="@/assets/Logo.svg" alt="CTFmarket">

          <form>
              <div>
                  <img src="@/assets/manIcon.svg" alt="Имя">
                  <input type="text" placeholder="Имя" v-model="firstName">
              </div>

              <div>
                  <img src="@/assets/manIcon.svg" alt="Фамилия">
                  <input type="text" placeholder="Фамилия" v-model="secondName">
              </div>

              <div>
                  <img src="@/assets/emailIcon.svg" alt="Почта">
                  <input type="text" placeholder="Почта" v-model="email">
              </div>

              <div>
                  <img src="@/assets/phoneIcon.svg" alt="Телефон">
                  <input type="text" placeholder="Телефон" v-model="phone">
              </div>

              <div>
                  <img src="@/assets/passwordIcon.svg" alt="Пароль">
                  <input type="text" placeholder="Пароль" v-model="password">
              </div>

              <button type="button">Зарегистрироваться</button>
          </form>

          <p id="Register_SignIn">У вас уже есть аккаунт? <router-link to="/signIn" class="route">Войти</router-link></p>
      </div>
  </main>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const firstName = ref('');
    const secondName = ref('');
    const email = ref('');
    const phone = ref('');
    const password = ref('');
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
        #Register {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          width: 500px;
          height: 680px;
          background-color: transparent;
          backdrop-filter: blur(6px);
          border: 0.5px solid rgba(255, 255, 255, 0.4);
          border-radius: 30px;
          #Register_Logo {
            margin-top: 20px;
            margin-left: 15px;
            width: 85%;
            height: 75px;
          }
          form {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            margin-top: -30px;
            height: 480px;
            div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-left: 15px;
                width: 370px;
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
            div:nth-child(4) {
                img {
                    margin-top: 4px;
                }
            }
            button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 280px;
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
          }
          #Register_SignIn {
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
            #Register {
                width: 85%;
                height: 600px;
                #Register_Logo {
                    margin-top: 0px;
                    margin-left: 10px;
                    width: 77.5%;
                    height: 70px;
                }
                form {
                    margin-top: -40px;
                    height: 440px;
                    div {
                        width: 75%;
                        img {
                            width: 20px;
                        }
                    }
                    button {
                        width: 220px;
                        height: 50px;
                        font-size: 16px;
                    }
                }
                #Register_SignIn {
                    width: 75%;
                    line-height: 22px;
                }
            }
        }
    }
</style>
<template>
  <main>
      <div id="Register">
          <img id="Register_Logo" src="@/assets/Logo.svg" alt="CTFmarket">

          <form>
              <div>
                  <img src="@/assets/manIcon.svg" alt="ФИО">
                  <input type="text" placeholder="ФИО" v-model="name">
              </div>

              <div>
                  <img src="@/assets/passwordIcon.svg" alt="Токен">
                  <input type="text" placeholder="Введите Токен" v-model="token">
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

              <p id="Register_Error" v-if="errorMess">{{ errorMess }}</p>

              <button type="button" @click="setDataAboutUser()">Зарегистрироваться</button>
          </form>

          <p id="Register_SignIn">У вас уже есть аккаунт? <router-link to="/signIn" class="route">Войти</router-link></p>
      </div>
  </main>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import { ref } from 'vue';
    import axios from 'axios';

    const router = useRouter();

    const name = ref('');
    const token = ref('');
    const email = ref('');
    const phone = ref('');
    const password = ref('');
    const errorMess = ref('');

    const setDataAboutUser = () => {
        const url = new URL('http://79.174.12.75:3134/api/v1/auth/register/');

        const phoneRegex = /^((\+7|7|8)+([0-9]){10})$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(phoneRegex.test(phone.value) && emailRegex.test(email.value)) {
            axios.post(url.toString(), {
                secret_key: token.value,
                password: password.value,
                email: email.value,
                phone: phone.value
            }, {
                headers: { 'Content-Type': 'application/json;charset=utf-8' }
            })
                .then((res:any) => {
                    if(res.data.error) {
                        throw res.data.error;
                    } else {
                        router.push(`/signIn`);
                    }
                })
                .catch((error:any) => {
                    switch(error) {
                        case 2: errorMess.value = 'Пользователь по такому токену не найден';
                            break;

                        case 3: errorMess.value = 'Пользователь с таким токеном уже существует';
                            break;

                        case 4: errorMess.value = 'Заполните поле "токен"';
                            break;

                        case 5: errorMess.value = 'Заполните поле "пароль"';
                            break;

                        case 0: errorMess.value = 'Неизвестная ошибка';
                            break;
                    }
                });
        } else if(!phoneRegex.test(phone.value)) {
            errorMess.value = 'Телефон введён в неправильном формате';
        } else if(!emailRegex.test(email.value)) {
            errorMess.value = 'Почта введена в неправильном формате';
        } else {
            errorMess.value = 'Телефон и почта введены в неправильном формате';
        }
    }
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
          width: 480px;
          height: 680px;
          background-color: transparent;
          backdrop-filter: blur(6px);
          border: 0.5px solid rgba(255, 255, 255, 0.4);
          border-radius: 30px;
          #Register_Logo {
            margin-top: 30px;
            margin-left: 7.5px;
            width: 100%;
            height: 75px;
          }
          form {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            margin-top: 10px;
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
                outline: none;
            }
            #Register_Error {
                width: 100%;
                color: #fa3e3e;
                font-size: 14px;
                font-weight: 500;
                font-family: 'DM Sans', sans-serif;
                text-align: center;
            }
          }
          #Register_SignIn {
            margin-top: 20px;
            color: #ffffff;
            font-size: 14px;
            font-weight: 400;
            font-family: 'DM Sans', sans-serif;
            text-align: center;
            outline: none;
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
                margin-top: -50px;
                width: 85%;
                height: 600px;
                #Register_Logo {
                    margin-top: 20px;
                    margin-left: calc(10% + 10px);
                    width: 77.5%;
                    height: auto;
                }
                form {
                    margin-top: 10px;
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
                    margin-top: 10px;
                    width: 100%;
                    line-height: 22px;
                }
            }
        }
    }
</style>
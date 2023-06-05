<template>
  <main>
      <div id="SignIn">
          <router-link to="/" class="signInLogoRoute">
              <img src="@/assets/Logo.svg" alt="CTFMarket">
          </router-link>

          <form>
              <div>
                  <img src="@/assets/emailIcon.svg" alt="Почта">
                  <input type="text" placeholder="Почта" v-model="email">
              </div>

              <div>
                  <img src="@/assets/passwordIcon.svg" alt="Пароль">
                  <input type="password" placeholder="Пароль" v-model="password">
              </div>

              <p id="SignIn_Error" v-if="errorMess">{{ errorMess }}</p>

              <p @click="console.log('Больше не забывай, чмоки 𓂸');">Забыли пароль?</p>

              <button type="button" @click="setSignInData()">Войти</button>
          </form>

          <p id="SignIn_Register">У вас ещё нет аккаунта? <router-link to="/registration" class="route">Зарегистрироваться</router-link></p>
      </div>
  </main>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import { ref } from 'vue';
    import store from '@/store';
    import axios from 'axios';

    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const errorMess = ref('');

    const setSignInData = () => {
        const url = new URL('https://ctfmarket.ru:8080/api/v1/auth/login/');

        const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

        if(emailRegex.test(email.value)) {
            if(password.value.length) {
                axios.post(url.toString(), {
                    email: email.value,
                    password: password.value
                }, {
                    headers: { 'Content-Type': 'application/json;charset=utf-8' }
                })
                    .then((res:any) => {
                        if(res.data.error) {
                            throw res.data.error;
                        } else {
                            document.cookie =`token=${res.data.token}; path=/; max-age=2592000; secure=true`;
                            store.dispatch('changeIsSignIn');
                            store.dispatch('changeIsCookieOpen');
                            router.push(`/`);
                        }
                    })
                    .catch((error:any) => {
                        const parseErrorNumberRegex = /\d+/g;

                        error = error.message.match(parseErrorNumberRegex);

                        switch(+error[0]) {
                            case 404:
                                errorMess.value = 'Пользователя с такой почтой несуществует';
                                break;

                            case 412:
                                errorMess.value = 'Неверный пароль';
                                break;
                        }
                    });
            } else {
                errorMess.value = 'Введите пароль';
            }

        } else {
            errorMess.value = 'Почта введена в неправильном формате';

            setTimeout(() => errorMess.value = '', 5000);
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
        background-size: contain;
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
            .signInLogoRoute {
                img {
                    margin-top: 20px;
                    margin-left: 7.5px;
                    width: 100%;
                    height: 65px;
                }
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
                        font-size: 0.875em;
                        font-weight: 400;
                        font-family: 'DM Sans', sans-serif;
                    }
                }
                p {
                    width: 100%;
                    color: #ffffff;
                    font-size: 0.875em;
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
                    font-size: 1.25em;
                    font-weight: 700;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                    transition: 250ms ease;
                }
                button:hover {
                    background-color: #42d4ba;
                    border: none;
                    color: #ffffff;
                }
                #SignIn_Error {
                    width: 100%;
                    color: #fa3e3e;
                    font-size: 0.875em;
                    font-weight: 500;
                    font-family: 'DM Sans', sans-serif;
                    text-align: center;
                }
            }
            #SignIn_Register {
                margin-top: -40px;
                color: #ffffff;
                font-size: 0.875em;
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
                margin-top: -40px;
                width: 85%;
                height: 460px;

                .signInLogoRoute {
                    img {
                        margin-top: 0;
                        margin-left: calc(11.75% + 5px);
                        width: 77.5%;
                        height: 70px;
                    }
                }

                form {
                    margin-top: -50px;
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
                        font-size: 1.125em;
                    }
                }

                #SignIn_Register {
                    width: 75%;
                    line-height: 22px;
                }
            }
        }
    }

    @media(min-width: 1920px) and (min-height: 1080px) {
        main {
            #SignIn {
                width: 500px;
                height: 530px;

                .signInLogoRoute {
                    img {
                        margin-left: calc(5% + 7.5px);
                        width: 90%;
                        height: 77.5px;
                    }
                }

                form {
                    height: 350px;

                    div {
                        width: 350px;
                        height: 60px;

                        img {
                            width: 25px;
                        }

                        input {
                            @include input(4px, 10px);
                            font-size: 18px;
                        }
                        ::placeholder {
                            font-size: 18px;
                        }
                    }

                    p {
                        font-size: 16px;
                    }

                    button {
                        margin-top: -10px;
                    }
                }

                #SignIn_Register {
                    font-size: 16px;
                }
            }
        }
    }

    @media(min-width: 2560px) and (min-height: 1440px) {
        main {
            #SignIn {
                width: 550px;
                height: 600px;

                .signInLogoRoute {
                    img {
                        width: 90%;
                        height: 90px;
                    }
                }

                form {
                    margin-top: -40px;
                    height: 370px;

                    div {
                        width: 400px;
                        height: 65px;

                        img {
                            width: 27.5px;
                        }

                        input {
                            @include input(4px, 10px);
                            font-size: 20px;
                        }
                        ::placeholder {
                            font-size: 20px;
                        }
                    }

                    p {
                        font-size: 18px;
                    }

                    button {
                        margin-top: -10px;
                        width: 260px;
                        height: 65px;
                        font-size: 22px;
                    }
                }

                #SignIn_Register {
                    font-size: 18px;
                }
            }
        }
    }
</style>
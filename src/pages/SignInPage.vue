<template>
  <main>
      <div id="SignIn">
          <img id="SignIn_Logo" src="@/assets/Logo.svg" alt="CTFMarket">

          <form>
              <div>
                  <img src="@/assets/emailIcon.svg" alt="Почта">
                  <input type="text" placeholder="Почта">
              </div>

              <div>
                  <img src="@/assets/passwordIcon.svg" alt="Пароль">
                  <input type="password" placeholder="Пароль">
              </div>

              <p>Забыли пароль?</p>

              <button type="button">Войти</button>
          </form>

          <p id="SignIn_Register">У вас ещё нет аккаунта? <router-link to="/registration" class="route">Зарегистрироваться</router-link></p>
      </div>
  </main>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        background-image: url('@/assets/SignInBackground.svg');
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
                        padding-top: 4px;
                        width: calc(100% - 37.5px);
                        height: calc(100% - 4px);
                        border: none;
                        border-radius: 10px;
                        color: #000000;
                        outline: none;
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
            }
            #SignIn_Register {
                margin-top: -40px;
                color: #ffffff;
                font-size: 14px;
                font-weight: 400;
                font-family: 'DM Sans', sans-serif;
                .route {
                    color: #42d4ba;
                    font-weight: 600;
                }
            }
        }
    }
</style>
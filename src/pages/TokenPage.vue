<template>
  <main>
      <div id="Token">
          <img id="Token_Logo" src="@/assets/Logo.svg" alt="CTFmarket">
          <form>
              <div>
                  <img src="@/assets/emailIcon.svg" alt="Токен">
                  <input type="text" placeholder="Введите Токен" v-model="token">
              </div>
              <button>Отправить</button>
          </form>
      </div>
  </main>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const token = ref('');
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
        #Token {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            width: 350px;
            height: 300px;
            background-color: transparent;
            backdrop-filter: blur(6px);
            border: 0.5px solid rgba(255, 255, 255, 0.4);
            border-radius: 30px;
            #Token_Logo {
                margin-top: 10px;
                margin-left: 15px;
                width: 85%;
                height: 75px;
            }
            form {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                margin-top: -20px;
                height: 200px;
                div {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-left: 15px;
                    width: 280px;
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
                button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 180px;
                    height: 50px;
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
        }
    }
</style>
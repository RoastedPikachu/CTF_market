<template>
  <main>
      <div id="Text404Wrapper">
          <h1>404</h1>

          <p id="Text404Wrapper_ErrorText">ОШИБКА</p>

          <router-link to="/" class="route404">вернуться на главную</router-link>

          <p id="Text404Wrapper_Apologies">Извините, страница не найдена</p>
      </div>
  </main>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-image: url('@/assets/SignInBackground.svg');
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    #Text404Wrapper {
      width: 50%;
      height: 70%;
      color: #ffffff;
      h1 {
        margin: 0;
        height: 300px;
        font-size: 18.75em;
        font-weight: 900;
        font-family: 'Montserrat', sans-serif;
        text-align: center;
      }
      #Text404Wrapper_ErrorText {
        margin-top: 10px;
        font-size: 5.625em;
        font-weight: 900;
        font-family: 'Montserrat', sans-serif;
        text-align: center;
      }
      .route404 {
        display: inline-block;
        width: 100%;
        color: #62ffe3;
        font-size: 3.125em;
        font-weight: 700;
        font-family: 'Montserrat', sans-serif;
        text-align: center;
      }
      #Text404Wrapper_Apologies {
        margin-top: 25px;
        font-size: 2em;
        font-weight: 500;
        font-family: 'Montserrat', sans-serif;
        text-align: center;
      }
    }
  }

  @media(min-width: 1600px) {
    main {
      #Text404Wrapper {
        h1 {
          height: 350px;
          font-size: 22.75em;
        }
        #Text404Wrapper_ErrorText {
          font-size: 7.625em;
        }
        .route404 {
          font-size: 4.125em;
        }
        #Text404Wrapper_Apologies {
          font-size: 2.5em;
        }
      }
    }
  }

  @media(min-width: 2000px) {
    main {
      #Text404Wrapper {
        h1 {
          height: 440px;
          font-size: 26.75em;
        }
        #Text404Wrapper_ErrorText {
          font-size: 9.625em;
        }
        .route404 {
          font-size: 5.125em;
        }
        #Text404Wrapper_Apologies {
          font-size: 3em;
        }
      }
    }
  }

  @media(max-width: 480px) {
    main {
      #Text404Wrapper {
        width: 90%;
        height: 50%;
        h1 {
          height: 170px;
          font-size: 10.625em;
        }
        #Text404Wrapper_ErrorText {
          font-size: 3.75em;
        }
        .route404 {
          font-size: 1.875em;
        }
        #Text404Wrapper_Apologies {
          margin-top: 15px;
          font-size: 1.125em;
        }
      }
    }
  }

  @media(max-width: 430px) {
    main {
      #Text404Wrapper {
        h1 {
          font-size: 10em;
        }
        #Text404Wrapper_ErrorText {
          font-size: 3.125em;
        }
        .route404 {
          font-size: 1.6em;
        }
        #Text404Wrapper_Apologies {
          font-size: 1em;
        }
      }
    }
  }

  @media(max-width: 380px) {
    main {
      #Text404Wrapper {
        h1 {
          height: 150px;
          font-size: 9.375em;
        }
        #Text404Wrapper_ErrorText {
          font-size: 2.625em;
        }
        .route404 {
          font-size: 1.325em;
        }
        #Text404Wrapper_Apologies {
          font-size: 0.875em;
        }
      }
    }
  }

  @media(max-width: 330px) {
    main {
      #Text404Wrapper {
        h1 {
          height: 130px;
          font-size: 8.75em;
        }
        #Text404Wrapper_ErrorText {
          font-size: 2.125em;
        }
        .route404 {
          font-size: 1.05em;
        }
        #Text404Wrapper_Apologies {
          font-size: 0.75em;
        }
      }
    }
  }
</style>
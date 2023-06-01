<template>
  <footer>
      <div id="BlurContacts">
          <h2>ИНФОРМАЦИЯ</h2>

          <p>ИНФОРМАЦИЯ</p>
      </div>

      <nav>
          <router-link to="/" class="footerRoute">Главная</router-link>

          <router-link to="/shopItems" class="footerRoute">Товары</router-link>

          <span>
              <router-link to="/registration" class="footerRoute">Регистрация/</router-link>

              <router-link to="/signIn" class="footerRoute">Вход</router-link>
          </span>
      </nav>

      <div id="BottomInfo">
          <div id="BottomInfo_Contacts">
              <h3>КОНТАКТЫ</h3>

              <span>
                  <p>Тел.</p>

                  <p> +7(495)640-53-30</p>
              </span>

              <span>
                  <p>Почта</p>

                  <p>info@aciso.ru</p>
              </span>
          </div>

          <div id="BottomInfo_SocialNetworks">
              <h3>СОЦИАЛЬНЫЕ СЕТИ</h3>

              <span>
                  <p>CTF news</p>

                  <a href="https://t.me/ctfnews" id="BottomInfo_SocialNetworks_Tg">
                      <img src="@/assets/tgIcon.svg" alt="Телеграм">
                  </a>

                  <a href="https://vk.com/ctfnews" id="BottomInfo_SocialNetworks_Vk">
                      <img src="@/assets/vkIcon.svg" alt="Вконтакте">
                  </a>
              </span>
          </div>
      </div>
  </footer>
</template>

<script lang="ts">

</script>

<style lang="scss" scoped>
  footer {
    bottom: 0;
    width: 100%;
    height: 400px;
    background-image: url('@/assets/footerBackground.svg');
    background-repeat: no-repeat;
    background-size: cover;

    #BlurContacts {
      position: relative;
      padding: 30px 35% 0 35%;
      width: 30%;

      h2 {
        position: absolute;
        width: 30%;
        color: #9afbe7;;
        font-size: 3em;
        font-weight: 700;
        font-family: 'DM Sans', sans-serif;
        text-align: center;
        z-index: 9;
      }

      p {
        width: 100%;
        filter: blur(8px);
        color: rgba(154, 251, 231, 0.5);
        font-size: 3em;
        font-weight: 700;
        font-family: 'DM Sans', sans-serif;
        text-align: center;
      }
    }

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 40px 37.5% 0 32.5%;
        width: 35%;

        .footerRoute {
            color: #ffffff;
            font-size: 20px;
            font-weight: 700;
            font-family: 'DM Sans', sans-serif;
            text-decoration: none;
            outline: none;
        }
    }

      #BottomInfo {
        display: flex;
        justify-content: space-between;
        margin: 80px 30% 0 30%;
        width: 42.5%;

        #BottomInfo_Contacts {
            width: 45%;
            height: 80px;

            h3 {
                color: #9afbe7;
                font-size: 26px;
                font-weight: 700;
                font-family: 'DM Sans', sans-serif;
            }

            span {
                margin-top: 15px;
                display: flex;
                justify-content: space-between;

                p {
                    color: #ffffff;
                    font-size: 22px;
                    font-weight: 700;
                    font-family: 'DM Sans', sans-serif;
                }
            }
            span:last-child {
                margin-top: 7.5px;
                width: 85%;
            }
        }
        #BottomInfo_SocialNetworks {
            width: 45%;
            height: 80px;

            h3 {
                color: #9afbe7;
                font-size: 26px;
                font-weight: 700;
                font-family: 'DM Sans', sans-serif;
            }

            span {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                width: 65%;
            }
            p {
                margin-top: 15px;
                color: #ffffff;
                font-size: 22px;
                font-weight: 700;
                font-family: 'DM Sans', sans-serif;
            }

            a {
                width: 25px;
                height: 25px;
                img {
                    width: 25px;
                    height: 25px;
                }
            }
        }
    }
  }

  @media(max-width: 480px) {
    footer {
      height: 200px;

      #BlurContacts {
        padding: 20px 0 0 0;
        width: 100%;
        height: 35px;
        text-align: center;

        h2 {
          width: 100%;
          font-size: 1.5em;
        }

        p {
          font-size: 1.5em;
        }
      }

      nav {
          margin: 15px 7.5% 0 7.5%;
          width: 85%;
          .footerRoute {
              font-size: 16px;
          }
      }

      #BottomInfo {
          margin: 20px 7.5% 0 7.5%;
          width: 85%;
          #BottomInfo_Contacts {
              h3 {
                  font-size: 16px;
              }
              span {
                  p {
                      font-size: 14px;
                  }
              }
              span {
                   margin-top: 10px;
              }
          }
          #BottomInfo_SocialNetworks {
              width: 47.5%;
              h3 {
                  font-size: 16px;
              }
              span {
                  margin-top: 10px;
                  width: 65%;
                  height: 15px;
                  p {
                      font-size: 14px;
                  }
                  a {
                      width: 15px;
                      height: 15px;
                      img {
                          width: 15px;
                          height: 15px;
                      }
                  }
              }
          }
      }
    }
  }

  @media(max-width: 380px) {
    footer {
      height: 170px;

      #BlurContacts {
        height: 30px;

        h2 {
          font-size: 1.75em;
        }

        p {
          font-size: 1.75em;
        }
      }
    }
  }

  @media(max-width: 360px) {
    footer {
      height: 150px;

      #BlurContacts {
        margin-top: 20px;

        h2 {
          font-size: 1.625em;
        }

        p {
          font-size: 1.625em;
        }
      }
    }
  }
</style>
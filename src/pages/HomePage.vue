<template>
    <TheHeaderComp/>

    <main>
        <div id="MovingImgWrapper">
            <div id="TopLogoText">
                <span><p>CTF</p><img src="@/assets/marketNeonText.svg" alt="MARKET"><p>CTF</p><img src="@/assets/marketNeonText.svg" alt="MARKET"><p>CTF</p><img src="@/assets/marketNeonText.svg" alt="MARKET"><p>CTF</p><img src="@/assets/marketNeonText.svg" alt="MARKET"><p>CTF</p><img src="@/assets/marketNeonText.svg" alt="MARKET"></span>
            </div>

            <div id="BottomLogoText">
                <p>ЛЕТНЯЯ ШКОЛА CTF 2023 ЛЕТНЯЯ ШКОЛА CTF 2023 ЛЕТНЯЯ ШКОЛА CTF 2023 ЛЕТНЯЯ ШКОЛА CTF 2023 ЛЕТНЯЯ ШКОЛА CTF 2023 ЛЕТНЯЯ ШКОЛА CTF 2023 ЛЕТНЯЯ ШКОЛА CTF 2023</p>
            </div>
<!--            <marquee id="TopLogoText" direction="left" behavior="slide" loop="-1" scrollamount="5">-->
<!--                <span><p>CTF</p><img src="@/assets/marketNeonText.svg" alt="MARKET"><p>CTF</p><img src="@/assets/marketNeonText.svg" alt="MARKET"><p>CTF</p><img src="@/assets/marketNeonText.svg" alt="MARKET"><p>CTF</p><img src="@/assets/marketNeonText.svg" alt="MARKET"><p>CTF</p><img src="@/assets/marketNeonText.svg" alt="MARKET"><p>CTF</p><img src="@/assets/marketNeonText.svg" alt="MARKET"></span>-->
<!--            </marquee>-->

<!--            <marquee id="BottomLogoText" direction="right" behavior="slide" loop="-1" scrollamount="5">-->
<!--                <p>ЛЕТНЯЯ ШКОЛА CTF 2023 ЛЕТНЯЯ ШКОЛА CTF 2023 ЛЕТНЯЯ ШКОЛА CTF 2023 ЛЕТНЯЯ ШКОЛА CTF 2023 ЛЕТНЯЯ ШКОЛА CTF 2023 ЛЕТНЯЯ ШКОЛА CTF 2023 ЛЕТНЯЯ ШКОЛА CTF 2023</p>-->
<!--            </marquee>-->
        </div>

        <img src="@/assets/SignInBackground.svg" alt="Задний фон" id="BgImage">

        <img src="@/assets/tagline.svg" alt="Привет! Мы - движение CTF, покупай фирменный мерч - оплачивай CTF-койнами" id="Tagline">

        <div id="Categories">
            <p v-for="category of categories" :key="category.id" :class="{ active: category.isActive }" @click="setBanner(category)">{{ category.title }}</p>
        </div>

        <div id="BannerWrapper">
            <TransitionGroup name="appearance">
                <div v-for="banner of banners" :key="banner.id" class="banner" v-show="banner.isActive">
                    <router-link :to="{ name: 'shopItems', params: { category: banner.title }}" class="bannerImgRoute" v-if="banner.id == 1">
                        <img src="@/assets/mugBanner.svg" alt="Баннер кружек">
                    </router-link>

                    <router-link :to="{ name: 'shopItems', params: { category: banner.title }}" class="bannerImgRoute" v-if="banner.id == 2">
                        <img src="@/assets/tshirtBanner.svg" alt="Баннер футболок">
                    </router-link>

                    <router-link :to="{ name: 'shopItems', params: { category: banner.title }}" class="bannerImgRoute" v-if="banner.id == 3">
                        <img src="@/assets/sweatshirtBanner.svg" alt="Баннер толстовок">
                    </router-link>

                    <router-link :to="{ name: 'shopItems', params: { category: banner.title }}" class="bannerImgRoute" v-if="banner.id == 4">
                        <img src="@/assets/bookBanner.svg" alt="Баннер книжек">
                    </router-link>
                </div>
            </TransitionGroup>
        </div>

        <span id="PopularShopItem_Text">
            <p>Популярные товары</p>

            <router-link to="/shopItems" class="seeMoreItemsRoute">Смотреть всe</router-link>
        </span>

        <div id="PopularShopItemsWrapper">
            <ShopItemCard
                :shopItems="shopItems"
                :initialShopItems="shopItems"
            />
        </div>

        <img src="@/assets/bugBountyBanner.svg" alt="BugBounty" id="BugBounty">
    </main>

    <TheFooterComp/>

    <TheCookieComp/>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import axios from "axios";
    import TheHeaderComp from '@/widgets/shared/TheHeaderComp.vue';
    import ShopItemCard from '@/widgets/shared/ShopItemCard.vue';
    import TheFooterComp from '@/widgets/shared/TheFooterComp.vue';
    import TheCookieComp from '@/widgets/shared/TheCookieComp.vue';

    interface Category {
        id: number,
        title: string,
        isActive: boolean
    }

    interface Banner {
        id: number,
        title: string,
        isActive: boolean
    }

    interface ShopItem {
        id: number,
        title: string,
        price: number,
        description: string,
        images: string[]
    }

    const targetId = ref(0);

    const categories = ref([
        {
            id: 1,
            title: 'Кружки',
            isActive: true
        },
        {
            id: 2,
            title: 'Футболки',
            isActive: false
        },
        {
            id: 3,
            title: 'Толстовки',
            isActive: false
        },
        {
            id: 4,
            title: 'Книги',
            isActive: false
        }
    ] as Category[]);

    const banners = ref([
        {
            id: 1,
            title: 'Кружки',
            isActive: true,
        },
        {
            id: 2,
            title: 'Футболки',
            isActive: false,
        },
        {
            id: 3,
            title: 'Толстовки',
            isActive: false,
        },
        {
            id: 4,
            title: 'Книги',
            isActive: false,
        },
    ] as Banner[]);

    const shopItems = ref([] as ShopItem[]);

    let bannerInterval:ReturnType<typeof setInterval> = setInterval(() => getNextPhoto(), 5000);

    const setBanner = (category:Category) => {
        banners.value.forEach(item => {
            if(item.title != category.title) {
                item.isActive = false;
            } else {
                item.isActive = true;
                targetId.value = item.id - 1;
            }
        });

        categories.value.forEach(item => item.isActive = false);

        category.isActive = true;

        clearInterval(bannerInterval);
        bannerInterval = setInterval(() => getNextPhoto(), 5000);
    }

    const getShopItems = (start:number, stop:number) => {
        const url = new URL(`https://ctfmarket.ru:8080/api/v1/product/${start}/${stop}`);

        axios.get(url.toString(), {
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        })
            .then((res) => {
                shopItems.value = Object.values(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getNextPhoto = () => {
        categories.value[targetId.value].isActive = false;
        banners.value[targetId.value].isActive = false;

        if(targetId.value === categories.value.length - 1) {
            targetId.value = -1;
        }

        targetId.value++;

        categories.value[targetId.value].isActive = true;
        banners.value[targetId.value].isActive = true;
    }

    onMounted(() => {
        if(window.innerWidth < 480) {
            getShopItems(0, 1);
        } else {
            getShopItems(0, 2);
        }
    })
</script>

<style lang="scss" scoped>
  main {
      position: relative;
      padding: 0 0 80px 0;
      width: 100%;
      height: auto;
      overflow: hidden;
      #MovingImgWrapper {
        padding-top: 90px;
        width: 100%;
        height: 135px;
        overflow: hidden;

        #TopLogoText {
            width: 100vw;
            height: 87.5px;

            span {
                display: flex;
                align-items: center;

                p {
                    color: #ffffff;
                    font-size: 94px;
                    font-weight: 900;
                    font-family: 'DM Sans', sans-serif;
                }

                img {
                    margin-top: -4px;
                    width: auto;
                    height: 100%;
                }
            }
        }

        #BottomLogoText {
            margin-top: 10px;
            width: 100vw;
            height: 60px;

            p {
                color: #ffffff;
                font-size: 38px;
                font-weight: 700;
                font-family: 'DM Sans', sans-serif;
                word-break: break-all;
            }
        }
      }

      #BgImage {
        position: absolute;
        top: 260px;
        width: 100%;
        background-size: cover;
        transform: scale(1.1);
        z-index: -1;
      }
      #Tagline {
          margin: 80px 10% 0 10%;
          width: 80%;
      }
      #Categories {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 15px;
        margin: 80px 42.5% 0 10%;
        width: 45%;
        height: 65px;
        background-color: #2c2d2d;
        border-radius: 40px;
        p {
            color: #ffffff;
            font-size: 22px;
            font-weight: 500;
            font-family: 'DM Sans', sans-serif;
            transition: 250ms ease;
            cursor: pointer;
        }
        .active {
            padding: 7.5px 35px;
            background-color: #42d4ba;
            border-radius: 30px;
        }
      }
      #BannerWrapper {
          position: relative;
          padding: 40px 10% 0 10%;
          width: 80%;
          height: 600px;
          overflow: hidden;
          .appearance-enter-active,
          .appearance-leave-active {
              transition: 1500ms ease;
          }
          .appearance-enter-from {
              transform: translateX(200%);
          }
          .appearance-enter-to {
              transform: translateX(0);
          }
          .appearance-leave-from {
              transform: translateX(0);
          }
          .appearance-leave-to {
              transform: translateX(-120%);
          }
          .banner {
              position: absolute;
              width: 80%;
              height: 600px;
              .bannerImgRoute {
                  img {
                      width: 100%;
                      height: 100%;
                      background-repeat: no-repeat;
                      border-radius: 35px 35px 0;
                      object-fit: cover;
                  }
              }
          }
      }
      #PopularShopItem_Text {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 60px 10%;
          width: 80%;
          height: 20px;
          p {
              color: #ffffff;
              font-size: 36px;
              font-weight: 500;
              font-family: 'DM Sans', sans-serif;
          }
          .seeMoreItemsRoute {
              color: #7f7f7f;
              font-size: 24px;
              font-weight: 500;
              font-family: 'DM Sans', sans-serif;
              text-decoration: none;
              outline: none;
          }
      }
      #PopularShopItemsWrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: -40px 10% 0 10%;
          width: 80%;
          height: auto;
      }

      #BugBounty {
          margin: 60px 10% 0 10%;
          width: 80%;
          height: 450px;
      }
  }

  @media(max-width: 480px) {
      main {
          padding: 0 0 20px 0;
          #MovingImgWrapper {
              padding-top: 50px;
              #TopLogoText {
                  position: relative;
                  height: 50px;
                  span {
                      p {
                          font-size: 52px;
                      }
                      img {
                          height: 50px;
                      }
                  }
              }
              #BottomLogoText {
                  position: relative;
                  margin-top: 5px;
                  height: 30px;
                  p {
                      margin-left: 2.5px;
                      width: 100%;
                      height: 30px;
                      font-size: 24px;
                      word-break: break-all;
                      overflow: hidden;
                  }
              }
          }

          #BgImage {
              top: 145px;
          }

          #Tagline {
              margin: -5px 5% 0 5%;
              width: 90%;
          }

          #Categories {
              padding: 0 2.5%;
              margin: 35px 5% 0 5%;
              width: 85%;
              height: 40px;
              p {
                  font-size: 14px;
              }
              .active {
                  padding: 5px 20px;
              }
          }

          .banner {
              margin: 20px 5% 0 5%;
              width: 90%;
              height: 40%;
              border-radius: 10px 10px 0;
              .bannerImgRoute {
                  img {
                      border-radius: 10px 10px 0;
                      object-fit: fill;
                  }
              }
          }
          #PopularShopItem_Text {
              margin: 20px 5% 10px 5%;
              width: 90%;
              height: 20px;
              p {
                  font-size: 20px;
              }
              .seeMoreItemsRoute {
                  margin-top: 2px;
                  font-size: 16px;
              }
          }

          #PopularShopItemsWrapper {
              margin: -15px 5% 0 5%;
              width: 90%;
          }

          #BugBounty {
              margin: 20px 5% 0 5%;
              width: 90%;
              height: 170px;
          }
      }
  }

  @media(max-width: 420px) {
      main {
          #Categories {
              height: 35px;
              p {
                  margin-top: 2px;
                  font-size: 12px;
              }
              .active {
                  padding: 4.5px 15px 3.5px 15px;
              }
          }
          #PopularShopItem_Text {
              p {
                  font-size: 18px;
              }
              .seeMoreItemsRoute {
                  font-size: 14px;
              }
          }
      }
  }

  @media(max-width: 400px) {
      main {
          #MovingImgWrapper {
              #TopLogoText {
                  height: 40px;
              }
              #BottomLogoText {
                  margin-top: 15px;
                  height: 20px;
              }
          }
      }
  }

  @media(max-width: 370px) {
      main {
          padding: 0 0 20px 0;
          #MovingImgWrapper {
              #TopLogoText {
                  height: 35px;
              }
              #BottomLogoText {
                  margin-top: 20px;
                  height: 20px;
              }
          }
          #Categories {
              height: 30px;
              p {
                  margin-top: 2px;
                  font-size: 10px;
              }
              .active {
                  padding: 4.5px 15px 3.5px 15px;
              }
          }
          #PopularShopItem_Text {
              p {
                  font-size: 16px;
              }
              .seeMoreItemsRoute {
                  font-size: 12px;
              }
          }
      }
  }

  @media(min-width: 1920px) and (min-height: 1080px) {
      main {
          #MovingImgWrapper {
              padding-top: 100px;
              height: 150px;

              #TopLogoText {
                  height: 100px;
                  span {
                      p {
                          font-size: 104px;
                      }
                  }
              }

              #BottomLogoText {
                  margin-top: 10px;
                  height: 60px;
                  p {
                      font-size: 44px;
                      word-break: break-all;
                  }
              }
          }

          #BgImage {
              top: 300px;
          }

          .banner {
              margin: 40px 10% 0 10%;
              height: 825px;
          }

          #BugBounty {
              height: 600px;
          }
      }
  }

  @media(min-width: 2560px) and (min-height: 1440px) {
      main {
          #MovingImgWrapper {
              padding-top: 130px;
              height: 170px;

              #TopLogoText {
                  height: 100px;
                  span {
                      p {
                          font-size: 112px;
                      }
                      img {
                          height: 110px;
                      }
                  }
              }

              #BottomLogoText {
                  margin-top: 15px;
                  height: 80px;
                  p {
                      font-size: 52px;
                      word-break: break-all;
                  }
              }
          }

          #BgImage {
              top: 355px;
          }

          #Categories {
              padding: 0 35px;
              height: 75px;

              p {
                  font-size: 28px;
              }
              .active {
                  padding: 10px 30px;
              }
          }

          .banner {
              margin: 60px 10% 0 10%;
              height: 1100px;
          }

          #BugBounty {
              height: 800px;
          }
      }
  }
</style>
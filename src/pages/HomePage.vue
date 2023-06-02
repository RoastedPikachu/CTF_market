<template>
    <TheHeaderComp/>

    <main>
        <div id="MovingImgWrapper">
            <img src="@/assets/topLogoText.svg" alt="CTFMarket" id="TopLogoText">

            <img src="@/assets/bottomLogoText.svg" alt="Летняя школа CTF 2023" id="BottomLogoText">
        </div>

        <img src="@/assets/SignInBackground.svg" alt="Задний фон" id="BgImage">

        <img src="@/assets/tagline.svg" alt="Привет! Мы - движение CTF, покупай фирменный мерч - оплачивай CTF-койнами" id="Tagline">

        <div id="Categories">
            <p v-for="category of categories" :key="category.id" :class="{ active: category.isActive }" @click="setBanner(category)">{{ category.title }}</p>
        </div>

        <div v-for="banner of banners" :key="banner.id" class="banner" v-show="banner.isActive">
            <router-link to="/shopItems" class="bannerImgRoute" v-if="banner.id == 1">
                <img src="@/assets/mugBanner.svg" alt="Баннер кружек">
            </router-link>

            <router-link to="/shopItems" class="bannerImgRoute" v-if="banner.id == 2">
                <img src="@/assets/tshirtBanner.svg" alt="Баннер футболок">
            </router-link>

            <router-link to="/shopItems" class="bannerImgRoute" v-if="banner.id == 3">
                <img src="@/assets/sweatshirtBanner.svg" alt="Баннер толстовок">
            </router-link>

            <router-link to="/shopItems" class="bannerImgRoute" v-if="banner.id == 4">
                <img src="@/assets/bookBanner.svg" alt="Баннер книжек">
            </router-link>
        </div>

        <span id="PopularShopItem_Text">
            <p>Популярные товары</p>

            <router-link to="/shopItems" class="seeMoreItemsRoute">Смотреть всe</router-link>
        </span>

        <div id="PopularShopItemsWrapper">
            <ShopItemCard :shopItems="shopItems"/>
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

        setInterval(() => getNextPhoto(), 5000);
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
        padding-top: 100px;
        width: 100%;
        overflow: hidden;
        #TopLogoText {
            margin-left: 1px;
            width: 100%;
            height: 70px;
            transform: scale(2);
            background-size: cover;
        }
        #BottomLogoText {
            margin-top: -10px;
            margin-left: 1px;
            width: 100%;
            height: 40px;
            background-size: cover;
            transform: scale(2);
        }
      }
      #BgImage {
        position: absolute;
        top: 230px;
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
        justify-content: space-between;
        align-items: center;
        padding: 0 25px;
        margin: 80px 45% 0 10%;
        width: 42.5%;
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
      .banner {
          position: relative;
          margin: 40px 10% 0 10%;
          width: 80%;
          height: 640px;
          .bannerImgRoute {
              width: 100%;
              height: 100%;
              img {
                  width: 100%;
                  height: 100%;
                  border-radius: 35px 35px 0;
                  background-repeat: no-repeat;
                  object-fit: cover;
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
          padding: 0 0 50px 0;
          #MovingImgWrapper {
              padding-top: 50px;
              #TopLogoText {
                  height: 50px;
                  transform: scale(4);
              }
              #BottomLogoText {
                  height: 30px;
                  transform: scale(4);
              }
          }
          #BgImage {
            top: 110px;
          }
          #Tagline {
              margin: 30px 5% 0 5%;
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
              margin: 0 5%;
              width: 90%;
              height: 260px;
          }
          #PopularShopItem_Text {
              margin: 10px 5%;
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
      }
  }

  @media(max-width: 480px) {
      main {
          padding: 0 0 20px 0;
          #MovingImgWrapper {
              #TopLogoText {
                  height: 40px;
              }
              #BottomLogoText {
                  height: 35px;
              }
          }
          .banner {
              margin-top: 20px;
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
              margin-top: 20px;
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
              padding-top: 120px;

              #TopLogoText {
                  height: 70px;
              }

              #BottomLogoText {
                  margin-top: 5px;
                  height: 60px;
              }
          }

          #BgImage {
              top: 290px;
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
              padding-top: 150px;

              #TopLogoText {
                  height: 70px;
              }

              #BottomLogoText {
                  margin-top: 15px;
                  height: 60px;
              }
          }

          #BgImage {
              top: 310px;
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
              height: 1000px;
          }

          #BugBounty {
              height: 800px;
          }
      }
  }
</style>
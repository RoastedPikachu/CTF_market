<template>
    <TheHeaderComp/>

    <main>
        <div id="MovingImgWrapper">
            <img src="@/assets/topLogoText.svg" alt="CTFMarket" id="TopLogoText">

            <img src="@/assets/bottomLogoText.svg" alt="Летняя школа CTF 2023" id="BottomLogoText">
        </div>

        <img src="@/assets/SignInBackground.svg" alt="Задний фон" id="BgImage">

        <div id="Categories">
            <p v-for="category of categories" :key="category.id" :class="{ active: category.isActive }">{{ category.title }}</p>
        </div>

        <div v-for="banner of banners" :key="banner.id" class="banner" v-show="banner.isActive">
            <img src="@/assets/mugBanner.svg" alt="Баннер для кружек" v-if="banner.id === 1">
        </div>

        <span id="PopularShopItem_Text">
            <p>Популярные товары</p>

            <router-link to="/shopItems" class="seeMoreItemsRoute">Смотреть всe</router-link>
        </span>

        <div id="PopularShopItemsWrapper">
            <ShopItemCard :shopItems="shopItems"/>
        </div>
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
            title: 'Браслеты',
            isActive: false
        }
    ] as Category[]);

    const banners = ref([
        {
            id: 1,
            isActive: true,
        },
        {
            id: 2,
            isActive: false,
        },
        {
            id: 3,
            isActive: false,
        },
        {
            id: 4,
            isActive: false,
        },
    ] as Banner[]);

    const shopItems = ref([] as ShopItem[]);

    const getShopItems = (start:number, stop:number) => {
        const url = new URL(`http://79.174.12.75:3134/api/v1/product/${start}/${stop}`);

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
        getShopItems(0, 3);

        setInterval(() => getNextPhoto(), 5000);
    })
</script>

<style lang="scss" scoped>
  main {
      position: relative;
      padding: 0 0 100px 0;
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
      #Categories {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 25px;
        margin: 450px 45% 0 10%;
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
          border-radius: 35px 35px 0;
          overflow: hidden;
          img {
              position: absolute;
              width: 100%;
              height: 100%;
              background-size: cover;
              background-repeat: no-repeat;
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
          #Categories {
              padding: 0 2.5%;
              margin: 20px 5% 0 5%;
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

  @media(max-width: 360px) {
      main {
          padding: 0 0 30px 0;
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
          .banner {
              height: 210px;
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
</style>
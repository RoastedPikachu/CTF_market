<template>
    <TheHeaderComp/>

    <main>
        <img src="@/assets/shopItemsLogo.svg" alt="CTFMarket. Летняя школа CTF 2023" id="ShopItemsLogo">

        <div id="MainShopItemInfo">
            <div id="MainShopItemInfo_Images">
                <img :src="item.images[targetImageIndex]" :alt="item.description" class="mainShopItemInfo_Images_Photo">

                <span>
                    <img src="@/assets/arrowRightIcon.svg" alt="Назад" @click="getPreviousPhoto()">
                    <img src="@/assets/arrowRightIcon.svg" alt="Вперёд" @click="getNextPhoto()">
                </span>
            </div>

            <aside>
                <h2>{{ item.title }}</h2>

                <p>{{ item.description }}</p>

                <p>Цена: {{ item.price }} баллов</p>

                <div>
                    <p>Размеры</p>

                    <button v-for="size of sizes" :key="size.id" :class="{ active: size.isActive }" @click="changeSizeIsActive(size)">{{ size.prop }}</button>
                </div>

                <button id="AddToShoppingCart" @click="addItemToShoppingCart(item)">В корзину</button>
            </aside>
        </div>
    </main>

    <TheFooterComp/>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import TheHeaderComp from '@/widgets/shared/TheHeaderComp.vue';
  import TheFooterComp from '@/widgets/shared/TheFooterComp.vue';
  import store from "@/store";

  interface ShopItem {
      id: number,
      title: string,
      price: string,
      description: string,
      images: string[]
  }

  const route = useRoute();

  const item = ref({
      id: 0,
      title: '',
      price: '',
      description: '',
      images: [] as string[]
  } as ShopItem);
  const sizes = ref([
      {
          id: 1,
          prop: 'XS',
          isActive: false,
      },
      {
          id: 2,
          prop: 'S',
          isActive: false
      },
      {
          id: 3,
          prop: 'M',
          isActive: false
      },
      {
          id: 4,
          prop: 'L',
          isActive: false
      },
      {
          id: 5,
          prop: 'XL',
          isActive: false
      },
      {
          id: 6,
          prop: 'XXL',
          isActive: false
      }
  ]);

  const isSizesActive = ref(false);

  const targetSize = ref('');
  const targetImageIndex = ref(0);

  const changeSizeIsActive = (size:any) => {
      sizes.value.forEach(item => item.isActive = false);
      targetSize.value = size.prop;
      size.isActive = true;
  }

  const addItemToShoppingCart = (item:ShopItem) => {
      const targetItem = sizes.value.find(item => item.isActive === true);
      let size = '';

      if(isSizesActive.value) {
          size = targetSize.value;
      } else {
          size = 'all';
      }

      store.dispatch('addItemToShoppingCart', {
          id: Math.random() * 1000000,
          photo: item.images[0],
          title: item.title,
          price: item.price,
          size: size,
          count: 1
      });
  }

  const getInfoAboutShopItem = () => {
      const url = new URL(`http://5.188.178.143:8080/api/v1/product/${route.params.id}`);

      axios.get(url.toString(), {
          headers: { 'Content-Type': 'application/json;charset=utf-8' }
      })
          .then((res:any) => {
              item.value = res.data;
          })
          .catch((error:any) => {
              console.log(error);
          })
  }

  const getPreviousPhoto = () => {
      if(targetImageIndex.value === 0) {
          targetImageIndex.value = item.value.images.length;
      }

      targetImageIndex.value--;
  };

  const getNextPhoto = () => {
      if(targetImageIndex.value === item.value.images.length - 1) {
          targetImageIndex.value = -1;
      }

      targetImageIndex.value++;
  };

  onMounted(() => {
      getInfoAboutShopItem();
  })
</script>

<style lang="scss" scoped>
  main {
    margin: 0 12.5%;
    width: 75%;
    height: 900px;
    #ShopItemsLogo {
      margin-top: 100px;
      width: 45%;
      height: 120px;
    }
    #MainShopItemInfo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;
      padding-bottom: 50px;
      width: 100%;
      height: 600px;
      #MainShopItemInfo_Images {
        width: 42.5%;
        height: 100%;
        .mainShopItemInfo_Images_Photo {
          width: 100%;
          height: 85%;
          background-color: #ffffff;
          border-radius: 40px;
          object-fit: cover;
        }
        span {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 30%;
          width: 40%;
          height: 15%;
          img {
            width: 45%;
            height: 35%;
            background-color: transparent;
            cursor: pointer;
          }
          img:first-child {
            transform: rotate(180deg);
          }
        }
      }
      aside {
        width: 50%;
        height: 100%;
        h2 {
          color: #ffffff;
          font-size: 38px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
        }
        p {
          margin-top: 30px;
          color: rgba(255, 255, 255, 0.4);;
          font-size: 26px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
        }
        p:nth-child(3) {
            color: #ffffff;
        }
        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 30px;
          width: 40%;
          height: 180px;
          p {
            margin-top: 0;
            width: 100%;
            color: #ffffff;
            font-size: 22px;
          }
          button {
            display: flex;
            align-items: center;
            padding: 2px 20px 0px;
            width: auto;
            height: 50px;
            background-color: #434343;
            border: 1px solid #7f7f7f;
            border-radius: 10px;
            color: #ffffff;
            font-size: 18px;
            cursor: pointer;
            transition: 400ms ease;
          }
          .active {
            background-color: #42d4ba;
            border: 1px solid #42d4ba;
          }
        }
        #AddToShoppingCart {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
            width: 80%;
            height: 60px;
            background-color: #42d4ba;
            border: none;
            border-radius: 15px;
            color: #ffffff;
            font-size: 18px;
            font-weight: 700;
            font-family: 'DM Sans', sans-serif;
            cursor: pointer;
            outline: none;
        }
      }
    }
  }

  @media(max-width: 480px) {
      main {
          margin: 0 5%;
          width: 90%;
          height: 850px;

          #ShopItemsLogo {
              margin-top: 50px;
              width: 60%;
              height: 50px;
          }

          #MainShopItemInfo {
              display: block;
              margin-top: 20px;

              #MainShopItemInfo_Images {
                  width: 100%;
                  height: 50%;

                  img {
                      height: 100%;
                  }

                  span {
                      display: none;
                  }
              }

              aside {
                  margin-top: 20px;
                  padding-bottom: 20px;
                  width: 100%;
                  height: auto;

                  h2 {
                      font-size: 26px;
                  }

                  p {
                      margin-top: 20px;
                      font-size: 22px;
                  }

                  p:nth-child(2) {
                      margin-top: 10px;
                  }

                  div {
                      margin-top: 10px;
                      width: 55%;
                  }

                  #AddToShoppingCart {
                      width: 65%;
                      height: 50px;
                  }
              }
          }
      }
  }

  @media(max-width: 380px) {
      main {
          #ShopItemsLogo {
              margin-top: 50px;
              width: 65%;
              height: 55px;
          }

          #MainShopItemInfo {
              display: block;
              margin-top: 10px;

              aside {
                  h2 {
                      font-size: 24px;
                  }

                  p {
                      margin-top: 20px;
                      font-size: 20px;
                  }

                  div {
                      margin-top: 10px;
                      width: 62.5%;
                  }

                  #AddToShoppingCart {
                      width: 70%;
                      height: 50px;
                  }
              }
          }
      }
  }

  @media(min-width: 1920px) and (min-height: 1080px) {
      main {
          margin: 0;
          padding: 0 12.5% 0 17.5%;
          width: 70%;

          #ShopItemsLogo {
              width: 37.5%;
          }

          #MainShopItemInfo {
              aside {
                  div {
                      width: 32.5%;
                  }
              }
          }
      }
  }

  @media(min-width: 2560px) and (min-height: 1440px) {
      main {
          padding: 0 12.5% 0 22.5%;
          width: 65%;
          height: 1200px;
          #ShopItemsLogo {
              margin-top: 130px;
              width: 32.5%;
              height: 130px;
          }

          #MainShopItemInfo {
              margin-top: 40px;
              height: 850px;

              aside {
                  h2 {
                      font-size: 42px;
                  }

                  p {
                      margin-top: 40px;
                      font-size: 32px;
                  }

                  p:nth-child(2) {
                      margin-top: 30px;
                  }

                  div {
                      width: 30%;
                      height: 220px;

                      p {
                          font-size: 32px;
                          height: 40px;
                      }

                      button {
                          padding: 2px 22.5px 0;
                          height: 65px;
                          font-size: 28px;
                      }
                  }

                  #AddToShoppingCart {
                      margin-top: 30px;
                      width: 45%;
                      height: 70px;
                      font-size: 24px;
                  }
              }
          }
      }
  }
</style>
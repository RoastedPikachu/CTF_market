<template>
    <TheHeaderComp/>

    <main>
        <img src="@/assets/shopItemsLogo.svg" alt="CTFMarket. Летняя школа CTF 2023" id="ShopItemsLogo">

        <div id="MainShopItemInfo">
            <div id="MainShopItemInfo_Images">
                <img :src="item.images[targetImageIndex]"
                     :alt="item.description"
                     class="mainShopItemInfo_Images_Photo"
                     @touchstart="firstTouchCoordinates = $event.changedTouches[0].pageX;"
                     @touchend="changePhotoByTouch($event, getNextPhoto, getPreviousPhoto)"
                >

                <span>
                    <img src="@/assets/arrowRightIcon.svg" alt="Назад" @click="getPreviousPhoto()">
                    <img src="@/assets/arrowRightIcon.svg" alt="Вперёд" @click="getNextPhoto()">
                </span>
            </div>

            <aside>
                <h2>{{ item.title }}</h2>

                <p>{{ item.description }}</p>

                <p>Цена: {{ item.price }} баллов</p>

                <div v-if="isSizesActive">
                    <p>Размеры</p>

                    <button v-for="size of sizes" :key="size.id" :class="{ active: size.isActive }" @click="changeSizeIsActive(size)">{{ size.prop }}</button>
                </div>

                <div id="AlertAboutNotSignIn" v-if="isAlertActive">
                    <p>Невозможно добавить товар, войдите в аккаунт</p>

                    <img src="@/assets/greyXMarkIcon.svg" alt="Закрыть" @click="isAlertActive = !isAlertActive">
                </div>

                <button class="addToShoppingCart" :class="{ activeAdding: !isSignIn }" @click="addItemToShoppingCart(item)">В корзину</button>
            </aside>
        </div>
    </main>

    <TheFooterComp/>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import store from "@/store";

  import touchMixins from '@/mixins/touchMixins.js';
  import axiosMixins from '@/mixins/axiosMixins.js';

  import TheHeaderComp from '@/widgets/shared/TheHeaderComp.vue';
  import TheFooterComp from '@/widgets/shared/TheFooterComp.vue';

  interface Size {
      name: string,
      count: number
  }

  interface ShopItem {
      id: number,
      title: string,
      price: string,
      description: string,
      images: string[],
      sizes: Size[],
  }

  const route = useRoute();

  const { firstTouchCoordinates, lastTouchCoordinates, changePhotoByTouch } = touchMixins();
  const { api, initAPI } = axiosMixins();

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
          count: 0,
      },
      {
          id: 2,
          prop: 'S',
          isActive: false,
          count: 0,
      },
      {
          id: 3,
          prop: 'M',
          isActive: false,
          count: 0,
      },
      {
          id: 4,
          prop: 'L',
          isActive: false,
          count: 0,
      },
      {
          id: 5,
          prop: 'XL',
          isActive: false,
          count: 0,
      },
      {
          id: 6,
          prop: 'XXL',
          isActive: false,
          count: 0,
      }
  ]);

  const isSignIn = ref(store.state.isSignIn);
  const isAlertActive = ref(!store.state.isSignIn);
  const isSizesActive = ref(false);

  const targetSize = ref('');
  const targetImageIndex = ref(0);

  const changeSizeIsActive = (size:any) => {
      if(size.count > 0) {
          sizes.value.forEach(item => item.isActive = false);

          targetSize.value = size.prop;

          size.isActive = true;
      }
  }

  const addItemToShoppingCart = (item:ShopItem) => {
      if(isSignIn.value) {
          let size:string;

          if(isSizesActive.value) {
              size = targetSize.value;
          } else {
              size = 'all';
          }

          store.dispatch('addItemToShoppingCart', {
              id: item.id,
              photo: item.images[0],
              title: item.title,
              price: item.price,
              size: size,
              count: 1
          });
      }
  }

  const getInfoAboutShopItem = () => {
      const url = new URL(`https://ctfmarket.ru:8080/api/v1/product/${route.params.id}`);

      api.get(url.toString())
          .then((res:any) => {
              console.log('Это что товар, а думал сова!');
              item.value = res.data;

              item.value.sizes.forEach(itemSize => {
                  sizes.value.forEach(item => {
                      if(item.prop === itemSize.name) {
                          item.count = itemSize.count;
                      }
                  });
              });

              let isSizeFinded = false;

              sizes.value.forEach(item => {
                  if(!isSizeFinded) {
                      if(item.count) {
                          item.isActive = true;
                          isSizeFinded = true;
                      }
                  }
              })

              switch(res.data.category) {
                  case 'Футболки': isSizesActive.value = true;
                    break;

                  case 'Толстовки': isSizesActive.value = true;
                    break;
              }
          });
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
      initAPI(false);

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
            position: relative;
            display: flex;
            align-items: center;
            padding: 2px 20px 0;
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
        #AlertAboutNotSignIn {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
            padding: 10px 20px;
            width: 62.5%;
            height: 80px;
            background-color: #1e1e1e;
            border: 2px solid #4b4b4b;
            border-radius: 20px;
            p {
                color: #fa3e3e;
                font-size: 20px;
                font-weight: 700;
                font-family: 'DM Sans', sans-serif;
                line-height: 35px;
            }
            img {
                position: absolute;
                width: 17.5px;
                height: 17.5px;
                top: 20px;
                right: 20px;
                cursor: pointer;
            }
        }
        .addToShoppingCart {
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
        .activeAdding {
            background-color: #434343;
            color: #9a9a9a;
        }
      }
    }
  }

  @media(max-width: 480px) {
      main {
          margin: 0 5%;
          padding-bottom: 30px;
          width: 90%;
          height: auto;
          min-height: 900px;

          #ShopItemsLogo {
              margin-top: 50px;
              width: 60%;
              height: 50px;
          }

          #MainShopItemInfo {
              display: block;
              margin-top: 20px;
              padding-bottom: 0;
              height: auto;

              #MainShopItemInfo_Images {
                  width: 100%;
                  height: 60%;

                  .mainShopItemInfo_Images_Photo {
                      height: 100%;
                      border-radius: 30px;
                  }

                  span {
                      display: none;
                  }
              }

              aside {
                  margin-top: 20px;
                  padding-bottom: 0;
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

                  #AlertAboutNotSignIn {
                      padding: 7.5px 15px;
                      width: calc(65% - 30px);
                      height: 70px;

                      p {
                          font-size: 16px;
                          line-height: 30px;
                      }

                      img {
                          top: 17.5px;
                          right: 15px;
                          width: 15px;
                          height: 15px;
                      }
                  }

                  .addToShoppingCart {
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

                  #AlertAboutNotSignIn {
                      width: calc(70% - 30px);
                      height: 60px;

                      p {
                          padding: 0 10% 0 0;
                          font-size: 14px;
                          line-height: 30px;
                      }

                      img {
                          top: 15px;
                          width: 15px;
                          height: 15px;
                      }
                  }

                  .addToShoppingCart {
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

                  #AlertAboutNotSignIn {
                      width: 55%;

                      p {
                          font-size: 22px;
                      }

                      img {
                          width: 20px;
                          height: 20px;
                      }
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

                  #AlertAboutNotSignIn {
                      margin-top: 30px;
                      width: calc(60% - 40px);
                      height: 90px;

                      p {
                          font-size: 26px;
                          height: auto;
                      }

                      img {
                          top: 25px;
                          width: 22.5px;
                          height: 22.5px;
                      }
                  }

                  .addToShoppingCart {
                      margin-top: 30px;
                      width: 60%;
                      height: 80px;
                      font-size: 24px;
                  }
              }
          }
      }
  }
</style>
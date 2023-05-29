<template>
    <TheHeaderComp/>

    <main>
        <img src="@/assets/shopItemsLogo.svg" alt="CTFMarket. Летняя школа CTF 2023" id="ShopItemsLogo">

        <div id="MainShopItemInfo">
            <div id="MainShopItemInfo_Images">
                <img :src="item.images[0]" :alt="item.description">

                <span>
                    <img src="@/assets/arrowRightIcon.svg" alt="Вперёд">
                    <img src="@/assets/arrowRightIcon.svg" alt="Назад">
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

  const changeSizeIsActive = (size:any) => {
      sizes.value.forEach(item => item.isActive = false);
      size.isActive = true;
  }

  const addItemToShoppingCart = (item:ShopItem) => {
      store.dispatch('addItemToShoppingCart', {
          id: Math.random() * 1000000,
          image: item.images[0],
          title: item.title,
          cost: item.price,
          count: 1
      });
  }

  const getInfoAboutShopItem = () => {
      const url = new URL(`http://79.174.12.75:3134/api/v1/product/${route.params.id}`);

      axios.get(url.toString(), {
          headers: { 'Content-Type': 'application/json;charset=utf-8' }
      })
          .then((res:any) => {
              console.log(res);
              item.value = res.data;
          })
          .catch((error:any) => {
              console.log(error);
          })
  }

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
        img {
          width: 100%;
          height: 85%;
          background-color: #ffffff;
          border-radius: 40px;
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

  }
</style>
<template>
    <TheHeaderComp/>

    <main>
        <img src="@/assets/shopItemsLogo.svg" alt="CTFMarket. Летняя школа CTF 2023" id="ShopItemsLogo">

        <div id="MainShopItemInfo">
            <div id="MainShopItemInfo_Images">
                <img src="" alt="">

                <span>
                    <img src="@/assets/arrowRightIcon.svg" alt="Вперёд">
                    <img src="@/assets/arrowRightIcon.svg" alt="Назад">
                </span>
            </div>

            <aside>
                <h2>Футболка с принтом</h2>

                <p>Описание</p>

                <p>Цена: 10000 баллов</p>

                <div>
                    <p>Размеры</p>

                    <button v-for="size of sizes" :key="size.id">{{ size.prop }}</button>
                </div>

                <button>В корзину</button>
            </aside>
        </div>
    </main>

    <TheFooterComp/>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import TheHeaderComp from '@/widgets/shared/TheHeaderComp.vue';
  import TheFooterComp from '@/widgets/shared/TheFooterComp.vue';

  const sizes = ref([
      {
          id: 1,
          prop: 'XS'
      },
      {
          id: 2,
          prop: 'S'
      },
      {
          id: 3,
          prop: 'M'
      },
      {
          id: 4,
          prop: 'L'
      },
      {
          id: 5,
          prop: 'XL'
      },
      {
          id: 6,
          prop: 'XXL'
      }
  ]);
</script>

<style lang="scss" scoped>
  main {
    margin: 0 12.5%;
    width: 75%;
    height: 800px;
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
      }
    }
  }
</style>
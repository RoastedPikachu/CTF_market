<template>
  <TheHeaderComp/>

  <main>
      <img src="@/assets/shopItemsLogo.svg" alt="CTFMarket. Летняя школа CTF 2023" id="ShopItemsLogo">

      <div id="ShopItemsNav">
          <button @click="isModalFilterActive = !isModalFilterActive">
              <img src="@/assets/filterIcon.svg" alt="Фильтры">
              Фильтры
          </button>
      </div>

      <Transition>
          <div id="ModalFilterWindow" v-if="isModalFilterActive">
              <div id="ModalFilterWindow_Categories">
                  <p>Категория</p>

                  <span>
                      <p
                          v-for="category of categories"
                          :key="category.id"
                          :class="{ categoryActive: category.isActive }"
                          @click="category.isActive = !category.isActive"
                      >
                          {{ category.title }}
                      </p>
                  </span>
              </div>

              <div id="ModalFilterWindow_Sizes" v-if="categories[1].isActive || categories[2].isActive">
                  <p>Размеры</p>

                  <div>
                      <button
                          v-for="size of sizes"
                          :key="size.id"
                          :class="{ active: size.isActive }"
                          @click="size.isActive = !size.isActive"
                      >
                          {{ size.prop }}
                      </button>
                  </div>
              </div>

              <div id="ModalFilterWindow_Price">
                  <p>Цена</p>

                  <div>
                      <input type="text" placeholder="Мин. цена" v-model="minPrice">

                      <input type="text" placeholder="Макс. цена" v-model="maxPrice">
                  </div>
              </div>

              <button id="ModalFilterWindow_Accept" @click="filterShopItems()">Применить</button>

              <button id="ModalFilterWindow_Reset" @click="shopItems = initialShopItems">Сбросить фильтры</button>
          </div>
      </Transition>

      <section id="ShopItemsContainer">
          <ShopItemCard :shopItems="shopItems"/>
      </section>
  </main>

  <TheFooterComp/>
</template>

<script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    import axios from "axios";
    import TheHeaderComp from '@/widgets/shared/TheHeaderComp.vue';
    import ShopItemCard from '@/widgets/shared/ShopItemCard.vue';
    import TheFooterComp from '@/widgets/shared/TheFooterComp.vue';

    interface ShopItem {
      id: number,
      title: string,
      price: number,
      description: string,
      images: string[]
    }

    interface Category {
      id: number,
      title: string,
      isActive: boolean,
    }

    interface Size {
      id: number,
      prop: string,
      isActive: boolean,
    }

    const isModalFilterActive = ref(false);

    const initialShopItems = ref([] as ShopItem[]);
    const shopItems = ref([] as ShopItem[]);

    const categories = ref([
      {
          id: 1,
          title: 'Кружки',
          isActive: false,
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
          title: 'Браслеты',
          isActive: false,
      },
    ] as Category[]);

    const sizes = ref([
      {
          id: 1,
          prop: 'XS',
          isActive: false,
      },
      {
          id: 2,
          prop: 'S',
          isActive: false,
      },
      {
          id: 3,
          prop: 'M',
          isActive: false,
      },
      {
          id: 4,
          prop: 'L',
          isActive: false,
      },
      {
          id: 5,
          prop: 'XL',
          isActive: false,
      },
    ] as Size[]);

    const minPrice = ref('');
    const maxPrice = ref('');

    const filterShopItems = () => {
      shopItems.value = shopItems.value.filter(item => item.price >= +minPrice.value && item.price <= +maxPrice.value);
    };

    const getShopItems = (start:number, stop:number) => {
        const url = new URL(`http://79.174.12.75:3134/api/v1/product/${start}/${stop}`);

        axios.get(url.toString(),  {
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        })
            .then((res) => {
                console.log(res.data)
                shopItems.value = Object.values(res.data);
                initialShopItems.value = Object.values(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onMounted(() => {
        getShopItems(0, 9);
    });
</script>

<style lang="scss" scoped>
  main {
    margin: 0 10%;
    width: 80%;
    min-height: 1300px;
    height: auto;
    #ShopItemsLogo {
      padding-top: 100px;
      width: 50%;
      height: 150px;
    }
    #ShopItemsNav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 60%;
      height: 120px;
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        width: 195px;
        height: 60px;
        background-color: #42d4ba;
        border: none;
        border-radius: 30px;
        color: #ffffff;
        font-size: 24px;
        font-weight: 500;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        outline: none;
        img {
          margin-right: 10px;
        }
      }
      p {
        color: #ffffff;
        font-size: 24px;
        font-weight: 500;
        font-family: 'DM Sans', sans-serif;
      }
      p:nth-child(2) {
        margin-left: -30px;
      }
    }
    .v-enter-active,
    .v-leave-active {
        transition: 250ms ease;
    }
    .v-enter-from {
        margin-top: -20px;
        opacity: 0;
    }
    .v-enter-to {
        margin-top: 0px;
        opacity: 1;
    }
    .v-leave-from {
        margin-top: 0px;
        opacity: 1;
    }
    .v-leave-to {
        margin-top: -20px;
        opacity: 0;
    }
    #ModalFilterWindow {
        padding-bottom: 20px;
        width: 100%;
        min-height: 360px;
        height: auto;
        #ModalFilterWindow_Categories {
            height: 90px;
            p {
                color: #ffffff;
                font-size: 28px;
                font-weight: 500;
                font-family: 'DM Sans', sans-serif;
            }
            span {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 55%;
                height: 50px;
                p {
                    color: #7f7f7f;
                    font-size: 24px;
                    font-weight: 400;
                    cursor: pointer;
                    transition: 250ms ease;
                }
                .categoryActive {
                    padding: 5px 20px;
                    background-color: #42d4ba;
                    border-radius: 30px;
                    color: #ffffff;
                }
            }
        }
        #ModalFilterWindow_Sizes {
            margin-top: 15px;
            height: 130px;
            p {
                color: #ffffff;
                font-size: 28px;
                font-weight: 500;
                font-family: 'DM Sans', sans-serif;
            }
            div {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                margin-top: 15px;
                width: 27.5%;
                height: 80px;
                button {
                    display: flex;
                    align-items: center;
                    padding: 2px 15px 0px;
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
        #ModalFilterWindow_Price {
            margin-top: 10px;
            height: 110px;
            p {
                color: #ffffff;
                font-size: 28px;
                font-weight: 500;
                font-family: 'DM Sans', sans-serif;
            }
            div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 15px;
                width: 37.5%;
                height: 50px;
                input {
                    padding: 0 15px;
                    height: 100%;
                    width: 40%;
                    background-color: #434343;
                    border: 1px solid #bababa;
                    border-radius: 15px;
                    color: #bababa;
                    font-size: 20px;
                    font-weight: 500;
                    outline: none;
                }
                ::placeholder {
                    color: #bababa;
                    font-size: 20px;
                    font-weight: 500;
                }
            }
        }
        #ModalFilterWindow_Accept {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 25px;
            width: 32.5%;
            height: 60px;
            background-color: #42d4ba;
            border: none;
            border-radius: 15px;
            color: #ffffff;
            font-size: 22px;
            font-weight: 700;
            font-family: 'DM Sans', sans-serif;
            cursor: pointer;
        }
        #ModalFilterWindow_Reset {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 15px;
            width: 32.5%;
            height: 60px;
            background-color: #434343;
            border: none;
            border-radius: 15px;
            color: #ffffff;
            font-size: 22px;
            font-weight: 700;
            font-family: 'DM Sans', sans-serif;
            cursor: pointer;
        }
    }
    #ShopItemsContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        margin-top: -20px;
        padding: 20px 0;
        width: 100%;
        height: auto;
    }
  }

</style>
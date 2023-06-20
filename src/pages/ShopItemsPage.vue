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

              <button id="ModalFilterWindow_Reset" @click="shopItems = initialShopItems; minPrice = ''; maxPrice = ''">Сбросить фильтры</button>
          </div>
      </Transition>

      <section id="ShopItemsContainer">
          <ShopItemCard
              :shopItems="shopItems"
              :initialShopItems="initialShopItems"
          />
      </section>
  </main>

  <TheFooterComp/>
</template>

<script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    import axiosMixins from '@/mixins/axiosMixins.js';

    import TheHeaderComp from '@/widgets/shared/TheHeaderComp.vue';
    import ShopItemCard from '@/widgets/shared/ShopItemCard.vue';
    import TheFooterComp from '@/widgets/shared/TheFooterComp.vue';

    interface ShopItem {
      id: number,
      title: string,
      price: number,
      description: string,
      category: string,
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

    const route = useRoute();

    const { api, initAPI } = axiosMixins();

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
          title: 'Книги',
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
      {
          id: 6,
          prop: 'XXL',
          isActive: false
      }
    ] as Size[]);

    const minPrice = ref('');
    const maxPrice = ref('');

    const filterShopItems = (category?:string) => {
      if(minPrice.value && maxPrice.value) {
          shopItems.value = initialShopItems.value;

          shopItems.value = shopItems.value.filter(item => item.price >= +minPrice.value && item.price <= +maxPrice.value);
      } else if(maxPrice.value) {
          shopItems.value = initialShopItems.value;

          shopItems.value = shopItems.value.filter(item => item.price <= +maxPrice.value);
      } else if(minPrice.value) {
          shopItems.value = initialShopItems.value;

          shopItems.value = shopItems.value.filter(item => item.price >= +minPrice.value);
      }

      const targetCategories = [] as string[];

      if(category) {
          targetCategories.push(category);
      } else {
          categories.value.forEach(item => {
              if(item.isActive) {
                  targetCategories.push(item.title);
              }
          })
      }

      if(targetCategories.length) {
          shopItems.value = initialShopItems.value;

          shopItems.value = shopItems.value.filter(item => targetCategories.includes(item.category));
      }
    };

    const getShopItems = (start:number, stop:number) => {
        const url = new URL(`https://ctfmarket.ru:8080/api/v1/product/${start}/${stop}`);

        api.get(url.toString())
            .then((res:any) => {
                shopItems.value = Object.values(res.data);
                initialShopItems.value = Object.values(res.data);

                if(route.params.category) {
                    const category:string = route.params.category as string;

                    filterShopItems(category);
                }
            });
    }

    onMounted(() => {
        initAPI(false);

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
        margin-top: 0;
        opacity: 1;
    }
    .v-leave-from {
        margin-top: 0;
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
                width: 35%;
                height: 70px;
                button {
                    display: flex;
                    align-items: center;
                    padding: 2px 15px 0;
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

  @media(max-width: 480px) {
      main {
          margin: 0;
          padding: 0 5%;
          width: 90%;
          min-height: 800px;
          #ShopItemsLogo {
              padding-top: 50px;
              width: 60%;
              height: 50px;
          }

          #ShopItemsNav {
              height: 90px;

              button {
                  margin-top: -10px;
                  width: 120px;
                  height: 40px;
                  font-size: 16px;

                  img {
                      margin-right: 7.5px;
                      width: 20px;
                  }
              }
          }

          #ModalFilterWindow {
              width: 100%;
              min-height: 290px;

              #ModalFilterWindow_Categories {
                  height: 70px;

                  p {
                      font-size: 20px;
                  }

                  span {
                      width: 100%;

                      p {
                          font-size: 16px;
                      }

                      .categoryActive {
                          padding: 5px 15px;
                          font-size: 14px;
                      }
                  }
              }

              #ModalFilterWindow_Sizes {
                  p {
                      font-size: 20px;
                  }

                  div {
                      width: 42%;
                      height: 100px;

                      button {
                          padding: 2px 12.5px 0 12.5px;
                          height: 40px;
                          font-size: 16px;
                      }
                  }
              }

              #ModalFilterWindow_Price {
                  width: 95%;
                  height: 70px;

                  p {
                      font-size: 20px;
                  }

                  div {
                      width: 100%;
                      height: 35px;

                      input {
                          padding: 0 10px;
                          font-size: 16px;
                      }

                      ::placeholder {
                          font-size: 16px;
                      }
                  }
              }

              #ModalFilterWindow_Accept {
                  width: 50%;
                  height: 45px;
                  font-size: 14px;
              }

              #ModalFilterWindow_Reset {
                  width: 50%;
                  height: 45px;
                  font-size: 14px;
              }
          }

          #ShopItemsContainer {
              margin-top: -50px;
          }
      }
  }

  @media(max-width: 380px) {
      main {
          #ShopItemsLogo {
              padding-top: 50px;
              width: 70%;
              height: 55px;
          }

          #ModalFilterWindow {
              #ModalFilterWindow_Sizes {
                  div {
                      width: 47.5%;
                  }
              }
          }
      }
  }

  @media(min-width: 1920px) and (min-height: 1080px) {
      main {
          #ShopItemsLogo {
              width: 44%;
          }

          #ModalFilterWindow {
              #ModalFilterWindow_Categories {
                  span {
                      width: 45%;
                  }
              }

              #ModalFilterWindow_Sizes {
                  div {
                      width: 25%;
                  }
              }
          }
      }
  }

  @media(min-width: 2560px) and (min-height: 1440px) {
      main {
          #ShopItemsLogo {
              padding-top: 130px;
              width: 45%;
              height: 290px;
          }

          #ShopItemsNav {
              height: 80px;

              button {
                  margin-top: -20px;
                  width: 230px;
                  height: 70px;
                  font-size: 26px;
              }
          }

          #ModalFilterWindow {
              margin-top: 20px;

              #ModalFilterWindow_Categories {
                  height: 100px;

                  p {
                      font-size: 32px;
                  }

                  span {
                      margin-top: 10px;
                      width: 45%;

                      p {
                          font-size: 28px;
                      }

                      .categoryActive {
                          padding: 7.5px 30px;
                      }
                  }
              }

              #ModalFilterWindow_Sizes {
                  p {
                      font-size: 32px;
                  }

                  div {
                      margin-top: 20px;
                      width: 27.5%;

                      button {
                          padding: 2px 20px 0;
                          height: 65px;
                          font-size: 28px;
                      }
                  }
              }

              #ModalFilterWindow_Price {
                  margin-top: 15px;

                  p {
                      font-size: 32px;
                  }

                  div {
                      margin-top: 20px;

                      input {
                          width: 40%;
                          height: 55px;
                          font-size: 22px;
                      }

                      ::placeholder {
                          font-size: 22px;
                      }
                  }
              }

              #ModalFilterWindow_Accept {
                  margin-top: 35px;
                  width: 25%;
                  height: 70px;
                  font-size: 26px;
              }

              #ModalFilterWindow_Reset {
                  margin-top: 25px;
                  width: 25%;
                  height: 70px;
                  font-size: 26px;
              }
          }
      }
  }
</style>
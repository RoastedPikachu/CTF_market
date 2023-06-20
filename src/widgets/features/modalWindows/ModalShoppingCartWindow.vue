<template>
    <div id="ModalShoppingCart">
          <span>
              <img src="@/assets/x-markIcon.svg" alt="Назад" @click="$emit('changeModalShoppingCartActive')"/>

              <p>Корзина</p>

              <img src="@/assets/binIcon.svg" alt="Очистить корзину" @click="clearShoppingCart()"/>
          </span>

        <div id="shoppingCartItemsWrapper">
            <div class="shoppingCartItem" v-for="shoppingCartItem of shoppingCartItems" :key="shoppingCartItem.id">
                <img :src="shoppingCartItem.photo" :alt="shoppingCartItem.title" class="shoppingCartItemImage"/>

                <div class="shoppingCartItem_Right">
                  <span>
                      <p>{{ shoppingCartItem.title }}</p>

                      <p>{{ shoppingCartItem.price * shoppingCartItem.count }} баллов</p>
                  </span>

                    <div>
                      <span>
                          <button @click="decreaseShoppingCartItemCount(shoppingCartItem)">&mdash;</button>

                          <p>{{ shoppingCartItem.count }}</p>

                          <button @click="increaseShoppingCartItemCount(shoppingCartItem)">+</button>
                      </span>

                      <img src="@/assets/itemBinIcon.svg" alt="Удалить" @click="removeShoppingCartItem(shoppingCartItem.id)"/>
                    </div>
                </div>
            </div>
        </div>

        <div id="ShoppingCart_Bottom">
              <span id="ShoppingCart_BottomBalance">
                  <p>Баланс</p>

                  <p>{{ props.balance || 0 }} баллов</p>
              </span>

            <span>
                  <p>К ОПЛАТЕ</p>

                  <p>{{ props.totalCost }} баллов</p>
              </span>

            <input type="checkbox" style="display: none" v-model="isFAQApproved" id="FAQApproveInput">

            <div id="FAQApprove">
                <label for="FAQApproveInput" :class="{ checkmarkActive: isFAQApproved }">
                    <img src="@/assets/checkmarkIcon.svg" alt="Принять условия FAQ"/>
                </label>

                <p>Я прочитал <router-link to="/FAQ" class="faqRoute">FAQ и согласен с условиями доставки</router-link></p>
            </div>

            <input type="text" placeholder="г. Москва, ул. Моросейка, д. 10, кв. 40" v-model="address">

            <button :class="{ active: props.isPointsEnough && isFAQApproved }" @click="makeAnOrder()">
                Оплатить
                <img src="@/assets/arrowRightIcon.svg" alt="Оплатить"/>
            </button>

            <span id="OrderIsPayed" v-if="props.isOrderPayed">
                  <p>Заказ оплачен</p>

                  <img src="@/assets/orderIsPayedIcon.svg" alt="Заказ Оплачен"/>
              </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, defineProps, defineEmits } from 'vue';
  import store from "@/store";

  import axiosMixins from '@/mixins/axiosMixins.js';

  interface ShoppingCartItem {
      id: number,
      title: string,
      price: number,
      size: string,
      count: number,
      photo: string
  }

  interface Props {
      token: string,
      balance: number,
      totalCost: number,
      isPointsEnough: boolean,
      isOrderPayed: boolean,
      shoppingCartItems: ShoppingCartItem[]
  }

  const { api, initAPI } = axiosMixins();

  const props = defineProps<Props>();

  const emit:any = defineEmits(['order', 'changeModalShoppingCartActive']);

  const isFAQApproved = ref(false);

  const address = ref('');

  const removeShoppingCartItem = (id:number) => {
      store.dispatch('removeItemFromShoppingCart', id);
  }

  const clearShoppingCart = () => {
      store.dispatch('clearShoppingCart');
  }

  const increaseShoppingCartItemCount = (item:any) => {
      item.count++;

      store.dispatch('changeItemFromShoppingCart', item);
      store.dispatch('changeTotalCostValue', props.totalCost + item.price);
  }

  const decreaseShoppingCartItemCount = (item:any) => {
      if (item.count > 1) {
          item.count--;

          store.dispatch('changeItemFromShoppingCart', item);
          store.dispatch('changeTotalCostValue', props.totalCost - item.price);
      } else {
          store.dispatch('removeItemFromShoppingCart', item.id);
      }
  }

  const makeAnOrder = () => {
      if(props.shoppingCartItems.length && address.value) {
          const url = new URL('https://ctfmarket.ru:8080/api/v1/product/buy');

          api.post(url.toString(), {
              token: props.token,
              address: address.value,
              products: props.shoppingCartItems
          })
              .then((res:any) => {
                emit('order');

                address.value = '';
                store.dispatch('clearShoppingCart');
                console.log(res);
              });
      } else {
          console.log('Нельзя сделать заказ с пустой корзиной');
      }
  }

  onMounted(() => {
    initAPI(true);
  });
</script>

<style lang="scss" scoped>
  #ModalShoppingCart {
      position: absolute;
      top: 70px;
      right: 5%;
      padding: 20px 35px;
      width: 305px;
      height: auto;
      min-height: 650px;
      background-color: #1e1e1e;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      z-index: 10;

      span {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 70px;

          img {
            cursor: pointer;
          }

          img:first-child {
              width: 22px;
              height: 22px;
          }

          img:last-child {
              width: 26px;
          }

          p {
              color: #ffffff;
              font-size: 1.125em;
              font-weight: 700;
              font-family: 'Montserrat', 'sans-serif';
          }
      }

      #shoppingCartItemsWrapper {
          margin-top: 20px;
          width: 100%;
          height: 280px;
          overflow: scroll;
          overflow-x: hidden;

          .shoppingCartItem {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 20px;
              width: 100%;
              height: 85px;

              .shoppingCartItemImage {
                  width: 85px;
                  height: 100%;
                  background-color: #ffffff;
                  border-radius: 10px;
              }

              .shoppingCartItem_Right {
                  width: 67.5%;
                  height: 100%;

                  span {
                      display: flex;
                      align-items: center;
                      flex-wrap: wrap;
                      width: 100%;
                      height: 50%;

                      p {
                          margin-left: 0;
                          width: 100%;
                          color: #ffffff;
                          font-size: 0.875em;
                          font-weight: 500;
                          font-family: 'DM Sans', sans-serif;
                      }

                      p:last-child {
                          font-size: 0.875em;
                          font-weight: 700;
                      }
                  }

                  div {
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      margin-top: 5px;
                      width: 100%;
                      height: 50%;

                      span {
                          display: flex;
                          justify-content: space-between;
                          align-items: center;
                          flex-wrap: nowrap;
                          width: 60%;
                          height: 100%;

                          button {
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              width: 60px;
                              height: 30px;
                              background-color: #ffffff;
                              border: none;
                              border-radius: 10px;
                              font-size: 1.125em;
                              cursor: pointer;
                          }

                          button:last-child {
                              font-size: 1.375em;
                          }

                          p {
                            text-align: center;
                          }
                      }

                      img {
                        cursor: pointer;
                      }
                  }
              }
          }

          .shoppingCartItem:first-child {
              margin-top: 0;
          }
      }

      #shoppingCartItemsWrapper::-webkit-scrollbar {
          width: 10px;
      }

      #shoppingCartItemsWrapper::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
          border-radius: 10px;
      }

      #shoppingCartItemsWrapper::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
      }

      #ShoppingCart_Bottom {
          margin-top: 10px;
          width: 100%;
          height: auto;
          min-height: 160px;

          span {
              height: 40px;

              p {
                  margin-left: 0;
                  color: rgba(255, 255, 255, 0.6);
                  font-size: 1.5em;
                  font-weight: 700;
                  font-family: 'DM Sans', sans-serif;
              }

              p:last-child {
                  color: #ffffff;
                  font-size: 1em;
              }
          }

          #ShoppingCart_BottomBalance {
              p {
                  font-size: 1em;
              }
          }

          input {
              margin-top: 10px;
              padding: 0 20px;
              width: calc(100% - 44px);
              height: 45px;
              background-color: #434343;
              border: 1px solid rgba(255, 255, 255, 0.6);
              border-radius: 10px;
              color: #bababa;
              font-size: 0.875em;
              font-weight: 700;
              font-family: 'DM Sans', sans-serif;
              outline: none;
          }

          ::placeholder {
              color: #bababa;
              font-size: 0.875em;
              font-weight: 700;
              font-family: 'DM Sans', sans-serif;
          }

          #FAQApprove {
              padding: 15px 0 10px 0;
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              width: 100%;
              height: auto;

              label {
                  width: 25px;
                  height: 25px;
                  background-color: #1e1e1e;
                  border: 1px solid #42d4ba;
                  border-radius: 5px;
                  cursor: pointer;
                  transition: 250ms ease;

                  img {
                      display: none;
                  }
              }

              .checkmarkActive {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: #42d4ba;

                  img {
                      display: block;
                  }
              }

              p {
                  width: 85%;
                  color: #ffffff;
                  font-size: 18px;
                  font-weight: 700;
                  font-family: 'SF Pro Text', sans-serif;

                  .faqRoute {
                      color: #42d4ba;
                  }
              }
          }

          button {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 10px;
              padding: 0 20px;
              width: 100%;
              height: 50px;
              background-color: #434343;
              border: none;
              border-radius: 10px;
              color: #9a9a9a;
              font-size: 1em;
              font-weight: 700;
              font-family: 'DM Sans', sans-serif;
              cursor: pointer;
              transition: 250ms ease;
          }

          .active {
              background-color: #42d4ba;
              color: #ffffff;
          }

          #OrderIsPayed {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 15px 23% 0 23%;
              height: 20px;
              width: 54%;

              p {
                color: #a5a5a5;
                font-size: 18px;
                font-weight: 700;
                font-family: 'DM Sans', sans-serif;
              }

              img {
                width: 20px;
                height: 20px;
              }
          }
      }
  }

  @media(max-width: 480px) {
      #ModalShoppingCart {
          top: 0;
          right: 0;
          width: calc(100% - 74px);
          height: calc(100vh - 44px);
          border-radius: 0;

          p {
              display: block;
          }

          #shoppingCartItemsWrapper {
              margin-top: 10px;
              height: 260px;
          }

          #ShoppingCart_Bottom {
              height: auto;
              min-height: 100px;

              #OrderIsPayed {
                  padding: 15px 26% 0 26%;
                  width: 48%;
              }
          }
      }
  }

  @media(max-width: 380px) {
      #ModalShoppingCart {
          #ShoppingCart_Bottom {
              #OrderIsPayed {
                  padding: 15px 22.5% 0 22.5%;
                  width: 55%;
              }
          }
      }
  }

  @media(max-width: 360px) {
      #ModalShoppingCart {
          #ShoppingCart_Bottom {
              #FAQApprove {
                  p {
                    font-size: 14px;
                  }
              }

              #OrderIsPayed {
                  padding: 15px 17.5% 0 17.5%;
                  width: 65%;
              }
          }
      }
  }
</style>
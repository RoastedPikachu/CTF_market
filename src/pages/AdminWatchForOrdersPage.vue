<template>
  <main>
      <img src="@/assets/Logo.svg" alt="CTFMarket">

      <section>
        <div id="OrdersWrapper">
            <h2>ЗАКАЗЫ</h2>

            <div v-for="order of orders" :key="order.id" @click="targetOrder = order">
                <p>{{`${order.user?.first_name} ${order.user?.last_name}`}}/ {{ order.user?.phone.slice(0, 9)}}&#8230;</p>
            </div>
        </div>

         <aside>
             <div id="MoreInfoAboutOrder">
                 <h2>Подробная информация о заказе</h2>

                 <p>{{ `${targetOrder.user?.first_name || 'IT'} ${targetOrder.user?.last_name || 'Уточка'}` }}</p>
                 <p>{{ `+${targetOrder.user?.phone.slice(0, 1)}(${targetOrder.user?.phone.slice(1, 4)})${targetOrder.user?.phone.slice(4, 7)}-${targetOrder.user?.phone.slice(7, 9)}-${targetOrder.user?.phone.slice(9, 11)}`}}</p>
                 <p>{{ targetOrder.user?.email || 'крякря@duck.ru'}}</p>
                 <p>{{ targetOrder?.address || 'пруд около горы Маттерхорн' }}</p>
                 <p v-for="orderedPosition of targetOrder.products" :key="orderedPosition.id">{{ orderedPosition.title }} размер: {{ orderedPosition.size }}</p>
             </div>

             <button id="Accept">Подтвердить</button>

             <button id="Decline">Отменить</button>
         </aside>
      </section>
  </main>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { ref, onMounted, computed } from 'vue';
  import store from '@/store';
  import axios from 'axios';

  interface OrderedPosition {
      id: number,
      title: string,
      size: string
  }

  interface UserInfo {
      id: number,
      email: string,
      first_name: string,
      last_name: string,
      phone: 'string',
  }

  interface Order {
      id: number,
      user: UserInfo[],
      products: OrderedPosition[]
  }

  const router = useRouter();

  const isAdmin = computed(() => store.state.isAdmin);

  const targetOrder = ref({} as Order);
  const orders = ref([] as Order[]);

  const getCookie = (name:string) => {
      let matches = document.cookie.match(new RegExp(
          //eslint-disable-next-line
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  const getAllOrders = () => {
      const url = new URL('https://ctfmarket.ru:8080/api/v1/order');

      const token = getCookie('token');

      axios.post(url.toString(), { token: token }, {
          headers: { 'Content-Type': 'application/json;charset=utf-8' }
      })
          .then(res => {
              orders.value = Object.values(res.data);
              targetOrder.value = orders.value[0];
          })
          .catch(error => {
              console.log(error);
          })
  }

  onMounted(() => {
      if(isAdmin.value) {
          getAllOrders();
      } else {
          router.push('/');
      }
  })

</script>

<style lang="scss" scoped>
  main {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 50px 17.5% 0 15%;
    width: 70%;
    height: 950px;

    img {
      width: 25%;
      height: 50px;
    }

    section {
      display: flex;
      justify-content: space-between;
      margin: 0;
      padding: 50px 70px;
      width: 100%;
      height: 880px;
      background-color: #1e1e1e;
      border: 4px solid rgba(158, 158, 158, 0.25);
      border-radius: 10px;

      #OrdersWrapper {
        padding: 30px 20px;
        width: calc(45% - 40px);
        height: calc(100% - 60px);
        background-color: rgba(158, 158, 158, 0.25);
        border-radius: 10px;
        overflow: scroll;
        overflow-x: hidden;

        h2 {
          color: #ffffff;
          font-size: 26px;
          font-weight: 700;
          font-family: 'SF Pro Text', sans-serif;
        }

        div {
          display: flex;
          align-items: center;
          margin-top: 20px;
          height: 40px;
          cursor: pointer;

          p {
            color: #ffffff;
            font-size: 20px;
            font-weight: 500;
            font-family: 'SF Pro Text', sans-serif;
          }
        }
      }

      #OrdersWrapper::-webkit-scrollbar {
        width: 15px;
      }

      #OrdersWrapper::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
      }

      #OrdersWrapper::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
      }

      aside {
        width: 45%;
        height: 100%;

        #MoreInfoAboutOrder {
          padding: 30px 15px;
          width: calc(100% - 30px);
          height: auto;
          min-height: 280px;
          background-color: rgba(158, 158, 158, 0.25);
          border-radius: 10px;

          h2 {
            color: #ffffff;
            font-size: 26px;
            font-weight: 700;
            font-family: 'SF Pro Text', sans-serif;
          }

          p {
            display: flex;
            align-items: center;
            margin-top: 10px;
            height: auto;
            min-height: 20px;
            color: #ffffff;
            font-size: 18px;
            font-weight: 400;
            font-family: 'SF Pro Text', sans-serif;
          }
        }

        #Accept {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          width: 65%;
          height: 60px;
          background-color: #30e242;
          border: none;
          border-radius: 10px;
          color: #ffffff;
          font-size: 20px;
          font-weight: 500;
          font-family: 'SF Pro Text', sans-serif;
          cursor: pointer;
          outline: none;
        }

        #Decline {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          width: 65%;
          height: 60px;
          background-color: #fa3e3e;
          border: none;
          border-radius: 10px;
          color: #ffffff;
          font-size: 20px;
          font-weight: 500;
          font-family: 'SF Pro Text', sans-serif;
          cursor: pointer;
          outline: none;
        }
      }
    }
  }
</style>
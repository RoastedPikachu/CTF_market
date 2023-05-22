<template>
    <main>
        <img src="@/assets/Logo.svg" alt="CTFMarket">

        <section>
          <form>
              <div id="LoadPhoto">
                  <div v-for="photo of photos" :key="photo.id" v-show="photo.isShowed">
                      <label class="photoLoader" for="Photo" v-if="!photo.isLoaded">Загрузить <br>фото {{ photo.id }}</label>
                      <img :src="photo.file" v-if="photo.isLoaded" alt="Карточка товара">

                      <input type="file" id="Photo" @change="setPhoto($event)">
                  </div>

                  <span>
                      <button type="button" @click="getPreviousPhoto()">
                        <img src="@/assets/backIcon.svg" alt="Назад">
                      </button>

                      <p>Назад</p>

                      <p>Вперёд</p>

                      <button type="button" @click="getNextPhoto()">
                          <img src="@/assets/forwardIcon.svg" alt="Вперёд">
                      </button>
                  </span>
              </div>

              <aside>
                  <textarea id="Title" placeholder="Заголовок" maxlength="100" v-model="title"></textarea>

                  <textarea id="Description" placeholder="Описание" maxlength="400" v-model="description"></textarea>

                  <select v-model="category">
                      <option disabled>Категории:</option>
                      <option value="Толстовки">Толстовки</option>
                      <option value="Футболки">Футболки</option>
                      <option value="Кружки">Кружки</option>
                      <option value="Браслеты">Браслеты</option>
                  </select>

                  <div id="Price">
                      <label for="PriceInput">Цена:</label>
                      <input type="text" id="PriceInput" placeholder="Баллы" maxlength="10" v-model="price">
                  </div>

                  <div id="Sizes">
                      <span>
                          <p>Размеры в <br>наличии:</p>

                          <div class="sizesText" v-for="size of sizes" :key="size.id">
                              <p>{{ size.prop }}</p>
                          </div>
                      </span>
                      <span>
                          <p>Кол-во шт.</p>

                          <input type="text" class="sizesInput" maxlength="4" v-for="size of sizes" :key="size.id" v-model="size.value">
                      </span>
                  </div>

                  <button type="button" @click="addProductCard()">Сохранить</button>
              </aside>
          </form>
        </section>
    </main>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import axios from 'axios';

    interface Photo {
        id: number,
        isShowed: boolean,
        isLoaded: boolean,
        file: string
    }


    const targetId = ref(0);
    const photos = ref([
        {
            id: 0,
            isShowed: true,
            isLoaded: false,
            file: ''
        },
        {
            id: 1,
            isShowed: false,
            isLoaded: false,
            file: ''
        },
        {
            id: 2,
            isShowed: false,
            isLoaded: false,
            file: ''
        },
        {
            id: 3,
            isShowed: false,
            isLoaded: false,
            file: ''
        },
        {
            id: 4,
            isShowed: false,
            isLoaded: false,
            file: ''
        },
        {
            id: 5,
            isShowed: false,
            isLoaded: false,
            file: ''
        },
        {
            id: 6,
            isShowed: false,
            isLoaded: false,
            file: ''
        },
        {
            id: 7,
            isShowed: false,
            isLoaded: false,
            file: ''
        },
        {
            id: 8,
            isShowed: false,
            isLoaded: false,
            file: ''
        },
        {
            id: 9,
            isShowed: false,
            isLoaded: false,
            file: ''
        },
    ] as Photo[]);
    const title = ref('');
    const description = ref('');
    const category = ref('Категории:');
    const price = ref('');
    const sizes = ref([
        {
            id: 0,
            prop: 'XS',
            value: ''
        },
        {
            id: 1,
            prop: 'S',
            value: ''
        },
        {
            id: 2,
            prop: 'M',
            value: ''
        },
        {
            id: 3,
            prop: 'L',
            value: ''
        },
        {
            id: 4,
            prop: 'XL',
            value: ''
        }
    ]);

    const sendPhoto = (id:number) => {
        const url = new URL('http://79.174.12.75:8000/api/v1/test/');

        // const formData = new FormData();
        // formData.append('shopItemImg', this.image, 'item.png');

        axios.post(url.toString(), {[`file${id}`]: photos.value[id].file}, {
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
    };

    const setPhoto = (event:any) => {
        const FR = new FileReader();

        FR.addEventListener('load', (event:any) => {
            photos.value[targetId.value].file = event.target.result;
            photos.value[targetId.value].isLoaded = true;

            sendPhoto(targetId.value);
        })
        FR.readAsDataURL(event.target.files[0]);
    };

    const getPreviousPhoto = () => {

        photos.value[targetId.value].isShowed = false;

        if(targetId.value === 0) {
            targetId.value = photos.value.length;
        }

        targetId.value--;

        photos.value[targetId.value].isShowed = true;
    };

    const getNextPhoto = () => {

        photos.value[targetId.value].isShowed = false;

        if(targetId.value === photos.value.length - 1) {
            targetId.value = -1;
        }

        targetId.value++;

        photos.value[targetId.value].isShowed = true;
    };

    const addProductCard = () => {
        console.log(title.value);
        console.log(description.value);
        console.log(category.value);
        console.log(price.value);
        console.log(sizes.value.map(item => item));
    };
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
        margin: 0;
        width: 100%;
        height: 880px;
        background-color: #1e1e1e;
        border: 4px solid rgba(158, 158, 158, 0.25);
        border-radius: 10px;
        form {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          padding: 50px 60px;
          width: calc(100% - 120px);
          height: calc(100% - 100px);
          textarea {
            padding: 15px 15px;
            background-color: rgba(158, 158, 158, 0.25);
            border: none;
            border-radius: 5px;
            color: #c4c4c4;
            font-size: 16px;
            font-weight: 500;
            font-family: 'SF Pro Text', sans-serif;
            outline: none;
            resize: none;
          }
          ::placeholder {
            color: #c4c4c4;
            opacity: 1;
          }
          #LoadPhoto {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            width: 400px;
            height: 500px;
            div {
                width: 100%;
                height: 450px;
                background-color: rgba(158, 158, 158, 0.25);
                border-radius: 10px;
                .photoLoader {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 400px;
                    height: 450px;
                    color: rgba(30, 30, 30, 0.6);
                    font-size: 26px;
                    font-weight: 800;
                    font-family: 'Montserrat', sans-serif;
                    line-height: 34px;
                    text-align: center;
                    cursor: pointer;
                }
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                #Photo {
                    display: none;
                }
            }
            span {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 50%;
                button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                    img {
                        width: 20px;
                        height: 16px;
                    }
                }
                p {
                    color: #307fe2;
                    font-size: 16px;
                    font-weight: 600;
                    font-family: 'SF Pro Text', sans-serif;
                }
            }
          }
          aside {
            display: flex;
            justify-content: flex-end;
            flex-wrap: wrap;
            width: 420px;
            height: 100%;
            #Title {
              width: 100%;
              height: 90px;
            }
            #Description {
              width: 100%;
              height: 170px;
            }
            select {
                margin-right: 5%;
                width: 90%;
                height: 60px;
                background-color: transparent;
                border: 2px solid rgba(158, 158, 158, 0.25);
                border-width: 2px 0 2px 0;
                color: #c4c4c4;
                font-size: 16px;
                font-weight: 600;
                font-family: 'SF Pro Text', sans-serif;
                outline: none;
                cursor: pointer;
            }
            #Price {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 90%;
              height: 60px;
              label {
                color: #999999;
                font-size: 16px;
                font-weight: 500;
                font-family: 'SF Pro Text', sans-serif;
              }
              #PriceInput {
                padding: 10px 20px;
                width: 75%;
                height: 30px;
                background-color: rgba(158, 158, 158, 0.25);
                border: none;
                border-radius: 5px;
                color: #c4c4c4;
                font-size: 16px;
                font-weight: 500;
                font-family: 'SF Pro Text', sans-serif;
                outline: none;
              }
            }
            #Sizes {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                width: 100%;
                height: 120px;
                span {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    height: 45px;
                    p {
                        color: #999999;
                        font-size: 16px;
                        font-weight: 500;
                        font-family: 'SF Pro Text', sans-serif;
                        text-align: right;
                    }
                    .sizesText {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 55px;
                        height: 100%;
                        background-color: rgba(158, 158, 158, 0.25);
                        border: 1.5px solid #979797;
                        border-radius: 10px;
                        p {
                            color: #ffffff;
                            font-size: 14px;
                            font-weight: 500;
                            font-family: 'DM Sans', sans-serif;
                        }
                    }
                    .sizesInput {
                        padding: 0 10px;
                        width: 35px;
                        height: 100%;
                        background-color: rgba(158, 158, 158, 0.25);
                        border: 1.5px solid #979797;
                        border-radius: 10px;
                        color: #ffffff;
                        font-size: 14px;
                        font-weight: 500;
                        font-family: 'DM Sans', sans-serif;
                        outline: none;
                    }
                }
            }
            button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 130px;
                height: 50px;
                background-color: #307fe2;
                border: none;
                border-radius: 5px;
                color: #ffffff;
                font-size: 16px;
                font-weight: 600;
                font-family: 'SF Pro Text', sans-serif;
                transition: color, background-color 500ms ease;
                cursor: pointer;
            }
            button:hover {
                background-color: transparent;
                border: 2px dashed #307fe2;
                color: #307fe2;
            }
          }
        }
      }
    }
</style>
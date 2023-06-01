<template>
    <router-link class="shopItem"
         v-for="shopItem of shopItems"
         :key="shopItem.id"
         :to="{ name: 'shopItem', params: { id: shopItem.id } }"
    >
        <div class="shopItem_ImgContainer">
            <img :src="shopItem.images[0]" :alt="shopItem.title">
        </div>

        <div>
            <p class="shopItemTitle">{{ shopItem.title }}</p>

            <div>
                <p class="shopItemDescription">{{ shopItem.description }}</p>

                <button class="shopItemPrice">
                    <p>{{ shopItem.price }}</p>

                    <img src="@/assets/ctfCoinIcon.svg" alt="CTFCoin">
                </button>
            </div>
        </div>
    </router-link>
</template>

<script lang="ts" setup>
    import { defineProps } from 'vue';

    interface ShopItem {
        id: number,
        title: string,
        price: number,
        description: string,
        images: string[]
    }

    interface Props {
        shopItems: ShopItem[]
    }

    const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
    .shopItem {
        position: relative;
        margin-top: 20px;
        padding: 20px;
        width: 320px;
        height: 460px;
        background-color: #313134;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 35px;
        text-decoration: none;
        .shopItem_ImgContainer {
            margin-top: 0;
            width: 100%;
            height: 80%;
            border-radius: 30px;
            img {
                width: 100%;
                height: 100%;
                background-color: #ffffff;
                object-fit: cover;
                transition: 400ms ease;
            }
            overflow: hidden;
        }
        .shopItem_ImgContainer:hover {
            img {
                transform: scale(1.1);
            }
        }
        div {
            margin-top: -10px;
            padding-bottom: 20px;
            width: 100%;
            height: auto;
            min-height: 90px;
            .shopItemTitle {
                color: #ffffff;
                font-size: 1.375em;
                font-weight: 700;
                font-family: 'Montserrat', sans-serif;
            }
            div {
                display: flex;
                justify-content: space-between;
                margin-top: 7.5px;
                padding-bottom: 0;
                width: 100%;
                min-height: 50px;
                .shopItemDescription {
                    width: 60%;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 1em;
                    font-weight: 500;
                    font-family: 'Ruberoid', sans-serif;
                }
                button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: -5px;
                    padding-top: 5px;
                    width: 35%;
                    height: 45px;
                    background-color: rgba(46, 236, 197, 0.1);
                    border: 1.5px solid #2eecc5;
                    border-radius: 40px;
                    box-shadow: 0 0 38px rgba(46, 236, 197, 0.1);
                    cursor: pointer;
                    outline: none;
                    p {
                        color: #ffffff;
                        font-size: 1.25em;
                        font-weight: 500;
                        font-family: 'Ruberoid', sans-serif;
                    }
                    img {
                        margin-top: -7.5px;
                        margin-left: 5px;
                        width: 25px;
                        height: 25px;
                    }
                }
            }
        }
    }

    @media(max-width: 480px) {
        .shopItem {
            margin-top: 20px;
            padding: 10px 2.5% 15px 2.5%;
            width: calc(46% - 3%);
            height: 260px;
            border-radius: 20px;
            .shopItem_ImgContainer {
                padding-bottom: 0;
                border-radius: 20px;
            }
            div {
                margin-top: 10px;
                .shopItemTitle {
                    font-size: 0.75em;
                }
                div {
                    margin-top: 7.5px;
                    .shopItemDescription {
                        font-size: 0.5em;
                    }
                    button {
                        padding-top: 5px;
                        height: 25px;
                        border-radius: 30px;
                        p {
                            font-size: 0.625em;
                        }
                        img {
                            margin-top: -5px;
                            margin-left: 2.5px;
                            width: 15px;
                            height: 15px;
                        }
                    }
                }
            }
        }
    }

    @media(max-width: 400px) {
        .shopItem {
            height: 220px;
        }
    }

    @media(max-width: 380px) {
        .shopItem {
            padding: 10px 2.5%;
            height: 205px;
            div {
                .shopItemTitle {
                    font-size: 0.625em;
                }
                div {
                    margin-top: 5px;
                    .shopItemDescription {
                        font-size: 0.425em;
                    }
                    button {
                        padding-top: 3.5px;
                        height: 22.5px;
                        p {
                            font-size: 0.575em;
                        }
                        img {
                            width: 12.5px;
                            height: 12.5px;
                        }
                    }
                }
            }
        }
    }

    @media(max-width: 350px) {
        .shopItem {
            height: 185px;
        }
    }
</style>
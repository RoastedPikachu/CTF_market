<template>
    <div class="shopItem" v-for="shopItem of shopItems" :key="shopItem.id">
        <div class="shopItem_ImgContainer">
            <img :src="shopItem.images[0]" :alt="shopItem.title">
        </div>

        <div>
            <span>
                <p>{{ shopItem.title }}</p>

                <span>
                    <p>От {{ shopItem.price }}</p>

                    <img src="@/assets/ctfCoinIcon.svg" alt="CTFCoin">

                    <img src="@/assets/darkCtfCoinIcon.svg" alt="CTFCoin" id="DarkCtfCoin">
                </span>

                <p>{{ shopItem.description.slice(0, 21) + '&#8230;' }}</p>
            </span>

            <router-link :to="{ name: 'shopItem', params: { id: shopItem.id } }" class="routeMoreButton">
                Подробнее
                <img src="@/assets/arrowRightIcon.svg" alt="Подробнее">
            </router-link>
        </div>
    </div>
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
        padding: 20px 20px;
        width: 320px;
        height: 420px;
        background: linear-gradient(168.64deg, #313134 9.31%, #292929 61.88%, #282828 111.76%);
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 35px;
        .shopItem_ImgContainer {
            margin-top: 0;
            width: 100%;
            height: 340px;
            border-radius: 30px;
            img {
                width: 100%;
                height: 100%;
                background-color: #ffffff;
                background-size: cover;
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
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            width: 100%;
            span {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                width: 45%;
                height: 55px;
                span {
                    display: flex;
                    align-items: center;
                    flex-wrap: nowrap;
                    width: 90%;
                    height: 30px;
                    p {
                        width: auto;
                        color: #ffffff;
                        font-size: 1.375em;
                    }
                    img {
                        margin-top: -7.5px;
                        margin-left: 5px;
                        width: 25px;
                        height: 25px;
                    }
                    #DarkCtfCoin {
                        display: none;
                    }
                }
                p {
                    width: 100%;
                    font-weight: 500;
                    font-family: 'Ruberoid', sans-serif;
                }
                p:last-child {
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 1em;
                }
            }
            .routeMoreButton {
                display: flex;
                justify-content: center;
                align-items: center;
                padding-top: 2px;
                width: 50%;
                height: 50px;
                background-color: rgba(46, 236, 197, 0.1);
                border: 1.5px solid #2eecc5;
                border-radius: 40px;
                box-shadow: 0 0 38px rgba(46, 236, 197, 0.1);
                color: #ffffff;
                font-size: 1em;
                font-weight: 500;
                font-family: 'Ruberoid', sans-serif;
                text-decoration: none;
                cursor: pointer;
                img {
                    margin-left: 10px;
                    height: 14px;
                }
            }
        }
    }

    @media(max-width: 480px) {
        .shopItem {
            margin-top: 20px;
            padding: 0 0 20px 0;
            width: 175px;
            height: 240px;
            background: #ffffff;
            border-radius: 25px;
            .shopItem_ImgContainer {
                width: 100%;
                height: 65%;
                border-radius: 25px 25px 0 0;
            }
            div {
                display: block;
                margin-top: 5px;
                span {
                    display: block;
                    padding: 0 5%;
                    width: 90%;
                    height: 45px;
                    p {
                        color: #000000;
                        font-size: 1em;
                        font-weight: 500;
                        font-family: 'DM Sans', sans-serif;
                    }
                    p:last-child {
                        display: none;
                    }
                    span {
                        padding: 0;
                        width: 100%;
                        height: 25px;
                        p {
                            color: #000000;
                            font-size: 0.875em;
                        }
                        img {
                            display: none;
                        }
                        #DarkCtfCoin {
                            display: block;
                            margin-top: 0;
                            width: 20px;
                            height: 20px;
                        }
                    }
                }
                .routeMoreButton {
                    margin: 0 5% 0 5%;
                    padding-top: 3px;
                    width: 70%;
                    height: 20px;
                    background-color: transparent;
                    border: 1px solid #000000;
                    border-radius: 35px;
                    box-shadow: none;
                    color: #000000;
                    font-size: 0.875em;
                    img {
                        margin-left: 10px;
                        height: 14px;
                    }
                }
            }
        }
    }
</style>
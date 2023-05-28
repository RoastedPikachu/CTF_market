<template>
    <div class="shopItem" v-for="shopItem of shopItems" :key="shopItem.id">
        <div class="shopItem_ImgContainer">
            <img :src="shopItem.images[0]" :alt="shopItem.title">
        </div>

        <div>
            <span>
                <span>
                    <p>От {{ shopItem.price }}</p>
                    <img src="@/assets/ctfCoinIcon.svg" alt="CTFCoin">
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
                        font-size: 22px;
                    }
                    img {
                        margin-top: -7.5px;
                        margin-left: 5px;
                        width: 25px;
                        height: 25px;
                    }
                }
                p {
                    width: 100%;
                    font-weight: 500;
                    font-family: 'Ruberoid', sans-serif;
                }
                p:last-child {
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 16px;
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
                font-size: 16px;
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
</style>
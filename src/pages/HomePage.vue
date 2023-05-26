<template>
    <TheHeaderComp/>

    <main>
        <img src="@/assets/topLogoText.svg" alt="CTFMarket" id="TopLogoText">

        <div id="MovingImgWrapper">
            <img src="@/assets/bottomLogoText.svg" alt="Летняя школа CTF 2023" id="BottomLogoText">

            <img src="@/assets/SignInBackground.svg" alt="Задний фон">
        </div>
    </main>

    <TheFooterComp/>
</template>

<script setup lang="ts">
    import TheHeaderComp from '@/widgets/shared/TheHeaderComp.vue';
    import TheFooterComp from '@/widgets/shared/TheFooterComp.vue';
</script>

<style lang="scss" scoped>
  main {
    width: 100%;
    height: 1000px;
    img {
      margin-top: 100px;
      width: 100%;
      background-size: cover;
    }
    #MovingImgWrapper {
        width: 100%;
        overflow: hidden;
    }
  }

  @keyframes slide{
    from {
        margin-left: -50vw;
    }
    to {
        margin-left: -150vw;
    }
  }

  @keyframes slideBack{
      from {
          margin-left: 0;
      }
      to {
          margin-left: 100vw;
      }
  }
</style>
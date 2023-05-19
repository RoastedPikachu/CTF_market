<template>
    <TheHeaderComp/>

    <main>
        <img src="@/assets/HomeBgText.svg" alt="CTFMarket. Летняя школа CTF 2023">
        <img src="@/assets/SignInBackground.svg" alt="Задний фон">
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
      width: 100%;
      background-size: cover;
    }
  }
</style>
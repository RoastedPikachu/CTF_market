<template>
  <footer>
      <div id="BlurContacts">
          <h2>КОНТАКТЫ</h2>
          <p>КОНТАКТЫ</p>
      </div>
  </footer>
</template>

<script lang="ts">

</script>

<style lang="scss" scoped>
  footer {
    display: flex;
    justify-content: center;
    bottom: 0px;
    width: 100%;
    height: 400px;
    background-color: #19191a;
    #BlurContacts {
      position: relative;
      margin-top: 30px;
      width: 30%;
      h2 {
        position: absolute;
        width: 100%;
        color: #9afbe7;;
        font-size: 48px;
        font-weight: 700;
        font-family: 'DM Sans', sans-serif;
        text-align: center;
        z-index: 9;
      }
      p {
        width: 100%;
        filter: blur(8px);
        color: rgba(154, 251, 231, 0.5);
        font-size: 48px;
        font-weight: 700;
        font-family: 'DM Sans', sans-serif;
        text-align: center;
      }
    }
  }
</style>
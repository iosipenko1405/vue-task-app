<template>
  <section class="section-users-info">
    <router-view></router-view>
  </section>
</template>

<style lang="scss">
  @import './src/scss/reset.scss';

  $red-color: #dc4141;
  $green-color: #00b28e;

  .section-users-info {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    border-radius: 10px;
    font-family: cursive, Arial, sans-serif;
    font-size: 14px;
    line-height: 125%;
  }

  h1 {
    font-size: 32px;
    line-height: 125%;
    color: $green-color;
    text-shadow: 1px 1px 3px #1a5c4f;
    padding: 0 0 20px;
    text-align: center;
  }

  .error-msg {
    text-align: center;
    display: block;
    color: $red-color;
  }

  .svg-icon {
    display: block;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .icon-loading {
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }
</style>

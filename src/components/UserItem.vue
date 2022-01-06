<template>
  <li class="item">
    <strong class="block-name" :style="{color: user.eye_color}">{{ user.name }}</strong>
    <div v-if="massOverweight" class="block-overweight">
      <span class="svg-icon icon-overweight">
        <img :src="require('@/assets/icons/icon-overweight.svg')"/>
      </span>
      +{{ massOverweight }}kg
    </div>
    <router-link class="btn" :to="userLink">Edit</router-link>
  </li>
</template>

<script>

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    userLink() {
      return {
        name: 'edit-user',
        params: {
          userId: this.user.url.split('/').slice(-2)[0]
        }
      }
    },
    massOverweight() {
      const bmi = 25;
      const maxWeight = bmi * Math.pow(this.user.height / 100, 2);
      const overweight = Math.round(this.user.mass - maxWeight);

      return overweight <= 0 ? 0 : overweight;
    }
  }
}
</script>

<style lang="scss" scoped>
  .item {
    padding: 5px 0;
    display: flex;
    align-items: center;
  }

  .block-name {
    padding-right: 15px;
    word-break: break-all;
    text-shadow: 1px 1px 5px #746d6d;
  }

  .block-overweight {
    display: flex;
    align-items: center;
    padding-right: 20px;

    .icon-overweight {
      width: 25px;
      height: 25px;
    }
  }

  .btn {
    word-break: break-all;
    min-width: 30px;
    text-align: center;
    margin: 0 0 0 auto;
    padding: 5px 15px;
    color: #fff;
    background: #00B28E;
    border-radius: 5px;
    text-shadow: 1px 1px 3px #1a5c4f;
    text-decoration: none;
  }
</style>
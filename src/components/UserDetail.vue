<template>
  <h1>User details</h1>
  <span v-if="isLoading" class="svg-icon icon-loading">
    <img :src="require('@/assets/icons/icon-loading.svg')" />
  </span>
  <transition-group v-else name="fade" mode="out-in">
    <span v-if="isError" key="1" class="error-msg">
      Something happened. Please try again
    </span>
    <span v-else-if="isUserDataEmpty" key="2" class="error-msg">
      The user was not found. Please try to check another one
    </span>
    <div key="3" v-else class="block-form">
      <form>
        <label for="name">Name</label>
        <input type="text" id="name" v-model="userData.name" />

        <label for="height">Height</label>
        <input type="number" id="height" @keypress="isNumber" v-model="userData.height" />

        <label for="mass">Mass</label>
        <input type="number" id="mass" @keypress="isNumber" v-model="userData.mass"/>

        <label for="hair_color">Hair Color</label>
        <input type="text" id="hair_color" v-model="userData.hair_color" />

        <label for="skin_color">Skin Color</label>
        <input type="text" id="skin_color" v-model="userData.skin_color" />

        <label for="eye_color">Eye Color</label>
        <input type="text" id="eye_color" v-model="userData.eye_color" />

        <label for="birth_year">Birth year</label>
        <input type="text" id="birth_year" v-model="userData.birth_year" />

        <label for="gender">Gender</label>
        <input type="text" id="gender" v-model="userData.gender" />
      </form>
    </div>
  </transition-group>
</template>

<script>
export default {
  props: ['userId'],
  data() {
    return {
      isLoading: false,
      isError: false,
      receivedData: {}
    }
  },
  computed: {
    isUserDataEmpty() {
      return !Object.keys(this.receivedData).length
    },
    userData() {
      if (this.receivedData.gender === 'female' && this.receivedData.eye_color === 'blue' && this.receivedData.birth_year === '19BBY') {
        return this.receivedData;
      }

      return {};
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        this.isLoading = true;
        const response = await fetch(`https://swapi.dev/api/people/${this.userId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        this.receivedData = this.filterDataByName(data);

      } catch (error) {
        this.isError = true;
        console.error(error.message);
      }

      this.isLoading = false;
    },
    filterDataByName(data){
      if (data.name) {
        const firstLetter = data.name.charAt(0).toUpperCase();

        if (firstLetter !== 'A' && firstLetter != 'B' && firstLetter !== 'C') {
          return data;
        }
      }

      return {};
    },
    isNumber (event) {
      if (isNaN(Number(event.key))) {
        return event.preventDefault();
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .block-form {
    display: flex;
    max-width: 100%;
    width: 500px;
    margin: 0 auto;
  }

  form {
    width: 100%;
  }

  label {
    display: block;
    padding: 0 0 5px;
  }

  input {
    margin: 0 0 10px;
    padding: 5px;
    width: 100%;
    box-sizing: border-box;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

</style>
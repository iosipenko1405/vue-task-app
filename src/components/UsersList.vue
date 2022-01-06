<template>
  <h1>User list</h1>
  <transition-group v-if="usersList.length" name="fade" mode="out-in">
    <span v-if="isError" key="1" class="error-msg">
      Something happened. Please try again
    </span>
    <div v-else key="2">
      <div class="block-info">
        <div class="block-wrapper">
          The number of people:
          <strong>{{ usersList.length }}</strong>
          <br />
          <template v-for="(gender, key) in genders" :key="key">
            {{ key.charAt(0).toUpperCase() + key.slice(1) }}:
            <strong>{{ gender }}</strong>
            <br />
          </template>
        </div>
      </div>
      <ul class="list-items">
        <UserItem
          v-for="user in usersList"
          :key="user.url"
          :user="user"
        ></UserItem>
      </ul>
    </div>
  </transition-group>
  <span v-if="isLoading" class="svg-icon icon-loading">
    <img :src="require('@/assets/icons/icon-loading.svg')" />
  </span>
</template>

<script>
import UserItem from './UserItem.vue'

export default {
  components: {
    UserItem,
  },
  data() {
    return {
      isLoading: false,
      isError: false,
      usersList: [],
      maxCountOfPeople: 100,
    }
  },
  computed: {
    genders() {
      return this.usersList.reduce((acc, curElem) => {
        acc[curElem.gender] ? ++acc[curElem.gender] : (acc[curElem.gender] = 1)
        return acc
      }, {})
    },
  },
  created() {
    this.getUsersList();
  },
  methods: {
    getUsersList() {
      try {
        this.getAllData();
      } catch (error) {
        this.isLoading = false;
        this.isError = true;
        console.error(error.message);
      }
    },
    async getAllData() {
      let hasNextPage = true;
      let numberOfPage = 0;

      this.isLoading = true;

      while (hasNextPage) {
        numberOfPage++;

        const response = await fetch(`https://swapi.dev/api/people/?page=${numberOfPage}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        this.usersList = this.usersList.concat(this.filterArray(data.results));

        if (this.usersList.length > this.maxCountOfPeople) {
          this.usersList.length = this.maxCountOfPeople;
          hasNextPage = false;
        } else {
          hasNextPage = data.next;
        }
      }

      this.isLoading = false;
    },
    filterArray(arr) {
      return arr.filter((item) => {
        const firstLetter = item.name.charAt(0).toUpperCase();
        return firstLetter !== 'A' && firstLetter !== 'B' && firstLetter !== 'C';
      })
    },
  },
}
</script>

<style lang="scss" scoped>

.list-items {
  margin: 0;
  padding: 0;
  list-style: none;
}

.block-info {
  padding: 0 0 20px;
  display: flex;
  justify-content: center;
  text-align: center;
}

.block-wrapper {
  border-bottom: 1px solid #00b28e;
  padding: 0 20px 15px;
}
</style>

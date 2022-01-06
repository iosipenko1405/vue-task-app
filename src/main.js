import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import UsersList from './components/UsersList.vue';
import UserDetail from './components/UserDetail.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: UsersList
    },
    {
      props: true,
      path: '/edit/:userId',
      component: UserDetail,
      name: 'edit-user'
    },
    {
      path: '/:notFound(.*)',
      redirect: '/'
    }
  ]
});

const app = createApp(App);

app.use(router);
app.mount('#app');



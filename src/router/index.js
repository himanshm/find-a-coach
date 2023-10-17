import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/', // domain only entered
      redirect: '/coaches'
    },
    {
      path: '/coaches',
      component: () => import('../views/coaches/CoachesList.vue')
    },
    {
      path: '/coaches/:id',
      component: () => import('../views/coaches/CoachDetail.vue'),
      children: [
        {
          path: 'contact', //coaches/c1/contact - notice there is no forward slash in front of child route
          component: () => import('../views/requests/ContactCoach.vue')
        }
      ]
    },
    {
      path: '/register',
      component: () => import('../views/coaches/CoachRegistration.vue')
    },
    {
      path: '/requests',
      component: () => import('../views/requests/RequestReceived.vue')
    },
    {
      path: '/:notFound(.*)', // using .* regEx to specify any unexpected route which does not match the specified ones
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

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
      props: true,
      children: [
        {
          path: 'contact', //coaches/c1/contact - notice there is no forward slash in front of child route
          component: () => import('../views/requests/ContactCoach.vue')
        }
      ]
    },
    {
      path: '/register',
      component: () => import('../views/coaches/CoachRegistration.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/requests',
      component: () => import('../views/requests/RequestReceived.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth',
      component: () => import('../views/auth/UserAuth.vue'),
      meta: {
        requiresUnauth: true
      }
    },
    {
      path: '/:notFound(.*)', // using .* regEx to specify any unexpected route which does not match the specified ones
      component: () => import('../views/NotFound.vue')
    }
  ]
})

// To prevent users to visit certain pages, we can use Navigation guards -> Global Navigation Guard - Triggered before any navigation, We can attach navigation guards to individual routes, and they can also be attached to components

router.beforeEach((to, _, next) => {
  // Use route meta data to add special meta data to the routes that should be protected
  // if the route that we are going 'to' in its meta field has requiresAuth and we are not logged in
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    // requests while loggedin not working
    // next(false) // deny the navigation / navigation is cancelled
    // or if are not authenticated and wanted to access a page that required authentication wwe simply redirect ot auth page
    next('/auth')
    // But if we should not be authenticated but we are -> that is a problem
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches')
  } else {
    next() // allow the navigation and continue as planned
  }
})
export default router

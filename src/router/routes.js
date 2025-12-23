const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: 'allTask',
      },
      {
        path: 'allTask',
        component: () => import('pages/AllTasks.vue'),
      },
      {
        path: 'completed',
        component: () => import('pages/CompletedTask.vue'),
      },
      {
        path: 'pending',
        component: () => import('pages/PendingTasks.vue'),
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes

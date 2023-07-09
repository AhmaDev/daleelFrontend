import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/jobs",
    name: "jobs",
    component: () => import("../views/Jobs.vue"),
  },
  {
    path: "/job/:id",
    name: "job",
    component: () => import("../views/Job.vue"),
  },
  {
    path: "/ads",
    name: "ads",
    component: () => import("../views/Ads.vue"),
  },
  {
    path: "/cv/:id",
    name: "cv",
    component: () => import("../views/Cv.vue"),
  },
  {
    path: "/users",
    name: "users",
    component: () => import("../views/Users.vue"),
  },
  {
    path: "/user/:id",
    name: "user",
    component: () => import("../views/User.vue"),
  },
  {
    path: "/notifications",
    name: "notifications",
    component: () => import("../views/Notifications.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

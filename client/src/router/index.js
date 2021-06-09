import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/groups",
    name: "groups",
    component: () => import("../views/groups/groups"),
  },
  {
    path: "/groups/add",
    name: "AddGroup",
    component: () => import("../views/groups/add.vue"),
  },
  {
    path: "/groups/update",
    name: "UpdateGroup",
    component: () => import("../views/groups/update.vue"),
    props: true,
  },
  {
    path: "/disciplines",
    name: "disciplines",
    component: () => import("../views/disciplines/disciplines"),
  },
  {
    path: "/disciplines/add",
    name: "AddDiscipline",
    component: () => import("../views/disciplines/add.vue"),
  },
  {
    path: "/disciplines/update",
    name: "UpdateDiscipline",
    component: () => import("../views/disciplines/update.vue"),
    props: true,
  },
  {
    path: "/schedules",
    name: "schedules",
    component: () => import("../views/schedules/schedules"),
  },
  {
    path: "/schedules/add",
    name: "AddSchedule",
    component: () => import("../views/schedules/add.vue"),
  },
  {
    path: "/schedules/update",
    name: "UpdateSchedule",
    component: () => import("../views/schedules/update.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

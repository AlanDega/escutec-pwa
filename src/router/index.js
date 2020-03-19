import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Classroom from "../views/Classroom.vue";
import ProfSchedule from "../views/prof/ProfSchedule.vue";
import StudentSchedule from "../views/student/StudentSchedule.vue";
import GroupActions from "../views/prof/GroupActions.vue";
import Login from "../views/auth/Login.vue";
import SignUp from "../views/auth/SignUp.vue";
import Dashboard from "../views/director/Dashboard.vue";
import Groups from "../views/director/Groups.vue";
import Group from "../views/director/Group.vue";
import Trivias from "../views/prof/Trivias.vue";
import Resources from "../views/prof/Resources.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: SignUp
  },
  {
    path: "/prof-schedule",
    name: "prof-schedule",
    component: ProfSchedule
  },
  {
    path: "/student-schedule",
    name: "student-schedule",
    component: StudentSchedule
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/classroom",
    name: "Classroom",
    component: Classroom
  },
  {
    path: "/resources",
    name: "Resources",
    component: Resources
  },

  {
    path: "/group-actions/:id",
    name: "group-actions",
    component: GroupActions
  },
  {
    path: "/trivias",
    name: "trivias",
    component: Trivias
  },
  {
    path: "/groups",
    name: "groups",
    component: Groups
  },
  {
    path: "/group/:id",
    name: "group",
    component: Group
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;

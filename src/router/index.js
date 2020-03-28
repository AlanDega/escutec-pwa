import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ClassroomProf from "../views/prof/ClassroomProf.vue";
import ClassroomStudent from "../views/student/ClassroomStudent.vue";
import ProfLobby from "../views/prof/ProfLobby";
import StudentLobby from "../views/student/StudentLobby";
import ProfSchedule from "../views/prof/ProfSchedule.vue";
import StudentSchedule from "../views/student/StudentSchedule.vue";
import ProfGroupsActions from "../views/prof/ProfGroupsActions.vue";
import Login from "../views/auth/Login.vue";
import SignUp from "../views/auth/SignUp.vue";
import Dashboard from "../views/director/Dashboard.vue";
import Groups from "../views/director/Groups.vue";
import Professors from "../views/director/Professors.vue";
import Professor from "../views/director/Professor.vue";
import Group from "../views/director/Group.vue";
import Trivias from "../views/prof/Trivias.vue";
import Resources from "../views/prof/Resources.vue";
import ProfGroups from "../views/prof/ProfGroups.vue";
import StudentsGroups from "../views/director/StudentsGroups.vue";
import StudentsGroup from "../views/director/StudentsGroup.vue";
import Shop from '../views/student/Shop.vue'
import ShopItem from '../views/student/ShopItem.vue'
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
    path: "/shop",
    name: "shop",
    component: Shop
  },
  {
    path: "/shopitem",
    name: "shopitem",
    component: ShopItem
  },
  {
    path: "/prof-groups",
    name: "prof-groups",
    component: ProfGroups
  },
  {
    path: "/prof-groups-actions/:id",
    name: "prof-groups-actions",
    component: ProfGroupsActions
  },
  {
    path: "/student-schedule",
    name: "student-schedule",
    component: StudentSchedule
  },
  {
    path: "/prof-lobby",
    name: "prof-lobby",
    component: ProfLobby
  },

  {
    path: "/student-lobby",
    name: "student-lobby",
    component: StudentLobby
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/students-groups",
    name: "students-groups",
    component: StudentsGroups
  },
  {
    path: "/students-group/:id",
    name: "students-group",
    component: StudentsGroup
  },
  {
    path: "/classroom-prof/:id",
    name: "classroom-prof",
    component: ClassroomProf
  },
  {
    path: "/classroom-student/:id",
    name: "classroom-student",
    component: ClassroomStudent
  },
  {
    path: "/resources",
    name: "Resources",
    component: Resources
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
    path: "/professors",
    name: "professors",
    component: Professors
  },
  {
    path: "/professor/:id",
    name: "professor",
    component: Professor
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

import VueRouter from "vue-router"
const routes = [
  {
    path: "/d3",
    name: "d3",
    component: () => import("../view/dagred3.vue")
  },
  {
    path: "/echarts",
    name: "echarts",
    component: () => import("../view/echarts")
  },
  {
    path: "/newform",
    name: "newform",
    component: () => import("../view/newform")
  },
  {
    path: "/dialog",
    name: "dialog"
  }
]

export default new VueRouter({
  routes
})
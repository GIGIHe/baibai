import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from "@/components/HelloWorld";
import Index from "@/views/Index";



import Login from "@/components/Login";
import Admin from "@/views/Admin/addmin";
import Update from "@/views/Admin/update";
import Adminlist from "@/views/Admin/adminlist";
import Goodslist from "@/views/Goods/goodslist";
import Goods from "@/views/Goods/index";
import Update_g from "@/views/Goods/Update";
import Orderlist from "@/views/Order/orderlist";
import Update_order from "@/views/Order/Update";
import desc from "@/views/Order/desc";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Login
    },
    {
      path: "/index",
      name: "首页",
      component: Index,
      redirect:'/admin_list',
      children: [
        {
          path: "/add_admin",
          name: "添加管理员",
          component: Admin
        },
        {
          path: "/admin_list",
          name: "管理员列表",
          component: Adminlist
        },
        {
          path: "/update_admin",
          name: "修改个人信息",
          component: Update
        },
        {
          path: "/goods_list",
          name: "商品列表",
          component: Goodslist
        },
        {
          path: "/add_goods",
          name: "添加商品",
          component: Goods
        },
        {
          path: "/update_g",
          name: "修改商品信息",
          component: Update_g
        },
        {
          path: "/order_list",
          name: "订单列表",
          component: Orderlist
        },
        {
          path: "/update_order",
          name: "修改订单",
          component: Update_order
        },
        {
          path: "/order_desc",
          name: "订单信息",
          component: desc
        }
      ]
    }
  ]
});

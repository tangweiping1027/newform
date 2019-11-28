import MyEcharts from "./src";

export default {
  install: Vue => {
    Vue.component(MyEcharts.name, MyEcharts);
  }
};

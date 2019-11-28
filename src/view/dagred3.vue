<template>
  <div id="dagred3">
    <DagreD3 :nodes="nodes" :links="links"></DagreD3>
  </div>
</template>

<script>
let datas = [
  {
    fromCompany: "杭州聚焰营销策划有限公司",
    toCompany: "上海思特管理咨询有限公司",
    tradeFee: 20,
    level: 1
  },
  {
    fromCompany: "杭州聚焰营销策划有限公司",
    toCompany: "上海浦湘投资有限公司",
    tradeFee: 50,
    level: 1
  },
  {
    fromCompany: "杭州见微文化策划有限公司",
    toCompany: "上海思特管理咨询有限公司",
    tradeFee: 80,
    level: 1
  },
  {
    fromCompany: "杭州见微文化策划有限公司",
    toCompany: "深圳市威敏特实业有限公司",
    tradeFee: 100,
    level: 1
  },
  {
    fromCompany: "杭州见微文化策划有限公司",
    toCompany: "深圳市明见科技有限公司",
    tradeFee: 70,
    level: 1
  },
  {
    fromCompany: "深圳市世纪赢和科技有限公司",
    toCompany: "上海浦湘投资有限公司",
    tradeFee: 20,
    level: 2
  },
  {
    fromCompany: "深圳市予信科技有限公司",
    toCompany: "杭州聚焰营销策划有限公司",
    tradeFee: 300,
    level: 0
  },
  {
    fromCompany: "深圳市予信科技有限公司",
    toCompany: "杭州见微文化策划有限公司",
    tradeFee: 600,
    level: 0
  },
  {
    fromCompany: "深圳市予信科技有限公司",
    toCompany: "深圳市尼克科技有限公司",
    tradeFee: 200,
    level: 0
  },
  {
    fromCompany: "深圳市予信科技有限公司",
    toCompany: "深圳市明见科技有限公司",
    tradeFee: 100,
    level: 0
  },
  {
    fromCompany: "深圳市尼克科技有限公司",
    toCompany: "深圳市世纪赢和科技有限公司",
    tradeFee: 150,
    level: 1
  },
  {
    fromCompany: "深圳市明见科技有限公司",
    toCompany: "佛山霆格科技有限公司",
    tradeFee: 60,
    level: 1
  },
  {
    fromCompany: "深圳市明见科技有限公司",
    toCompany: "深圳市尼克科技有限公司",
    tradeFee: 50,
    level: 1
  }
];
export default {
  data () {
    return {
      nodes: [],
      links: []
    };
  },
  created () {
    let dataObj = {};
    datas.forEach(item => {
      if (!dataObj[item.fromCompany]) {
        dataObj[item.fromCompany] = {
          label: item.fromCompany,
          id: item.fromCompany
        };
      }
      if (!dataObj[item.toCompany]) {
        dataObj[item.toCompany] = {
          label: item.toCompany,
          id: item.toCompany
        };
      }
    });
    this.nodes = Object.values(dataObj);
    this.links = datas.map(item => {
      return {
        target: item.fromCompany,
        origin: item.toCompany
      };
    });
  },
  methods: {
    dataFormater (datas) {
      let dataObj = {};
      datas.forEach(item => {
        if (!dataObj[item.fromCompany]) {
          dataObj[item.fromCompany] = {
            label: item.fromCompany,
            id: item.fromCompany
          };
        }
        if (!dataObj[item.toCompany]) {
          dataObj[item.toCompany] = {
            label: item.toCompany,
            id: item.toCompany
          };
        }
      });
      this.nodes = Object.values(dataObj);
      this.links = datas.map(item => {
        return {
          target: item.fromCompany,
          origin: item.toCompany
        };
      });
      return {
        nodes: Object.values(dataObj),
        links: datas.map(item => {
          return {
            target: item.fromCompany,
            origin: item.toCompany
          };
        })
      };
    }
  }
};
</script>

<style lang="scss">
.dagred3 {
  background: #fff;
}
</style>

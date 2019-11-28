<template>
  <div class="my-echarts" id="my-echarts">
    my echarts demo
  </div>
</template>

<script>
import echarts from "echarts";
let nodes = [
  {
    name: "王老师",
    symbolSize: 130
  },
  {
    name: "学生1"
  },
  {
    name: "学生2"
  },
  {
    name: "学生3"
  },
  {
    name: "学生4"
  },
  {
    name: "学生5"
  },
  {
    name: "学生6"
  }
];
let links = [
  {
    source: "王老师",
    target: "学生1",
    name: "师生关系"
  },
  {
    source: "王老师",
    target: "学生2",
    name: "师生关系"
  },
  {
    source: 0,
    target: 3,
    name: "师生关系"
  },
  {
    source: 0,
    target: 4,
    name: "师生关系"
  },
  {
    source: 0,
    target: 5,
    name: "师生关系"
  },
  {
    source: 0,
    target: 6,
    name: "师生关系"
  },
  {
    source: 4,
    target: 1,
    name: "同学关系",
    lineStyle: {
      normal: {
        type: "dotted"
      }
    }
  },
  {
    source: 1,
    target: 4,
    name: "同学关系",
    lineStyle: {
      normal: {
        type: "dotted"
      }
    }
  },
  {
    source: 5,
    target: 2,
    name: "同学关系",
    lineStyle: {
      normal: {
        type: "dotted"
      }
    }
  },
  {
    source: 2,
    target: 5,
    name: "同学关系",
    lineStyle: {
      normal: {
        type: "dotted"
      }
    }
  }
];

let option = {
  title: { text: "关系图demo", subtext: "副标题" },
  tooltip: {
    // 鼠标放上去提示内容设置
    formatter: function(x) {
      if (x.data.des != undefined) {
        //设置提示框的内容和格式 节点显示des和边显示name属性
        return x.data.des;
      } else {
        return x.data.name;
      }
    }
  },
  toolbox: {
    show: true,
    feature: {
      //启用功能
      //dataView数据视图，打开数据视图，可设置更多属性,readOnly 默认数据视图为只读(即值为true)，可指定readOnly为false打开编辑功能
      dataView: { show: true, readOnly: true },
      restore: { show: true }, //restore，还原，复位原始图表
      saveAsImage: { show: true } //saveAsImage，保存图片
    }
  },
  legend: {
    // 设置图例
    left: "left",
    data: [
      {
        name: "师生关系",
        icon: "arrow",
        textStyle: "red"
      },
      {
        name: "同学关系",
        icon: "circle",
        textStyle: "blue"
      }
    ]
  },
  series: [
    {
      type: "graph",
      layout: "force",
      animation: true,
      symbolSize: 80,
      roam: "move",
      edgeSymbol: ["circle", "arrow"],
      focusNodeAdjacency: true,
      edgeSymbolSize: [4, 10],
      symbolOffset: [0, 0],
      edgeLabel: {
        normal: {
          textStyle: {
            fontSize: 20
          },
          show: true,
          formatter: function(x) {
            return x.data.name;
          }
        }
      },
      force: {
        initLayout: "circular",
        repulsion: 1000,
        edgeLength: [200, 300]
      },
      draggable: true,
      itemStyle: {
        normal: {
          color: "#4b565b"
        }
      },
      lineStyle: {
        normal: {
          width: 2,
          color: "#4b565b"
        }
      },
      label: {
        normal: {
          show: true,
          textStyle: {}
        }
      },
      nodes,
      links
    }
  ]
};

export default {
  name: "MyEcharts",
  data() {
    return {};
  },
  mounted() {
    this.echartsInit("my-echarts");
  },
  methods: {
    echartsInit(Id) {
      let myCharts = echarts.init(document.getElementById(Id));
      myCharts.setOption(option);
      myCharts.on("click", function() {
      });
    }
  }
};
</script>

<style lang="scss">
.my-echarts {
  background: #fff;
  width: 1000px;
  height: 700px;
}
</style>

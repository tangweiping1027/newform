<template>
  <div class="d3">
    <svg width="1360" height="700" />
  </div>
</template>

<script>
import * as d3 from "d3"
import * as dagreD3 from "dagre-d3"
import $ from 'jquery'
import Tipsy from './tipsy'
// eslint-disable-next-line no-unused-vars

var g = new dagreD3.graphlib.Graph()
  .setGraph({
    nodesep: 70,
    ranksep: 50,
    marginx: 20,
    marginy: 20
  })
  .setDefaultEdgeLabel(function () {
    return {}
  })
export default {
  name: "DagreD3",
  props: {
    direction: { // 图的方向
      type: String,
      default: "LR"
    },
    nodes: {
      type: Array,
      default: () => [
        {
          label: "",
          id: "",
          status: "success",
          titleDes: "" // label描述
        }
      ]
    },
    links: {
      type: Array,
      default: () => [
        {
          target: "",
          origin: "",
          lineDes: "" // line连线的描述
        }
      ]
    },
    zoom: { // 是否需要放大缩小
      type: Boolean,
      default: false
    },
    titleTip: { // 是否需要为label添加鼠标移入提示
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      NODE_LINKS_MAP: {},
      bgcHeight: 0,
      bgcWidth: 0,
      isMounted: false
    }
  },
  computed: {
    drawFlag () {
      return this.links.length && this.nodes.length && this.isMounted
    }
  },
  watch: {
    drawFlag (val) {
      if (val) {
        this.init()
      }
    }
  },
  mounted () {
    this.isMounted = true
    this.$eventBus.$on("window-resize", () => {
      this.bgcWidth = $(window).outerWidth()
      this.bgcHeight = $(window).outerHeight()
      this.drawFlag && this.init()
    })
    this.bgcHeight = $(window).outerHeight()
    this.bgcWidth = $(window).outerWidth()
  },
  methods: {
    init () {
      this.nodes.forEach(item => {
        this.NODE_LINKS_MAP[item.label] = {}
        this.NODE_LINKS_MAP[item.label].targets = []
      })

      this.links.forEach(item => {
        this.NODE_LINKS_MAP[item.target].lineDes = item.lineDes
        this.NODE_LINKS_MAP[item.target].targets.push(item.origin)
      })
      let dataFlow = []
      this.nodes.forEach(item => {
        this.NODE_LINKS_MAP[item.label] = {
          status: item.status || "success",
          ...this.NODE_LINKS_MAP[item.label],
          ...item
        }
      })
      dataFlow = Object.values(this.NODE_LINKS_MAP)
      dataFlow.forEach(item => {
        g.setNode(item.id, {
          label: item.label,
          class: "type-" + item.status,
          description: item.titleDes || ''
          // id: "status" + i
        })
        // Set up edges, no special attributes.
        item.targets.forEach(i => {
          g.setEdge(item.id, i, {
            label: item.lineDes || ""
          })
        })
      })
      g.nodes().forEach(function (v) {
        var node = g.node(v)
        // Round the corners of the nodes
        node && (node.rx = node.ry = 5)
      })
      g.graph().rankdir = this.direction
      // Create the renderer

      // eslint-disable-next-line new-cap
      var render = new dagreD3.render()

      // Set up an SVG group so that we can translate the final graph.
      var svg = d3.select("svg")
      var svgGroup = svg.append("g")
      // 是否可以放大缩小
      var inner = svg.select("g")
      if (this.zoom) {
        var zoom = d3.zoom().on("zoom", function () {
          inner.attr("transform", d3.event.transform)
        })
        svg.call(zoom)
      }
      // Simple function to style the tooltip for the given node.

      // Run the renderer. This is what draws the final graph.
      render(svgGroup, g)
      // var xCenterOffset = (svg.attr("width") - g.graph().width) / 2

      const height = this.bgcHeight - 200
      const width = this.bgcWidth - 246
      svgGroup.attr("transform", "translate(50, 20)")
      svg.attr("height", `${height}`)
      svg.attr("width", `${width}`)
      if (!this.titleTip) {
        return
      }
      Tipsy($)
      var styleTooltip = function (name, description) {
        return "<p class='name'>" + name + "</p> <p class='description'>" + description + "</p>"
      }
      svgGroup.selectAll("g.node")
        .attr("title", function (v) { return styleTooltip(v, g.node(v).description) })
        .each(function () { $(this).tipsy({ gravity: "w", opacity: 0.8, html: true }) })
    }
  }
}
</script>

<style lang="scss">
@import "./tipsy";
.d3 {
  g.type-current > rect {
    fill: #ef8172;
    color: white;
  }

  g.type-success > rect {
    fill: #f7b700;
    color: white;
  }

  text {
    font-weight: 300;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serf;
    font-size: 14px;
  }

  .node rect {
    stroke: #999;
    fill: #fff;
    stroke-width: 1.5px;
  }

  .edgePath path {
    stroke: #979797;
    stroke-width: 1.5px;
  }
}
</style>

<template>
  <!-- 普通输入控件 用于最普通的输入类型控件 -->
  <ElFormItem
    v-if="isNormal"
    :label-width="currentLabelWidth"
    :label="currentLabel"
    :key="required"
    :prop="required ? fieldName : ''"
    :rules="required ? schema.rules : undefined"
  >
    <template slot="label" v-if="schema.tip && !schema.noLabel">
      <template v-if="!schema.pend">
        {{currentLabel}}
        <ElTooltip v-if="schema.tip" placement="top">
          <span slot="content" v-html="schema.tip.content"></span>
          <i class="__info" :class="schema.tip.icon || 'el-icon-warning-outline'"></i>
        </ElTooltip>
      </template>
      <span v-else-if="!schema.pend.text">&nbsp;</span>
      <span v-else-if="schema.pend.text">{{currentLabel}}</span>
    </template>
    <div :class="{'form-flex': schema.widget !== 'radio'}">
      <FormInputs
        :item="schema"
        :disabled="disabled"
        :value="value"
        @input="$emit('input', $event), $emit('change', $event)"
      >
        <template v-if="schema.pend" :slot="schema.pend.type">{{schema.pend.text || schema.label}}</template>
      </FormInputs>
      <template v-if="schema.rightBtn">
        <ElButton v-bind="rightBtnBind" @click="rightBtnFn">{{schema.rightBtn.name}}</ElButton>
      </template>
      <template v-if="schema.lenMax">
        <el-button style="margin-left: 10px" type="default" plain icon="el-icon-plus" @click="handleArrayAdd(schema.i)"></el-button>
        <el-button
          style="margin-left: 10px"
          :style="{visibility: schema.value.length !== 1 ? null : 'hidden'}"
          type="default"
          plain
          icon="el-icon-minus"
          @click="handleArrayMinus(schema.i)"
        ></el-button>
      </template>
    </div>
  </ElFormItem>

  <!-- object类型组件， 分组组件 -->
  <ElFormItem
    class="form-object"
    v-else-if="schema.type === 'object'"
    :label="currentLabel"
    :label-width="currentLabelWidth"
  >
    <ElRow>
      <ElCol :span="schema.span || 24" v-for="(schema, key) in schema.properties" :key="key">
        <form-item
          :model="model"
          v-model="model[key]"
          @input="handleObjChange"
          :disabled="schema.disabled"
          :label-width="currentLabelWidth"
          :field-name="fieldName + '.' + key"
          :schema="schema"
        ></form-item>
      </ElCol>
    </ElRow>
  </ElFormItem>
  <!-- 表格类型的表单 -->
  <ElFormItem v-else-if="schema.type == 'table'">
    <slot name="btnLeft" v-bind:data="tableData"></slot>
    <ElButton v-if="schema.batch !== false" size="small" type="primary" @click="batchModify" plain>批量应用修改</ElButton>
    <ElTable
      ref="table"
      :row-key="schema.rows.rowKey || schema.rows.value"
      class="form-item-table"
      border
      :span-method="schema.rows.spanMethod"
      :data="tableData"
      :row-class-name="rowClassName"
    >
      <el-table-column
        align="center"
        v-if="schema.batch !== false"
        fixed="left"
        reserve-selection
        :selectable="selectable"
        type="selection"
        width="55"
      ></el-table-column>
      <ElTableColumn
        align="center"
        :label="schema.rows.label"
        :prop="schema.rows.value"
        :width="schema.width == 'auto' ? undefined : (schema.width || 150)"
      ></ElTableColumn>
      <template v-if="schema.rows.children">
        <ElTableColumn
          v-for="item in schema.rows.children"
          :key="item.value"
          align="center"
          :label="item.label"
          :prop="item.value"
          :width="schema.width == 'auto' ? undefined : (schema.width || 150)"
        ></ElTableColumn>
      </template>

      <ElTableColumn
        align="center"
        v-for="(val, key) in schema.head"
        :key="key"
        :label="val.label"
        :width="schema.width == 'auto' ? undefined : (schema.width || 200)"
        :prop="key"
      >
        <template slot-scope="scope">
          <form-item
            v-if="!val.child"
            :disabled="val.disabled"
            :model="scope.row[key]"
            v-model="scope.row[key]"
            label-width="0"
            :required="scope.$index !== 0"
            :field-name="fieldName + '.' + (schema.batch !== false ? (scope.$index - 1) : scope.$index) + '.' + key"
            :schema="{...val, required: (scope.$index === 0 && schema.batch !== false) ? false : val.required}"
          ></form-item>
          <div class="flex" v-else>
            <form-item
              class="mr10"
              v-for="(val, key) in val.child"
              :key="key"
              :disabled="val.disabled"
              :model="scope.row[key]"
              v-model="scope.row[key]"
              label-width="0"
              :required="scope.$index !== 0"
              :field-name="fieldName + '.' + (schema.batch !== false ? (scope.$index - 1) : scope.$index) + '.' + key"
              :schema="{...val, required: (scope.$index === 0 && schema.batch !== false) ? false : val.required}"
            ></form-item>
          </div>
        </template>
      </ElTableColumn>
    </ElTable>
  </ElFormItem>
  <!-- 累加表单 -->
  <div v-else-if="schema.type == 'array'">
    <form-item
      v-for="(item, index) in value"
      :key="index"
      :disabled="schema.disabled"
      :model="value[index]"
      v-model="value[index]"
      :label-width="currentLabelWidth"
      :field-name="fieldName + '.' + (index)"
      :schema="{...schema, type: 'normal', label: schema.label + (index + 1), value, i: index }"
    ></form-item>
  </div>
</template>
<script>
// import FormInputs from './form-inputs'
import formUtils from './utils'
export default {
  name: 'form-item',
  // components: {
  //   FormInputs
  // },
  props: {
    // 根表单的值
    rootVal: {
      type: Object
    },
    model: [Object, String, Array, Boolean, Number],
    labelWidth: String,
    value: [String, Array, Number, Object, Boolean],
    // 控件属性
    schema: Object,
    // 字段
    fieldName: String,
    // // 是否必填
    // required: {
    //   default: true,
    //   type: Boolean
    // },
    // 禁用函数，通过这个判断控件是否禁用
    disabled: {
      type: [Function, Boolean],
      default: () => false
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      apply: this.getTableDefaultVal()
    }
  },
  watch: {
    'schema.required': {
      deep: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.schema.rules = formUtils.getvalidRules(this.schema)
        }
      }
    }
  },
  computed: {
    rightBtnBind() {
      let btn = this.schema.rightBtn
      if (btn) {
        // eslint-disable-next-line no-unused-vars
        const { fn, ...info } = btn
        return info
      }
      return {}
    },
    rightBtnFn() {
      let btn = this.schema.rightBtn
      if (btn) {
        // eslint-disable-next-line no-unused-vars
        const fn = btn.fn
        return fn
      }
      return () => {}
    },
    required() {
      return !!this.schema.required
    },
    isNormal() {
      return (
        this.schema.type !== 'object' &&
        this.schema.type !== 'table' &&
        this.schema.type !== 'array'
      )
    },
    isVertical() {
      return this.schema.layout === 'v'
    },
    currentLabelWidth() {
      return this.schema.noLabel ||
        !this.schema.label ||
        (this.schema.pend && !this.schema.pend.text)
        ? '0'
        : this.isVertical
        ? '0'
        : this.schema.labelWidth || this.labelWidth
    },
    currentLabel() {
      return this.schema.noLabel ||
        !this.schema.label ||
        (this.schema.pend && !this.schema.pend.text)
        ? ''
        : this.schema.label
    },
    // table的表格数据
    tableData() {
      if (this.schema.batch === false) {
        return this.value
      }
      return [].concat(this.apply, this.value)
    }
  },
  methods: {
    handleObjChange(val) {
      if (val != null && val !== '') {
        this.$emit('objChange')
      }
    },
    getTableDefaultVal() {
      if (!this.schema.head) {
        return
      }
      let ret = {}

      Object.keys(this.schema.head).forEach(key => {
        ret[key] = formUtils.getInputDefault(this.schema.head[key])
      })
      return ret
    },
    // eslint-disable-next-line no-unused-vars
    rowClassName({ row, rowIndex }) {
      if (rowIndex == 0 && this.schema.batch !== false) {
        return 'first'
      }
    },
    selectable(row, index) {
      if (index == 0) {
        return false
      } else {
        return true
      }
    },
    batchModify() {
      let tableData = this.$refs.table.selection
      if (!tableData.length) {
        return
      }
      const firstRow = this.apply
      tableData.forEach(el => {
        Object.keys(firstRow).forEach(key => {
          let e = firstRow[key]
          if (e != null && e !== '') {
            this.$set(el, key, e)
          }
        })
      })
      this.apply = this.getTableDefaultVal()
    },
    handleArrayAdd(index) {
      if (this.schema.value.length === this.schema.lenMax) {
        this.$message.warning(`最多只能添加${this.schema.lenMax}个`)
        return
      }
      this.schema.value.splice(
        index + 1,
        0,
        formUtils.getInputDefault(this.schema)
      )
    },
    handleArrayMinus(index) {
      this.schema.value.splice(index, 1)
    }
  }
}
</script>
<style lang='scss' scoped>
.__info {
  font-size: 15px;
}
.form-item-table {
  border: 1px solid #bec6ce;
  margin-top: 20px;
  border-width: 1px 0 0 1px;

  &.el-table /deep/ th {
    background: #f2f2f2;
  }
  /deep/ .first {
    background: #d9d9ff;
  }
  &.el-table /deep/ td,
  &.el-table /deep/ th.is-leaf {
    border-right: 1px solid #bec6ce !important;
    border-bottom: 1px solid #bec6ce;
  }
  & /deep/ .el-checkbox__input.is-disabled {
    display: none;
  }
}
.form-flex {
  display: flex;
  width: 100%;
}
</style>
<template>
  <el-form
    :disabled="disabled"
    class="new-form"
    :class="{'no-show-message': !showMessage}"
    :show-message="showMessage"
    ref="ruleform"
    size="small"
    v-if="!isSchemaChange"
    :model="value"
  >
    <!-- {{dataFormSchema}} -->
    <ElRow v-if="inline === false" :gutter="20">
      <template v-for="(schema, key) in dataFormSchema">
        <ElCol v-if="!schema.hidden(value)" :key="key" :span="schema.span || 24">
          <form-item
            @change="handleInput(schema, key, $event)"
            @objChange="handleObjChange"
            :root-val="value"
            v-bind="$attrs"
            :key="key"
            :disabled="schema.disabled.bind(null, value)"
            v-model="value[key]"
            :field-name="key"
            :schema="schema"
            :model="value[key]"
          ></form-item>
        </ElCol>
      </template>
      <div v-if="$slots.default" class="el-col el-col-4" style="width: 300px">
        <slot></slot>
      </div>
    </ElRow>
    <template v-else>
      <template v-for="(schema, key) in dataFormSchema">
        <div class="inline-box" v-if="search !== false ? !schema.hidden : !schema.hidden(value)" :key="key">
          <form-item
            @objChange="handleObjChange"
            @change="handleInput(schema, key)"
            :root-val="value"
            v-bind="$attrs"
            :key="key"
            :disabled="schema.disabled.bind(null, value)"
            v-model="value[key]"
            :field-name="key"
            :schema="schema"
            :model="value[key]"
          ></form-item>
          <el-button
            @click="handleClose(schema, key)"
            v-if="search !== false && schema._close"
            type="text"
            icon="el-icon-close"
            class="close"
          ></el-button>
        </div>
      </template>
      <div class="inline-btn" v-if="$slots.default">
        <slot></slot>
      </div>
    </template>
  </el-form>
</template>

<script>
import formItem from './form-item'
import formUtils from './utils'
import isEqual from 'lodash/isEqual'
import bus from './event'

export default {
  name: 'NewForm',
  inheritAttrs: false,
  components: {
    'form-item': formItem
  },

  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    showMessage: {
      default: true,
      type: Boolean
    },
    // 表单是否不可编辑
    disabled: {
      default: false,
      type: Boolean
    },
    // 搜索表单
    search: {
      default: false
    },
    // 是否行内排列，默认layout方式排列，设为true后layout失效
    inline: {
      default: false
    },
    // 所有表单组成配置
    formSchema: {
      type: Object
    },

    // 表单的值
    value: {
      type: [Object, Array]
    },

    // 表单名 搜索组件时用来存储常用筛选
    formName: {
      type: String,
      default: 'ruleForm'
    },

    // 是否有外部输入
    isDirty: {
      type: Boolean,
      default: false
    },

    // 表格验证状态
    // 在不触发validate的情况下判断表单验证是否通过
    validSuccess: {
      type: Boolean,
      default: false
    }
  },

  created() {
    this.bindFlEvt = loading => {
      this.$emit('update:fileLoading', loading)
    }
    bus.$on('isFileLoading', this.bindFlEvt)
  },
  beforeDestroy() {
    bus.$off('isFileLoading', this.bindFlEvt)
    this.bindFlEvt = null
  },

  watch: {
    formSchema: {
      immediate: true,
      handler(newVal, oldVal) {
        // 只有外部formSchema变化的时候才会触发
        if (
          JSON.stringify(newVal) !== JSON.stringify(oldVal) &&
          !this.innerChange
        ) {
          this.isSchemaChange = true
          this.$nextTick(() => {
            this.isSchemaChange = false
            this.handleSchema()
          })
        }
      }
    },
    value: {
      deep: true,
      handler(val) {
        this.$nextTick(() => {
          this.isValidSuccess()
        })
        this.$emit('update:isDirty', !isEqual(val, this.$options.originVal))
        this.$emit('change', val)
      }
    }
  },

  data() {
    return {
      isSchemaChange: false,
      // 处理后的表单值，最终以此生成表单
      dataFormSchema: {},
      innerChange: false
    }
  },
  methods: {
    handleInput(schema) {
      if (schema.change) {
        schema.change(this.value)
      }
    },
    handleObjChange() {
      this.$emit('search')
    },
    isValidSuccess() {
      // console.log(111);
      let { ruleform } = this.$refs
      if (!ruleform) {
        return
      }
      let validSuccess = ruleform.fields.every(field => {
        return !formUtils.isEmpty(field.fieldValue) && field.validateState !== 'error'
      })
      this.$emit('update:validSuccess', validSuccess)
    },
    setInnerChange(val) {
      this.innerChange = val
    },
    handleSchema() {
      // 补全表格配置
      let dataFormSchema = formUtils.generateForm(this.formSchema, this.search)
      // 生成默认值, 如果已经生成过，要把之前的值也合成
      formUtils.setDefaultVal(this.value, dataFormSchema)
      if (this.$options.defaultVal) {
        Object.assign(this.value, this.$options.defaultVal)
      } else {
        this.$options.defaultVal = JSON.parse(JSON.stringify(this.value))
      }

      this.$options.originVal = JSON.parse(JSON.stringify(this.value))
      this.dataFormSchema = dataFormSchema
      // 同步数据，否则会出现外部数据与内部数据更新不同步的情况
      this.$emit('change', JSON.parse(JSON.stringify(this.value)))
      this.$nextTick(() => {
        this.$emit('update:isDirty', false)
      })
    },

    // 验证表单
    validate(cb) {
      if (cb) {
        return this.$refs.ruleform.validate(cb)
      }
      return this.$refs.ruleform.validate()
    },
    handleClose(schema, key) {
      this.innerChange = true
      schema.hidden = true
      if (schema.type === 'object') {
        this.$set(this.value, key, {})
      } else {
        this.$set(this.value, key, undefined)
      }
      
      this.$emit('close')
      this.$nextTick(() => {
        this.innerChange = false
      })
    },

    // 重置表单
    reset() {
      this.innerChange = true
      this.$emit('change', JSON.parse(JSON.stringify(this.$options.originVal)))
      setTimeout(() => {
        this.$emit('update:isDirty', false)
        this.$refs.ruleform.clearValidate()
        this.innerChange = false
      })
    }
  }
}
</script>

<style lang='scss'>
.new-form {
  overflow: hidden;
  .form-item-table {
    margin-bottom: 20px;
    &.el-table td,
    &.el-table th {
      vertical-align: baseline;
    }
    .el-form-item {
      margin-bottom: 0;
      &.is-required.is-error {
        margin-bottom: 18px;
      }
    }
  }
  &.no-show-message .form-item-table {
    &.el-table td,
    &.el-table th {
      vertical-align: middle;
    }
    .el-form-item.is-required.is-error {
      margin-bottom: 0;
    }
  }
  .el-input-number .el-input__inner {
    text-align: left;
  }
  .inline-box {
    // display: inline-block;
    float: left;
    margin-right: 30px;
    margin-bottom: 12px;
    position: relative;
    height: 32px;
    & + .inline-box {
      margin-right: 48px;

      &::before {
        content: '';
        display: block;
        width: 1px;
        height: 100%;
        position: absolute;
        left: -16px;
        top: 0;
        background-color: #ddd;
      }
    }
    .close {
      position: absolute;
      top: 0;
      right: -24px;
      padding: 0;
      .el-icon-close {
        color: #999;
        font-size: 16px;
        &:hover {
          color: #333;
        }
      }
    }
  }

  .inline-btn {
    float: left;
    .el-button--primary.is-plain {
      i {
        line-height: 6px;
      }
    }
  }
}
.is-simple {
  .inline-box + .inline-box {
    margin-right: 30px;
  }
}
</style>

<template>
  <div>
    <new-form
      ref="form"
      :is-dirty.sync="isDirty"
      :valid-success.sync="validSuccess"
      v-model="formData"
      label-width="100px"
      :form-schema="dataFormSchema"
    ></new-form>
    <!-- <ElButton type="text" :disabled="!isDirty" @click="submit">submit</ElButton> -->
    <ElButton type="text" @click="reset">reset</ElButton>
  </div>
</template>

<script>
export default {
  props: ["a"],
  data() {
    let id = 0;
    return {
      isDirty: false,
      validSuccess: false,
      formData: {
        input: "1233",
        object: {
          table: [
            { color: "1", size: "2", sku: "sku3" },
            { sku: "sku2", color: "55", size: "88" }
          ]
        },
        table: [
          { color: "1", size: "2", sku: "sku3" },
          { sku: "sku2", color: "3", size: "4" }
        ],
        array: ["1", "2"],
        editor: "&lt;p&gt;123&lt;br/&gt;&lt;/p&gt;"
      },
      dataFormSchema: {
        // 字段名
        input: {
          // 隐藏函数，data为表单数据，如果返回true隐藏当前表单项
          hidden(data) {
            return data.input1 === "2";
          },
          // 禁用函数，data为表单数据，如果返回true表示禁用当前表单项
          // disabled: true,
          disabled(data) {
            return data.input1 === "3";
          },
          type: "normal", // 数据类型，默认为normal，即单个输入框
          widget: "input", // 控件类型，对应element控件
          label: "input", // 标签内容
          noLabel: false, // 是否取消显示label
          // showType: 'password', // [text | password] 显示类型， 默认text, password为密码类型
          // layout: 'v', // 布局形式[v | h], 默认左右布局, v为上下布局，h为左右布局
          span: 24, // 布局占用宽度
          defaultVal: "", // 默认值
          placeholder: "占位1", // 占位字符
          rightBtn: {
            type: "text",
            name: "name",
            fn: () => {}
          },
          tip: {
            // 帮助信息
            content: "这是说明", // 内容
            icon: "el-icon-question" // 图标
          },
          required: {
            // 验证规则。默认不验证
            // 可选类型 [true | false | {value: 'url', errMsg: ''} | 'url' | 'tel' | 'email']
            // 也可以自己自定义验证规则 value 为函数时，为自定义规则
            value: "url",
            errMsg: "自定义错误信息"
          }
        },
        select: {
          type: "normal", // 数据类型，默认为normal，即单个输入框
          widget: "select", // 控件类型，对应element控件
          label: "select", // 标签内容
          noLabel: false, // 是否取消显示label
          multi: 2, // 是否多选，true不限制数量， 如果是数字表示最多能选择的数量
          // showType: 'password', // [text | password] 显示类型， 默认text, password为密码类型
          // layout: 'v', // 布局形式[v | h], 默认左右布局, v为上下布局，h为左右布局
          span: 24, // 布局占用宽度
          defaultVal: "", // 默认值
          options: [
            {
              label: "1",
              value: 1
            }
          ],
          placeholder: "占位1", // 占位字符
          tip: {
            // 帮助信息
            content: "这是说明", // 内容
            icon: "el-icon-question" // 图标
          },
          required: "tel"
        },

        // number 数字
        number: {
          widget: "number",
          label: "number",
          span: 12
        },
        // currency 货币
        currency: {
          widget: "currency",
          label: "currency",
          span: 12,
          signal: "$" // 货币符号
        },
        // textarea 多行文本
        textarea: {
          widget: "textarea",
          label: "textarea",
          span: 12,
          rows: 2
        },
        // checkbox 多选
        checkbox: {
          widget: "checkbox",
          label: "checkbox",
          span: 12,
          options: [
            {
              label: "1",
              value: 1
            },
            {
              label: "2",
              value: 2
            },
            {
              label: "3",
              value: 3
            },
            {
              label: "4",
              value: 4
            },
            {
              label: "5",
              value: 5
            },
            {
              label: "6",
              value: 6
            },
            {
              label: "7",
              value: 7
            },
            {
              label: "8",
              value: 8
            },
            {
              label: "9",
              value: 9
            },
            {
              label: "10",
              value: 10
            }
          ]
        },

        // switch 开关
        switch: {
          widget: "switch",
          label: "switch",
          span: 12,
          activeValue: true, // 打开状态的值，默认1
          inactiveValue: false // 关闭状态的值，默认0
          // options: [
          //   {
          //     label: '开',
          //     value: 1
          //   },
          //   {
          //     label: '关',
          //     value: 0
          //   }
          // ]
        },

        // radio
        radio: {
          widget: "radio",
          label: "radio",
          span: 12,
          options: [{ label: 1, value: 1 }]
        },

        // cascader 级联选择器
        cascader: {
          widget: "cascader",
          label: "cascader",
          span: 12,
          // 自定义节点内容
          render(h, { node, data }) {
            return (
              <span>
                {data.label}({node.level})
              </span>
            );
          },
          // 对应element props
          props: {
            lazy: true,
            lazyLoad(node, resolve) {
              const { level } = node;
              setTimeout(() => {
                const nodes = Array.from({ length: level + 1 }).map(() => ({
                  value: ++id,
                  label: `选项${id}`,
                  leaf: level >= 2
                }));
                // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                resolve(nodes);
              }, 1000);
            }
          }
        },

        // date 日期
        date: {
          widget: "date",
          label: "date",
          span: 12
        },

        // datetime 日期 + 时间
        datetime: {
          widget: "date",
          label: "datetime",
          time: true, // 是否显示时间
          span: 12
        },

        // daterange 日期范围
        daterange: {
          widget: "daterange",
          label: "daterange",
          span: 12
        },

        // datetimerange 日期时间范围
        datetimerange: {
          widget: "datetimerange",
          label: "datetimerange",
          span: 12
        },

        // 上传文件
        upload: {
          widget: "upload",
          label: "upload",
          action: "https://jsonplaceholder.typicode.com/posts/",
          // multiple: true,
          required: true,
          limitSize: 0.5, // 限制上传文件大小，单位m  默认限制10m
          fileLimit: ["excel", "word", "image", "all"], // [word | excel | image | all] 文件类型
          // onPreview:"handlePreview",
          limit: 1
        },

        object: {
          // 嵌套数据
          type: "object",
          label: "object",
          span: 24,
          properties: {
            user: {
              widget: "input",
              label: "user",
              span: 12,
              // label前置或者后置
              pend: {
                type: "prepend" // [prepend | append]
              }
            },
            password: {
              widget: "input",
              label: "password",
              span: 12
            },
            table: {
              // 表格数据
              type: "table",
              label: "table",
              width: "auto", // 如果不设置每一列的宽度，用这个，能最优分配表格列的宽度
              head: {
                color: {
                  type: "input",
                  width: 200, // 列宽，父级如果设置了 ↑ 宽度， 此设置不生效
                  label: "颜色",
                  noLabel: true,
                  required: true
                },
                size: {
                  type: "input",
                  label: "尺寸",
                  noLabel: true
                },
                checkbox: {
                  widget: "checkbox",
                  noLabel: true,
                  span: 12,
                  options: [
                    {
                      label: "1",
                      value: 1
                    },
                    {
                      label: "2",
                      value: 2
                    },
                    {
                      label: "3",
                      value: 3
                    },
                    {
                      label: "4",
                      value: 4
                    },
                    {
                      label: "5",
                      value: 5
                    },
                    {
                      label: "6",
                      value: 6
                    },
                    {
                      label: "7",
                      value: 7
                    },
                    {
                      label: "8",
                      value: 8
                    },
                    {
                      label: "9",
                      value: 9
                    },
                    {
                      label: "10",
                      value: 10
                    }
                  ]
                }
              },
              rows: {
                label: "SKU",
                value: "sku"
                // props: {
                //   // sku3: {
                //   //   // 当前行的默认值，如果不存在可以留空
                //   //   // 注意，如果在v-model绑定的变量中已经定义值，将会覆盖此处默认值
                //   //   defaultVal: {
                //   //     color: '1',
                //   //     size: '2'
                //   //   }
                //   // },
                //   // sku2: {}
                // }
              }
            }
          }
        },
        table: {
          // 表格数据
          type: "table",
          label: "table",
          width: "auto", // 保持宽度自动
          head: {
            // 头每列信息
            color: {
              // 跟最外层的基本控件属性一致
              type: "input",
              label: "颜色",
              noLabel: true
            },
            size: {
              // 跟最外层的基本控件属性一致
              type: "input",
              label: "尺寸",
              noLabel: true
            }
          },
          rows: {
            // 行信息
            label: "SKU", // 每一行的标记数据 一般为SKU,也是表头之一
            value: "sku",
            props: {
              // 行数据
              sku3: {
                // 每行数据一个对象，目前只有defaultVal，即默认值，当然默认值也可以设置在formData上，会覆盖此处的值
                defaultVal: {
                  color: "1",
                  size: "2"
                }
              },
              sku2: {}
            }
          }
        },
        // 多行数组数据
        array: {
          lenMax: 5, // 累加最大值
          type: "array", // 数据类型，默认为normal，即单个输入框
          widget: "input", // 控件类型，对应element控件
          label: "input", // 标签内容
          noLabel: false, // 是否取消显示label
          layout: "h", // 布局形式[v | h],  v为上下布局，h为左右布局
          span: 24, // 布局占用宽度
          defaultVal: "", // 默认值
          placeholder: "占位", // 占位字符
          tip: {
            // 帮助信息
            content: "这是说明", // 内容
            icon: "el-icon-question" // 图标
          },
          required: {
            value: true, // 验证规则。默认不验证。如果值为函数，则设置为rules中的validator。可选 true / asin / url
            errMsg: "自定义错误信息"
          }
        }
      }
    };
  },
  methods: {
    submit() {
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    // eslint-disable-next-line
    loadTree(id = [0], selEl) {
      if (!selEl) {
        selEl = {
          pcid: 0
        };
      }
      let { pcid } = selEl;
      let params = {
        parentPcid: pcid,
        siteId: this.siteId,
        platformId: this.platformId
      };
      return this.$api[`productCategoryGetCategory`](params)
        .then(data => {
          if (data && data.code && data.code !== 0) {
            this.$message.error(data.msg);
            return;
          }

          return data.data.map(el => {
            return {
              ...el,
              childs: el.haveChildren ? [] : null,
              enabled: true,
              isLeaf: !el.haveChildren
            };
          });
        })
        .catch(() => {});
    },
    _submit() {
      return this.submit().then(() => {
        // return this.$api[`url`](params).then(res => "reset"); // 关闭弹重置并刷新
        // return this.$api[`url`](params).then(res => false); // 不关闭弹窗
        // return this.$api[`url`](params); // 关闭弹窗刷新
      });
    }
  }
};
</script>

<style>
</style>

Component({
  properties: {
    options: {
      type: Array,
      value: []
    },
    defaultOption: {
      type: Object,
      value: {
        id: 0,
        name: '请选择'
      }
    },
    key: {
      type: String,
      value: 'id'
    },
    text: {
      type: String,
      value: 'name'
    }
  },
  data: {
    result: [],
    isShow: false,
    current: {}
  },
  methods: {
    optionTap(e) {
      let dataset = e.target.dataset
      this.setData({
        current: dataset,
        isShow: false
      });

      // 调用父组件方法，并传参
      this.triggerEvent("change", { ...dataset })
    },
    openClose() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    transferResult(){
      // 属性名称转换, 如果不是 { id: '', name:'' } 格式，则转为 { id: '', name:'' } 格式
      let result = []
      if (this.data.key !== 'id' || this.data.text !== 'name') {       
        for (let item of this.data.options) {
          let { [this.data.key]: id, [this.data.text]: name } = item
          result.push({ id, name })
        }
      }
      this.setData({
        result: result
      })
    },
    // 此方法供父组件调用
    close() {
      this.setData({
        isShow: false
      })
    },
    reset() {
      this.setData({
        current: Object.assign({}, this.data.defaultOption),
      })
    }
  },
  observers:{
    'options':function(value){
      this.transferResult()
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        current: Object.assign({}, this.data.defaultOption),
      })
      this.transferResult()
    }
  }
})

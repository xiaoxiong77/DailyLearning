class Vue {
  constructor(options) {
    this.$options = options || {};
    this.$data = options.data || {};
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
    this.$methods = options.methods || {};
    this._proxyData(this.$data);
    this._proxyMethods(this.$methods);
    new Observer(this.$data);
    new Compiler(this)
  }

  _proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key];
        },
        set(newValue) {
          if (newValue === data[key]) return;
          data[key] = newValue;
        }
      })
    })
  }

  _proxyMethods(methods) {
    Object.keys(methods).forEach(methodName => {
      Object.defineProperty(this, methodName, {
        enumerable: true,
        configurable: true,
        get() {
          return methods[methodName];
        }
      })
    })
  }
}
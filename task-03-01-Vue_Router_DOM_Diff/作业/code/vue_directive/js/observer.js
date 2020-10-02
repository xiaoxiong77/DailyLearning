class Observer {
  constructor(data) {
    this.walk(data)
  }

  walk(data) {
    if (!data || typeof data !== 'object') return;

    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive(obj, key, value) {
    const self = this;

    // sub用于收集依赖并发送通知
    const dep = new Dep();
    this.walk(value); // 如果value为对象则将其转换为响应式对象
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 收集依赖
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newValue) {
        if (newValue === value) return;
        value = newValue;
        self.walk(newValue);
        // 发送通知
        dep.notify();
      }
    })
  }
}
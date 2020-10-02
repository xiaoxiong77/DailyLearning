class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    // data中的属性名
    this.key = key;
    this.cb = cb;

    // 将watcher对象添加到Dep.target中
    Dep.target = this;
    // 触发get方法，调用addSub
    this.oldValue = vm[key];
    Dep.target = null;
  }

  // 当数据变化时更新视图
  update() {
    const newValue = this.vm[this.key];
    if (this.oldValue === newValue) return
    this.cb(newValue)
  }
}
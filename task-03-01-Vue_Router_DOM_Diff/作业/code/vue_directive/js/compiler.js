class Compiler {
  constructor(vm) {
    this.vm = vm
    this.el = vm.$el
    this.compile(this.el)
  }

  compile(el) {
    // 编译模板，处理文本节点与元素节点
    const childNodes = Array.from(el.childNodes);
    childNodes.forEach(node => {
      if (this.isTextNode(node)) {
        this.compileText(node);
      } else if (this.isElementNode(node)) {
        this.compileElement(node);
      }

      if (node.childNodes && node.childNodes.length !== 0) {
        this.compile(node);
      }
    })
  }

  compileElement(node) {
    // console.log(node.attributes)
    const attributes = Array.from(node.attributes);
    attributes.forEach(attr => {
      if (this.isDirective(attr.name)) {
        const attrName = attr.name.substr(2);
        const key = attr.value;
        this.update(node, key, attrName)
      }
    })
  }

  compileText(node) {
    // console.dir(node)
    const reg = /\{\{(.+?)\}\}/;
    const value = node.textContent;
    if (reg.test(value)) {
      const key = RegExp.$1.trim();
      node.textContent = value.replace(reg, this.vm[key])

      // 创建watcher对象
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue;
      })
    }
  }

  update(node, key, attrName) {
    let updateFn;
    if (attrName.startsWith('on')) {
      updateFn = this.onUpdater;
      const eventType = attrName.split(':')[1];
      updateFn && updateFn.call(this, node, this.vm[key], eventType);
    } else {
      updateFn = this[`${attrName}Updater`];
      updateFn && updateFn.call(this, node, this.vm[key], key);
    }
  }

  textUpdater(node, value, key) {
    node.textContent = value;
    new Watcher(this.vm, key, newValue => {
      node.textContent = newValue;
    })
  }

  modelUpdater(node, value, key) {
    node.value = value;
    new Watcher(this.vm, key, newValue => {
      node.value = newValue;
    })
    // 双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value;
    })
  }

  htmlUpdater(node, value, key) {
    node.innerHTML = value;
    new Watcher(this.vm, key, newValue => {
      node.innerHTML = newValue;
    })
  }

  onUpdater(node, handler, eventType) {
    node.addEventListener(eventType, handler);
  }

  isDirective(attrName) {
    return attrName.startsWith('v-')
  }

  isTextNode(node) {
    return node.nodeType === Node.TEXT_NODE; // 3
  }

  isElementNode(node) {
    return node.nodeType === Node.ELEMENT_NODE; // 1
  }
}
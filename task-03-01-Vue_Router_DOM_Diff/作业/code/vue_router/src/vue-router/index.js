let _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) return
  
  const isDef = v => v !== undefined

  install.installed = true;
  _Vue = Vue;

  _Vue.mixin({
    beforeCreate() {
      if (isDef(this.$options.router)) {
        _Vue.prototype.$router = this.$options.router;
        this.$options.router.init();
      }
    },
  })
}

class VueRouter {
  static install = install;

  constructor(options) {
    this.options = options;
    this.mode = this.options.mode;
    this.routeMap = {};
    const currentPath = this.getPathName() || '/';
    if (currentPath === '/' && this.mode === 'hash') {
      history.replaceState({}, document.title, '#/')
    }
    this.data = _Vue.observable({
      current: this.getPathName() || '/'
    })
  }

  init() {
    this.initEvent();
    this.createRouteMap();
    this.initComponents(_Vue);
  }

  createRouteMap() {
    this.options.routes.forEach(item => {
      this.routeMap[item.path] = item.component;
    })
  }

  initComponents(Vue) {
    const self = this;
    Vue.component('router-link', {
      name: 'RouterLink',
      props: {
        to: String
      },
      methods: {
        clickHandler(e) {
          e.preventDefault();
          self.pushState({}, '', this.to)
          this.$router.data.current = this.to;
        }
      },
      render(createElement) {
        return createElement('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: [this.clickHandler]
          }
        }, [this.$slots.default])
      }
    })
    Vue.component('router-view', {
      name: 'RouterView',
      render (createElement) {
        const component = self.routeMap[self.data.current]
        return createElement(component)
      }
    })
  }

  initEvent() {
    if (this.mode === 'hash') {
      window.addEventListener('hashchange', (event) => {
        this.data.current = this.getPathName()
        console.log(event)
      })
    } else {
      window.addEventListener('popstate', () => {
        this.data.current = this.getPathName()
      })
    }
  }

  getPathName() {
    if (this.mode === 'hash') {
      return window.location.hash.substr(1);
    }
    return window.location.pathname;
  }

  pushState(state, title, url) {
    if (this.mode === 'hash') {
      history.pushState(state, title, '#' + url)
    } else {
      history.pushState(state, title, url)
    } 
  }
}

export default VueRouter

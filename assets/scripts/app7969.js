(function () {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var _default =
  /*#__PURE__*/
  function () {
    function _default(options) {
      _classCallCheck(this, _default);

      this.mAttr = 'data-' + options.name;
      this.el = options.el;
    }

    _createClass(_default, [{
      key: "mInit",
      value: function mInit(modules) {
        var _this = this;

        this.modules = modules;
        this.mCheckEventTarget = this.mCheckEventTarget.bind(this);

        if (this.events) {
          Object.keys(this.events).forEach(function (event) {
            return _this.mAddEvent(event);
          });
        }
      }
    }, {
      key: "mUpdate",
      value: function mUpdate(modules) {
        this.modules = modules;
      }
    }, {
      key: "mDestroy",
      value: function mDestroy() {
        var _this2 = this;

        if (this.events) {
          Object.keys(this.events).forEach(function (event) {
            return _this2.mRemoveEvent(event);
          });
        }
      }
    }, {
      key: "mAddEvent",
      value: function mAddEvent(event) {
        this.el.addEventListener(event, this.mCheckEventTarget);
      }
    }, {
      key: "mRemoveEvent",
      value: function mRemoveEvent(event) {
        this.el.removeEventListener(event, this.mCheckEventTarget);
      }
    }, {
      key: "mCheckEventTarget",
      value: function mCheckEventTarget(e) {
        var event = this.events[e.type];

        if (typeof event === "string") {
          this[event](e);
        } else {
          var data = '[' + this.mAttr + ']';
          var target = e.target;

          while (target && target !== document) {
            if (target.matches(data)) {
              var name = target.getAttribute(this.mAttr);

              if (event.hasOwnProperty(name)) {
                var method = event[name];
                Object.defineProperty(e, 'currentTarget', {
                  value: target
                });
                this[method](e);
                break;
              }
            }

            target = target.parentNode;
          }
        }
      }
    }, {
      key: "$",
      value: function $(query, context) {
        var classIndex = query.indexOf('.');
        var idIndex = query.indexOf('#');
        var attrIndex = query.indexOf('[');
        var indexes = [classIndex, idIndex, attrIndex].filter(function (index) {
          return index != -1;
        });
        var index = false;
        var name = query;
        var more = '';
        var parent = this.el;

        if (indexes.length) {
          index = Math.min.apply(Math, _toConsumableArray(indexes));
          name = query.slice(0, index);
          more = query.slice(index);
        }

        if (_typeof(context) == 'object') {
          parent = context;
        }

        var els = parent.querySelectorAll('[' + this.mAttr + '=' + name + ']' + more);

        if (els.length == 1) {
          return els[0];
        } else {
          return els;
        }
      }
    }, {
      key: "parent",
      value: function parent(query, context) {
        var data = '[' + this.mAttr + '=' + query + ']';
        var parent = context;

        while (parent && parent !== document) {
          if (parent.matches(data)) {
            return parent;
          }

          parent = parent.parentNode;
        }
      }
    }, {
      key: "data",
      value: function data(name, context) {
        var target = context || this.el;
        return target.getAttribute(this.mAttr + '-' + name);
      }
    }, {
      key: "call",
      value: function call(func, args, mod, id) {
        var _this3 = this;

        if (args && !mod) {
          mod = args;
          args = false;
        }

        if (id) {
          this.modules[mod][id][func](args);
        } else {
          Object.keys(this.modules[mod]).forEach(function (id) {
            _this3.modules[mod][id][func](args);
          });
        }
      }
    }, {
      key: "init",
      value: function init() {}
    }, {
      key: "destroy",
      value: function destroy() {}
    }]);

    return _default;
  }();

  var _default$1 =
  /*#__PURE__*/
  function () {
    function _default(options) {
      _classCallCheck(this, _default);

      this.app;
      this.modules = options.modules;
      this.currentModules = {};
      this.activeModules = {};
      this.newModules = {};
      this.moduleId = 0;
    }

    _createClass(_default, [{
      key: "init",
      value: function init(app, scope) {
        var _this = this;

        var container = scope || document;
        var elements = container.querySelectorAll('*');

        if (app && !this.app) {
          this.app = app;
        }

        this.activeModules['app'] = {
          'app': this.app
        };
        elements.forEach(function (el) {
          Array.from(el.attributes).forEach(function (i) {
            if (i.name.startsWith('data-module')) {
              var moduleExists = false;

              var moduleName = _this.toCamel(i.name.split('-').splice(2));

              if (_this.modules[moduleName]) {
                moduleExists = true;
              } else if (_this.modules[_this.toUpper(moduleName)]) {
                moduleName = _this.toUpper(moduleName);
                moduleExists = true;
              }

              if (moduleExists) {
                var options = {
                  el: el,
                  name: moduleName
                };
                var module = new _this.modules[moduleName](options);
                var id = i.value;

                if (!id) {
                  _this.moduleId++;
                  id = 'm' + _this.moduleId;
                  el.setAttribute(i.name, id);
                }

                _this.addActiveModule(moduleName, id, module);

                var moduleId = moduleName + '-' + id;

                if (scope) {
                  _this.newModules[moduleId] = module;
                } else {
                  _this.currentModules[moduleId] = module;
                }
              }
            }
          });
        });
        Object.entries(this.currentModules).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              id = _ref2[0],
              module = _ref2[1];

          if (scope) {
            var split = id.split('-');
            var moduleName = split.shift();
            var moduleId = split.pop();

            _this.addActiveModule(moduleName, moduleId, module);
          } else {
            _this.initModule(module);
          }
        });
      }
    }, {
      key: "initModule",
      value: function initModule(module) {
        module.mInit(this.activeModules);
        module.init();
      }
    }, {
      key: "addActiveModule",
      value: function addActiveModule(name, id, module) {
        if (this.activeModules[name]) {
          Object.assign(this.activeModules[name], _defineProperty({}, id, module));
        } else {
          this.activeModules[name] = _defineProperty({}, id, module);
        }
      }
    }, {
      key: "update",
      value: function update(scope) {
        var _this2 = this;

        this.init(this.app, scope);
        Object.entries(this.currentModules).forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              id = _ref4[0],
              module = _ref4[1];

          module.mUpdate(_this2.activeModules);
        });
        Object.entries(this.newModules).forEach(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              id = _ref6[0],
              module = _ref6[1];

          _this2.initModule(module);
        });
        Object.assign(this.currentModules, this.newModules);
      }
    }, {
      key: "destroy",
      value: function destroy(scope) {
        if (scope) {
          this.destroyScope(scope);
        } else {
          this.destroyModules();
        }
      }
    }, {
      key: "destroyScope",
      value: function destroyScope(scope) {
        var _this3 = this;

        var elements = scope.querySelectorAll('*');
        elements.forEach(function (el) {
          Array.from(el.attributes).forEach(function (i) {
            if (i.name.startsWith('data-module')) {
              var name = i.name.split('-').pop();
              var id = i.value;
              var moduleName = _this3.toUpper(name) + '-' + id;
              var module = _this3.currentModules[moduleName];

              if (module) {
                _this3.destroyModule(module);

                delete _this3.currentModules[moduleName];
              }
            }
          });
        });
        this.activeModules = {};
        this.newModules = {};
      }
    }, {
      key: "destroyModules",
      value: function destroyModules() {
        var _this4 = this;

        Object.entries(this.currentModules).forEach(function (_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2),
              id = _ref8[0],
              module = _ref8[1];

          _this4.destroyModule(module);
        });
        this.currentModules = [];
      }
    }, {
      key: "destroyModule",
      value: function destroyModule(module) {
        module.mDestroy();
        module.destroy();
      }
    }, {
      key: "toCamel",
      value: function toCamel(arr) {
        var _this5 = this;

        return arr.reduce(function (a, b) {
          return a + _this5.toUpper(b);
        });
      }
    }, {
      key: "toUpper",
      value: function toUpper(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    }]);

    return _default;
  }();

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _toConsumableArray$1(arr) {
    return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _nonIterableSpread$1();
  }

  function _arrayWithoutHoles$1(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray$1(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _classCallCheck$2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$2(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$2(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$2(Constructor, staticProps);
    return Constructor;
  }

  function _slicedToArray$1(arr, i) {
    return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _nonIterableRest$1();
  }

  function _arrayWithHoles$1(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit$1(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var _default$2 =
  /*#__PURE__*/
  function () {
    function _default(options) {
      _classCallCheck$2(this, _default);

      this.defaults = {
        name: 'load',
        loadingClass: 'is-loading',
        loadedClass: 'is-loaded',
        readyClass: 'is-ready',
        transitionsPrefix: 'is-',
        enterDelay: 0,
        exitDelay: 0,
        loadedDelay: 0,
        isLoaded: false,
        isEntered: false,
        isUrl: false,
        transitionContainer: null
      };
      Object.assign(this, this.defaults, options);
      this.options = options;
      this.namespace = 'modular';
      this.html = document.documentElement;
      this.href = window.location.href;
      this.container = 'data-' + this.name + '-container';
      this.subContainer = false;
      this.prevTransition = null;
      this.loadAttributes = ['src', 'srcset', 'style', 'href'];
      this.isInserted = false;
      this.isLoading = false;
      this.enterTimeout = false;
      this.controller = new AbortController();
      this.classContainer = this.html;
      this.isChrome = navigator.userAgent.indexOf("Chrome") != -1 ? true : false;
      this.init();
    }

    _createClass$2(_default, [{
      key: "init",
      value: function init() {
        var _this = this;

        window.addEventListener('popstate', function (e) {
          return _this.checkState(e);
        }, false);
        this.html.addEventListener('click', function (e) {
          return _this.checkClick(e);
        }, false);
        this.loadEls(document);
      }
    }, {
      key: "checkClick",
      value: function checkClick(e) {
        if (!e.ctrlKey && !e.metaKey) {
          var target = e.target;

          while (target && target !== document) {
            if (target.matches('a')) {
              var href = target.getAttribute('href');

              if (!href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                e.preventDefault();
                this.reset();
                this.getClickOptions(target);
              }

              break;
            }

            target = target.parentNode;
          }
        }
      }
    }, {
      key: "checkState",
      value: function checkState() {
        this.reset();
        this.getStateOptions();
      }
    }, {
      key: "reset",
      value: function reset() {
        if (this.isLoading) {
          this.controller.abort();
          this.isLoading = false;
          this.controller = new AbortController();
        }

        window.clearTimeout(this.enterTimeout);

        if (this.isInserted) {
          this.removeContainer();
        }

        this.classContainer = this.html;
        Object.assign(this, this.defaults, this.options);
      }
    }, {
      key: "getClickOptions",
      value: function getClickOptions(link) {
        this.transition = link.getAttribute('data-' + this.name);
        this.isUrl = link.getAttribute('data-' + this.name + '-url');
        var href = link.getAttribute('href');
        var target = link.getAttribute('target');

        if (target == '_blank') {
          window.open(href, '_blank');
          return;
        }

        if (this.transition == 'false') {
          window.location = href;
          return;
        }

        this.setOptions(href, true);
      }
    }, {
      key: "getStateOptions",
      value: function getStateOptions() {
        this.transition = history.state;
        var href = window.location.href;
        this.setOptions(href);
      }
    }, {
      key: "goTo",
      value: function goTo(href, transition, isUrl) {
        this.reset();
        this.transition = transition;
        this.isUrl = isUrl;
        this.setOptions(href, true);
      }
    }, {
      key: "setOptions",
      value: function setOptions(href, push) {
        var container = '[' + this.container + ']';
        var oldContainer;

        if (this.transition && this.transition != 'true') {
          this.transitionContainer = '[' + this.container + '="' + this.transition + '"]';
          this.loadingClass = this.transitions[this.transition].loadingClass || this.loadingClass;
          this.loadedClass = this.transitions[this.transition].loadedClass || this.loadedClass;
          this.readyClass = this.transitions[this.transition].readyClass || this.readyClass;
          this.transitionsPrefix = this.transitions[this.transition].transitionsPrefix || this.transitionsPrefix;
          this.enterDelay = this.transitions[this.transition].enterDelay || this.enterDelay;
          this.exitDelay = this.transitions[this.transition].exitDelay || this.exitDelay;
          this.loadedDelay = this.transitions[this.transition].loadedDelay || this.loadedDelay;
          oldContainer = document.querySelector(this.transitionContainer);
        }

        if (oldContainer) {
          container = this.transitionContainer;
          this.oldContainer = oldContainer;
          this.classContainer = this.oldContainer.parentNode;

          if (!this.subContainer) {
            history.replaceState(this.transition, null, this.href);
          }

          this.subContainer = true;
        } else {
          this.oldContainer = document.querySelector(container);

          if (this.subContainer) {
            history.replaceState(this.prevTransition, null, this.href);
          }

          this.subContainer = false;
        }

        this.href = href;
        this.parentContainer = this.oldContainer.parentNode;

        if (this.isUrl === '' || this.isUrl != null && this.isUrl != 'false' && this.isUrl != false) {
          history.pushState(this.transition, null, href);
        } else {
          this.oldContainer.classList.add('is-old');
          this.setLoading();
          this.startEnterDelay();
          this.loadHref(href, container, push);
        }
      }
    }, {
      key: "setLoading",
      value: function setLoading() {
        this.classContainer.classList.remove(this.loadedClass, this.readyClass);
        this.classContainer.classList.add(this.loadingClass);
        this.classContainer.classList.remove(this.transitionsPrefix + this.prevTransition);

        if (this.transition) {
          this.classContainer.classList.add(this.transitionsPrefix + this.transition);
        }

        if (!this.subContainer) {
          this.prevTransition = this.transition;
        }

        var loadingEvent = new Event(this.namespace + 'loading');
        window.dispatchEvent(loadingEvent);
      }
    }, {
      key: "startEnterDelay",
      value: function startEnterDelay() {
        var _this2 = this;

        this.enterTimeout = window.setTimeout(function () {
          _this2.isEntered = true;

          if (_this2.isLoaded) {
            _this2.transitionContainers();
          }
        }, this.enterDelay);
      }
    }, {
      key: "loadHref",
      value: function loadHref(href, container, push) {
        var _this3 = this;

        this.isLoading = true;
        var signal = this.controller.signal;
        fetch(href, {
          signal: signal
        }).then(function (response) {
          return response.text();
        }).then(function (data) {
          var parser = new DOMParser();
          _this3.data = parser.parseFromString(data, 'text/html');
          _this3.newContainer = _this3.data.querySelector(container);

          _this3.newContainer.classList.add('is-new');

          _this3.parentNewContainer = _this3.newContainer.parentNode;

          _this3.hideContainer();

          _this3.parentContainer.insertBefore(_this3.newContainer, _this3.oldContainer);

          _this3.isInserted = true;

          _this3.setSvgs();

          _this3.isLoaded = true;

          if (_this3.isEntered) {
            _this3.transitionContainers();
          }

          _this3.loadEls(_this3.newContainer);

          _this3.isLoading = false;
        }).catch(function (err) {
          console.log(err);
        });

        if (push) {
          history.pushState(this.transition, null, href);
        }
      }
    }, {
      key: "transitionContainers",
      value: function transitionContainers() {
        var _this4 = this;

        this.setAttributes();
        this.showContainer();
        this.setLoaded();
        setTimeout(function () {
          _this4.removeContainer();

          _this4.setReady();
        }, this.exitDelay);
      }
    }, {
      key: "setSvgs",
      value: function setSvgs() {
        if (this.isChrome) {
          var svgs = this.newContainer.querySelectorAll('use');

          if (svgs.length) {
            svgs.forEach(function (svg) {
              var xhref = svg.getAttribute('xlink:href');

              if (xhref) {
                svg.parentNode.innerHTML = '<use xlink:href="' + xhref + '"></use>';
              } else {
                var href = svg.getAttribute('href');
                if (href) svg.parentNode.innerHTML = '<use href="' + href + '"></use>';
              }
            });
          }
        }
      }
    }, {
      key: "setAttributes",
      value: function setAttributes() {
        var _this5 = this;

        var title = this.data.getElementsByTagName('title')[0];
        var newDesc = this.data.head.querySelector('meta[name="description"]');
        var oldDesc = document.head.querySelector('meta[name="description"]');
        var container;
        var newContainer;

        if (this.subContainer) {
          newContainer = this.parentNewContainer;
          container = document.querySelector(this.transitionContainer).parentNode;
        } else {
          newContainer = this.data.querySelector('html');
          container = document.querySelector('html');
        }

        var datas = Object.assign({}, newContainer.dataset);
        if (title) document.title = title.innerHTML;
        if (oldDesc && newDesc) oldDesc.setAttribute('content', newDesc.getAttribute('content'));

        if (datas) {
          Object.entries(datas).forEach(function (_ref) {
            var _ref2 = _slicedToArray$1(_ref, 2),
                key = _ref2[0],
                val = _ref2[1];

            container.setAttribute('data-' + _this5.toDash(key), val);
          });
        }
      }
    }, {
      key: "toDash",
      value: function toDash(str) {
        return str.split(/(?=[A-Z])/).join('-').toLowerCase();
      }
    }, {
      key: "hideContainer",
      value: function hideContainer() {
        this.newContainer.style.visibility = 'hidden';
        this.newContainer.style.height = 0;
        this.newContainer.style.overflow = 'hidden';
      }
    }, {
      key: "showContainer",
      value: function showContainer() {
        this.newContainer.style.visibility = '';
        this.newContainer.style.height = '';
        this.newContainer.style.overflow = '';
      }
    }, {
      key: "loadEls",
      value: function loadEls(container) {
        var _this6 = this;

        var promises = [];
        this.loadAttributes.forEach(function (attr) {
          var data = 'data-' + _this6.name + '-' + attr;
          var els = container.querySelectorAll('[' + data + ']');

          if (els.length) {
            els.forEach(function (el) {
              var elData = el.getAttribute(data);
              el.setAttribute(attr, elData);

              if (attr == 'src' || attr == 'srcset') {
                var promise = new Promise(function (resolve) {
                  el.onload = function () {
                    return resolve(el);
                  };
                });
                promises.push(promise);
              }
            });
          }
        });
        Promise.all(promises).then(function (val) {
          var imagesEvent = new Event(_this6.namespace + 'images');
          window.dispatchEvent(imagesEvent);
        });
      }
    }, {
      key: "setLoaded",
      value: function setLoaded() {
        var _this7 = this;

        this.classContainer.classList.remove(this.loadingClass);
        setTimeout(function () {
          _this7.classContainer.classList.add(_this7.loadedClass);
        }, this.loadedDelay);
        var loadedEvent = new Event(this.namespace + 'loaded');
        window.dispatchEvent(loadedEvent);
      }
    }, {
      key: "removeContainer",
      value: function removeContainer() {
        this.parentContainer.removeChild(this.oldContainer);
        this.newContainer.classList.remove('is-new');
        this.isInserted = false;
      }
    }, {
      key: "setReady",
      value: function setReady() {
        this.classContainer.classList.add(this.readyClass);
        var readyEvent = new Event(this.namespace + 'ready');
        window.dispatchEvent(readyEvent);
      }
    }, {
      key: "on",
      value: function on(event, func) {
        var _this8 = this;

        window.addEventListener(this.namespace + event, function () {
          switch (event) {
            case 'loading':
              return func(_this8.transition, _this8.oldContainer);

            case 'loaded':
              return func(_this8.transition, _this8.oldContainer, _this8.newContainer);

            case 'ready':
              return func(_this8.transition, _this8.newContainer);

            default:
              return func();
          }
        }, false);
      }
    }]);

    return _default;
  }();

  var APP_NAME = 'Bornandbredbrand';
  var $document = $(document);
  var $window = $(window);
  var html = document.documentElement;
  var $html = $(document.documentElement).removeClass('has-no-js').addClass('has-js');
  var $body = $(document.body);
  var $pjaxWrapper = $('#js-pjax-wrapper');
  var isMobile$1 = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1200;
  var isDebug = !!$html.data('debug');

  var _default$3 =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      _classCallCheck$1(this, _default);

      return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this = this;

        html.classList.add('is-first-load');
        var load = new _default$2({
          enterDelay: 600,
          transitions: {
            customTransition: {},
            filter: {}
          }
        });
        load.on('loading', function () {
          window.isloading = true;
          setTimeout(function () {
            _this.call('close', null, 'Nav');
          }, 100);

          for (var _i = 0, _arr = ['has-dark-header', 'has-white-logo', 'has-middle-line', 'is-over-footer', 'has-intro-dark', 'has-intro-light-logo', 'has-intro-active']; _i < _arr.length; _i++) {
            var htmlClass = _arr[_i];
            html.classList.remove(htmlClass);
          }
        });
        load.on('loaded', function (transition, oldContainer, newContainer) {
          _this.call('destroy', oldContainer, 'app');

          _this.call('update', newContainer, 'app');

          document.title = document.title.replace(/&amp;/g, '&');

          var id = _this.data('id', newContainer);

          _this.call('setDotById', id, 'Navmain', 'main');

          window.isloading = false;
        });
        load.on('ready', function (transition, newContainer) {
          var classes = _this.data('classes', newContainer);

          if (classes.length) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = classes.split(' ')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var htmlClass = _step.value;
                html.classList.add(htmlClass);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }
        });
      }
    }]);

    return _default;
  }(_default);

  /**
   * @see  https://github.com/ractivejs/ractive/blob/dev/src/utils/html.js
   */
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;
  /**
   * Parse value to data type.
   *
   * @link   https://github.com/jquery/jquery/blob/3.1.1/src/data.js
   * @param  {string} data - A value to convert.
   * @return {mixed}  Returns the value in its natural data type.
   */

  function getData(data) {
    if (data === 'true') {
      return true;
    }

    if (data === 'false') {
      return false;
    }

    if (data === 'null') {
      return null;
    } // Only convert to a number if it doesn't change the string


    if (data === +data + '') {
      return +data;
    }

    if (rbrace.test(data)) {
      return JSON.parse(data);
    }

    return data;
  }
  /**
   * Returns an array containing all the parent nodes of the given node
   * @param  {object} node
   * @return {array} parent nodes
   */

  function getParents(elem) {
    // Set up a parent array
    var parents = []; // Push each parent element to the array

    for (; elem && elem !== document; elem = elem.parentNode) {
      parents.push(elem);
    } // Return our parent array


    return parents;
  } // https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/

  function queryClosestParent(elem, selector) {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;

        while (--i >= 0 && matches.item(i) !== this) {}

        return i > -1;
      };
    } // Get the closest matching element


    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }

    return null;
  }
  /*!
   * Serialize all form data into an array
   * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param  {Node}   form The form to serialize
   * @return {String}      The serialized form data
   */

  function serializeArray(form) {
    // Setup our serialized data
    var serialized = []; // Loop through each field in the form

    for (var i = 0; i < form.elements.length; i++) {
      var field = form.elements[i]; // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields

      if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue; // If a multi-select, get all selections

      if (field.type === 'select-multiple') {
        for (var n = 0; n < field.options.length; n++) {
          if (!field.options[n].selected) continue;
          serialized.push({
            name: field.name,
            value: field.options[n].value
          });
        }
      } // Convert field data to a query string
      else if (field.type !== 'checkbox' && field.type !== 'radio' || field.checked) {
          serialized.push({
            name: field.name,
            value: field.value
          });
        }
    }

    return serialized;
  }

  function debounce (func, wait, immediate) {
    var timeout;
    return function () {
      var context = this;
      var args = arguments;

      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function isNumeric(thing) {
    return !isNaN(parseFloat(thing)) && isFinite(thing);
  }

  var EVENT_KEY = "LocomotiveScroll";
  var EVENT = {
    CLICK: "click.".concat(EVENT_KEY),
    ISREADY: "isReady.".concat(EVENT_KEY),
    REBUILD: "rebuild.".concat(EVENT_KEY),
    RENDER: "render.".concat(EVENT_KEY),
    RESIZE: "resize.".concat(EVENT_KEY),
    SCROLL: "scroll.".concat(EVENT_KEY),
    SCROLLTO: "scrollTo.".concat(EVENT_KEY),
    UPDATE: "update.".concat(EVENT_KEY)
  };
  var DEFAULTS = {
    container: $body,
    sections: '.js-section',
    mobileContainer: $body,
    onScroll: function onScroll() {},
    selector: '.js-animate',
    smooth: false,
    smoothMobile: false,
    reversed: false,
    getDirection: false,
    getSpeed: false,
    scrollBarClassName: 'o-scrollbar',
    isScrollingClassName: 'is-scrolling',
    isDraggingClassName: 'is-dragging'
  };
  /**
   * Manage animation of elements on the page according to scroll position.
   *
   * @todo  Manage some options (normally from data attributes) with constructor options (ex.: set repeat for all)
   * @todo  Method to get the distance (as percentage) of an element in the viewport
   */

  var _default$4 =
  /*#__PURE__*/
  function () {
    function _default(options) {
      _classCallCheck$1(this, _default);

      this.$container = options.container ? options.container : DEFAULTS.container;
      this.selector = options.selector ? options.selector : DEFAULTS.selector;
      this.callbacks = {
        onScroll: typeof options.onScroll === 'function' ? options.onScroll : DEFAULTS.onScroll
      };
      this.instance = {
        scroll: {
          x: 0,
          y: 0,
          direction: ''
        }
      };
      this.windowHeight = $window.height();
      this.windowMiddle = this.windowHeight / 2;
      this.animatedElements = [];
      this.requestId = undefined;
    }
    /**
     * Initialize scrolling animations
     */


    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this = this;

        this.addElements();
        this.render(); // On scroll

        $document.on(EVENT.SCROLL, function () {
          _this.render();
        }); // Rebuild event

        $document.on(EVENT.REBUILD, function () {
          _this.update();
        }); // Update event

        $document.on(EVENT.UPDATE, function (event, options) {
          return _this.update(options);
        }); // Render event

        $document.on(EVENT.RENDER, function () {
          return _this.render();
        }); // Scrollto button event

        $document.on(EVENT.CLICK, '.js-scrollto', function (event) {
          event.preventDefault();

          _this.scrollTo({
            sourceElem: event.currentTarget,
            offsetElem: event.currentTarget.getAttribute('data-offset')
          });
        });
        $document.on(EVENT.SCROLLTO, function (event) {
          return _this.scrollTo(event.options);
        }); // Setup done

        $document.triggerHandler({
          type: EVENT.ISREADY
        }); // Resize event

        $window.on(EVENT.RESIZE, debounce(function () {
          _this.update();
        }, 20));
      }
      /**
       * Find all animatable elements.
       * Called on page load and any subsequent updates.
       */

    }, {
      key: "addElements",
      value: function addElements() {
        this.animatedElements = [];
        var elements = document.querySelectorAll(this.selector);
        var len = elements.length;
        var i = 0;

        for (; i < len; i++) {
          var element = elements[i];
          var elementTarget = element.getAttribute('data-target');
          var elementPosition = element.getAttribute('data-position');
          var target = elementTarget && document.querySelectorAll(elementTarget).length ? document.querySelectorAll(elementTarget) : element;
          var elementOffset = parseInt(target.getBoundingClientRect().top + this.instance.scroll.y);
          var elementLimit = elementOffset + target.offsetHeight;
          var elementSticky = typeof element.getAttribute('data-sticky') === 'string';
          var elementStickyTarget = element.getAttribute('data-sticky-target');
          var elementViewportOffset = null;

          if (typeof element.getAttribute('data-viewport-offset') === 'string') {
            elementViewportOffset = element.getAttribute('data-viewport-offset').split(',');
          } //Manage callback


          var elementCallbackString = typeof element.getAttribute('data-callback') === 'string' ? element.getAttribute('data-callback') : null;
          var elementCallback = null;

          if (elementCallbackString != null) {
            var event = elementCallbackString.substr(0, elementCallbackString.indexOf('('));
            var optionsString = elementCallbackString.substr(elementCallbackString.indexOf('('), elementCallbackString.length - event.length);
            optionsString = optionsString.replace('(', '');
            optionsString = optionsString.replace(')', '');
            var options = optionsString.split('|');
            var obj = {};

            for (var j = 0; j < options.length; j++) {
              var option = options[j].split(':');
              option[0] = option[0].replace(' ', '');
              var val = void 0; //check if value is a boolean

              if (option[1] === "true") {
                val = true;
              } else if (option[1] === "false") {
                val = false;
              } //check if value is numeric
              else if (/^\d+$/.test(option[1])) {
                  val = parseInt(option[1]);
                } //check if value is a String
                else {
                    val = option[1];
                  }

              obj[option[0]] = val;
            }

            elementCallback = {
              event: event,
              options: obj
            };
          } // If elements loses its animation after scrolling past it


          var elementRepeat = typeof element.getAttribute('data-repeat') === 'string';
          var elementInViewClass = element.getAttribute('data-inview-class');

          if (!elementInViewClass) {
            elementInViewClass = 'is-show';
          }

          if (elementSticky) {
            if (!elementStickyTarget) {
              elementLimit = this.$container[0].offsetHeight;
            } else {
              var stickyTargetEl = document.querySelectorAll(elementStickyTarget)[0];
              var stickyTargetBCR = stickyTargetEl.getBoundingClientRect();
              elementLimit = stickyTargetBCR.top + document.body.scrollTop - element.offsetHeight;
            } // Reset offset


            element.classList.remove(elementInViewClass);
            element.classList.remove('is-unstuck');
            var transformValue = 'translate3d(0, 0, 0)';
            element.style.webkitTransform = transformValue;
            element.style.MozTransform = transformValue;
            element.style.msTransform = transformValue;
            element.style.OTransform = transformValue;
            element.style.transform = transformValue;
          } // Don't add element if it already has its inview class and doesn't repeat


          if (elementRepeat || !element.classList.contains(elementInViewClass)) {
            this.animatedElements[i] = {
              element: element,
              $element: $(element),
              // TEMPORARY
              offset: Math.round(elementOffset),
              repeat: elementRepeat,
              position: elementPosition,
              limit: elementLimit,
              inViewClass: elementInViewClass,
              sticky: elementSticky,
              callback: elementCallback,
              viewportOffset: elementViewportOffset
            };
          }
        }
      }
      /**
       * Loop through all animatable elements and apply animation method(s).
       */

    }, {
      key: "animateElements",
      value: function animateElements() {
        var len = this.animatedElements.length;
        var removeIndexes = [];
        var i = 0;

        for (; i < len; i++) {
          var element = this.animatedElements[i]; // If the element's visibility must not be manipulated any further, remove it from the list

          if (this.toggleElement(element, i)) {
            removeIndexes.push(i);
          }
        } // Remove animated elements after looping through elements


        i = removeIndexes.length;

        while (i--) {
          this.animatedElements.splice(removeIndexes[i], 1);
        }
      }
      /**
       * Render the class animations, and update the global scroll positionning.
       */

    }, {
      key: "render",
      value: function render() {
        if (window.pageYOffset > this.instance.scroll.y) {
          if (this.instance.scroll.direction !== 'down') {
            this.instance.scroll.direction = 'down';
          }
        } else if (window.pageYOffset < this.instance.scroll.y) {
          if (this.instance.scroll.direction !== 'up') {
            this.instance.scroll.direction = 'up';
          }
        }

        if (this.instance.scroll.y !== window.pageYOffset) {
          this.instance.scroll.y = window.pageYOffset;
        }

        if (this.instance.scroll.x !== window.pageXOffset) {
          this.instance.scroll.x = window.pageXOffset;
        }

        this.callbacks.onScroll(this.instance);
        this.animateElements();
      }
      /**
       * Toggle classes on an element if it's visible.
       *
       * @param  {object}      element Current element to test
       * @param  {int}         index   Index of the element within it's container
       * @return {boolean}             Wether the item must be removed from its container
       */

    }, {
      key: "toggleElement",
      value: function toggleElement(element, index) {
        var removeFromContainer = false;

        if (typeof element !== 'undefined') {
          // Find the bottom edge of the scroll container
          var scrollTop = this.instance.scroll.y;
          var scrollBottom = scrollTop + this.windowHeight; // Define if the element is inView

          var inView = false;

          if (element.position === 'top') {
            inView = scrollTop >= element.offset && scrollTop <= element.limit;
          } else if (element.position === 'below') {
            inView = scrollTop > element.limit;
          } else if (element.sticky) {
            inView = scrollTop >= element.offset && scrollTop <= element.limit;
          } else if (element.viewportOffset != undefined) {
            if (element.viewportOffset.length > 1) {
              var scrollViewportOffsetTop = scrollTop + this.windowHeight * element.viewportOffset[1];
              var scrollViewportOffsetBottom = scrollBottom - this.windowHeight * element.viewportOffset[0];
              inView = scrollViewportOffsetBottom > element.offset && scrollViewportOffsetTop < element.limit;
            } else {
              var scrollViewportOffset = scrollBottom - this.windowHeight * element.viewportOffset[0];
              inView = scrollViewportOffset > element.offset && scrollViewportOffset < element.limit;
            }
          } else {
            inView = scrollBottom >= element.offset && scrollTop <= element.limit;
          }

          if (element.sticky) {
            if (scrollTop > element.limit) {
              element.element.classList.add('is-unstuck');
            } else {
              element.element.classList.remove('is-unstuck');
            }

            if (scrollTop < element.offset) {
              element.element.classList.remove(element.inViewClass);
            }
          } // Add class if inView, remove if not


          if (inView) {
            if (!element.element.classList.contains(element.inViewClass)) {
              element.element.classList.add(element.inViewClass);
              this.triggerCallback(element, 'enter');
            }

            if (!element.repeat && !element.sticky) {
              removeFromContainer = true;
            }
          } else {
            if (element.repeat) {
              if (element.element.classList.contains(element.inViewClass)) {
                element.element.classList.remove(element.inViewClass);
                this.triggerCallback(element, 'leave');
              }
            }
          }

          if (element.sticky) {
            var transformDistance;

            if (inView) {
              transformDistance = this.instance.scroll.y - element.offset;
            } else {
              if (this.instance.scroll.y < element.offset) {
                transformDistance = 0;
              }

              if (this.instance.scroll.y > element.limit) {
                transformDistance = element.limit - element.offset;
              }
            }

            if (element.transformDistance != transformDistance) {
              element.transformDistance = transformDistance;
              var transformValue = "translate3d(0, ".concat(transformDistance, "px, 0)");
              element.element.style.webkitTransform = transformValue;
              element.element.style.MozTransform = transformValue;
              element.element.style.msTransform = transformValue;
              element.element.style.OTransform = transformValue;
              element.element.style.transform = transformValue;
            }
          }
        }

        return removeFromContainer;
      }
      /**
       * check if the element have a callback, and trigger the event set in the data-callback
       *
       * @param  {object}      element Current element to test
       * @return void
       */

    }, {
      key: "triggerCallback",
      value: function triggerCallback(element, way) {
        if (element.callback != undefined) {
          $(element.element).trigger({
            type: element.callback.event,
            options: element.callback.options,
            way: way
          }); //add this where you want dude (in your module btw)
          // $document.on(event.Namespace,(e)=>{
          //     console.log(e.options, e.way);
          // });
          /////////////////////////////////////////////
        }
      }
      /**
       * Scroll to a desired target.
       *
       * @param  {object} options
       *      Available options :
       *          {node} targetElem - The DOM element we want to scroll to
       *          {node} sourceElem - An `<a>` element with an href targeting the anchor we want to scroll to
       *          {node} offsetElem - A DOM element from which we get the height to substract from the targetOffset
       *              (ex: use offsetElem to pass a mobile header that is above content, to make sure the scrollTo will be aligned with it)
       *          {int} targetOffset - An absolute vertical scroll value to reach, or an offset to apply on top of given `targetElem` or `sourceElem`'s target
       *          {int} delay - Amount of milliseconds to wait before starting to scroll
       *          {boolean} toTop - Set to true to scroll all the way to the top
       *          {boolean} toBottom - Set to true to scroll all the way to the bottom
       *          {float} speed - Duration of the scroll
       * @return {void}
       */

    }, {
      key: "scrollTo",
      value: function scrollTo(options) {
        var targetElem = options.targetElem;
        var sourceElem = options.sourceElem;
        var offsetElem = options.offsetElem;
        var targetOffset = isNumeric(options.targetOffset) ? parseInt(options.targetOffset) : 0;
        var delay = isNumeric(options.delay) ? parseInt(options.delay) : 0;
        var speed = isNumeric(options.speed) ? parseInt(options.speed) : 800;
        var toTop = options.toTop;
        var toBottom = options.toBottom;

        if (!toTop && !toBottom && !isNumeric(options.targetOffset) && !targetElem && !sourceElem) {
          console.warn("You must specify at least one of these parameters:", ['{boolean} toTop - Set to true to scroll all the way to the top', '{boolean} toBottom - Set to true to scroll all the way to the bottom', '{int} targetOffset - An absolute vertical scroll value to reach, or an offset to apply on top of given `targetElem` or `sourceElem`\'s target', '{node} targetElem - The DOM element we want to scroll to', '{node} sourceElem - An `<a>` element with an href targeting the anchor we want to scroll to']);
          return false;
        } // If sourceElem is given, find and store the targetElem it's related to


        if (sourceElem) {
          var targetData = '';
          console.log(sourceElem); // Get the selector (given with `data-target` or `href` attributes on sourceElem)

          var sourceElemTarget = sourceElem.getAttribute('data-target');
          targetData = sourceElemTarget ? sourceElemTarget : sourceElem.getAttribute('href'); // Store the target for later

          targetElem = document.querySelectorAll(targetData)[0];
        } // We have a targetElem, get it's coordinates


        if (targetElem) {
          // Get targetElem offset from top
          var targetElemBCR = targetElem.getBoundingClientRect();
          var targetElemOffsetTop = targetElemBCR.top + document.documentElement.scrollTop; // TODO - Improve current scroll position source, might not always be documentElement
          // Final value of scroll destination : targetElemOffsetTop + (optional offset given in options)

          targetOffset = targetElemOffsetTop + targetOffset;
        } // We have an offsetElem, get its height and remove it from targetOffset already computed


        if (offsetElem) {
          var _offset = offsetElem.offsetHeight;
          targetOffset = targetOffset - _offset;
        } // If we want to go to one of boundaries


        if (toTop === true) {
          targetOffset = 0;
        } else if (toBottom === true) {
          targetOffset = document.body.offsetHeight; // TODO - Improve container height source, might not always be the body
        }

        setTimeout(function () {
          $('html, body').animate({
            // TODO - Remove jQuery here
            scrollTop: targetOffset
          }, speed);
        }, delay);
      }
      /**
       * Update elements and recalculate all the positions on the page
       */

    }, {
      key: "update",
      value: function update() {
        this.addElements();
        this.animateElements();
        this.windowHeight = $window.height();
        this.windowMiddle = this.windowHeight / 2;
      }
      /**
       * Destroy
       */

    }, {
      key: "destroy",
      value: function destroy() {
        $window.off(".".concat(EVENT_KEY));
        this.$container.off(".".concat(EVENT_KEY));
        window.cancelAnimationFrame(this.requestId);
        this.requestId = undefined;
        this.animatedElements = undefined;
      }
    }]);

    return _default;
  }();

  var EVENT_KEY$1 = EVENT_KEY;
  var EVENT$1 = Object.assign(EVENT, {
    SCROLLING: "scrolling.".concat(EVENT_KEY$1),
    TRIGGER_UI_DARK: "triggerUIDark.".concat(EVENT_KEY$1),
    TRIGGER_UI_LIGHT: "triggerUILight.".concat(EVENT_KEY$1)
  });
  var DEFAULTS$1 = Object.assign(DEFAULTS, {});

  var _default$5 =
  /*#__PURE__*/
  function (_Scroll) {
    _inherits(_default, _Scroll);

    function _default(options) {
      _classCallCheck$1(this, _default);

      return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, options));
    }
    /**
     * Find all animatable elements.
     * Called on page load and any subsequent updates.
     */


    _createClass$1(_default, [{
      key: "addElements",
      value: function addElements() {
        this.animatedElements = [];
        var elements = document.querySelectorAll(this.selector);
        var len = elements.length;
        var i = 0;

        for (; i < len; i++) {
          var element = elements[i];
          var elementTarget = element.getAttribute('data-target');
          var elementPosition = element.getAttribute('data-position');
          var target = elementTarget && document.querySelector(elementTarget).length ? document.querySelector(elementTarget) : element;
          var elementOffset = parseInt(target.getBoundingClientRect().top + this.instance.scroll.y);
          var elementLimit = elementOffset + target.offsetHeight;
          var elementSticky = typeof element.getAttribute('data-sticky') === 'string';
          var elementStickyTarget = element.getAttribute('data-sticky-target');
          var elementViewportOffset = null;

          if (typeof element.getAttribute('data-viewport-offset') === 'string') {
            elementViewportOffset = element.getAttribute('data-viewport-offset').split(',');
          } //Manage callback


          var elementCallbackString = typeof element.getAttribute('data-callback') === 'string' ? element.getAttribute('data-callback') : null;
          var elementCallback = null;

          if (elementCallbackString != null) {
            var event = elementCallbackString.substr(0, elementCallbackString.indexOf('('));
            var optionsString = elementCallbackString.substr(elementCallbackString.indexOf('('), elementCallbackString.length - event.length);
            optionsString = optionsString.replace('(', '');
            optionsString = optionsString.replace(')', '');
            var options = optionsString.split('|');
            var obj = {};

            for (var j = 0; j < options.length; j++) {
              var option = options[j].split(':');
              option[0] = option[0].replace(' ', '');
              var val = void 0; //check if value is a boolean

              if (option[1] === "true") {
                val = true;
              } else if (option[1] === "false") {
                val = false;
              } //check if value is numeric
              else if (/^\d+$/.test(option[1])) {
                  val = parseInt(option[1]);
                } //check if value is a String
                else {
                    val = option[1];
                  }

              obj[option[0]] = val;
            }

            elementCallback = {
              event: event,
              options: obj
            };
          } // If elements loses its animation after scrolling past it


          var elementRepeat = typeof element.getAttribute('data-repeat') === 'string';
          var elementInViewClass = element.getAttribute('data-inview-class');

          if (!elementInViewClass) {
            elementInViewClass = 'is-show';
          }

          if (elementSticky) {
            if (!elementStickyTarget) {
              elementLimit = this.$container[0].offsetHeight;
            } else {
              var stickyTargetEl = document.querySelectorAll(elementStickyTarget)[0];
              var stickyTargetBCR = stickyTargetEl.getBoundingClientRect();
              elementLimit = stickyTargetBCR.top + document.body.scrollTop - element.offsetHeight;
            } // Reset offset


            element.classList.remove(elementInViewClass);
            element.classList.remove('is-unstuck');
            var transformValue = 'translate3d(0, 0, 0)';
            element.style.webkitTransform = transformValue;
            element.style.MozTransform = transformValue;
            element.style.msTransform = transformValue;
            element.style.OTransform = transformValue;
            element.style.transform = transformValue;
          } // Don't add element if it already has its inview class and doesn't repeat


          if (elementRepeat || !element.classList.contains(elementInViewClass)) {
            this.animatedElements[i] = {
              element: element,
              $element: $(element),
              // TEMPORARY
              offset: Math.round(elementOffset),
              repeat: elementRepeat,
              position: elementPosition,
              limit: elementLimit,
              inViewClass: elementInViewClass,
              sticky: elementSticky,
              callback: elementCallback,
              viewportOffset: elementViewportOffset
            };
          }
        }
      }
      /**
       * Toggle classes on an element if it's visible.
       *
       * @param  {object}      element Current element to test
       * @param  {int}         index   Index of the element within it's container
       * @return {boolean}             Wether the item must be removed from its container
       */

    }, {
      key: "toggleElement",
      value: function toggleElement(element, index) {
        var removeFromContainer = false;

        if (typeof element !== 'undefined') {
          // Find the bottom edge of the scroll container
          var scrollTop = this.instance.scroll.y;
          var scrollBottom = scrollTop + this.windowHeight; // Define if the element is inView

          var inView = false;

          if (element.position === 'top') {
            inView = scrollTop >= element.offset && scrollTop <= element.limit;
          } else if (element.position === 'below') {
            inView = scrollTop > element.limit;
          } else if (element.sticky) {
            inView = scrollTop >= element.offset && scrollTop <= element.limit;
          } else if (element.viewportOffset != undefined) {
            if (element.viewportOffset.length > 1) {
              var scrollViewportOffsetTop = scrollTop + this.windowHeight * element.viewportOffset[1];
              var scrollViewportOffsetBottom = scrollBottom - this.windowHeight * element.viewportOffset[0];
              inView = scrollViewportOffsetBottom > element.offset && scrollViewportOffsetTop < element.limit;
            } else {
              var _scrollViewportOffsetBottom = Math.round(scrollBottom - this.windowHeight * element.viewportOffset[0]);

              var _scrollViewportOffsetTop = Math.round(scrollTop);

              inView = _scrollViewportOffsetBottom > element.offset && _scrollViewportOffsetTop < element.limit;
            }
          } else {
            inView = scrollBottom >= element.offset && scrollTop <= element.limit;
          }

          if (element.sticky) {
            if (scrollTop > element.limit) {
              element.element.classList.add('is-unstuck');
            } else {
              element.element.classList.remove('is-unstuck');
            }

            if (scrollTop < element.offset) {
              element.element.classList.remove(element.inViewClass);
            }
          } // Add class if inView, remove if not


          if (inView) {
            if (!element.element.classList.contains(element.inViewClass)) {
              element.element.classList.add(element.inViewClass);
              this.triggerCallback(element, 'enter');
            }

            if (!element.repeat && !element.sticky) {
              removeFromContainer = true;
            }
          } else {
            if (element.repeat) {
              if (element.element.classList.contains(element.inViewClass)) {
                element.element.classList.remove(element.inViewClass);
                this.triggerCallback(element, 'leave');
              }
            }
          }

          if (element.sticky) {
            var transformDistance;

            if (inView) {
              transformDistance = this.instance.scroll.y - element.offset;
            } else {
              if (this.instance.scroll.y < element.offset) {
                transformDistance = 0;
              }

              if (this.instance.scroll.y > element.limit) {
                transformDistance = element.limit - element.offset;
              }
            }

            if (element.transformDistance != transformDistance) {
              element.transformDistance = transformDistance;
              var transformValue = "translate3d(0, ".concat(transformDistance, "px, 0)");
              element.element.style.webkitTransform = transformValue;
              element.element.style.MozTransform = transformValue;
              element.element.style.msTransform = transformValue;
              element.element.style.OTransform = transformValue;
              element.element.style.transform = transformValue;
            }
          }
        }

        return removeFromContainer;
      }
      /**
       * Scroll to a desired target.
       *
       * @param  {object} options
       *      Available options :
       *          {node} targetElem - The DOM element we want to scroll to
       *          {node} sourceElem - An `<a>` element with an href targeting the anchor we want to scroll to
       *          {node} offsetElem - A DOM element from which we get the height to substract from the targetOffset
       *              (ex: use offsetElem to pass a mobile header that is above content, to make sure the scrollTo will be aligned with it)
       *          {int} targetOffset - An absolute vertical scroll value to reach, or an offset to apply on top of given `targetElem` or `sourceElem`'s target
       *          {int} delay - Amount of milliseconds to wait before starting to scroll
       *          {boolean} toTop - Set to true to scroll all the way to the top
       *          {boolean} toBottom - Set to true to scroll all the way to the bottom
       *          {float} speed - Duration of the scroll
       * @return {void}
       */

    }, {
      key: "scrollTo",
      value: function scrollTo(options) {
        var targetElem = options.targetElem;
        var sourceElem = options.sourceElem;
        var offsetElem = options.offsetElem;
        var targetOffset = isNumeric(options.targetOffset) ? parseInt(options.targetOffset) : 0;
        var delay = isNumeric(options.delay) ? parseInt(options.delay) : 0;
        var speed = isNumeric(options.speed) ? parseInt(options.speed) : 800;
        var toTop = options.toTop;
        var toBottom = options.toBottom;

        if (!toTop && !toBottom && !isNumeric(options.targetOffset) && !targetElem && !sourceElem) {
          console.warn("You must specify at least one of these parameters:", ['{boolean} toTop - Set to true to scroll all the way to the top', '{boolean} toBottom - Set to true to scroll all the way to the bottom', '{int} targetOffset - An absolute vertical scroll value to reach, or an offset to apply on top of given `targetElem` or `sourceElem`\'s target', '{node} targetElem - The DOM element we want to scroll to', '{node} sourceElem - An `<a>` element with an href targeting the anchor we want to scroll to']);
          return false;
        } // If sourceElem is given, find and store the targetElem it's related to


        if (sourceElem) {
          var targetData = '';
          console.log(sourceElem); // Get the selector (given with `data-target` or `href` attributes on sourceElem)

          var sourceElemTarget = sourceElem.getAttribute('data-target');
          targetData = sourceElemTarget ? sourceElemTarget : sourceElem.getAttribute('href'); // Store the target for later

          targetElem = document.querySelectorAll(targetData)[0];
        } // We have a targetElem, get it's coordinates


        if (targetElem) {
          // Get targetElem offset from top
          var targetElemBCR = targetElem.getBoundingClientRect();
          var targetElemOffsetTop = targetElemBCR.top + (document.scrollingElement ? document.scrollingElement.scrollTop : document.documentElement.scrollTop); // Final value of scroll destination : targetElemOffsetTop + (optional offset given in options)

          targetOffset = targetElemOffsetTop + targetOffset;
        } // We have an offsetElem, get its height and remove it from targetOffset already computed


        if (offsetElem) {
          var _offset = offsetElem.offsetHeight;
          targetOffset = targetOffset - _offset;
        } // If we want to go to one of boundaries


        if (toTop === true) {
          targetOffset = 0;
        } else if (toBottom === true) {
          targetOffset = document.body.offsetHeight; // TODO - Improve container height source, might not always be the body
        }

        setTimeout(function () {
          $('html, body').animate({
            // TODO - Remove jQuery here
            scrollTop: targetOffset
          }, speed);
        }, delay);
      }
      /**
       * Loop through all animatable elements and apply animation method(s).
       */

    }, {
      key: "animateElements",
      value: function animateElements() {
        if (!this.animatedElements) {
          console.warn('⚠️ this.animatedElements is not set properly!');
          console.log(this.animatedElements);
          return;
        }

        var len = this.animatedElements.length;
        var removeIndexes = [];
        var i = 0;

        for (; i < len; i++) {
          var element = this.animatedElements[i]; // If the element's visibility must not be manipulated any further, remove it from the list

          if (this.toggleElement(element, i)) {
            removeIndexes.push(i);
          }
        } // Remove animated elements after looping through elements


        i = removeIndexes.length;

        while (i--) {
          this.animatedElements.splice(removeIndexes[i], 1);
        }
      }
      /**
       * Destroy
       */

    }, {
      key: "destroy",
      value: function destroy() {
        $window.off(".".concat(EVENT_KEY$1));
        $document.off(".".concat(EVENT_KEY$1));
        this.$container.off(".".concat(EVENT_KEY$1));
        window.cancelAnimationFrame(this.requestId);
        this.requestId = undefined;
        this.animatedElements = undefined;
      }
    }]);

    return _default;
  }(_default$4);

  function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var virtualscroll = createCommonjsModule(function (module, exports) {
  !function(e,t){module.exports=t();}(commonjsGlobal,function(){var e=0;function t(t){return "__private_"+e+++"_"+t}function i(e,t){if(!Object.prototype.hasOwnProperty.call(e,t))throw new TypeError("attempted to use private field on non-instance");return e}function n(){}n.prototype={on:function(e,t,i){var n=this.e||(this.e={});return (n[e]||(n[e]=[])).push({fn:t,ctx:i}),this},once:function(e,t,i){var n=this;function o(){n.off(e,o),t.apply(i,arguments);}return o._=t,this.on(e,o,i)},emit:function(e){for(var t=[].slice.call(arguments,1),i=((this.e||(this.e={}))[e]||[]).slice(),n=0,o=i.length;n<o;n++)i[n].fn.apply(i[n].ctx,t);return this},off:function(e,t){var i=this.e||(this.e={}),n=i[e],o=[];if(n&&t)for(var s=0,h=n.length;s<h;s++)n[s].fn!==t&&n[s].fn._!==t&&o.push(n[s]);return o.length?i[e]=o:delete i[e],this}};var o=n;o.TinyEmitter=n;var s="onwheel"in document,h="onmousewheel"in document,r="ontouchstart"in document,a=navigator.msMaxTouchPoints&&navigator.msMaxTouchPoints>1,l=!!window.navigator.msPointerEnabled,u="onkeydown"in document,c=navigator.userAgent.indexOf("Firefox")>-1,d="virtualscroll",v=t("options"),f=t("el"),p=t("emitter"),y=t("event"),w=t("touchStart"),_=t("bodyTouchAction");return function(){function e(e){var t;Object.defineProperty(this,v,{writable:!0,value:void 0}),Object.defineProperty(this,f,{writable:!0,value:void 0}),Object.defineProperty(this,p,{writable:!0,value:void 0}),Object.defineProperty(this,y,{writable:!0,value:void 0}),Object.defineProperty(this,w,{writable:!0,value:void 0}),Object.defineProperty(this,_,{writable:!0,value:void 0}),t=this,["_onWheel","_onMouseWheel","_onTouchStart","_onTouchMove","_onKeyDown"].forEach(function(e){t[e]=t[e].bind(t);}),i(this,f)[f]=window,e&&e.el&&(i(this,f)[f]=e.el,delete e.el),i(this,v)[v]=Object.assign({mouseMultiplier:1,touchMultiplier:2,firefoxMultiplier:15,keyStep:120,preventTouch:!1,unpreventTouchClass:"vs-touchmove-allowed",useKeyboard:!0,useTouch:!0},e),i(this,p)[p]=new o,i(this,y)[y]={y:0,x:0,deltaX:0,deltaY:0},i(this,w)[w]={x:null,y:null},i(this,_)[_]=null,void 0!==i(this,v)[v].passive&&(this.listenerOptions={passive:i(this,v)[v].passive});}var t=e.prototype;return t._notify=function(e){var t=i(this,y)[y];t.x+=t.deltaX,t.y+=t.deltaY,i(this,p)[p].emit(d,{x:t.x,y:t.y,deltaX:t.deltaX,deltaY:t.deltaY,originalEvent:e});},t._onWheel=function(e){var t=i(this,v)[v],n=i(this,y)[y];n.deltaX=e.wheelDeltaX||-1*e.deltaX,n.deltaY=e.wheelDeltaY||-1*e.deltaY,c&&1===e.deltaMode&&(n.deltaX*=t.firefoxMultiplier,n.deltaY*=t.firefoxMultiplier),n.deltaX*=t.mouseMultiplier,n.deltaY*=t.mouseMultiplier,this._notify(e);},t._onMouseWheel=function(e){var t=i(this,y)[y];t.deltaX=e.wheelDeltaX?e.wheelDeltaX:0,t.deltaY=e.wheelDeltaY?e.wheelDeltaY:e.wheelDelta,this._notify(e);},t._onTouchStart=function(e){var t=e.targetTouches?e.targetTouches[0]:e;i(this,w)[w].x=t.pageX,i(this,w)[w].y=t.pageY;},t._onTouchMove=function(e){var t=i(this,v)[v];t.preventTouch&&!e.target.classList.contains(t.unpreventTouchClass)&&e.preventDefault();var n=i(this,y)[y],o=e.targetTouches?e.targetTouches[0]:e;n.deltaX=(o.pageX-i(this,w)[w].x)*t.touchMultiplier,n.deltaY=(o.pageY-i(this,w)[w].y)*t.touchMultiplier,i(this,w)[w].x=o.pageX,i(this,w)[w].y=o.pageY,this._notify(e);},t._onKeyDown=function(e){var t=i(this,y)[y];t.deltaX=t.deltaY=0;var n=window.innerHeight-40;switch(e.keyCode){case 37:case 38:t.deltaY=i(this,v)[v].keyStep;break;case 39:case 40:t.deltaY=-i(this,v)[v].keyStep;break;case e.shiftKey:t.deltaY=n;break;case 32:t.deltaY=-n;break;default:return}this._notify(e);},t._bind=function(){s&&i(this,f)[f].addEventListener("wheel",this._onWheel,this.listenerOptions),h&&i(this,f)[f].addEventListener("mousewheel",this._onMouseWheel,this.listenerOptions),r&&i(this,v)[v].useTouch&&(i(this,f)[f].addEventListener("touchstart",this._onTouchStart,this.listenerOptions),i(this,f)[f].addEventListener("touchmove",this._onTouchMove,this.listenerOptions)),l&&a&&(i(this,_)[_]=document.body.style.msTouchAction,document.body.style.msTouchAction="none",i(this,f)[f].addEventListener("MSPointerDown",this._onTouchStart,!0),i(this,f)[f].addEventListener("MSPointerMove",this._onTouchMove,!0)),u&&i(this,v)[v].useKeyboard&&document.addEventListener("keydown",this._onKeyDown);},t._unbind=function(){s&&i(this,f)[f].removeEventListener("wheel",this._onWheel),h&&i(this,f)[f].removeEventListener("mousewheel",this._onMouseWheel),r&&(i(this,f)[f].removeEventListener("touchstart",this._onTouchStart),i(this,f)[f].removeEventListener("touchmove",this._onTouchMove)),l&&a&&(document.body.style.msTouchAction=i(this,_)[_],i(this,f)[f].removeEventListener("MSPointerDown",this._onTouchStart,!0),i(this,f)[f].removeEventListener("MSPointerMove",this._onTouchMove,!0)),u&&i(this,v)[v].useKeyboard&&document.removeEventListener("keydown",this._onKeyDown);},t.on=function(e,t){i(this,p)[p].on(d,e,t);var n=i(this,p)[p].e;n&&n[d]&&1===n[d].length&&this._bind();},t.off=function(e,t){i(this,p)[p].off(d,e,t);var n=i(this,p)[p].e;(!n[d]||n[d].length<=0)&&this._unbind();},t.destroy=function(){i(this,p)[p].off(),this._unbind();},e}()});
  });

  /**`.
   * Based on `Scroll` class, which allows animations of elements on the page
   * according to scroll position.
   *
   */

  var _default$6 =
  /*#__PURE__*/
  function (_Scroll) {
    _inherits(_default, _Scroll);

    function _default(options) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, options));
      _this.sectionsSelector = options.sections ? document.querySelectorAll(options.sections) : document.querySelectorAll(DEFAULTS$1.sections);
      _this.isReversed = options.reversed || DEFAULTS$1.reversed;
      _this.getDirection = options.getDirection || DEFAULTS$1.getDirection;
      _this.getSpeed = options.getSpeed || DEFAULTS$1.getSpeed;
      _this.inertia = options.inertia || DEFAULTS$1.inertia;
      _this.scrollBarClassName = options.scrollBarClassName || DEFAULTS$1.scrollBarClassName;
      _this.isScrollingClassName = options.isScrollingClassName || DEFAULTS$1.isScrollingClassName;
      _this.isDraggingClassName = options.isDraggingClassName || DEFAULTS$1.isDraggingClassName;
      _this.parallaxElements = [];
      _this.isDraggingScrollBar = false;
      _this.isTicking = false;
      _this.hasScrollTicking = false;
      _this.isScrolling = false;
      return _this;
    }
    /**
     * Initialize scrolling animations
     */


    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        // Add class to the document to know if SmoothScroll is initialized (to manage overflow on containers)
        document.documentElement.classList.add('has-smooth-scroll');
        this.instance = new virtualscroll({
          mouseMultiplier: navigator.platform.indexOf('Win') > -1 ? 1 : 0.4,
          touchMultiplier: 4,
          firefoxMultiplier: 30
        });
        this.inertia = this.inertia * 0.1;
        this.instance.scroll = {
          x: 0,
          y: 0,
          direction: null
        };
        this.instance.delta = {
          x: 0,
          y: 0
        };

        if (this.getSpeed) {
          this.instance.scroll.speed = 0;
        }

        this.instance.on(function (e) {
          if (!_this2.isTicking && !_this2.isDraggingScrollBar) {
            requestAnimationFrame(function () {
              if (!_this2.isScrolling) {
                _this2.isScrolling = true;

                _this2.checkScroll();

                html.classList.add(_this2.isScrollingClassName);
              }

              _this2.instance.delta.y -= e.deltaY;
              if (_this2.instance.delta.y < 0) _this2.instance.delta.y = 0;
              if (_this2.instance.delta.y > _this2.instance.limit) _this2.instance.delta.y = _this2.instance.limit;
            });
            _this2.isTicking = true;
          }

          _this2.isTicking = false;
        });
        this.setScrollLimit();
        this.initScrollBar();
        this.addSections();
        this.addElements();
        this.events();
        this.preloadImages();
        this.timestamp = Date.now();
        this.render();
      }
      /**
      * Listen/trigger events
      **/

    }, {
      key: "events",
      value: function events() {
        var _this3 = this;

        // Rebuild event
        this.$container.on(EVENT$1.REBUILD, function () {
          _this3.update();
        }); // Update event

        this.$container.on(EVENT$1.UPDATE, function (event, options) {
          return _this3.update(options);
        }); // Scrollto button event

        this.$container.on(EVENT$1.CLICK, '.js-scrollto', function (event) {
          event.preventDefault();

          _this3.scrollTo({
            sourceElem: event.currentTarget,
            offsetElem: event.currentTarget.getAttribute('data-offset')
          });
        });
        this.$container.on(EVENT$1.SCROLLTO, function (event) {
          return _this3.scrollTo(event.options);
        }); // Setup done

        $document.triggerHandler({
          type: EVENT$1.ISREADY
        }); // Resize event

        $window.on(EVENT$1.RESIZE, debounce(function () {
          _this3.update();
        }, 600));
      }
    }, {
      key: "initScrollBar",
      value: function initScrollBar() {
        var _this4 = this;

        this.scrollbarWrapper = document.createElement('span');
        this.scrollbar = document.createElement('span');
        this.scrollbarWrapper.classList.add("".concat(this.scrollBarClassName, "_wrapper"));
        this.scrollbar.classList.add("".concat(this.scrollBarClassName));
        this.scrollbarWrapper.append(this.scrollbar);
        document.body.append(this.scrollbarWrapper);
        this.scrollbar.style.height = "".concat(window.innerHeight * window.innerHeight / this.instance.limit, "px");
        this.scrollBarLimit = window.innerHeight - this.scrollbar.getBoundingClientRect().height;
        this.scrollbar.addEventListener('mousedown', function (e) {
          return _this4.getScrollBar(e);
        });
        window.addEventListener('mouseup', function (e) {
          return _this4.releaseScrollBar(e);
        });
        window.addEventListener('mousemove', function (e) {
          return _this4.moveScrollBar(e);
        });
      }
    }, {
      key: "reinitScrollBar",
      value: function reinitScrollBar() {
        this.scrollbar.style.height = "".concat(window.innerHeight * window.innerHeight / this.instance.limit, "px");
        this.scrollBarLimit = window.innerHeight - this.scrollbar.getBoundingClientRect().height;
      }
    }, {
      key: "destroyScrollBar",
      value: function destroyScrollBar() {
        var _this5 = this;

        this.scrollbar.removeEventListener('mousedown', function (e) {
          return _this5.getScrollBar(e);
        });
        window.removeEventListener('mouseup', function (e) {
          return _this5.releaseScrollBar(e);
        });
        window.removeEventListener('mousemove', function (e) {
          return _this5.moveScrollBar(e);
        });
      }
    }, {
      key: "getScrollBar",
      value: function getScrollBar(e) {
        this.isDraggingScrollBar = true;
        this.checkScroll();
        html.classList.remove(this.isScrollingClassName);
        html.classList.add(this.isDraggingClassName);
      }
    }, {
      key: "releaseScrollBar",
      value: function releaseScrollBar(e) {
        this.isDraggingScrollBar = false;
        html.classList.add(this.isScrollingClassName);
        html.classList.remove(this.isDraggingClassName);
      }
    }, {
      key: "moveScrollBar",
      value: function moveScrollBar(e) {
        var _this6 = this;

        if (!this.isTicking && this.isDraggingScrollBar) {
          requestAnimationFrame(function () {
            var y = e.pageY * 100 / window.innerHeight * _this6.instance.limit / 100;

            if (y > 0 && y < _this6.instance.limit) {
              _this6.instance.delta.y = y;
            }
          });
          this.isTicking = true;
        }

        this.isTicking = false;
      }
      /**
       * Reset existing sections and find all sections.
       * Called on page load and any subsequent updates.
       */

    }, {
      key: "addSections",
      value: function addSections() {
        this.sections = [];

        for (var i = 0; i < this.sectionsSelector.length; i++) {
          var sectionElement = this.sectionsSelector[i];
          var offset = sectionElement.getBoundingClientRect().top - window.innerHeight * 1.5 - this.getTranslate(sectionElement).y;
          var limit = offset + sectionElement.getBoundingClientRect().height + window.innerHeight * 2;
          var persistent = typeof sectionElement.getAttribute('data-persistent') === 'string';
          var inView = false;

          if (this.instance.scroll.y > offset && this.instance.scroll.y < limit) {
            inView = true;
          }

          var section = {
            element: sectionElement,
            offset: offset,
            limit: limit,
            inView: inView,
            persistent: persistent
          };
          this.sections.push(section);
        }
      }
      /**
       * Reset existing elements and find all animatable elements.
       * Called on page load and any subsequent updates.
       */

    }, {
      key: "addElements",
      value: function addElements() {
        this.animatedElements = [];
        this.parallaxElements = [];

        for (var y = 0; y < this.sections.length; y++) {
          var elements = this.sections[y].element.querySelectorAll(this.selector);
          var len = elements.length;

          for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var elementSpeed = element.getAttribute('data-speed') ? element.getAttribute('data-speed') / 10 : false;
            var elementPosition = element.getAttribute('data-position');
            var elementTarget = element.getAttribute('data-target');
            var elementHorizontal = typeof element.getAttribute('data-horizontal') === 'string';
            var elementSticky = typeof element.getAttribute('data-sticky') === 'string';
            var elementStickyTarget = element.getAttribute('data-sticky-target');
            var target = elementTarget && document.querySelectorAll(elementTarget).length ? document.querySelectorAll(elementTarget) : element;
            var elementOffset = void 0; // reset transform to get the real offset

            if (!this.sections[y].inView) {
              elementOffset = parseInt(target.getBoundingClientRect().top - this.getTranslate(this.sections[y].element).y);
            } else {
              elementOffset = parseInt(target.getBoundingClientRect().top + this.instance.scroll.y);
            }

            var elementLimit = elementOffset + target.offsetHeight;
            var elementViewportOffset = null;

            if (typeof element.getAttribute('data-viewport-offset') === 'string') {
              elementViewportOffset = element.getAttribute('data-viewport-offset').split(',');
            } //Manage callback


            var elementCallbackString = typeof element.getAttribute('data-callback') === 'string' ? element.getAttribute('data-callback') : null;
            var elementCallback = null;

            if (elementCallbackString != null) {
              var event = elementCallbackString.substr(0, elementCallbackString.indexOf('('));
              var optionsString = elementCallbackString.substr(elementCallbackString.indexOf('('), elementCallbackString.length - event.length);
              optionsString = optionsString.replace('(', '');
              optionsString = optionsString.replace(')', '');
              var options = optionsString.split('|');
              var obj = {};

              for (var j = 0; j < options.length; j++) {
                var option = options[j].split(':');
                option[0] = option[0].replace(' ', '');
                var val = void 0; //check if value is a boolean

                if (option[1] === "true") {
                  val = true;
                } else if (option[1] === "false") {
                  val = false;
                } //check if value is numeric
                else if (/^\d+$/.test(option[1])) {
                    val = parseInt(option[1]);
                  } //check if value is a String
                  else {
                      val = option[1];
                    }

                obj[option[0]] = val;
              }

              elementCallback = {
                event: event,
                options: obj
              };
            } // If elements stays visible after scrolling past it


            var elementRepeat = typeof element.getAttribute('data-repeat') === 'string';
            var elementInViewClass = typeof element.getAttribute('data-inview-class') === 'string' ? element.getAttribute('data-inview-class') : 'is-show';

            if (!elementTarget && element.getAttribute('data-transform')) {
              elementOffset -= parseInt(JSON.parse(element.getAttribute('data-transform')).y);
              elementLimit = elementOffset + target.offsetHeight;
            }

            if (elementSticky) {
              if (!elementStickyTarget || typeof elementStickyTarget === 'undefined') {
                elementLimit = Infinity;
              } else {
                elementLimit = document.querySelectorAll(elementStickyTarget)[0].getBoundingClientRect().top - element.offsetHeight + this.instance.scroll.y;
              }
            }

            var newElement = {
              element: element,
              inViewClass: elementInViewClass,
              limit: elementLimit,
              offset: Math.round(elementOffset),
              repeat: elementRepeat,
              callback: elementCallback,
              viewportOffset: elementViewportOffset
            }; // For parallax animated elements

            if (elementSpeed !== false) {
              var _elementPosition = element.getAttribute('data-position');

              var _elementHorizontal = typeof element.getAttribute('data-horizontal') === 'string';

              var elementMiddle = (elementLimit - elementOffset) / 2 + elementOffset;
              var elementDelay = element.getAttribute('data-delay');
              newElement.horizontal = _elementHorizontal;
              newElement.middle = elementMiddle;
              newElement.offset = elementOffset;
              newElement.position = _elementPosition;
              newElement.speed = elementSpeed;
              newElement.delay = elementDelay;
              this.parallaxElements.push(newElement);
            } else {
              newElement.sticky = elementSticky;
              this.animatedElements.push(newElement);

              if (elementSticky) {
                //launch the toggle function to set the position of the sticky element
                this.toggleElement(newElement);
              }
            }
          }
        }
      }
    }, {
      key: "checkScroll",
      value: function checkScroll() {
        var _this7 = this;

        if (this.isScrolling || this.isDraggingScrollBar) {
          if (!this.hasScrollTicking) {
            requestAnimationFrame(function () {
              return _this7.checkScroll();
            });
            this.hasScrollTicking = true;
          }

          var distance = Math.abs(this.instance.delta.y - this.instance.scroll.y);

          if (distance < 1 && this.instance.delta.y != 0 || distance < 0.5 && this.instance.delta.y == 0) {
            this.isScrolling = false;
            this.instance.scroll.y = Math.round(this.instance.scroll.y);
            html.classList.remove(this.isScrollingClassName);
          }

          this.render();
        }
      }
      /**
       * Render the class/transform animations, and update the global scroll positionning.
       *
       * @param  {boolean} isForced Determines if this is a forced request (from a manual call to update or a resize)
       * @param  {object}  status      Optional status object received when method is
       *                               called by smooth-scrollbar instance listener.
       * @return {void}
       */

    }, {
      key: "render",
      value: function render(isForced, e) {
        if (this.isScrolling) {
          this.instance.scroll.y = lerp(this.instance.scroll.y, this.instance.delta.y, this.inertia);
        } else if (this.isDraggingScrollBar) {
          this.instance.scroll.y = lerp(this.instance.scroll.y, this.instance.delta.y, 0.2);
        }

        for (var i = this.sections.length - 1; i >= 0; i--) {
          if (this.sections[i].persistent || this.instance.scroll.y > this.sections[i].offset && this.instance.scroll.y < this.sections[i].limit) {
            this.transform(this.sections[i].element, 0, -this.instance.scroll.y);
            this.sections[i].element.style.visibility = 'visible';
          } else {
            this.sections[i].element.style.visibility = 'hidden';
          }
        }

        if (this.getDirection) {
          if (this.instance.delta.y > this.instance.scroll.y) {
            if (this.instance.scroll.direction !== 'down') {
              this.instance.scroll.direction = 'down';
            }
          } else if (this.instance.delta.y < this.instance.scroll.y) {
            if (this.instance.scroll.direction !== 'up') {
              this.instance.scroll.direction = 'up';
            }
          }
        }

        if (this.getSpeed) {
          if (this.instance.delta.y !== this.instance.scroll.y) {
            this.instance.scroll.speed = (this.instance.delta.y - this.instance.scroll.y) / (Date.now() - this.timestamp);
            this.instance.delta.y = this.instance.delta.y;
          } else {
            this.instance.scroll.speed = 0;
          }
        }

        this.transformElements(isForced);
        this.animateElements();
        this.callbacks.onScroll(this.instance);
        this.timestamp = Date.now(); // scrollbar translation

        var scrollBarTranslation = this.instance.scroll.y / this.instance.limit * this.scrollBarLimit;
        this.transform(this.scrollbar, 0, scrollBarTranslation);
        this.hasScrollTicking = false;
      }
      /**
       * Scroll to a desired target.
       *
       * @param  {object} options
       *      Available options :
       *          {node} targetElem - The DOM element we want to scroll to
       *          {node} sourceElem - An `<a>` element with an href targeting the anchor we want to scroll to
       *          {node} offsetElem - A DOM element from which we get the height to substract from the targetOffset
       *              (ex: use offsetElem to pass a mobile header that is above content, to make sure the scrollTo will be aligned with it)
       *          {int} targetOffset - An absolute vertical scroll value to reach, or an offset to apply on top of given `targetElem` or `sourceElem`'s target
       *          {int} delay - Amount of milliseconds to wait before starting to scroll
       *          {boolean} toTop - Set to true to scroll all the way to the top
       *          {boolean} toBottom - Set to true to scroll all the way to the bottom
       *          {float} speed - Duration of the scroll (⚠️ DISABLED since v2)
       * @return {void}
       */

    }, {
      key: "scrollTo",
      value: function scrollTo(options) {
        var _this8 = this;

        var targetElem = options.targetElem;
        var sourceElem = options.sourceElem;
        var offsetElem = options.offsetElem;
        var targetOffset = isNumeric(options.targetOffset) ? parseInt(options.targetOffset) : 0;
        var delay = isNumeric(options.delay) ? parseInt(options.delay) : 0; // const speed = isNumeric(options.speed) ? parseInt(options.speed) : 900; // (⚠️ DISABLED since v2)

        var toTop = options.toTop;
        var toBottom = options.toBottom; // Make sure at least one of the required options has beeen filled

        if (!toTop && !toBottom && !isNumeric(options.targetOffset) && !targetElem && !sourceElem) {
          console.warn("You must specify at least one of these parameters:", ['{boolean} toTop - Set to true to scroll all the way to the top', '{boolean} toBottom - Set to true to scroll all the way to the bottom', '{int} targetOffset - An absolute vertical scroll value to reach, or an offset to apply on top of given `targetElem` or `sourceElem`\'s target', '{node} targetElem - The DOM element we want to scroll to', '{node} sourceElem - An `<a>` element with an href targeting the anchor we want to scroll to']);
          return false;
        } // If sourceElem is given, find and store the targetElem it's related to


        if (sourceElem) {
          var targetData = '';
          console.log(sourceElem); // Get the selector (given with `data-target` or `href` attributes on sourceElem)

          var sourceElemTarget = sourceElem.getAttribute('data-target');
          targetData = sourceElemTarget ? sourceElemTarget : sourceElem.getAttribute('href'); // Store the target for later

          targetElem = document.querySelectorAll(targetData)[0];
        } // We have a targetElem, get it's coordinates


        if (targetElem) {
          // Get targetElem offset from top
          var targetElemBCR = targetElem.getBoundingClientRect();
          var targetElemOffsetTop = targetElemBCR.top + this.$container[0].scrollTop; // Try and find the targetElem's parent section

          var targetParents = getParents(targetElem);
          var parentSection = targetParents.find(function (candidate) {
            return _this8.sections.find(function (section) {
              return section.element == candidate;
            });
          });
          var parentSectionOffset = 0;

          if (parentSection) {
            parentSectionOffset = this.getTranslate(parentSection).y; // We got a parent section, store it's current offset to remove it later
          } // Final value of scroll destination : targetElemOffsetTop + (optional offset given in options) - (parent's section translate)


          targetOffset = targetElemOffsetTop + targetOffset - parentSectionOffset;
        } // We have an offsetElem, get its height and remove it from targetOffset already computed


        if (offsetElem) {
          var offset = offsetElem.offsetHeight;
          targetOffset = targetOffset - offset;
        } // If we want to go to one of boundaries


        if (toTop === true) {
          targetOffset = 0;
        } else if (toBottom === true) {
          targetOffset = this.instance.limit;
        } // Wait for the asked delay if needed


        setTimeout(function () {
          _this8.instance.delta.y = targetOffset; // Actual scrollTo (the lerp will do the animation itself)
          // Update the scroll. If we were in idle state: we're not anymore

          _this8.isScrolling = true;

          _this8.checkScroll();

          html.classList.add(_this8.isScrollingClassName);
        }, delay);
      }
      /**
       * Set the scroll bar limit
       */

    }, {
      key: "setScrollLimit",
      value: function setScrollLimit() {
        this.instance.limit = this.$container[0].offsetHeight - this.windowHeight;
      }
      /**
       * Apply CSS transform properties on an element.
       *
       * @param  {object}  element  Targetted node
       * @param  {int}     x        Translate value
       * @param  {int}     y        Translate value
       * @param  {int}     z        Translate value
       * @return {void}
       */

    }, {
      key: "transform",
      value: function transform(element, x, y, delay) {
        // Defaults
        x = parseInt(x * 10000) / 10000 || 0;
        y = parseInt(y * 10000) / 10000 || 0;

        if (!delay) {
          // Translate and store the positionning as `data`
          var transform = "matrix(1,0,0,1,".concat(x, ",").concat(y, ")");
          element.style.webkitTransform = transform;
          element.style.MozTransform = transform;
          element.style.msTransform = transform;
          element.style.OTransform = transform;
          element.style.transform = transform;
          element.setAttribute('data-transform', "{\"x\": ".concat(parseInt(x), ",\"y\": ").concat(parseInt(y), "}"));
        } else {
          var start = this.getTranslate(element);
          var lerpY = lerp(start.y, y, delay);
          var lerpX = lerp(start.x, x, delay);

          var _transform = "matrix(1,0,0,1,".concat(lerpX, ",").concat(lerpY, ")");

          element.style.webkitTransform = _transform;
          element.style.MozTransform = _transform;
          element.style.msTransform = _transform;
          element.style.OTransform = _transform;
          element.style.transform = _transform;
          element.setAttribute('data-transform', "{\"x\": ".concat(parseInt(lerpX), ",\"y\": ").concat(parseInt(lerpY), "}"));
        }
      }
    }, {
      key: "getTranslate",
      value: function getTranslate(el) {
        var translate = {};
        if (!window.getComputedStyle) return;
        var style = getComputedStyle(el);
        var transform = style.transform || style.webkitTransform || style.mozTransform;
        var mat = transform.match(/^matrix3d\((.+)\)$/);
        if (mat) return parseFloat(mat[1].split(', ')[13]);
        mat = transform.match(/^matrix\((.+)\)$/);
        translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
        translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;
        return translate;
      }
      /**
       * Loop through all parallax-able elements and apply transform method(s).
       *
       * @param  {boolean} isForced Determines if this is a forced request (from a manual call to update or a resize)
       * @return {void}
       */

    }, {
      key: "transformElements",
      value: function transformElements(isForced) {
        if (this.parallaxElements.length > 0) {
          var scrollBottom = this.instance.scroll.y + this.windowHeight;
          var scrollMiddle = this.instance.scroll.y + this.windowMiddle;
          var i = 0;
          var len = this.parallaxElements.length;

          for (; i < len; i++) {
            var curEl = this.parallaxElements[i];
            var transformDistance = false; // Define if the element is in view

            var inView = scrollBottom + this.windowHeight >= curEl.offset && this.instance.scroll.y <= curEl.limit;
            this.toggleElement(curEl, i);

            if (isForced && !inView && curEl.speed) {
              // Different calculations if it is the first call and the item is not in the view
              // if (curEl.position !== 'top') {
              //     if(curEl.$element.attr('data-log')) console.log(`(curEl.offset (${curEl.offset}) - this.windowMiddle (${this.windowMiddle}) - curEl.middle (${curEl.middle})) * curEl.speed (${curEl.speed})`);
              //     transformDistance = (curEl.offset - this.windowMiddle - curEl.middle) * curEl.speed;
              // }
              transformDistance = 0;
            } // If element is in view


            if (inView && curEl.speed) {
              //|| (isForced && !inView && curEl.speed)) {
              switch (curEl.position) {
                case 'top':
                  transformDistance = this.instance.scroll.y * -curEl.speed;
                  break;

                case 'bottom':
                  transformDistance = (this.instance.limit - scrollBottom + this.windowHeight) * curEl.speed;
                  break;

                default:
                  transformDistance = (scrollMiddle - curEl.middle) * -curEl.speed;
                  break;
              }
            } // Transform horizontal OR vertical. Defaults to vertical


            if (isNumeric(transformDistance)) {
              curEl.horizontal ? this.transform(curEl.element, transformDistance, 0, curEl.delay) : this.transform(curEl.element, 0, transformDistance, curEl.delay);
            }
          }
        }
      }
      /**
       * Update elements and recalculate all the positions on the page
       *
       * @param {object} options
       */

    }, {
      key: "update",
      value: function update(options) {
        this.windowHeight = $window.height();
        this.windowMiddle = this.windowHeight / 2;
        this.setScrollLimit();
        this.addSections();
        this.addElements();
        this.transformElements(true);
        this.reinitScrollBar();
      }
    }, {
      key: "preloadImages",
      value: function preloadImages() {
        var _this9 = this;

        var images = Array.from(document.querySelectorAll('img'));
        images.forEach(function (image) {
          var img = document.createElement('img');
          img.addEventListener('load', function () {
            images.splice(images.indexOf(image), 1);
            images.length === 0 && _this9.update();
          });
          img.src = image.getAttribute('src');
        });
      }
      /**
       * Destroy
       */

    }, {
      key: "destroy",
      value: function destroy() {
        _get(_getPrototypeOf(_default.prototype), "destroy", this).call(this);

        $html.removeClass('has-smooth-scroll');
        this.parallaxElements = [];
        this.instance.destroy();
        this.scrollbarWrapper.remove();
        cancelAnimationFrame(this.raf);
      }
    }]);

    return _default;
  }(_default$5);

  var keyCodes = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    TAB: 9
  };

  var _default$7 =
  /*#__PURE__*/
  function (_SmoothScroll) {
    _inherits(_default, _SmoothScroll);

    function _default(options) {
      _classCallCheck$1(this, _default);

      return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, options));
    }
    /**
     * Initialize scrolling animations
     */


    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this = this;

        // Add class to the document to know if SmoothScroll is initialized (to manage overflow on containers)
        document.documentElement.classList.add('has-smooth-scroll');
        this.instance = new virtualscroll({
          mouseMultiplier: navigator.platform.indexOf('Win') > -1 ? 1 : 0.4,
          touchMultiplier: 4,
          firefoxMultiplier: 30,
          useKeyboard: false
        });
        this.inertia = this.inertia * 0.1;
        this.instance.scroll = {
          x: 0,
          y: 0,
          direction: null
        };
        this.instance.delta = {
          x: 0,
          y: 0,
          direction: null
        };

        if (this.getSpeed) {
          this.instance.scroll.speed = 0;
        }

        this.instance.on(function (e) {
          if (!_this.isTicking && !_this.isDraggingScrollBar) {
            requestAnimationFrame(function () {
              if (!_this.isScrolling) {
                _this.isScrolling = true;

                _this.checkScroll();

                html.classList.add(_this.isScrollingClassName);
              }

              if (!window.app.preventScroll && !window.app.menuOpen) {
                _this.instance.delta.y -= e.deltaY;
                _this.instance.delta.direction = e.deltaY > 0 ? 'up' : 'down';
              }

              if (window.app.preventScroll) {
                _this.instance.delta.direction = e.deltaY > 0 ? 'up' : 'down';
              }

              if (_this.instance.delta.y < 0) _this.instance.delta.y = 0;
              if (_this.instance.delta.y > _this.instance.limit) _this.instance.delta.y = _this.instance.limit;
            });
            _this.isTicking = true;
          }

          _this.isTicking = false;
        });
        this.setScrollLimit();
        this.initScrollBar();
        this.addSections();
        this.addElements();
        this.events();
        this.preloadImages();
        this.timestamp = Date.now();
        this.checkKey = this.checkKey.bind(this);
        window.addEventListener('keydown', this.checkKey, false);
        this.render();
      }
      /**
       * Reset existing elements and find all animatable elements.
       * Called on page load and any subsequent updates.
       */

    }, {
      key: "addElements",
      value: function addElements() {
        var _this2 = this;

        this.animatedElements = [];
        this.parallaxElements = [];

        for (var y = 0; y < this.sections.length; y++) {
          var elements = this.sections[y].element.querySelectorAll(this.selector);
          var len = elements.length;

          for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            TweenMax.set(element, {
              clearProps: 'transform'
            });
            var elementSpeed = element.getAttribute('data-speed') ? element.getAttribute('data-speed') / 10 : false;
            var elementPosition = element.getAttribute('data-position');
            var elementTarget = element.getAttribute('data-target');
            var elementHorizontal = typeof element.getAttribute('data-horizontal') === 'string';
            var elementSticky = typeof element.getAttribute('data-sticky') === 'string';
            var elementStickyTarget = element.getAttribute('data-sticky-target');
            var target = elementTarget && document.querySelector(elementTarget) && document.querySelector(elementTarget).length ? document.querySelector(elementTarget) : element;
            var elementOffset = void 0; // reset transform to get the real offset

            if (!this.sections[y].inView) {
              elementOffset = parseInt(target.getBoundingClientRect().top - this.getTranslate(this.sections[y].element).y);
            } else {
              elementOffset = parseInt(target.getBoundingClientRect().top + this.instance.scroll.y);
            }

            var elementLimit = elementOffset + target.offsetHeight;
            var elementViewportOffset = null;

            if (typeof element.getAttribute('data-viewport-offset') === 'string') {
              elementViewportOffset = element.getAttribute('data-viewport-offset').split(',');
            } //Manage callback


            var elementCallbackString = typeof element.getAttribute('data-callback') === 'string' ? element.getAttribute('data-callback') : null;
            var elementCallback = null;

            if (elementCallbackString != null) {
              var event = elementCallbackString.substr(0, elementCallbackString.indexOf('('));
              var optionsString = elementCallbackString.substr(elementCallbackString.indexOf('('), elementCallbackString.length - event.length);
              optionsString = optionsString.replace('(', '');
              optionsString = optionsString.replace(')', '');
              var options = optionsString.split('|');
              var obj = {};

              for (var j = 0; j < options.length; j++) {
                var option = options[j].split(':');
                option[0] = option[0].replace(' ', '');
                var val = void 0; //check if value is a boolean

                if (option[1] === "true") {
                  val = true;
                } else if (option[1] === "false") {
                  val = false;
                } //check if value is numeric
                else if (/^\d+$/.test(option[1])) {
                    val = parseInt(option[1]);
                  } //check if value is a String
                  else {
                      val = option[1];
                    }

                obj[option[0]] = val;
              }

              elementCallback = {
                event: event,
                options: obj
              };
            } // If elements stays visible after scrolling past it


            var elementRepeat = typeof element.getAttribute('data-repeat') === 'string';
            var elementInViewClass = typeof element.getAttribute('data-inview-class') === 'string' ? element.getAttribute('data-inview-class') : 'is-show';

            if (!elementTarget && element.getAttribute('data-transform')) {
              elementOffset -= parseInt(JSON.parse(element.getAttribute('data-transform')).y);
              elementLimit = elementOffset + target.offsetHeight;
            }

            if (elementSticky) {
              if (!elementStickyTarget || typeof elementStickyTarget === 'undefined' || elementStickyTarget === null) {
                elementLimit = Infinity;
              } else {
                if (document.querySelectorAll(elementStickyTarget).length) {
                  (function () {
                    var elementStickyTargetSection = queryClosestParent(document.querySelector(elementStickyTarget), '.js-section');

                    if (elementStickyTargetSection) {
                      var section = _this2.sections.find(function (candidate) {
                        return candidate.element == elementStickyTargetSection;
                      });

                      if (!section.inView) {
                        elementLimit = document.querySelector(elementStickyTarget).getBoundingClientRect().top - element.offsetHeight - _this2.getTranslate(_this2.sections[y].element).y;
                      } else {
                        elementLimit = document.querySelector(elementStickyTarget).getBoundingClientRect().top - element.offsetHeight + _this2.instance.scroll.y;
                      }
                    } else {
                      elementLimit = document.querySelector(elementStickyTarget).getBoundingClientRect().top - element.offsetHeight + _this2.instance.scroll.y;
                    }
                  })();
                }
              }
            }

            var newElement = {
              element: element,
              inViewClass: elementInViewClass,
              limit: elementLimit,
              offset: Math.round(elementOffset),
              repeat: elementRepeat,
              callback: elementCallback,
              viewportOffset: elementViewportOffset
            }; // For parallax animated elements

            if (elementSpeed !== false) {
              var _elementPosition = element.getAttribute('data-position');

              var _elementHorizontal = typeof element.getAttribute('data-horizontal') === 'string';

              var elementMiddle = (elementLimit - elementOffset) / 2 + elementOffset;
              var elementDelay = element.getAttribute('data-delay');
              newElement.horizontal = _elementHorizontal;
              newElement.middle = elementMiddle;
              newElement.offset = elementOffset;
              newElement.position = _elementPosition;
              newElement.speed = elementSpeed;
              newElement.delay = elementDelay;
              this.parallaxElements.push(newElement);
            } else {
              newElement.sticky = elementSticky;
              this.animatedElements.push(newElement);

              if (elementSticky) {
                //launch the toggle function to set the position of the sticky element
                this.toggleElement(newElement);
              }
            }
          }
        }
      }
    }, {
      key: "getTranslate",
      value: function getTranslate(el) {
        var translate = {};
        if (!window.getComputedStyle) return;
        var style = getComputedStyle(el);
        var transform = style.transform || style.webkitTransform || style.mozTransform;

        if (transform) {
          var mat = transform.match(/^matrix3d\((.+)\)$/);
          if (mat) return parseFloat(mat[1].split(', ')[13]);
          mat = transform.match(/^matrix\((.+)\)$/);
          translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
          translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;
        }

        return translate;
      }
    }, {
      key: "checkKey",
      value: function checkKey(e) {
        var _this3 = this;

        switch (e.keyCode) {
          case keyCodes.TAB:
            setTimeout(function () {
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;

              if (!(document.activeElement instanceof HTMLBodyElement)) {
                _this3.scrollTo({
                  targetElem: document.activeElement,
                  targetOffset: -window.innerHeight / 2
                });
              }
            }, 0);
            break;

          case keyCodes.UP:
            if (document.activeElement instanceof HTMLBodyElement) {
              this.instance.delta.y -= 240;
            }

            break;

          case keyCodes.DOWN:
            if (document.activeElement instanceof HTMLBodyElement) {
              this.instance.delta.y += 240;
            }

            break;

          case keyCodes.SPACE:
            if (!(document.activeElement instanceof HTMLInputElement) && !(document.activeElement instanceof HTMLTextAreaElement)) {
              if (e.shiftKey) {
                this.instance.delta.y -= window.innerHeight;
              } else {
                this.instance.delta.y += window.innerHeight;
              }
            }

            break;

          default:
            return;
        }

        if (this.instance.delta.y < 0) this.instance.delta.y = 0;
        if (this.instance.delta.y > this.instance.limit) this.instance.delta.y = this.instance.limit;
        this.isScrolling = true;
        this.checkScroll();
      }
      /**
       * Render the class/transform animations, and update the global scroll positionning.
       *
       * @param  {boolean} isForced Determines if this is a forced request (from a manual call to update or a resize)
       * @param  {object}  status      Optional status object received when method is
       *                               called by smooth-scrollbar instance listener.
       * @return {void}
       */

    }, {
      key: "render",
      value: function render(isForced, e) {
        if (this.isScrolling) {
          this.instance.scroll.y = lerp(this.instance.scroll.y, this.instance.delta.y, this.inertia);
        } else if (this.isDraggingScrollBar) {
          this.instance.scroll.y = lerp(this.instance.scroll.y, this.instance.delta.y, 0.2);
        }

        for (var i = this.sections.length - 1; i >= 0; i--) {
          if (this.sections[i].persistent || this.instance.scroll.y > this.sections[i].offset && this.instance.scroll.y < this.sections[i].limit) {
            this.transform(this.sections[i].element, 0, -this.instance.scroll.y);
            this.sections[i].element.style.visibility = 'visible';
          } else {
            this.sections[i].element.style.visibility = 'hidden';
          }
        }

        if (this.getDirection) {
          this.instance.scroll.direction = this.instance.delta.direction; // if (this.instance.delta.y > this.instance.scroll.y) {
          //     if (this.instance.scroll.direction !== 'down') {
          //         this.instance.scroll.direction = 'down';
          //     }
          // } else if (this.instance.delta.y < this.instance.scroll.y) {
          //     if (this.instance.scroll.direction !== 'up') {
          //         this.instance.scroll.direction = 'up';
          //     }
          // }
        }

        if (this.getSpeed) {
          if (this.instance.delta.y !== this.instance.scroll.y) {
            this.instance.scroll.speed = (this.instance.delta.y - this.instance.scroll.y) / (Date.now() - this.timestamp);
            this.instance.delta.y = this.instance.delta.y;
          } else {
            this.instance.scroll.speed = 0;
          }
        }

        this.transformElements(isForced);
        this.animateElements();
        this.callbacks.onScroll(this.instance);
        this.timestamp = Date.now(); // scrollbar translation

        var scrollBarTranslation = this.instance.scroll.y / this.instance.limit * this.scrollBarLimit;
        this.transform(this.scrollbar, 0, scrollBarTranslation);
        this.hasScrollTicking = false;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        window.removeEventListener('keydown', this.checkKey, false);

        _get(_getPrototypeOf(_default.prototype), "destroy", this).call(this);
      }
    }]);

    return _default;
  }(_default$6);

  /**
   * Basic module that detects which scrolling module we'll be using
   */

  var _default$8 =
  /*#__PURE__*/
  function () {
    function _default(options) {
      _classCallCheck$1(this, _default);

      this.options = options;
      this.smooth = options.smooth || DEFAULTS$1.smooth;
      this.smoothMobile = options.smoothMobile || DEFAULTS$1.smoothMobile;
      this.mobileContainer = options.mobileContainer || DEFAULTS$1.mobileContainer;
      this.isMobile = false;
      this.init();
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this = this;

        $html[0].scrollTop = 0;
        $body[0].scrollTop = 0;

        if (!this.smoothMobile) {
          this.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }

        this.instance = function () {
          if (_this.smooth === true && !_this.isMobile) {
            return new _default$7(_this.options);
          } else {
            if (_this.mobileContainer) {
              _this.options.container = _this.mobileContainer;
            }

            return new _default$5(_this.options);
          }
        }();

        this.instance.init();
        var $scrollToOnLoadEl = $('.js-scrollto-on-load').first();

        if ($scrollToOnLoadEl.length === 1) {
          $document.triggerHandler({
            type: 'Event.SCROLLTO',
            options: {
              targetElem: $scrollToOnLoadEl
            }
          });
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.instance.destroy();
      }
    }]);

    return _default;
  }();

  /**
   * Basic module that detects which scrolling module we'll be using
   */

  var _default$9 =
  /*#__PURE__*/
  function (_ScrollManager) {
    _inherits(_default, _ScrollManager);

    function _default() {
      _classCallCheck$1(this, _default);

      return _possibleConstructorReturn(this, _getPrototypeOf(_default).apply(this, arguments));
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this = this;

        $html[0].scrollTop = 0;
        $body[0].scrollTop = 0;

        if (!this.smoothMobile) {
          this.isMobile = isMobile$1;
        }

        this.instance = function () {
          if (_this.smooth === true && !_this.isMobile) {
            return new _default$7(_this.options);
          } else {
            if (_this.mobileContainer) {
              _this.options.container = _this.mobileContainer;
            }

            return new _default$5(_this.options);
          }
        }();

        this.instance.init();
        var $scrollToOnLoadEl = $('.js-scrollto-on-load').first();

        if ($scrollToOnLoadEl.length === 1) {
          $document.triggerHandler({
            type: 'Event.SCROLLTO',
            options: {
              targetElem: $scrollToOnLoadEl
            }
          });
        }
      }
    }]);

    return _default;
  }(_default$8);

  var _default$a =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.isMain = getData(_this.data('main'));
      _this.isTop = false;
      document.documentElement.classList.add('is-top');
      window.app.scroll = {
        x: 0,
        y: 0
      };
      _this.images = Array.from(_this.el.querySelectorAll('img')).filter(function (img) {
        return !img.complete;
      });
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.scroll = new _default$9({
          container: $(this.el),
          smooth: true,
          inertia: 1,
          getDirection: true,
          onScroll: function onScroll(e) {
            // console.log(e);
            if (!e || !e.scroll) return;
            if (e.scroll.direction == 'down') html.classList.add('is-scrolling-down');else html.classList.remove('is-scrolling-down');

            if (_this2.scroll) {
              var scrollValue = e.scroll.y;
              if (_this2.scroll.instance && _this2.scroll.instance.instance && _this2.scroll.instance.instance.delta) scrollValue = _this2.scroll.instance.instance.delta.y;

              if (!_this2.isTop && scrollValue == 0) {
                _this2.isTop = true;
                document.documentElement.classList.add('is-top');
              } else if (_this2.isTop && scrollValue > 0) {
                _this2.isTop = false;
                document.documentElement.classList.remove('is-top');
              }

              if (_this2.isMain) {
                window.app.scroll.direction = e.scroll.direction;
                window.app.scroll.y = e.scroll.y;
                $document.triggerHandler({
                  type: EVENT$1.SCROLLING
                });
              }

              if (window.app.hasIntro && _this2.isMain && !window.app.introScrollRequested && scrollValue == 0 && e.scroll.direction == 'up') _this2.call('enableScroll', 500, 'Intro');
            }
          }
        });
        var scope = this;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.images[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var img = _step.value;

            this.onImageLoad = function () {
              requestAnimationFrame(scope.update.bind(scope));
              scope.update();
              this.removeEventListener('load', this.onImageLoad);
            };

            img.addEventListener('load', this.onImageLoad);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        this.onUiDarkTrigger = function (e) {
          if (e.options.direction != undefined) {
            if (window.app.scroll.direction === e.options.direction) {
              if (e.way === e.options.way) {
                document.documentElement.classList.remove('has-white-logo');
                document.documentElement.classList.remove('has-dark-header');
              }
            }
          } else {
            document.documentElement.classList.remove('has-white-logo');
            document.documentElement.classList.remove('has-dark-header');
          }
        };

        $document.on(EVENT$1.TRIGGER_UI_DARK, this.onUiDarkTrigger);

        this.onUiLightTrigger = function (e) {
          if (e.options.direction != undefined) {
            if (window.app.scroll.direction === e.options.direction) {
              if (e.way === e.options.way) {
                document.documentElement.classList.add('has-white-logo');
                document.documentElement.classList.add('has-dark-header');
              }
            }
          } else {
            document.documentElement.classList.add('has-white-logo');
            document.documentElement.classList.add('has-dark-header');
          }
        };

        $document.on(EVENT$1.TRIGGER_UI_LIGHT, this.onUiLightTrigger);
      }
    }, {
      key: "scrollTo",
      value: function scrollTo(options) {
        this.scroll.instance.scrollTo(options);
      }
    }, {
      key: "update",
      value: function update() {
        this.scroll.instance.update();
        $document.triggerHandler({
          type: EVENT$1.SCROLLING
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.images[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var img = _step2.value;
            img.removeEventListener('load', this.onImageLoad);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        $document.off(EVENT$1.TRIGGER_UI_DARK, this.onUiDarkTrigger);
        $document.off(EVENT$1.TRIGGER_UI_LIGHT, this.onUiLightTrigger);
        this.scroll.destroy();
      }
    }]);

    return _default;
  }(_default);

  var _default$b =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.events = {
        click: 'toggleMenu'
      };
      return _this;
    }

    _createClass$1(_default, [{
      key: "toggleMenu",
      value: function toggleMenu() {
        this.call('toggle', null, 'Nav');
      }
    }]);

    return _default;
  }(_default);

  var _default$c =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.active = false;
      _this.dot = _this.$('dot');
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.initTl();
        setInterval(function () {
          var rand = Math.random();

          if (rand < 0.2) {
            _this2.jump();
          }
        }, 500);
        this.jumpBind = this.jump.bind(this);
        this.el.addEventListener('mouseenter', this.jumpBind);
      }
    }, {
      key: "initTl",
      value: function initTl() {
        var _this3 = this;

        var transform = {
          x: 0,
          y: 0,
          z: 0,
          sX: 1,
          sY: 1,
          sZ: 1
        };
        this.tl = new TimelineMax({
          repeat: 0,
          repeatDelay: 1,
          onUpdate: function onUpdate() {
            TweenMax.set(_this3.dot, {
              transform: "translate3d(".concat(transform.x, "px,").concat(transform.y, "px,").concat(transform.z, "px) scale3d(").concat(transform.sX, ",").concat(transform.sY, ",").concat(transform.sZ, ")")
            });
          },
          onComplete: function onComplete() {
            _this3.active = false;
          }
        });
        var TIME_UNIT = 1;
        this.tl.fromTo(transform, TIME_UNIT * 0.1, {
          sY: 1
        }, {
          sY: 0.5,
          ease: Power2.easeInOut
        });
        this.tl.to(transform, TIME_UNIT * 0.1, {
          sY: 2,
          ease: Power2.easeOut
        });
        this.tl.addLabel('pre');
        this.tl.to(transform, TIME_UNIT * .25, {
          y: -100,
          sY: 1,
          ease: Power2.easeOut
        }, 'pre');
        this.tl.addLabel('mid');
        this.tl.to(transform, TIME_UNIT * .25, {
          y: 0,
          sY: 2,
          ease: Power2.easeIn
        }, 'mid');
        this.tl.to(transform, TIME_UNIT * 0.1, {
          sY: 0.5,
          ease: Power2.easeOut
        });
        this.tl.addLabel('post');
        this.tl.to(transform, TIME_UNIT * 0.1, {
          sY: 1,
          ease: Power2.easeInOut
        }, 'post');
        this.tl.pause();
      }
    }, {
      key: "jump",
      value: function jump() {
        if (this.active) return;
        this.active = true;
        this.tl.progress(0);
        this.tl.play();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.el.removeEventListener('mouseenter', this.jumpBind);
      }
    }]);

    return _default;
  }(_default);

  var SPEED = 0.75;
  var animatedLineBlocks = ['left', 'middle', 'right'];

  var _default$d =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      window.app.hasIntro = true;
      window.app.preventScroll = true;
      _this.skip = false;
      var ls = window.localStorage.getItem('bornandbred.intro');

      if (ls && ls.length) {
        ls = JSON.parse(ls);
        _this.skip = ls.skip;
      }

      if (_this.skip) _this.el.classList.add('has-no-tutorial');else _this.el.classList.remove('has-no-tutorial');
      _this.events = {
        click: 'continue' // SELECT OUR ELEMENTS
        // First, get all our line elements

      };
      _this.animatedLine = {};

      for (var _i = 0, _animatedLineBlocks = animatedLineBlocks; _i < _animatedLineBlocks.length; _i++) {
        var block = _animatedLineBlocks[_i];
        _this.animatedLine[block] = {
          el: _this.$(block),
          target: _this.$(block + 'Target')
        };
      }

      _this.initLines = _this.$('initLine');
      _this.lines = _this.$('line');
      _this.textBasis = _this.$('textBasis'); // Then, get each section specific elements
      // overlay

      _this.overlay = _this.$('overlay');
      _this.overlayBgCols = _this.$('overlay-bg-col');
      _this.overlayText = _this.$('overlay-text');
      _this.overlayProgress = _this.$('overlay-progress'); // tutorial

      _this.tutorial = _this.$('tutorial');
      _this.swipeIcon = _this.$('swipeIcon'); // video

      _this.videoWrapper = _this.$('video-wrapper');
      _this.videoText = _this.$('video-text');
      _this.videoSrc = _this.data('src', _this.videoWrapper);
      _this.video = document.createElement('video');
      _this.video.preload = 'all';
      _this.video.autoplay = true;
      _this.video.muted = true;
      _this.video.playsinline = true;
      _this.video.loop = true;

      _this.video.setAttribute('preload', 'all');

      _this.video.setAttribute('autoplay', '');

      _this.video.setAttribute('muted', '');

      _this.video.setAttribute('playsinline', '');

      _this.video.setAttribute('loop', '');

      _this.video.innerHTML = "<source src=\"".concat(_this.videoSrc, "\" type=\"video/mp4\">");

      _this.videoWrapper.prepend(_this.video); // content


      _this.contentCols = _this.$('contentCol');
      _this.contentButton = _this.$('contentButton');
      _this.contentColsInner = _this.$('contentColInner');
      _this.contentColsSplit = new SplitText(_this.contentColsInner, {
        type: 'lines'
      }); // circle related

      _this.circle = _this.$('circle');
      _this.circleWrapper = _this.$('circleWrapper');
      _this.circleInner = _this.$('circleInner');
      _this.circleOuter = _this.$('circleOuter'); // START THIS THING

      _this.start().then(function () {
        _this.compute();

        _this.ready = true;
        _this.videoLoadBind = _this.compute.bind(_assertThisInitialized(_this));

        _this.video.addEventListener('loadedmetadata', _this.videoLoadBind);

        _this.manageSwipe();

        if (_this.skip) {
          _this.timeout = setTimeout(function () {
            _this["continue"]();
          }, 500);
        } else {
          var duration = 5;
          _this.progressTw = TweenMax.fromTo(_this.overlayProgress, duration, {
            opacity: 1,
            scaleX: 0
          }, {
            scaleX: 1,
            ease: Linear.easeNone
          });
          _this.timeout = setTimeout(function () {
            _this["continue"]();
          }, duration * 1000);
        }
      });

      _this.highlightMouseEnter = function (e) {
        var id = _this.data('id', e.target);

        _this.call('show', e, 'Intromask', id);
      };

      _this.highlightMouseLeave = function (e) {
        var id = _this.data('id', e.target);

        _this.call('hide', e, 'Intromask', id);
      };

      _this.onWheelBind = function (e) {
        if (e.deltaY > 0) _this["continue"]();
      };

      document.addEventListener('wheel', _this.onWheelBind);
      _this.overlay.style.height = window.innerHeight + 'px';

      _this.onResizeBind = function () {
        _this.overlay.style.height = window.innerHeight + 'px';

        _this.compute();
      };

      window.addEventListener('resize', _this.onResizeBind);
      return _this;
    }

    _createClass$1(_default, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        return new Promise(function (resolve) {
          _this2.initTl = new TimelineMax({
            onComplete: function onComplete() {
              resolve();
            }
          });

          for (var i = _this2.initLines.length - 1; i >= 0; i--) {
            _this2.initTl.fromTo(_this2.initLines[i], SPEED, {
              y: 100 * (i + 1) + '%',
              opacity: 0,
              force3D: true,
              ease: Power2.easeOut
            }, {
              y: '0%',
              opacity: 1
            }, i * SPEED / 10);
          }
        });
      }
    }, {
      key: "compute",
      value: function compute() {
        this.viewport = {
          width: window.innerWidth,
          height: window.innerHeight
        };
        var videoWrapperBCR = this.videoWrapper.getBoundingClientRect();
        var videoWrapperRatio = videoWrapperBCR.width / videoWrapperBCR.height;
        var videoRatio = this.video.videoWidth / this.video.videoHeight;
        var top, left, height, width;

        if (videoWrapperRatio < videoRatio) {
          top = '0px';
          height = '100%';
          width = 'auto';
          var realW = videoWrapperBCR.height * videoRatio;
          left = -(realW - videoWrapperBCR.width) / 2 + 'px';
        } else {
          left = '0px';
          height = 'auto';
          width = '100%';
          var realH = videoWrapperBCR.width * (1 / videoRatio);
          top = -(realH - videoWrapperBCR.height) / 2 + 'px';
        }

        TweenMax.set(this.video, {
          top: top,
          left: left,
          width: width,
          height: height
        });
        this.scrollSize = this.viewport.width / 2;

        for (var _i2 = 0, _animatedLineBlocks2 = animatedLineBlocks; _i2 < _animatedLineBlocks2.length; _i2++) {
          var block = _animatedLineBlocks2[_i2];
          this.animatedLine[block].elBCR = this.animatedLine[block].el[0].getBoundingClientRect();
          this.animatedLine[block].targetBCR = this.animatedLine[block].target[0].getBoundingClientRect();
          this.animatedLine[block].offset = {
            x: this.animatedLine[block].targetBCR.left + this.animatedLine[block].targetBCR.width / 2 - (this.animatedLine[block].elBCR.left + this.animatedLine[block].elBCR.width / 2),
            y: this.animatedLine[block].targetBCR.top + this.animatedLine[block].targetBCR.height / 2 - (this.animatedLine[block].elBCR.top + this.animatedLine[block].elBCR.height / 2)
          };
          this.animatedLine[block].scaleFactor = this.animatedLine[block].targetBCR.width / this.animatedLine[block].elBCR.width;
        }
      }
    }, {
      key: "continue",
      value: function _continue() {
        var _this3 = this;

        if (!this.ready || this.continued) return;
        this.continued = true;
        clearTimeout(this.timeout);
        window.localStorage.setItem('bornandbred.intro', JSON.stringify({
          skip: true
        }));

        if (this.panManager) {
          this.killSwipe();
        }

        if (this.progressTw && this.progressTw.kill) this.progressTw.kill();
        this.progressTw = TweenMax.to(this.overlayProgress, SPEED * 0.5, {
          scaleX: 1,
          opacity: 0
        });
        this.tl = new TimelineMax({
          onComplete: function onComplete() {
            if (_this3.destroying) return;

            _this3.contentColsSplit.revert();

            _this3.underline = _this3.$('underline');
            _this3.highlights = _this3.$('highlight');

            for (var _i3 = 0, _Array$from = Array.from(_this3.highlights); _i3 < _Array$from.length; _i3++) {
              var highlight = _Array$from[_i3];
              highlight.addEventListener('mouseenter', _this3.highlightMouseEnter);
              highlight.addEventListener('mouseleave', _this3.highlightMouseLeave);
            }

            var i = 0;

            var _loop = function _loop() {
              var item = _arr[_i4];
              setTimeout(function () {
                item.classList.add('is-show');
              }, 100 * i);
              i++;
            };

            for (var _i4 = 0, _arr = [_this3.underline].concat(_toConsumableArray$1(Array.from(_this3.highlights))); _i4 < _arr.length; _i4++) {
              _loop();
            }

            i = 0;

            var _loop2 = function _loop2() {
              var item = _Array$from2[_i5];
              setTimeout(function () {
                item.classList.add('-highlight');
              }, 2000 * i);
              i++;
            };

            for (var _i5 = 0, _Array$from2 = Array.from(_this3.highlights); _i5 < _Array$from2.length; _i5++) {
              _loop2();
            } // debugger;


            html.classList.remove('has-intro-active');

            _this3.el.classList.add('-show-final-text');

            for (var _i6 = 0, _Array$from3 = Array.from(_this3.textBasis); _i6 < _Array$from3.length; _i6++) {
              var textBasis = _Array$from3[_i6];
              textBasis.parentNode.removeChild(textBasis);
            }

            _this3["final"]();
          }
        });
        this.tl.addLabel('start', 0); // Hide the sentence

        this.tl.to(this.lines[0], SPEED * 0.5, {
          y: '-200%',
          opacity: 0,
          force3D: true,
          ease: Power2.easeIn
        }, 'start');
        this.tl.to(this.lines[1], SPEED * 0.5, {
          y: '-100%',
          opacity: 0,
          force3D: true,
          ease: Power2.easeIn
        }, 'start');
        if (isMobile$1) this.tl.to(this.initLines[2], SPEED * 0.5, {
          y: '-50%',
          opacity: 0,
          force3D: true,
          ease: Power2.easeIn
        }, 'start'); // Hide tutorial

        this.tl.to(this.tutorial, SPEED, {
          opacity: 0
        }, 'start'); // On Desktop, move `Born`, `&` and `Bred` on X axis to match with their destination

        if (!isMobile$1) {
          for (var _i7 = 0, _animatedLineBlocks3 = animatedLineBlocks; _i7 < _animatedLineBlocks3.length; _i7++) {
            var block = _animatedLineBlocks3[_i7];
            this.tl.to(this.animatedLine[block].el, SPEED, {
              x: this.animatedLine[block].offset.x,
              force3D: true,
              ease: Power2.easeInOut
            }, 'start');
          }

          this.tl.addLabel('step1', SPEED * 0.5);
        } else {
          this.tl.addLabel('step1', SPEED * 0.25);
        } // On Desktop, scale up the words `Born`, `&` and `Bred` to match with their destination


        var i;

        if (!isMobile$1) {
          i = 0;

          for (var _i8 = 0, _animatedLineBlocks4 = animatedLineBlocks; _i8 < _animatedLineBlocks4.length; _i8++) {
            var _block = _animatedLineBlocks4[_i8];
            this.tl.to(this.animatedLine[_block].el, SPEED, {
              scale: this.animatedLine[_block].scaleFactor,
              force3D: true,
              ease: Power2.easeInOut
            }, 'step1+=' + i * (SPEED / 10));
            i++;
          }

          this.tl.addLabel('step2', 'step1+=' + SPEED * 0.5);
        } else {
          this.tl.addLabel('step2', 'step1+=' + SPEED * 0.25);
        } // On Desktop, move `Born`, `&` and `Bred` on Y axis to match with their destination


        if (!isMobile$1) {
          i = 0;

          for (var _i9 = 0, _animatedLineBlocks5 = animatedLineBlocks; _i9 < _animatedLineBlocks5.length; _i9++) {
            var _block2 = _animatedLineBlocks5[_i9];
            this.tl.to(this.animatedLine[_block2].el, SPEED, {
              y: this.animatedLine[_block2].offset.y,
              force3D: true,
              ease: Power2.easeInOut
            }, 'step2+=' + i * (SPEED / 10));
            i++;
          }
        } // Hide the columns


        i = 0;

        for (var _i10 = 0, _Array$from4 = Array.from(this.overlayBgCols); _i10 < _Array$from4.length; _i10++) {
          var col = _Array$from4[_i10];
          this.tl.to(col, SPEED, {
            y: '-100%',
            force3D: true,
            ease: Power2.easeInOut
          }, 'step2+=' + i * (SPEED / 15));
          i++;
        } // Show new content line by line


        this.tl.staggerFromTo(this.contentColsSplit.lines, SPEED * 0.75, {
          y: '200%',
          opacity: 0
        }, {
          y: '0%',
          opacity: 1,
          ease: Power2.easeOut
        }, SPEED * 0.1, 'step2+=' + SPEED * 0.3); // hide white text that was on the very top

        this.tl.to(this.overlayText, SPEED * 0.5, {
          opacity: 0
        }, 'step2+=' + SPEED / 2);
        this.tl.addCallback(function () {
          html.classList.remove('has-intro-dark');

          if (isMobile$1) {
            html.classList.remove('has-intro-light-logo');
          }
        }, 'step2+=' + SPEED * 0.8);
        this.tl.play();
      }
    }, {
      key: "final",
      value: function final() {
        var _this4 = this;

        if (this.destroying) return;

        if (isMobile$1) {
          this.enableScroll();
          return;
        }

        if (!this.finalOnce) {
          this.scrollTl = {
            master: null,
            secondary: null
          };
        } else {
          this.scrollTl.master.kill();
          this.scrollTl.secondary.kill();
          TweenMax.set([this.contentCols, this.contentButton, this.videoWrapper, this.videoText], {
            clearProps: 'all'
          });
          TweenMax.set(this.video, {
            clearProps: 'transform'
          });
        }

        this.scrollTl.secondary = new TimelineMax({});
        this.scrollTl.secondary.to([this.contentCols], 1, {
          x: '-200%',
          ease: Linear.easeNone
        }, 0);
        this.scrollTl.secondary.to([this.contentButton], 1, {
          x: '-100%',
          ease: Linear.easeNone
        }, 0);
        this.scrollTl.secondary.pause();
        var scaleObject = {
          value: 0.2
        };
        this.scrollTl.master = new TimelineMax({
          onUpdate: function onUpdate() {
            TweenMax.set(_this4.circle, {
              scale: scaleObject.value
            });
            TweenMax.set(_this4.circleOuter, {
              scale: 1 / scaleObject.value
            });
          }
        });
        this.scrollTl.master.to(this.videoWrapper, 1, {
          x: -this.viewport.width / 2,
          ease: Linear.easeNone
        }, 0);
        this.scrollTl.master.to(this.videoText, 1, {
          x: this.viewport.width / 2,
          ease: Linear.easeNone
        }, 0);
        this.scrollTl.master.to(this.video, 1, {
          x: this.viewport.width / 4,
          scale: 1.5,
          ease: Linear.easeNone
        }, 0);
        this.scrollTl.master.set(this.circle, {
          opacity: 1
        }, 0);
        this.scrollTl.master.set(this.circleWrapper, {
          y: this.viewport.height * 0.1
        }, 0);
        this.scrollTl.master.set(this.circleInner, {
          y: -this.viewport.height * 0.1
        }, 0);
        this.scrollTl.master.fromTo(scaleObject, 1, {
          value: 0.2
        }, {
          value: 1.0,
          ease: Linear.easeNone
        }, 0);
        this.scrollTl.master.fromTo(this.circleWrapper, 1, {
          x: this.viewport.width * 1.5
        }, {
          x: this.viewport.width * 0.66,
          force3D: true,
          ease: Linear.easeNone
        }, 0);
        this.scrollTl.master.fromTo(this.circleInner, 1, {
          x: -this.viewport.width * 1.5
        }, {
          x: -this.viewport.width * 0.66,
          ease: Linear.easeNone
        }, 0);
        this.scrollTl.master.pause();

        if (!this.scrollDelta) {
          this.scrollDelta = {
            x: 0,
            y: 0
          };
        } else if (!this.scrollActive) {
          this.scrollDelta.y = this.scrollSize;
        }

        if (!this.scrollValue) {
          this.scrollValue = {
            x: 0,
            y: 0
          };
        } else if (!this.scrollActive) {
          this.scrollValue.y = this.scrollSize;
        }

        if (!this.finalOnce) {
          this.scroll = new virtualscroll({
            mouseMultiplier: navigator.platform.indexOf('Win') > -1 ? 1 : 0.4,
            touchMultiplier: 4,
            firefoxMultiplier: 30
          });

          this.scrollBind = function (e) {
            requestAnimationFrame(function () {
              if (_this4.scrollActive) {
                _this4.scrollDelta.y -= e.deltaY;
                if (_this4.scrollDelta.y < 0) _this4.scrollDelta.y = 0;else if (_this4.scrollDelta.y >= _this4.scrollSize) {
                  _this4.scrollDelta.y = _this4.scrollSize;

                  _this4.disableScroll(100);
                }
              }
            });
          };

          this.scroll.on(this.scrollBind);
          this.update();
          this.enableScroll();
        }

        this.finalOnce = true;

        this.finalResizeBind = function () {
          window.removeEventListener('resize', _this4.finalResizeBind);

          _this4["final"]();
        };

        window.addEventListener('resize', this.finalResizeBind);
      }
    }, {
      key: "enableScroll",
      value: function enableScroll() {
        var _this5 = this;

        var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        clearTimeout(this.disableScrollTimeout);
        window.app.preventScroll = true;
        window.app.introScrollRequested = true;
        this.enableScrollTimeout = setTimeout(function () {
          _this5.scrollActive = true;
        }, delay);
      }
    }, {
      key: "disableScroll",
      value: function disableScroll() {
        var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        clearTimeout(this.enableScrollTimeout);
        this.scrollActive = false;
        this.disableScrollTimeout = setTimeout(function () {
          window.app.preventScroll = false;
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              window.app.introScrollRequested = false;
            });
          });
        }, delay);
      }
    }, {
      key: "manageSwipe",
      value: function manageSwipe() {
        var _this6 = this;

        // Tween piloting swipe icon
        this.swipeTl = new TimelineMax({
          onComplete: function onComplete() {
            _this6["continue"]();
          }
        });
        this.swipeTl.to(this.swipeIcon, 1, {
          opacity: 0,
          y: '-300%',
          ease: Linear.easeNone
        });
        this.swipeTl.pause();
        this.swipeTl.progress(0); // Inits hammer manager

        this.panManager = new Hammer.Manager(this.el);
        this.panManager.add(new Hammer.Pan({
          direction: Hammer.DIRECTION_VERTICAL,
          threshold: 0
        })); // Local variables used inside panManager event listeners

        var resetTw;
        var progressOnGrabStart; // PAN START

        this.onPanStart = function (e) {
          // Store starting position
          progressOnGrabStart = _this6.swipeTl.progress();
        };

        this.panManager.on('panstart', this.onPanStart); // PAN MOVE

        this.onPanMove = function (e) {
          // Update swipeTl tween to reflect on view
          var delta = e.deltaY / 200;
          var newProgress = progressOnGrabStart - delta;
          newProgress = Math.min(1, Math.max(0, newProgress));

          _this6.swipeTl.progress(newProgress);
        };

        this.panManager.on('panstart panmove', this.onPanMove); // PAN END

        this.onPanEnd = function (e) {
          // Interaction ended, decide wether it's considered as a swipe or not
          if (_this6.swipeTl.progress() > 0.4 || e.velocityY < -.5) {
            // If so, kill any reset tween and quickly tween to the end of the animation which will triggering the `continue()` method
            if (resetTw && resetTw.kill) resetTw.kill();
            var object = {
              value: _this6.swipeTl.progress()
            };
            TweenMax.to(object, .25, {
              value: 1,
              ease: Power2.easeOut,
              onUpdate: function onUpdate() {
                _this6.swipeTl.progress(object.value);
              }
            }); // Also we stop to listen for any pan event

            _this6.killSwipe();
          } else {
            // Not enough of a swipe, create a tween to reset to progress 0
            if (resetTw && resetTw.kill) resetTw.kill();
            var _object = {
              value: _this6.swipeTl.progress()
            };
            resetTw = TweenMax.to(_object, .5, {
              value: 0,
              ease: Power2.easeOut,
              onUpdate: function onUpdate() {
                _this6.swipeTl.progress(_object.value);
              }
            });
          }
        };

        this.panManager.on('panend', this.onPanEnd);
      }
    }, {
      key: "killSwipe",
      value: function killSwipe() {
        this.panManager.off('panstart', this.onPanStart);
        this.panManager.off('panstart panmove', this.onPanMove);
        this.panManager.off('panend', this.onPanEnd);
        this.panManager.destroy();
        this.panManager = null;
      }
    }, {
      key: "update",
      value: function update() {
        var direction;

        if (this.scrollDelta.y >= this.scrollValue.y) {
          direction = 'down';
        } else if (this.scrollDelta.y < this.scrollValue.y) {
          direction = 'up';
        }

        this.scrollValue.y = lerp(this.scrollValue.y, this.scrollDelta.y, 0.1);
        var masterProgress = this.scrollValue.y / this.scrollSize;

        if (!window.isloading) {
          if (masterProgress < 0.8) html.classList.add('has-intro-light-logo');else html.classList.remove('has-intro-light-logo');
        }

        this.scrollTl.master.progress(masterProgress);
        var secondaryProgress = this.scrollTl.secondary.progress();
        secondaryProgress = lerp(secondaryProgress, masterProgress, direction == 'down' ? 0.2 : 0.1);
        this.scrollTl.secondary.progress(secondaryProgress);
        this.raf = requestAnimationFrame(this.update.bind(this));
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.destroying = true;
        this.disableScroll();
        if (this.tl && this.tl.kill) this.tl.kill();
        if (this.scrollTl && this.scrollTl.master && this.scrollTl.master.kill) this.scrollTl.master.kill();
        if (this.scrollTl && this.scrollTl.secondary && this.scrollTl.secondary.kill) this.scrollTl.secondary.kill();

        if (this.highlights) {
          for (var _i11 = 0, _Array$from5 = Array.from(this.highlights); _i11 < _Array$from5.length; _i11++) {
            var highlight = _Array$from5[_i11];
            highlight.removeEventListener('mouseenter', this.highlightMouseEnter);
            highlight.removeEventListener('mouseleave', this.highlightMouseLeave);
          }
        }

        if (this.panManager) {
          this.killSwipe();
        }

        if (this.scroll) {
          window.app.preventScroll = false;
          this.scroll.off(this.scrollBind);
          this.scroll.destroy();
          this.scroll = null;
        }

        this.video.removeEventListener('load', this.videoLoadBind);
        window.cancelAnimationFrame(this.raf);
        window.removeEventListener('resize', this.onResizeBind);
        window.removeEventListener('resize', this.finalResizeBind);
        document.removeEventListener('wheel', this.onWheelBind);
        window.app.hasIntro = false;
      }
    }]);

    return _default;
  }(_default);

  /**
   * Shuffles array in place. ES6 version
   * @param {Array} a items An array containing the items.
   */

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var _ref = [a[j], a[i]];
      a[i] = _ref[0];
      a[j] = _ref[1];
    }

    return a;
  }

  var _default$e =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.inner = _this.$('inner');
      _this.sentences = _this.data('sentences').split(',');
      _this.sentence = _this.$('sentence');
      _this.video = _this.$('video');
      return _this;
    }

    _createClass$1(_default, [{
      key: "show",
      value: function show(e) {
        this.el.classList.add('is-active');
        this.removeReference();
        this.setReference(e.target); // SIZE VIDEO

        var viewportW = window.innerWidth;
        var viewportH = window.innerHeight;
        var screenRatio = viewportW / viewportH;
        var videoRatio = this.video.videoWidth / this.video.videoHeight;
        var top, left, height, width;

        if (screenRatio < videoRatio) {
          top = '0px';
          height = '100%';
          width = 'auto';
          var realW = viewportH * videoRatio;
          left = -(realW - viewportW) / 2 + 'px';
        } else {
          left = '0px';
          height = 'auto';
          width = '100%';
          var realH = viewportW * (1 / videoRatio);
          top = -(realH - viewportH) / 2 + 'px';
        }

        TweenMax.set(this.video, {
          top: top,
          left: left,
          width: width,
          height: height
        });
        this.video.play();

        if (!this.active) {
          this.active = true;
          this.update();
        }

        clearTimeout(this.hideTimeout);
        this.loopSentences();
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this2 = this;

        this.el.classList.remove('is-active');
        this.stopLoopSentences();
        this.hideTimeout = setTimeout(function () {
          _this2.removeReference();

          cancelAnimationFrame(_this2.raf);
          _this2.active = false;

          _this2.video.pause();
        }, 500);
      }
    }, {
      key: "loopSentences",
      value: function loopSentences() {
        var _this3 = this;

        this.sentences = shuffle(this.sentences);
        var i = 0;
        this.loopInterval = setInterval(function () {
          _this3.sentence.innerText = _this3.sentences[i % _this3.sentences.length];
          i++;
        }, 1000);
      }
    }, {
      key: "stopLoopSentences",
      value: function stopLoopSentences() {
        clearInterval(this.loopInterval);
        this.sentence.innerText = '';
      }
    }, {
      key: "setReference",
      value: function setReference(element) {
        this.reference = element;
        this.clone = this.reference.cloneNode(true);
        this.style = window.getComputedStyle(this.reference, null);
        this.clone.classList.remove('-highlight');
        this.clone.classList.remove('-show-inview');
        this.clone.classList.remove('is-show');
        TweenMax.set(this.clone, {
          position: 'absolute',
          top: 0,
          left: 0,
          fontFamily: this.style.getPropertyValue('font-family'),
          fontSize: this.style.getPropertyValue('font-size'),
          lineHeight: this.style.getPropertyValue('line-height'),
          fontWeight: this.style.getPropertyValue('font-weight'),
          color: '#fff'
        });
        this.inner.appendChild(this.clone);
      }
    }, {
      key: "removeReference",
      value: function removeReference() {
        this.reference = null;
        if (this.clone && this.clone.parentNode) this.clone.parentNode.removeChild(this.clone);
        this.clone = null;
      }
    }, {
      key: "update",
      value: function update() {
        this.referenceBCR = this.reference.getBoundingClientRect();
        TweenMax.set(this.clone, {
          x: this.referenceBCR.left,
          y: this.referenceBCR.top
        });
        if (this.active) this.raf = requestAnimationFrame(this.update.bind(this));
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.stopLoopSentences();
        this.removeReference();
        cancelAnimationFrame(this.raf);
      }
    }]);

    return _default;
  }(_default);

  var _default$f =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.events = {
        mouseenter: 'launch'
      };
      _this.$emojied = _this.$('emojied');
      return _this;
    }

    _createClass$1(_default, [{
      key: "launch",
      value: function launch() {
        var i = 0;

        var _loop = function _loop() {
          var el = _Array$from[_i];
          setTimeout(function () {
            el.classList.add('is-active');
          }, i * 100);
          i++;
        };

        for (var _i = 0, _Array$from = Array.from(this.$emojied); _i < _Array$from.length; _i++) {
          _loop();
        }
      }
    }]);

    return _default;
  }(_default);

  var _default$g =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      if (isMobile$1) return _possibleConstructorReturn(_this);

      _this.onVisibilityChangeBind = function (e) {
        if (e.target != _this.el) return;
        requestAnimationFrame(function () {
          if (!_this.active && e.way == 'enter') {
            _this.compute();

            _this.initTl();

            _this.active = true;

            _this.scrollUpdate();
          } else if (_this.active && e.way == 'leave') {
            _this.active = false;
          }
        });
      };

      $document.on('visibility.AnimatedSection', _this.onVisibilityChangeBind);
      _this.checkResizeBind = _this.checkResize.bind(_assertThisInitialized(_this));
      window.addEventListener('resize', _this.checkResizeBind);
      _this.scrollUpdateBind = _this.scrollUpdate.bind(_assertThisInitialized(_this));
      $document.on(EVENT$1.SCROLLING, _this.scrollUpdateBind);
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        if (isMobile$1) return;
        this.compute();
      }
    }, {
      key: "checkResize",
      value: function checkResize() {
        var _this2 = this;

        if (!this.resizeTick) {
          requestAnimationFrame(function () {
            _this2.compute();

            _this2.initTl();

            _this2.resizeTick = false;
          });
          this.resizeTick = true;
        }
      }
    }, {
      key: "initTl",
      value: function initTl() {
        var progress = 0;

        if (this.scrollTl) {
          progress = this.scrollTl.progress();
          this.scrollTl.kill();
        }

        var object = {
          progress: 0
        };
        this.scrollTl = new TimelineMax({
          onUpdate: function onUpdate() {
            console.log(object.progress);
          }
        });
        this.scrollTl.fromTo(object, 1, {
          progress: 0
        }, {
          progress: 1
        });
        this.scrollTl.pause();
        this.scrollTl.progress(0);
      }
    }, {
      key: "compute",
      value: function compute() {
        this.hasSmoothScroll = false;
        if (document.documentElement.classList.contains('has-smooth-scroll')) this.hasSmoothScroll = true; // SCROLL RELATED

        this.BCR = this.el.getBoundingClientRect();
        var compensation = this.hasSmoothScroll ? window.app.scroll.y : document.scrollingElement ? document.scrollingElement.scrollTop : document.documentElement.scrollTop;
        this.offsetTop = this.BCR.top + compensation;
        this.scrollStart = this.offsetTop - window.innerHeight;
        this.scrollEnd = this.scrollStart + window.innerHeight + this.BCR.height;
      }
    }, {
      key: "scrollUpdate",
      value: function scrollUpdate() {
        if (!this.active) return;
        var progress = (window.app.scroll.y - this.scrollStart) / (this.scrollEnd - this.scrollStart);
        progress = Math.max(0, Math.min(1, Math.round(progress * 1000) / 1000));
        this.scrollTl.progress(progress);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        $document.off(EVENT$1.SCROLLING, this.scrollUpdateBind);
        $document.off('visibility.AnimatedSection', this.onVisibilityChangeBind);
        window.removeEventListener('resize', this.checkResizeBind);
      }
    }]);

    return _default;
  }(_default);

  var _default$h =
  /*#__PURE__*/
  function (_AnimatedSection) {
    _inherits(_default, _AnimatedSection);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.$block = _this.$('block');
      return _this;
    }

    _createClass$1(_default, [{
      key: "initTl",
      value: function initTl() {
        this.scrollTl = new TimelineMax({});

        for (var i = 0; i < this.$block.length; i++) {
          this.scrollTl.fromTo(this.$block[i], 1, {
            y: this.BCR.height * 0.25 * i
          }, {
            y: 0,
            ease: Power1.easeOut
          }, 0);
        }

        this.scrollTl.addCallback(function () {}, 1);
        this.scrollTl.pause();
      }
    }]);

    return _default;
  }(_default$g);

  var _default$i =
  /*#__PURE__*/
  function (_AnimatedSection) {
    _inherits(_default, _AnimatedSection);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.secondaryCol = _this.$('secondaryCol');
      _this.$aside = _this.$('aside');
      return _this;
    }

    _createClass$1(_default, [{
      key: "initTl",
      value: function initTl() {
        this.scrollTl = new TimelineMax({});
        this.scrollTl.fromTo(this.secondaryCol, 1, {
          y: 0
        }, {
          y: this.secondaryColDiff,
          ease: Linear.easeNone
        }, 0);

        for (var _i = 0, _Array$from = Array.from(this.$aside); _i < _Array$from.length; _i++) {
          var aside = _Array$from[_i];
          var parent = this.parent('infos', aside);
          var parentHeight = parent.offsetHeight;
          var diff = parentHeight - aside.offsetWidth;
          this.scrollTl.fromTo(aside, 1, {
            y: diff
          }, {
            y: 0,
            ease: Linear.easeNone
          }, 0);
        }

        this.scrollTl.pause();
      }
    }, {
      key: "compute",
      value: function compute() {
        _get(_getPrototypeOf(_default.prototype), "compute", this).call(this);

        TweenMax.set([this.secondaryCol, this.$aside], {
          clearProps: 'all'
        }); // Make sure to reset initial state before computing data

        this.scrollEnd = this.scrollStart + this.BCR.height;
        this.secondaryColBCR = this.secondaryCol.getBoundingClientRect();
        this.secondaryColDiff = this.BCR.height - this.secondaryColBCR.height - (this.secondaryColBCR.top - this.BCR.top);
      }
    }]);

    return _default;
  }(_default$g);

  var _default$j =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.delay = 2000;
      _this.pairs = shuffle(JSON.parse(_this.data('pairs')));
      _this.first = _this.$('first');
      _this.second = _this.$('second');
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.cpt = 0;
        this.interval = setInterval(function () {
          _this2.first.innerText = _this2.pairs[_this2.cpt % _this2.pairs.length].first;
          _this2.second.innerText = _this2.pairs[_this2.cpt % _this2.pairs.length].second;
          _this2.cpt++;
        }, this.delay);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        clearInterval(this.interval);
      }
    }]);

    return _default;
  }(_default);

  var _default$k =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.limit = _this.$('limit');
      _this.inner = _this.$('inner');

      _this.onVisibilityChangeBind = function (e) {
        if (e.target != _this.el) return;
        requestAnimationFrame(function () {
          if (!_this.active && e.way == 'enter') {
            _this.compute();

            _this.active = true;

            _this.scrollUpdate();
          } else if (_this.active && e.way == 'leave') {
            cancelAnimationFrame(_this.raf);
            _this.active = false;
          }
        });
      };

      $document.on('visibility.Footer', _this.onVisibilityChangeBind);
      _this.checkResizeBind = _this.checkResize.bind(_assertThisInitialized(_this));
      window.addEventListener('resize', _this.checkResizeBind);
      _this.scrollUpdateBind = _this.scrollUpdate.bind(_assertThisInitialized(_this));
      $document.on(EVENT$1.SCROLLING, _this.scrollUpdateBind);
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        this.compute();
      }
    }, {
      key: "checkResize",
      value: function checkResize() {
        var _this2 = this;

        if (!this.resizeTick) {
          requestAnimationFrame(function () {
            _this2.compute();

            _this2.resizeTick = false;
          });
          this.resizeTick = true;
        }
      }
    }, {
      key: "compute",
      value: function compute() {
        this.hasSmoothScroll = false;
        if (document.documentElement.classList.contains('has-smooth-scroll')) this.hasSmoothScroll = true; // Make sure to reset initial state before computing data

        TweenMax.set(this.inner, {
          y: 0
        }); // SCROLL RELATED

        this.BCR = this.el.getBoundingClientRect();
        this.limitBCR = this.limit.getBoundingClientRect();
        var compensation = this.hasSmoothScroll ? window.app.scroll.y : document.scrollingElement ? document.scrollingElement.scrollTop : document.documentElement.scrollTop;
        this.offsetTop = this.BCR.top + compensation;
        this.offsetLimit = this.limitBCR.top + compensation;
        this.offsetDiff = this.offsetLimit - this.offsetTop;
        this.scrollStart = this.offsetTop - window.innerHeight;
        this.scrollEnd = this.offsetLimit - window.innerHeight;
      }
    }, {
      key: "scrollUpdate",
      value: function scrollUpdate() {
        if (!this.active) return;
        if (this.offsetTop - window.app.scroll.y < 100) document.documentElement.classList.add('is-over-footer');else document.documentElement.classList.remove('is-over-footer');

        if (window.app.scroll.y > this.scrollStart && window.app.scroll.y < this.scrollEnd) {
          TweenMax.set(this.inner, {
            y: -this.offsetDiff + (window.app.scroll.y - this.scrollStart)
          });
        } else {
          TweenMax.set(this.inner, {
            y: 0
          });
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        window.removeEventListener('resize', this.checkResizeBind);
        $document.off(EVENT$1.SCROLLING, this.scrollUpdateBind);
      }
    }]);

    return _default;
  }(_default);

  var RailMove =
  /*#__PURE__*/
  function () {
    function RailMove(el, speed, isFixed, paused) {
      _classCallCheck$1(this, RailMove);

      this.el = el;
      this.isFixed = isFixed;
      this.containerWidth = 0;
      this.requestAnimation = null;
      this.scrollPosition = -1;
      this.translation = 0;
      this.grabbed = false;
      this.preventClick = false;
      this.paused = paused;
      this.originalVelocity = -speed;
      this.velocity = this.originalVelocity;
      this.lastDelta = null;
      this.initializeElements();
      this.initializeEvents();
    }

    _createClass$1(RailMove, [{
      key: "initializeElements",
      value: function initializeElements() {
        this.$railMove = this.el.querySelectorAll('.js-rail-group-container');
        this.$railMoveChildren = this.el.querySelectorAll('.js-rail-item');
        this.getBCR();
      }
    }, {
      key: "initializeEvents",
      value: function initializeEvents() {
        this.update();
        this.checkScrollBind = this.updateScroll.bind(this);
        $document.on(EVENT$1.SCROLLING, this.checkScrollBind);
      }
    }, {
      key: "setContainerWidth",
      value: function setContainerWidth(width) {
        this.containerWidth = width;
      }
    }, {
      key: "getBCR",
      value: function getBCR() {
        this.railMoveBCR = this.$railMove[0].getBoundingClientRect();
      }
    }, {
      key: "updateScroll",
      value: function updateScroll() {
        if (!document.documentElement.classList.contains('is-mobile') && !this.isFixed) {
          var scrollY = Math.round(window.app.scroll.y) ? Math.round(window.app.scroll.y) : 0;
          var newScrollPosition = scrollY - this.scrollPosition;
          this.scrollPosition = scrollY;
          if (newScrollPosition != 0) this.velocity = this.originalVelocity * newScrollPosition;
        }
      }
    }, {
      key: "pause",
      value: function pause() {
        this.paused = true;
      }
    }, {
      key: "resume",
      value: function resume() {
        var _this = this;

        this.paused = false;
        this.requestAnimation = requestAnimationFrame(function () {
          return _this.update();
        });
      }
    }, {
      key: "update",
      value: function update() {
        var _this2 = this;

        if (!this.grabbed) {
          if (this.translation > this.railMoveBCR.width / 2 || this.translation < -this.railMoveBCR.width / 2) {
            this.translation = 0;
          } else {
            this.translation = this.translation + this.velocity;
          }
        }

        var translation;

        if (this.translation > 0) {
          translation = -this.containerWidth + this.translation % this.containerWidth;
        } else {
          translation = this.translation % this.containerWidth;
        }

        TweenMax.set(this.$railMoveChildren, {
          x: Math.round(translation),
          force3D: true
        });
        if (!this.paused) this.requestAnimation = requestAnimationFrame(function () {
          return _this2.update();
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        $document.off(EVENT$1.SCROLLING, this.checkScrollBind);
        cancelAnimationFrame(this.requestAnimation);
        TweenMax.set(this.$railMove, {
          x: 0
        });
        this.translation = 0;
      }
    }]);

    return RailMove;
  }();

  var _default$l =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.speed = _this.data('speed') || 1;
      _this.isFixed = typeof _this.data('fixed') === 'string';
      _this.shuffle = typeof _this.data('shuffle') === 'string';
      _this.paused = typeof _this.data('paused') === 'string';
      _this.initialHTML = _this.el.outerHTML;
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        this.setClasses();
        this.createTrack();
        this.fillScreen();
        this.groupTracks();
        this.duplicateGroup();
        this.wrapGroups();
        this.railMove = new RailMove(this.el, this.speed, this.isFixed, this.paused);
        this.railMove.setContainerWidth(this.trackGroupBCR.width);
      }
    }, {
      key: "setClasses",
      value: function setClasses() {
        this.el.classList.add('c-rail_wrapper');
        this.children = Array.from(this.el.children);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var child = _step.value;
            child.classList.add('c-rail_item');
            child.classList.add('js-rail-item');
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (this.shuffle != undefined) {
          var shuffled = shuffle(this.children);
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = shuffled[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var el = _step2.value;
              this.el.appendChild(el);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }
    }, {
      key: "createTrack",
      value: function createTrack() {
        this.track = document.createElement('div');
        this.track.classList.add('c-rail_track');
        this.el.appendChild(this.track);
        this.tracks = [];
        this.tracks.push(this.track);
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var child = _step3.value;
            this.track.appendChild(child);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    }, {
      key: "fillScreen",
      value: function fillScreen() {
        var ratio = window.innerWidth / this.track.getBoundingClientRect().width;

        if (ratio === Infinity) {
          throw new Error('Ratio is Infinity');
        }

        for (var i = 0; i < ratio; i++) {
          var track = this.track.cloneNode(true);
          this.tracks.push(track);
          this.el.appendChild(track);
        }
      }
    }, {
      key: "groupTracks",
      value: function groupTracks() {
        this.trackGroup = document.createElement('div');
        this.trackGroup.classList.add('c-rail_track-group');
        this.el.appendChild(this.trackGroup);
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.tracks[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var track = _step4.value;
            this.trackGroup.appendChild(track);
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        this.trackGroupBCR = this.trackGroup.getBoundingClientRect();
      }
    }, {
      key: "duplicateGroup",
      value: function duplicateGroup() {
        this.trackGroupClone = this.trackGroup.cloneNode(true);
        this.el.appendChild(this.trackGroupClone);
      }
    }, {
      key: "wrapGroups",
      value: function wrapGroups() {
        this.groupsWrap = document.createElement('div');
        this.groupsWrap.classList.add('js-rail-group-container');
        this.groupsWrap.classList.add('c-rail_group-container');
        this.el.append(this.groupsWrap);

        for (var _i = 0, _arr = [this.trackGroup, this.trackGroupClone]; _i < _arr.length; _i++) {
          var group = _arr[_i];
          this.groupsWrap.append(group);
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        _get(_getPrototypeOf(_default.prototype), "destroy", this).call(this);
      }
    }]);

    return _default;
  }(_default);

  var _default$m =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.active = false;
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {}
    }, {
      key: "toggle",
      value: function toggle() {
        if (!this.active) this.open();else this.close();
      }
    }, {
      key: "open",
      value: function open() {
        this.active = true;
        this.update();
      }
    }, {
      key: "close",
      value: function close() {
        this.active = false;
        this.update();
      }
    }, {
      key: "update",
      value: function update() {
        if (this.active) html.classList.add('has-menu-opened');else html.classList.remove('has-menu-opened');
        this.call('setActive', this.active, 'Navdot', 'nav');
        window.app.menuOpen = this.active;
      }
    }]);

    return _default;
  }(_default);

  var _default$n =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.active = false;
      _this.target = {
        x: 0,
        y: 0
      };
      _this.position = {
        x: 0,
        y: 0
      };
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {}
    }, {
      key: "setActive",
      value: function setActive() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (value == true) {
          if (!this.active) {
            this.active = true;
            this.update();
          }
        } else {
          cancelAnimationFrame(this.raf);
          this.active = false;
        }
      }
    }, {
      key: "setTarget",
      value: function setTarget(args) {
        this.target = args.value;
        if (args.force) this.position = this.target;
      }
    }, {
      key: "update",
      value: function update() {
        this.position.x = lerp(this.position.x, this.target.x, 0.1);
        this.position.y = lerp(this.position.y, this.target.y, 0.1);
        TweenMax.set(this.el, {
          x: this.position.x,
          y: this.position.y,
          force3D: true
        });
        this.raf = requestAnimationFrame(this.update.bind(this));
      }
    }]);

    return _default;
  }(_default);

  var _default$o =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.$links = _this.$('link');
      _this.dotId = _this.data('dot');
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.parentBCR = this.el.parentNode.getBoundingClientRect();
        this.activeLink = Array.from(this.$links).find(function (el) {
          return el.classList.contains('-active');
        });
        this.updateDot(this.activeLink, true);

        for (var _i = 0, _Array$from = Array.from(this.$links); _i < _Array$from.length; _i++) {
          var link = _Array$from[_i];
          this.linkFocusBind = this.onLinkFocus.bind(this);
          link.addEventListener('mouseenter', this.linkFocusBind);
          link.addEventListener('focus', this.linkFocusBind);
          this.linkBlurBind = this.onLinkBlur.bind(this);
          link.addEventListener('mouseleave', this.linkBlurBind);
          link.addEventListener('blur', this.linkBlurBind);
        }

        this.resizeBind = function () {
          if (!_this2.resizeTick) {
            requestAnimationFrame(function () {
              _this2.parentBCR = _this2.el.parentNode.getBoundingClientRect();

              _this2.updateDot(_this2.activeLink, true);

              _this2.resizeTick = false;
            });
            _this2.resizeTick = true;
          }
        };

        window.addEventListener('resize', this.resizeBind);
      }
    }, {
      key: "onLinkFocus",
      value: function onLinkFocus(e) {
        this.updateDot(e.currentTarget);
      }
    }, {
      key: "onLinkBlur",
      value: function onLinkBlur() {
        this.updateDot(this.activeLink);
      }
    }, {
      key: "setDotById",
      value: function setDotById(id) {
        var _this3 = this;

        var links = Array.from(this.$links);
        if (this.activeLink) this.activeLink.classList.remove('-active');
        this.activeLink = links.find(function (el) {
          return _this3.data('id', el) == id;
        });
        this.activeLink.classList.add('-active');
        this.updateDot(this.activeLink, true);
      }
    }, {
      key: "updateDot",
      value: function updateDot(el) {
        var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (!el) return;
        var BCR = el.parentNode.getBoundingClientRect();
        var offset;

        if (window.innerWidth > 1200) {
          offset = (this.parentBCR.left - BCR.left) * 2;
        } else {
          offset = this.parentBCR.left - BCR.left;
        }

        if (this.dotId) this.call('setTarget', {
          value: {
            x: BCR.left + offset,
            y: BCR.top + BCR.height / 2
          },
          force: force
        }, 'Navdot', this.dotId);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        window.removeEventListener('resize', this.resizeBind);
      }
    }]);

    return _default;
  }(_default);

  var _default$p =
  /*#__PURE__*/
  function (_AnimatedSection) {
    _inherits(_default, _AnimatedSection);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.$item = _this.$('item');
      return _this;
    }

    _createClass$1(_default, [{
      key: "initTl",
      value: function initTl() {
        this.scrollTl = new TimelineMax({});

        for (var _i = 0, _Array$from = Array.from(this.$item); _i < _Array$from.length; _i++) {
          var item = _Array$from[_i];
          var from = getData(this.data('from', item));
          var to = getData(this.data('to', item));
          this.scrollTl.fromTo(item, 1, from, Object.assign(to, {
            ease: Linear.easeNone
          }), 0);
        }

        this.scrollTl.pause();
      }
    }]);

    return _default;
  }(_default$g);

  var _default$q =
  /*#__PURE__*/
  function (_AnimatedSection) {
    _inherits(_default, _AnimatedSection);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.zone = _this.$('zone');
      _this.mask = _this.$('mask');
      _this.inner = _this.$('inner');
      _this.bg = _this.$('bg');
      _this.triggerUi = getData(_this.data('triggerui'));
      return _this;
    }

    _createClass$1(_default, [{
      key: "initTl",
      value: function initTl() {
        var _this2 = this;

        var progress = 0;

        if (this.scrollTl) {
          progress = this.scrollTl.progress();
          this.scrollTl.kill();
        }

        var object = {
          scale: this.scaleFrom
        };
        var ui = 'dark';
        this.scrollTl = new TimelineMax({
          onUpdate: function onUpdate() {
            TweenMax.set(_this2.mask, {
              scale: object.scale,
              force3D: true
            });
            TweenMax.set(_this2.inner, {
              scale: 1 / object.scale,
              force3D: true
            });

            if (_this2.triggerUi) {
              if (ui == 'dark' && _this2.scrollTl.progress() >= 0.8) {
                $document.trigger({
                  type: EVENT$1.TRIGGER_UI_LIGHT,
                  options: {}
                });
                ui = 'light';
              } else if (ui == 'light' && _this2.scrollTl.progress() < 0.8) {
                $document.trigger({
                  type: EVENT$1.TRIGGER_UI_DARK,
                  options: {}
                });
                ui = 'dark';
              }
            }
          }
        });
        this.scrollTl.fromTo(object, 1, {
          scale: this.scaleFrom
        }, {
          scale: this.scaleTo,
          ease: Linear.easeNone
        }, 0);
        this.scrollTl.fromTo(this.bg, 1, {
          y: '-100%'
        }, {
          y: '0%',
          force3D: true,
          ease: Linear.easeNone
        }, 0);
        this.scrollTl.pause();
        this.scrollTl.progress(0);
      }
    }, {
      key: "compute",
      value: function compute() {
        this.viewport = {
          w: window.innerWidth,
          h: window.innerHeight
        };
        this.hasSmoothScroll = false;
        if (document.documentElement.classList.contains('has-smooth-scroll')) this.hasSmoothScroll = true;
        TweenMax.set([this.mask, this.inner], {
          clearProps: 'all'
        }); // SCROLL RELATED

        this.BCR = this.zone.getBoundingClientRect();
        var compensation = this.hasSmoothScroll ? window.app.scroll.y : document.scrollingElement ? document.scrollingElement.scrollTop : document.documentElement.scrollTop;
        this.offsetTop = this.BCR.top + compensation;
        this.scrollStart = this.offsetTop - window.innerHeight;
        this.scrollEnd = this.scrollStart + this.BCR.height;
        this.scrollDiff = this.scrollEnd - this.scrollStart;
        this.scaleFrom = window.innerWidth > window.innerHeight ? window.innerHeight / window.innerWidth : window.innerWidth / window.innerHeight;
        this.scaleTo = Math.sqrt(Math.pow(this.viewport.w, 2) + Math.pow(this.viewport.h, 2)) / this.viewport.w;
      }
    }]);

    return _default;
  }(_default$g);

  var _default$r =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.slider = _this.$('slider');
      _this.prev = _this.$('prev');
      _this.next = _this.$('next');
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var args = {
          speed: 800,
          loop: true,
          loopedSlides: 2,
          spaceBetween: 200,
          grabCursor: true,
          slideToClickedSlide: true,
          breakpoints: {
            1200: {
              spaceBetween: 100
            },
            700: {
              spaceBetween: 40
            }
          },
          navigation: {
            nextEl: this.next,
            prevEl: this.prev
          }
        };
        this.carousel = new Swiper(this.slider, args);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.carousel.destroy();
      }
    }]);

    return _default;
  }(_default);

  var _default$s =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.events = {
        click: {
          item: 'onItemClick'
        }
      };
      _this.$items = _this.$('item');
      _this.onItemEnterBind = _this.onItemEnter.bind(_assertThisInitialized(_this));

      for (var _i = 0, _Array$from = Array.from(_this.$items); _i < _Array$from.length; _i++) {
        var item = _Array$from[_i];
        item.addEventListener('mouseenter', _this.onItemEnterBind);
      }

      _this.onLeaveBind = _this.onLeave.bind(_assertThisInitialized(_this));

      _this.el.addEventListener('mouseleave', _this.onLeaveBind);

      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {}
    }, {
      key: "onItemEnter",
      value: function onItemEnter(e) {
        this.call('showById', {
          id: this.data('id', e.currentTarget),
          odd: Array.from(e.currentTarget.parentNode.children).indexOf(e.currentTarget) % 2 == 1
        }, 'Teammodal');
      }
    }, {
      key: "onLeave",
      value: function onLeave(e) {
        this.call('showById', {
          id: false
        }, 'Teammodal');
      }
    }, {
      key: "onItemClick",
      value: function onItemClick(e) {
        this.call('open', null, 'Teammodal');
      }
    }, {
      key: "destroy",
      value: function destroy() {
        for (var _i2 = 0, _Array$from2 = Array.from(this.$items); _i2 < _Array$from2.length; _i2++) {
          var item = _Array$from2[_i2];
          item.removeEventListener('mouseenter', this.onItemEnterBind);
          item.removeEventListener('mouseleave', this.onItemLeaveBind);
        }
      }
    }]);

    return _default;
  }(_default);

  var _default$t =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.events = {
        click: {
          next: 'next',
          prev: 'prev',
          close: 'close'
        }
      };
      _this.$faces = _this.$('face');
      _this.$wallpapers = _this.$('wallpaper');
      _this.$contents = _this.$('content');
      _this.imageLoads = [];
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {}
    }, {
      key: "showById",
      value: function showById(options) {
        var _this2 = this;

        if (!options.id && this.isOpened) return;
        this.targetId = options.id;
        this.targetReversed = options.odd != undefined ? !options.odd : this.targetReversed;

        if (!this.changeRequested) {
          this.changeRequested = true;
          this.hidePromise = new Promise(function (resolve) {
            // OLD ONE
            // ==========================================================================
            var oldFace = Array.from(_this2.$faces).find(function (candidate) {
              return candidate.classList.contains('is-active');
            });
            var oldWallpaper = Array.from(_this2.$wallpapers).find(function (candidate) {
              return candidate.classList.contains('is-active');
            });
            var oldContent = Array.from(_this2.$contents).find(function (candidate) {
              return candidate.classList.contains('is-active');
            });
            if (oldFace) oldFace.classList.remove('is-active');
            if (oldWallpaper) oldWallpaper.classList.remove('is-active');
            if (oldContent) oldContent.classList.remove('is-active');
            setTimeout(resolve, 250);
          }).then(function () {
            if (_this2.targetReversed) _this2.el.classList.add('is-reversed');else _this2.el.classList.remove('is-reversed'); // NEW ONE
            // ==========================================================================

            var newFace = Array.from(_this2.$faces).find(function (candidate) {
              return _this2.data('id', candidate) == _this2.targetId;
            });
            var newWallpaper = Array.from(_this2.$wallpapers).find(function (candidate) {
              return _this2.data('id', candidate) == _this2.targetId;
            });
            var newContent = Array.from(_this2.$contents).find(function (candidate) {
              return _this2.data('id', candidate) == _this2.targetId;
            });

            var emoji = _this2.data('emoji', newContent);

            _this2.call('setTexture', emoji, 'Rainmoji', 'team-modal');

            if (newFace) newFace.classList.add('is-active');
            if (newWallpaper) newWallpaper.classList.add('is-active');
            if (newContent) newContent.classList.add('is-active'); // Async load

            if (newFace && newWallpaper) {
              if (!newFace.classList.contains('is-loaded')) {
                _this2.loadAsset(newFace);
              }

              if (!newWallpaper.classList.contains('is-loaded')) {
                _this2.loadAsset(newWallpaper);
              }
            }

            _this2.changeRequested = false;
          });
        }
      }
    }, {
      key: "loadAsset",
      value: function loadAsset(el) {
        var _this3 = this;

        // Toggle loading state
        this.el.classList.add('is-loading-members'); // Generate image object and push it to loading array

        var src = this.data('img', el);
        var img = new Image();
        this.imageLoads.push(img);

        var loadCallback = function loadCallback() {
          el.style.backgroundImage = "url('".concat(src, "')");
          el.classList.add('is-loaded');
          _this3.imageLoads = _this3.imageLoads.filter(function (item) {
            return item !== img;
          });

          if (!_this3.imageLoads.length) {
            _this3.el.classList.remove('is-loading-members');
          }
        }; // Try to use `decode` if available (to prevent jank), otherwise use the standard `onload`


        if (img.decode) {
          img.src = src;
          img.decode().then(loadCallback)["catch"](function (err) {
            console.error(err);
          });
        } else {
          img.onload = loadCallback;
          img.src = src;
        }
      }
    }, {
      key: "next",
      value: function next() {
        this.showById({
          id: this.getPosition().nextId,
          odd: !this.targetReversed
        });
      }
    }, {
      key: "prev",
      value: function prev() {
        this.showById({
          id: this.getPosition().prevId,
          odd: !this.targetReversed
        });
      }
    }, {
      key: "getPosition",
      value: function getPosition() {
        var currentContent = Array.from(this.$contents).find(function (candidate) {
          return candidate.classList.contains('is-active');
        });
        var currentId = this.data('id', currentContent);
        var nextContent = currentContent.nextElementSibling ? currentContent.nextElementSibling : currentContent.parentNode.children[0];
        var nextId = this.data('id', nextContent);
        var prevContent = currentContent.previousElementSibling ? currentContent.previousElementSibling : currentContent.parentNode.children[currentContent.parentNode.children.length - 1];
        var prevId = this.data('id', prevContent);
        return {
          currentId: currentId,
          nextId: nextId,
          prevId: prevId
        };
      }
    }, {
      key: "open",
      value: function open() {
        this.isOpened = true;
        this.el.classList.add('is-opened');
        this.call('setActive', true, 'Rainmoji', 'team-modal');
      }
    }, {
      key: "close",
      value: function close() {
        this.el.classList.remove('is-opened');
        this.isOpened = false;
        this.showById({
          id: false,
          odd: !this.targetReversed
        });
        this.call('setActive', false, 'Rainmoji', 'team-modal');
      }
    }]);

    return _default;
  }(_default);

  var DEFAULT_AMOUNT = 100;
  var TARGET_SPEED = 5;
  var DEFAULT_DROP_RATIO = 0.005;

  var _default$u =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.active = false;
      _this.auto = getData(_this.data('auto'));
      _this.defaultTexture = getData(_this.data('texture'));
      _this.amount = getData(_this.data('amount')) || DEFAULT_AMOUNT;
      _this.dropRatio = getData(_this.data('drop-ratio')) || DEFAULT_DROP_RATIO;
      if (!_this.defaultTexture || _this.defaultTexture && !_this.defaultTexture.length) _this.defaultTexture = '/assets/images/emojis/u1F60E.png';
      _this.textures = [];
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.BCR = this.el.getBoundingClientRect();
        this.setup();
        this.setTexture(this.defaultTexture);
        this.populate();
        this.pixi.ticker.add(function () {
          for (var i = 0; i < _this2.items.length; i++) {
            if (_this2.active && !_this2.items[i].active) {
              if (Math.random() < _this2.dropRatio) {
                _this2.items[i].texture = _this2.texture;
                _this2.items[i].active = true;
                _this2.items[i].width = 32;
                _this2.items[i].height = 32;
              }
            }

            if (_this2.items[i].active) {
              if (_this2.items[i].y > _this2.BCR.height) {
                _this2.resetItem(_this2.items[i]);
              }

              _this2.items[i].speed = lerp(_this2.items[i].speed, TARGET_SPEED, 0.02); // if(Math.round(this.items[i].speed) == TARGET_SPEED) this.items[i].tint = 0xFF0000;

              _this2.items[i].y += _this2.items[i].speed;
              _this2.items[i].rotatingSpeed = lerp(_this2.items[i].rotatingSpeed, _this2.items[i].rotatingSpeedTarget, 0.02);
              _this2.items[i].rotation += _this2.items[i].rotatingSpeed;
            }
          }
        });
        this.resizeBind = this.resize.bind(this);
        window.addEventListener('resize', this.resizeBind);

        if (this.auto && this.defaultTexture != undefined) {
          this.setActive(this.auto);
          this.setTexture(this.defaultTexture);
        }
      }
    }, {
      key: "resize",
      value: function resize() {
        this.BCR = this.el.getBoundingClientRect();
        this.pixi.resize(this.BCR.width, this.BCR.height);
      }
    }, {
      key: "setup",
      value: function setup() {
        PIXI.utils.skipHello();
        this.pixi = new PIXI.Application({
          width: this.BCR.width,
          height: this.BCR.height,
          transparent: true,
          resolution: window.devicePixelRatio || 1,
          resizeTo: this.el
        });
        this.el.appendChild(this.pixi.view);
      }
    }, {
      key: "populate",
      value: function populate() {
        this.items = [];

        for (var i = 0; i < this.amount; i++) {
          // Create the sprite
          var item = new PIXI.Sprite(this.texture);
          item.width = 32;
          item.height = 32; // Set anchor point to middle

          item.anchor.set(0.5); // Scale down

          item.scale.set(0.5);
          this.resetItem(item); // Append to array & scene

          this.items.push(item);
          this.pixi.stage.addChild(item);
        }
      }
    }, {
      key: "setTexture",
      value: function setTexture(path) {
        try {
          if (!this.textures[path]) {
            this.textures[path] = PIXI.Texture.from(path);
          }

          this.texture = this.textures[path];
        } catch (error) {
          console.error(error);
        }
      }
    }, {
      key: "setActive",
      value: function setActive(value) {
        this.active = value;
      }
    }, {
      key: "resetItem",
      value: function resetItem(item) {
        // Position randomly
        item.x = Math.random() * this.BCR.width;
        item.y = -64;
        item.rotation = Math.random() * Math.PI; // set speed

        item.speed = 0;
        item.rotatingSpeed = 0;
        item.rotatingSpeedTarget = (Math.random() - 0.5) / 10; // we'll use this bool to determine if the sprite is ready to be used

        item.active = false;
        item.tint = 0xFFFFFF;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.pixi.destroy({
          children: true
        });
        window.removeEventListener('resize', this.resizeBind);
      }
    }]);

    return _default;
  }(_default);

  var _default$v =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.events = {
        click: {
          toggle: 'toggle'
        }
      };
      return _this;
    }

    _createClass$1(_default, [{
      key: "toggle",
      value: function toggle(e) {
        var _this2 = this;

        var el = e.currentTarget;
        var parent = el.parentNode;
        var content = this.$('content', parent);

        if (parent.classList.contains('is-active')) {
          TweenMax.to(content, .5, {
            height: 0,
            ease: Power2.easeOut,
            onComplete: function onComplete() {
              content.style.display = '';

              _this2.call('update', null, 'Scroll');
            }
          });
          parent.classList.remove('is-active');
        } else {
          // this.closeAll()
          parent.classList.add('is-active');
          content.style.height = '';
          content.style.display = 'block';
          var contentBCR = content.getBoundingClientRect();
          TweenMax.fromTo(content, .5, {
            height: 0
          }, {
            height: contentBCR.height,
            ease: Power2.easeOut,
            onComplete: function onComplete() {
              // this.scrollTo(el)
              _this2.call('update', null, 'Scroll');
            }
          });
        }
      }
    }, {
      key: "scrollTo",
      value: function scrollTo(target) {
        var offset = window.innerWidth > 1000 ? -100 : -160;
        var options = {
          targetElem: target,
          targetOffset: offset
        };
        this.call('scrollTo', options, 'Scroll');
      }
    }, {
      key: "closeAll",
      value: function closeAll() {
        var _loop = function _loop() {
          var item = _Array$from[_i];

          if (item.parentNode.classList.contains('is-active')) {
            TweenMax.to(item, .5, {
              height: 0,
              ease: Power2.easeOut,
              onComplete: function onComplete() {
                item.style.display = '';
              }
            });
            item.parentNode.classList.remove('is-active');
          }
        };

        for (var _i = 0, _Array$from = Array.from(this.$('content')); _i < _Array$from.length; _i++) {
          _loop();
        }
      }
    }]);

    return _default;
  }(_default);

  var _default$w =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.slider = _this.$('slider');
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        this.swiper = new Swiper(this.slider, {
          grabCursor: true,
          slideToClickedSlide: true
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.swiper.destroy();
        this.swiper = null;
      }
    }]);

    return _default;
  }(_default);

  var _default$x =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.split = new SplitText(_this.el, {
        type: 'lines',
        linesClass: 'c-line-by-line_line'
      });
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.onResizeBind = function () {
          _this2.split.split({
            type: 'lines'
          });
        };

        window.addEventListener('resize', this.onResizeBind);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        window.removeEventListener('resize', this.onResizeBind);
      }
    }]);

    return _default;
  }(_default);

  var _default$y =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.events = {
        click: {
          head: 'toggle',
          link: 'choose'
        }
      };
      _this.current = _this.$('current');
      return _this;
    }

    _createClass$1(_default, [{
      key: "toggle",
      value: function toggle() {
        this.el.classList.toggle('is-open');
      }
    }, {
      key: "choose",
      value: function choose(e) {
        this.el.classList.remove('is-open');
        this.current.innerHTML = e.currentTarget.innerHTML;

        if (e.currentTarget.classList.contains('is-default')) {
          this.el.classList.add('is-default');
        } else {
          this.el.classList.remove('is-default');
        }
      }
    }]);

    return _default;
  }(_default);

  var _default$z =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.events = {
        click: {
          videolink: 'videoLinkClick'
        }
      };
      _this.container = _this.$('container');
      _this.prev = _this.$('prev');
      _this.next = _this.$('next');
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        this.swiper = new Swiper(this.container, {
          speed: 800,
          loop: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          grabCursor: true,
          slideToClickedSlide: true,
          navigation: {
            nextEl: this.next,
            prevEl: this.prev
          }
        });
      }
    }, {
      key: "videoLinkClick",
      value: function videoLinkClick(e) {
        e.preventDefault();
        var el = e.currentTarget;
        var id = this.data('id', el);
        var host = this.data('host', el);
        this.call('openVideo', {
          id: id,
          host: host
        }, 'Videomodal');
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.swiper.destroy();
      }
    }]);

    return _default;
  }(_default);

  var _default$A =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.events = {
        click: {
          close: "close"
        }
      };
      _this.inner = _this.$('inner');
      return _this;
    }

    _createClass$1(_default, [{
      key: "openVideo",
      value: function openVideo(e) {
        var _this2 = this;

        if (this.emptyTimeout) clearTimeout(this.emptyTimeout);
        this.appendDelay = setTimeout(function () {
          switch (e.host) {
            case 'youtube':
              _this2.inner.innerHTML = "<iframe src=\"https://www.youtube.com/embed/".concat(e.id, "?&autoplay=1\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>");
              break;

            case 'vimeo':
              _this2.inner.innerHTML = "<iframe src=\"https://player.vimeo.com/video/".concat(e.id, "?autoplay=1&loop=1&autopause=0\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>");
              break;

            default:
              console.error('You need to define a host');
              break;
          }
        }, 500);
        this.el.classList.add('is-active');
      }
    }, {
      key: "close",
      value: function close() {
        var _this3 = this;

        clearTimeout(this.appendDelay);
        this.el.classList.remove('is-active');
        this.emptyTimeout = setTimeout(function () {
          _this3.inner.innerHTML = '';
        }, 250);
      }
    }]);

    return _default;
  }(_default);

  /*! @vimeo/player v2.11.0 | (c) 2020 Vimeo | MIT License | https://github.com/vimeo/player.js */
  function _classCallCheck$3(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$3(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$3(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$3(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$3(Constructor, staticProps);
    return Constructor;
  }

  /**
   * @module lib/functions
   */

  /**
   * Check to see this is a node environment.
   * @type {Boolean}
   */

  /* global global */
  var isNode = typeof global !== 'undefined' && {}.toString.call(global) === '[object global]';
  /**
   * Get the name of the method for a given getter or setter.
   *
   * @param {string} prop The name of the property.
   * @param {string} type Either “get” or “set”.
   * @return {string}
   */

  function getMethodName(prop, type) {
    if (prop.indexOf(type.toLowerCase()) === 0) {
      return prop;
    }

    return "".concat(type.toLowerCase()).concat(prop.substr(0, 1).toUpperCase()).concat(prop.substr(1));
  }
  /**
   * Check to see if the object is a DOM Element.
   *
   * @param {*} element The object to check.
   * @return {boolean}
   */

  function isDomElement(element) {
    return Boolean(element && element.nodeType === 1 && 'nodeName' in element && element.ownerDocument && element.ownerDocument.defaultView);
  }
  /**
   * Check to see whether the value is a number.
   *
   * @see http://dl.dropboxusercontent.com/u/35146/js/tests/isNumber.html
   * @param {*} value The value to check.
   * @param {boolean} integer Check if the value is an integer.
   * @return {boolean}
   */

  function isInteger(value) {
    // eslint-disable-next-line eqeqeq
    return !isNaN(parseFloat(value)) && isFinite(value) && Math.floor(value) == value;
  }
  /**
   * Check to see if the URL is a Vimeo url.
   *
   * @param {string} url The url string.
   * @return {boolean}
   */

  function isVimeoUrl(url) {
    return /^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(url);
  }
  /**
   * Get the Vimeo URL from an element.
   * The element must have either a data-vimeo-id or data-vimeo-url attribute.
   *
   * @param {object} oEmbedParameters The oEmbed parameters.
   * @return {string}
   */

  function getVimeoUrl() {
    var oEmbedParameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var id = oEmbedParameters.id;
    var url = oEmbedParameters.url;
    var idOrUrl = id || url;

    if (!idOrUrl) {
      throw new Error('An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.');
    }

    if (isInteger(idOrUrl)) {
      return "https://vimeo.com/".concat(idOrUrl);
    }

    if (isVimeoUrl(idOrUrl)) {
      return idOrUrl.replace('http:', 'https:');
    }

    if (id) {
      throw new TypeError("\u201C".concat(id, "\u201D is not a valid video id."));
    }

    throw new TypeError("\u201C".concat(idOrUrl, "\u201D is not a vimeo.com url."));
  }

  var arrayIndexOfSupport = typeof Array.prototype.indexOf !== 'undefined';
  var postMessageSupport = typeof window !== 'undefined' && typeof window.postMessage !== 'undefined';

  if (!isNode && (!arrayIndexOfSupport || !postMessageSupport)) {
    throw new Error('Sorry, the Vimeo Player API is not available in this browser.');
  }

  var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule$1(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  /*!
   * weakmap-polyfill v2.0.1 - ECMAScript6 WeakMap polyfill
   * https://github.com/polygonplanet/weakmap-polyfill
   * Copyright (c) 2015-2020 Polygon Planet <polygon.planet.aqua@gmail.com>
   * @license MIT
   */
  (function (self) {

    if (self.WeakMap) {
      return;
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    var defineProperty = function (object, name, value) {
      if (Object.defineProperty) {
        Object.defineProperty(object, name, {
          configurable: true,
          writable: true,
          value: value
        });
      } else {
        object[name] = value;
      }
    };

    self.WeakMap = function () {
      // ECMA-262 23.3 WeakMap Objects
      function WeakMap() {
        if (this === void 0) {
          throw new TypeError("Constructor WeakMap requires 'new'");
        }

        defineProperty(this, '_id', genId('_WeakMap')); // ECMA-262 23.3.1.1 WeakMap([iterable])

        if (arguments.length > 0) {
          // Currently, WeakMap `iterable` argument is not supported
          throw new TypeError('WeakMap iterable is not supported');
        }
      } // ECMA-262 23.3.3.2 WeakMap.prototype.delete(key)


      defineProperty(WeakMap.prototype, 'delete', function (key) {
        checkInstance(this, 'delete');

        if (!isObject(key)) {
          return false;
        }

        var entry = key[this._id];

        if (entry && entry[0] === key) {
          delete key[this._id];
          return true;
        }

        return false;
      }); // ECMA-262 23.3.3.3 WeakMap.prototype.get(key)

      defineProperty(WeakMap.prototype, 'get', function (key) {
        checkInstance(this, 'get');

        if (!isObject(key)) {
          return void 0;
        }

        var entry = key[this._id];

        if (entry && entry[0] === key) {
          return entry[1];
        }

        return void 0;
      }); // ECMA-262 23.3.3.4 WeakMap.prototype.has(key)

      defineProperty(WeakMap.prototype, 'has', function (key) {
        checkInstance(this, 'has');

        if (!isObject(key)) {
          return false;
        }

        var entry = key[this._id];

        if (entry && entry[0] === key) {
          return true;
        }

        return false;
      }); // ECMA-262 23.3.3.5 WeakMap.prototype.set(key, value)

      defineProperty(WeakMap.prototype, 'set', function (key, value) {
        checkInstance(this, 'set');

        if (!isObject(key)) {
          throw new TypeError('Invalid value used as weak map key');
        }

        var entry = key[this._id];

        if (entry && entry[0] === key) {
          entry[1] = value;
          return this;
        }

        defineProperty(key, this._id, [key, value]);
        return this;
      });

      function checkInstance(x, methodName) {
        if (!isObject(x) || !hasOwnProperty.call(x, '_id')) {
          throw new TypeError(methodName + ' method called on incompatible receiver ' + typeof x);
        }
      }

      function genId(prefix) {
        return prefix + '_' + rand() + '.' + rand();
      }

      function rand() {
        return Math.random().toString().substring(2);
      }

      defineProperty(WeakMap, '_polyfill', true);
      return WeakMap;
    }();

    function isObject(x) {
      return Object(x) === x;
    }
  })(typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof commonjsGlobal$1 !== 'undefined' ? commonjsGlobal$1 : commonjsGlobal$1);

  var npo_src = createCommonjsModule$1(function (module) {
  /*! Native Promise Only
      v0.8.1 (c) Kyle Simpson
      MIT License: http://getify.mit-license.org
  */
  (function UMD(name, context, definition) {
    // special form of UMD for polyfilling across evironments
    context[name] = context[name] || definition();

    if ( module.exports) {
      module.exports = context[name];
    }
  })("Promise", typeof commonjsGlobal$1 != "undefined" ? commonjsGlobal$1 : commonjsGlobal$1, function DEF() {

    var builtInProp,
        cycle,
        scheduling_queue,
        ToString = Object.prototype.toString,
        timer = typeof setImmediate != "undefined" ? function timer(fn) {
      return setImmediate(fn);
    } : setTimeout; // dammit, IE8.

    try {
      Object.defineProperty({}, "x", {});

      builtInProp = function builtInProp(obj, name, val, config) {
        return Object.defineProperty(obj, name, {
          value: val,
          writable: true,
          configurable: config !== false
        });
      };
    } catch (err) {
      builtInProp = function builtInProp(obj, name, val) {
        obj[name] = val;
        return obj;
      };
    } // Note: using a queue instead of array for efficiency


    scheduling_queue = function Queue() {
      var first, last, item;

      function Item(fn, self) {
        this.fn = fn;
        this.self = self;
        this.next = void 0;
      }

      return {
        add: function add(fn, self) {
          item = new Item(fn, self);

          if (last) {
            last.next = item;
          } else {
            first = item;
          }

          last = item;
          item = void 0;
        },
        drain: function drain() {
          var f = first;
          first = last = cycle = void 0;

          while (f) {
            f.fn.call(f.self);
            f = f.next;
          }
        }
      };
    }();

    function schedule(fn, self) {
      scheduling_queue.add(fn, self);

      if (!cycle) {
        cycle = timer(scheduling_queue.drain);
      }
    } // promise duck typing


    function isThenable(o) {
      var _then,
          o_type = typeof o;

      if (o != null && (o_type == "object" || o_type == "function")) {
        _then = o.then;
      }

      return typeof _then == "function" ? _then : false;
    }

    function notify() {
      for (var i = 0; i < this.chain.length; i++) {
        notifyIsolated(this, this.state === 1 ? this.chain[i].success : this.chain[i].failure, this.chain[i]);
      }

      this.chain.length = 0;
    } // NOTE: This is a separate function to isolate
    // the `try..catch` so that other code can be
    // optimized better


    function notifyIsolated(self, cb, chain) {
      var ret, _then;

      try {
        if (cb === false) {
          chain.reject(self.msg);
        } else {
          if (cb === true) {
            ret = self.msg;
          } else {
            ret = cb.call(void 0, self.msg);
          }

          if (ret === chain.promise) {
            chain.reject(TypeError("Promise-chain cycle"));
          } else if (_then = isThenable(ret)) {
            _then.call(ret, chain.resolve, chain.reject);
          } else {
            chain.resolve(ret);
          }
        }
      } catch (err) {
        chain.reject(err);
      }
    }

    function resolve(msg) {
      var _then,
          self = this; // already triggered?


      if (self.triggered) {
        return;
      }

      self.triggered = true; // unwrap

      if (self.def) {
        self = self.def;
      }

      try {
        if (_then = isThenable(msg)) {
          schedule(function () {
            var def_wrapper = new MakeDefWrapper(self);

            try {
              _then.call(msg, function $resolve$() {
                resolve.apply(def_wrapper, arguments);
              }, function $reject$() {
                reject.apply(def_wrapper, arguments);
              });
            } catch (err) {
              reject.call(def_wrapper, err);
            }
          });
        } else {
          self.msg = msg;
          self.state = 1;

          if (self.chain.length > 0) {
            schedule(notify, self);
          }
        }
      } catch (err) {
        reject.call(new MakeDefWrapper(self), err);
      }
    }

    function reject(msg) {
      var self = this; // already triggered?

      if (self.triggered) {
        return;
      }

      self.triggered = true; // unwrap

      if (self.def) {
        self = self.def;
      }

      self.msg = msg;
      self.state = 2;

      if (self.chain.length > 0) {
        schedule(notify, self);
      }
    }

    function iteratePromises(Constructor, arr, resolver, rejecter) {
      for (var idx = 0; idx < arr.length; idx++) {
        (function IIFE(idx) {
          Constructor.resolve(arr[idx]).then(function $resolver$(msg) {
            resolver(idx, msg);
          }, rejecter);
        })(idx);
      }
    }

    function MakeDefWrapper(self) {
      this.def = self;
      this.triggered = false;
    }

    function MakeDef(self) {
      this.promise = self;
      this.state = 0;
      this.triggered = false;
      this.chain = [];
      this.msg = void 0;
    }

    function Promise(executor) {
      if (typeof executor != "function") {
        throw TypeError("Not a function");
      }

      if (this.__NPO__ !== 0) {
        throw TypeError("Not a promise");
      } // instance shadowing the inherited "brand"
      // to signal an already "initialized" promise


      this.__NPO__ = 1;
      var def = new MakeDef(this);

      this["then"] = function then(success, failure) {
        var o = {
          success: typeof success == "function" ? success : true,
          failure: typeof failure == "function" ? failure : false
        }; // Note: `then(..)` itself can be borrowed to be used against
        // a different promise constructor for making the chained promise,
        // by substituting a different `this` binding.

        o.promise = new this.constructor(function extractChain(resolve, reject) {
          if (typeof resolve != "function" || typeof reject != "function") {
            throw TypeError("Not a function");
          }

          o.resolve = resolve;
          o.reject = reject;
        });
        def.chain.push(o);

        if (def.state !== 0) {
          schedule(notify, def);
        }

        return o.promise;
      };

      this["catch"] = function $catch$(failure) {
        return this.then(void 0, failure);
      };

      try {
        executor.call(void 0, function publicResolve(msg) {
          resolve.call(def, msg);
        }, function publicReject(msg) {
          reject.call(def, msg);
        });
      } catch (err) {
        reject.call(def, err);
      }
    }

    var PromisePrototype = builtInProp({}, "constructor", Promise,
    /*configurable=*/
    false); // Note: Android 4 cannot use `Object.defineProperty(..)` here

    Promise.prototype = PromisePrototype; // built-in "brand" to signal an "uninitialized" promise

    builtInProp(PromisePrototype, "__NPO__", 0,
    /*configurable=*/
    false);
    builtInProp(Promise, "resolve", function Promise$resolve(msg) {
      var Constructor = this; // spec mandated checks
      // note: best "isPromise" check that's practical for now

      if (msg && typeof msg == "object" && msg.__NPO__ === 1) {
        return msg;
      }

      return new Constructor(function executor(resolve, reject) {
        if (typeof resolve != "function" || typeof reject != "function") {
          throw TypeError("Not a function");
        }

        resolve(msg);
      });
    });
    builtInProp(Promise, "reject", function Promise$reject(msg) {
      return new this(function executor(resolve, reject) {
        if (typeof resolve != "function" || typeof reject != "function") {
          throw TypeError("Not a function");
        }

        reject(msg);
      });
    });
    builtInProp(Promise, "all", function Promise$all(arr) {
      var Constructor = this; // spec mandated checks

      if (ToString.call(arr) != "[object Array]") {
        return Constructor.reject(TypeError("Not an array"));
      }

      if (arr.length === 0) {
        return Constructor.resolve([]);
      }

      return new Constructor(function executor(resolve, reject) {
        if (typeof resolve != "function" || typeof reject != "function") {
          throw TypeError("Not a function");
        }

        var len = arr.length,
            msgs = Array(len),
            count = 0;
        iteratePromises(Constructor, arr, function resolver(idx, msg) {
          msgs[idx] = msg;

          if (++count === len) {
            resolve(msgs);
          }
        }, reject);
      });
    });
    builtInProp(Promise, "race", function Promise$race(arr) {
      var Constructor = this; // spec mandated checks

      if (ToString.call(arr) != "[object Array]") {
        return Constructor.reject(TypeError("Not an array"));
      }

      return new Constructor(function executor(resolve, reject) {
        if (typeof resolve != "function" || typeof reject != "function") {
          throw TypeError("Not a function");
        }

        iteratePromises(Constructor, arr, function resolver(idx, msg) {
          resolve(msg);
        }, reject);
      });
    });
    return Promise;
  });
  });

  /**
   * @module lib/callbacks
   */
  var callbackMap = new WeakMap();
  /**
   * Store a callback for a method or event for a player.
   *
   * @param {Player} player The player object.
   * @param {string} name The method or event name.
   * @param {(function(this:Player, *): void|{resolve: function, reject: function})} callback
   *        The callback to call or an object with resolve and reject functions for a promise.
   * @return {void}
   */

  function storeCallback(player, name, callback) {
    var playerCallbacks = callbackMap.get(player.element) || {};

    if (!(name in playerCallbacks)) {
      playerCallbacks[name] = [];
    }

    playerCallbacks[name].push(callback);
    callbackMap.set(player.element, playerCallbacks);
  }
  /**
   * Get the callbacks for a player and event or method.
   *
   * @param {Player} player The player object.
   * @param {string} name The method or event name
   * @return {function[]}
   */

  function getCallbacks(player, name) {
    var playerCallbacks = callbackMap.get(player.element) || {};
    return playerCallbacks[name] || [];
  }
  /**
   * Remove a stored callback for a method or event for a player.
   *
   * @param {Player} player The player object.
   * @param {string} name The method or event name
   * @param {function} [callback] The specific callback to remove.
   * @return {boolean} Was this the last callback?
   */

  function removeCallback(player, name, callback) {
    var playerCallbacks = callbackMap.get(player.element) || {};

    if (!playerCallbacks[name]) {
      return true;
    } // If no callback is passed, remove all callbacks for the event


    if (!callback) {
      playerCallbacks[name] = [];
      callbackMap.set(player.element, playerCallbacks);
      return true;
    }

    var index = playerCallbacks[name].indexOf(callback);

    if (index !== -1) {
      playerCallbacks[name].splice(index, 1);
    }

    callbackMap.set(player.element, playerCallbacks);
    return playerCallbacks[name] && playerCallbacks[name].length === 0;
  }
  /**
   * Return the first stored callback for a player and event or method.
   *
   * @param {Player} player The player object.
   * @param {string} name The method or event name.
   * @return {function} The callback, or false if there were none
   */

  function shiftCallbacks(player, name) {
    var playerCallbacks = getCallbacks(player, name);

    if (playerCallbacks.length < 1) {
      return false;
    }

    var callback = playerCallbacks.shift();
    removeCallback(player, name, callback);
    return callback;
  }
  /**
   * Move callbacks associated with an element to another element.
   *
   * @param {HTMLElement} oldElement The old element.
   * @param {HTMLElement} newElement The new element.
   * @return {void}
   */

  function swapCallbacks(oldElement, newElement) {
    var playerCallbacks = callbackMap.get(oldElement);
    callbackMap.set(newElement, playerCallbacks);
    callbackMap.delete(oldElement);
  }

  /**
   * @module lib/embed
   */
  var oEmbedParameters = ['autopause', 'autoplay', 'background', 'byline', 'color', 'controls', 'dnt', 'height', 'id', 'loop', 'maxheight', 'maxwidth', 'muted', 'playsinline', 'portrait', 'responsive', 'speed', 'texttrack', 'title', 'transparent', 'url', 'width'];
  /**
   * Get the 'data-vimeo'-prefixed attributes from an element as an object.
   *
   * @param {HTMLElement} element The element.
   * @param {Object} [defaults={}] The default values to use.
   * @return {Object<string, string>}
   */

  function getOEmbedParameters(element) {
    var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return oEmbedParameters.reduce(function (params, param) {
      var value = element.getAttribute("data-vimeo-".concat(param));

      if (value || value === '') {
        params[param] = value === '' ? 1 : value;
      }

      return params;
    }, defaults);
  }
  /**
   * Create an embed from oEmbed data inside an element.
   *
   * @param {object} data The oEmbed data.
   * @param {HTMLElement} element The element to put the iframe in.
   * @return {HTMLIFrameElement} The iframe embed.
   */

  function createEmbed(_ref, element) {
    var html = _ref.html;

    if (!element) {
      throw new TypeError('An element must be provided');
    }

    if (element.getAttribute('data-vimeo-initialized') !== null) {
      return element.querySelector('iframe');
    }

    var div = document.createElement('div');
    div.innerHTML = html;
    element.appendChild(div.firstChild);
    element.setAttribute('data-vimeo-initialized', 'true');
    return element.querySelector('iframe');
  }
  /**
   * Make an oEmbed call for the specified URL.
   *
   * @param {string} videoUrl The vimeo.com url for the video.
   * @param {Object} [params] Parameters to pass to oEmbed.
   * @param {HTMLElement} element The element.
   * @return {Promise}
   */

  function getOEmbedData(videoUrl) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var element = arguments.length > 2 ? arguments[2] : undefined;
    return new Promise(function (resolve, reject) {
      if (!isVimeoUrl(videoUrl)) {
        throw new TypeError("\u201C".concat(videoUrl, "\u201D is not a vimeo.com url."));
      }

      var url = "https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(videoUrl));

      for (var param in params) {
        if (params.hasOwnProperty(param)) {
          url += "&".concat(param, "=").concat(encodeURIComponent(params[param]));
        }
      }

      var xhr = 'XDomainRequest' in window ? new XDomainRequest() : new XMLHttpRequest();
      xhr.open('GET', url, true);

      xhr.onload = function () {
        if (xhr.status === 404) {
          reject(new Error("\u201C".concat(videoUrl, "\u201D was not found.")));
          return;
        }

        if (xhr.status === 403) {
          reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
          return;
        }

        try {
          var json = JSON.parse(xhr.responseText); // Check api response for 403 on oembed

          if (json.domain_status_code === 403) {
            // We still want to create the embed to give users visual feedback
            createEmbed(json, element);
            reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
            return;
          }

          resolve(json);
        } catch (error) {
          reject(error);
        }
      };

      xhr.onerror = function () {
        var status = xhr.status ? " (".concat(xhr.status, ")") : '';
        reject(new Error("There was an error fetching the embed code from Vimeo".concat(status, ".")));
      };

      xhr.send();
    });
  }
  /**
   * Initialize all embeds within a specific element
   *
   * @param {HTMLElement} [parent=document] The parent element.
   * @return {void}
   */

  function initializeEmbeds() {
    var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var elements = [].slice.call(parent.querySelectorAll('[data-vimeo-id], [data-vimeo-url]'));

    var handleError = function handleError(error) {
      if ('console' in window && console.error) {
        console.error("There was an error creating an embed: ".concat(error));
      }
    };

    elements.forEach(function (element) {
      try {
        // Skip any that have data-vimeo-defer
        if (element.getAttribute('data-vimeo-defer') !== null) {
          return;
        }

        var params = getOEmbedParameters(element);
        var url = getVimeoUrl(params);
        getOEmbedData(url, params, element).then(function (data) {
          return createEmbed(data, element);
        }).catch(handleError);
      } catch (error) {
        handleError(error);
      }
    });
  }
  /**
   * Resize embeds when messaged by the player.
   *
   * @param {HTMLElement} [parent=document] The parent element.
   * @return {void}
   */

  function resizeEmbeds() {
    var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    // Prevent execution if users include the player.js script multiple times.
    if (window.VimeoPlayerResizeEmbeds_) {
      return;
    }

    window.VimeoPlayerResizeEmbeds_ = true;

    var onMessage = function onMessage(event) {
      if (!isVimeoUrl(event.origin)) {
        return;
      } // 'spacechange' is fired only on embeds with cards


      if (!event.data || event.data.event !== 'spacechange') {
        return;
      }

      var iframes = parent.querySelectorAll('iframe');

      for (var i = 0; i < iframes.length; i++) {
        if (iframes[i].contentWindow !== event.source) {
          continue;
        } // Change padding-bottom of the enclosing div to accommodate
        // card carousel without distorting aspect ratio


        var space = iframes[i].parentElement;
        space.style.paddingBottom = "".concat(event.data.data[0].bottom, "px");
        break;
      }
    };

    window.addEventListener('message', onMessage);
  }

  /**
   * @module lib/postmessage
   */
  /**
   * Parse a message received from postMessage.
   *
   * @param {*} data The data received from postMessage.
   * @return {object}
   */

  function parseMessageData(data) {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (error) {
        // If the message cannot be parsed, throw the error as a warning
        console.warn(error);
        return {};
      }
    }

    return data;
  }
  /**
   * Post a message to the specified target.
   *
   * @param {Player} player The player object to use.
   * @param {string} method The API method to call.
   * @param {object} params The parameters to send to the player.
   * @return {void}
   */

  function postMessage(player, method, params) {
    if (!player.element.contentWindow || !player.element.contentWindow.postMessage) {
      return;
    }

    var message = {
      method: method
    };

    if (params !== undefined) {
      message.value = params;
    } // IE 8 and 9 do not support passing messages, so stringify them


    var ieVersion = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, '$1'));

    if (ieVersion >= 8 && ieVersion < 10) {
      message = JSON.stringify(message);
    }

    player.element.contentWindow.postMessage(message, player.origin);
  }
  /**
   * Parse the data received from a message event.
   *
   * @param {Player} player The player that received the message.
   * @param {(Object|string)} data The message data. Strings will be parsed into JSON.
   * @return {void}
   */

  function processData(player, data) {
    data = parseMessageData(data);
    var callbacks = [];
    var param;

    if (data.event) {
      if (data.event === 'error') {
        var promises = getCallbacks(player, data.data.method);
        promises.forEach(function (promise) {
          var error = new Error(data.data.message);
          error.name = data.data.name;
          promise.reject(error);
          removeCallback(player, data.data.method, promise);
        });
      }

      callbacks = getCallbacks(player, "event:".concat(data.event));
      param = data.data;
    } else if (data.method) {
      var callback = shiftCallbacks(player, data.method);

      if (callback) {
        callbacks.push(callback);
        param = data.value;
      }
    }

    callbacks.forEach(function (callback) {
      try {
        if (typeof callback === 'function') {
          callback.call(player, param);
          return;
        }

        callback.resolve(param);
      } catch (e) {// empty
      }
    });
  }

  var playerMap = new WeakMap();
  var readyMap = new WeakMap();

  var Player =
  /*#__PURE__*/
  function () {
    /**
     * Create a Player.
     *
     * @param {(HTMLIFrameElement|HTMLElement|string|jQuery)} element A reference to the Vimeo
     *        player iframe, and id, or a jQuery object.
     * @param {object} [options] oEmbed parameters to use when creating an embed in the element.
     * @return {Player}
     */
    function Player(element) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck$3(this, Player);

      /* global jQuery */
      if (window.jQuery && element instanceof jQuery) {
        if (element.length > 1 && window.console && console.warn) {
          console.warn('A jQuery object with multiple elements was passed, using the first element.');
        }

        element = element[0];
      } // Find an element by ID


      if (typeof document !== 'undefined' && typeof element === 'string') {
        element = document.getElementById(element);
      } // Not an element!


      if (!isDomElement(element)) {
        throw new TypeError('You must pass either a valid element or a valid id.');
      } // Already initialized an embed in this div, so grab the iframe


      if (element.nodeName !== 'IFRAME') {
        var iframe = element.querySelector('iframe');

        if (iframe) {
          element = iframe;
        }
      } // iframe url is not a Vimeo url


      if (element.nodeName === 'IFRAME' && !isVimeoUrl(element.getAttribute('src') || '')) {
        throw new Error('The player element passed isn’t a Vimeo embed.');
      } // If there is already a player object in the map, return that


      if (playerMap.has(element)) {
        return playerMap.get(element);
      }

      this._window = element.ownerDocument.defaultView;
      this.element = element;
      this.origin = '*';
      var readyPromise = new npo_src(function (resolve, reject) {
        _this._onMessage = function (event) {
          if (!isVimeoUrl(event.origin) || _this.element.contentWindow !== event.source) {
            return;
          }

          if (_this.origin === '*') {
            _this.origin = event.origin;
          }

          var data = parseMessageData(event.data);
          var isError = data && data.event === 'error';
          var isReadyError = isError && data.data && data.data.method === 'ready';

          if (isReadyError) {
            var error = new Error(data.data.message);
            error.name = data.data.name;
            reject(error);
            return;
          }

          var isReadyEvent = data && data.event === 'ready';
          var isPingResponse = data && data.method === 'ping';

          if (isReadyEvent || isPingResponse) {
            _this.element.setAttribute('data-ready', 'true');

            resolve();
            return;
          }

          processData(_this, data);
        };

        _this._window.addEventListener('message', _this._onMessage);

        if (_this.element.nodeName !== 'IFRAME') {
          var params = getOEmbedParameters(element, options);
          var url = getVimeoUrl(params);
          getOEmbedData(url, params, element).then(function (data) {
            var iframe = createEmbed(data, element); // Overwrite element with the new iframe,
            // but store reference to the original element

            _this.element = iframe;
            _this._originalElement = element;
            swapCallbacks(element, iframe);
            playerMap.set(_this.element, _this);
            return data;
          }).catch(reject);
        }
      }); // Store a copy of this Player in the map

      readyMap.set(this, readyPromise);
      playerMap.set(this.element, this); // Send a ping to the iframe so the ready promise will be resolved if
      // the player is already ready.

      if (this.element.nodeName === 'IFRAME') {
        postMessage(this, 'ping');
      }

      return this;
    }
    /**
     * Get a promise for a method.
     *
     * @param {string} name The API method to call.
     * @param {Object} [args={}] Arguments to send via postMessage.
     * @return {Promise}
     */


    _createClass$3(Player, [{
      key: "callMethod",
      value: function callMethod(name) {
        var _this2 = this;

        var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return new npo_src(function (resolve, reject) {
          // We are storing the resolve/reject handlers to call later, so we
          // can’t return here.
          // eslint-disable-next-line promise/always-return
          return _this2.ready().then(function () {
            storeCallback(_this2, name, {
              resolve: resolve,
              reject: reject
            });
            postMessage(_this2, name, args);
          }).catch(reject);
        });
      }
      /**
       * Get a promise for the value of a player property.
       *
       * @param {string} name The property name
       * @return {Promise}
       */

    }, {
      key: "get",
      value: function get(name) {
        var _this3 = this;

        return new npo_src(function (resolve, reject) {
          name = getMethodName(name, 'get'); // We are storing the resolve/reject handlers to call later, so we
          // can’t return here.
          // eslint-disable-next-line promise/always-return

          return _this3.ready().then(function () {
            storeCallback(_this3, name, {
              resolve: resolve,
              reject: reject
            });
            postMessage(_this3, name);
          }).catch(reject);
        });
      }
      /**
       * Get a promise for setting the value of a player property.
       *
       * @param {string} name The API method to call.
       * @param {mixed} value The value to set.
       * @return {Promise}
       */

    }, {
      key: "set",
      value: function set(name, value) {
        var _this4 = this;

        return new npo_src(function (resolve, reject) {
          name = getMethodName(name, 'set');

          if (value === undefined || value === null) {
            throw new TypeError('There must be a value to set.');
          } // We are storing the resolve/reject handlers to call later, so we
          // can’t return here.
          // eslint-disable-next-line promise/always-return


          return _this4.ready().then(function () {
            storeCallback(_this4, name, {
              resolve: resolve,
              reject: reject
            });
            postMessage(_this4, name, value);
          }).catch(reject);
        });
      }
      /**
       * Add an event listener for the specified event. Will call the
       * callback with a single parameter, `data`, that contains the data for
       * that event.
       *
       * @param {string} eventName The name of the event.
       * @param {function(*)} callback The function to call when the event fires.
       * @return {void}
       */

    }, {
      key: "on",
      value: function on(eventName, callback) {
        if (!eventName) {
          throw new TypeError('You must pass an event name.');
        }

        if (!callback) {
          throw new TypeError('You must pass a callback function.');
        }

        if (typeof callback !== 'function') {
          throw new TypeError('The callback must be a function.');
        }

        var callbacks = getCallbacks(this, "event:".concat(eventName));

        if (callbacks.length === 0) {
          this.callMethod('addEventListener', eventName).catch(function () {// Ignore the error. There will be an error event fired that
            // will trigger the error callback if they are listening.
          });
        }

        storeCallback(this, "event:".concat(eventName), callback);
      }
      /**
       * Remove an event listener for the specified event. Will remove all
       * listeners for that event if a `callback` isn’t passed, or only that
       * specific callback if it is passed.
       *
       * @param {string} eventName The name of the event.
       * @param {function} [callback] The specific callback to remove.
       * @return {void}
       */

    }, {
      key: "off",
      value: function off(eventName, callback) {
        if (!eventName) {
          throw new TypeError('You must pass an event name.');
        }

        if (callback && typeof callback !== 'function') {
          throw new TypeError('The callback must be a function.');
        }

        var lastCallback = removeCallback(this, "event:".concat(eventName), callback); // If there are no callbacks left, remove the listener

        if (lastCallback) {
          this.callMethod('removeEventListener', eventName).catch(function (e) {// Ignore the error. There will be an error event fired that
            // will trigger the error callback if they are listening.
          });
        }
      }
      /**
       * A promise to load a new video.
       *
       * @promise LoadVideoPromise
       * @fulfill {number} The video with this id successfully loaded.
       * @reject {TypeError} The id was not a number.
       */

      /**
       * Load a new video into this embed. The promise will be resolved if
       * the video is successfully loaded, or it will be rejected if it could
       * not be loaded.
       *
       * @param {number|object} options The id of the video or an object with embed options.
       * @return {LoadVideoPromise}
       */

    }, {
      key: "loadVideo",
      value: function loadVideo(options) {
        return this.callMethod('loadVideo', options);
      }
      /**
       * A promise to perform an action when the Player is ready.
       *
       * @todo document errors
       * @promise LoadVideoPromise
       * @fulfill {void}
       */

      /**
       * Trigger a function when the player iframe has initialized. You do not
       * need to wait for `ready` to trigger to begin adding event listeners
       * or calling other methods.
       *
       * @return {ReadyPromise}
       */

    }, {
      key: "ready",
      value: function ready() {
        var readyPromise = readyMap.get(this) || new npo_src(function (resolve, reject) {
          reject(new Error('Unknown player. Probably unloaded.'));
        });
        return npo_src.resolve(readyPromise);
      }
      /**
       * A promise to add a cue point to the player.
       *
       * @promise AddCuePointPromise
       * @fulfill {string} The id of the cue point to use for removeCuePoint.
       * @reject {RangeError} the time was less than 0 or greater than the
       *         video’s duration.
       * @reject {UnsupportedError} Cue points are not supported with the current
       *         player or browser.
       */

      /**
       * Add a cue point to the player.
       *
       * @param {number} time The time for the cue point.
       * @param {object} [data] Arbitrary data to be returned with the cue point.
       * @return {AddCuePointPromise}
       */

    }, {
      key: "addCuePoint",
      value: function addCuePoint(time) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return this.callMethod('addCuePoint', {
          time: time,
          data: data
        });
      }
      /**
       * A promise to remove a cue point from the player.
       *
       * @promise AddCuePointPromise
       * @fulfill {string} The id of the cue point that was removed.
       * @reject {InvalidCuePoint} The cue point with the specified id was not
       *         found.
       * @reject {UnsupportedError} Cue points are not supported with the current
       *         player or browser.
       */

      /**
       * Remove a cue point from the video.
       *
       * @param {string} id The id of the cue point to remove.
       * @return {RemoveCuePointPromise}
       */

    }, {
      key: "removeCuePoint",
      value: function removeCuePoint(id) {
        return this.callMethod('removeCuePoint', id);
      }
      /**
       * A representation of a text track on a video.
       *
       * @typedef {Object} VimeoTextTrack
       * @property {string} language The ISO language code.
       * @property {string} kind The kind of track it is (captions or subtitles).
       * @property {string} label The human‐readable label for the track.
       */

      /**
       * A promise to enable a text track.
       *
       * @promise EnableTextTrackPromise
       * @fulfill {VimeoTextTrack} The text track that was enabled.
       * @reject {InvalidTrackLanguageError} No track was available with the
       *         specified language.
       * @reject {InvalidTrackError} No track was available with the specified
       *         language and kind.
       */

      /**
       * Enable the text track with the specified language, and optionally the
       * specified kind (captions or subtitles).
       *
       * When set via the API, the track language will not change the viewer’s
       * stored preference.
       *
       * @param {string} language The two‐letter language code.
       * @param {string} [kind] The kind of track to enable (captions or subtitles).
       * @return {EnableTextTrackPromise}
       */

    }, {
      key: "enableTextTrack",
      value: function enableTextTrack(language, kind) {
        if (!language) {
          throw new TypeError('You must pass a language.');
        }

        return this.callMethod('enableTextTrack', {
          language: language,
          kind: kind
        });
      }
      /**
       * A promise to disable the active text track.
       *
       * @promise DisableTextTrackPromise
       * @fulfill {void} The track was disabled.
       */

      /**
       * Disable the currently-active text track.
       *
       * @return {DisableTextTrackPromise}
       */

    }, {
      key: "disableTextTrack",
      value: function disableTextTrack() {
        return this.callMethod('disableTextTrack');
      }
      /**
       * A promise to pause the video.
       *
       * @promise PausePromise
       * @fulfill {void} The video was paused.
       */

      /**
       * Pause the video if it’s playing.
       *
       * @return {PausePromise}
       */

    }, {
      key: "pause",
      value: function pause() {
        return this.callMethod('pause');
      }
      /**
       * A promise to play the video.
       *
       * @promise PlayPromise
       * @fulfill {void} The video was played.
       */

      /**
       * Play the video if it’s paused. **Note:** on iOS and some other
       * mobile devices, you cannot programmatically trigger play. Once the
       * viewer has tapped on the play button in the player, however, you
       * will be able to use this function.
       *
       * @return {PlayPromise}
       */

    }, {
      key: "play",
      value: function play() {
        return this.callMethod('play');
      }
      /**
       * A promise to unload the video.
       *
       * @promise UnloadPromise
       * @fulfill {void} The video was unloaded.
       */

      /**
       * Return the player to its initial state.
       *
       * @return {UnloadPromise}
       */

    }, {
      key: "unload",
      value: function unload() {
        return this.callMethod('unload');
      }
      /**
       * Cleanup the player and remove it from the DOM
       *
       * It won't be usable and a new one should be constructed
       *  in order to do any operations.
       *
       * @return {Promise}
       */

    }, {
      key: "destroy",
      value: function destroy() {
        var _this5 = this;

        return new npo_src(function (resolve) {
          readyMap.delete(_this5);
          playerMap.delete(_this5.element);

          if (_this5._originalElement) {
            playerMap.delete(_this5._originalElement);

            _this5._originalElement.removeAttribute('data-vimeo-initialized');
          }

          if (_this5.element && _this5.element.nodeName === 'IFRAME' && _this5.element.parentNode) {
            _this5.element.parentNode.removeChild(_this5.element);
          }

          _this5._window.removeEventListener('message', _this5._onMessage);

          resolve();
        });
      }
      /**
       * A promise to get the autopause behavior of the video.
       *
       * @promise GetAutopausePromise
       * @fulfill {boolean} Whether autopause is turned on or off.
       * @reject {UnsupportedError} Autopause is not supported with the current
       *         player or browser.
       */

      /**
       * Get the autopause behavior for this player.
       *
       * @return {GetAutopausePromise}
       */

    }, {
      key: "getAutopause",
      value: function getAutopause() {
        return this.get('autopause');
      }
      /**
       * A promise to set the autopause behavior of the video.
       *
       * @promise SetAutopausePromise
       * @fulfill {boolean} Whether autopause is turned on or off.
       * @reject {UnsupportedError} Autopause is not supported with the current
       *         player or browser.
       */

      /**
       * Enable or disable the autopause behavior of this player.
       *
       * By default, when another video is played in the same browser, this
       * player will automatically pause. Unless you have a specific reason
       * for doing so, we recommend that you leave autopause set to the
       * default (`true`).
       *
       * @param {boolean} autopause
       * @return {SetAutopausePromise}
       */

    }, {
      key: "setAutopause",
      value: function setAutopause(autopause) {
        return this.set('autopause', autopause);
      }
      /**
       * A promise to get the buffered property of the video.
       *
       * @promise GetBufferedPromise
       * @fulfill {Array} Buffered Timeranges converted to an Array.
       */

      /**
       * Get the buffered property of the video.
       *
       * @return {GetBufferedPromise}
       */

    }, {
      key: "getBuffered",
      value: function getBuffered() {
        return this.get('buffered');
      }
      /**
       * A representation of a chapter.
       *
       * @typedef {Object} VimeoChapter
       * @property {number} startTime The start time of the chapter.
       * @property {object} title The title of the chapter.
       * @property {number} index The place in the order of Chapters. Starts at 1.
       */

      /**
       * A promise to get chapters for the video.
       *
       * @promise GetChaptersPromise
       * @fulfill {VimeoChapter[]} The chapters for the video.
       */

      /**
       * Get an array of all the chapters for the video.
       *
       * @return {GetChaptersPromise}
       */

    }, {
      key: "getChapters",
      value: function getChapters() {
        return this.get('chapters');
      }
      /**
       * A promise to get the currently active chapter.
       *
       * @promise GetCurrentChaptersPromise
       * @fulfill {VimeoChapter|undefined} The current chapter for the video.
       */

      /**
       * Get the currently active chapter for the video.
       *
       * @return {GetCurrentChaptersPromise}
       */

    }, {
      key: "getCurrentChapter",
      value: function getCurrentChapter() {
        return this.get('currentChapter');
      }
      /**
       * A promise to get the color of the player.
       *
       * @promise GetColorPromise
       * @fulfill {string} The hex color of the player.
       */

      /**
       * Get the color for this player.
       *
       * @return {GetColorPromise}
       */

    }, {
      key: "getColor",
      value: function getColor() {
        return this.get('color');
      }
      /**
       * A promise to set the color of the player.
       *
       * @promise SetColorPromise
       * @fulfill {string} The color was successfully set.
       * @reject {TypeError} The string was not a valid hex or rgb color.
       * @reject {ContrastError} The color was set, but the contrast is
       *         outside of the acceptable range.
       * @reject {EmbedSettingsError} The owner of the player has chosen to
       *         use a specific color.
       */

      /**
       * Set the color of this player to a hex or rgb string. Setting the
       * color may fail if the owner of the video has set their embed
       * preferences to force a specific color.
       *
       * @param {string} color The hex or rgb color string to set.
       * @return {SetColorPromise}
       */

    }, {
      key: "setColor",
      value: function setColor(color) {
        return this.set('color', color);
      }
      /**
       * A representation of a cue point.
       *
       * @typedef {Object} VimeoCuePoint
       * @property {number} time The time of the cue point.
       * @property {object} data The data passed when adding the cue point.
       * @property {string} id The unique id for use with removeCuePoint.
       */

      /**
       * A promise to get the cue points of a video.
       *
       * @promise GetCuePointsPromise
       * @fulfill {VimeoCuePoint[]} The cue points added to the video.
       * @reject {UnsupportedError} Cue points are not supported with the current
       *         player or browser.
       */

      /**
       * Get an array of the cue points added to the video.
       *
       * @return {GetCuePointsPromise}
       */

    }, {
      key: "getCuePoints",
      value: function getCuePoints() {
        return this.get('cuePoints');
      }
      /**
       * A promise to get the current time of the video.
       *
       * @promise GetCurrentTimePromise
       * @fulfill {number} The current time in seconds.
       */

      /**
       * Get the current playback position in seconds.
       *
       * @return {GetCurrentTimePromise}
       */

    }, {
      key: "getCurrentTime",
      value: function getCurrentTime() {
        return this.get('currentTime');
      }
      /**
       * A promise to set the current time of the video.
       *
       * @promise SetCurrentTimePromise
       * @fulfill {number} The actual current time that was set.
       * @reject {RangeError} the time was less than 0 or greater than the
       *         video’s duration.
       */

      /**
       * Set the current playback position in seconds. If the player was
       * paused, it will remain paused. Likewise, if the player was playing,
       * it will resume playing once the video has buffered.
       *
       * You can provide an accurate time and the player will attempt to seek
       * to as close to that time as possible. The exact time will be the
       * fulfilled value of the promise.
       *
       * @param {number} currentTime
       * @return {SetCurrentTimePromise}
       */

    }, {
      key: "setCurrentTime",
      value: function setCurrentTime(currentTime) {
        return this.set('currentTime', currentTime);
      }
      /**
       * A promise to get the duration of the video.
       *
       * @promise GetDurationPromise
       * @fulfill {number} The duration in seconds.
       */

      /**
       * Get the duration of the video in seconds. It will be rounded to the
       * nearest second before playback begins, and to the nearest thousandth
       * of a second after playback begins.
       *
       * @return {GetDurationPromise}
       */

    }, {
      key: "getDuration",
      value: function getDuration() {
        return this.get('duration');
      }
      /**
       * A promise to get the ended state of the video.
       *
       * @promise GetEndedPromise
       * @fulfill {boolean} Whether or not the video has ended.
       */

      /**
       * Get the ended state of the video. The video has ended if
       * `currentTime === duration`.
       *
       * @return {GetEndedPromise}
       */

    }, {
      key: "getEnded",
      value: function getEnded() {
        return this.get('ended');
      }
      /**
       * A promise to get the loop state of the player.
       *
       * @promise GetLoopPromise
       * @fulfill {boolean} Whether or not the player is set to loop.
       */

      /**
       * Get the loop state of the player.
       *
       * @return {GetLoopPromise}
       */

    }, {
      key: "getLoop",
      value: function getLoop() {
        return this.get('loop');
      }
      /**
       * A promise to set the loop state of the player.
       *
       * @promise SetLoopPromise
       * @fulfill {boolean} The loop state that was set.
       */

      /**
       * Set the loop state of the player. When set to `true`, the player
       * will start over immediately once playback ends.
       *
       * @param {boolean} loop
       * @return {SetLoopPromise}
       */

    }, {
      key: "setLoop",
      value: function setLoop(loop) {
        return this.set('loop', loop);
      }
      /**
       * A promise to set the muted state of the player.
       *
       * @promise SetMutedPromise
       * @fulfill {boolean} The muted state that was set.
       */

      /**
       * Set the muted state of the player. When set to `true`, the player
       * volume will be muted.
       *
       * @param {boolean} muted
       * @return {SetMutedPromise}
       */

    }, {
      key: "setMuted",
      value: function setMuted(muted) {
        return this.set('muted', muted);
      }
      /**
       * A promise to get the muted state of the player.
       *
       * @promise GetMutedPromise
       * @fulfill {boolean} Whether or not the player is muted.
       */

      /**
       * Get the muted state of the player.
       *
       * @return {GetMutedPromise}
       */

    }, {
      key: "getMuted",
      value: function getMuted() {
        return this.get('muted');
      }
      /**
       * A promise to get the paused state of the player.
       *
       * @promise GetLoopPromise
       * @fulfill {boolean} Whether or not the video is paused.
       */

      /**
       * Get the paused state of the player.
       *
       * @return {GetLoopPromise}
       */

    }, {
      key: "getPaused",
      value: function getPaused() {
        return this.get('paused');
      }
      /**
       * A promise to get the playback rate of the player.
       *
       * @promise GetPlaybackRatePromise
       * @fulfill {number} The playback rate of the player on a scale from 0.5 to 2.
       */

      /**
       * Get the playback rate of the player on a scale from `0.5` to `2`.
       *
       * @return {GetPlaybackRatePromise}
       */

    }, {
      key: "getPlaybackRate",
      value: function getPlaybackRate() {
        return this.get('playbackRate');
      }
      /**
       * A promise to set the playbackrate of the player.
       *
       * @promise SetPlaybackRatePromise
       * @fulfill {number} The playback rate was set.
       * @reject {RangeError} The playback rate was less than 0.5 or greater than 2.
       */

      /**
       * Set the playback rate of the player on a scale from `0.5` to `2`. When set
       * via the API, the playback rate will not be synchronized to other
       * players or stored as the viewer's preference.
       *
       * @param {number} playbackRate
       * @return {SetPlaybackRatePromise}
       */

    }, {
      key: "setPlaybackRate",
      value: function setPlaybackRate(playbackRate) {
        return this.set('playbackRate', playbackRate);
      }
      /**
       * A promise to get the played property of the video.
       *
       * @promise GetPlayedPromise
       * @fulfill {Array} Played Timeranges converted to an Array.
       */

      /**
       * Get the played property of the video.
       *
       * @return {GetPlayedPromise}
       */

    }, {
      key: "getPlayed",
      value: function getPlayed() {
        return this.get('played');
      }
      /**
       * A promise to get the seekable property of the video.
       *
       * @promise GetSeekablePromise
       * @fulfill {Array} Seekable Timeranges converted to an Array.
       */

      /**
       * Get the seekable property of the video.
       *
       * @return {GetSeekablePromise}
       */

    }, {
      key: "getSeekable",
      value: function getSeekable() {
        return this.get('seekable');
      }
      /**
       * A promise to get the seeking property of the player.
       *
       * @promise GetSeekingPromise
       * @fulfill {boolean} Whether or not the player is currently seeking.
       */

      /**
       * Get if the player is currently seeking.
       *
       * @return {GetSeekingPromise}
       */

    }, {
      key: "getSeeking",
      value: function getSeeking() {
        return this.get('seeking');
      }
      /**
       * A promise to get the text tracks of a video.
       *
       * @promise GetTextTracksPromise
       * @fulfill {VimeoTextTrack[]} The text tracks associated with the video.
       */

      /**
       * Get an array of the text tracks that exist for the video.
       *
       * @return {GetTextTracksPromise}
       */

    }, {
      key: "getTextTracks",
      value: function getTextTracks() {
        return this.get('textTracks');
      }
      /**
       * A promise to get the embed code for the video.
       *
       * @promise GetVideoEmbedCodePromise
       * @fulfill {string} The `<iframe>` embed code for the video.
       */

      /**
       * Get the `<iframe>` embed code for the video.
       *
       * @return {GetVideoEmbedCodePromise}
       */

    }, {
      key: "getVideoEmbedCode",
      value: function getVideoEmbedCode() {
        return this.get('videoEmbedCode');
      }
      /**
       * A promise to get the id of the video.
       *
       * @promise GetVideoIdPromise
       * @fulfill {number} The id of the video.
       */

      /**
       * Get the id of the video.
       *
       * @return {GetVideoIdPromise}
       */

    }, {
      key: "getVideoId",
      value: function getVideoId() {
        return this.get('videoId');
      }
      /**
       * A promise to get the title of the video.
       *
       * @promise GetVideoTitlePromise
       * @fulfill {number} The title of the video.
       */

      /**
       * Get the title of the video.
       *
       * @return {GetVideoTitlePromise}
       */

    }, {
      key: "getVideoTitle",
      value: function getVideoTitle() {
        return this.get('videoTitle');
      }
      /**
       * A promise to get the native width of the video.
       *
       * @promise GetVideoWidthPromise
       * @fulfill {number} The native width of the video.
       */

      /**
       * Get the native width of the currently‐playing video. The width of
       * the highest‐resolution available will be used before playback begins.
       *
       * @return {GetVideoWidthPromise}
       */

    }, {
      key: "getVideoWidth",
      value: function getVideoWidth() {
        return this.get('videoWidth');
      }
      /**
       * A promise to get the native height of the video.
       *
       * @promise GetVideoHeightPromise
       * @fulfill {number} The native height of the video.
       */

      /**
       * Get the native height of the currently‐playing video. The height of
       * the highest‐resolution available will be used before playback begins.
       *
       * @return {GetVideoHeightPromise}
       */

    }, {
      key: "getVideoHeight",
      value: function getVideoHeight() {
        return this.get('videoHeight');
      }
      /**
       * A promise to get the vimeo.com url for the video.
       *
       * @promise GetVideoUrlPromise
       * @fulfill {number} The vimeo.com url for the video.
       * @reject {PrivacyError} The url isn’t available because of the video’s privacy setting.
       */

      /**
       * Get the vimeo.com url for the video.
       *
       * @return {GetVideoUrlPromise}
       */

    }, {
      key: "getVideoUrl",
      value: function getVideoUrl() {
        return this.get('videoUrl');
      }
      /**
       * A promise to get the volume level of the player.
       *
       * @promise GetVolumePromise
       * @fulfill {number} The volume level of the player on a scale from 0 to 1.
       */

      /**
       * Get the current volume level of the player on a scale from `0` to `1`.
       *
       * Most mobile devices do not support an independent volume from the
       * system volume. In those cases, this method will always return `1`.
       *
       * @return {GetVolumePromise}
       */

    }, {
      key: "getVolume",
      value: function getVolume() {
        return this.get('volume');
      }
      /**
       * A promise to set the volume level of the player.
       *
       * @promise SetVolumePromise
       * @fulfill {number} The volume was set.
       * @reject {RangeError} The volume was less than 0 or greater than 1.
       */

      /**
       * Set the volume of the player on a scale from `0` to `1`. When set
       * via the API, the volume level will not be synchronized to other
       * players or stored as the viewer’s preference.
       *
       * Most mobile devices do not support setting the volume. An error will
       * *not* be triggered in that situation.
       *
       * @param {number} volume
       * @return {SetVolumePromise}
       */

    }, {
      key: "setVolume",
      value: function setVolume(volume) {
        return this.set('volume', volume);
      }
    }]);

    return Player;
  }(); // Setup embed only if this is not a node environment


  if (!isNode) {
    initializeEmbeds();
    resizeEmbeds();
  }

  var MODULE_NAME = 'VimeoPlayer';
  var EVENT_NAMESPACE = "".concat(APP_NAME, ".").concat(MODULE_NAME);
  var EVENT$2 = {
    CLICK: "click.".concat(EVENT_NAMESPACE),
    LAUNCH: "launch.".concat(EVENT_NAMESPACE),
    PAUSE: "pause.".concat(EVENT_NAMESPACE)
  };

  var _default$B =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      _classCallCheck$1(this, _default);

      return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this = this;

        this.$el = $(this.el); // Set events and such

        this.player = new Player(this.el);
        if (this.$el.hasClass('is-show')) this.player.play();
        this.timeout;
        this.$el.on(EVENT$2.LAUNCH, function (e) {
          if (e.way == 'enter') {
            _this.timeout = setTimeout(function () {
              _this.player.play();
            }, 100);
          } else {
            clearTimeout(_this.timeout);

            _this.player.pause();
          }
        });
        this.$el.on(EVENT$2.PAUSE, function (e) {
          _this.player.pause();
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.player.destroy(); // console.log('❌ [module]:destroy - VimeoPlayer');

        _get(_getPrototypeOf(_default.prototype), "destroy", this).call(this);

        this.$el.off(".".concat(EVENT_NAMESPACE));
      }
    }]);

    return _default;
  }(_default);

  var MODULE_NAME$1 = 'Next';
  var EVENT_NAMESPACE$1 = "".concat(APP_NAME, ".").concat(MODULE_NAME$1);
  var EVENT$3 = {
    INVIEW: "inview.".concat(EVENT_NAMESPACE$1)
  };

  var _default$C =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.link = _this.$('link');
      _this.visual = _this.$('visual');
      _this.visualOuter = _this.$('visualOuter');
      _this.visualInner = _this.$('visualInner');
      _this.video = _this.$('video');
      _this.$el = $(_this.el);
      _this.$video = $(_this.video);
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.compute();
        this.initTl(); // Listen for events

        this.mouseEnterBind = function () {
          _this2.tl.play();
        };

        this.link.addEventListener('mouseenter', this.mouseEnterBind);

        this.mouseLeaveBind = function () {
          _this2.tl.reverse();
        };

        this.link.addEventListener('mouseleave', this.mouseLeaveBind);

        this.onResizeBind = function () {
          if (!_this2.resizeTick) {
            _this2.resizeTick = true;
            requestAnimationFrame(function () {
              _this2.compute();

              _this2.initTl();

              _this2.resizeTick = false;
            });
          }
        };

        window.addEventListener('resize', this.onResizeBind);
        this.$el.on(EVENT$3.INVIEW, function (e) {
          _this2.$video.triggerHandler(Object.assign(e, {
            type: EVENT$2.LAUNCH
          }));
        });
      }
    }, {
      key: "compute",
      value: function compute() {
        TweenMax.set([this.visualOuter, this.visualInner, this.visual], {
          clearProps: 'x,y'
        });
        this.viewport = {
          width: window.innerWidth,
          height: window.innerHeight
        };
        this.elBCR = this.el.getBoundingClientRect();
        this.visualBCR = this.visual.getBoundingClientRect();
        this.visualOffset = {
          top: this.visualBCR.top - this.elBCR.top,
          left: this.visualBCR.left - this.elBCR.left
        };
      }
    }, {
      key: "killTl",
      value: function killTl() {
        if (this.tl && this.tl.kill) this.tl.kill();
      }
    }, {
      key: "initTl",
      value: function initTl() {
        var _this3 = this;

        var visualPosition = {
          y: this.viewport.height / 2
        };
        this.killTl();
        TweenMax.set(this.visualOuter, {
          y: -this.visualOffset.top,
          x: -this.visualOffset.left
        });

        if (window.innerWidth >= 1200) {
          this.tl = new TimelineMax({
            onUpdate: function onUpdate() {
              TweenMax.set(_this3.visual, {
                y: visualPosition.y
              });
              TweenMax.set(_this3.visualInner, {
                y: -visualPosition.y
              });
            } // repeat: -1

          });
          this.tl.fromTo(visualPosition, .5, {
            y: this.visualBCR.height * 1.1
          }, {
            y: 0,
            ease: Power4.easeInOut
          });
          this.tl.progress(0.1);
          this.tl.progress(0);
          this.tl.pause();
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.link.removeEventListener('mouseenter', this.mouseEnterBind);
        this.link.removeEventListener('mouseleave', this.mouseLeaveBind);
        window.removeEventListener('resize', this.onResizeBind);
        this.$el.off(".".concat(EVENT_NAMESPACE$1));
      }
    }]);

    return _default;
  }(_default);

  var _default$D =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.events = {
        click: {
          toggler: 'toggle' // share: 'share'

        }
      };
      _this.shareLinks = _this.$('share');
      _this.shareBind = _this.share.bind(_assertThisInitialized(_this));

      for (var _i = 0, _Array$from = Array.from(_this.shareLinks); _i < _Array$from.length; _i++) {
        var share = _Array$from[_i];
        share.addEventListener('click', _this.shareBind);
      }

      return _this;
    }

    _createClass$1(_default, [{
      key: "toggle",
      value: function toggle() {
        this.el.classList.toggle('is-active');
      }
    }, {
      key: "share",
      value: function share(e) {
        e.preventDefault();
        var el = e.currentTarget;
        var platform = this.data('platform', el);
        var url = this.data('url', el);
        var shareUrl;

        switch (platform) {
          case 'facebook':
            shareUrl = 'https://facebook.com/sharer/sharer.php?u=' + url;
            this.openWindow(shareUrl);
            break;

          case 'twitter':
            shareUrl = 'https://twitter.com/share?url=' + url + '&amp;text=' + encodeURIComponent(this.data('text', el));
            this.openWindow(shareUrl);
            break;

          case 'mail':
            var subject = encodeURIComponent(this.data('subject', el));
            var body = encodeURIComponent(this.data('body', el));
            this.openMail(subject, body);
            break;
        }
      }
    }, {
      key: "openWindow",
      value: function openWindow(url) {
        window.open(url, 'Share', 'menubar=no, toolbar=no, resizable=yes, scrollbars=yes, height=500, width=600');
      }
    }, {
      key: "openMail",
      value: function openMail(subject, body) {
        window.location = 'mailto:?subject=' + subject + '&body=' + body;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        _get(_getPrototypeOf(_default.prototype), "destroy", this).call(this);

        for (var _i2 = 0, _Array$from2 = Array.from(this.shareLinks); _i2 < _Array$from2.length; _i2++) {
          var share = _Array$from2[_i2];
          share.removeEventListener('click', this.shareBind);
        }
      }
    }]);

    return _default;
  }(_default);

  var MSG_TYPE = {
    SUCCESS: 'success',
    ERROR: 'error'
  };
  var SUBMIT_LABEL = 'Submit';

  var _default$E =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m)); // this.events = {
      //     change: {
      //         input: 'onInputBlur'
      //     }
      // }

      _this.overlay = _this.$('overlay');
      _this.msgTitle = _this.$('msgtitle');
      _this.msgContent = _this.$('msgcontent');
      _this.msgError = _this.$('msgerror');
      _this.cta = _this.$('cta');
      _this.captchaId = null;
      _this.captcha = _this.$('captcha');
      _this.captchaKey = _this.data('sitekey');
      _this.inputs = _this.$('input');
      _this.overlayActive = false;
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        this.onSubmitBind = this.onSubmit.bind(this);
        this.el.addEventListener('submit', this.onSubmitBind);
        this.inputBlurBind = this.onInputBlur.bind(this);

        for (var _i = 0, _Array$from = Array.from(this.inputs); _i < _Array$from.length; _i++) {
          var field = _Array$from[_i];
          field.addEventListener('blur', this.inputBlurBind);
        }
      }
    }, {
      key: "onInputBlur",
      value: function onInputBlur(e) {
        if (e.currentTarget.value.length > 0) e.currentTarget.classList.add('is-filled');else e.currentTarget.classList.remove('is-filled');
      }
    }, {
      key: "onSubmit",
      value: function onSubmit(e) {
        var _this2 = this;

        e.preventDefault();
        e.stopPropagation();

        if (this.overlayActive) {
          this.overlay.classList.remove('is-active');
          this.overlayActive = false;
          this.cta.innerText = SUBMIT_LABEL;
          document.activeElement.blur();
          this.call("setActive", false, "Rainmoji", "form");
          return false;
        }

        this.el.classList.add('is-loading');

        if (this.validate()) {
          if (this.captchaId === null && this.captcha) {
            this.captchaId = window.grecaptcha.render(this.captcha, {
              sitekey: this.captchaKey,
              size: 'invisible',
              callback: function callback(token) {
                _this2.sendData();
              }
            });
            window.grecaptcha.execute(this.captchaId);
          } else {
            window.grecaptcha.reset(this.captchaId);
            window.grecaptcha.execute(this.captchaId);
          }
        } else {
          this.onError({
            message: "Error 400 : Bad request. Some required fields are not filled properly."
          });
        }

        document.activeElement.blur();
      }
    }, {
      key: "sendData",
      value: function sendData() {
        var _this3 = this;

        var fd = new FormData();
        var data = serializeArray(this.el);

        for (var key in data) {
          fd.append(data[key]['name'], data[key]['value']);
        }

        $.ajax({
          url: this.el.getAttribute('action'),
          type: 'post',
          data: fd,
          dataType: 'json',
          contentType: false,
          processData: false,
          success: function success(response) {
            if (!response.success) {
              _this3.onError(response);
            } else {
              _this3.onSuccess(response);
            }
          },
          error: function error(response) {
            _this3.onError(response);
          }
        });
      }
    }, {
      key: "onSuccess",
      value: function onSuccess(response) {
        this.call("resize", null, "Rainmoji", "form");
        this.call("setActive", true, "Rainmoji", "form");
        this.el.classList.remove('is-loading');
        this.message({
          title: "Message Sent!",
          content: "Thank you for reaching out!<br>We'll get back to you within 24 hours.",
          cta: "Send another message (Don't be shy)"
        });
        document.activeElement.blur();
      }
    }, {
      key: "onError",
      value: function onError(response) {
        this.el.classList.remove('is-loading');
        var errors = [];
        if (response.errors && response.errors.length) response.errors.forEach(function (error) {
          return errors.push(error);
        });
        if (response.message) errors.push(response.message);
        this.message({
          title: "An error occured",
          content: "Please try again and make sure to fill all required fields.<br>If it doesn't work, please reach us by mail or phone.",
          errors: errors,
          cta: "Try again"
        }, MSG_TYPE.ERROR);
        document.activeElement.blur();
      }
    }, {
      key: "message",
      value: function message(msg) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MSG_TYPE.SUCCESS;
        this.overlayActive = true;
        this.overlay.classList.add('is-active');
        var title;

        if (type == MSG_TYPE.ERROR) {
          title = "<span class=\"o-emojied is-active\"><span class=\"o-emojied_icon -warning\"></span><span class=\"o-emojied_content\">".concat(msg.title, "</span></span>");
        } else {
          title = msg.title;
        }

        this.msgTitle.innerHTML = title;
        this.msgContent.innerHTML = msg.content;

        if (msg.errors && msg.errors.length) {
          this.msgError.innerHTML = '';
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = msg.errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var error = _step.value;
              this.msgError.innerHTML += error + '<br>';
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        } else {
          this.msgError.innerHTML = '';
        }

        this.cta.innerText = msg.cta;
        if (type == MSG_TYPE.SUCCESS) this.reset();
      }
      /**
       * Validate the form
       * Custom validation
       *
       * @return boolean
       */

    }, {
      key: "validate",
      value: function validate() {
        var _this4 = this;

        // Required fields that are visible, meaning that are mandatory for the current category.
        var requiredFields = Array.from(this.$('input')).filter(function (candidate) {
          return _this4.data('required', candidate) != undefined;
        });
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = requiredFields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var el = _step2.value;
            el.classList.remove('-invalid');
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        var errors = false;
        requiredFields.forEach(function (el, i) {
          var $target = $(el);

          switch ($target.attr('type')) {
            case 'checkbox':
              if (!$target[0].checked) {
                $target.addClass('-invalid');
                errors = true;
              }

              break;

            case 'tel':
              var valid = false;
              var val = $target.val();
              if (val && val.length && /\d/.test(val)) valid = true;

              if (!valid) {
                $target.addClass('-invalid');
                errors = true;
              }

              break;

            default:
              if (!$target.val()) {
                $target.addClass('-invalid');
                errors = true;
              }

              break;
          }
        });
        return !errors;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.el.reset();

        for (var i = 0; i < this.el.length; i++) {
          this.el[i].classList.remove('is-filled');
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.el.removeEventListener('submit', this.onSubmitBind);

        for (var _i2 = 0, _Array$from2 = Array.from(this.inputs); _i2 < _Array$from2.length; _i2++) {
          var field = _Array$from2[_i2];
          field.removeEventListener('blur', this.inputBlurBind);
        }
      }
    }]);

    return _default;
  }(_default);

  var _default$F =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.events = {
        click: "videoLinkClick"
      };
      return _this;
    }

    _createClass$1(_default, [{
      key: "videoLinkClick",
      value: function videoLinkClick(e) {
        e.preventDefault();
        var el = e.currentTarget;
        var id = this.data('id', el);
        var host = this.data('host', el);
        this.call('openVideo', {
          id: id,
          host: host
        }, 'Videomodal');
      }
    }]);

    return _default;
  }(_default);

  var MODULE_NAME$2 = 'CarouselClient';
  var EVENT_NAMESPACE$2 = "".concat(APP_NAME, ".").concat(MODULE_NAME$2);
  var CLASS = {
    CHANGE: "is-changing"
  };
  var EVENT$4 = {
    PLAY: "play.".concat(EVENT_NAMESPACE$2)
  };

  var _default$G =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.container = _this.$('container');
      _this.prev = _this.$('prev');
      _this.next = _this.$('next');
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.$el = $(this.el);
        this.carousel = new Swiper(this.container, {
          speed: 0,
          loop: true,
          slidesPerColumn: 1,
          slidesPerGroup: 4,
          slidesPerView: 4,
          grabCursor: false,
          slideToClickedSlide: true,
          watchSlidesProgress: true,
          watchSlidesVisibility: true,
          disableOnInteraction: true,
          navigation: {
            nextEl: this.next,
            prevEl: this.prev
          },
          autoplay: {
            delay: 5000
          }
        });
        this.carousel.autoplay.stop();

        this.slideChangeBind = function (param) {
          _this2.slideChange();
        };

        this.carousel.on('slideChange', this.slideChangeBind);

        this.onPlayBind = function (e) {
          if (e.way == 'enter') {
            _this2.carousel.autoplay.start();
          } else {
            _this2.carousel.autoplay.stop();
          }
        };

        this.$el.on(EVENT$4.PLAY, this.onPlayBind);
      }
    }, {
      key: "slideChange",
      value: function slideChange() {
        var _this3 = this;

        this.container.classList.add(CLASS.CHANGE);
        setTimeout(function () {
          _this3.container.classList.remove(CLASS.CHANGE);
        }, 600);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.$el.off(EVENT$4.PLAY, this.onPlayBind);
        this.carousel.destroy();
      }
    }]);

    return _default;
  }(_default);

  var MODULE_NAME$3 = 'CarouselClientMobile';
  var EVENT_NAMESPACE$3 = "".concat(APP_NAME, ".").concat(MODULE_NAME$3);
  var CLASS$1 = {
    CHANGE: "is-changing"
  };
  var EVENT$5 = {
    PLAY: "play.".concat(EVENT_NAMESPACE$3)
  };

  var _default$H =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.container = _this.$('container');
      _this.prev = _this.$('prev');
      _this.next = _this.$('next');
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.$el = $(this.el);
        this.carousel = new Swiper(this.container, {
          speed: 0,
          loop: true,
          slidesPerGroup: 2,
          slidesPerView: 2,
          grabCursor: false,
          slideToClickedSlide: true,
          watchSlidesProgress: true,
          watchSlidesVisibility: true,
          disableOnInteraction: true,
          navigation: {
            nextEl: this.next,
            prevEl: this.prev
          },
          autoplay: {
            delay: 5000
          }
        });
        this.carousel.autoplay.stop();

        this.slideChangeBind = function (param) {
          _this2.slideChange();
        };

        this.carousel.on('slideChange', this.slideChangeBind);

        this.onPlayBind = function (e) {
          if (e.way == 'enter') {
            _this2.carousel.autoplay.start();
          } else {
            _this2.carousel.autoplay.stop();
          }
        };

        this.$el.on(EVENT$5.PLAY, this.onPlayBind);
      }
    }, {
      key: "slideChange",
      value: function slideChange() {
        var _this3 = this;

        this.container.classList.add(CLASS$1.CHANGE);
        setTimeout(function () {
          _this3.container.classList.remove(CLASS$1.CHANGE);
        }, 600);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.$el.off(EVENT$5.PLAY, this.onPlayBind);
        this.carousel.destroy();
      }
    }]);

    return _default;
  }(_default);

  var CLASS$2 = {
    OPENREEL: "has-video-reel-open",
    SHOWTEASE: "has-video-reel-tease",
    ACTIVE: "-active",
    HOLD: "-hold"
  };

  var _default$I =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.events = {
        click: 'toggleReel',
        mouseenter: 'mouseEnter',
        mouseleave: 'mouseLeave'
      };
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        this.isOpen = false;
      }
    }, {
      key: "mouseEnter",
      value: function mouseEnter() {
        var _this2 = this;

        if (!isMobile) {
          this.call('playVideo', null, 'Videoreel');
          html.classList.add(CLASS$2.SHOWTEASE);
          html.classList.add(CLASS$2.ACTIVE);
          html.classList.add(CLASS$2.HOLD);
          this.hoverTimeout = setTimeout(function () {
            _this2.open();
          }, 1000);
        }
      }
    }, {
      key: "mouseLeave",
      value: function mouseLeave() {
        if (!isMobile) {
          clearTimeout(this.hoverTimeout);

          if (!this.isOpen) {
            html.classList.remove(CLASS$2.SHOWTEASE);
            html.classList.remove(CLASS$2.ACTIVE);
            html.classList.remove(CLASS$2.HOLD);
            this.call('pausedVideo', null, 'Videoreel');
          }
        }
      }
    }, {
      key: "toggleReel",
      value: function toggleReel() {
        if (this.isOpen) {
          this.close();
        } else {
          this.open();
        }
      }
    }, {
      key: "open",
      value: function open() {
        clearTimeout(this.hoverTimeout);

        if (isMobile) {
          this.call('playVideo', null, 'Videoreel');
        }

        this.isOpen = true;
        html.classList.add(CLASS$2.OPENREEL);
        html.classList.remove(CLASS$2.SHOWTEASE);
        html.classList.remove(CLASS$2.ACTIVE);
        html.classList.remove(CLASS$2.HOLD);
      }
    }, {
      key: "close",
      value: function close() {
        this.call('pausedVideo', null, 'Videoreel');
        this.isOpen = false;
        html.classList.remove(CLASS$2.OPENREEL);
      }
    }]);

    return _default;
  }(_default);

  var MODULE_NAME$4 = 'VideoReel';
  var EVENT_NAMESPACE$4 = "".concat(APP_NAME, ".").concat(MODULE_NAME$4);

  var _default$J =
  /*#__PURE__*/
  function (_module) {
    _inherits(_default, _module);

    function _default(m) {
      var _this;

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, m));
      _this.events = {
        click: {
          close: "close",
          sound: "toggleMute"
        }
      };
      _this.$iframe = _this.$('iframe');
      _this.$sound = _this.$('sound');

      _this.resize();

      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        this.isMute = true;
        this.player = new Player(this.$iframe);
      }
    }, {
      key: "playVideo",
      value: function playVideo() {
        this.player.setCurrentTime(0);
        this.player.play();
      }
    }, {
      key: "pausedVideo",
      value: function pausedVideo() {
        this.player.pause();
      }
    }, {
      key: "toggleMute",
      value: function toggleMute() {
        if (this.isMute) {
          this.mute();
        } else {
          this.unMute();
        }
      }
    }, {
      key: "mute",
      value: function mute() {
        this.isMute = false;
        this.player.setVolume(0);
        this.$sound.classList.add('-mute');
      }
    }, {
      key: "unMute",
      value: function unMute() {
        this.isMute = true;
        this.player.setVolume(1);
        this.$sound.classList.remove('-mute');
      }
    }, {
      key: "resize",
      value: function resize() {
        var screenRatio = window.innerWidth / window.innerHeight; // // let iframeBCR = this.$iframe[0].getBoundingClientRect()

        var iframeRatio = 16 / 9;

        if (window.innerWidth < 1000 && window.innerWidth / window.innerHeight < 1) {
          TweenMax.set(this.$iframe, {
            width: window.innerWidth,
            height: window.innerWidth * (1 / iframeRatio)
          });
        } else {
          if (screenRatio > iframeRatio) {
            // stretch width
            TweenMax.set(this.$iframe, {
              width: window.innerWidth,
              height: window.innerWidth * (1 / iframeRatio)
            });
          } else {
            // stretch height
            TweenMax.set(this.$iframe, {
              width: window.innerHeight * iframeRatio,
              height: window.innerHeight
            });
          }
        }
      }
    }, {
      key: "close",
      value: function close() {
        this.call('close', null, 'Videoreeltoggler');
      }
    }, {
      key: "destroy",
      value: function destroy() {
        _get(_getPrototypeOf(_default.prototype), "destroy", this).call(this);

        this.$el.off(".".concat(EVENT_NAMESPACE$4));
        $document.off(".".concat(EVENT_NAMESPACE$4));
        $window.off(".".concat(EVENT_NAMESPACE$4));
        this.player.destroy();
        this.player = null;
      }
    }]);

    return _default;
  }(_default);



  var modules = /*#__PURE__*/Object.freeze({
    Load: _default$3,
    Scroll: _default$a,
    Menutoggler: _default$b,
    Headerlogo: _default$c,
    Intro: _default$d,
    Intromask: _default$e,
    Punchline: _default$f,
    Featureslist: _default$h,
    Articlespreview: _default$i,
    Loopingpunchlines: _default$j,
    Footer: _default$k,
    Rail: _default$l,
    Nav: _default$m,
    Navdot: _default$n,
    Navmain: _default$o,
    Bars: _default$p,
    Expandingcircle: _default$q,
    Quotescarousel: _default$r,
    Teamlist: _default$s,
    Teammodal: _default$t,
    Rainmoji: _default$u,
    Accordions: _default$v,
    Commandments: _default$w,
    Linebyline: _default$x,
    Filters: _default$y,
    Carousel: _default$z,
    Videomodal: _default$A,
    Next: _default$C,
    Share: _default$D,
    Form: _default$E,
    Videotoggler: _default$F,
    Vimeoplayer: _default$B,
    Carouselclient: _default$G,
    Carouselclientmobile: _default$H,
    Videoreeltoggler: _default$I,
    Videoreel: _default$J
  });

  var svg4everybody = createCommonjsModule(function (module) {
  !function(root, factory) {
        module.exports ? // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory() : root.svg4everybody = factory();
  }(commonjsGlobal, function() {
      /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
      function embed(parent, svg, target) {
          // if the target exists
          if (target) {
              // create a document fragment to hold the contents of the target
              var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
              // conditionally set the viewBox on the svg
              viewBox && svg.setAttribute("viewBox", viewBox);
              // copy the contents of the clone into the fragment
              for (// clone the target
              var clone = target.cloneNode(!0); clone.childNodes.length; ) {
                  fragment.appendChild(clone.firstChild);
              }
              // append the fragment into the svg
              parent.appendChild(fragment);
          }
      }
      function loadreadystatechange(xhr) {
          // listen to changes in the request
          xhr.onreadystatechange = function() {
              // if the request is ready
              if (4 === xhr.readyState) {
                  // get the cached html document
                  var cachedDocument = xhr._cachedDocument;
                  // ensure the cached html document based on the xhr response
                  cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), 
                  cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
                  xhr._embeds.splice(0).map(function(item) {
                      // get the cached target
                      var target = xhr._cachedTarget[item.id];
                      // ensure the cached target
                      target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), 
                      // embed the target into the svg
                      embed(item.parent, item.svg, target);
                  });
              }
          }, // test the ready state change immediately
          xhr.onreadystatechange();
      }
      function svg4everybody(rawopts) {
          function oninterval() {
              // while the index exists in the live <use> collection
              for (// get the cached <use> index
              var index = 0; index < uses.length; ) {
                  // get the current <use>
                  var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");
                  if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), 
                  svg && src) {
                      if (polyfill) {
                          if (!opts.validate || opts.validate(src, svg, use)) {
                              // remove the <use> element
                              parent.removeChild(use);
                              // parse the src and get the url and id
                              var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
                              // if the link is external
                              if (url.length) {
                                  // get the cached xhr request
                                  var xhr = requests[url];
                                  // ensure the xhr request exists
                                  xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), 
                                  xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                                  xhr._embeds.push({
                                      parent: parent,
                                      svg: svg,
                                      id: id
                                  }), // prepare the xhr ready state change event
                                  loadreadystatechange(xhr);
                              } else {
                                  // embed the local id into the svg
                                  embed(parent, svg, document.getElementById(id));
                              }
                          } else {
                              // increase the index when the previous value was not "valid"
                              ++index, ++numberOfSvgUseElementsToBypass;
                          }
                      }
                  } else {
                      // increase the index when the previous value was not "valid"
                      ++index;
                  }
              }
              // continue the interval
              (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
          }
          var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;
          polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
          // create xhr requests object
          var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;
          // conditionally start the interval if the polyfill is active
          polyfill && oninterval();
      }
      function getSVGAncestor(node) {
          for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}
          return svg;
      }
      return svg4everybody;
  });
  });

  function globals () {
    svg4everybody();
    window.isMobile = isMobile$1;

    if (isMobile$1) {
      document.documentElement.classList.add('is-mobile');
    }
  }

  window.app = {
    menuOpen: false
  };
  window.addEventListener('load', function () {
    document.documentElement.scrollTop = 0;
    requestAnimationFrame(function () {
      var app = new _default$1({
        modules: modules
      });
      app.init(app);
      globals();
      var isDesktopResolution = window.innerWidth > 1200;
      window.addEventListener('resize', function () {
        if (isDesktopResolution && window.innerWidth <= 1200) location.reload();
        if (!isDesktopResolution && window.innerWidth > 1200) location.reload();
      });
      html.classList.add('is-loaded');
      html.classList.add('is-ready');
      html.classList.add('is-first-blood');
      html.classList.remove('is-loading'); // Add youtube API

      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = function () {
        window.ytAPIReady = true;
        $document.triggerHandler('ytAPIReady');
      };
    });
  });

}());
//# sourceMappingURL=app.js.map

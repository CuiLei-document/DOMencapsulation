// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"dom.js":[function(require,module,exports) {
window.dom = {
  // 创建标签
  create: function create(string) {
    //先创建一个万能的标签template
    var container = document.createElement('template');
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  //在元素的后面插入一个节点
  after: function after(node, node2) {
    //打印出node的下一个节点是什么 nextSibling 下一个的意思
    console.log(node.nextSibling); // 找到node的爸爸用node的爸爸的方法把node2插入到node的前面

    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  //在元素的前面插入一个节点
  before: function before(node, node2) {
    //node的爸爸的方法把node2插入到node的前面
    node.parentNode.insertBefore(node2, node);
  },
  // 增加儿子节点
  append: function append(parent, node) {
    // appendChild 创建子节点
    parent.appendChild(node);
  },
  // 增加爸爸节点
  wrap: function wrap(node, parent) {
    // 先把这个节点插入到当前节点的前面
    dom.before(parent, node); // 然后把当前节点移到节点的里面

    dom.append(parent, node);
  },
  //删除节点
  remove: function remove(node) {
    // node当前节点的parentNode爸爸删掉removeChild孩子
    node.parentNode.removeChild(node); // 删除节点可以得到被删掉的节点

    return node;
  },
  //删除所有儿子节点
  empty: function empty(node) {
    // array用来保存删除的节点
    var array = []; // x 表示第一个孩子

    var x = node.firstChild;

    while (x) {
      // 如果x第一个孩子存在 就删掉 并把删掉的节点push到array里面 
      array.push(dom.remove(node.firstChild)); // x 表示被删掉以后新的孩子

      x = node.firstChild;
    }

    return array;
  },
  // 改·读·写属性
  // 用于读写属性
  //三个属性值，用于标签的属性和值
  attr: function attr(node, name, value) {
    // 重载
    // 如果attr的值长度为3 就添加属性值
    if (arguments.length === 3) {
      //标签添加名字和属性值
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      // 如果attr的长度为2 就获取 属性值   
      return node.getAttribute(name, value);
    }
  },
  // 更改标签的内容
  text: function text(node, string) {
    // 适配
    if (arguments.length === 2) {
      // 如果node里面有 innerText这个属性就执行下面的
      if ("innerText" in node) {
        // 如 div的innerText内容为 string是什么
        node.innerText = string;
      } else {
        // 如果Node没有 就执行下面的代码
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        // 获取text的内容
        return node.innerText;
      } else {
        // 获取text的内容
        return node.textContent;
      }
    }
  },
  html: function (_html) {
    function html(_x, _x2) {
      return _html.apply(this, arguments);
    }

    html.toString = function () {
      return _html.toString();
    };

    return html;
  }(function (node, string) {
    // 如果 属性的长度为2 就更改内容
    if (arguments.length === 2) {
      html.innerHTML = string;
    } else if (arguments.length === 1) {
      // 如果长度为2 就获取内容
      return this.html.innerHTML;
    }
  }),
  // 修改style 
  style: function style(node, name, value) {
    //如果长度为3 就是修改style
    if (arguments.length === 3) {
      // dom.style(div, `color`, `red`)
      node.style[name] = value;
    } else if (arguments.length === 2) {
      // 如果长度为2 就是获取style属性
      if (typeof name === "string") {
        // 如果name的属性是 字符串 就执行下面代码
        // dom.style[div, `color`]
        return node.style[name];
      } else if (name instanceof Object) {
        // 如果 name的属性是个对象 就执行下面代码
        // dom.style(div, {color: `red`})
        var object = name;

        for (var key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  // 读写class类名
  class: {
    // 添加类名
    add: function add(node, className) {
      node.classList.add(className);
    },
    // 删除类名
    remove: function remove(node, className) {
      node.classList.remove(className);
    },
    // 查看是否有这个类名 有true 没有false
    has: function has(node, className) {
      return node.classList.contains(className);
    }
  },
  // 点击事件
  on: function on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  // 删除点击事件
  off: function off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  // 查看标签和标签们
  //查看
  find: function find(selector, scope) {
    // 比如 查看empty 就用scope范围没有就用document
    return (scope || document).querySelectorAll(selector);
  },
  // 获取父元素
  parent: function parent(node) {
    return node.parentNode;
  },
  // 获取子元素
  children: function children(node) {
    return node.children;
  },
  // 获取兄弟姐妹元素
  siblings: function siblings(node) {
    // 把node的父亲第一个儿子(伪数组)转换为数组进行
    // 过滤.filter不包括自己
    return Array.from(node.parentNode.children).filter(function (n) {
      return n !== node;
    });
  },
  // 下一个节点
  next: function next(node) {
    // x 表示下一个节点
    var x = node.nextSibling;

    while (x && x.nodeType === 3) {
      // 如果 x下一个节点是nodeType === 文本3
      // 就还下一个节点比较 
      x = x.nextSibling;
    } // 如果还不是 还是返回


    return x;
  },
  // 获取上一个节点
  previous: function previous(node) {
    // x 表示 上一个节点
    var x = node.previousSibling;

    while (x && x.nodeType === 3) {
      // 如果 x 的上一个节点是 nodeType 文本3
      // 就返回上一个节点
      x = x.previousSibling;
    } // 返回 X


    return x;
  },
  // 遍历所有节点
  each: function each(nodeList, fn) {
    // 遍历节点 nodeList 然后fn调用nodeList[i] 每一项
    for (var i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  // 获取元素排行老几
  index: function index(node) {
    // 找到node的爸爸第一个孩子
    var list = dom.children(node.parentNode);
    var i;

    for (i = 0; i < list.length; i++) {
      // 遍历list里面的孩子 如果等于了自己就结束dd
      if (list[i] === node) {
        break;
      }
    }

    return i;
  }
};
},{}],"C:/Users/DELL/AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51070" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/DELL/AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js","dom.js"], null)
//# sourceMappingURL=/dom.1d0b6d56.js.map
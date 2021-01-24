window.dom = {
    // 创建标签
    create(string) {
        //先创建一个万能的标签template
        const container = document.createElement('template')
        container.innerHTML = string.trim()
        return container.content.firstChild
    },
    //在元素的后面插入一个节点
    after(node, node2){
        //打印出node的下一个节点是什么 nextSibling 下一个的意思
        console.log(node.nextSibling)
        // 找到node的爸爸用node的爸爸的方法把node2插入到node的前面
        node.parentNode.insertBefore(node2,node.nextSibling)
    },
    //在元素的前面插入一个节点
    before(node, node2){
        //node的爸爸的方法把node2插入到node的前面
        node.parentNode.insertBefore(node2, node)
    },
    // 增加儿子节点
    append(parent, node){
        // appendChild 创建子节点
        parent.appendChild(node)
    },                                               
    // 增加爸爸节点
    wrap(node, parent){
        // 先把这个节点插入到当前节点的前面
          dom.before(parent, node)
        // 然后把当前节点移到节点的里面
          dom.append(parent, node)
    },
    //删除节点
    remove(node){
        // node当前节点的parentNode爸爸删掉removeChild孩子
        node.parentNode.removeChild(node)
        // 删除节点可以得到被删掉的节点
        return node
    },
    //删除所有儿子节点
    empty(node){
        // array用来保存删除的节点
        const array = []
        // x 表示第一个孩子
        let x = node.firstChild
        while(x){
           // 如果x第一个孩子存在 就删掉 并把删掉的节点push到array里面 
            array.push(dom.remove(node.firstChild))
           // x 表示被删掉以后新的孩子
            x = node.firstChild
        }
        return array
    },
    // 改·读·写属性
    // 用于读写属性
    //三个属性值，用于标签的属性和值
    attr(node,name,value){ // 重载
        // 如果attr的值长度为3 就添加属性值
        if(arguments.length ===3){
        //标签添加名字和属性值
            node.setAttribute(name,value)
        } else if(arguments.length ===2){
         // 如果attr的长度为2 就获取 属性值   
            return node.getAttribute(name,value)
        }
    },
    // 更改标签的内容
    text(node, string){ // 适配
        if(arguments.length ===2){
            // 如果node里面有 innerText这个属性就执行下面的
            if(`innerText` in node){
             // 如 div的innerText内容为 string是什么
            node.innerText = string
            }else{
                // 如果Node没有 就执行下面的代码
                node.textContent = string
            }
        }else if(arguments.length ===1){
            if(`innerText` in node){
                // 获取text的内容
                return node.innerText
            }else{
                // 获取text的内容
                return node.textContent
            }
        }
    },
    html(node,string){
        // 如果 属性的长度为2 就更改内容
        if(arguments.length ===2){
            html.innerHTML = string
        }else if(arguments.length ===1){
        // 如果长度为2 就获取内容
            return this.html.innerHTML
        }
     },
     // 修改style 
     style(node,name,value){
         //如果长度为3 就是修改style
         if(arguments.length ===3) {
             // dom.style(div, `color`, `red`)
             node.style[name] = value
         }else if(arguments.length ===2){
             // 如果长度为2 就是获取style属性
             if(typeof name === `string`){
             // 如果name的属性是 字符串 就执行下面代码
             // dom.style[div, `color`]
             return node.style[name]
             }else if(name instanceof Object){
                 // 如果 name的属性是个对象 就执行下面代码
                 // dom.style(div, {color: `red`})
                 const object = name
                 for(let key in object){
                     node.style[key] = object[key]
                 }
             }
         }
    },
    // 读写class类名
    class: {
        // 添加类名
        add(node, className){
            node.classList.add(className)
        },
        // 删除类名
        remove(node, className){
            node.classList.remove(className)
        },
        // 查看是否有这个类名 有true 没有false
        has(node,className){
            return node.classList.contains(className)
        }
    },
    // 点击事件
    on(node,eventName, fn){
        node.addEventListener(eventName, fn)
    },
    // 删除点击事件
    off(node,eventName, fn){
      node.removeEventListener(eventName, fn)  
    },
    // 查看标签和标签们
    //查看
    find(selector, scope){
    // 比如 查看empty 就用scope范围没有就用document
    return (scope || document).querySelectorAll(selector)
    },
    // 获取父元素
    parent(node){
        return node.parentNode
    },
    // 获取子元素
    children(node){
        return node.children
    },
    // 获取兄弟姐妹元素
    siblings(node){
        // 把node的父亲第一个儿子(伪数组)转换为数组进行
        // 过滤.filter不包括自己
        return Array.from(node.parentNode.children)
        .filter(n => n!==node)
    },
    // 下一个节点
    next(node){
        // x 表示下一个节点
       let  x = node.nextSibling
        while(x && x.nodeType ===3){
            // 如果 x下一个节点是nodeType === 文本3
            // 就还下一个节点比较 
            x = x.nextSibling
        }
        // 如果还不是 还是返回
        return x
    },
    // 获取上一个节点
    previous(node){
        // x 表示 上一个节点
       let  x = node.previousSibling
        while(x && x.nodeType ===3){
            // 如果 x 的上一个节点是 nodeType 文本3
            // 就返回上一个节点
            x = x.previousSibling
        }
        // 返回 X
        return x
    },
    // 遍历所有节点
    each(nodeList, fn){
        // 遍历节点 nodeList 然后fn调用nodeList[i] 每一项
        for(let i=0; i < nodeList.length; i++){
            fn.call(null, nodeList[i])
        }
    },
    // 获取元素排行老几
    index(node){
        // 找到node的爸爸第一个孩子
        const list = dom.children(node.parentNode)
        let i
        for(i=0; i< list.length; i++){
            // 遍历list里面的孩子 如果等于了自己就结束dd
            if(list[i] === node){
                break;
            }
        }
        return i
    }
};
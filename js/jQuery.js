window.jQuery = function (selectorOrArray){
    let elements;
    if (typeof selectorOrArray === "string"){
        elements = document.querySelectorAll(selectorOrArray);
    }else if (selectorOrArray instanceof Array){
        elements = selectorOrArray;
    }

    jQuery.prototype = {
        oldApi:selectorOrArray.oldApi,
        addClass(className){
            for (let i= 0;i<elements.length;i++){
                elements[i].classList.add(className);
            }

            // if (this !== this.oldApi){
            //     return this.oldApi = this
            // }
            return this;
        },
        find(selector){
            let array = [];
            for (let i=0;i<elements.length;i++){
                const elements2 = Array.from(elements[i].querySelectorAll(selector));
                array = array.concat(elements2);
            }
            //this 就是 旧的api
            // array.oldApi 就是 当前 return 出去的 {}
            array.oldApi = this;
            return jQuery(array);

        },
        end(){
            console.log(this.oldApi);
            return this.oldApi; //this是新的api
        },
       each(fn){
            for (let i=0;i<elements.length;i++){
               fn.call(null,elements[i],i);
            }
            return this;
       },
        parent(){
            const array = [];
            this.each((node)=>{
                if (array.indexOf(node.parentNode) === -1){
                    array.push(node.parentNode);
                }
            })
            return  jQuery(array);
        },
        children(){
            const array = [];
            this.each((node)=>{
              array.push(...node.children);
            })
            return jQuery(array);
        },
        print() {
            console.log(elements);
        },
        appendTo(node){
            if(node instanceof Element){
                this.each(el => node.appendChild(el)) // 遍历 elements，对每个 el 进行 node.appendChild 操作
            }else if(node.jQuery === true){
                this.each(el => node.get(0).appendChild(el))  // 遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
            }
        },
    }
}

window.$ = window.jQuery;




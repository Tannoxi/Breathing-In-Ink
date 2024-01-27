let index = 0;
let oImgList  = document.querySelector('.img-container');

let clonefirstImg = oImgList.firstElementChild.cloneNode();
oImgList.appendChild(clonefirstImg);

function createAuto() {
    return setInterval(() => {
        index++
        refresh()
    }, 4000)
}

let autoTimer = createAuto()




function refresh(){

    if (index < 0){
        index = 5 ;

    }else if (index === 5){
        setTimeout(() => {
            index = 0;
            oImgList.style.left = 0;
            // 取消过渡 2000毫秒之后切换第一张
            oImgList.style.transition = "none";
        }, 2000);
    }

    //获取carousel的div元素 
    let carousel = document.querySelector(".carousel");

    //读取carousel的width 
    let width = getComputedStyle(carousel).width
    //slice函数去掉width的px，仅保留数值 
    width = Number(width.slice(0,-2));

    //修改container的left的值实现轮播图
    carousel.querySelector('.img-container').style.left = 
        index * width * -1 + 'px';
    oImgList.style.transition ="2s ease-in-out"

}

let refreshWrapper = (func) =>{
    //refresh装饰器
    return function (...args) {
        let result = func(...args)
        refresh()

        // 重置自动滚动
        clearInterval(autoTimer)
        autoTimer = createAuto()
        return result
    }
}


let leftshift = refreshWrapper(() =>{
    index--
})
let rightshift = refreshWrapper(() =>{
    index++
})
let setIndex = refreshWrapper((idx) =>{
    index = idx
})

refresh()
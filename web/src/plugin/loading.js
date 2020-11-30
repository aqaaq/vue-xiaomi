import { Loading } from 'element-ui';
let num = 0,
    loadingInstance;

function showLoading() {
    if (num === 0) {
        loadingInstance = Loading.service({
            title: "加载中..."
        })
    }
    num++;
}

function closeLoading() {
    if(num<=0){
        return
    }
    if (num === 1) {
        loadingInstance.close();
    }
    num--;
}
export {
    showLoading,
    closeLoading
}
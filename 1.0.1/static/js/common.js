/**
 * Created by Echonessy on 2018/10/19.
 */
window.Echo = {}
Echo.ajax = Echo.ajax || {};

( function(ajax) {
    function thisAjax (tpStr, url, data, success, err,isAsync) {
        $.ajax({
            type: tpStr || 'post',
            url: url,
            data: data,
            timeout: 30000,//30秒
            cache: false,
            async: isAsync,
//            dataType:"json",
            beforeSend: function (XHR) {
                console.log("start=="+isAsync+new Date());
                if (tpStr=="post"||tpStr=="put"||tpStr=="delete") {
                    var _csrfToken=$("._csrf").val(); // 后期csrf加密
                    if(_csrfToken) {
                        XHR.setRequestHeader("x-csrf-token",_csrfToken);
                    }
                    var _guardToken=$("#_guardToken").val();
                    if(_guardToken) {
                        XHR.setRequestHeader("guard-token",_guardToken);
                    }
                }
            },
            success: success,
            error:  function (xml, status) {
                if(xml && xml.responseText){
                    var errResult;
                    try{
                        errResult=JSON.parse(xml.responseText);
                        console.log(errResult.msg);
                        err&&err(errResult);
                        //无效的上下文，跳转到默认
                        if(errResult.status==-4){
                            location.href='/index';
                        }
                        return;
                    }catch(e){
                        console.log(xml.responseText);
                    }
                }else{
                    console.log("请求没有响应");
                }
                err&&err(xml);
            }
        });
    };
    
    ajax.get = function  (url, data, success, error,isAsync) {
        if(isAsync == undefined || isAsync == null){
            isAsync = true;
        }
        thisAjax('get', url, data, success, error,isAsync);
    };

    ajax.post = function (url, data, success, error,isAsync) {
        if(isAsync == undefined || isAsync == null){
            isAsync = true;
        }
        thisAjax('post', url, data, success, error,isAsync);
    };
    return ajax;
})(Echo.ajax || {});
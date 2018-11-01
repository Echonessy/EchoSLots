/**
 * Created by Echonessy on 2018/10/18.
 */

$(function () {
    //抽奖触发事件
    ClickEvt();
    function ClickEvt() {
        $('#StartBtn').on('click',function () {
            $(this).attr('disabled','disabled');
            StartSlot()
        });
    }
    function randomNum (a, b){
        var random = Math.floor(Math.random()*(b-a+1)+a);
        return random;
    }
    function toStr(str) {
        return str.toString();
    }
    function GetSweepstake() {
        var a = randomNum(0,2);
        var b = randomNum(0,2);
        var c = randomNum(0,2);
        var isWin = '';
        if(a == b && b == c && c == a ) {
            isWin = '中奖啦！！！中奖信息 =>>>';
        } else {
            isWin = '未中奖...中奖信息 =>>>';
        }
        var winPrize = toStr(a)+toStr(b)+toStr(c);
        console.log('-----------中奖信息---Start------------')
        console.log(isWin+winPrize)
        console.log('-----------中奖信息---End------------')
        var resData = {};
        resData.result = 'success';
        resData.data = winPrize;
        resData.msg = isWin+winPrize;
        return resData
    }



    //动画抽奖事件
    function StartSlot() {
        // var Url = '/slots/sweepstake'
        // Echo.ajax.post(Url,null,function (data) {
        //     var SingleHeight = 147.305; //单个盒子的高度
        //     var Result=data.data;//中奖随机数 ,'000','111','222'，
        //     $('#Music').attr('src',"/static/music/start.mp3").get(0).play();
        //     $("#SlotList dd").slots(SingleHeight,(Result), function () {
        //         console.log('结果'+Result)
        //         $('#Music').attr('src',"/static/music/end.mp3").get(0).play();
        //         // alert(data.msg)
        //         AutoClose(data.msg)
        //         $('#StartBtn').removeAttr('disabled')
        //     });
        // })
        $('#Music').attr('src',"./static/music/start.mp3").get(0).play();
        var Data  = GetSweepstake()
        var SingleHeight = 147.305; //单个盒子的高度
        var Result = Data.data;//中奖随机数 ,'000','111','222'，
        $("#SlotList dd").slots(SingleHeight,(Result), function () {
            console.log('结果'+Result)
            $('#Music').attr('src',"./static/music/end.mp3").get(0).play();
            $('#StartBtn').removeAttr('disabled')
            AutoClose(Data.msg)
        });
    }
//    自动关闭弹窗
    function AutoClose(msg) {
        $('#Result').html(msg).stop(true).fadeIn(150);
        var Timer = null;
        if(Timer) {clearTimeout(Timer)}
        Timer = setTimeout(function () {
            $('#Result').html('').stop(true).fadeOut(150);
        },3000)
    }


})

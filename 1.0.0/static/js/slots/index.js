/**
 * Created by Echonessy on 2018/10/18.
 */

$(function () {
    //Swiper滑动结束回调
    function CallBackSlide(i) {
        var bg = './static/img/bg'+i+'.png';
        $('#TopTab').css('background-image','url("'+bg+'")');
    }
    //初始化Swiper
    var  mySwiper = new Swiper('#TabContent', {
        autoHeight: true,
        on: {
            slideChangeTransitionEnd: function () {
                CallBackSlide(this.activeIndex)
            },
        },
    });
    //动画抽奖事件
    function StartSlot() {
        // var Url = '/slots/sweepstake'
        // Echo.ajax.post(Url,null,function (data) {
        //     var SingleHeight = 157.4; //单个盒子的高度
        //     var Result=data.data;//中奖随机数 ,'000','111','222'，
        //     $("#SlotList dd").slots(SingleHeight,(Result), function () {
        //         console.log('结果'+Result)
        //         alert(data.msg)
        //         $('#StartBtn').removeAttr('disabled')
        //         $(this).attr('src','./static/img/btn0.png')
        //     });
        // })
        var Data  = GetSweepstake()
        var SingleHeight = 157.4; //单个盒子的高度
        var Result = Data.data;//中奖随机数 ,'000','111','222'，
        $("#SlotList dd").slots(SingleHeight,(Result), function () {
            console.log('结果'+Result)
            alert(Data.msg)
            $('#StartBtn').removeAttr('disabled')
            $(this).attr('src','./static/img/btn0.png')
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


    //抽奖触发事件
    ClickEvt();
    function ClickEvt() {
        $('#StartBtn').on('click',function () {
            $(this).attr('disabled','disabled')
            $(this).attr('src','./static/img/btn1.png')
            StartSlot()
        });
        $('#TopTab>button').on('click',function () {
            var i = $(this).index();
            var bg = './static/img/bg'+i+'.png';
            $('#TopTab').css('background-image','url("'+bg+'")');
            mySwiper.slideTo(i, 700, false);//切换到第一个slide，速度为1秒
        });
    }
    //列表模板
    function PrizeTemplate(data) {
        var Html = '';
        Html += '<li>';
        if(!data.used) {
            Html += '<img src="'+data.imgSrc+'" alt="" class="Advert">';
        } else {
            Html += '<img src="'+data.imgSrc+'" alt="" class="Advert Gray">';
        }
        Html += '<p class="ListTit">'+data.title+'</p>';
        Html += '<ul class="Intro">';
        if(!data.used) {
            Html += '<li>'+data.time+'</li>';
            Html += '<li>'+data.intro+'</li>';
        }
        Html += '</ul>';
        if(!data.used) {
            Html += '<img class="GetImg" src="./static/img/get0.png" alt="">';
        } else {
            Html += '<img class="GetImg" src="./static/img/get1.png" alt="">';
        }
        Html += '</li>';
        return Html;
    }
    //获取抽奖列表
    GetPrizeData()
    function GetPrizeData() {
        var Url = './mork/getPrizeData.json'
        Echo.ajax.get(Url,null,function (data) {
            var Html = '';
            var List = data
            $.each(List,function (i,obj) {
                Html+=PrizeTemplate(obj);
            })
            $("#PrizeList").html(Html);
        })
    }
});
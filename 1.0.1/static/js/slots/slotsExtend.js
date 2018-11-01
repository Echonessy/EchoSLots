/**
 * Created by Echonessy on 2018/10/18.
 */


jQuery.extend({
    Success: function (b, a) {
    //    拓展抽奖结束回调
    }
});
var isBegin = false;
jQuery.fn.extend({
    slots: function (b, a, d) {
        if (isBegin) {
            return false
        }
        isBegin = true;
        let c = (a + "").split("");
        $(this).css("backgroundPositionY", - 0.48+'rem');
        // 60  3*20 30 10*3
        $(this).each(function (e) {
            let f = $(this);
            setTimeout(function () {
                f.animate(
                    {backgroundPositionY: (((b * 30) - (b * c[e])) / 15 + b/15  -0.65) + "rem"}, {
                        duration: 4000 + e * 2000,
                        easing: "easeInOutCirc",
                        complete: function () {
                            if (e == 2) {
                                isBegin = false;
                                d()
                            }
                        }
                    })
            }, e * 100)
        })
    }
});
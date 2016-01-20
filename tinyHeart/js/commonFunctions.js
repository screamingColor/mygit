/**
 * Created by blue on 2016/1/3.
 */

window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame
            ||window.mozRequestAnimationFrame||window.oRequestAnimationFrame
              ||window.msRequestAnimationFrame||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            return window.setTimeout(callback, 1000 / 60);
        };

})();
function lerpAngle(a, b, t) {
    var d = b - a;
    if (d > Math.PI) d = d - 2 * Math.PI;
    if (d < -Math.PI) d = d + 2 * Math.PI;
    return a + d * t;

}

function lerpDistance(aim, cur, ratio) {
    //aim:目标值， cur:当前值， radio:百分比

    var delta = cur - aim;
    return aim + delta * ratio;
}
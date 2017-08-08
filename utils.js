/**
 * @module  checkPhoneNumer 
 * @description 前端校验手机号并做分割
 * 例子：
 */
function checkPhoneNumer($input){
      var telVal = $input.val();
      //数字和长度验证
      if (/^1[3|4|5|7|8][0-9]-\d{4}-\d{5}$/.test(telVal)) {
          $input.val(telVal.substring(0, telVal.length - 1));
          return false;
      }
      //前三位和第四位分割
      if (/^1[3|4|5|7|8][0-9][0-9]$/.test(telVal)) {
          $input.val(telVal.substring(0, 3) + "-" +telVal.substring(3, telVal.length));
          return false;
      }
      //前七位和第八位分割
      if (/^1[3|4|5|7|8][0-9]-\d{5}$/.test(telVal)) {
          $input.val(telVal.substring(0, 8) + "-" + telVal.substring(8, telVal.length));
          return false;
      }
    }
/**
 * @module  showTips 
 * @description tips提示框
 * 参数：
 * text：提示文字
 * isWhite: 布尔值，为真则为白底黑字，否则为黑底白字
 */
 function showTips(text,isWhite){
     var key="__3Vns7Z2AvFxfPb__";
     if(typeof window[key] == "undefined") window[key]=true;
     if(window[key]){
      var node = document.createElement("style"),
       styleStr ="."+key+"{position:fixed;top:50%;width:100%;margin-top:-12px;text-align:center}."+key+" span, ."+key+" em{display:inline-block;padding-left:10px;padding-right:10px;line-height:24px;text-align:center;font-size:12px;border-radius:10px;}."+key+" span{color:#fff;background-color:rgba(0,0,0,0.7)}."+key+" em{color:#000;background-color:rgba(255,255,255,0.7)}";
       node.styleSheet ? node.styleSheet.cssText = styleStr : node.innerHTML = styleStr;
       document.getElementsByTagName("head")[0].appendChild(node);
       window[key]=false
    }
    $("body").append("<div class="+key+">" + (isWhite?"<em>"+text+"</em>" : "<span>"+text+"</span>") + "</div>");
    setTimeout(function(){
       $("."+key).remove()
    },1000)
  }

  /*****
*@description:大转盘函数封装
*@params: $obj, config
*@ $obj: jq选择器字符串(如：".class","#id")
*@ config:{
      share: 8,  //share份额[数字没有默认]
      speed: "3s",  //speed速度[单位s,最小0.1s]
      //速度曲线[linear匀速，ease慢快慢，ease-in慢慢开始，ease-out慢慢结束，ease-in-out慢快慢等，用的是css3的速度曲线],可以不写，ease默认值
      velocityCurve: "ease",
      weeks: 6,  //默认2周，可以不写
      callback: function(num) { //回调函数
        callbackFn(num);//目标点，数字
      }
   }
*@example:
var newdraw = new turntableDraw('.drawBtn', {
  share: 8,
  speed: "3s",
  velocityCurve: "ease",
  weeks: 6,
  callback: function(num) {
    callbackA(num);
  },
});
function callbackA(ind) {
  alert("第一个回调" + ind);
};
$(".drawBtn").click(function() {
  newdraw.goto(4);
});

 *****/
function turntableDraw(obj, jsn) {
  this.draw = {};
  this.draw.obj = $(obj);
  this.draw.objClass = $(obj).attr("class");
  this.draw.newClass = "rotary" + "new" + parseInt(Math.random() * 1000);
  var _angle = parseInt(360 / jsn.share);
  var _yuan = 360 * (jsn.weeks || 4);
  var _str = "";
  var _speed = jsn.speed || "2s";
  var _velocityCurve = jsn.velocityCurve || "ease";
  var _this = this;
  for (var i = 1; i <= jsn.share; i++) {
    _str += "." + this.draw.newClass + i + "{";
    _str += "transform:rotate(" + ((i - 1) * _angle + _yuan) + "deg);";
    _str += "-ms-transform:rotate(" + ((i - 1) * _angle + _yuan) + "deg);";
    _str += "-moz-transform:rotate(" + ((i - 1) * _angle + _yuan) + "deg);";
    _str += "-webkit-transform:rotate(" + ((i - 1) * _angle + _yuan) + "deg);";
    _str += "-o-transform:rotate(" + ((i - 1) * _angle + _yuan) + "deg);";
    _str += "transition: transform " + _speed + " " + _velocityCurve + ";";
    _str += "-moz-transition: -moz-transform " + _speed + " " + _velocityCurve + ";";
    _str += "-webkit-transition: -webkit-transform " + _speed + " " + _velocityCurve + ";";
    _str += "-o-transition: -o-transform " + _speed + " " + _velocityCurve + ";";
    _str += "}";
    _str += "." + this.draw.newClass + i + "stop{";
    _str += "transform:rotate(" + ((i - 1) * _angle) + "deg);";
    _str += "-ms-transform:rotate(" + ((i - 1) * _angle) + "deg);";
    _str += "-moz-transform:rotate(" + ((i - 1) * _angle) + "deg);";
    _str += "-webkit-transform:rotate(" + ((i - 1) * _angle) + "deg);";
    _str += "-o-transform:rotate(" + ((i - 1) * _angle) + "deg);";
    _str += "}";
  };
  $(document.head).append("<style>" + _str + "</style>");
  _speed = _speed.replace(/s/, "") * 1000;
  this.draw.startTurningOk = false;
  this.draw.goto = function(ind) {
    if (_this.draw.startTurningOk) {
      return false
    };
    _this.draw.obj.attr("class", _this.draw.objClass + " " + _this.draw.newClass + ind);
    _this.draw.startTurningOk = true;
    setTimeout(function() {
      _this.draw.obj.attr("class", _this.draw.objClass + " " + _this.draw.newClass + ind + "stop");
      if (jsn.callback) {
        _this.draw.startTurningOk = false;
        jsn.callback(ind);
      };
    }, _speed + 10);
    return _this.draw;
  };
  return this.draw;
};
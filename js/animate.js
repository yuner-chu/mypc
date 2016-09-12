window.animate = (function (){
    function move(ele,target,duration,effect,callback){ //1,2,3  ["expo","easeIn"] ,function (){}
        //  time   begin   change duration
        var effectMine = {
            linear : function(t,b,c,d){
                return b + t/d*c;
            }
        };
        var defaultEffect = effectMine.linear;
        var time = 0;
        var begin = {};
        var change = {};
        var interval = 10;
        for(var key in target){
            begin[key] = utils.getCss(ele,key);
            change[key] = target[key] - begin[key];
        }
        window.clearInterval(ele.timer); //·ÀÖ¹¶¯»­ÀÛ»ý
        ele.timer = window.setInterval(function (){
            time += interval;
            if(time >= duration){
                window.clearInterval(ele.timer);
                for(var key in target){
                    utils.setCss(ele,key,target[key]);
                }
                if(typeof callback == 'function'){
                    callback.call(ele);
                }
                return;
            }
            for(var attr in change){
                if(change[attr]){
                    var curWeidu = defaultEffect(time,begin[attr],change[attr],duration);
                    utils.setCss(ele,attr,curWeidu);
                }
            }
        },interval)
    }
    return move;
})();

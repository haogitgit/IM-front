export function getNowFormatDate() {
  const date = new Date();
  const seperator1 = "-";
  const seperator2 = ":";
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  let hours = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (hours >= 0 && hours <= 9) {
    hours = "0" + hours;
  }
  if (min >= 0 && min <= 9) {
    min = "0" + min;
  }
  if (sec >= 0 && sec <= 9) {
    sec = "0" + sec;
  }
  var currentdate = /*month + seperator1 + strDate
    + " " +*/ hours + seperator2 + min
    + seperator2 + sec;
  return currentdate;
}

//实现深复制
export function deepCopy(o,c){
  if(o!=null){
    c = c || {}
    for(let i in o){
      if(typeof o[i] === 'object'){
        //要考虑深复制问题了
        /*      if(o[i].constructor === Array){
                  //这是数组*/
        c[i] =[]
        /*      }else{
                  //这是对象
                  c[i] = {}
              }*/
        deepCopy(o[i],c[i])
      }else{
        c[i] = o[i]
      }
    }
  }
  return c
}

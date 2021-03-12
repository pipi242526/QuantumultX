/*
软件名称:哈喽短视频 微信小程序
更新时间：2021-03-09 @肥皂
脚本说明：哈喽短视频
脚本为自动签到和领取视频红包
小程序二维码地址 https://raw.githubusercontent.com/age174/-/main/DCB00CEE-FFFF-427B-B7ED-7381DE584860.jpeg
本脚本以学习为主！
使用方法:
打开哈喽短视频小程序，点击我的或者任务获取数据
TG电报群: https://t.me/hahaha802
boxjs地址 :  
https://raw.githubusercontent.com/age174/-/main/feizao.box.json
哈喽短视频
圈X配置如下，其他软件自行测试，定时可以多设置几次，没任务会停止运行的
[task_local]
#哈喽短视频
15 13 * * * https://raw.githubusercontent.com/age174/-/main/hldsp.js, tag=哈喽短视频, img-url=https://ae01.alicdn.com/kf/Uda8ecbbe50444fe293b538cbccf9d719q.jpg, enabled=true
[rewrite_local]
#哈喽短视频
https://vip.75787.com/app/index.php url script-request-header https://raw.githubusercontent.com/age174/-/main/hldsp.js
#loon
https://vip.75787.com/app/index.php script-path=https://raw.githubusercontent.com/age174/-/main/hldsp.js, requires-header=true, timeout=10, tag=哈喽短视频
#surge
哈喽短视频 = type=http-request,pattern=https://vip.75787.com/app/index.php,requires-header=1,max-size=0,script-path=https://raw.githubusercontent.com/age174/-/main/hldsp.js,script-update-interval=0
[MITM]
hostname = vip.75787.com
*/


const $ = new Env('哈喽短视频');
let status;
status = (status = ($.getval("hldspstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
const hldspurlArr = [], hldsphdArr = [],hldspcount = ''
let hldspurl = $.getdata('hldspurl')
let hldsphd = $.getdata('hldsphd')
let hlsign = '',hluid = ''
!(async () => {
  if (typeof $request !== "undefined") {
    await hldspck()
   
  } else {
 if ($.isNode()) {
  COOKIES_SPLIT = process.env.COOKIES_SPLIT || "\n";
  console.log(
    `============ cookies分隔符为：${JSON.stringify(
      COOKIES_SPLIT
    )} =============\n`
  );
if (
    process.env.HLDSPURL &&
    process.env.HLDSPURL.indexOf(COOKIES_SPLIT) > -1
  ) {
    hldspurl = process.env.HLDSPURL.split(COOKIES_SPLIT);
  } else {
    hldspurl = process.env.HLDSPURL.split();
  }
  if (
    process.env.HLDSPHD &&
    process.env.HLDSPHD.indexOf(COOKIES_SPLIT) > -1
  ) {
    hldsphd = process.env.HLDSPHD.split(COOKIES_SPLIT);
  } else {
    hldsphd = process.env.HLDSPHD.split();
  }

	
  Object.keys(hldspurl).forEach((item) => {
        if (hldspurl[item]) {
          hldspurlArr.push(hldspurl[item])
        }
    });
    Object.keys(hldsphd).forEach((item) => {
        if (hldsphd[item]) {
          hldsphdArr.push(hldsphd[item])
        }
    });

  	
  } else {
    hldspurlArr.push($.getdata('hldspurl'))
    hldsphdArr.push($.getdata('hldsphd'))
    let hldspcount = ($.getval('hldspcount') || '1');
  for (let i = 2; i <= hldspcount; i++) {
    hldspurlArr.push($.getdata(`hldspurl${i}`))
    hldsphdArr.push($.getdata(`hldsphd${i}`))
  }
  }
    console.log(`------------- 共${hldsphdArr.length}个账号-------------\n`)
      for (let i = 0; i < hldsphdArr.length; i++) {
        if (hldsphdArr[i]) {
         
          hldspurl = hldspurlArr[i];
          hldsphd = hldsphdArr[i];
          $.index = i + 1;
          console.log(`\n开始【哈喽短视频${$.index}】`)
	//await hldsphhb();
          await hldspqd();
	  await $.wait(2000);  
	  await hldspsp();
            
  }
}}

})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
//哈喽短视频数据获取


function hldspck() {
   if ($request.url.indexOf("Vgetuserinfo") > -1) {
 const hldspurl = $request.url
  if(hldspurl)     $.setdata(hldspurl,`hldspurl${status}`)
    $.log(hldspurl)
  const hldsphd = JSON.stringify($request.headers)
        if(hldsphd)    $.setdata(hldsphd,`hldsphd${status}`)
$.log(hldsphd)
   $.msg($.name,"",'哈喽短视频'+`${status}` +'数据获取成功！')
  }
}


//哈喽短视频红包
function hldspsp(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'https://vip.75787.com/app/index.php?i=3&t=0&v=1.1.47&from=wxapp&c=entry&a=wxapp&do=dorenwu&m=luobo_video&sign='+hlsign+'&uid='+hluid,
        headers : JSON.parse(hldsphd),
        }
      $.get(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.data !== 0){
        console.log('\n哈喽短视频[领取视频红包]回执:成功🌝 \n获得视频奖励: '+result.data+'，等待20秒继续领取')
           await $.wait(20000);
           await hldspsp();
       
        
} else {
     
console.log('\n哈喽短视频[领取视频红包]回执:失败🚫')

}
   
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}


//哈喽短视频签到
function hldspqd(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      if (typeof hldsphd === "undefined") {
        $.msg($.name,"",'请先获取哈喽短视频数据!😓',)
        $.done()
      }
hlsign = hldspurl.match(/sign=(\w+)/)[1]
hluid = hldspurl.match(/uid=(\w.+)/)[1]

let url = {
        url : 'https://vip.75787.com/app/index.php?i=3&t=0&v=1.1.47&from=wxapp&c=entry&a=wxapp&do=Doqiandao&m=luobo_video&sign='+hlsign+'&uid='+hluid,
        headers : JSON.parse(hldsphd),
        
}
      $.get(url, async (err, resp, data) => {
        try {
    const result = JSON.parse(data)
        if(result.errno == 0){
     

        console.log('\n哈喽短视频[签到]回执:成功🌝  \n获得金币:'+result.data.price)
     //$.done()
       await $.wait(2000);
       //await hldsprw();
        
} else {
console.log('哈喽短视频[签到]回执:失败🚫 '+result.message)
     //await hldspsp();
}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}



function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
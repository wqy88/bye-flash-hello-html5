// ==UserScript==
// @name        bye-flash-hello-html5 | 再见flash 你好html5
// @namespace   https://greasyfork.org/en/users/131965-levinit
// @author      levinit
// @description 国内主流视频网站的HTML5播放
// @include     *://*.le.com/*
// @include     *://tv.cctv.com/*
// @include     *://wlchunwan.cctv.com/*
// @include     *://*.cntv.cn/video/*
// @include     *://*.icourse163.org/*
// @include     *://mooc.study.163.com/learn/*
// @include     *://*.sohu.com/*html*
// @include     *://*mgtv.com/*html*
// @include     *://*acfun.cn/v/ac*
// @include     *://*acfun.cn/bangumi/*
// @include     *://m.acfun.cn/*
// @run-at      document-start
// @version     1.8.2
// @grant       none
// ==/UserScript==
//'use strict';

//=====

//acfun手机版主页跳转到pc版主页
if (location.href.indexOf('m.acfun') >= 0) {
  //手机版频道页跳转到pc版频道页
  if (location.hash.indexOf('channel') >= 0) {
    const num = location.hash.match(/\d+/)[0];
    location.replace('http://acfun.cn/v/list' + num + '/index.htm');
  }
  if (location.href === 'http://m.acfun.cn/') {
    location.replace('http://acfun.cn/');
  }
}

//=====

let [ua, isMobile] = [null, false]; //user-agent 和 是否使用移动ua

//这些网站使用移动ua
const sites = ['cctv', '.163', 'cntv', 'sohu', 'acfun'];

sites.forEach(curVal => {
  if (location.host.indexOf(curVal) >= 0) {
    isMobile = true;
    return false;
  }
});

//=====
if (isMobile) {
  ua =
    'Mozilla/5.0 (Linux; U; Android 4.0.4; GT-I9300 Build/IMM76D) AppleWebKit/601.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/601.1.46';
  //Android7
  //'Mozilla/5.0 (Linux; Android 7.0; PLUS Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.98 Mobile Safari/537.36';
  //ipad2
  //"Mozilla/5.0 (iPad; U; CPU OS 4_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8F191 Safari/6533.18.5";
  //Android 4
} else {
  //使用chrome、mac、safari等ua
  if (location.host.indexOf('le.com') >= 0) {
    //le.com对mac+safari情有独钟
    ua =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0 Safari/604.3.5';
  } else {
    ua =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13) AppleWebKit/604.3.5 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/604.3.5';
  }
}

changeUA(ua);

//=====
//显示播放控制条 stuyd.163
window.onload = function () {
  if (
    isMobile === true &&
    location.href.search('study.163') >= 0
  ) {
    const v = ele('video');
    if (v) {
      v.setAttribute('controls', 'controls');
    }
  }
};

//=====
//获取元素对象的函数
function ele(element) {
  return document.querySelector(element);
}
//更改ua的函数
function changeUA(ua) {
  Object.defineProperty(navigator, 'userAgent', {
    value: ua,
    writable: false,
    configurable: false,
    enumerable: true
  });
}
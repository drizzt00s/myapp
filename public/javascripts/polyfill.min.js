try{if(!window.localStorage||!window.sessionStorage){throw new Error();}
localStorage.setItem('storage_test',1);localStorage.removeItem('storage_test');}catch(e){(function(){'use strict';var Storage=function(type){var data;function createCookie(name,value,days){var date,expires;if(days){date=new Date();date.setTime(date.getTime()+days*24*60*60*1000);expires='; expires='+date.toGMTString();}else{expires='';}
document.cookie=name+'='+value+expires+'; path=/';}
function readCookie(name){var nameEQ=name+'=',ca=document.cookie.split(';'),i=0,c;for(i=0;i<ca.length;i++){c=ca[i];while(c.charAt(0)===' '){c=c.substring(1,c.length);}
if(c.indexOf(nameEQ)===0){return c.substring(nameEQ.length,c.length);}}
return null;}
function getCookieName(){if(type!=='session'){return'localstorage';}
if(!window.name){window.name=new Date().getTime();}
return'sessionStorage'+window.name;}
function setData(dataObject){data=encodeURIComponent(JSON.stringify(dataObject));createCookie(getCookieName(),data,365);}
function clearData(){createCookie(getCookieName(),'',365);}
function getData(){var dataResponse=readCookie(getCookieName());return dataResponse?JSON.parse(decodeURIComponent(dataResponse)):{};}
data=getData();return{length:0,clear:function(){data={};this.length=0;clearData();},getItem:function(key){return data[key]===undefined?null:data[key];},key:function(i){var ctr=0,k;for(k in data){if(data.hasOwnProperty(k)){if(ctr.toString()===i.toString()){return k;}
ctr++;}}
return null;},removeItem:function(key){delete data[key];this.length--;setData(data);},setItem:function(key,value){data[key]=value.toString();this.length++;setData(data);}};};window.localStorage.prototype=window.localStorage=new Storage('local');window.sessionStorage.prototype=window.sessionStorage=new Storage('session');})();}
$(function(){
	 /* $.get('/songs.json').then(function(response){//ajax
        console.log(response)
        let items = response
        items.forEach((i)=>{   */

/*//leancloud数据初始化
var APP_ID = 'CApR3Yej9PHsOicPI3vhH7Fc-gzGzoHsz';
var APP_KEY = 'ToqKlYglDwoTtrvEmGDRzkqz';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
}); */



/* //上传歌曲
var SongObject = AV.Object.extend('Song');  //选择表名
var songObject = new SongObject();   //生成一条数据
songObject.save({
  name: '80000' ,  //数据里面的内容
  singer: 'PRC巴音汗',
  url:'http://oz3p5w9wm.bkt.clouddn.com/80000.mp3'
}).then(function(object) {
  alert('保存成功!');
}) */


 /*//上传歌单
var PlaylistObject = AV.Object.extend('Playlist');  //选择表名
var playlistObject = new PlaylistObject();   //生成一条数据
playlistObject.save({
  musicListName: '「华语」哭泣使人乞讨，思念使人奔跑' ,  //数据里面的内容
  volume: '48.3万',
  url:'http://p1.music.126.net/3LbMYwTiQD5U3MCSgDPgdA==/109951163035317628.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp'
}).then(function(object) {
  alert('保存成功!');
}) */



// 最新音乐 无序列表
var lastestMusic = new AV.Query('Song');//数据库
  lastestMusic.find().then(function(results){//获取所有数据 数据库api
    for(var i=0; i<results.length; i++){
        let lastestSong = results[i].attributes
        let $li = $(`
            <li>
              <a class="play-circled" href="./song.html?id=${results[i].id}">
              <h3>${lastestSong.name}</h3>
              <p>
                <svg class="sq">
                  <use xlink:href="#icon-sq"></use>
                </svg>
                ${lastestSong.singer}
              </p>
              <svg>
                <use xlink:href="#icon-play-circled"></use>
              </svg>
              </a>
            </li>
                  `)
      $('#lastestMusic').append($li);
     }
      $('.loading').remove()     //去除loading动画
    }) 


	//tab
  $('.siteNav').on('click','ol.tab-items>li',function(e){
      let $li = $(e.currentTarget)    //点击的dom
      let index = $li.index()
      $li.trigger('tabChang',index) //自定义事件
      $li.addClass('active').siblings().removeClass('active')  //自身加上css 兄弟去除css
      $('.tab-content > li').eq(index).addClass('active')      //控制tab下的页面显示隐藏                                                               
           .siblings().removeClass('active')
    })

    $('.siteNav').on('tabChang',function(e,index){ //监听自定义事件
      let $li = $('.tab-content > li').eq(index)
      if($li.attr('data-downloaded') === 'yes'){return} //页面已经加载过了 不要重复请求加载

      if(index === 1){
        // $.get('/songs.json').then((response)=>{
       var lastestMusic = new AV.Query('Song');
          lastestMusic.find().then(function(results){
          $li.attr('data-downloaded','yes')  //自定义属性加上yes
          createHtml(results) //拼接html函数

        })
         

      }else if(index === 2){
        $.get('/songs.json').then((response)=>{
          $li.attr('data-downloaded','yes')
        })
      }
    })

    function pad(index){  //小于10的前面+0
      return index >= 10 ? index : '0' + index
    }

//最热音乐 有序列表















// leancloud 获取搜索结果
let timer = null

$('input#search').on('input',function(e){   //搜索框
  if(timer){ window.clearTimeout(timer) }  //砸闹钟
  	timer = setTimeout(function(){   //函数节流
  	  timer = null 

      let $input = $(e.currentTarget)
      let value = $input.val().trim()   //去除前后空格
      if(value===''){return}

      var query1 = new AV.Query('Song');
      query1.contains('name',value);  // 字符串查询
      var query2 = new AV.Query('Song');
      query2.contains('singer',value);
      var query = AV.Query.or(query1, query2)  // or查询 歌名或者歌手

      query.find().then(function(results){
  	  $('#searchResult').empty()    //移除所有内容
  	     if(results.length === 0){   //数据是空的 搜不到内容
         $('#searchResult').html('没有结果')
        }else{
	    for(var i=0; i<results.length; i++){
		  let song = results[i].attributes
          let li =`
  		     <li data-id="${results[i].id}"> 
  		     <a href="./song.html?id=${results[i].id}">
  		     ${song.name}-${song.singer}
  		     </a> 
  		     </li>
  		          `
         $('#searchResult').append(li)
	      }
      }

    })
  },300)
 })






   


})

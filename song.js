$(function(){

//如何获取id
  //$.get('./songs.json').then(function(response){ }) //获取歌词列表
  let id =location.search.match(/\bid=([^&]*)/)[1]    //从问号 (?) 开始的 URL（查询部分）
      //console.log(id)

 /*
 //leancloud数据初始化
var APP_ID = 'CApR3Yej9PHsOicPI3vhH7Fc-gzGzoHsz';
var APP_KEY = 'ToqKlYglDwoTtrvEmGDRzkqz';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});  
 */


//向后台获取数据
 var query = new AV.Query('Song');          //改成向数据库获取数据
    query.get(id).then(function(results){   //根据地址栏匹配的id来查询
       	//console.log(results)
    let songs = results.attributes
  //let song=songs.filter(s=>s.id === id)[0]
    let {coverUrl,url, name, lyric} = songs
        //console.log(url,name,lyric) 



// 播放歌曲    
  let audio = document.createElement('audio')  //创建标签
  audio.src = url

	audio.oncanplay=function(){   //页面加载后自动播放
	  audio.play()     //媒体api 播放歌曲
      //console.log(lyric)      
	  $('.disc-container .disc').addClass('playing')  //添加旋转cd动画
	 // $('.needle').addClass('play')   //
  } 
  $('.icon-pause').on('click',function(){
      audio.pause()   //媒体api 暂停歌曲
      $('.disc-container .disc').removeClass('playing')
      $('.needle').removeClass('play')
  })
  $('.icon-play').on('click',function(){   //点击播放按钮 开始播放
      audio.play()
      $('.disc-container .disc').addClass('playing')
      $('.needle').addClass('play')
  })


$('.song-description > h1').text(name)   //歌名引入到<h1>标签
$('.disc .cover').attr('src',coverUrl)    //歌曲封面切换
$('.page').css({
      background: ' url(' + coverUrl + ') no-repeat center',
     //filter: 'blur(100px) brightness(0.2)',
     // opacity: '1'
    })
 


// 解析歌词
  let array = lyric.split('\n')   // 匹配回车 字符串'\n' 正则/\\n/   
  let regex = /^\[(.+)\](.*)$/   // "[03:27.060]相遇乱世以外 危难中相爱"
      //console.log(array)
  array = array.map(function(string,index){
    let matches = string.match(regex)
      //console.log(matches)
    if(matches){  
      return {time: matches[1], words: matches[2]}   //正则来匹配出时间[1],歌词[2]
    }
  })
      //console.log(array)

  let $lyric=$('.lyric')     
  array.map(function(object){   //把每一段歌词 生成p标签放入页面
      if(!object){return}
      let $p=$('<p/>')     //歌词引入<p>标签
      $p.attr('data-time', object.time).text(object.words)   //自定义属性 歌词时间放进去
      $p.appendTo($lyric.children('.lines'))
    })




//设置歌词同步显示
setInterval(()=>{  
    //console.log(audio.currentTime)
  let seconds = audio.currentTime //歌曲播放进度
  let minutes = ~~(seconds / 60)
  let left = seconds - minutes * 60
  let time = `${pad(minutes)}:${pad(left)}`  //转成分和秒
  let $lines = $('.lines > p')    
 
  let $whichLine
  for(let i=0; i< array.length; i++){ 
    /*if($lines.eq(i).attr('data-time') < time && $lines.eq(i+1).attr('data-time')> time){
        console.log(i)
        console.log($lines[i])  */
    let currentLineTime = $lines.eq(i).attr("data-time");
    let nextLineTime = $lines.eq(i + 1).attr("data-time");
    if($lines.eq(i+1).length !== 0 && currentLineTime < time && nextLineTime > time){          
        $whichLine = $lines.eq(i);     //条件：大于上一句小于下一句，刚好在中间的歌词
            console.log(array[i].words)
        break;
    }
  }

  if($whichLine){    //歌词滚动
      $whichLine.addClass('active').prev().removeClass('active')    //当前歌词高亮
      let top = $whichLine.offset().top   //歌词与屏幕顶端的距离
         //console.log(top)
      let linesTop = $('.lines').offset().top   //歌词窗口与屏幕顶端的距离
         //console.log(linesTop)
      let delta = top - linesTop - $('.lyric').height()/3   //两者距离相减 除于3行歌词
      $('.lines').css('transform',`translateY(-${delta}px)`)   // 计算歌词滚动的位置 加上css滚动动画
    }

},500)    //定时器察看歌词位置是否有变动   


 

})  //数据AV闭合标签


// 时间前面+0
function pad(number){
  return number>=10 ? number + '' : '0' + number
}






})   //起始function闭合标签


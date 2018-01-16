$(function(){
	/* $.get('./songs.json').then(function(response){
		let items=response
		items.forEach((i)=>{
			let $li=$(`
				<li>
				    <a href="./song.html?id=${i.id}">
				       <h3>$(i.name)</h3>
				       <p>演唱者-专辑</p>
					   <svg class="play">
						   <use xlink:href="#icon-play-circled"></use>
					   </svg>
				
				    </a>
			    </li>
			         `)

			$('#lastestMusic').append($li)
		})

		 $('#lastestMusicloading').remove()
	},function(){
		*/
	//})

//leancloud数据初始化
var APP_ID = 'CApR3Yej9PHsOicPI3vhH7Fc-gzGzoHsz';
        var APP_KEY = 'ToqKlYglDwoTtrvEmGDRzkqz';

         AV.init({
         appId: APP_ID,
         appKey: APP_KEY
           }); 

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
                ${lastestSong.singer}</p>
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
        // }) 

      }else if(index === 2){
        $.get('/songs.json').then((response)=>{
          $li.attr('data-downloaded','yes')
        })
      }
    })

    function pad(index){  //小于10的前面+0
      return index >= 10 ? index : '0' + index
    }


})













let timer = undefined

$('input#searchSong').on('input',function(e){
  let $input = $(e.currentTarget)
  let value = $input.val().trim()
  if(value === ''){return}
  if(timer){
    clearTimerout(timer)
    }
    

  timer = setTimeout(function(){
 	   search(value).then((result)=>{
 	   	timer = undefined
 		if(result.length !== 0){
 			$('#output').text(result.map((r)=>r.name).join(','))
 		}else{
 			$('#output').text('没有结果')
 		
 		}
 	})

 	},300)
    


 	
 })    
	

function search(keyword){
	return new Promise((resolve,reject)=>{
		var database = [
  {"id": 1,"name" : "说散就散"},
  {"id": 2,"name": "追光者"},
  {"id": 3,"name": "远走高飞"},
  {"id": 4,"name": "暧昧"}
	]
	let result = database.filter(function(item){
		return item.name.indexOf(keyword)>=0

	})
	setTimeout(function(){
		resolve(result)
		},(Math.random()*200+1000))
	
	})
}
 
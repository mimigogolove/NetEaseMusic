$(function(){
	$.get('/lyric.json').then(function(object){
		let {lyric}=object
		let array=lyric.split('\n')
		let regex=/^\[(.*)\](.*)$/
		array=array.map(function(string,index){
			let matches = string.match(regex)
			if(matches){	
				return{time:matches[1],words:matches[2]}
			}
			

		})
		let $lyric=$('.lyric')
		array.map(function(object){
			if(!object){return}
			let $p=$('<p/>')
			$p.attr('data-time',object.time).text(object.words)
			$p.appendTo($lyric.children('.lines'))
		})
	})
	   let audio=document.createElement('audio')
	    audio.src="http://dl.stream.qqmusic.qq.com/C400003vUjJp3QwFcd.m4a?vkey=F95845FA079A0CA69CAF8A9404D6387AAE9E62E1FE1B1B7C53A55325A8CF42D87572E7B93CE843362001D331A1145A6931AFE3F238927E6A&guid=2240664479&uin=0&fromtag=66"
	    audio.oncanplay=function(){
	    	audio.play()
	    	$('.disc-container').addClass('playing')
	    }
        $('.icon-pause').on('click',function(){
        	audio.pause()
        	$('.disc-container').removeClass('playing')
        })
        $('.icon-play').on('click',function(){
        	audio.play()
        	$('.disc-container').addClass('playing')
        })





})
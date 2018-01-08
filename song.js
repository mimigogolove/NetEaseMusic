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
	    audio.src="http://dl.stream.qqmusic.qq.com/C400003vUjJp3QwFcd.m4a?vkey=3E876FCD0514CB02B4E0844DD7073DAC54FBA2538BEA017DE94987D9193E7DA8C0EE379C3E55AB7B029FFBDF2432839B1337AD0B0017F15C&guid=1697120125&uin=0&fromtag=66"
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
$(function(){

       let id=parseInt(location.search.match(/\bid=([^&]*)/)[1],10)
       $.get('./song.json').then(function(response){
       	let songs=response
       	let song=songs.filter(s=>s.id === id)[0]
       	let {url, name, lyric}=song
       	initPlayer.call(undefined, url)
       	initText(name, lyric)
       	

       	 })

        function initText(name, lyric){
        $('.song-description > h1').text(name)
        parseLyric(lyric)
        
        }
       	
        function initPlayer(url){
        let audio=document.createElement('audio')
	    audio.src=url
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
        setInterval(()=> {
        	return
        	let seconds = audio.currentTime
        	let minutes = ~~(seconds / 60)
        	let left = seconds-minutes*60
        	let time = `${pad(minutes)}:${pad(left)}`
        	let $lines = $('.lines> p')
        	let $whichLine
        	for(let i=0; i<$lines.length; i++){
        		let currentLineTime = $lines.eq(i).attr('data-time')
        		let nextLineTime = $lines.eq(i+1).attr('data-time')
        		if( $lines.eq(i+1).length !== undefined && currentLineTime < time && nextLineTime > time{
                   $whichLine = $lines.eq(i)
                   break
        		}
        	}

        	if($whichLine){
        		$whichLine.addClass('active').prev().removeClass('active')
        		let top = $whichLine.offset().top
        		let linestop = $('.lines').offset().top
                let delta = top - linesTop - $('.lyric').height()/3
                $('.lines').css('transform',`translateY(-${delta}px)`)

        	}
        },300)
        

        }

        function pad(number){
        	return number>=10 ? number + '' : '0' + number
        }
	
	   

	   function parseLyric(lyric){
	   	et array=lyric.split('\n')
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

	   }





})
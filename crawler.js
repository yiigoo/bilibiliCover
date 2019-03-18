const superagent = require('superagent')
var fs = require('fs'),
path = require('path');

let funAsync = function ( aid ) {
    new Promise(function (resolve, reject) {
		const MAX_AID_LENGTH = 8
		// 补充 0 
		let tempAid = '0'.repeat(8 - aid.toString().length) + aid.toString()
		const url = `http://api.bilibili.com/x/web-interface/view?aid=${tempAid}`; // 当前视频的相关
		superagent
		.get( url )
		.end((err, sres) => { 
			// 页面获取到的数据
			
			console.log( '开始抓取：' + tempAid )
			let data = JSON.parse(sres.text)

			if ( data.code === 0 ){
				// 成功
				console.log( data.data.pic )
			}
			let log = `${new Date().getTime() } : 抓取 ${tempAid} , 状态：${data.code === 0 ? 'true' : 'false'} \n`
			fs.appendFile( __dirname + '/crawler_log.txt', log , function () {
				
			})
			setTimeout( function(){
				funAsync( Number(aid) + 1 )
			} , 3000 )
		})
	})
};
let defaultAid = process.argv.slice(2)[0] ? Number(process.argv.slice(2)[0].split('=')[1]) : 0
funAsync( defaultAid )



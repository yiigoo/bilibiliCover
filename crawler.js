const superagent = require('superagent')
const fs = require('fs')
const path = require('path')

let funAsync = function ( aid ) {
    new Promise(function (resolve, reject) {
		const MAX_AID_LENGTH = 8
		// 补充0的个数
		let tempAid = '0'.repeat( MAX_AID_LENGTH - aid.toString().length ) + aid.toString()

		// 获取当前视频的页面
		const url = `http://api.bilibili.com/x/web-interface/view?aid=${tempAid}` 
		
		// 代理抓取
		superagent.get( url ).end((err, sres) => { 
			// sres 页面获取到的数据
			console.log( '抓取：' + tempAid )
			let data = JSON.parse(sres.text)
			
			// 成功
			if ( data.code === 0 ){
				console.log( data.data.pic )
			}

			// 日志
			let log = `${new Date().getTime() } : 抓取 ${tempAid} , 状态：${data.code === 0 ? 'true' : 'false'} \n`
			fs.appendFile( __dirname + '/crawler_log.txt', log , function () {
				
			})

			// 退出递归
			if ( aid === 99999999 ){
				return false
			}

			// 递归
			setTimeout( function(){
				funAsync( Number(aid) + 1 )
			} , 5000 )
		})
	})
}
let defaultAid = process.argv.slice(2)[0] ? Number(process.argv.slice(2)[0].split('=')[1]) : 0
funAsync( defaultAid )



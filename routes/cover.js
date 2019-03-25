const router = require('koa-router')()
const superagent = require('superagent')

router.get('/cover', async (ctx, next) => {
	await ctx.render('cover', {
		title: 'cover',
		results: { cover : 'cover' }
	})
})
router.get('/cover/img', async (ctx, next) => {
	const url = `http://api.bilibili.com/x/web-interface/view?aid=${ctx.query.aid}`
	let data = { data : { pic : null } }
	function timeout() {
		return new Promise((resolve) => {
			superagent.get( url ).end((err, sres) => { 
				// sres 页面获取到的数据
				// 成功
				console.log(JSON.parse(sres.text).code)
				if ( JSON.parse(sres.text).code === 0 ){
					data = JSON.parse(sres.text).data
				}
				resolve(JSON.parse(sres.text))
			})
		})
	}
	await timeout() 
	ctx.body = { msg : data }
})

module.exports = router

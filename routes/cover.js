const router = require('koa-router')()

router.get('/cover', async (ctx, next) => {
	await ctx.render('cover', {
		title: 'cover',
		results: { cover : 'cover' }
	})
})
router.get('/cover/img', async (ctx, next) => {
	ctx.body = { msg : '成功' }
})

module.exports = router

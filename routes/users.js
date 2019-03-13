const router = require('koa-router')()
const cheerio = require('cheerio')
const superagent = require('superagent')
router.prefix('/users')
let _body = '';
router.get('/', function (ctx, next) {
  url = 'https://comment.bilibili.com/recommendnew,334530000045'; //百度新闻地址
	
    // superagent不理解，请在文章开头的地方寻找了解superagent，点击进去理解
	
	superagent
	.get(url)
	.end((err, sres) => { //页面获取到的数据
		let html = sres.text,
		$ = cheerio.load(html, {
			decodeEntities: false
		}), //用cheerio解析页面数据
		obj = {};
		

		//下面类似于jquery的操作，前端的小伙伴们肯定很熟悉啦
		console.log(  JSON.parse(sres.text) )
		let json = JSON.parse(sres.text)

		// json.data.forEach(element => {
		// 	_body += ('<div><img src="' + element.pic + '" /></div>')
		// });

	});
	ctx.body = _body
	
    // ctx.body = JSON.stringify(superagent);
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router

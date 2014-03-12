View History
==============

管理网页浏览历史记录，保存页面浏览记录，取出的记录内容进行数组化处理。IE6 和 IE7 需要第三方 JSON 库支持，推荐使用 [json2.js](https://github.com/douglascrockford/JSON-js/blob/master/json2.js)。

![文章浏览历史记录](http://img.neoease.org/2013/01/view-history.png)

[相关文章和 DEMO](http://www.neoease.com/recently-viewed-items/)

<!--![文章浏览记录]()-->

Parameters
-----

* `limit` {number}

	保存数量，默认为 10。当该值为 0 时，无限保存。

* `storeagekey` {string}

	该工具使用 localStorage 保存信息，这是对应使用的 localStorage key。

* `primaryKey` {string}

	唯一属性，当指定属性相同，老的内容将替换成新的内容。默认为 `url`，因为页面 URL 通常不会重复。

Usage
-----

### 引用 JavaScript 和初始化

	<script src="view-history.js"></script>
	<script>
	if(typeof localStorage !== 'undefined' && typeof JSON !== 'undefined') {
		var viewHistory = new ViewHistory();
		viewHistory.init({
			limit: 5,
			storeagekey: 'viewHistory',
			primaryKey: 'url'
		});
	}
	</script>

### 保存页面信息

	<script>
	/* <![CDATA[ */
	// 如果 ViewHistory 的实例存在，则可以将页面信息写入。
	if(viewHistory) {
		var page = {
			"title": document.getElementsByTagName('title')[0].innerHTML,
			"url": location.href // 这是 primaryKey
			// "time": new Date()
			// "author": ...
			// 这里可以写入更多相关内容作为浏览记录中的信息
		};
		viewHistory.addHistory(page);
	}
	/* ]]> */
	</script>

### 获取和显示浏览历史信息

	<script>
	/* <![CDATA[ */
	var wrap = document.getElementById('view-history');

	// 如果 ViewHistory 的实例存在，并且外层节点存在，则可显示历史浏览记录
	if(viewHistory && wrap) {
		// 获取浏览记录
		var histories = viewHistory.getHistories();

		// 组装列表
		var list = document.createElement('ul');
		if(histories && histories.length > 0) {
			for(var i=histories.length-1; i>=0; i--) {
				var history = histories[i];

				var item = document.createElement('li');
				var link = document.createElement('a');
				link.href = history.url;
				link.innerHTML = history.title;

				item.appendChild(link);
				list.appendChild(item);
			}

			// 插入页面特定位置
			wrap.appendChild(list);
		}
	}
	/* ]]> */
	</script>

License
-------

View History is released under the MIT license:

>Copyright (c) 2007-2013 NeoEase.com.
>
>Permission is hereby granted, free of charge, to any person obtaining a copy of
>this software and associated documentation files (the "Software"), to deal in
>the Software without restriction, including without limitation the rights to
>use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
>of the Software, and to permit persons to whom the Software is furnished to do
>so, subject to the following conditions:
>
>The above copyright notice and this permission notice shall be included in all
>copies or substantial portions of the Software.
>
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
>IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
>FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
>AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
>LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
>OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
>SOFTWARE.
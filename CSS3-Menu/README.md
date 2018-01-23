## Notes

1. :nth-of-type(n) 选择器, 选择属于父元素的特定类型的第 n 个元素, n 可以为表达式
```
/* 选择属于父元素的第 2 个 p 元素 */
p:nth-of-type(2) { 
	background: #ff0000;
}
```

2. css3 tansform 属性
	- scale(sx, sy) 				定义 2d 平面上的向量形式的缩放
	- scaleX(s)						这是一个 3d 转换
	- scaleY(s)						这是一个 3d 转换

3. css 3d 变换 [参考链接](https://www.cnblogs.com/xiaohuochai/p/5351477.html)  [online tools](http://fangyexu.com/)
	+ 3d 位移, 主要包括 translateZ() 和 translate3d() 
		- translate3d(x, y, z) 向 x, y, z 轴偏移对应的值
	+ 3d 缩放, 主要包括 scaleZ() 和 scale3d()
	+ 3d 旋转, 主要包括 rotateX(), rotateY(), rotateZ(), rotate3d()
		- rotate3d(x, y, z, N) 变形元素沿着由(0,0,0)和(x,y,z)这两个点构成的直线为轴，进行旋转 N 角度
			* rotateZ(Ndeg)相当于rotate3d(0,0,1,Ndeg)

4. 变换的一些概念
	+ transform-origin 变形原点, 指变形操作所依据的基点, 
		- 数值: x轴数值表示在x轴上离0点(元素边框外侧左上角)的偏移量；y轴数值表示在y轴上离0点的偏移量
	+ perspective 透视距离, 即观察者与屏幕的距离, z 轴的距离


## Trouble

1. webpack 打包 scss, sass [参考链接](https://www.linpx.com/p/webpack2-and-sass-setup-tutorial.html)
	+ 使用 node-sass 
		- npm i node-sass -g 
		- node-sass src/style.scss dist/style.css 			# 编译 sass
		- node-sass src/style.scss dist/style.css -w 		# 实时编译

## Schedule

1. 必须要完成拖拽？
	感觉需要计算向量的角度, 再进行旋转, 主要要知道拖拽的时候, 拖拽鼠标点与中心的角度? 先看看能输出哪些信息

	计算角度有点问题 

	只能计算平面坐标, 中两向量的夹角



	原点的坐标 origin , start 坐标, end 坐标 求出 x =  cos

	Math.acos(x); 求出弧度值, 转化成角度值

2. 数据动态添加? 
	这个没问题, 用 Vue 全家桶来做

3. 得建一个坐标系, 还是的了解 3d 变换 
	- 平面两向量 a = (x1, y1), b = (x2, y2), cos(angle) = (x1*x2 + y1*y2) / sqrt(x1*x1 + y1*y1) * sqrt(x2*x2 + y2*y2)
	- 三维向量 a=(x1,y1,z1),b=(x2,y2,z2) a*b= x1*x2+y1*y2+z1*z2 |a|=sqrt(x1^2+y1^2+z1^2).|b|=sqrt(x2^2+y2^2+z2^2) cosθ=a*b/(|a|*|b|) 角θ=arccosθ
 

## Cogitation

1. 点击旋转角度
	- var zDeg = some deg
	- click => get domDeg = some deg
	- transform: rotateZ()

	发现一个规律, 

	建一个坐标系, 存储起来, 数组, 点击的时候, 判断这是第几个
	dom 节点每个对应的中间位置会有一个角度, 存储成数组, 获取当前 center 的旋转值 (d_center - dom_z(应该旋转的角度)) % 360
	d_dom - d_center = d_center_t 

	每个 dom 应该旋转到中心的 位置 事先也是可以计算的出的
	应该旋转到中心位置的度数 = 90 - i * interval - start
	
	知道了变换的规律现在可以计算出 origin 的坐标

	以浏览器的左上为原点建坐标轴
	perspective-origin(body / 2, - body / 10, 800)
	center()

	那现在要就算的角度就是 视点 与点击点 在 center 平面上的交点 到 center 中心的 夹角\


	什么鬼东西, 还能不能干了 

https://wenku.baidu.com/view/6dac0c22915f804d2b16c17c.html
http://blog.csdn.net/bingcaihuang/article/details/5806139
http://www.cnblogs.com/graphics/archive/2012/08/08/2609005.html
http://blog.csdn.net/smallflyingpig/article/details/51234711?locationNum=8&fps=1

	首先求旋转后的平面方程, 先求法线向量, (0, sqrt(3), 0) => (0, 1, sqrt(3)) => 

	1,0,0,0,0,1,0,0,0,0,-870,0,0,0,0,1

	1, 0, 0, 0, 0, 0.5, 0.866, 0, 0, -0.866, 0.5, 0, 0, 0, -870, 1
	-0.866, -0.433, 0.25, 0, 0, 0.5, 0.866, 0, -0.5, 0.75, -0.433, 0, 0, 0, -870, 1

	0.866, -0.433, 0.25, 0, 0, 0.5, 0.866, 0, -0.5, -0.75, 0.433, 0, 0, 0, -870, 1 				// right! translateZ(-870px) rotateX(60deg) rotateY(-30deg)

http://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/
http://www.cnblogs.com/ywxgod/archive/2010/08/06/1793609.html
[计算矩阵](http://blog.csdn.net/lht748/article/details/53259128)
http://www.webkkl.com/style/matrix3d.php

					0	1	2	3
(x, y, z, 1)		4	5	6	7
					8	9	10	11
					12	13	14	15


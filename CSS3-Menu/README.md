## notes

1. webpack 打包 scss, sass

## config

1. :nth-of-type(n) 选择器, 选择属于父元素的特定类型的第 n 个元素, n 可以为表达式
```
/* 选择属于父元素的第 2 个 p 元素 */
p:nth-of-type(2) { 
	background:#ff0000;
}
```

2. css3 tansform 属性
	- scale(sx, sy) 				定义 2d 平面上的向量形式的缩放
	- scaleX(s)						这是一个 3d 转换
	- scaleY(s)						这是一个 3d 转换

3. css 3d 变换 [参考链接](https://www.cnblogs.com/xiaohuochai/p/5351477.html)
	+ 3d 位移, 主要包括 translateZ() 和 translate3d() 
		- translate3d(x, y, z) 向 x, y, z 轴偏移对应的值
	+ 3d 缩放, 主要包括 scaleZ() 和 scale3d()
		- 
	+ 3d 旋转, 主要包括 rotateX(), rotateY(), rotateZ(), rotate3d()
		- rotate3d(x, y, z, N) 变形元素沿着由(0,0,0)和(x,y,z)这两个点构成的直线为轴，进行旋转 N 角度
			* rotateZ(Ndeg)相当于rotate3d(0,0,1,Ndeg)

4. 变换的一些概念
	+ transform-origin 变形原点, 指变形操作所依据的基点, 
		- 数值: x轴数值表示在x轴上离0点(元素边框外侧左上角)的偏移量；y轴数值表示在y轴上离0点的偏移量
	+ perspective 透视距离, 即观察者与屏幕的距离, z 轴的距离




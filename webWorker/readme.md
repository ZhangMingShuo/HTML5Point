### 参考
[web worker和异步](https://www.cnblogs.com/heshan1992/p/6698069.html)
[web worker应用性](https://www.oschina.net/question/129540_31101)

示例需要注意: 如果使用的是chrome浏览器需要知道,chrome不支持这种本地方式使用web worker,可能别的浏览器支持,这里我们建立了一个web容器,搭建一个web服务用来运行demo.

* demo1用来演示如何使用web worker
* demo2运用一个小案例演示web worker的实用性

worker 将可能耗费较长时间的处理交给后台执行，则对用户在前台页面中执行的操作没有影响
如果开发人员创建的Web应用程序需要执行一些后台数据处理，但又不希望这些数据处理任务影响Web页面本身的交互性，那么可以通过Web Workers生成一个worker实例去执行数据处理任务。同时添加一个事件监听器进行监听，并与之进行数据交互。
注意：后台进程（包括Web Workers进程）不能对DOM进行操作。如果希望后台程序处理的结果能够改变DOM，只能通过返回消息给创建者的回调函数进行处理。
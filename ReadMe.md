## 使用文档

教程来源：[【杰哥课堂】-项目实战-Node+Koa2从零搭建通用API服务_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV13A411w79h?p=3)
源码：https://github.com/jj112358/node-api

感谢UP

🐱🐱😘🍘🍙🦪🍚🥮🍥🫕🥧



## 目录结构：

![image-20220408204350963](C:\Users\aafz\AppData\Roaming\Typora\typora-user-images\image-20220408204350963.png)

## 使用方式：

```
#安装依赖
$npm install

#调试运行
$npm run dev

#
$
```



### 接口：
（接口不多，就直接写在这里了）

baseURL：localhost:####



##### 用户接口    `/user`

**登录接口**
`/login`
方法：post
参数：

```
{    "tel": "1234567891234",
     "password": "123"		}
```

**获取用户信息**
`/getMessage`
方法：get

**修改用户信息**
`/changeMessage`
方法：post
参数：

```
{   "tel": "1234567891234",
    "name": "syney",
    "wx": "wx123456",
    "sex": "女"				}
```

**改密码**
`/changePWD`
方法：post
参数：
```
{   "tel": "1234567891234",
    "password":"123456789",
    "newPWD":"123456"		}
```



##### 工单接口   `/wo`

**增加工单**
`/addWO`
方法：post
参数：

```
{   "name": "时区测试2",
    "level":"不急",
 	"description":"descriptionsbfajbfjsabfjsabf",
    "site_id":"2"	}
```

**获取个人的工单列表**
`/getPersonWOs`
方法：get

**获取工单详情**
`/getWO/:id`
方法：get

**修改工单**
`/changeWO`
方法：post
参数：

```
{   "id":"2",
    "message":"处理完成描述测试1"	}
```



##### 站点接口  `/site`

**获取站点列表**
`/getSiteList`
方法：get

**获取站点细节**
`/getSiteDetail/:id`
方法：get

**修改站点状态**
`/changeSiteStatus`
方法：post
参数：
```
{   "id":"2",
    "status":"已启用"	}
```



##### 巡检接口	`/inspect`

**获取个人的巡检列表**
`/getPersonInsList`
方法：get

**获取巡检详情**
`/getInspect/:id`
方法：get



##### 设备接口	`/device`

**获取某个站点的设备列表**
`/getDevList/:site_id`
方法：get

**获取设备详情**
`/getDevDetail/:dev_id`
方法：get




## 学习笔记1：

#### 教程的作者已经写得很清晰了，在此不再进行赘述，更多的是梳理整个项目抽离的各个依赖之间的关系和逻辑

**对整个登录API的流程进行说明：**

项目于暂时的目录如下：

做了一份依赖的思维导图

文档链接：

![image-20220323151939768](C:\Users\aafz\AppData\Roaming\Typora\typora-user-images\image-20220323151939768.png)

![image-20220323152031358](C:\Users\aafz\AppData\Roaming\Typora\typora-user-images\image-20220323152031358.png)

![image-20220323152054875](C:\Users\aafz\AppData\Roaming\Typora\typora-user-images\image-20220323152054875.png)



## 学习笔记2：

##### 22.4.5	基本完成了数据的传递功能，中间件之后再添加，还有许多需要完成的中间件，工具类，各种抽离的代码部分

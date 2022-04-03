# API规划

## 数据库模型设计

## 每个模块需要的API

### user模块  /user

##### 登录 /login

方法：post

必须参数 tel、password

```
/user/login
```

例子

```
{
    "tel": "1234567891234",
    "password": "123456"
}
```

##### 改密码 /changePWD

方法：patch

必须参数 tel、password、newPWD

```
/user/changePWD
```

例子

```
{
    "tel": "1234567891234",
    "password":"123456",
    "newPWD":"123456789"
}
```

##### 改信息 /changeMessage

方法：patch

必须参数 tel、name、sex、wx

```
/changeMessage
```

例子

```
{
    "tel": "1234567891234",
    "name": "syney",
    "wx": "wx123456",
    "sex":"女"
}
```

##### 改密码 /changePWD





### 工单管理    /workorder

##### 添加工单   /addWO

必须参数    标题信息/站点名称/故障类型/等级/问题描述/发起人员id/问题照片上传

##### 个人工单获取   /getPersonWO/:tel

必须参数    人员id 

可选参数	工单状态（默认全部）

##### 所有工单获取 /getAllWO

参数

##### 工单处理提交  /changeWO

必须参数    工单id/处理信息/处理人员id/处理照片



### 巡检任务管理  /inspection

##### 个人巡检任务获取  /getPersonIns

必须参数    人员id 

##### 添加巡检任务   /addIns

必须参数    任务名称/人员类型/巡检模式/多个站点名称/各个站点巡检的节点/描述信息

##### 巡检任务修改   /changeIns

必须参数	人员id/各个站点的设备节点描述/巡检任务结果信息

### 站点管理  /site

##### 站点信息获取	/getAllSite

可选参数：站点请求的状态（默认全部）

##### 站点名称列表获取	/?

##### 站点在线状态修改	/changeStatus

必选参数：	站点id/修改参数名称/修改参数数据

### 设备管理  /device

##### 获取站点设备	/getBySiteId

必选参数：	站点id

##### 设备信息获取	/getById

必选参数：	设备id

##### 设备状态修改	/changeStatus

必选参数：	设备id/修改参数名称/修改参数数据

​      

### 设备信息	/DevData

##### 单个设备信息获取	/getDataby




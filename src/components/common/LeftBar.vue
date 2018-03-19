<!-- 左侧导航-->
<template>
   <Sider class="leftbar-wrap">
            <Menu :active-name="menuActiveName"  @on-select="menuSelect" theme="dark" width="auto">
                <Submenu name="config">
                    <template slot="title">
                        <Icon type="gear-a"></Icon>
                        配置管理
                    </template>
                    <MenuItem name="/main/config">公共配置</MenuItem>
                    <MenuItem name="/main/feedback">意见反馈</MenuItem>
                    <MenuItem name="/main/notice">通知</MenuItem>
                    <MenuItem name="/main/appVersion">app版本</MenuItem>
                </Submenu>
                <Submenu name="article">
                    <template slot="title">
                        <Icon type="ios-paper-outline"></Icon>
                        文章管理
                    </template>
                    <MenuItem name="/main/articleCate">文章类型</MenuItem>
                    <MenuItem name="/main/article">文章</MenuItem>
                </Submenu>
                <Submenu name="video">
                    <template slot="title">
                        <Icon type="social-youtube-outline"></Icon>
                        视频管理
                    </template>
                    <MenuItem name="/main/videoSetSearch">视频集搜索</MenuItem>
                    <MenuItem name="/main/videoSetCate">视频集类型</MenuItem>
                    <MenuItem name="/main/videoSet">视频集</MenuItem>
                    <MenuItem name="/main/videoCache">视频缓存</MenuItem>
                    <MenuItem name="/main/videoPlayRecord">视频播发记录</MenuItem>
                    <MenuItem name="/main/videoSetCollect">视频集收藏</MenuItem>
                </Submenu>
                <Submenu name="account">
                    <template slot="title">
                        <Icon type="person"></Icon>
                        账户管理
                    </template>
                    <MenuItem name="/main/accountLevel">账户等级</MenuItem>
                    <MenuItem name="/main/accountParent">账户上级</MenuItem>
                    <MenuItem name="/main/account">账户</MenuItem>
                    <MenuItem name="/main/withdrawals">提现管理</MenuItem>
                    <MenuItem name="/main/vipNumber">vip购买次数管理</MenuItem>
                </Submenu>
                <Submenu name="order">
                    <template slot="title">
                        <Icon type="ios-cart"></Icon>
                        订单管理
                    </template>
                    <MenuItem name="/main/order">订单</MenuItem>
                </Submenu>
                <Submenu name="account">
                    <template slot="title">
                        <Icon type="earth"></Icon>
                        积分管理
                    </template>
                    <MenuItem name="/main/integralBoard">积分排行榜</MenuItem>
                </Submenu>
                <!-- <Submenu name="finance">
                    <template slot="title">
                        <Icon type="social-yen"></Icon>
                        财务管理
                    </template>
                    <MenuItem name="/main/Withdrawals">提现管理</MenuItem>
                </Submenu> -->
                
            </Menu>
        </Sider>
</template>
<script>
      export default {
    name: 'LeftBar',
    data () {
      return {
          //活动的菜单，即显示菜单
          menuActiveName:'/main/articeCate'
       
      }
    },
    methods: {
     menuSelect(name){
         this.$router.push(name);
     }
    },
    created(){
    //监听点击返回
    this.Hub.$on('routerChange', (msg) => { //Hub接收事件
        //this.msg = 'hehe';
        console.log(msg)
        this.menuActiveName=msg;
    });
    }
  }
</script>
<style lang="less">
@import "LeftBar.less";
</style>

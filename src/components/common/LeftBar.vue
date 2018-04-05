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
                    <MenuItem name="/main/banner">banner</MenuItem>
                    <MenuItem name="/main/notice">通知</MenuItem>
                </Submenu>
                <Submenu name="article">
                    <template slot="title">
                        <Icon type="ios-paper-outline"></Icon>
                        文章管理
                    </template>
                    <MenuItem name="/main/articleCate">文章类型</MenuItem>
                    <MenuItem name="/main/article">文章</MenuItem>
                </Submenu>
                <Submenu name="mer">
                    <template slot="title">
                        <Icon type="pizza"></Icon>
                        商品管理
                    </template>
                    <MenuItem name="/main/merSearch">商品搜索</MenuItem>
                    <MenuItem name="/main/merCommon">商品公用</MenuItem>
                    <MenuItem name="/main/merCate">商品类型</MenuItem>
                    <MenuItem name="/main/mer">商品</MenuItem>
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
                <Submenu v-if="isSuperAdmin" name="rolePermission">
                    <template slot="title">
                        <Icon type="person-stalker"></Icon>
                        角色权限管理
                    </template>
                    <MenuItem name="/main/role">角色</MenuItem>
                    <MenuItem name="/main/permission">权限</MenuItem>
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
          //是否超级管理员,默认不是
          isSuperAdmin:false,
          //活动的菜单，即显示菜单
          menuActiveName:'/main/articeCate'
       
      }
    },
    methods: {
     //判断是否超级管理员，是就显示账户管理
    getIsSuperAdmin(){
    if(sessionStorage.getItem("account")){
        let account=JSON.parse(sessionStorage.getItem("account"));
        if(account.role.name=="超级管理员"){
            this.isSuperAdmin=true;
        }
    } 
    },
     menuSelect(name){
         this.$router.push(name);
     }
    },
    created(){
     this.getIsSuperAdmin();
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

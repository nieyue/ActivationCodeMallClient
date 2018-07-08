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
                    <MenuItem name="/main/couponTerm">优惠劵项</MenuItem>
                </Submenu>
                <Submenu name="notice">
                    <template slot="title">
                        <Icon type="chatbox"></Icon>
                        通知管理
                    </template>
                    <MenuItem name="/main/notice">系统通知</MenuItem>
                    <MenuItem name="/main/notice2">申请新产品销售</MenuItem>
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
                    <MenuItem name="/main/mer">全部商品</MenuItem>
                    <MenuItem name="/main/selfMer">官网自营商品</MenuItem>
                    <MenuItem name="/main/sellerNoSelfMer">商户非自营商品</MenuItem>
                    <MenuItem name="/main/sellerSelfMer">商户自营商品</MenuItem>
                </Submenu>
               <!--  <Submenu name="spread">
                    <template slot="title">
                        <Icon type="earth"></Icon>
                        推广管理
                    </template>
                    <MenuItem name="/main/spreadLinkTerm">推广链接项</MenuItem>
                </Submenu> -->
                <Submenu name="account">
                    <template slot="title">
                        <Icon type="person"></Icon>
                        账户管理
                    </template>
                    <MenuItem name="/main/accountLevel">账户等级</MenuItem>
                    <!-- <MenuItem name="/main/account">账户</MenuItem> -->
                    <MenuItem name="/main/account/userAccount">用户账户</MenuItem> 
                    <MenuItem name="/main/account/spreadAccount">推广户账户</MenuItem> 
                    <MenuItem name="/main/account/sellerAccount">商户账户</MenuItem> 
                    <MenuItem name="/main/withdrawals">提现管理</MenuItem>
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
                <Submenu v-if="isSuperAdmin" name="managerAccount">
                    <template slot="title">
                        <Icon type="person-stalker"></Icon>
                        管理员管理
                    </template>
                    <MenuItem name="/main/account/managerAccount">管理员管理</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
</template>
<script>
      export default {
    name: 'LeftBar',
    data () {
      return {
          //是否超级管理员,默认不是
          isSuperAdmin:this.business.getIsSuperAdmin(),
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
    //this.isSuperAdmin= this.business.getIsSuperAdmin();
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

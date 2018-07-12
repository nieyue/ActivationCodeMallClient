<!--订单管理 -->
<template>
    <div class="body-wrap">
        <div style="color:green;">
            备注：下单人id即为账户id
        </div>
      <div class="body-btn-wrap">
        <div class="search-wrap">
          <Select v-model="params.region" transfer class="search-wrap-input"  placeholder="范围，全部">
              <Option v-for="item in regionParamsList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
          <Select v-model="params.merType" transfer class="search-wrap-input"  placeholder="商品类型，全部">
              <Option v-for="item in merTypeParamsList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
          <Select v-model="params.type" transfer class="search-wrap-input"  placeholder="业务类型，全部">
              <Option v-for="item in typeParamsList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
          <Select v-model="params.payType" transfer class="search-wrap-input"  placeholder="支付类型，全部">
              <Option v-for="item in payTypeParamsList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
          <Input v-model="params.accountId" class="search-wrap-input" placeholder="下单人id"></Input>
          <Select v-model="params.status" transfer class="search-wrap-input"  placeholder="状态，全部">
              <Option v-for="item in statusParamsList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
          <Button @click="search" type="info"  >查询</Button>
        </div>
      </div>
      <Table border  :columns='orderColumns' :data='orderList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
    
</template>
<script>
export default {
  name: 'Order',
  data () {
    return {
      routerPath:this.$route.path,
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },

      //范围，1官网自营，2商户非自营，3商户自营
      regionParamsList:[
        {id:'',value:'全部'},
        {id:1,value:'官网自营'},
        {id:2,value:'商户非自营'},
        {id:3,value:'商户自营'}
      ],
       //商品类型，1普通商品，2降价商品，3预购商品
      merTypeParamsList:[
        {id:'',value:'全部'},
        {id:1,value:'普通商品'},
        {id:2,value:'降价商品'},
        {id:3,value:'预购商品'}
      ],
      //类型，1购买商品，2账户提现，3退款，4诚信押金
      typeParamsList:[
        {id:'',value:'全部'},
        {id:1,value:'购买商品'},
        {id:2,value:'账户提现'},
        {id:3,value:'退款'},
        {id:4,value:'诚信押金'}
      ],
      //方式，1支付宝，2微信,3百度钱包,4Paypal,5网银
      payTypeParamsList:[
        {id:'',value:'全部'},
        {id:1,value:'支付宝'},
        {id:2,value:'微信'},
        {id:3,value:'百度钱包'},
        {id:4,value:'Paypal'},
        {id:5,value:'网银'}
      ],
      //查询状态
      //订单状态，2待支付，3已支付,4预购商品，5问题单，6已取消，7已删除
      //子状态，2（1待支付），3（1冻结单，2已完成），4（1等待发货），
      //5（1待解决（买家提问后），2解决中（卖家回复后），3申请退款，4已退款，5已解决），6（1正常取消,2订单商品库存不够），7（1已删除）
      statusParamsList:[
        {
          id:2,
          value:'待支付',
          substatusList:[
           {id:1,value:'待支付'},
          ]
        },
        {
          id:3,
          value:'已支付',
          substatusList:[
           {id:1,value:'冻结单'},
           {id:2,value:'已完成'},
          ]
        },
        {
          id:4,
          value:'预购商品',
          substatusList:[
           {id:1,value:'等待发货'},
          ]
          },
        {
          id:5,
          value:'问题单',
          substatusList:[
           {id:1,value:'待解决'},
           {id:2,value:'解决中'},
           {id:3,value:'申请退款'},
           {id:4,value:'已退款'},
           {id:5,value:'已解决'},
          ]
          },
        {
          id:6,
          value:'已取消',
          substatusList:[
           {id:1,value:'正常取消'},
           {id:2,value:'订单商品库存不够'},
          ]
          },
        {
          id:7,
          value:'已删除',
          substatusList:[
            {id:1,value:'已删除'}
          ]
          },
      ],
            //范围，1官网自营，2商户非自营，3商户自营
      regionList:[
        {id:1,value:'官网自营'},
        {id:2,value:'商户非自营'},
        {id:3,value:'商户自营'}
      ],
      //商品类型，1普通商品，2降价商品，3预购商品
      merTypeList:[
        {id:1,value:'普通商品'},
        {id:2,value:'降价商品'},
        {id:3,value:'预购商品'}
      ],
      //类型，1购买商品，2账户提现，3退款，4诚信押金
      typeList:[
        {id:1,value:'购买商品'},
        {id:2,value:'账户提现'},
        {id:3,value:'退款'},
        {id:4,value:'诚信押金'}
      ],
      //方式，1支付宝，2微信,3百度钱包,4Paypal,5网银
      payTypeList:[
        {id:1,value:'支付宝'},
        {id:2,value:'微信'},
        {id:3,value:'百度钱包'},
        {id:4,value:'Paypal'},
        {id:5,value:'网银'}
      ],
      //订单状态，2待支付，3已支付,4预购商品，5问题单，6已取消，7已删除
      //子状态，2（1待支付），3（1冻结单，2已完成），4（1等待发货），
      //5（1待解决（买家提问后），2解决中（卖家回复后），3申请退款，4已退款，5已解决），6（1正常取消,2订单商品库存不够），7（1已删除）
      statusList:[
        {
          id:2,
          value:'待支付',
          substatusList:[
           {id:1,value:'待支付'},
          ]
        },
        {
          id:3,
          value:'已支付',
          substatusList:[
           {id:1,value:'冻结单'},
           {id:2,value:'已完成'},
          ]
        },
        {
          id:4,
          value:'预购商品',
          substatusList:[
           {id:1,value:'等待发货'},
          ]
          },
        {
          id:5,
          value:'问题单',
          substatusList:[
           {id:1,value:'待解决'},
           {id:2,value:'解决中'},
           {id:3,value:'申请退款'},
           {id:4,value:'已退款'},
           {id:5,value:'已解决'},
          ]
          },
        {
          id:6,
          value:'已取消',
          substatusList:[
           {id:1,value:'正常取消'},
           {id:2,value:'订单商品库存不够'},
          ]
          },
        {
          id:7,
          value:'已删除',
          substatusList:[
            {id:1,value:'已删除'}
          ]
          },
      ],
	    orderList: [],
	    orderColumns: [
        {
          title: '序号',
          width:80,
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: '订单id',
           width:100,
          key: 'orderId',
          align:'center'
        },
        {
          title: '订单号',
          width:100,
          key: 'orderNumber',
          align:'center'
        },
        {
          title: '下单人id',
          width:100,
          key: 'accountId',
          align:'center'
        },
        {
          title:'范围',
          width:100,
            align:'center',
          render: (h, params) => {
            let regionvalue="";
            let resulth;
            this.regionList.forEach(element => {
              if(element.id==params.row.region){
                regionvalue=element.value;
              }
            });
                resulth=h('span',regionvalue);   
             return  resulth;
          }
        },
        {
          title:'商品类型',
          width:100,
            align:'center',
          render: (h, params) => {
            let merTypevalue="";
            let resulth;
            this.merTypeList.forEach(element => {
              if(element.id==params.row.merType){
                merTypevalue=element.value;
              }
            });
                resulth=h('span',merTypevalue);   
             return  resulth;
          }
        },
        {
        	title:'业务类型',
          width:100,
            align:'center',
          render: (h, params) => {
            let typevalue="";
            let resulth;
            this.typeList.forEach(element => {
              if(element.id==params.row.type){
                typevalue=element.value;
              }
            });
                resulth=h('span', typevalue);   
             return  resulth;
          }
        },
        {
        	title:'支付类型',
          width:100,
            align:'center',
          render: (h, params) => {
            let payTypevalue="";
            let resulth;
            this.payTypeList.forEach(element => {
              if(element.id==params.row.payType){
                payTypevalue=element.value;
              }
            });
                resulth=h('span', payTypevalue);   
             return  resulth;
          }
        },
       {
        	title:'状态/子状态',
          width:100,
            align:'center',
          render: (h, params) => {
            let statusvalue="";
            let substatusvalue="";
            let resulth;
            this.statusList.forEach(element => {
              if(element.id==params.row.status){
                statusvalue=element.value;
                  element.substatusList.forEach(substatus => {
                    if(substatus.id==params.row.substatus){
                      substatusvalue=substatus.value;
                    }
                  });
              }
            });
                resulth=h('span', statusvalue+"/"+substatusvalue);
             return  resulth;
          }
        },
        {
          title:'订单商品类型',
          width:100,
          align:'center',
          render: (h, params) => {
            let resulth;
             resulth=h('span', params.row.orderDetailList[0].merCateName);
             return  resulth;
          }
        },
        {
          title:'订单名称',
          width:100,
          align:'center',
          render: (h, params) => {
            let resulth;
             resulth=h('span', params.row.orderDetailList[0].name);
             return  resulth;
          }
        },
        {
          title:'订单封面',
          width:100,
          align:'center',
          render: (h, params) => {
             return h('img', {
              attrs: {
                src: params.row.orderDetailList[0].imgAddress
              },
              style: {
                width: '45px'
              }
            })
          }
        },
        {
          title:'单价',
          width:100,
          align:'center',
          render: (h, params) => {
            let resulth;
             resulth=h('span', params.row.orderDetailList[0].unitPrice);
             return  resulth;
          }
        },
        {
          title:'数量',
          width:100,
          align:'center',
          render: (h, params) => {
            let resulth;
             resulth=h('span', params.row.orderDetailList[0].number);
             return  resulth;
          }
        },
        {
            title:'总价',
            width:100,
          align:'center',
          render: (h, params) => {
              let resulth;
             resulth=h('span', params.row.orderDetailList[0].totalPrice);
             return  resulth;
          }
        },
        {
            title:'优惠券',
            width:100,
            align:'center',
            render: (h, params) => {
            let resulth;
            let value="未使用";
            if(params.row.orderDetailList[0].coupon){
              value=params.row.orderDetailList[0].coupon.code
            }
                resulth=h('span', value);
                return  resulth;
            }
        },
        {
          title:'下单时间',
          width:100,
          key:'createDate',
          sortable: true,
          align:'center'
        },
          {
            title:'更新时间',
            key:'updateDate',
             width:100,
            sortable: true,
            align:'center'
          },
        {
          title:'支付时间',
          width:100,
          key:'paymentDate',
          sortable: true,
          align:'center'
        },
		    {
          title: '操作',
          key: 'action',
           width:200,
            fixed:'right',
          align:'center',
          render: (h, params) => {
            var varhh1=  h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginLeft: '10px'
                },
                on: {
                  click: () => {
                    this.$router.push('/main/merOrderCardCipher/'+params.row.orderId);
                  }
                }
              }, '商品订单卡密');
            var varhh2=  h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginLeft: '10px'
                },
                on: {
                  click: () => {
                    this.$router.push('/main/orderProblem/'+params.row.orderId);
                  }
                }
              }, '订单问题');
            	var s=h("div","");
			s=h("div",[
              varhh1
              ,varhh2
            ]);
            return s;
          }
        }
      ],
    }
  },
  methods: {
    //查询
    search(){
      this.getList()
    },
    //分页点击
    selectPage (currentPage) {
      this.params.currentPage=currentPage;
      this.params.pageNum = (this.params.currentPage-1)*this.params.pageSize+this.params.startNum;
      this.getList()
    },
    getRegion(){
      this.regionParamsList=[
          {id:'',value:'全部'},
          {id:1,value:'官网自营'},
          {id:2,value:'商户非自营'},
          {id:3,value:'商户自营'}
          ];
         let regionParamsListLength=this.regionParamsList.length;
        for(let i=0;i<regionParamsListLength;i++){
      //路径为全部商品
        if(this.routerPath=="/main/order"){

       }else if(this.routerPath=="/main/selfMerOrder"||this.routerPath=="/main/selfMerProblemOrder"){
         //路径为官网自营
          if(this.regionParamsList[i].value!='官网自营'){
           this.regionParamsList.splice(i,1);
            regionParamsListLength--;
            i--;
          }
       }else if(this.routerPath=="/main/sellerNoSelfMerOrder"){
         //路径为商户非自营
          if(this.regionParamsList[i].value!='商户非自营'){
           this.regionParamsList.splice(i,1);
            regionParamsListLength--;
            i--;
          }
       }else if(this.routerPath=="/main/sellerSelfMerOrder"){
         //路径为商户自营
          if(this.regionParamsList[i].value!='商户自营'){
           this.regionParamsList.splice(i,1);
            regionParamsListLength--;
            i--;
          }
       }
       }
       this.params.region=this.regionParamsList[0].id;
      //状态
       this.statusParamsList=[
        {
          id:2,
          value:'待支付',
          substatusList:[
           {id:1,value:'待支付'},
          ]
        },
        {
          id:3,
          value:'已支付',
          substatusList:[
           {id:1,value:'冻结单'},
           {id:2,value:'已完成'},
          ]
        },
        {
          id:4,
          value:'预购商品',
          substatusList:[
           {id:1,value:'等待发货'},
          ]
          },
        {
          id:5,
          value:'问题单',
          substatusList:[
           {id:1,value:'待解决'},
           {id:2,value:'解决中'},
           {id:3,value:'申请退款'},
           {id:4,value:'已退款'},
           {id:5,value:'已解决'},
          ]
          },
        {
          id:6,
          value:'已取消',
          substatusList:[
           {id:1,value:'正常取消'},
           {id:2,value:'订单商品库存不够'},
          ]
          },
        {
          id:7,
          value:'已删除',
          substatusList:[
            {id:1,value:'已删除'}
          ]
          },
      ];
      let statusParamsListLength=this.statusParamsList.length;
        for(let i=0;i<statusParamsListLength;i++){
         if(this.routerPath=="/main/selfMerProblemOrder"){
         //路径为官网自营且是问题单
          if(this.statusParamsList[i].value!='问题单'){
           this.statusParamsList.splice(i,1);
            statusParamsListLength--;
            i--;
          }
       this.params.status=this.statusParamsList[0].id
        }else{
       this.params.status={};

        }
      }
    },
  //获取列表
   getList () {
     /**
     * 获取列表
     * $this  vue组件
     * p.countUrl 数量url
     * p.listUrl 列表url
     * p.list 返回列表
     */
     this.axiosbusiness.getList(this,{
       countUrl:'/order/count',
       listUrl:'/order/list',
       data:'orderList',
       success:()=>{
         
       }
       
     },this.params)
    }
  },
   watch: {
      $route (to,from){
        this.routerPath=this.$route.path;
        this.getRegion();
        this.getList();
      }
    },
  created () {
    this.getRegion();
    this.getList();
  },
  mounted () {

  }
}
</script>

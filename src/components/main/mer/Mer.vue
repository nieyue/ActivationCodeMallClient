<!--商品管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <Button type='primary'  @click='add'>增加商品</Button>
      <div class="search-wrap">
        <Select v-model="params.region"  transfer class="search-wrap-input" placeholder="范围，全部" >
            <Option v-for="item in regionParamsList" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
        <Select v-model="params.type"  transfer class="search-wrap-input" placeholder="类型，全部">
            <Option v-for="item in typeParamsList" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
        <Input v-model="params.name" class="search-wrap-input" placeholder="名称，模糊查询"></Input>
        <Select v-model="params.recommend"  transfer class="search-wrap-input" placeholder="推荐，全部">
            <Option v-for="item in recommendParamsList" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
        <Input v-model="params.merCateId" class="search-wrap-input" placeholder="商品类型id"></Input>
        <Input v-model="params.sellerAccountId" class="search-wrap-input" placeholder="商户账户id"></Input>
        <Select v-model="params.status" transfer class="search-wrap-input"  placeholder="状态，全部">
            <Option v-for="item in statusParamsList" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
        <Button @click="search" type="info"  >查询</Button>
      </div>
    </div>
		 <!--新增 -->
     <Modal v-model="addMerModel"
           title="新增商品管理"
           :closable="false"
           :mask-closable="false"
           width="1000px"
    >
      <Form ref="addMer" :model="addMer" :label-width="100"  label-position="right"  :rules="addMerRules">
        <FormItem prop="merCateId" label="商品类型:">
          <Select v-model="addMer.merCateId"  transfer size="large" style="width:100px">
              <Option v-for="item in merCateList" :value="item.merCateId" :key="item.merCateId">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="region" label="范围，1官网自营，2商家自营:">
          <Select v-model="addMer.region" transfer size="large" style="width:100px">
              <Option v-for="item in regionList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="platformProportion" label="平台分成比例(0-100)，单位%:">
          <InputNumber :max="100" :min="0"  :precision='2' v-model="addMer.platformProportion"></InputNumber>%
        </FormItem>
        <FormItem prop="type" label="类型，1普通商品，2降价商品，3预购商品:">
          <Select v-model="addMer.type" transfer size="large" style="width:100px">
              <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="deliverEndDate" label="最迟发货时间，预购商品可选:">
          <DatePicker type="datetime" @on-change="getAddMerDeliverEndDate" placeholder="最迟发货时间，预购商品可选" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem prop="name" label="名称:">
          <Input type="text" v-model="addMer.name" placeholder="名称">
          </Input>
        </FormItem>
        <FormItem prop="summary" label="简介:">
          <Input type="textarea" v-model="addMer.summary" :autosize="{minRows: 2,maxRows: 5}"  placeholder="简介">
          </Input>
        </FormItem>
          <FormItem prop="imgAddress" label="图像(上传或者填写):" id="addImgAddressBox">
          <Button type="primary" @click="addImgAddressClick('addImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="addImgAddress" ref="addImgAddress">
          <div>
            <Input type="text" v-model="addMer.imgAddress" placeholder="图像">
          </Input>
             <img :src="addMer.imgAddress"  style='width:30px;'alt="">
          </div>
        </FormItem>
        <FormItem prop="platform" label="平台:">
          <Input type="text" v-model="addMer.platform"   placeholder="平台">
          </Input>
        </FormItem>
        <FormItem prop="recommend" label="推荐:">
          <Select v-model="addMer.recommend" transfer size="large" style="width:100px">
              <Option v-for="item in recommendList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="oldUnitPrice" label="原始单价:">
          <InputNumber :max="1000000000" :min="0" @on-change="changeAddOldUnitPrice" :precision='2' v-model="addMer.oldUnitPrice"></InputNumber>元
        </FormItem>
        <FormItem prop="discount" label="折扣(0-1.00):">
          <InputNumber :max="1" :min="0" @on-change="changeAddDiscount"  :precision='2' v-model="addMer.discount"></InputNumber>
        </FormItem>
        <FormItem prop="unitPrice" label="单价:">
          <InputNumber :max="1000000000" :min="0"  :precision='2' :disabled="true" v-model="addMer.unitPrice"></InputNumber>元
        </FormItem>
        <FormItem prop="details" label="商品详情:">
          <div id="addMerDetailsEditor" style="text-align:left"></div>
        </FormItem>
        <FormItem prop="configuration" label="配置要求:">
          <div id="addMerConfigurationEditor" style="text-align:left"></div>
        </FormItem>
        <FormItem prop="installActivation" label="安装激活:">
          <div id="addMerInstallActivationEditor" style="text-align:left"></div>
        </FormItem>
        <FormItem prop="status" label="状态:">
          <Select v-model="addMer.status" transfer size="large" style="width:100px">
              <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot='footer'>
        <Button type='ghost' @click='addCancel'>取消</Button>
        <Button type='primary' :loading='addLoading'>
          <span v-if="!addLoading" @click='addSure'>确定</span>
          <span v-else>Loading...</span>
        </Button>
      </div>
    </Modal>
    <!--新增end -->
		 <!--修改 -->
     <Modal v-model="updateMerModel"
           title="修改商品管理"
           :closable="false"
           :mask-closable="false"
           width="1000px"
    >
      <Form ref="updateMer" :model="updateMer" :label-width="100" label-position="right"  :rules="updateMerRules">
        <FormItem prop="merCateId" label="商品类型:">
          <Select v-model="updateMer.merCateId" transfer size="large" style="width:100px">
              <Option v-for="item in merCateList" :value="item.merCateId" :key="item.merCateId">{{ item.name }}</Option>
          </Select>
        </FormItem>
       <FormItem prop="region" label="范围，1官网自营，2商家自营:">
          <Select v-model="updateMer.region" transfer size="large" style="width:100px">
              <Option v-for="item in regionList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="platformProportion" label="平台分成比例(0-100)，单位%:">
          <InputNumber :max="100" :min="0"  :precision='2' v-model="updateMer.platformProportion"></InputNumber>%
        </FormItem>
        <FormItem prop="type" label="类型，1普通商品，2降价商品，3预购商品:">
          <Select v-model="updateMer.type" transfer size="large" style="width:100px">
              <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="deliverEndDate" label="最迟发货时间，预购商品可选:">
          <DatePicker type="datetime" @on-change="getUpdateMerDeliverEndDate" placeholder="最迟发货时间，预购商品可选" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem prop="name" label="名称:">
          <Input type="text" v-model="updateMer.name" placeholder="名称">
          </Input>
        </FormItem>
        <FormItem prop="summary" label="简介:">
          <Input type="textarea" v-model="updateMer.summary" :autosize="{minRows: 2,maxRows: 5}"  placeholder="简介">
          </Input>
        </FormItem>
          <FormItem prop="imgAddress" label="图像(上传或者填写):" id="updateImgAddressBox">
          <Button type="primary" @click="updateImgAddressClick('updateImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="updateImgAddress" ref="updateImgAddress">
          <div>
            <Input type="text" v-model="updateMer.imgAddress" placeholder="图像">
          </Input>
             <img :src="updateMer.imgAddress"  style='width:30px;'alt="">
          </div>
        </FormItem>
        <FormItem prop="platform" label="平台:">
          <Input type="text" v-model="updateMer.platform"   placeholder="平台">
          </Input>
        </FormItem>
        <FormItem prop="recommend" label="推荐:">
          <Select v-model="updateMer.recommend" transfer size="large" style="width:100px">
              <Option v-for="item in recommendList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="oldUnitPrice" label="原始单价:">
          <InputNumber :max="1000000000" :min="0"  :precision='2' @on-change="changeUpdateOldUnitPrice"  v-model="updateMer.oldUnitPrice"></InputNumber>元
        </FormItem>
        <FormItem prop="discount" label="折扣(0-1.00):">
          <InputNumber :max="1" :min="0"  :precision='2' @on-change="changeUpdateDiscount"  v-model="updateMer.discount"></InputNumber>
        </FormItem>
        <FormItem prop="unitPrice" label="单价:">
          <InputNumber :max="1000000000" :min="0"  :precision='2'  :disabled="true" v-model="updateMer.unitPrice"></InputNumber>元
        </FormItem>
        <FormItem prop="details" label="商品详情:">
          <div id="updateMerDetailsEditor" style="text-align:left"></div>
        </FormItem>
        <FormItem prop="configuration" label="配置要求:">
          <div id="updateMerConfigurationEditor" style="text-align:left"></div>
        </FormItem>
        <FormItem prop="installActivation" label="安装激活:">
          <div id="updateMerInstallActivationEditor" style="text-align:left"></div>
        </FormItem>
        <FormItem prop="status" label="状态:">
          <Select v-model="updateMer.status" transfer size="large" style="width:100px">
              <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot='footer'>
        <Button type='ghost' @click='updateCancel'>取消</Button>
        <Button type='primary' :loading='updateLoading'>
          <span v-if="!updateLoading" @click='updateSure'>确定</span>
          <span v-else>Loading...</span>
        </Button>
      </div>
    </Modal>
    <!--修改end -->
      <Table border :columns='merColumns' :data='merList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'  @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
</template>
<script>
export default {
  name: 'Mer',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
          //范围，1官网自营，2商家自营
          regionParamsList:[
          {id:'',value:'全部'},
          {id:1,value:'官网自营'},
          {id:2,value:'商家自营'}
          ],
          //类型，1普通商品，2降价商品，3预购商品
          typeParamsList:[
          {id:'',value:'全部'},
          {id:1,value:'普通商品'},
          {id:2,value:'降价商品'},
          {id:3,value:'预购商品'}
          ],
          //推荐，默认0不推，1封推，2推荐
          recommendParamsList:[
          {id:'',value:'全部'},
          {id:0,value:'不推'},
          {id:1,value:'封推'},
          {id:2,value:'推荐'}
          ],
        //状态0下架,默认1上架
        statusParamsList:[
          {id:'',value:'全部'},
          {id:0,value:'下架'},
          {id:1,value:'上架'}
          ],
         //范围，1官网自营，2商家自营
          regionList:[
          {id:1,value:'官网自营'},
          {id:2,value:'商家自营'}
          ],
          //类型，1普通商品，2降价商品，3预购商品
          typeList:[
          {id:1,value:'普通商品'},
          {id:2,value:'降价商品'},
          {id:3,value:'预购商品'}
          ],
          //推荐，默认0不推，1封推，2推荐
          recommendList:[
          {id:0,value:'不推'},
          {id:1,value:'封推'},
          {id:2,value:'推荐'}
          ],
      //状态
      statusList:[
          {id:0,value:'下架'},
          {id:1,value:'上架'}
        ],
			//增加参数
			addMerModel:false,
			addLoading:false,
			addMerRules: {
                name: [
                    {required: true, message: '名称为必填项', trigger: 'blur'}
                    ]
                },
			addMer:{},
			//修改参数
			updateMerModel:false,
			updateLoading:false,
			updateMerRules: {
                name: [
                    {required: true, message: '名称为必填项', trigger: 'blur'}
                    ]
                },
			updateMer:{},
      //删除参数
      deleteMer:{},
      //列表
	    roleList: [],
        merCateList: [],
        merList: [],
	    merColumns: [
        {
          title: '序号',
           width:100,
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: '商品id',
          key: 'merId',
          width:100,
          align:'center'
        },
          {
        	title:'商品类型',
            //key:'merCateId',
            width:100,
          align:'center',
          render: (h, params) => {
            let merCatevalue="";
            this.merCateList.forEach(element => {
              if(element.merCateId==params.row.merCateId){
                merCatevalue=element.name;
              }
            });
             return  h('span',merCatevalue);
          }
        },
          {
        	title:'范围',
            key:'region',
            width:100,
          align:'center',
          render: (h, params) => {
            let regionvalue="";
            this.regionList.forEach(element => {
              if(element.id==params.row.region){
                regionvalue=element.value;
              }
            });
             return  h('span',regionvalue);
          }
        },
        {
        	title:'平台分成比例，单位%',
            key:'platformProportion',
            width:100,
            align:'center'
        },
         {
        	title:'类型',
            key:'type',
            width:100,
          align:'center',
          render: (h, params) => {
            let typevalue="";
            this.typeList.forEach(element => {
              if(element.id==params.row.type){
                typevalue=element.value;
              }
            });
             return  h('span',typevalue);
          }
        },
        {
        	title:'最迟发货时间，预购商品可选',
            key:'deliverEndDate',
            width:100,
          align:'center'
        },
        {
        	title:'名称',
            key:'name',
            width:100,
          align:'center'
        },
        {
        	title:'简介',
            key:'summary',
            width:100,
          align:'center',
             render: (h, params) => {
                 var summary=params.row.summary==null?'':params.row.summary.length>=20?params.row.summary.substring(0,20)+"...":params.row.summary.substring(0);
              // console.log(summary.toString())
                var varhh1=  h('span',summary);
              return varhh1;  
             }
        },
         {
        	title:'封面',
            key:'imgAddress',
            width:100,
          align:'center',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.imgAddress
              },
              style: {
                width: '45px'
              }
            })
          }
        },
         {
        	title:'平台',
            key:'platform',
            width:100,
          align:'center'
        },
        {
        	title:'推荐',
            key:'recommend',
            width:100,
          align:'center',
          render: (h, params) => {
            let recommendvalue="";
            this.recommendList.forEach(element => {
              if(element.id==params.row.recommend){
                recommendvalue=element.value;
              }
            });
             return  h('span',recommendvalue);
          }
        },
        {
        	title:'原始单价',
            key:'oldUnitPrice',
            width:100,
          align:'center'
        },
        {
        	title:'单价',
            key:'unitPrice',
            width:100,
          align:'center'
        },
        {
        	title:'折扣',
            key:'discount',
            width:100,
          align:'center'
        },
        {
        	title:'销量',
            key:'saleNumber',
            width:100,
          align:'center'
        },
        {
        	title:'库存数',
            key:'stockNumber',
            width:100,
          align:'center'
        },
        {
        	title:'商品评分',
            key:'merScore',
            width:100,
          align:'center'
        },
        {
        	title:'商品评论数',
            key:'merCommentNumber',
            width:100,
          align:'center'
        },
        {
        	title:'商户账户id',
            key:'sellerAccountId',
            width:100,
          align:'center'
        },
        {
        	title:'状态',
            key:'status',
             width:100,
          align:'center',
          render: (h, params) => {
            let statusvalue="";
            this.statusList.forEach(element => {
              if(element.id==params.row.status){
                statusvalue=element.value;
              }
            });
             return  h('span',statusvalue);
          }
        },
        {
        title:'创建时间',
        key:'createDate',
        width:100,
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
        title: '操作',
        key: 'action',
        width:200,
        fixed:'right',
        align:'center',
          render: (h, params) => {
            var marginstyle="2px"
            var varhh00=  h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  margin: marginstyle
                },
                on: {
                  click: () => {
                     this.$router.push('/main/finance/'+params.row.MerId);
                  }
                }
              }, '财务');
            var varhh01=  h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  margin: marginstyle
                },
                on: {
                  click: () => {
                     this.$router.push('/main/financeRecord/'+params.row.MerId);
                  }
                }
              }, '财务记录');
            var varhh10=  h('Button', {
                props: {
                  type: 'dashed',
                  size: 'small'
                },
                style: {
                  margin: marginstyle
                },
                on: {
                  click: () => {
                     this.$router.push('/main/integral/'+params.row.MerId);
                  }
                }
              }, '积分');
            var varhh11=  h('Button', {
                props: {
                  type: 'dashed',
                  size: 'small'
                },
                style: {
                  margin: marginstyle
                },
                on: {
                  click: () => {
                     this.$router.push('/main/integralDetail/'+params.row.MerId);
                  }
                }
              }, '积分详情');
            var varhh30=  h('Button', {
                props: {
                  type: 'ghost',
                  size: 'small'
                },
                style: {
                  margin: marginstyle
                },
                on: {
                  click: () => {
                    this.$router.push('/main/bankCard/'+params.row.MerId);
                  }
                }
              }, '银行卡');
            var varhh31=  h('Button', {
                props: {
                  type: 'ghost',
                  size: 'small'
                },
                style: {
                  margin: marginstyle
                },
                on: {
                  click: () => {
                    this.$router.push('/main/sincerity/'+params.row.MerId);
                  }
                }
              }, '诚信');
              
            var varhh20=  h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  margin: marginstyle
                },
                on: {
                  click: () => {
                    this.update(params.row)
                  }
                }
              }, '编辑');
            var varhh21=  h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  margin: marginstyle
                },
                on: {
                  click: () => {
                    this.delete(params.row)
                  }
                }
              }, '删除');
            	var s=h("div","");
			s=h("div",[
        h("div",[
           varhh10,
          varhh11
        ]),
        h("div",[
           varhh00,
          varhh01
        ]),
        h("div",[
           varhh30,
           varhh31
        ]),
        h("div",[
           varhh20
           //,varhh21
        ])
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
    //修改增加中的原始价格
    changeAddOldUnitPrice(oldUnitPrice){
        this.addMer.unitPrice=oldUnitPrice*this.addMer.discount
    },
    //修改增加中的折扣
    changeAddDiscount(discount){
        this.addMer.unitPrice=discount*this.addMer.oldUnitPrice
    },
    //修改修改中的原始价格
    changeUpdateOldUnitPrice(oldUnitPrice){
        this.updateMer.unitPrice=oldUnitPrice*this.updateMer.discount
    },
    //修改修改中的折扣
    changeUpdateDiscount(discount){
        this.updateMer.unitPrice=discount*this.updateMer.oldUnitPrice
    },
    //增加最迟发货时间
    getAddMerDeliverEndDate(deliverEndDate){
        this.addMer.deliverEndDate=deliverEndDate
    },
    //更新最迟发货时间
    getUpdateMerDeliverEndDate(deliverEndDate){
        this.updateMer.deliverEndDate=deliverEndDate
    },
     //增加中的上传图片
     addImgAddressClick(p){
         this.$refs[p].click();
       },
    //更新中的上传图片
     updateImgAddressClick(p){
         this.$refs[p].click();
       },
  //获取列表
   getMerCateList () {
     /**
     * 获取列表
     * $this  vue组件
     * p.countUrl 数量url
     * p.listUrl 列表url
     * p.data 返回列表
     */
     this.axiosbusiness.getList(this,{
       countUrl:'/merCate/count',
       listUrl:'/merCate/list',
       data:'merCateList',
       success:()=>{
           //初始化
        this.addMer={
            merCateId:this.merCateList[0].merCateId,
            region:this.regionList[0].id,
            platformProportion:5,
            type:this.typeList[0].id,
            recommend:this.recommendList[0].id,
            status:this.statusList[1].id,    
            oldUnitPrice:0,   
            discount:0,   
            unitPrice:0   
        };
        this.getList();
       }
     },
     {  
       pageNum:1,
       pageSize:1000})
    },
  //获取列表
   getList () {
     /**
     * 获取列表
     * $this  vue组件
     * p.countUrl 数量url
     * p.listUrl 列表url
     * p.data 返回列表
     */
     this.axiosbusiness.getList(this,{
       countUrl:'/mer/count',
       listUrl:'/mer/list',
       data:'merList'
     },this.params)
    },
  //增加
	 add (params) {
      this.addMerModel = true
         let Editor=this.wangeditor;
  let addMerDetailsEditor=new Editor("#addMerDetailsEditor")
  addMerDetailsEditor.customConfig.zIndex = 100
  addMerDetailsEditor.customConfig.onchange = (html) =>{
    this.addMer.details=html;
    }
    addMerDetailsEditor.create();
    addMerDetailsEditor.txt.html('<p>输入内容...😆</p>')
  //wangeditor七牛云上传图片预加载
  this.utils.getQiniuSimpleUploader(this,{
    browseButton:addMerDetailsEditor.imgMenuId,
    container:addMerDetailsEditor.toolbarElemId,
    dropElement:addMerDetailsEditor.textElemId,
    success:(sourceLink)=>{
      addMerDetailsEditor.cmd.do('insertHtml', '<img src="' + sourceLink + '" style="max-width:100%;"/>')
   
   }
  });

  let addMerConfigurationEditor=new Editor("#addMerConfigurationEditor")
  addMerConfigurationEditor.customConfig.zIndex = 100
  addMerConfigurationEditor.customConfig.onchange = (html) =>{
    this.addMer.configuration=html;
    }
    addMerConfigurationEditor.create();
    addMerConfigurationEditor.txt.html('<p>输入内容...😆</p>')
  //wangeditor七牛云上传图片预加载
  this.utils.getQiniuSimpleUploader(this,{
    browseButton:addMerConfigurationEditor.imgMenuId,
    container:addMerConfigurationEditor.toolbarElemId,
    dropElement:addMerConfigurationEditor.textElemId,
    success:(sourceLink)=>{
      addMerConfigurationEditor.cmd.do('insertHtml', '<img src="' + sourceLink + '" style="max-width:100%;"/>')
   
   }
  });

  let addMerInstallActivationEditor=new Editor("#addMerInstallActivationEditor")
  addMerInstallActivationEditor.customConfig.zIndex = 100
  addMerInstallActivationEditor.customConfig.onchange = (html) =>{
    this.addMer.installActivation=html;
    }
    addMerInstallActivationEditor.create();
    addMerInstallActivationEditor.txt.html('<p>输入内容...😆</p>')
  //wangeditor七牛云上传图片预加载
  this.utils.getQiniuSimpleUploader(this,{
    browseButton:addMerInstallActivationEditor.imgMenuId,
    container:addMerInstallActivationEditor.toolbarElemId,
    dropElement:addMerInstallActivationEditor.textElemId,
    success:(sourceLink)=>{
      addMerInstallActivationEditor.cmd.do('insertHtml', '<img src="' + sourceLink + '" style="max-width:100%;"/>')
   
   }
  });
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addMerModel = false
        this.$refs.addMer.resetFields()
      }
    },
		//增加确定
    addSure () {
       /**
     * 增加
     * $this  vue组件
     * p.ref 验证
     * p.url 增加url
     * p.requestObject 请求参数对象
     * p.loading loading
     * p.showModel 界面模型显示隐藏
     */
    this.axiosbusiness.add(this,{
      ref:'addMer',
      url:'/mer/add',
      requestObject:'addMer',
      loading:'addLoading',
      showModel:'addMerModel'
    })
    },
	 update (params) {
      this.updateMerModel = true
      this.updateMer.merId = params.merId
     //获取修改实体
      this.axiosbusiness.get(this,{
          url:'/mer/load?merId='+params.merId,
         data:'updateMer',
         success:()=>{
              let Editor=this.wangeditor;
           let updateMerDetailsEditor=new Editor("#updateMerDetailsEditor")
           updateMerDetailsEditor.customConfig.zIndex = 100
           updateMerDetailsEditor.customConfig.onchange = (html)=> {
             this.updateMer.details=html;
             }
             updateMerDetailsEditor.customConfig.qiniu = true//允许上传七牛
           updateMerDetailsEditor.create();
           updateMerDetailsEditor.txt.html(this.updateMer.details)
           //wangeditor七牛云上传图片预加载
          this.utils.getQiniuSimpleUploader(this,{
            browseButton:updateMerDetailsEditor.imgMenuId,
            container:updateMerDetailsEditor.toolbarElemId,
            dropElement:updateMerDetailsEditor.textElemId,
            success:(sourceLink)=>{
              updateMerDetailsEditor.cmd.do('insertHtml', '<img src="' + sourceLink + '" style="max-width:100%;"/>')
            }
          });

           let updateMerConfigurationEditor=new Editor("#updateMerConfigurationEditor")
           updateMerConfigurationEditor.customConfig.zIndex = 100
           updateMerConfigurationEditor.customConfig.onchange = (html)=> {
             this.updateMer.configuration=html;
             }
             updateMerConfigurationEditor.customConfig.qiniu = true//允许上传七牛
           updateMerConfigurationEditor.create();
           updateMerConfigurationEditor.txt.html(this.updateMer.configuration)
           //wangeditor七牛云上传图片预加载
          this.utils.getQiniuSimpleUploader(this,{
            browseButton:updateMerConfigurationEditor.imgMenuId,
            container:updateMerConfigurationEditor.toolbarElemId,
            dropElement:updateMerConfigurationEditor.textElemId,
            success:(sourceLink)=>{
              updateMerConfigurationEditor.cmd.do('insertHtml', '<img src="' + sourceLink + '" style="max-width:100%;"/>')
            }
          });

           let updateMerInstallActivationEditor=new Editor("#updateMerInstallActivationEditor")
           updateMerInstallActivationEditor.customConfig.zIndex = 100
           updateMerInstallActivationEditor.customConfig.onchange = (html)=> {
             this.updateMer.installActivation=html;
             }
             updateMerInstallActivationEditor.customConfig.qiniu = true//允许上传七牛
           updateMerInstallActivationEditor.create();
           updateMerInstallActivationEditor.txt.html(this.updateMer.installActivation)
           //wangeditor七牛云上传图片预加载
          this.utils.getQiniuSimpleUploader(this,{
            browseButton:updateMerInstallActivationEditor.imgMenuId,
            container:updateMerInstallActivationEditor.toolbarElemId,
            dropElement:updateMerInstallActivationEditor.textElemId,
            success:(sourceLink)=>{
              updateMerInstallActivationEditor.cmd.do('insertHtml', '<img src="' + sourceLink + '" style="max-width:100%;"/>')
            }
          });

         }
       })
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateMerModel = false
        this.$refs.updateMer.resetFields()
      }
    },
		//修改确定
    updateSure () {
      /**
     * 修改
     * $this  vue组件
     * p.ref 验证
     * p.url 修改url
     * p.requestObject 请求参数对象
     * p.loading loading
     * p.showModel 界面模型显示隐藏
     */
    this.axiosbusiness.update(this,{
      ref:'updateMer',
      url:'/mer/update',
      requestObject:'updateMer',
      loading:'updateLoading',
      showModel:'updateMerModel'
    })
 
    },
    //删除
    delete(params){
    /**
     * 删除
     * $this  vue组件
     * p.url 修改url
     * p.requestObject 请求参数对象
     */
    this.deleteMer={
      "merId":params.merId
    };
    this.axiosbusiness.delete(this,{
      url:'/mer/delete',
      requestObject:'deleteMer'
    })
    }
  },
  created () {
    this.getMerCateList();
    //增加中的上传图片预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'addImgAddress',
      dropElement:'addImgAddressBox',
      resource:'addMer.imgAddress'
    });
    //修改中的上传图片预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'updateImgAddress',
      dropElement:'updateImgAddressBox',
      resource:'updateMer.imgAddress'
    });
  },
  mounted () {

  }
}
</script>

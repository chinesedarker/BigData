// pages/grade/grade.js
var typeCode;
var typeR;
var typeA;
var typeI;
var typeS;
var typeE;
var typeC;

var numCount = 6; //元素个数
var numSlot = 5; //一条线上的总节点数
var mW = 320; //Canvas的宽度
var mCenter = mW / 2; //中心点
var mAngle = Math.PI * 2 / numCount; //角度
var mRadius = mCenter - 60; //半径(减去的值用于给绘制的文本留空间)
//获取指定的Canvas
var radCtx = wx.createCanvasContext("radarCanvas")
//霍兰德职业代码推荐工作
var job = [
  ["RIA", "牙科技术员、陶工、建筑设计员、模型工、细木工、制作链条人员。"],
  ["RIS", "厨师、林务员、跳水员、潜水员、染色员、电器修理、眼镜制作、电工、纺织机器装配工、服务员、装玻璃工人、发电厂工人、焊接工。"],
  ["RIE", "建筑和桥梁工程、环境工程、航空工程、公路工程、电力工程、信号工程、电话工程、一般机械工程、自动工程、矿业工程、海洋工程、交通工程技术人员、制图员、家政经济人员、计量员、农民、农场工人、农业机械操作、清洁工、无线电修理、汽车修理、手表修理、管工、线路装配工、工具仓库管理员。"],
  ["RIC", "船上工作人员、接待员、杂志保管员、牙医助手、制帽工、磨坊工、石匠、机器制造、机车(火车头)制造、农业机器装配、汽车装配工、缝纫机装配工、钟表装配和检验、电动器具装配、鞋匠、锁匠、货物检验员、电梯机修工、托儿所所长、钢琴调音员、装配工、印刷工、建筑钢铁工作、卡车司机。"],
  ["RAI", "手工雕刻、玻璃雕刻、制作模型人员、家具木工、制作皮革品、手工绣花、手工钩针纺织、排字工作、印刷工作、图画雕刻、装订工。"],
  ["RSE", "消防员、交通巡警、警察、门卫、理发师、房间清洁工、屠夫、锻工、开凿工人、管道安装工、出租汽车驾驶员、货物搬运工、送报员、勘探员、娱乐场所的服务员、起卸机操作工、灭害虫者、电梯操作工、厨房助手。"],
  ["RSI", "纺织工、编织工、农业学校教师、某些职业课程教师(诸如艺术、商业技术、工艺课程)、雨衣上胶工。"],
  ["REC", "抄水表员、保姆、实验室动物饲养员、动物管理员。"],
  ["REI", "轮船船长、航海领航员、大副、试管实验员。RES：旅馆服务员、家畜饲养员、渔民、渔网修补工、水手长、收割机操作工、搬运行李工人、公园服务员、救  生员、登山导游、火车工程技术员、建筑工作、铺轨工人。"],
  ["RES", "旅馆服务员、家畜饲养员、渔民、渔网修补工、水手长、收割机操作工、搬行李工人、公园服务员、救生员、登山导游、火车工程技术员、建筑工人、铺轨工人。"],
  ["RCI", "测量员、勘测员、仪表操作者、农业工程技术、化学工程技师、民用工程技师、石油工程技师、资料室管理员、探矿工、煅烧工、烧窖工、矿工、保养工、磨床工、取样工、样品检验员、纺纱工、炮手、漂洗工、电焊工、锯木工、刨床工、制帽工、手工缝纫工、油漆工、染色工、按摩工、木匠、农民建筑工作、电影放映员、勘测员助手。"],
  ["RCS", "公共汽车驾驶员、一等水手、游泳池服务员、裁缝、建筑工作、石匠、烟囱修建工、混凝土工、电话修理工、爆炸手、邮递员、矿工、裱糊工人、纺纱工。"],
  ["RCE", "打井工、吊车驾驶员、农场工人、邮件分类员、铲车司机、拖拉机司机。"],
  ["IAS", "普通经济学家、农场经济学家、财政经济学家、国际贸易经济学家、实验心理学家、工程心理学家、心理学家、哲学家、内科医生、数学家。"],
  ["IAR", "人类学家、天文学家、化学/物理学家、医学病理、动物标本剥制者、化石修复者、艺术品管理者。"],
  ["ISE", "营养学家、饮食顾问、火灾检查员、邮政服务检查员。"],
  ["ISC", "侦察员、播音室/电视修理服务员、验尸室人员、编目录者、医学实验定技师、调查研究者。"],
  ["ISR", "水生生物学者，昆虫学者、微生物学家、配镜师、矫正视力者、细菌学家、牙科医生、骨科医生。"],
  ["ISA", "实验心理学家、普通心理学家、发展心理学家、教育心理学家、社会心理学家、临床心理学家、目标学家、皮肤病学家、精神病学家、妇产科医师、眼科医生、五官科医生、医学实验室技术专家、民航医务人员、护士。"],
  ["IES", "细菌学家、生理学家、化学专家、地质专家、地理物理学专家、纺织技术专家、医院药剂师、工业药剂师、药房营业员。"],
  ["IEC", "档案保管员、保险统计员。"],
  ["ICR", "质量检验技术员、地质学技师、工程师、法官、图书馆技术辅导员、计算机操作员、医院听诊员、家禽检查员。"],
  ["IRA", "地理学家、地质学家、声学物理学家、矿物学家、古生物学家、石油学家、地震学家、声学物理学家、原子和分子物理学家、电学和磁学物理学家、气象学家、设计审核员、人口统计学家、数学统计学家、外科医生、城市规划家、气象员。"],
  ["IRS", "流体物理学家、物理海洋学家、等离子体物理学家、农业科学家、动物学家、食品科学家、园艺学家、植物学家、细菌学家、解剖学家、动物病理学家、作物病理学家、药物学家、生物化学家、生物物理学家、细胞生物学家、临床化学家、遗传学家、分子生物学家、质量控制工程师、地理学家、兽医、放射性治疗技师。"],
  ["IRE", "化验员、化学工程师、纺织工程师、食品技师、渔业技术专家、材料和测试工程师、电气工程师、土木工程师、航空工程师、行政官员、冶金专家、原子核工程师、陶瓷工程师、地质工程师、电力工程量、口腔科医生、牙科医生。"],
  ["IRC", "飞机领航员、飞行员、物理实验室技师、文献检查员、农业技术专家、动植物技术专家、生物技师、油管检查员、工商业规划者、矿藏安全检查员、纺织品检验员、照相机修理者、工程技术员、编计算程序者、工具设计者、仪器维修工。"],
  ["CRI", "簿记员、会计、记时员、铸造机操作工、打字员、按键操作工、复印机操作工。"],
  ["CRS", "仓库保管员、档案管理员、缝纫工、讲述员、收款人。"],
  ["CRE", "标价员、实验室工作者、广告管理员、自动打字机操作员、电动机装配工、缝纫机操作工。"],
  ["CIS", "记账员、顾客服务员、报刊发行员、土地测量员、保险公司职员、会计师、估价员、邮政检查员、外贸检查员。"],
  ["CIE", "打字员、统计员、支票记录员、订货员、校对员、办公室工作人员。"],
  ["CIR", "校对员、工程职员、海底电报员、检修计划员、发扳员。"],
  ["CSE", "接待员、通讯员、电话接线员、卖票员、旅馆服务员、私人职员、 商学教师、旅游办事员。"],
  ["CSR", "运货代理商、铁路职员、交通检查员、办公室通信员、薄记员、出纳员、银行财务职员。"],
  ["CSA", "秘书、图书管理员、办公室办事员。"],
  ["CER", "邮递员、数据处理员、办公室办事员。"],
  ["CEI", "推销员、经济分析家。"],
  ["CES", "银行会计、记账员、法人秘书、速记员、法院报告人。"],
  ["ECI", "银行行长、审计员、信用管理员、地产管理员、商业管理员。"],
  ["ECS", "信用办事员、保险人员、各类进货员、海关服务经理、售货员，购买员、会计。"],
  ["ERI", "建筑物管理员、工业工程师、农场管理员、护士长、农业经营管理人员。"],
  ["ERS", "仓库管理员、房屋管理员、货栈监督管理员。"],
  ["ERC", "邮政局长、渔船船长、机械操作领班、木工领班、瓦工领班、驾驶员领班。"],
  ["EIR", "科学、技术和有关周期出版物的管理员。"],
  ["EIC", "专利代理人、鉴定人、运输服务检查员、安全检查员、废品收购人员。"],
  ["EIS", "警官、侦察员、交通检验员、安全咨询员、合同管理者、商人。"],
  ["EAS", "法官、律师、公证人。"],
  ["EAR", "展览室管理员、舞台管理员、播音员、训兽员。"],
  ["ESC", "理发师、裁判员、政府行政管理员、财政管理员、I程管理员、职业病防治、售货员、商业经理、办公室主任、人事负责人、调度员。"],
  ["ESR", "家具售货员、书店售货员、公共汽车驾驶员、日用品售货员、护士长、自然科学和工程的行政领导。"],
  ["ESI", "博物馆管理员、图书馆管理员、古迹管理员、饮食业经理、地区安全服务管理员、技术服务咨询者、超级市场管理员、零售商品店店员、批发商、出租汽车服务站调度。"],
  ["ESA", "博物馆馆长、报刊管理员、音乐器材售货员、广告商售画营业员、导游、(轮船或班机上的)事务长、飞机上的服务员、船员、法官、律师。"],
  ["ASE", "戏剧导演、舞蹈教师、广告撰稿人，报刊、专栏作者、记者、演员、英语翻译。"],
  ["ASI", "音乐教师、乐器教师、美术教师、管弦乐指挥，合唱队指挥、歌星、演奏家、哲学家、作家、广告经理、时装模特。"],
  ["AER", "新闻摄影师、电视摄影师、艺术指导、录音指导、丑角演员、魔术师、木偶戏演员、骑士、跳水员。"],
  ["AEI", "音乐指挥、舞台指导、电影导演。"],
  ["AES", "流行歌手、舞蹈演员、电影导演、广播节目主持人、舞蹈教师、口技表演者、喜剧演员、模特。"],
  ["AIS", "画家、剧作家、编辑、评论家、时装艺术大师、新闻摄影师、男演员、文学作者。"],
  ["AIE", "花匠、皮衣设计师、工业产品设计师、剪影艺术家、复制雕刻品大师。"],
  ["AIR", "建筑师、画家、摄影师、绘图员、环境美化工、园艺师、雕刻家、包装设计师、陶器设计师、绣花工、漫画工。"],
  ["SEC", "社会活动家、退伍军人服务官员、工商会事务代表、教育咨询者、宿舍管理员、旅馆经理、饮食服务管理员。"],
  ["SER", "体育教练、游泳指导。"],
  ["SEI", "大学校长、学院院长、医院行政管理员、历史学家、家政经济学家、职业学校教师、资料员。"],
  ["SEA", "娱乐活动管理员、国外服务办事员、社会服务助理、一般咨询者、宗教教育工作者。"],
  ["SCE", "部长助理、福利机构职员、生产协调人、环境卫生管理人员、戏院经理、餐馆经理、售票员。"],
  ["SRI", "外科医师助手、医院服务员。"],
  ["SRE", "体育教师、职业病治疗者、体育教练、专业运动员、房管员、儿童家庭教师、警察、引座员、传达员、保姆。"],
  ["SRC", "护理员、护理助理、医院勤杂工、理发师、学校儿童服务人员。"],
  ["SIA", "社会学家、心理咨询者、学校心理学家、政治科学家、大学或学院的系主任、大学或学院的教育学教师、大学农业教师、大学工程和建筑课程的教师、大学法律教师、大学数学、医学、物理、社会科学和生命科学的教师、研究生助教、成人教育教师。"],
  ["SIE", "营养学家、饮食学家、海关检查员、安全检查员、税务稽查员、校长。 "],
  ["SIC", "描图员、兽医助手、诊所助理、体检检查员、监督缓刑犯的工作者、娱乐指导者、咨询人员、社会科学教师。"],
  ["SIR", "理疗员、救护队工作人员、手足病医生、职业病治疗助手。"],
];
//首字母解析
var aboutFirstCode = [
  ["现实型（R）", "“安分随流、直率坦诚、实事求是、循规蹈矩、坚忍不拔、勤劳节俭”是对这类人较好的描述。他们的动手能力较强，喜欢与机器、工具打交道，喜欢实际操作，做事喜欢遵循一定的规则。他们做人很现实，不是个理想主义者，并且追求安定、舒适的生活。但是。这类人通常表达能力不强，不善与人交际，思想较保守，对新鲜事物不太感兴趣，情感体验也不太丰富，他们的生活也许缺少一些情趣。", "需要进行明确、具体分工的，并有一定程序要求的技术型、技能型工作。如机械制造、建筑、渔业、野外工作、工程技术等职业。（木匠、农民、操作X光的技师、工程师、飞机机械师、鱼类和野生动物专家、自动化技师、机械工(车工、钳工等)、电工、无线电报务员、火车司机、长途公共汽车司机、机械制图员、修理机器、电器师）"],
  ["探索型（I）", "探索型的人对自然现象和自然规律很感兴趣，喜欢同观念而不是同人或事务打交道，对工作有着极大的热情。他们的思维逻辑性较强，善于通过分析思考解决面临的难题，但并不一定实现具体的操作。喜欢面对疑问和不懈的挑战，不愿循规蹈矩，总是渴望创新。他们为人慎重而敏感，追求的是内在自我价值的实现，而非物质生活的质量。他们将自己描绘成“分析型的、内省的、独立的、好奇心强烈的和含蓄的”。", "善于通过观察和科学分析进行系统的创造性活动，一般的研究对象侧重于目然科学而不是社会科学方面。适合这类人的职业有生物学、物理学。气象学、天文学等自然科学方面的科学工作者，化学技师、实验研究人员，建筑设计师等，计算机程序设计员、工程师等。（气象学者、生物学者、天文学家、药剂师、动物学者、化学家、科学报刊编辑、地质学者、植物学者、物理学者、数学家、实验员、科研人员、科技作者）"],
  ["艺术型（A）", "艺术型的人有很强的自我表现欲，对自己十分自信，喜欢通过新颖的设计引起别人情感上的共呜。他们的想象力很丰富，创造力很强，喜欢凭直觉做出判断，感情丰富，容易冲动，甚至可以为追求心中的理想抛弃一切。但他们的生活也许是杂乱无章、缺少秩序的。艺术型的人可以描述为“独立不倚、创新求异、热衷表现、激情洋溢、感情丰富和理想主义”。", "善于通过非系统化的、自由的活动进行艺术表现，但精细的操作能力较差。相应职业有演员、影视工作人员、画家、歌唱家、音乐演奏家、诗人、作家，工艺美术设计人员等。（室内装饰专家、图书管理专家、摄影师、音乐教师、作家、演员、记者、诗人、作曲家、编剧、雕刻家、漫画家）"],
  ["社会型（S）", "社会型的人有较强的社会责任感和人道主义倾向，社会适应能力较强。他们善于与人交往，喜欢周围有别人存在，对别人的事很有兴趣，乐于帮助别人解决难题。这种人喜欢与人而不是与事物打交道。“助人为乐、有责任心、热情、开朗、友好、善良、易于合作”是对他们较好的描述。这类人喜欢社会交往性工作，如教师、医生、护士、公关人员、营销人员等。", "从事更多时间与人打交道的说服、教育和治疗工作。如教师、护士、心理学工作者，社会活动家等。（社会学者、导游、福利机构工作者、咨询人员、社会工作者、社会科学教师、学校领导、精神病工作者、公共保健护士）"],
  ["管理型（E）", "管理型的人充满自信，喜欢竞争和冒险。好成为领导者，好支配他人，善辞令，好与人争辩，总试图让别人接受自己的观点。他们不愿从事精细工作，不喜欢需要长期复杂思维的工作。不愿被人支配，不易与人合作。在别人眼中，他们是“敢做敢为的、信心百倍的、乐观的、冲动的、自我显示的、精力旺盛的”", "适于从事需要胆略、冒风险和承担责任的活动。主要指管理、决策方面的工作。如经理、推销员、电视节目主持人、政治家等。（推销员、进货员、商品批发员、旅馆经理、饭店经理、广告宣传员、调度员、律师、政治家、零售商）"],
  ["常规型（C）", "常规型的人喜欢有秩序的、安稳的生活，做事有计划；乐于执行上级派下来的任务；讲求精确，不愿冒险；想象力和创造力较差。下面的形容词可以很好的描述他们“循规蹈矩、踏实稳当、忠实可靠、顺从听话”。他们与现实型的人区别在于他们对花大量体力和脑力的活动不感兴趣。", "常规型的人适于从事的工作有以下特点：严格按照固定的规则和方法进行的重复性、习惯性的活动，能够较快的见到自己的劳动成果，需要一定的自控能力。具体职业有会计、录入员、图书管理员、审计员、出纳员、秘书、邮递员、税务员、统计员等等。（记账员、法庭速记员、成本估算员、税务员、核算员、打字员、办公室职员、计算机操作员）"],
]

Page({
  /**
   * 页面的初始数据
   */
  data: {
    type1: [],
    type2: [],
    typeChinese: [
      ["R", "机械操作"],
      ["A", "艺术创造"],
      ["I", "科学研究"],
      ["S", "解释表达"],
      ["E", "商业洽谈"],
      ["C", "事务执行"]
    ],
    chanelArray: [
      ["R技能", 0],
      ["A艺术", 0],
      ["I研究", 0],
      ["S社会", 0],
      ["E企业", 0],
      ["C事务", 0]
    ],
    hollandCode: ["", ""],
    firstCode: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
      typeCode= options.result,
      typeR=options.R,
      typeA= options.A,
      typeI= options.I,
      typeS= options.S,
      typeE= options.E,
      typeC= options.C,
      this.setData({
        ["hollandCode[0]"]:options.result
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获取霍兰德代码
    this.getType()
    //雷达图
    this.drawRadar()
    //霍兰德代码职业信息
    this.hollandCodeMessage()
    //首字母解析
    this.firstCodeMessage()
  },
  //智能咨询
  consult:function(){
    wx.redirectTo({
      url: '../consult/consult',
    })
  },
  //返回首页
  backHome:function(){
    wx.redirectTo({
      url: '../index/index',
    })
  },
  //首字母解析
  firstCodeMessage: function () {
    for (let i = 0; i < 3; i++) {
      // console.log(typeCode.substring(i,i+1))
      for (let j = 0; j < aboutFirstCode.length; j++) {
        // console.log(aboutFirstCode[j][0].substring(4,5))
        let CodeNumber1 = "firstCode[" + i + "][0]"
        let CodeNumber2 = "firstCode[" + i + "][1]"
        let CodeNumber3 = "firstCode[" + i + "][2]"
        if (typeCode.substring(i, i + 1) == aboutFirstCode[j][0].substring(4, 5)) {
          this.setData({
            [CodeNumber1]: aboutFirstCode[j][0],
            [CodeNumber2]: aboutFirstCode[j][1],
            [CodeNumber3]: aboutFirstCode[j][2],
          })
          break
        }
      }
    }
  },
  //霍兰德代码职业信息
  hollandCodeMessage: function () {
    //           R   I    C     E   A    S 开始下标
    let i = 0;
    if (typeCode.substring(0, 1) == 'R') {
      i = 0;
    } else if (typeCode.substring(0, 1) == 'I') {
      i = 13;
    } else if (typeCode.substring(0, 1) == 'C') {
      i = 26;
    } else if (typeCode.substring(0, 1) == 'E') {
      i = 38;
    } else if (typeCode.substring(0, 1) == 'A') {
      i = 52;
    } else {
      i = 60;
    }
    let hollandCodeString = "hollandCode[1]"
    let conetent = 0
    for (; i < job.length; i++) {
      if (job[i][0] == typeCode) {
        conetent = 1
        this.setData({
          [hollandCodeString]: job[i][1]
        })
        break
      }
    }
    if (conetent == 0) {
      console.log(this.data.hollandCode[0])
      this.setData({
        [hollandCodeString]: "对冲型人格就业困难，暂未推荐岗位。建议与老师沟通并完成职业生涯规划。"
      })
    }
  },
  // 获取霍兰德代码
  getType: function () {
    this.setData({
      type1: [typeCode.substring(0, 1), typeCode.substring(1, 2), typeCode.substring(2, 3)]
    });
    //代码中文意思
    for (var i = 0; i < this.data.type1.length; i++) {
      // console.log(this.data.type1[i])
      for (var j = 0; j < this.data.typeChinese.length; j++) {
        if (this.data.type1[i] == this.data.typeChinese[j][0]) {
          // console.log(j);
          // console.log(this.data.typeChinese[j][1]);
          let type2Index = 'type2[' + i + ']'
          this.setData({
            [type2Index]: this.data.typeChinese[j][1]
          })
        }
      }
    }

    //更新成绩单
    for (let i = 0; i <= 5; i++) {
      let chanelArrayIndex = 'chanelArray[' + i + '][1]'
      let array1 = [typeR, typeA, typeI, typeS, typeE, typeC]
      this.setData({
        [chanelArrayIndex]: array1[i]
      })
    }
  },
  // 雷达图
  drawRadar: function () {
    var sourceData1 = this.data.chanelArray
    //调用
    this.drawEdge() //画六边形
    this.drawLinePoint()
    //设置数据
    this.drawRegion(sourceData1, 'rgba(53, 152, 254, 0.8)')
    //设置文本数据
    this.drawTextCans(sourceData1)
    //设置节点
    this.drawCircle(sourceData1, 'red')
    //开始绘制
    radCtx.draw()
  },
  // 绘制6条边
  drawEdge: function () {
    radCtx.setStrokeStyle("#ff9501")
    radCtx.setLineWidth(2) //设置线宽
    for (var i = 0; i < numSlot; i++) {
      //计算半径
      radCtx.beginPath()
      var rdius = mRadius / numSlot * (i + 1)
      //画6条线段
      for (var j = 0; j < numCount; j++) {
        //坐标
        var x = mCenter + rdius * Math.cos(mAngle * j);
        var y = mCenter + rdius * Math.sin(mAngle * j);
        radCtx.lineTo(x, y);
      }
      radCtx.closePath()
      radCtx.stroke()
    }
  },
  // 绘制连接点
  drawLinePoint: function () {
    radCtx.beginPath();
    for (var k = 0; k < numCount; k++) {
      var x = mCenter + mRadius * Math.cos(mAngle * k);
      var y = mCenter + mRadius * Math.sin(mAngle * k);

      radCtx.moveTo(mCenter, mCenter);
      radCtx.lineTo(x, y);
    }
    radCtx.stroke();
  },
  //绘制数据区域(数据和填充颜色)
  drawRegion: function (mData, color) {
    radCtx.beginPath();
    for (var m = 0; m < numCount; m++) {
      var x = mCenter + mRadius * Math.cos(mAngle * m) * mData[m][1] / 100;
      var y = mCenter + mRadius * Math.sin(mAngle * m) * mData[m][1] / 100;

      radCtx.lineTo(x, y);
    }
    radCtx.closePath();
    radCtx.setFillStyle(color)
    radCtx.fill();
  },

  //绘制文字
  drawTextCans: function (mData) {
    radCtx.setFillStyle("#363636") //文字黑色
    radCtx.font = 'bold 17px cursive' //设置字体
    for (var n = 0; n < numCount; n++) {
      var x = mCenter + mRadius * Math.cos(mAngle * n);
      var y = mCenter + mRadius * Math.sin(mAngle * n);
      // radCtx.fillText(mData[n][0], x, y);
      //通过不同的位置，调整文本的显示位置
      if (mAngle * n >= 0 && mAngle * n <= Math.PI / 2) {
        radCtx.fillText(mData[n][0], x + 5, y + 5);
      } else if (mAngle * n > Math.PI / 2 && mAngle * n <= Math.PI) {
        radCtx.fillText(mData[n][0], x - radCtx.measureText(mData[n][0]).width - 7, y + 5);
      } else if (mAngle * n > Math.PI && mAngle * n <= Math.PI * 3 / 2) {
        radCtx.fillText(mData[n][0], x - radCtx.measureText(mData[n][0]).width - 5, y);
      } else {
        radCtx.fillText(mData[n][0], x + 7, y + 2);
      }

    }
  },
  //画点
  drawCircle: function (mData, color) {
    var r = 3; //设置节点小圆点的半径
    for (var i = 0; i < numCount; i++) {
      var x = mCenter + mRadius * Math.cos(mAngle * i) * mData[i][1] / 100;
      var y = mCenter + mRadius * Math.sin(mAngle * i) * mData[i][1] / 100;

      radCtx.beginPath();
      radCtx.arc(x, y, r, 0, Math.PI * 2);
      radCtx.fillStyle = color;
      radCtx.fill();
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
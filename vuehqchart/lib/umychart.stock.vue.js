"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

var _JSStockInit$STOCK_FI;

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
   Copyright (c) 2018 jones
 
    http://www.apache.org/licenses/LICENSE-2.0

   开源项目 https://github.com/jones2000/HQChart
 
   jones_2000@163.com

   个股行情数据类
*/

////////////////////////////////////////////////////////////////////////////////////////
//  股票数据
//
///////////////////////////////////////////////////////////////////////////////////////

function JSStockResource() {
    this.Domain = "https://opensource.zealink.com"; //API域名
    this.CacheDomain = "https://opensourcecache.zealink.com"; //缓存域名
}

var g_JSStockResource = new JSStockResource();

//领涨领跌
function IndexTopData() {
    this.Stop; //停牌
    this.Down; //下跌
    this.Up; //上涨
    this.Unchanged; //平盘
    this.UpStock = { "Symbol": null, "Name": null }; //领涨
    this.DownStock = { "Symbol": null, "Name": null }; //领跌
}

function IndexHeatData() {
    this.Good; //健康度
    //this.Date;  //日期
    this.GoodIncrease = { "Day1": null, 'Week1': null, "Week4": null }; //周涨幅
}

function SortData(field, order, tagID) {
    this.arySymbol = new Array(); //成分
    this.SortField = field; //排序字段
    this.Order = order; //1 降, -1 升
    this.TagID = new _set2.default([tagID]); //绑定的元素id
}

//财务数据
function FinanceData() {
    this.ROE; //净资产收益率

    this.Date; //报告日期,
    this.PerSEarning; //每股收益
    this.EPS; //滚动每股收益
    this.PerNetAsset; //每股净资产

    this.NProfit; //净利润
    this.NProfitIncrease; //净利润涨幅 （当年净利润-上一年）/上一年*100

    this.NnetProfit; //扣非净利润
    this.NnProfitIncrease; //扣非净利润涨幅  （当年扣非净利润-上一年）/上一年*100
    this.NnProfitSpeed; //扣非净利润涨速  （当前扣非净利润/上一年-1）/（上一年/上上年-1）
    this.Benford; //财务粉饰

    //TODO:财务数据要了后面再加

    this.SetData = function (data) {
        if (!isNaN(data.roe)) this.ROE = data.roe;
        if (!isNaN(data.finance.date)) this.Date = data.finance.date;
        if (!isNaN(data.finance.persearning)) this.PerSEarning = data.finance.persearning;
        if (!isNaN(data.finance.eps)) this.EPS = data.finance.eps;
        if (!isNaN(data.finance.pernetasset)) this.PerNetAsset = data.finance.pernetasset;
        if (!isNaN(data.finance.nprofit)) this.NProfit = data.finance.nprofit;
        if (!isNaN(data.finance.nprofitincrease)) this.NProfitIncrease = data.finance.nprofitincrease;
        if (!isNaN(data.finance.nnetprofit)) this.NnetProfit = data.finance.nnetprofit;
        if (!isNaN(data.finance.nnprofitincrease)) this.NnProfitIncrease = data.finance.nnprofitincrease;
        if (!isNaN(data.finance.nnprofitspeed)) this.NnProfitSpeed = data.finance.nnprofitspeed;
        if (!isNaN(data.finance.benford)) this.Benford = data.finance.benford;
    };
}

//股本数据
function CapitalData() {
    this.Date; //变动日期	
    this.A; //流通A股
    this.Total; //总股本
    this.ARate; //流通A股占比

    this.SetData = function (data) {
        if (!isNaN(data.capital.date)) this.Date = data.capital.date;
        if (!isNaN(data.capital.a)) this.A = data.capital.a;
        if (!isNaN(data.capital.total)) this.Total = data.capital.total;
        if (!isNaN(data.capital.arate)) this.ARate = data.capital.arate;
    };
}

//资金流(当日)
function CapitalFlowDayData() {
    this.SuperIn; //超大单流入
    this.SuperOut; //超大单流出
    this.BigIn; //大单流入
    this.BigOut; //大单流出
    this.MidIn; //中单流入
    this.MidOut; //中单流出
    this.SmallIn; //小单流入
    this.SmallOut; //小单流出
    this.MainIn; //主力流入
    this.MainOut; //主力流出
    this.MainNetIn; //主力净流入

    this.SetData = function (data) {
        this.SuperIn = data.superin;
        this.SuperOut = data.superout;
        this.BigIn = data.bigin;
        this.BigOut = data.bigout;
        this.MidIn = data.midin;
        this.MidOut = data.midout;
        this.SmallIn = data.smallin; //小单流入
        this.SmallOut = data.smallout; //小单流出
        this.MainIn = data.mainin; //主力流入
        this.MainOut = data.mainout; //主力流出
        this.MainNetIn = data.mainnetin; //主力净流入
    };
}

//资金流(多日)
function CapitalFlowDaysData() {
    this.SuperIn; //超大单流入
    this.SuperOut; //超大单流出
    this.BigIn; //大单流入
    this.BigOut; //大单流出
    this.MidIn; //中单流入
    this.MidOut; //中单流出
    this.SmallIn; //小单流入
    this.SmallOut; //小单流出
    this.MainIn; //主力流入
    this.MainOut; //主力流出
    this.MainNetIn; //主力净流入
    this.MainNetInRatio; //多日日主力净流占比

    this.SetData = function (data) {
        this.SuperIn = data.superin;
        this.SuperOut = data.superout;
        this.BigIn = data.bigin;
        this.BigOut = data.bigout;
        this.MidIn = data.midin;
        this.MidOut = data.midout;
        this.SmallIn = data.smallin; //小单流入
        this.SmallOut = data.smallout; //小单流出
        this.MainIn = data.mainin; //主力流入
        this.MainOut = data.mainout; //主力流出
        this.MainNetIn = data.mainnetin; //主力净流入
        this.MainNetInRatio = data.mainnetinratio;
    };
}

function DDEData() {
    this.DDX;
    this.DDY;
    this.DDZ;

    this.SetData = function (data) {
        this.DDX = data.ddx;
        this.DDY = data.ddy;
        this.DDZ = data.ddz;
    };
}

//个股资料
function CompanyData() {
    this.Name;
    this.Business; //主营业务
    this.Vol; //发行量
    this.Price; //发行价格
    this.ReleaseDate; //上市日期
    this.Competence; //核心竞争力

    this.SetData = function (data) {
        if (!data.company) return;

        this.Name = data.company.name;
        this.Business = data.company.business;
        this.Vol = data.company.vol;
        this.Price = data.company.price;
        this.ReleaseDate = data.company.releasedate;
        this.Competence = data.company.corecompetence;
    };
}

//板块信息
function PlateData() {
    this.Industry; //行业分类
    this.Region; //地区
    this.Concept; //概念

    this.SetData = function (data) {
        this.SetIndustryData(data);
        this.SetRegionData(data);
        this.SetConceptData(data);
    };

    this.SetIndustryData = function (data) {
        if (!data.industry) return;

        this.Industry = [];
        for (var i in data.industry) {
            var item = data.industry[i];
            this.Industry.push({ Name: item.name, Symbol: item.symbol });
        }
    };

    this.SetRegionData = function (data) {
        if (!data.region) return;

        this.Region = [];
        for (var i in data.region) {
            var item = data.region[i];
            this.Region.push({ Name: item.name, Symbol: item.symbol });
        }
    };

    this.SetConceptData = function (data) {
        if (!data.concept) return;

        this.Concept = [];
        for (var i in data.concept) {
            var item = data.concept[i];
            this.Concept.push({ Name: item.name, Symbol: item.symbol });
        }
    };
}

//股票属性事件,属性
function EventData() {
    this.IsMargin = false; //是否是融资融券标题
    this.IsHK = false; //是否有港股
    this.IsSHHK = false; //沪港通
    this.IsSZHK = false; //深股通
    this.STType = 0; //St标识（0：正常股票，1：st股票，2：*st股票）
    this.HK; //港股信息 { Symbol:代码 Name:名称 }

    this.SetData = function (data) {
        if (!data.events) return;

        if (!isNaN(data.events.margin)) this.IsMargin = data.events.margin == 1;
        if (!isNaN(data.events.hk)) this.IsHK = data.events.hk == 1;
        if (!isNaN(data.events.shhk)) this.IsSHHK = data.events.shhk == 1;
        if (!isNaN(data.events.szhk)) this.IsSZHK = data.events.szhk == 1;
        if (!isNaN(data.events.st)) this.STType = data.events.st;

        if (this.IsHK && data.events.hksymbol && data.events.hkname) {
            this.HK = { Symbol: data.events.hksymbol, Name: data.events.hkname };
        }
    };
}

//是否是指数代码(是一个单独的类，从umychart.js复制来的)
function IsIndexSymbol(symbol) {
    var upperSymbol = symbol.toUpperCase();
    if (upperSymbol.indexOf('.SH') > 0) {
        upperSymbol = upperSymbol.replace('.SH', '');
        if (upperSymbol.charAt(0) == '0' && parseInt(upperSymbol) <= 3000) return true;
    } else if (upperSymbol.indexOf('.SZ') > 0) {
        upperSymbol = upperSymbol.replace('.SZ', '');
        if (upperSymbol.charAt(0) == '3' && upperSymbol.charAt(1) == '9') return true;
    } else if (upperSymbol.indexOf('.CI') > 0) //自定义指数
        {
            return true;
        }

    return false;
}

function StockData(symbol) {
    this.Symbol = symbol; //股票代码
    this.Name; //股票名称

    //基础数据
    this.Open; //开盘
    this.Price; //最新
    this.High; //最高
    this.Low; //最低
    this.YClose; //前收盘
    this.Vol; //成交量
    this.Amount; //成交金额
    this.Date; //交易日期
    this.Time; //交易时间
    this.ExchangeRate; //换手率
    this.Amplitude; //振幅
    this.VolRatio; //量比

    this.Increase; //涨幅
    this.MaxPrice; //涨停价
    this.MinPrice; //跌停价
    this.RFPrice; //涨跌额 (Price-YClose)

    this.IndexTop; //涨跌家数
    this.Week; //周涨幅

    this.MinuteAmplitude = {}; //1,3,5,10,15, 振幅
    this.RiseFallSpeed = {}; //1,3,5,10,15 分钟涨速
    this.MAmount = {}; //1,3,5,10,15 分钟成交量

    this.GetBaseData = function (tagID, field) {
        this.BaseDataTagID.add(tagID);
        switch (field) {
            case STOCK_FIELD_NAME.SYMBOL:
                return this.Symbol;
            case STOCK_FIELD_NAME.NAME:
                return this.Name;
            case STOCK_FIELD_NAME.OPEN:
                return this.Open;
            case STOCK_FIELD_NAME.PRICE:
                return this.Price;
            case STOCK_FIELD_NAME.YCLOSE:
                return this.YClose;
            case STOCK_FIELD_NAME.HIGH:
                return this.High;
            case STOCK_FIELD_NAME.LOW:
                return this.Low;
            case STOCK_FIELD_NAME.VOL:
                return this.Vol;
            case STOCK_FIELD_NAME.AMOUNT:
                return this.Amount;
            case STOCK_FIELD_NAME.DATE:
                return this.Date;
            case STOCK_FIELD_NAME.TIME:
                return this.Time;
            case STOCK_FIELD_NAME.INCREASE:
                return this.Increase;
            case STOCK_FIELD_NAME.EXCHANGE_RATE:
                return this.ExchangeRate;
            case STOCK_FIELD_NAME.AMPLITUDE:
                return this.Amplitude;
            case STOCK_FIELD_NAME.MAX_PRICE:
                return this.MaxPrice;
            case STOCK_FIELD_NAME.MIN_PRICE:
                return this.MinPrice;
            case STOCK_FIELD_NAME.RISE_FALL_PRICE:
                return this.RFPrice;
            case STOCK_FIELD_NAME.VOLRATIO:
                return this.VolRatio;

            case STOCK_FIELD_NAME.INDEXTOP:
                return this.IndexTop;
            case STOCK_FIELD_NAME.WEEK:
                return this.Week;
        }
    };

    this.Heat; //热度
    //获取热度数据,不要直接使用变量获取
    this.GetHeatData = function (tagID) {
        this.HeatTagID.add(tagID);
        return this.Heat;
    };

    //成分排序
    this.Sort = new _map2.default(); //key=排序字段-排序方式 value=SortData 一个控件之能有1个排序规则
    this.GetSortData = function (tagID, field, order) {
        var key = field.toString() + '-' + order.toString();
        if (!this.Sort.has(key)) {
            var data = new SortData(field, order, tagID);
            this.Sort.set(key, data);
            return data;
        }

        var data = this.Sort.get(key);
        data.TagID.add(tagID);
        return data;
    };

    this.Buy5; //五档买
    this.GetBuy5 = function (tagID) {
        this.BuySellTagID.add(tagID);
        return this.Buy5;
    };

    this.Sell5; //五档卖
    this.GetSell5 = function (tagID) {
        this.BuySellTagID.add(tagID);
        return this.Sell5;
    };

    this.Deal; //分笔 最新10条
    this.GetDeal = function (tagID) {
        this.DealTagID.add(tagID);
        return this.Deal;
    };

    this.MarketValue; //总市值
    this.FlowMarketValue; //流通市值
    this.Bookrate; //委比
    this.Bookdiffer; //委差
    this.PE; //市盈率
    this.PE2; //市盈率（TTM）
    this.PE3; //市盈率（动）
    this.PB;
    this.GetDerivative = function (tagID, field) {
        this.DerivativeTagID.add(tagID);

        switch (field) {
            case STOCK_FIELD_NAME.MARKET_VALUE:
                return this.MarketValue;
            case STOCK_FIELD_NAME.FLOW_MARKET_VALUE:
                return this.FlowMarketValue;
            case STOCK_FIELD_NAME.BOOK_RATE:
                return this.Bookrate;
            case STOCK_FIELD_NAME.BOOK_DIFFER:
                return this.Bookdiffer;
            case STOCK_FIELD_NAME.PE:
                return this.PE;
            case STOCK_FIELD_NAME.PE2:
                return this.PE2;
            case STOCK_FIELD_NAME.PE3:
                return this.PE3;
            case STOCK_FIELD_NAME.PB:
                return this.PB;
        }
    };

    this.Finance; //财务数据     
    this.GetFinance = function (tagID, field) {
        if (!this.Finance) //只请求一次
            {
                this.FinanceTagID.add(tagID);
                return null;
            }

        switch (field) {
            case STOCK_FIELD_NAME.ROE:
                return this.Finance.ROE;
            case STOCK_FIELD_NAME.FINANCE_DATE:
                return this.Finance.Date;
            case STOCK_FIELD_NAME.FINANCE_PERSEARNING:
                return this.Finance.PerSEarning;
            case STOCK_FIELD_NAME.FINANCE_PERNETASSET:
                return this.Finance.PerNetAsset;
            case STOCK_FIELD_NAME.FINANCE_NPROFIT:
                return this.Finance.NProfit;
            case STOCK_FIELD_NAME.FINANCE_NPROFITINCREASE:
                return this.Finance.NProfitIncrease;
            case STOCK_FIELD_NAME.FINANCE_NNETPROFIT:
                return this.Finance.NnetProfit;
            case STOCK_FIELD_NAME.FINANCE_NNPROFITINCREASE:
                return this.Finance.NnProfitIncrease;
            case STOCK_FIELD_NAME.FINANCE_NNPROFITSPEED:
                return this.Finance.NnProfitSpeed;
            case STOCK_FIELD_NAME.FINANCE_EPS:
                return this.Finance.EPS;
            case STOCK_FIELD_NAME.FINANCE_BENFORD:
                return this.Finance.Benford;
        }
    };

    this.Capital; //股本
    this.GetCapital = function (tagID, field) {
        if (!this.Capital) //只请求一次
            {
                this.CapitalTagID.add(tagID);
                return null;
            }

        switch (field) {
            case STOCK_FIELD_NAME.CAPITAL_TOTAL:
                return this.Capital.Total;
            case STOCK_FIELD_NAME.CAPITAL_A:
                return this.Capital.A;
            case STOCK_FIELD_NAME.CAPTIAL_ARATE:
                return this.Capital.ARate;
        }
    };

    //资金流
    this.CapitalFlowDay;
    this.CapitalFlowDay3;
    this.CapitalFlowDay5;
    this.CapitalFlowDay10;
    this.GetCapitalFlowDay = function (tagID, field) {
        var data = null;
        switch (field) {
            case STOCK_FIELD_NAME.CAPITAL_FLOW_DAY:
                this.CapitalFlowDayID.add(tagID);
                if (this.CapitalFlowDay) data = this.CapitalFlowDay;
                break;
            case STOCK_FIELD_NAME.CAPITAL_FLOW_DAY3:
                this.CapitalFlowDay3ID.add(tagID);
                if (this.CapitalFlowDay3) data = this.CapitalFlowDay3;
                break;
            case STOCK_FIELD_NAME.CAPITAL_FLOW_DAY5:
                this.CapitalFlowDay5ID.add(tagID);
                if (this.CapitalFlowDay5) data = this.CapitalFlowDay5;
                break;
            case STOCK_FIELD_NAME.CAPITAL_FLOW_DAY10:
                this.CapitalFlowDay10ID.add(tagID);
                if (this.CapitalFlowDay10) data = this.CapitalFlowDay10;
                break;
        }
        return data;
    };

    //资金流 DDE
    this.DDE;
    this.DDE3;
    this.DDE5;
    this.DDE10;
    this.GetDDE = function (tagID, field) {
        var data = null;
        switch (field) {
            case STOCK_FIELD_NAME.DDE:
                this.DDEID.add(tagID);
                if (this.DDE) data = this.DDE;
                break;
            case STOCK_FIELD_NAME.DDE3:
                this.DDE3ID.add(tagID);
                if (this.DDE3) data = this.DDE3;
                break;
            case STOCK_FIELD_NAME.DDE5:
                this.DDE5ID.add(tagID);
                if (this.DDE5) data = this.DDE5;
                break;
            case STOCK_FIELD_NAME.DDE10:
                this.DDE10ID.add(tagID);
                if (this.DDE10) data = this.DDE10;
                break;
        }
        return data;
    };

    this.Event; //事件 属性
    this.GetEvent = function (tagID, field) {
        if (!this.Event) {
            this.EventTagID.add(tagID);
            return null;
        }

        return this.Event;
    };

    //个股资料
    this.Company; //个股资料
    this.GetCompany = function (tagID, field) {
        if (!this.Company) //只请求一次
            {
                this.CompanyTagID.add(tagID);
                return null;
            }

        switch (field) {
            case STOCK_FIELD_NAME.COMPANY_NAME:
                return this.Company.Name;
            case STOCK_FIELD_NAME.COMPANY_BUSINESS:
                return this.Company.Business;
            case STOCK_FIELD_NAME.COMPANY_VOL:
                return this.Company.Vol;
            case STOCK_FIELD_NAME.COMPANY_PRICE:
                return this.Company.Price;
            case STOCK_FIELD_NAME.COMPANY_RELEASEDATE:
                return this.Company.ReleaseDate;
            case STOCK_FIELD_NAME.COMPANY_COMPETENCE:
                return this.Company.Competence;
        }
    };

    this.Plate; //板块
    this.GetPlate = function (tagID, field) {
        if (!this.Plate) //只请求一次
            {
                this.PlateTagID.add(tagID);
                return null;
            }

        switch (field) {
            case STOCK_FIELD_NAME.PLATE_INDUSTRY:
                return this.Plate.Industry;
            case STOCK_FIELD_NAME.PLATE_CONCEPT:
                return this.Plate.Concept;
            case STOCK_FIELD_NAME.PLATE_REGION:
                return this.Plate.Region;
        }
    };

    this.TagID = new _set2.default(); //绑定的控件id
    this.BaseDataTagID = new _set2.default(); //基础数据的控件id
    this.HeatTagID = new _set2.default(); //需要热度的控件id
    this.BuySellTagID = new _set2.default(); //买卖盘的控件id
    this.DealTagID = new _set2.default(); //分笔的控件id
    this.DerivativeTagID = new _set2.default(); //衍生数据
    this.FinanceTagID = new _set2.default(); //财务数据 (就请求1次)
    this.CapitalTagID = new _set2.default(); //股本数据 (就请求1次)

    this.CapitalFlowDayID = new _set2.default(); //当日资金流
    this.CapitalFlowDay3ID = new _set2.default(); //3日资金流
    this.CapitalFlowDay5ID = new _set2.default(); //5日资金流
    this.CapitalFlowDay10ID = new _set2.default(); //10日资金流
    this.DDEID = new _set2.default();
    this.DDE3ID = new _set2.default();
    this.DDE5ID = new _set2.default();
    this.DDE10ID = new _set2.default();
    this.EventTagID = new _set2.default(); //股票事件/属性
    this.CompanyTagID = new _set2.default(); //个股资料 (就请求1次)
    this.PlateTagID = new _set2.default(); //板块 概念 地区

    this.AttachTagID = function (id) {
        this.TagID.add(id);
    };

    this.ClearTagID = function () {
        this.TagID.clear();
        this.BaseDataTagID.clear();
        this.HeatTagID.clear();
        this.BuySellTagID.clear();
        this.DealTagID.clear();
        this.DerivativeTagID.clear();
        this.FinanceTagID.clear();
        this.CapitalTagID.clear();

        this.CapitalFlowDayID.clear();
        this.CapitalFlowDay3ID.clear();
        this.CapitalFlowDay5ID.clear();
        this.CapitalFlowDay10ID.clear();

        this.DDEID.clear();
        this.DDE3ID.clear();
        this.DDE5ID.clear();
        this.DDE10ID.clear();

        this.EventTagID.clear();
        this.CompanyTagID.clear();

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)(this.Sort), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                item[1].TagID.clear();
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    };

    this.RemoveTagID = function (id) {
        this.TagID.delete(id);
        this.BaseDataTagID.delete(id);
        this.HeatTagID.delete(id);
        this.BuySellTagID.delete(id);
        this.DealTagID.delete(id);
        this.DerivativeTagID.delete(id);
        this.FinanceTagID.delete(id);
        this.CapitalTagID.delete(id);

        this.CapitalFlowDayID.delete(id);
        this.CapitalFlowDay3ID.delete(id);
        this.CapitalFlowDay5ID.delete(id);
        this.CapitalFlowDay10ID.delete(id);

        this.DDEID.delete(id);
        this.DDE3ID.delete(id);
        this.DDE5ID.delete(id);
        this.DDE10ID.delete(id);

        this.EventTagID.delete(id);
        this.CompanyTagID.delete(id);

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = (0, _getIterator3.default)(this.Sort), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var item = _step2.value;

                item[1].TagID.delete(id);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    };

    //设置基础数据
    this.SetBaseData = function (data) {
        this.Name = data.name;
        this.YClose = data.yclose;
        this.Price = data.price;
        this.High = data.high;
        this.Low = data.low;
        this.Open = data.open;
        this.Vol = data.vol;
        this.Amount = data.amount;
        this.Date = data.date;
        this.Time = data.time;
        this.Increase = data.increase;
        if (!isNaN(data.exchangerate)) this.ExchangeRate = data.exchangerate;
        if (!isNaN(data.amplitude)) this.Amplitude = data.amplitude;
        if (!isNaN(data.volratio)) this.VolRatio = data.volratio;

        if (this.Name.indexOf('ST') >= 0) {
            this.MaxPrice = (1 + 0.05) * this.Open;
            this.MinPrice = (1 - 0.05) * this.Open;
        } else {
            this.MaxPrice = (1 + 0.1) * this.Open;
            this.MinPrice = (1 - 0.1) * this.Open;
        }

        if (this.Price && this.YClose) this.RFPrice = this.Price - this.YClose;

        //周涨幅
        if (data.week) {
            this.Week = {};
            this.Week.Week1 = data.week.week1;
            this.Week.Week4 = data.week.week4;
            this.Week.Week13 = data.week.week13;
            this.Week.Week26 = data.week.week26;
            this.Week.Week52 = data.week.week52;
        }
    };

    this.SetDerivativeData = function (data) {
        this.MarketValue = data.marketvalue; //总市值
        this.FlowMarketValue = data.flowmarketvalue; //流通市值
        this.Bookrate = data.bookrate; //委比
        this.Bookdiffer = data.bookdiffer; //委差
        this.PE = data.pe; //市盈率
        this.PE2 = data.pe2; //市盈率
        this.PE3 = data.pe3; //市盈率
        this.PB = data.pb; //市净率
    };

    this.SetFinanceData = function (data) {
        console.log(data);
        if (!data.finance) return;

        this.Finance = new FinanceData();
        this.Finance.SetData(data);
    };

    this.SetCapitalData = function (data) {
        if (!data.capital) return;

        this.Capital = new CapitalData();
        this.Capital.SetData(data);
    };

    //指数基础数据
    this.SetIndexBaseData = function (data) {
        this.SetBaseData(data);

        var topData = new IndexTopData();
        if (data.indextop) {
            topData.Up = data.indextop.up;
            topData.Down = data.indextop.down;
            topData.Unchanged = data.indextop.unchanged;
            topData.Stop = data.indextop.stop;

            topData.UpStock.Symbol = data.indextop.upstock.symbol;
            topData.UpStock.Name = data.indextop.upstock.name;

            topData.DownStock.Symbol = data.indextop.downstock.symbol;
            topData.DownStock.Name = data.indextop.downstock.name;
        }

        this.IndexTop = topData;
    };

    //五档买卖盘
    this.SetBuySellData = function (data) {
        this.SetBaseData(data);
        this.Buy5 = new Array();
        this.Sell5 = new Array();

        for (var i in data.buy) {
            var item = data.buy[i];

            this.Buy5.push({ "Price": item.price, "Vol": item.vol });
        }

        for (var i in data.sell) {
            var item = data.sell[i];
            this.Sell5.push({ "Price": item.price, "Vol": item.vol });
        }
    };

    //分笔
    this.SetDealData = function (data) {
        this.Price = data.price;
        this.High = data.high;
        this.Low = data.low;
        this.Vol = data.vol;
        this.Amount = data.amount;
        this.Date = data.date;
        this.Time = data.time;
        this.Increase = data.increase;

        this.Deal = new Array();
        for (var i in data.deal) {
            var item = data.deal[i];
            if (isNaN(item.price) || isNaN(item.time)) continue;
            var bs = '';
            if (item.bs === 0) bs = 'B';else if (item.bs === 1) bs = 'S';
            this.Deal.push({ "Price": item.price, "Amount": item.amount, "Vol": item.vol, "Time": item.time, 'BS': bs });
        }
    };

    //热度
    this.SetHeatData = function (data) {
        var heatData = new IndexHeatData();
        heatData.Good = data.quadrant.good;
        heatData.GoodIncrease.Day1 = data.quadrant.gincrease.day1;
        heatData.GoodIncrease.Week1 = data.quadrant.gincrease.week1;
        heatData.GoodIncrease.Week4 = data.quadrant.gincrease.week4;

        this.Heat = heatData;
    };

    this.SetCapitalFlowDayData = function (data, datatype) {
        if (!data) return;

        switch (datatype) {
            case RECV_DATA_TYPE.CAPITAL_FLOW_DAY_DATA:
                this.CapitalFlowDay = new CapitalFlowDayData();
                this.CapitalFlowDay.SetData(data);
                break;
            case RECV_DATA_TYPE.CAPITAL_FLOW_DAY3_DATA:
                this.CapitalFlowDay3 = new CapitalFlowDaysData();
                this.CapitalFlowDay3.SetData(data);
                break;
            case RECV_DATA_TYPE.CAPITAL_FLOW_DAY5_DATA:
                this.CapitalFlowDay5 = new CapitalFlowDaysData();
                this.CapitalFlowDay5.SetData(data);
                break;
            case RECV_DATA_TYPE.CAPITAL_FLOW_DAY10_DATA:
                this.CapitalFlowDay10 = new CapitalFlowDaysData();
                this.CapitalFlowDay10.SetData(data);
                break;
        }
    };

    this.SetDDE = function (data, datatype) {
        if (!data) return;

        switch (datatype) {
            case RECV_DATA_TYPE.DDE_DAY_DATA:
                this.DDE = new DDEData();
                this.DDE.SetData(data);
                break;
            case RECV_DATA_TYPE.DDE_DAY3_DATA:
                this.DDE3 = new DDEData();
                this.DDE3.SetData(data);
                break;
            case RECV_DATA_TYPE.DDE_DAY5_DATA:
                this.DDE5 = new DDEData();
                this.DDE5.SetData(data);
                break;
            case RECV_DATA_TYPE.DDE_DAY10_DATA:
                this.DDE10 = new DDEData();
                this.DDE10.SetData(data);
                break;
        }
        return data;
    };

    this.SetEventData = function (data) {
        if (!data.events) return;

        this.Event = new EventData();
        this.Event.SetData(data);
    };

    this.SetCompanyData = function (data) {
        if (!data.company) return;

        this.Company = new CompanyData();
        this.Company.SetData(data);
    };

    this.SetPlateData = function (data) {
        if (!data.industry && !data.region && !data.concept) return;

        this.Plate = new PlateData();
        this.Plate.SetData(data);
    };
    //所有数据
    this.SetData = function (data) {
        if (data.name) this.Name = data.name;
        if (!isNaN(data.yclose)) this.YClose = data.yclose;
        if (!isNaN(data.price)) this.Price = data.price;
        if (!isNaN(data.high)) this.High = data.high;
        if (!isNaN(data.low)) this.Low = data.low;
        if (!isNaN(data.vol)) this.Vol = data.vol;
        if (!isNaN(data.amount)) this.Amount = data.amount;
        if (!isNaN(data.date)) this.Date = data.date;
        if (!isNaN(data.time)) this.Time = data.time;
        if (!isNaN(data.increase)) this.Increase = data.increase;

        if (!isNaN(data.marketvalue)) this.MarketValue = data.marketvalue; //总市值
        if (!isNaN(data.flowmarketvalue)) this.FlowMarketValue = data.flowmarketvalue; //流通市值
        if (!isNaN(data.bookrate)) this.Bookrate = data.bookrate; //委比
        if (!isNaN(data.bookdiffer)) this.Bookdiffer = data.bookdiffer; //委差
        if (!isNaN(data.pe)) this.PE = data.pe;
        if (!isNaN(data.pb)) this.PB = data.pb;

        if (data.finance) this.SetFinanceData(data);
        if (data.finance) this.SetFinanceDetailData(data);
        if (data.capital) this.SetCapitalData(data);

        if (data.mamplitude) {
            if (!isNaN(data.mamplitude[1])) this.MinuteAmplitude.M1 = data.mamplitude[1];
            if (!isNaN(data.mamplitude[3])) this.MinuteAmplitude.M3 = data.mamplitude[3];
            if (!isNaN(data.mamplitude[5])) this.MinuteAmplitude.M5 = data.mamplitude[5];
            if (!isNaN(data.mamplitude[10])) this.MinuteAmplitude.M10 = data.mamplitude[10];
            if (!isNaN(data.mamplitude[15])) this.MinuteAmplitude.M15 = data.mamplitude[15];
        }

        if (data.risefallspeed) {
            if (!isNaN(data.risefallspeed[1])) this.RiseFallSpeed.M1 = data.risefallspeed[1];
            if (!isNaN(data.risefallspeed[3])) this.RiseFallSpeed.M3 = data.risefallspeed[3];
            if (!isNaN(data.risefallspeed[5])) this.RiseFallSpeed.M5 = data.risefallspeed[5];
            if (!isNaN(data.risefallspeed[10])) this.RiseFallSpeed.M10 = data.risefallspeed[10];
            if (!isNaN(data.risefallspeed[15])) this.RiseFallSpeed.M15 = data.risefallspeed[15];
        }

        if (data.mamount) {
            if (!isNaN(data.mamount[1])) this.MAmount.M1 = data.mamount[1];
            if (!isNaN(data.mamount[3])) this.MAmount.M5 = data.mamount[3];
            if (!isNaN(data.mamount[5])) this.MAmount.M5 = data.mamount[5];
            if (!isNaN(data.mamount[10])) this.MAmount.M10 = data.mamount[10];
            if (!isNaN(data.mamount[15])) this.MAmount.M15 = data.mamount[15];
        }

        //if (data.pledge) this.SetPledgeData(data);
        //if (data.year) this.SetYearData(data);
    };
}

/////////////////////////////////////////////////////////////////////////////////////
//
//

//股票字段枚举
var STOCK_FIELD_NAME = {
    SYMBOL: 0,
    NAME: 1,
    OPEN: 2,
    PRICE: 3,
    HIGH: 4,
    LOW: 5,
    YCLOSE: 6,
    VOL: 7, //成交量
    AMOUNT: 8, //成交金额
    DATE: 9,
    TIME: 10,
    INCREASE: 11,
    BUY5: 12, //5档买
    SELL5: 13, //5挡卖
    DEAL: 14, //分笔
    AMPLITUDE: 15, //振幅

    MARKET_VALUE: 16, //总市值
    FLOW_MARKET_VALUE: 17, //流通市值

    BOOK_RATE: 18, //委比
    BOOK_DIFFER: 19, //委差

    PE: 20, //市盈率=股价/滚动EPS
    PB: 21, //市净率=股价/每股净资产
    EXCHANGE_RATE: 23, //换手率

    //财务数据
    ROE: 24, //净资产收益率
    FINANCE_DATE: 25, //报告日期
    FINANCE_PERSEARNING: 26, //每股收益
    FINANCE_PERNETASSET: 27, //每股净资产

    FINANCE_NPROFIT: 28, //净利润
    FINANCE_NPROFITINCREASE: 29, //净利润涨幅 （当年净利润-上一年）/上一年*100

    FINANCE_NNETPROFIT: 30, //扣非净利润
    FINANCE_NNPROFITINCREASE: 31, //扣非净利润涨幅  （当年扣非净利润-上一年）/上一年*100
    FINANCE_NNPROFITSPEED: 32, //扣非净利润涨速（当前扣非净利润/上一年-1）/（上一年/上上年-1）
    FINANCE_EPS: 33, //滚动EPS

    MAX_PRICE: 34, //涨停价
    MIN_PRICE: 35, //跌停价
    RISE_FALL_PRICE: 36, //涨跌额

    FINANCE_BENFORD: 37, //财务粉饰

    //1，3，5 ，10，15 分钟涨速
    RISEFALLSPEED_1: 38,
    RISEFALLSPEED_3: 39,
    RISEFALLSPEED_5: 40,
    RISEFALLSPEED_10: 41,
    RISEFALLSPEED_15: 42,

    //1，3，5 ，10，15 振幅
    MINUTE_AMPLITUDE_1: 43,
    MINUTE_AMPLITUDE_3: 44,
    MINUTE_AMPLITUDE_5: 45,
    MINUTE_AMPLITUDE_10: 46,
    MINUTE_AMPLITUDE_15: 47,

    //1，3，5 ，10，15 分钟 成交金额
    MINUTE_AMOUNT_1: 48,
    MINUTE_AMOUNT_3: 49,
    MINUTE_AMOUNT_5: 50,
    MINUTE_AMOUNT_10: 51,
    MINUTE_AMOUNT_15: 52,

    //个股资料
    COMPANY_NAME: 53, //公司全称
    PLATE_INDUSTRY: 54, //所属行业
    PLATE_CONCEPT: 55, //概念
    PLATE_REGION: 56, //地区
    COMPANY_BUSINESS: 57,
    COMPANY_VOL: 58,
    COMPANY_PRICE: 59,
    COMPANY_RELEASEDATE: 60,
    COMPANY_COMPETENCE: 61,
    CAPITAL_FLOW_DAY: 67, //当日资金流
    CAPITAL_FLOW_DAY3: 68, //3日资金流
    CAPITAL_FLOW_DAY5: 69, //5日资金流
    CAPITAL_FLOW_DAY10: 70, //10日资金流
    DDE: 71,
    DDE3: 72,
    DDE5: 73,
    DDE10: 74,

    //股票属性|事件 包含
    //      融资融券标,
    //      港股,
    //      沪港通,
    //      St标识 0：正常股票，1：st股票，2：*st股票
    EVENTS: 75,

    CAPITAL_A: 76, //流通A股
    CAPITAL_TOTAL: 77, //总股本
    CAPTIAL_ARATE: 78, //流通A股占比

    VOLRATIO: 79, //量比
    PE2: 80, //市盈率（TTM）
    PE3: 81, //市盈率（动）


    INDEXTOP: 100,
    WEEK: 101,
    HEAT: 102
};

var StockDataFieldName = {
    m_mapFiled: new _map2.default([[STOCK_FIELD_NAME.NAME, "name"], [STOCK_FIELD_NAME.SYMBOL, 'symbol'], [STOCK_FIELD_NAME.PRICE, 'price'], [STOCK_FIELD_NAME.INCREASE, 'increase'], [STOCK_FIELD_NAME.PE, 'pe'], [STOCK_FIELD_NAME.FINANCE_BENFORD, 'finance.benford'], [STOCK_FIELD_NAME.YCLOSE, 'yclose'],

    //1，3，5 ，10，15 分钟涨速
    [STOCK_FIELD_NAME.RISEFALLSPEED_1, 'risefallspeed.1'], [STOCK_FIELD_NAME.RISEFALLSPEED_3, 'risefallspeed.3'], [STOCK_FIELD_NAME.RISEFALLSPEED_5, 'risefallspeed.5'], [STOCK_FIELD_NAME.RISEFALLSPEED_10, 'risefallspeed.10'], [STOCK_FIELD_NAME.RISEFALLSPEED_15, 'risefallspeed.15'],

    //1，3，5 ，10，15 振幅
    [STOCK_FIELD_NAME.MINUTE_AMPLITUDE_1, 'mamplitude.1'], [STOCK_FIELD_NAME.MINUTE_AMPLITUDE_3, 'mamplitude.3'], [STOCK_FIELD_NAME.MINUTE_AMPLITUDE_5, 'mamplitude.5'], [STOCK_FIELD_NAME.MINUTE_AMPLITUDE_10, 'mamplitude.10'], [STOCK_FIELD_NAME.MINUTE_AMPLITUDE_15, 'mamplitude.15'],

    //1，3，5 ，10，15 分钟 成交金额
    [STOCK_FIELD_NAME.MINUTE_AMOUNT_1, 'mamount.1'], [STOCK_FIELD_NAME.MINUTE_AMOUNT_3, 'mamount.3'], [STOCK_FIELD_NAME.MINUTE_AMOUNT_5, 'mamount.5'], [STOCK_FIELD_NAME.MINUTE_AMOUNT_10, 'mamount.10'], [STOCK_FIELD_NAME.MINUTE_AMOUNT_15, 'mamount.15']]),

    GetFieldName: function GetFieldName(fieldID) {
        if (!this.m_mapFiled.has(fieldID)) return null;

        return this.m_mapFiled.get(fieldID);
    }
};

function StockRead(stock, tagID) {
    this.JSStock = stock;
    this.TagID = tagID;

    this.Get = function (symbol, field) {
        var data = stock.Get(symbol, this.TagID);
        if (!data) return null;

        switch (field) {
            case STOCK_FIELD_NAME.SYMBOL:
            case STOCK_FIELD_NAME.NAME:
            case STOCK_FIELD_NAME.OPEN:
            case STOCK_FIELD_NAME.PRICE:
            case STOCK_FIELD_NAME.YCLOSE:
            case STOCK_FIELD_NAME.HIGH:
            case STOCK_FIELD_NAME.LOW:
            case STOCK_FIELD_NAME.VOL:
            case STOCK_FIELD_NAME.AMOUNT:
            case STOCK_FIELD_NAME.DATE:
            case STOCK_FIELD_NAME.TIME:
            case STOCK_FIELD_NAME.INCREASE:
            case STOCK_FIELD_NAME.EXCHANGE_RATE:
            case STOCK_FIELD_NAME.AMPLITUDE:
            case STOCK_FIELD_NAME.MAX_PRICE:
            case STOCK_FIELD_NAME.MIN_PRICE:
            case STOCK_FIELD_NAME.RISE_FALL_PRICE:
            case STOCK_FIELD_NAME.INDEXTOP:
            case STOCK_FIELD_NAME.WEEK:
            case STOCK_FIELD_NAME.VOLRATIO:
                return data.GetBaseData(this.TagID, field);

            case STOCK_FIELD_NAME.HEAT:
                return data.GetHeatData(this.TagID);
            case STOCK_FIELD_NAME.BUY5:
                return data.GetBuy5(this.TagID);
            case STOCK_FIELD_NAME.SELL5:
                return data.GetSell5(this.TagID);
            case STOCK_FIELD_NAME.DEAL:
                return data.GetDeal(this.TagID);

            //实时计算的衍生数据
            case STOCK_FIELD_NAME.MARKET_VALUE:
            case STOCK_FIELD_NAME.FLOW_MARKET_VALUE:
            case STOCK_FIELD_NAME.BOOK_RATE:
            case STOCK_FIELD_NAME.BOOK_DIFFER:
            case STOCK_FIELD_NAME.PE:
            case STOCK_FIELD_NAME.PE2:
            case STOCK_FIELD_NAME.PE3:
            case STOCK_FIELD_NAME.PB:
                return data.GetDerivative(this.TagID, field);

            //财务数据
            case STOCK_FIELD_NAME.ROE:
            case STOCK_FIELD_NAME.FINANCE_DATE:
            case STOCK_FIELD_NAME.FINANCE_PERSEARNING:
            case STOCK_FIELD_NAME.FINANCE_PERNETASSET:
            case STOCK_FIELD_NAME.FINANCE_NPROFIT:
            case STOCK_FIELD_NAME.FINANCE_NPROFITINCREASE:
            case STOCK_FIELD_NAME.FINANCE_NNETPROFIT:
            case STOCK_FIELD_NAME.FINANCE_NNPROFITINCREASE:
            case STOCK_FIELD_NAME.FINANCE_NNPROFITSPEED:
            case STOCK_FIELD_NAME.FINANCE_EPS:
            case STOCK_FIELD_NAME.FINANCE_BENFORD:
                return data.GetFinance(this.TagID, field);

            //行业分类
            case STOCK_FIELD_NAME.PLATE_INDUSTRY:
            case STOCK_FIELD_NAME.PLATE_CONCEPT:
            case STOCK_FIELD_NAME.PLATE_REGION:
                return data.GetPlate(this.TagID, field);

            //资金流 
            case STOCK_FIELD_NAME.CAPITAL_FLOW_DAY:
            case STOCK_FIELD_NAME.CAPITAL_FLOW_DAY3:
            case STOCK_FIELD_NAME.CAPITAL_FLOW_DAY5:
            case STOCK_FIELD_NAME.CAPITAL_FLOW_DAY10:
                return data.GetCapitalFlowDay(this.TagID, field);

            //资金流 DDE
            case STOCK_FIELD_NAME.DDE:
            case STOCK_FIELD_NAME.DDE3:
            case STOCK_FIELD_NAME.DDE5:
            case STOCK_FIELD_NAME.DDE10:
                return data.GetDDE(this.TagID, field);

            //事件/属性
            case STOCK_FIELD_NAME.EVENTS:
                return data.GetEvent(this.TagID, field);
            //个股资料
            case STOCK_FIELD_NAME.COMPANY_NAME:
            case STOCK_FIELD_NAME.COMPANY_BUSINESS:
            case STOCK_FIELD_NAME.COMPANY_VOL:
            case STOCK_FIELD_NAME.COMPANY_PRICE:
            case STOCK_FIELD_NAME.COMPANY_RELEASEDATE:
            case STOCK_FIELD_NAME.COMPANY_COMPETENCE:
                return data.GetCompany(this.TagID, field);
            //股本
            case STOCK_FIELD_NAME.CAPITAL_A:
            case STOCK_FIELD_NAME.CAPTIAL_ARATE:
            case STOCK_FIELD_NAME.CAPITAL_TOTAL:
                return data.GetCapital(this.TagID, field);
            default:
                return null;
        }
    };

    //symbol=指数或板块  field=排序字段  order=排序方式
    this.GetSort = function (symbol, field, order) {
        var data = stock.Get(symbol, this.TagID);
        if (data == null) return data;

        return data.GetSortData(this.TagID, field, order);
    };

    //读取完成 isUpdate 是否马上更新数据
    this.EndRead = function (isUpdate) {
        if (isUpdate == true) this.JSStock.ReqeustData();
    };

    //批量设置查询数据字段
    this.SetQueryField = function (symbol, aryField) {
        for (var i in aryField) {
            this.Get(symbol, aryField[i]);
        }
    };
}

//历史数据  个股财务粉饰 || 大宗交易 || 股东减持 || 限售解禁 || 业绩预告 || 空头指标
function JSStockHistory() {
    this.Symbol;
    this.Callback; //UI回调
    this.Order = -1; //排序方向
    this.SortField; //排序字段
    this.Field; //返回字段
    this.Plate; //全市场
    this.Data = new _map2.default(); //数据
    this.ApiUrl = g_JSStockResource.Domain + "/API/StockHistoryDay";
    this.PageSize = 20; //一页请求10调数据
    this.PageIndex = 1;
    this.Count; //数据总数
    this.currentData = null; //请求入参


    this.RequsetData = function (condition, condition2) {
        var self = this;
        var currentSymbol = typeof self.Symbol == "string" ? [this.Symbol] : this.Symbol;
        var currentSymbolLength = currentSymbol ? currentSymbol.length : 0;

        if (this.Plate) {
            this.currentData = {
                "plate": this.Plate, //["CNA.ci"],
                "symbol": currentSymbol,
                "start": 0,
                "end": this.PageSize,
                "field": this.Field,
                "orderfield": this.SortField,
                "order": this.Order,
                "condition": condition.GetQuery(),
                "condition2": condition2 ? condition2.GetQuery() : []
            };
        } else {
            this.currentData = {
                "symbol": currentSymbol,
                "start": 0,
                "end": currentSymbolLength,
                "field": this.Field,
                "orderfield": this.SortField,
                "order": this.Order,
                "condition": condition.GetQuery(),
                "condition2": condition2 ? condition2.GetQuery() : []
            };
        }

        _jquery2.default.ajax({
            url: this.ApiUrl,
            data: self.currentData,
            method: 'POST',

            dataType: 'json',
            success: function success(data) {
                self.Count = data.data.count;
                self.RecvData(data, condition);
            },
            fail: function fail(request) {
                self.RecvError(request, condition);
            }
        });
    };

    this.GetNextPage = function () {
        var self = this;

        if (this.PageSize * this.PageIndex < this.Count) {
            this.currentData.start = this.PageSize * this.PageIndex;
            this.PageIndex++;
            this.currentData.end = this.PageSize * this.PageIndex;

            _jquery2.default.ajax({
                url: this.ApiUrl,
                data: self.currentData,
                method: 'POST',
                dataType: 'json',
                success: function success(data) {
                    self.RecvData(data);
                },
                fail: function fail(request) {
                    self.RecvError(request);
                }
            });
        } else {
            alert("数据已全部加载");
            // wx.showToast({
            //     title: "数据已全部加载",
            //     icon: 'success',
            //     duration: 1000
            // })
        }
    };

    //结果处理  个股财务粉饰
    this.RecvData = function (recvData, condition) {
        var data = recvData.data;
        for (var i in data.stock) {
            var item = data.stock[i];
            var strSymbol = item.symbol;
            var stockData = {};
            // console.log("this.Data.has(strSymbol)", this.Data, strSymbol, this.Data.has(strSymbol));
            if (this.Data.has(strSymbol)) {
                stockData = this.Data.get(strSymbol);
            } else {
                stockData = {
                    Symbol: item.symbol,
                    Name: item.name,
                    Data: new _map2.default() //Map key=日期  value=Map(key=字段名, value=数值)
                };

                this.Data.set(strSymbol, stockData);
            }

            this.SetStockData(item, stockData);
        }

        if (this.Callback) this.Callback(this, condition);
    };

    this.SetStockData = function (data, stockData) {
        for (var i in data.stockday) {
            var item = data.stockday[i];
            var date = item.date;
            var dataMap = new _map2.default();
            this.SetFinanceData(item, dataMap);
            this.SetBlocktradingData(item, dataMap);
            this.SetChangesData(item, dataMap);
            this.SetLiftingData(item, dataMap);
            this.SetPforecastData(item, dataMap);
            this.SetShortIndicatorsData(item, dataMap);
            stockData.Data.set(date, dataMap);
        }

        return stockData;
    };

    this.SetFinanceData = function (recvData, dataMap) {
        //1季度
        var finnance = recvData.finance1;
        if (finnance) {
            if (!isNaN(finnance.nprofitincrease)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE1_NPROFITINCREASE, finnance.nprofitincrease);
            if (!isNaN(finnance.nnprofitincrease)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE1_NNPROFITINCREASE, finnance.nnprofitincrease);
            if (!isNaN(finnance.nnprofitspeed)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE1_NNPROFITSPEED, finnance.nnprofitspeed);
            if (!isNaN(finnance.benford)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE1_BENFORD, finnance.benford);
        }

        var announcement = recvData.announcement1;
        if (announcement) {
            if (!isNaN(announcement.year)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE1_YEAR, announcement.year);
            if (!isNaN(announcement.quarter)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE1_QUARTER, announcement.quarter);
        }

        //2季度
        var finnance = recvData.finance2;
        if (finnance) {
            if (!isNaN(finnance.nprofitincrease)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE2_NPROFITINCREASE, finnance.nprofitincrease);
            if (!isNaN(finnance.nnprofitincrease)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE2_NNPROFITINCREASE, finnance.nnprofitincrease);
            if (!isNaN(finnance.nnprofitspeed)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE2_NNPROFITSPEED, finnance.nnprofitspeed);
            if (!isNaN(finnance.benford)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE2_BENFORD, finnance.benford);
        }

        var announcement = recvData.announcement2;
        if (announcement) {
            if (!isNaN(announcement.year)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE2_YEAR, announcement.year);
            if (!isNaN(announcement.quarter)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE2_QUARTER, announcement.quarter);
        }

        //3季度
        var finnance = recvData.finance3;
        if (finnance) {
            if (!isNaN(finnance.nprofitincrease)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE3_NPROFITINCREASE, finnance.nprofitincrease);
            if (!isNaN(finnance.nnprofitincrease)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE3_NNPROFITINCREASE, finnance.nnprofitincrease);
            if (!isNaN(finnance.nnprofitspeed)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE3_NNPROFITSPEED, finnance.nnprofitspeed);
            if (!isNaN(finnance.benford)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE3_BENFORD, finnance.benford);
        }

        var announcement = recvData.announcement3;
        if (announcement) {
            if (!isNaN(announcement.year)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE3_YEAR, announcement.year);
            if (!isNaN(announcement.quarter)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE3_QUARTER, announcement.quarter);
        }

        //4季度
        var finnance = recvData.finance4;
        if (finnance) {
            if (!isNaN(finnance.nprofitincrease)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE4_NPROFITINCREASE, finnance.nprofitincrease);
            if (!isNaN(finnance.nnprofitincrease)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE4_NNPROFITINCREASE, finnance.nnprofitincrease);
            if (!isNaN(finnance.nnprofitspeed)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE4_NNPROFITSPEED, finnance.nnprofitspeed);
            if (!isNaN(finnance.benford)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE4_BENFORD, finnance.benford);
        }

        var announcement = recvData.announcement4;
        if (announcement) {
            if (!isNaN(announcement.year)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE4_YEAR, announcement.year);
            if (!isNaN(announcement.quarter)) dataMap.set(STOCK_HISTORY_FIELD_NAME.FINANCE4_QUARTER, announcement.quarter);
        }
    };

    //大宗交易
    this.SetBlocktradingData = function (recvData, dataMap) {
        var blocktrading = recvData.blocktrading;
        if (blocktrading) {
            dataMap.set(STOCK_HISTORY_FIELD_NAME.BLOCK_TRADING, {
                Premium: blocktrading.premium, ////总溢价
                Price: blocktrading.price, //总成交价
                Vol: blocktrading.vol, //总成交量
                Amount: blocktrading.amount //成交额
            });
        }
    };

    //股东减持
    this.SetChangesData = function (recvData, dataMap) {
        var changes = recvData.changes;
        if (changes) {
            dataMap.set(STOCK_HISTORY_FIELD_NAME.HOLDERS_CHANGES, { List: changes.list });
        }
    };

    //限售解禁
    this.SetLiftingData = function (recvData, dataMap) {
        var lifting = recvData.lifting;
        if (lifting) {
            // console.log("lifting",lifting);
            dataMap.set(STOCK_HISTORY_FIELD_NAME.LIFTING, { Lifting: lifting });
        }
    };

    //业绩公告
    this.SetPforecastData = function (recvData, dataMap) {
        var pforecast = recvData.pforecast;
        if (pforecast) {
            // console.log("pforecast", pforecast)
            dataMap.set(STOCK_HISTORY_FIELD_NAME.PFORECAST, {
                Lowprofit: pforecast[0].lowprofit, ////最低利润
                Highprofit: pforecast[0].highprofit, //最高利润
                Lowchange: pforecast[0].lowchange, //最小变动幅度
                Highchange: pforecast[0].highchange, //最小变动幅度
                Reportdate: pforecast[0].reportdate //报告期
            });
        }
    };

    //空头指标
    this.SetShortIndicatorsData = function (recvData, dataMap) {
        // console.log("recvData,dataMap", recvData, dataMap);
        var policy = recvData.policy;
        if (policy) {
            var targetedList = ['三只乌鸦', '乌云盖顶', '黄昏之星', '巨量阴线', '头肩顶', '射击之星', '倾盆大雨', '断头铡刀', '淡友反攻', '空方炮', '连续1周空头排列'];
            var targetedCount = 0,
                timeList = [],
                latestTime = 0,
                latestName = '';
            // console.table(policy); //policy
            policy.forEach(function (e) {
                var isTarget = targetedList.some(function (c) {
                    return c === e.name;
                });
                if (isTarget) {
                    targetedCount++;
                    timeList.push(e.time);
                }
            });
            if (!targetedCount) {
                latestName = '';
            } else {
                latestTime = Math.max.apply(timeList, timeList);
                latestName = policy.find(function (e) {
                    return e.time === latestTime;
                }).name;
            }
            console.log(latestName, targetedCount, "latestName-targetedCount");
            dataMap.set(STOCK_HISTORY_FIELD_NAME.SHORTIND_ICATORS, {
                latestIndicatorName: latestName, ///最新指标名称
                indicatorCount: targetedCount //最新指标数量
            });
        }
    };

    this.RecvError = function (request, condition) {};

    this.CreateCondition = function (name) {
        return new QueryCondition(name);
    };
}

//初始化
JSStock.Init = function () {
    var stock = new JSStock();
    return stock;
};

JSStock.SetDomain = function (domain, cacheDomain) {
    if (domain) g_JSStockResource.Domain = domain;
    if (cacheDomain) g_JSStockResource.CacheDomain = cacheDomain;
};

//获取股票搜索类
JSStock.GetSearchStock = function (callback) {
    return new SearchStock(callback);
};

//短线精灵
JSStock.GetShortTerm = function (symbol) {
    return new ShortTerm(symbol);
};

//每天的分笔数据
JSStock.GetDealDay = function (symbol) {
    return new DealDay(symbol);
};

//板块成员
JSStock.GetBlockMember = function (symbol) {
    return new BlockMember(symbol);
};
JSStock.GetBlockTop = function () {
    return new BlockTop();
};

//走势图图片路径
JSStock.GetMinuteImage = function (symbol) {
    return new MinuteImage(symbol);
};

//获取历史日线收盘数据
JSStock.GetHistoryDayData = function (symbol) {
    return new HistoryDayData(symbol);
};

JSStock.GetDealPriceListData = function (symbol) {
    return new DealPriceListData(symbol);
};

JSStock.GetLatestDetailData = function (symbol) {
    return new LatestDetailData(symbol);
};

//分析板块请求数据
JSStock.GetAnalylisPlate = function () {
    return new AnalylisPlate();
};

//获取历史数据
JSStock.GetStockHistory = function () {
    return new JSStockHistory();
};

var RECV_DATA_TYPE = {
    BASE_DATA: 1, //股票行情基础数据
    INDEX_BASE_DATA: 2, //指数行情基础数据(包含 涨跌家数)
    HEAT_DATA: 3, //热度数据
    SORT_DATA: 4, //排序数据
    BUY_SELL_DATA: 5, //买卖盘数据
    DEAL_DATA: 6, //分笔数据
    DERIVATIVE_DATA: 7, //实时衍生数据
    FINANCE_DATA: 8, //财务数据
    SEARCH_STOCK_DATA: 9, //股票搜索

    SELF_STOCK_DATA: 10, //自选股数据
    LOGON_DATA: 11, //登陆信息
    BLOCK_MEMBER_DATA: 13, //板块成员
    SHORT_TERM_DATA: 14, //短线精灵
    COMPANY_DATA: 15, //个股资料
    PLATE_DATA: 16, //板块(行业 概念 地区)
    CAPITAL_DATA: 17, //股本


    //资金流
    CAPITAL_FLOW_DAY_DATA: 23,
    CAPITAL_FLOW_DAY3_DATA: 24,
    CAPITAL_FLOW_DAY5_DATA: 25,
    CAPITAL_FLOW_DAY10_DATA: 26,

    //DDE
    DDE_DAY_DATA: 27,
    DDE_DAY3_DATA: 28,
    DDE_DAY5_DATA: 29,
    DDE_DAY10_DATA: 30,

    DEAL_DAY_DATA: 105, //分笔数据
    EVENT_DATA: 106, //事件 属性数据
    IMAGE_MINUTE_DATA: 107, //走势图图片
    HISTORY_DAY_DATA: 108, //历史日线收盘数据
    DEAL_PRICE_LIST_DATA: 109, //分价表数据
    LATEST_DETAIL_DATA: 110 //最新分笔数据
};

function JSStock() {
    this.MapStock = new _map2.default(); //key=symbol, value=StockData
    this.MapTagCallback = new _map2.default(); //callback(tagID,arySymbol(更新的股票代码),dataType,this)
    this.RequestVersion = new Array([100, 100, 100]);

    this.RealtimeApiUrl = g_JSStockResource.Domain + "/API/Stock";
    this.PlateQuadrantApiUrl = g_JSStockResource.Domain + "/API/StockPlateQuadrant"; //热度api

    this.IsAutoUpdate = true;
    this.AutoUpateTimeout = 15000; //更新频率
    this.Timeout;

    this.NetworkFilter; //网络过滤接口 function(data, callback)

    this.GetStockRead = function (tagID, callback) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = (0, _getIterator3.default)(this.MapStock), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var item = _step3.value;

                item[1].RemoveTagID(tagID);
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        this.MapTagCallback.set(tagID, callback);

        var read = new StockRead(this, tagID);
        return read;
    };

    //取消某一个控件订阅的股票推送
    this.Unsubscribe = function (tagID) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = (0, _getIterator3.default)(this.MapStock), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var item = _step4.value;

                item[1].RemoveTagID(tagID);
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }
    };

    //取消单个股票上的所有控件订阅
    this.UnsubscribeStock = function (symbol, tagID) {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = (0, _getIterator3.default)(this.MapStock), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var item = _step5.value;

                if (item[0] === symbol) {
                    if (tagID) item[1].RemoveTagID(tagID);else item[1].ClearTagID();

                    console.log("[JSStock::UnsubscribeStock] symbol=" + symbol + ", tagID=" + tagID);
                    break;
                }
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }
    };

    //获取一个股票
    this.Get = function (symbol, tagID) {
        if (!this.MapStock.has(symbol)) {
            this.MapStock.set(symbol, new StockData(symbol));
        }

        var data = this.MapStock.get(symbol);
        if (tagID) data.AttachTagID(tagID);
        return data;
    };

    this.RequestData = function () {
        this.ClearTimer();

        var arySymbol = new Array(); //股票
        var aryIndex = new Array(); //指数
        var aryHeat = new Array(); //热度
        var aryBuySell = new Array(); //5当买卖盘
        var aryDeal = new Array(); //分笔
        var aryDerivative = new Array(); //实时衍生数据
        var aryFinance = new Array(); //财务数据
        var aryFlow = [],
            aryFlow3 = [],
            aryFlow5 = [],
            aryFlow10 = [];
        var aryDDE = [],
            aryDDE3 = [],
            aryDDE5 = [],
            aryDDE10 = [];
        var aryEvent = new Array();
        var aryCompany = new Array(); //个股资料
        var aryPlate = new Array(); //板块(行业 概念 地址)
        var aryCapital = new Array();

        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
            for (var _iterator6 = (0, _getIterator3.default)(this.MapStock), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var item = _step6.value;

                var subscribe = item[1]; //订阅数据
                var symbol = item[0];

                //基础数据
                if (subscribe.BaseDataTagID.size > 0) {
                    if (IsIndexSymbol(symbol)) aryIndex.push(symbol);else arySymbol.push(symbol);
                }

                if (subscribe.BuySellTagID.size > 0) aryBuySell.push(symbol);

                if (subscribe.CapitalFlowDayID.size > 0) aryFlow.push(symbol);
                if (subscribe.CapitalFlowDay3ID.size > 0) aryFlow3.push(symbol);
                if (subscribe.CapitalFlowDay5ID.size > 0) aryFlow5.push(symbol);
                if (subscribe.CapitalFlowDay10ID.size > 0) aryFlow10.push(symbol);

                if (subscribe.DDEID.size > 0) aryDDE.push(symbol);
                if (subscribe.DDE3ID.size > 0) aryDDE3.push(symbol);
                if (subscribe.DDE5ID.size > 0) aryDDE5.push(symbol);
                if (subscribe.DDE10ID.size > 0) aryDDE10.push(symbol);

                if (subscribe.HeatTagID.size > 0) aryHeat.push(symbol);
                if (subscribe.DealTagID.size > 0) aryDeal.push(symbol);
                if (subscribe.DerivativeTagID.size > 0) aryDerivative.push(symbol);
                if (subscribe.FinanceTagID.size > 0) aryFinance.push(symbol);
                if (subscribe.CapitalTagID.size > 0) aryCapital.push(symbol);

                if (subscribe.Event == null && subscribe.EventTagID.size > 0) aryEvent.push(symbol);
                if (subscribe.Company == null && subscribe.CompanyTagID.size > 0) aryCompany.push(symbol);
                if (item[1].Plate == null && item[1].PlateTagID.size > 0) aryPlate.push(item[0]);
            }
        } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                    _iterator6.return();
                }
            } finally {
                if (_didIteratorError6) {
                    throw _iteratorError6;
                }
            }
        }

        if (aryBuySell.length > 0) this.RequestBuySellData(aryBuySell);
        if (arySymbol.length > 0) this.RequestBaseData(arySymbol);
        if (aryIndex.length > 0) this.RequestIndexBaseData(aryIndex);
        if (aryHeat.length > 0) this.RequestIndexHeatData(aryHeat);
        if (aryDeal.length > 0) this.RequestDealData(aryDeal);
        if (aryDerivative.length > 0) this.RequestDerivativeData(aryDerivative);
        if (aryFinance.length > 0) this.RequestFinanceData(aryFinance);
        if (aryCapital.length > 0) this.RequestCapitalData(aryCapital);

        //资金流
        if (aryFlow.length > 0) this.RequestSubDocumentData(aryFlow, 'flowday');
        if (aryFlow3.length > 0) this.RequestSubDocumentData(aryFlow3, 'flowday3');
        if (aryFlow5.length > 0) this.RequestSubDocumentData(aryFlow5, 'flowday5');
        if (aryFlow10.length > 0) this.RequestSubDocumentData(aryFlow10, 'flowday10');
        if (aryDDE.length > 0) this.RequestSubDocumentData(aryDDE, 'dde');
        if (aryDDE3.length > 0) this.RequestSubDocumentData(aryDDE3, 'dde3');
        if (aryDDE5.length > 0) this.RequestSubDocumentData(aryDDE5, 'dde5');
        if (aryDDE10.length > 0) this.RequestSubDocumentData(aryDDE10, 'dde10');

        //属性|事件
        if (aryEvent.length > 0) this.RequestEventData(aryEvent);

        //个股资料
        if (aryCompany.length > 0) this.RequestCompanyData(aryCompany);
        if (aryPlate.length > 0) this.RequestPlateData(aryPlate);
        this.ReqeustAllSortData(); //成分排序
    };

    this.ReqeustData = this.RequestData; //老的接口名字写错了

    //请求基础数据
    this.RequestBaseData = function (arySymbol) {
        var self = this;
        var field = ["name", "symbol", "yclose", "open", "price", "high", "low", "vol", "amount", "date", "time", "week", "increase", "exchangerate", "amplitude", "volratio"];

        if (this.NetworkFilter) {
            var obj = {
                Name: 'JSStock::RequestBaseData', //类名::方法
                Explain: '股票基础数据',
                ID: RECV_DATA_TYPE.BASE_DATA,
                Request: { Url: self.RealtimeApiUrl, Data: { field: field, symbol: arySymbol }, Type: 'POST' },
                Self: this,
                PreventDefault: false
            };
            this.NetworkFilter(obj, function (data) {
                self.RecvData(data, RECV_DATA_TYPE.BASE_DATA);
            });

            if (obj.PreventDefault == true) return; //已被上层替换,不调用默认的网络请求
        }

        _jquery2.default.ajax({
            url: this.RealtimeApiUrl,
            data: {
                "field": field, "symbol": arySymbol
            },
            type: "post",
            dataType: "json",
            async: true,
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.BASE_DATA);
            },
            error: function error(request) {
                self.RecvError(request, RECV_DATA_TYPE.BASE_DATA);
            }
        });
    };

    //请求实时衍生数据
    this.RequestDerivativeData = function (arySymbol) {
        var self = this;
        var field = ["name", "symbol", "marketvalue", "flowmarketvalue", "pe", "pe2", "pe3", "pb", "bookrate", "bookdiffer"];
        if (this.NetworkFilter) {
            var obj = {
                Name: 'JSStock::RequestDerivativeData', //类名::方法
                Explain: '实时衍生数据',
                ID: RECV_DATA_TYPE.DERIVATIVE_DATA,
                Request: { Url: self.RealtimeApiUrl, Data: { field: field, symbol: arySymbol }, Type: 'POST' },
                Self: this,
                PreventDefault: false
            };
            this.NetworkFilter(obj, function (data) {
                self.RecvData(data, RECV_DATA_TYPE.DERIVATIVE_DATA);
            });

            if (obj.PreventDefault == true) return; //已被上层替换,不调用默认的网络请求
        }

        _jquery2.default.ajax({
            url: this.RealtimeApiUrl,
            data: {
                "field": field, "symbol": arySymbol
            },
            type: "post",
            dataType: "json",
            async: true,
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.DERIVATIVE_DATA);
            },
            error: function error(request) {
                self.RecvError(request, RECV_DATA_TYPE.DERIVATIVE_DATA);
            }
        });
    };

    //请求财务数据
    this.RequestFinanceData = function (arySymbol) {
        var self = this;
        var field = ["name", "symbol", "roe", "finance"];

        if (this.NetworkFilter) {
            var obj = {
                Name: 'JSStock::RequestFinanceData', //类名::方法
                Explain: '财务数据',
                ID: RECV_DATA_TYPE.FINANCE_DATA,
                Request: { Url: self.RealtimeApiUrl, Data: { field: field, symbol: arySymbol }, Type: 'POST' },
                Self: this,
                PreventDefault: false
            };
            this.NetworkFilter(obj, function (data) {
                self.RecvData(data, RECV_DATA_TYPE.FINANCE_DATA);
            });

            if (obj.PreventDefault == true) return; //已被上层替换,不调用默认的网络请求
        }

        _jquery2.default.ajax({
            url: this.RealtimeApiUrl,
            data: {
                "field": field, "symbol": arySymbol
            },
            type: "post",
            dataType: "json",
            async: true,
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.FINANCE_DATA);
            },
            error: function error(request) {
                self.RecvError(request, RECV_DATA_TYPE.FINANCE_DATA);
            }
        });
    };

    //请求股本
    this.RequestCapitalData = function (arySymbol) {
        var self = this;
        var field = ["name", "symbol", "capital"];

        if (this.NetworkFilter) {
            var obj = {
                Name: 'JSStock::RequestCapitalData', //类名::方法
                Explain: '股本数据',
                ID: RECV_DATA_TYPE.CAPITAL_DATA,
                Request: { Url: self.RealtimeApiUrl, Data: { field: field, symbol: arySymbol }, Type: 'POST' },
                Self: this,
                PreventDefault: false
            };
            this.NetworkFilter(obj, function (data) {
                self.RecvData(data, RECV_DATA_TYPE.CAPITAL_DATA);
            });

            if (obj.PreventDefault == true) return; //已被上层替换,不调用默认的网络请求
        }

        _jquery2.default.ajax({
            url: this.RealtimeApiUrl,
            data: {
                "field": field, "symbol": arySymbol
            },
            type: "post",
            dataType: "json",
            async: true,
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.CAPITAL_DATA);
            },
            error: function error(request) {
                self.RecvError(request, RECV_DATA_TYPE.CAPITAL_DATA);
            }
        });
    };

    //请求买卖盘
    this.RequestBuySellData = function (arySymbol) {
        var self = this;
        var field = ["name", "symbol", "yclose", "open", "price", "high", "low", "vol", "amount", "date", "time", "week", "increase", "buy", "sell", "exchangerate", "amplitude"];
        if (this.NetworkFilter) {
            var obj = {
                Name: 'JSStock::RequestBuySellData', //类名::方法
                Explain: '买卖盘数据',
                ID: RECV_DATA_TYPE.BUY_SELL_DATA,
                Request: { Url: self.RealtimeApiUrl, Data: { field: field, symbol: arySymbol }, Type: 'POST' },
                Self: this,
                PreventDefault: false
            };
            this.NetworkFilter(obj, function (data) {
                self.RecvData(data, RECV_DATA_TYPE.BUY_SELL_DATA);
            });

            if (obj.PreventDefault == true) return; //已被上层替换,不调用默认的网络请求
        }

        _jquery2.default.ajax({
            url: this.RealtimeApiUrl,
            data: {
                "field": field, "symbol": arySymbol
            },
            type: "post",
            dataType: "json",
            async: true,
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.BUY_SELL_DATA);
            },
            error: function error(request) {
                self.RecvError(request, RECV_DATA_TYPE.BUY_SELL_DATA);
            }
        });
    };

    //请求分笔
    this.RequestDealData = function (arySymbol) {
        var self = this;
        var field = ["name", "symbol", "price", "high", "low", "vol", "amount", "date", "time", "increase", "deal"];

        if (this.NetworkFilter) {
            var obj = {
                Name: 'JSStock::RequestDealData', //类名::方法
                Explain: '分笔数据',
                ID: RECV_DATA_TYPE.DEAL_DATA,
                Request: { Url: self.RealtimeApiUrl, Data: { field: field, symbol: arySymbol }, Type: 'POST' },
                Self: this,
                PreventDefault: false
            };
            this.NetworkFilter(obj, function (data) {
                self.RecvData(data, RECV_DATA_TYPE.DEAL_DATA);
            });

            if (obj.PreventDefault == true) return; //已被上层替换,不调用默认的网络请求
        }

        _jquery2.default.ajax({
            url: this.RealtimeApiUrl,
            data: {
                "field": field, "symbol": arySymbol
            },
            type: "post",
            dataType: "json",
            async: true,
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.DEAL_DATA);
            },
            error: function error(request) {
                self.RecvError(request, RECV_DATA_TYPE.DEAL_DATA);
            }
        });
    };

    //指数基础数据(包含上涨下跌家数)
    this.RequestIndexBaseData = function (arySymbol) {
        var self = this;
        var field = ["name", "symbol", "yclose", "open", "price", "high", "low", "vol", "amount", "date", "time", "week", "indextop", "increase"];
        if (this.NetworkFilter) {
            var obj = {
                Name: 'JSStock::RequestIndexBaseData', //类名::方法
                Explain: '指数基础数据(包含上涨下跌家数)',
                ID: RECV_DATA_TYPE.INDEX_BASE_DATA,
                Request: { Url: self.RealtimeApiUrl, Data: { field: field, symbol: arySymbol }, Type: 'POST' },
                Self: this,
                PreventDefault: false
            };
            this.NetworkFilter(obj, function (data) {
                self.RecvData(data, RECV_DATA_TYPE.INDEX_BASE_DATA);
            });

            if (obj.PreventDefault == true) return; //已被上层替换,不调用默认的网络请求
        }

        _jquery2.default.ajax({
            url: this.RealtimeApiUrl,
            data: {
                "field": field, "symbol": arySymbol
            },
            type: "post",
            dataType: "json",
            async: true,
            success: function success(data) {
                console.log(data);
                self.RecvData(data, RECV_DATA_TYPE.INDEX_BASE_DATA);
            },
            error: function error(request) {
                self.RecvError(request, RECV_DATA_TYPE.INDEX_BASE_DATA);
            }
        });
    };

    //热度
    this.RequestIndexHeatData = function (arySymbol) {
        var self = this;

        _jquery2.default.ajax({
            url: this.PlateQuadrantApiUrl,
            data: {
                "plate": arySymbol
            },
            type: "post",
            dataType: "json",
            async: true,
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.HEAT_DATA);
            },
            error: function error(request) {
                self.RecvError(request, RECV_DATA_TYPE.HEAT_DATA);
            }
        });
    };

    //排序
    this.ReqeustAllSortData = function () {
        var arySort = new Array();
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
            for (var _iterator7 = (0, _getIterator3.default)(this.MapStock), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                var item = _step7.value;

                if (!IsIndexSymbol(item[0])) continue;
                if (item[1].Sort == null || item[1].Sort.size <= 0) continue;

                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;

                try {
                    for (var _iterator8 = (0, _getIterator3.default)(item[1].Sort), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                        var sortItem = _step8.value;

                        var sortData = sortItem[1];
                        var data = { "Plate": item[0], "SortField": sortData.SortField, "Order": sortData.Order, "TagID": sortData.TagID };
                        arySort.push(data);
                    }
                } catch (err) {
                    _didIteratorError8 = true;
                    _iteratorError8 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion8 && _iterator8.return) {
                            _iterator8.return();
                        }
                    } finally {
                        if (_didIteratorError8) {
                            throw _iteratorError8;
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                    _iterator7.return();
                }
            } finally {
                if (_didIteratorError7) {
                    throw _iteratorError7;
                }
            }
        }

        for (var i in arySort) {
            var sortItem = arySort[i];
            this.ReqeustSortData(sortItem);
        }
    };

    this.ReqeustSortData = function (sortItem) {
        var self = this;
        var sortData = sortItem;
        var sortFiled = "";

        //字段id 转换成字段名字
        switch (sortData.SortField) {
            case STOCK_FIELD_NAME.INCREASE:
                sortFiled = 'increase';
                break;
            case STOCK_FIELD_NAME.PRICE:
                sortFiled = 'price';
                break;
            default:
                return;
        }

        var field = ["name", "symbol", "yclose", "open", "price", "high", "low", "vol", "amount", "date", "time", "week", "increase", "exchangerate"];

        if (this.NetworkFilter) {
            var obj = {
                Name: 'JSStock::ReqeustSortData', //类名::方法
                Explain: '板块排序数据',
                ID: RECV_DATA_TYPE.SORT_DATA,
                Request: { Url: self.RealtimeApiUrl,
                    Data: { field: field, plate: [sortItem.Plate], orderfield: sortFiled, order: sortItem.Order, ordernull: 1, filterstop: 1 },
                    Type: 'POST' },
                Self: this,
                PreventDefault: false
            };
            this.NetworkFilter(obj, function (data) {
                self.RecvData(data, RECV_DATA_TYPE.SORT_DATA, sortData);
            });

            if (obj.PreventDefault == true) return; //已被上层替换,不调用默认的网络请求
        }

        _jquery2.default.ajax({
            url: this.RealtimeApiUrl,
            data: {
                "field": field,
                "plate": [sortItem.Plate],
                "orderfield": sortFiled,
                "order": sortItem.Order,
                "ordernull": 1, //过滤null字段
                "filterstop": 1 //过滤掉停牌数据
            },
            type: "post",
            dataType: "json",
            async: true,
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.SORT_DATA, sortData);
            },
            error: function error(request) {
                self.RecvError(request, RECV_DATA_TYPE.SORT_DATA, sortData);
            }
        });
    };

    //资金流
    this.RequestSubDocumentData = function (arySymbol, id) {
        var self = this;
        var mapDay = new _map2.default([['flowday', { Field: 'flowday', RecvID: RECV_DATA_TYPE.CAPITAL_FLOW_DAY_DATA }], ['flowday3', { Field: 'flowday3', RecvID: RECV_DATA_TYPE.CAPITAL_FLOW_DAY3_DATA }], ['flowday5', { Field: 'flowday5', RecvID: RECV_DATA_TYPE.CAPITAL_FLOW_DAY5_DATA }], ['flowday10', { Field: 'flowday10', RecvID: RECV_DATA_TYPE.CAPITAL_FLOW_DAY10_DATA }], ['dde', { Field: 'dde', RecvID: RECV_DATA_TYPE.DDE_DAY_DATA }], ['dde3', { Field: 'dde3', RecvID: RECV_DATA_TYPE.DDE_DAY3_DATA }], ['dde5', { Field: 'dde5', RecvID: RECV_DATA_TYPE.DDE_DAY5_DATA }], ['dde10', { Field: 'dde10', RecvID: RECV_DATA_TYPE.DDE_DAY10_DATA }]]);

        if (!mapDay.has(id)) return;
        var value = mapDay.get(id);

        if (this.NetworkFilter) {
            var obj = {
                Name: 'JSStock::RequestSubDocumentData', //类名::方法
                Explain: '子文档数据',
                ID: value.RecvID,
                Request: { Url: self.RealtimeApiUrl, Data: { field: ["symbol", value.Field], symbol: arySymbol, start: 0, end: 50 }, Type: 'POST' },
                Self: this,
                PreventDefault: false
            };
            this.NetworkFilter(obj, function (data) {
                self.RecvData(data, value.RecvID);
            });

            if (obj.PreventDefault == true) return; //已被上层替换,不调用默认的网络请求
        }

        _jquery2.default.ajax({
            url: this.RealtimeApiUrl,
            data: {
                "field": ["symbol", value.Field],
                "symbol": arySymbol,
                "start": 0,
                "end": 50
            },
            type: "post",
            dataType: "json",
            success: function success(data) {
                self.RecvData(data, value.RecvID);
            },
            error: function error(request) {
                self.RecvError(request, value.RecvID);
            }
        });
    };

    this.RequestEventData = function (arySymbol) {
        var self = this;

        _jquery2.default.ajax({
            url: this.RealtimeApiUrl,
            data: {
                "field": ["symbol", "events.margin", "events.shhk", "events.hk", "events.st", 'events.hksymbol', 'events.hkname', "events.szhk"],
                "symbol": arySymbol,
                "start": 0,
                "end": 50
            },
            type: 'POST',
            dataType: "json",
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.EVENT_DATA);
            },
            error: function error(request) {
                self.RecvError(request, RECV_DATA_TYPE.EVENT_DATA);
            }
        });
    };

    //个股资料
    this.RequestCompanyData = function (arySymbol) {
        var self = this;

        _jquery2.default.ajax({
            url: this.RealtimeApiUrl,
            data: {
                "field": ["name", "symbol", "company"],
                "symbol": arySymbol,
                "start": 0,
                "end": 50
            },
            type: 'POST',
            dataType: "json",
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.COMPANY_DATA);
            },
            error: function error(request) {
                self.RecvError(request, RECV_DATA_TYPE.COMPANY_DATA);
            }
        });
    };

    this.RequestPlateData = function (arySymbol) {
        var self = this;

        _jquery2.default.ajax({
            url: this.RealtimeApiUrl,
            data: {
                "field": ["name", "symbol", "industry", "region", "concept"],
                "symbol": arySymbol,
                "start": 0,
                "end": 50
            },
            type: 'POST',
            dataType: "json",
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.PLATE_DATA);
            },
            error: function error(request) {
                self.RecvError(request, RECV_DATA_TYPE.PLATE_DATA);
            }
        });
    };

    this.RecvError = function (request, datatype, requestData) {
        console.log("RecvError: datatype=" + datatype.toString());
        console.log(request);

        var self = this;
        if (this.Timeout) clearTimeout(this.Timeout); //清空定时器
        this.Timeout = setTimeout(function () {
            self.ReqeustData();
        }, this.AutoUpateTimeout * 2);
    };

    this.RecvData = function (data, datatype, requestData) {
        var mapTagData; //key=界面元素id, value=更新的股票列表

        switch (datatype) {
            case RECV_DATA_TYPE.BASE_DATA:
            case RECV_DATA_TYPE.INDEX_BASE_DATA:
                mapTagData = this.RecvBaseData(data, datatype);
                break;
            case RECV_DATA_TYPE.HEAT_DATA:
                mapTagData = this.RecvHeatData(data, datatype);
                break;
            case RECV_DATA_TYPE.SORT_DATA:
                mapTagData = this.RecvSortData(data, datatype, requestData);
                break;
            case RECV_DATA_TYPE.BUY_SELL_DATA:
                mapTagData = this.RecvBuySellData(data, datatype);
                break;
            case RECV_DATA_TYPE.DEAL_DATA:
                mapTagData = this.RecvDealData(data, datatype);
                break;
            case RECV_DATA_TYPE.DERIVATIVE_DATA:
                mapTagData = this.RecvDerivativeData(data, datatype);
                break;
            case RECV_DATA_TYPE.FINANCE_DATA:
                mapTagData = this.RecvFinanceData(data, datatype);
                break;
            case RECV_DATA_TYPE.CAPITAL_DATA:
                mapTagData = this.RecvCapitalData(data, datatype);
                break;
            case RECV_DATA_TYPE.CAPITAL_FLOW_DAY_DATA:
            case RECV_DATA_TYPE.CAPITAL_FLOW_DAY3_DATA:
            case RECV_DATA_TYPE.CAPITAL_FLOW_DAY5_DATA:
            case RECV_DATA_TYPE.CAPITAL_FLOW_DAY10_DATA:
            case RECV_DATA_TYPE.DDE_DAY_DATA:
            case RECV_DATA_TYPE.DDE_DAY3_DATA:
            case RECV_DATA_TYPE.DDE_DAY5_DATA:
            case RECV_DATA_TYPE.DDE_DAY10_DATA:
                mapTagData = this.RecvSubDocumentData(data, datatype);
                break;
            case RECV_DATA_TYPE.EVENT_DATA:
                mapTagData = this.RecvEventData(data, datatype);
                break;
            case RECV_DATA_TYPE.COMPANY_DATA:
                mapTagData = this.RecvCompanyData(data, datatype);
                break;
            case RECV_DATA_TYPE.PLATE_DATA:
                mapTagData = this.RecvPlateData(data, datatype);
                break;
        }

        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
            for (var _iterator9 = (0, _getIterator3.default)(mapTagData), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                var value = _step9.value;

                if (!this.MapTagCallback.has(value[0])) continue;

                this.MapTagCallback.get(value[0])(value[0], value[1], datatype, this);
            }
        } catch (err) {
            _didIteratorError9 = true;
            _iteratorError9 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                    _iterator9.return();
                }
            } finally {
                if (_didIteratorError9) {
                    throw _iteratorError9;
                }
            }
        }

        this.AutoUpdate();
    };

    this.ClearTimer = function () {
        if (this.Timeout) {
            clearTimeout(this.Timeout); //清空定时器
            this.Timeout = null;
        }
    };

    this.AutoUpdate = function () {
        this.ClearTimer();
        if (!this.IsAutoUpdate) return;

        var self = this;
        var isBeforOpen = false;
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
            for (var _iterator10 = (0, _getIterator3.default)(this.MapStock), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) //只要有1个股票在盘中 就请求数据
            {
                var item = _step10.value;

                var status = STOCK_MARKET.GetMarketStatus(item[0]);
                if (status == 2) //盘中
                    {
                        this.Timeout = setTimeout(function () {
                            self.ReqeustData();
                        }, this.AutoUpateTimeout);
                        return;
                    } else if (status == 1) //盘前
                    {
                        isBeforOpen = true;
                    }
            }

            //盘前
        } catch (err) {
            _didIteratorError10 = true;
            _iteratorError10 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                    _iterator10.return();
                }
            } finally {
                if (_didIteratorError10) {
                    throw _iteratorError10;
                }
            }
        }

        if (isBeforOpen) this.Timeout = setTimeout(function () {
            self.AutoUpdate();
        }, this.AutoUpateTimeout);
    };

    this.RecvBaseData = function (data, datatype) {
        var mapTagData = new _map2.default(); //key=界面元素id, value=更新的股票列表
        for (var i in data.stock) {
            var item = data.stock[i];
            var stockData = this.MapStock.get(item.symbol);
            if (!stockData) continue;

            switch (datatype) {
                case RECV_DATA_TYPE.BASE_DATA:
                    stockData.SetBaseData(item);
                    break;
                case RECV_DATA_TYPE.INDEX_BASE_DATA:
                    stockData.SetIndexBaseData(item);
                    break;
                default:
                    continue;
            }

            if (stockData.TagID.size > 0) {
                var _iteratorNormalCompletion11 = true;
                var _didIteratorError11 = false;
                var _iteratorError11 = undefined;

                try {
                    for (var _iterator11 = (0, _getIterator3.default)(stockData.TagID), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                        var id = _step11.value;

                        if (mapTagData.has(id)) {
                            mapTagData.get(id).push(stockData.Symbol);
                        } else {
                            mapTagData.set(id, new Array(stockData.Symbol));
                        }
                    }
                } catch (err) {
                    _didIteratorError11 = true;
                    _iteratorError11 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion11 && _iterator11.return) {
                            _iterator11.return();
                        }
                    } finally {
                        if (_didIteratorError11) {
                            throw _iteratorError11;
                        }
                    }
                }
            }
        }

        return mapTagData;
    };

    this.RecvBuySellData = function (data, datatype) {
        var mapTagData = new _map2.default(); //key=界面元素id, value=更新的股票列表
        for (var i in data.stock) {
            var item = data.stock[i];
            var stockData = this.MapStock.get(item.symbol);
            if (!stockData) continue;

            stockData.SetBuySellData(item);

            if (stockData.TagID.size > 0) {
                var _iteratorNormalCompletion12 = true;
                var _didIteratorError12 = false;
                var _iteratorError12 = undefined;

                try {
                    for (var _iterator12 = (0, _getIterator3.default)(stockData.TagID), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                        var id = _step12.value;

                        if (mapTagData.has(id)) {
                            mapTagData.get(id).push(stockData.Symbol);
                        } else {
                            mapTagData.set(id, new Array(stockData.Symbol));
                        }
                    }
                } catch (err) {
                    _didIteratorError12 = true;
                    _iteratorError12 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion12 && _iterator12.return) {
                            _iterator12.return();
                        }
                    } finally {
                        if (_didIteratorError12) {
                            throw _iteratorError12;
                        }
                    }
                }
            }

            if (stockData.BuySellTagID.size > 0) {
                var _iteratorNormalCompletion13 = true;
                var _didIteratorError13 = false;
                var _iteratorError13 = undefined;

                try {
                    for (var _iterator13 = (0, _getIterator3.default)(stockData.BuySellTagID), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                        var id = _step13.value;

                        if (mapTagData.has(id)) {
                            mapTagData.get(id).push(stockData.Symbol);
                        } else {
                            mapTagData.set(id, new Array(stockData.Symbol));
                        }
                    }
                } catch (err) {
                    _didIteratorError13 = true;
                    _iteratorError13 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion13 && _iterator13.return) {
                            _iterator13.return();
                        }
                    } finally {
                        if (_didIteratorError13) {
                            throw _iteratorError13;
                        }
                    }
                }
            }
        }

        return mapTagData;
    };

    this.RecvDerivativeData = function (data, datatype) {
        var mapTagData = new _map2.default(); //key=界面元素id, value=更新的股票列表
        for (var i in data.stock) {
            var item = data.stock[i];
            var stockData = this.MapStock.get(item.symbol);
            if (!stockData) continue;

            stockData.SetDerivativeData(item);

            if (stockData.DerivativeTagID.size > 0) {
                var _iteratorNormalCompletion14 = true;
                var _didIteratorError14 = false;
                var _iteratorError14 = undefined;

                try {
                    for (var _iterator14 = (0, _getIterator3.default)(stockData.DerivativeTagID), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                        var id = _step14.value;

                        if (mapTagData.has(id)) {
                            mapTagData.get(id).push(stockData.Symbol);
                        } else {
                            mapTagData.set(id, new Array(stockData.Symbol));
                        }
                    }
                } catch (err) {
                    _didIteratorError14 = true;
                    _iteratorError14 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion14 && _iterator14.return) {
                            _iterator14.return();
                        }
                    } finally {
                        if (_didIteratorError14) {
                            throw _iteratorError14;
                        }
                    }
                }
            }
        }

        return mapTagData;
    };

    this.RecvFinanceData = function (data, datatype) {
        var mapTagData = new _map2.default(); //key=界面元素id, value=更新的股票列表
        for (var i in data.stock) {
            var item = data.stock[i];
            var stockData = this.MapStock.get(item.symbol);
            if (!stockData) continue;

            stockData.SetFinanceData(item);

            if (stockData.FinanceTagID.size > 0) {
                var _iteratorNormalCompletion15 = true;
                var _didIteratorError15 = false;
                var _iteratorError15 = undefined;

                try {
                    for (var _iterator15 = (0, _getIterator3.default)(stockData.FinanceTagID), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                        var id = _step15.value;

                        if (mapTagData.has(id)) {
                            mapTagData.get(id).push(stockData.Symbol);
                        } else {
                            mapTagData.set(id, new Array(stockData.Symbol));
                        }
                    }
                } catch (err) {
                    _didIteratorError15 = true;
                    _iteratorError15 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion15 && _iterator15.return) {
                            _iterator15.return();
                        }
                    } finally {
                        if (_didIteratorError15) {
                            throw _iteratorError15;
                        }
                    }
                }
            }
        }

        return mapTagData;
    };

    this.RecvCapitalData = function (data, datatype) {
        var mapTagData = new _map2.default(); //key=界面元素id, value=更新的股票列表
        for (var i in data.stock) {
            var item = data.stock[i];
            var stockData = this.MapStock.get(item.symbol);
            if (!stockData) continue;

            stockData.SetCapitalData(item);

            if (stockData.CapitalTagID.size > 0) {
                var _iteratorNormalCompletion16 = true;
                var _didIteratorError16 = false;
                var _iteratorError16 = undefined;

                try {
                    for (var _iterator16 = (0, _getIterator3.default)(stockData.CapitalTagID), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                        var id = _step16.value;

                        if (mapTagData.has(id)) {
                            mapTagData.get(id).push(stockData.Symbol);
                        } else {
                            mapTagData.set(id, new Array(stockData.Symbol));
                        }
                    }
                } catch (err) {
                    _didIteratorError16 = true;
                    _iteratorError16 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion16 && _iterator16.return) {
                            _iterator16.return();
                        }
                    } finally {
                        if (_didIteratorError16) {
                            throw _iteratorError16;
                        }
                    }
                }
            }
        }

        return mapTagData;
    };

    this.RecvDealData = function (data, datatype) {
        var mapTagData = new _map2.default(); //key=界面元素id, value=更新的股票列表
        for (var i in data.stock) {
            var item = data.stock[i];
            var stockData = this.MapStock.get(item.symbol);
            if (!stockData) continue;

            stockData.SetDealData(item);

            if (stockData.DealTagID.size > 0) {
                var _iteratorNormalCompletion17 = true;
                var _didIteratorError17 = false;
                var _iteratorError17 = undefined;

                try {
                    for (var _iterator17 = (0, _getIterator3.default)(stockData.DealTagID), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                        var id = _step17.value;

                        if (mapTagData.has(id)) {
                            mapTagData.get(id).push(stockData.Symbol);
                        } else {
                            mapTagData.set(id, new Array(stockData.Symbol));
                        }
                    }
                } catch (err) {
                    _didIteratorError17 = true;
                    _iteratorError17 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion17 && _iterator17.return) {
                            _iterator17.return();
                        }
                    } finally {
                        if (_didIteratorError17) {
                            throw _iteratorError17;
                        }
                    }
                }
            }
        }

        return mapTagData;
    };

    this.RecvHeatData = function (data, datatype) {
        var mapTagData = new _map2.default(); //key=界面元素id, value=更新的股票列表
        for (var i in data.data) {
            var item = data.data[i];
            var stockData = this.MapStock.get(item.symbol);
            if (!stockData) continue;

            stockData.SetHeatData(item);

            if (stockData.HeatTagID.size > 0) {
                var _iteratorNormalCompletion18 = true;
                var _didIteratorError18 = false;
                var _iteratorError18 = undefined;

                try {
                    for (var _iterator18 = (0, _getIterator3.default)(stockData.HeatTagID), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                        var id = _step18.value;

                        if (mapTagData.has(id)) {
                            mapTagData.get(id).push(stockData.Symbol);
                        } else {
                            mapTagData.set(id, new Array(stockData.Symbol));
                        }
                    }
                } catch (err) {
                    _didIteratorError18 = true;
                    _iteratorError18 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion18 && _iterator18.return) {
                            _iterator18.return();
                        }
                    } finally {
                        if (_didIteratorError18) {
                            throw _iteratorError18;
                        }
                    }
                }
            }
        }

        return mapTagData;
    };

    this.RecvSortData = function (data, datatype, sortItem) {
        var mapTagData = new _map2.default(); //key=界面元素id, value=更新的股票列表
        var arySymbol = new Array();
        var stockData = this.MapStock.get(sortItem.Plate);

        for (var i in data.stock) {
            var item = data.stock[i];
            arySymbol.push(item.symbol);

            if (this.MapStock.has(item.symbol)) {
                var itemData = this.MapStock.get(item.symbol);
                itemData.SetBaseData(item);
            } else {
                var itemData = new StockData(item.symbol);
                itemData.SetBaseData(item);
                this.MapStock.set(item.symbol, itemData);
            }
        }

        var key = sortItem.SortField.toString() + '-' + sortItem.Order.toString();
        if (!stockData.Sort.has(key)) return mapTagData;

        var sortData = stockData.Sort.get(key);
        sortData.arySymbol = arySymbol;

        var _iteratorNormalCompletion19 = true;
        var _didIteratorError19 = false;
        var _iteratorError19 = undefined;

        try {
            for (var _iterator19 = (0, _getIterator3.default)(sortItem.TagID), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                var item = _step19.value;

                mapTagData.set(item, new Array([stockData.Symbol]));
            }
        } catch (err) {
            _didIteratorError19 = true;
            _iteratorError19 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion19 && _iterator19.return) {
                    _iterator19.return();
                }
            } finally {
                if (_didIteratorError19) {
                    throw _iteratorError19;
                }
            }
        }

        return mapTagData;
    };

    this.RecvSubDocumentData = function (data, datatype) {
        var mapTagData = new _map2.default(); //key=界面元素id, value=更新的股票列表
        for (var i in data.stock) {
            var item = data.stock[i];
            var stockData = this.MapStock.get(item.symbol);
            if (!stockData) continue;

            var keyData = null;
            switch (datatype) {
                case RECV_DATA_TYPE.CAPITAL_FLOW_DAY_DATA:
                    stockData.SetCapitalFlowDayData(item.flowday, datatype);
                    keyData = stockData.CapitalFlowDayID;
                    break;
                case RECV_DATA_TYPE.CAPITAL_FLOW_DAY3_DATA:
                    stockData.SetCapitalFlowDayData(item.flowday3, datatype);
                    keyData = stockData.CapitalFlowDay3ID;
                    break;
                case RECV_DATA_TYPE.CAPITAL_FLOW_DAY5_DATA:
                    stockData.SetCapitalFlowDayData(item.flowday5, datatype);
                    keyData = stockData.CapitalFlowDay5ID;
                    break;
                case RECV_DATA_TYPE.CAPITAL_FLOW_DAY10_DATA:
                    stockData.SetCapitalFlowDayData(item.flowday10, datatype);
                    keyData = stockData.CapitalFlowDay10ID;
                    break;
                case RECV_DATA_TYPE.DDE_DAY_DATA:
                    stockData.SetDDE(item.dde, datatype);
                    keyData = stockData.DDEID;
                    break;
                case RECV_DATA_TYPE.DDE_DAY3_DATA:
                    stockData.SetDDE(item.dde3, datatype);
                    keyData = stockData.DDE3ID;
                    break;
                case RECV_DATA_TYPE.DDE_DAY5_DATA:
                    stockData.SetDDE(item.dde5, datatype);
                    keyData = stockData.DDE5ID;
                    break;
                case RECV_DATA_TYPE.DDE_DAY10_DATA:
                    stockData.SetDDE(item.dde10, datatype);
                    keyData = stockData.DDE10ID;
                    break;
            }

            if (keyData && keyData.size > 0) {
                var _iteratorNormalCompletion20 = true;
                var _didIteratorError20 = false;
                var _iteratorError20 = undefined;

                try {
                    for (var _iterator20 = (0, _getIterator3.default)(keyData), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                        var id = _step20.value;

                        if (mapTagData.has(id)) {
                            mapTagData.get(id).push(stockData.Symbol);
                        } else {
                            mapTagData.set(id, new Array(stockData.Symbol));
                        }
                    }
                } catch (err) {
                    _didIteratorError20 = true;
                    _iteratorError20 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion20 && _iterator20.return) {
                            _iterator20.return();
                        }
                    } finally {
                        if (_didIteratorError20) {
                            throw _iteratorError20;
                        }
                    }
                }
            }
        }

        return mapTagData;
    };

    this.RecvEventData = function (data, datatype) {
        var mapTagData = new _map2.default(); //key=界面元素id, value=更新的股票列表

        for (var i in data.stock) {
            var item = data.stock[i];
            var stockData = this.MapStock.get(item.symbol);
            if (!stockData) continue;

            stockData.SetEventData(item);
            if (stockData.EventTagID.size > 0) {
                var _iteratorNormalCompletion21 = true;
                var _didIteratorError21 = false;
                var _iteratorError21 = undefined;

                try {
                    for (var _iterator21 = (0, _getIterator3.default)(stockData.EventTagID), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
                        var id = _step21.value;

                        if (mapTagData.has(id)) mapTagData.get(id).push(stockData.Symbol);else mapTagData.set(id, new Array(stockData.Symbol));
                    }
                } catch (err) {
                    _didIteratorError21 = true;
                    _iteratorError21 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion21 && _iterator21.return) {
                            _iterator21.return();
                        }
                    } finally {
                        if (_didIteratorError21) {
                            throw _iteratorError21;
                        }
                    }
                }
            }
        }

        return mapTagData;
    };

    this.RecvCompanyData = function (data, datatype) {
        var mapTagData = new _map2.default(); //key=界面元素id, value=更新的股票列表
        for (var i in data.stock) {
            var item = data.stock[i];
            var stockData = this.MapStock.get(item.symbol);
            if (!stockData) continue;

            stockData.SetCompanyData(item);

            if (stockData.CompanyTagID.size > 0) {
                var _iteratorNormalCompletion22 = true;
                var _didIteratorError22 = false;
                var _iteratorError22 = undefined;

                try {
                    for (var _iterator22 = (0, _getIterator3.default)(stockData.CompanyTagID), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
                        var id = _step22.value;

                        if (mapTagData.has(id)) {
                            mapTagData.get(id).push(stockData.Symbol);
                        } else {
                            mapTagData.set(id, new Array(stockData.Symbol));
                        }
                    }
                } catch (err) {
                    _didIteratorError22 = true;
                    _iteratorError22 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion22 && _iterator22.return) {
                            _iterator22.return();
                        }
                    } finally {
                        if (_didIteratorError22) {
                            throw _iteratorError22;
                        }
                    }
                }
            }
        }

        return mapTagData;
    };

    this.RecvPlateData = function (data, datatype) {
        var mapTagData = new _map2.default(); //key=界面元素id, value=更新的股票列表
        for (var i in data.stock) {
            var item = data.stock[i];
            var stockData = this.MapStock.get(item.symbol);
            if (!stockData) continue;

            stockData.SetPlateData(item);

            if (stockData.PlateTagID.size > 0) {
                var _iteratorNormalCompletion23 = true;
                var _didIteratorError23 = false;
                var _iteratorError23 = undefined;

                try {
                    for (var _iterator23 = (0, _getIterator3.default)(stockData.PlateTagID), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
                        var id = _step23.value;

                        if (mapTagData.has(id)) {
                            mapTagData.get(id).push(stockData.Symbol);
                        } else {
                            mapTagData.set(id, new Array(stockData.Symbol));
                        }
                    }
                } catch (err) {
                    _didIteratorError23 = true;
                    _iteratorError23 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion23 && _iterator23.return) {
                            _iterator23.return();
                        }
                    } finally {
                        if (_didIteratorError23) {
                            throw _iteratorError23;
                        }
                    }
                }
            }
        }

        return mapTagData;
    };
}

//股票搜索返回数据
function SearchStock(callback) {
    this.SearchStockApiUrl = g_JSStockResource.Domain + "/API/StockSpell";
    this.UpdateUICallback = callback;
    this.PageSize = 50; //一页几个数据

    this.Count; //一共的个数
    this.EndOffset; //当前缓存数据的最后一个位移

    this.Data = new Array();
    this.SearchString = "";
    this.SearchType = 0;

    this.Search = function (input, type) {
        if (this.SearchString == input && this.SearchType == type) {
            if (typeof this.UpdateUICallback == 'function') this.UpdateUICallback(this);
        } else {
            this.SearchString = input;
            this.SearchType = type;
            this.Count = 0;
            this.EndOffset = 0;
            this.Data = [];
            var end = this.PageSize - 1;
            this.ReqeustSearchStock(this.SearchString, this.SearchType, this.EndOffset, end);
        }
    };

    this.IsEndPage = function () {
        if (this.Count <= 0) return true;

        return this.EndOffset > this.Count - 1;
    };

    this.NextPage = function () {
        if (this.EndOffset + 1 > this.Count) return;

        var end = this.EndOffset + this.PageSize;
        this.ReqeustSearchStock(this.SearchString, this.SearchType, this.EndOffset, end);
    };

    ///////////////////////////////////////////////////////////////////////
    //查询股票
    this.ReqeustSearchStock = function (input, type, start, end) {
        var self = this;

        _jquery2.default.ajax({
            url: this.SearchStockApiUrl,
            data: {
                "input": input,
                "start": start,
                "end": end,
                'type': type
            },
            type: "post",
            dataType: "json",
            async: true,
            success: function success(data) {
                self.RecvSearchStockData(data, RECV_DATA_TYPE.SEARCH_STOCK_DATA);
            },
            error: function error(request) {
                self.RecvError(request, RECV_DATA_TYPE.SEARCH_STOCK_DATA);
            }
        });
    };

    this.RecvSearchStockData = function (data) {
        for (var i in data.stock) {
            var item = data.stock[i];
            this.Data.push({ "Name": item.name, "Symbol": item.symbol, "Type": item.type });
        }

        if (data.count == 0) {
            this.Count = 0;
            this.EndOffset = 0;
        } else {
            if (this.Count == 0) this.Count = data.count;

            this.EndOffset = data.end;
            if (this.Count > 0 && this.EndOffset > this.Count) this.EndOffset = this.Count - 1;
        }

        if (typeof this.UpdateUICallback == 'function') this.UpdateUICallback(this);
    };

    this.RecvError = function (request, type) {
        console.log("[SearchStock::RecvError] datatype=" + type.toString());
        console.log(request);

        if (typeof this.UpdateUICallback == 'function') this.UpdateUICallback(this, "error");
    };
}

//数据基类
function IStockData() {
    this.IsAutoUpdate = true; //是否自动更新
    this.AutoUpateTimeout = 5000; //更新频率
    this.Timeout; //定时器
    this.ApiUrl;
    this.Data; //数据
    this.Error; //错误信息
    this.UpdateUICallback; //回调函数

    this.RequestData = function () {};

    this.Stop = function () {
        // console.log("[IStockData::Stop] stop update.")
        this.IsAutoUpdate = false;
        if (this.Timeout) clearTimeout(this.Timeout); //清空定时器
    };

    this.AutoUpate = function () {
        if (this.Timeout) clearTimeout(this.Timeout); //清空定时器

        if (!this.IsAutoUpdate) return;

        if (this.Timeout) clearTimeout(this.Timeout); //清空定时器
        if (!this.IsAutoUpdate) return;

        var self = this;
        if (this.Symbol) {
            var status = STOCK_MARKET.GetMarketStatus(this.Symbol);
            if (status == 2) this.Timeout = setTimeout(function () {
                self.RequestData();
            }, this.AutoUpateTimeout);else if (status == 1) this.Timeout = setTimeout(function () {
                self.AutoUpdate();
            }, this.AutoUpateTimeout);
        } else {
            //周日 周6 不更新， [9：30-3：30] 以外的时间不更新
            var self = this;
            var today = new Date();
            var time = today.getHours() * 100 + today.getMinutes();
            if (today.getDay() > 0 && today.getDay() < 6 && time >= 930 && time < 1530) this.Timeout = setTimeout(function () {
                self.RequestData();
            }, this.AutoUpateTimeout);
        }
    };

    this.InvokeUpdateUICallback = function () {
        if (this.UpdateUICallback) this.UpdateUICallback(this);
    };
}

//短线精灵 只获取最新数据
function ShortTerm(symbol) {
    this.newMethod = IStockData; //派生
    this.newMethod();
    delete this.newMethod;

    this.Symbol = symbol; //数组
    this.ApiUrl = g_JSStockResource.Domain + "/API/StockShortTerm";
    this.Count = 20; //请求数据个数

    this.RequestData = function () {
        var self = this;
        var data = { count: this.Count };
        if (this.Symbol) data.symbol = this.Symbol;

        _jquery2.default.ajax({
            url: this.ApiUrl,
            data: data,
            type: "post",
            dataType: 'json',
            async: true,
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.SHORT_TERM_DATA);
            },
            fail: function fail(request) {
                self.RecvError(request, RECV_DATA_TYPE.SHORT_TERM_DATA);
            }
        });
    };

    this.RecvData = function (data, dataType) {

        this.Data = [];
        for (var i in data.shortterm) {
            var item = data.shortterm[i];
            this.Data.push({
                Date: item.date,
                Name: item.name,
                Symbol: item.symbol,
                Time: item.time,
                Content: item.content,
                TypeInfo: item.typeinfo,
                Type: item.type
            });
        }

        if (this.UpdateUICallback) this.UpdateUICallback(this);

        this.AutoUpate();
    };

    this.RecvError = function (request, dataType) {};
}

//每天历史的分笔数据 
function DealDay(symbol) {
    this.newMethod = IStockData; //派生
    this.newMethod();
    delete this.newMethod;

    this.Symbol = symbol; //数组
    this.Date; //交易日期

    this.RequestData = function () {
        this.Data = null;
        this.Error = null;

        var self = this;
        var apiUrl = g_JSStockResource.CacheDomain + "/cache/dealday/day/" + this.Date + '/' + this.Symbol + '.json';
        console.log('[DealDay::RequestData] cache url ', apiUrl);
        _jquery2.default.ajax({
            url: apiUrl,
            type: "get",
            dataType: 'json',
            async: true,
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.DEAL_DAY_DATA);
            },
            error: function error(request) {
                self.RecvError(request, RECV_DATA_TYPE.DEAL_DAY_DATA);
            }
        });
    };

    this.RecvData = function (data, dataType) {
        if (!data.day || !data.deal) {
            this.InvokeUpdateUICallback();
            return;
        }

        var amount = data.deal.amount;
        var price = data.deal.price;
        var time = data.deal.time;
        var vol = data.deal.vol;
        var flag = data.deal.flag;

        if (!flag || !vol || !time || !price || !amount) {
            this.InvokeUpdateUICallback();
            return;
        }

        var dealData = {
            Date: data.date, //日期
            Open: data.day.open, //开盘
            Close: data.day.price, //收盘
            YClose: data.day.yclose, //昨收
            Symbol: data.symbol,
            Name: data.name,
            Deal: [],
            PriceList: [] //分价表
        };

        var mapPrice = new _map2.default(); //分价表 key=价格 value={Vol:成交量, Proportion:占比, Price:价格, BuyVol:买量, SellVol:买量, NoneVol:不明盘  }
        var totalVol = 0; //一共的成交量
        var minCount = Math.min(time.length, vol.length, flag.length, price.length, amount.length);
        for (var i = 0; i < minCount; ++i) {
            var _item = { Time: time[i], Vol: vol[i], Flag: '', Price: price[i], Amount: amount[i] };
            if (flag[i] === 0) _item.Flag = 'B';else if (flag[i] === 1) _item.Flag = 'S';

            if (_item.Time > 150000) _item.Time = 150000; //盘后数据都算在15:00

            dealData.Deal.push(_item);
            var priceItem;
            if (mapPrice.has(_item.Price)) {
                priceItem = mapPrice.get(_item.Price);
                priceItem.Vol += _item.Vol; //成交量累加
            } else {
                priceItem = { Vol: _item.Vol, Price: _item.Price, BuyVol: 0, SellVol: 0, NoneVol: 0 };
                mapPrice.set(_item.Price, priceItem);
            }

            if (flag[i] === 0) priceItem.BuyVol += _item.Vol;else if (flag[i] === 1) priceItem.SellVol += _item.Vol;else priceItem.NoneVol += _item.Vol;

            totalVol += _item.Vol;
        }

        var _iteratorNormalCompletion24 = true;
        var _didIteratorError24 = false;
        var _iteratorError24 = undefined;

        try {
            for (var _iterator24 = (0, _getIterator3.default)(mapPrice), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
                var item = _step24.value;

                var itemData = item[1];
                if (totalVol > 0) itemData.Proportion = itemData.Vol / totalVol;
                dealData.PriceList.push(itemData);
            }
        } catch (err) {
            _didIteratorError24 = true;
            _iteratorError24 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion24 && _iterator24.return) {
                    _iterator24.return();
                }
            } finally {
                if (_didIteratorError24) {
                    throw _iteratorError24;
                }
            }
        }

        dealData.PriceList.sort(function (a, b) {
            return b.Price - a.Price;
        }); //排序

        this.Data = dealData;

        this.InvokeUpdateUICallback();
    };

    this.RecvError = function (request, dataType) {
        console.log("[DealDay::RecvError] status=" + request.status + " statusText=" + request.statusText + " responseText=" + request.responseText);

        this.Error = { Status: request.status, Message: request.responseText };
        this.InvokeUpdateUICallback();
    };
}

//板块成分 支持排序
function BlockMember(symbol) {
    this.newMethod = IStockData; //派生
    this.newMethod();
    delete this.newMethod;

    this.ApiUrl = g_JSStockResource.Domain + "/API/StockBlockMember";
    this.PageSize = 10; //一页几个数据
    this.Start = 0; //取数据的起始位置
    this.OrderField; //排序字段
    this.Order; //排序方向 -1 /1
    this.Symbol = symbol;
    this.OrderNull = 0; //排序是否提出null字段

    this.Field = new Array(); //字段
    this.Data = new Array(); //数据

    this.PageInfo; //分页信息

    this.SetField = function (aryFiled) {
        this.Field = new Array();
        for (var i in aryFiled) {
            var item = aryFiled[i];
            var name = StockDataFieldName.GetFieldName(item);
            if (name == null) continue;

            this.Field.push(name);
        }
        // this.Field = aryFiled.length > 0 ? aryFiled : [];

        return this.Field.length > 0;
    };

    this.SetOrder = function (fieldID, order) {
        this.Order = null;
        this.OrderField = null;

        var name = StockDataFieldName.GetFieldName(fieldID);
        if (name == null) return false;

        this.OrderField = name;
        this.Order = order;
        return true;
    };

    this.RequestData = function () {
        this.Data = [];
        var self = this;

        _jquery2.default.ajax({
            url: this.ApiUrl,
            data: {
                "symbol": this.Symbol,
                "field": this.Field,
                "order": this.Order,
                "orderfield": this.OrderField,
                "start": this.Start,
                "end": this.Start + this.PageSize,
                "ordernull": this.OrderNull
            },
            type: "post",
            dataType: 'json',
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.BLOCK_MEMBER_DATA);
            },
            error: function error(request) {
                self.RecvError(request, RECV_DATA_TYPE.BLOCK_MEMBER_DATA);
            }
        });
    };

    this.RecvData = function (data, dataType) {
        for (var i in data.stock) {
            var item = data.stock[i];
            if (item.symbol == null) continue;

            var stock = new StockData(item.symbol);
            stock.SetData(item);

            this.Data.push(stock);
        }

        this.PageInfo = { Count: data.count, Start: data.start, End: data.end };

        if (typeof this.UpdateUICallback == 'function') this.UpdateUICallback(this);

        this.AutoUpate(); //自动更新
    };

    this.RecvError = function (reqeust, dataType) {};
}

//板块排名
function BlockTop() {
    this.newMethod = IStockData; //派生
    this.newMethod();
    delete this.newMethod;

    this.BlockType = 1; //板块类型
    this.Count = 20;

    this.OrderField = 'increase'; //排序字段
    this.Order = -1; //排序方向 -1 /1
    this.Field = ["symbol", "price", "name", "vol", "increase", "indextop", 'risefall'];

    this.ApiUrl = g_JSStockResource.Domain + "/API/StockBlockTop";

    this.SetField = function (field) {};

    this.ReqeustData = function () {
        var self = this;

        _jquery2.default.ajax({
            url: this.ApiUrl,
            data: {
                "blocktype": this.BlockType,
                "start": 0,
                "end": this.Count,
                "field": this.Field,
                "orderfield": this.OrderField,
                "order": this.Order
            },
            type: "post",
            dataType: 'json',
            async: true,
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.BLOCK_TOP_DATA);
            },
            fail: function fail(request) {
                self.RecvError(request, RECV_DATA_TYPE.BLOCK_TOP_DATA);
            }
        });
    };

    this.RecvData = function (recvData, dataType) {
        var data = recvData;

        this.Data = [];
        this.resCount = data.count;
        for (var i in data.stock) {
            var item = data.stock[i];
            if (item.indextop != null) {
                var indextop = {
                    Down: item.indextop.down,
                    Stop: item.indextop.stop,
                    Up: item.indextop.up,
                    Unchanged: item.indextop.unchanged,
                    DownStock: { Name: item.indextop.downstock.name, Symbol: item.indextop.downstock.symbol },
                    UpStock: { Name: item.indextop.upstock.name, Symbol: item.indextop.upstock.symbol }
                };
            };
            this.Data.push({
                Name: item.name,
                Symbol: item.symbol,
                Increase: item.increase,
                Risefall: item.risefall,
                IndexTop: indextop
            });
        }

        if (this.UpdateUICallback) this.UpdateUICallback(this);

        this.AutoUpate();
    };

    this.RecvError = function (request, dataType) {};
}

//获取股票走势图图片路径
function MinuteImage(symbol) {
    this.newMethod = IStockData; //派生
    this.newMethod();
    delete this.newMethod;

    this.ApiUrl = g_JSStockResource.Domain + "/API/StockMinuteImage";
    this.Symbol = [symbol]; //支持批量获取
    this.Data = []; //数据 {Symbol: 股票代码, Image:图片相对路径 }

    this.RequestData = function () {
        this.Data = [];
        var self = this;

        _jquery2.default.ajax({
            url: this.ApiUrl,
            data: { "symbol": this.Symbol },
            type: "post",
            dataType: 'json',
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.IMAGE_MINUTE_DATA);
            },
            error: function error(request) {
                self.RecvError(request, RECV_DATA_TYPE.IMAGE_MINUTE_DATA);
            }
        });
    };

    this.RecvData = function (data, dataType) {
        for (var i in data.symbol) {
            var item = { Symbol: data.symbol[i], Image: data.imagerelative[i] };
            this.Data.push(item);
        }

        if (typeof this.UpdateUICallback == 'function') this.UpdateUICallback(this);
    };

    this.RecvError = function (reqeust, dataType) {};
}

//获取历史K线数据(不包含最新数据)
function HistoryDayData(symbol) {
    this.newMethod = IStockData; //派生
    this.newMethod();
    delete this.newMethod;

    this.Symbol = symbol; //数组

    this.RequestData = function () {
        this.Data = null;
        this.Error = null;

        var self = this;

        var apiUrl = g_JSStockResource.CacheDomain + "/cache/historyday/all/" + this.Symbol + '.json';
        console.log('[HistoryDayData::RequestData] cache url ', apiUrl);
        _jquery2.default.ajax({
            url: apiUrl,
            type: "get",
            dataType: 'json',
            async: true,
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.HISTORY_DAY_DATA);
            },
            error: function error(request) {
                self.RecvError(request, RECV_DATA_TYPE.HISTORY_DAY_DATA);
            }
        });
    };

    this.RecvData = function (data, dataType) {
        if (!data.symbol || !data.name) {
            this.InvokeUpdateUICallback();
            return;
        }

        var amount = data.amount;
        var close = data.close;
        var date = data.date;
        var high = data.high;
        var low = data.low;
        var open = data.open;
        var vol = data.vol;
        var yclose = data.yclose;

        if (!amount || !close || !date || !high || !low || !open || !vol || !yclose) {
            this.InvokeUpdateUICallback();
            return;
        }

        var historyData = {
            UpdateDate: data.update,
            Symbol: data.symbol,
            Name: data.name,
            KLine: []
        };

        for (var i = 0; i < date.length; ++i) {
            var item = { Date: date[i], YClose: yclose[i], Open: open[i], High: high[i], Low: low[i], Close: close[i], Vol: vol[i], Amount: amount[i] };

            historyData.KLine.push(item);
        }

        this.Data = historyData;

        this.InvokeUpdateUICallback();
    };

    this.RecvError = function (request, dataType) {
        console.log("[HistoryDayData::RecvError] status=" + request.status + " statusText=" + request.statusText + " responseText=" + request.responseText);

        this.Error = { Status: request.status, Message: request.responseText };
        this.InvokeUpdateUICallback();
    };

    this.GetWeekData = function () {
        if (!this.Data || !this.Data.KLine) return [];

        var result = this.GetDayPeriodData(1);
        return result;
    };

    this.GetMonthData = function () {
        if (!this.Data || !this.Data.KLine) return [];

        var result = this.GetDayPeriodData(2);
        return result;
    };

    //计算周,月,年
    this.GetDayPeriodData = function (period) {
        var result = new Array();
        var index = 0;
        var startDate = 0;
        var newData = null;
        for (var i in this.Data.KLine) {
            var isNewData = false;
            var dayData = this.Data.KLine[i];

            switch (period) {
                case 1:
                    //周线
                    var fridayDate = this.GetFirday(dayData.Date);
                    if (fridayDate != startDate) {
                        isNewData = true;
                        startDate = fridayDate;
                    }
                    break;
                case 2:
                    //月线
                    if (parseInt(dayData.Date / 100) != parseInt(startDate / 100)) {
                        isNewData = true;
                        startDate = dayData.Date;
                    }
                    break;
                case 3:
                    //年线
                    if (parseInt(dayData.Date / 10000) != parseInt(startDate / 10000)) {
                        isNewData = true;
                        startDate = dayData.Date;
                    }
                    break;
            }

            if (isNewData) {
                newData = {};
                newData.Date = dayData.Date;
                result.push(newData);

                if (dayData.Open == null || dayData.Close == null) continue;

                newData.Open = dayData.Open;
                newData.High = dayData.High;
                newData.Low = dayData.Low;
                newData.YClose = dayData.YClose;
                newData.Close = dayData.Close;
                newData.Vol = dayData.Vol;
                newData.Amount = dayData.Amount;
            } else {
                if (newData == null) continue;
                if (dayData.Open == null || dayData.Close == null) continue;

                if (newData.Open == null || newData.Close == null) {
                    newData.Open = dayData.Open;
                    newData.High = dayData.High;
                    newData.Low = dayData.Low;
                    newData.YClose = dayData.YClose;
                    newData.Close = dayData.Close;
                    newData.Vol = dayData.Vol;
                    newData.Amount = dayData.Amount;
                } else {
                    if (newData.High < dayData.High) newData.High = dayData.High;
                    if (newData.Low > dayData.Low) newData.Low = dayData.Low;

                    newData.Close = dayData.Close;
                    newData.Vol += dayData.Vol;
                    newData.Amount += dayData.Amount;
                    newData.Date = dayData.Date;
                }
            }
        }

        return result;
    };

    this.GetFirday = function (value) {
        var date = new Date(parseInt(value / 10000), value / 100 % 100 - 1, value % 100);
        var day = date.getDay();
        if (day == 5) return value;

        var timestamp = date.getTime();
        if (day < 5) {
            var prevTimestamp = 24 * 60 * 60 * 1000 * (5 - day);
            timestamp += prevTimestamp;
        } else {
            var prevTimestamp = 24 * 60 * 60 * 1000 * (day - 5);
            timestamp -= prevTimestamp;
        }

        date.setTime(timestamp);
        var fridayDate = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
        var week = date.getDay();
        return fridayDate;
    };
}

//最新个股分价表
function DealPriceListData(symbol) {
    this.newMethod = IStockData; //派生
    this.newMethod();
    delete this.newMethod;

    this.Symbol = symbol;
    this.ApiUrl = g_JSStockResource.Domain + "/API/StockPriceList";

    this.RequestData = function () {
        if (!this.Symbol) return;

        var self = this;
        var data = {};
        if (Array.isArray(this.Symbol)) data.Symbol = this.Symbol; //数组
        else data.Symbol = [this.Symbol];

        _jquery2.default.ajax({
            url: this.ApiUrl,
            data: data,
            type: "post",
            dataType: 'json',
            async: true,
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.DEAL_PRICE_LIST_DATA);
            },
            fail: function fail(request) {
                self.RecvError(request, RECV_DATA_TYPE.DEAL_PRICE_LIST_DATA);
            }
        });
    };

    this.RecvData = function (data, dataType) {
        this.Data = null;
        if (data.statistics.length <= 0) return;
        this.Data = { Day: {}, PriceList: [] };
        var stock = data.data[0];
        this.Data.Day = { Date: stock.date, YClose: stock.yclose, Price: stock.price, Vol: stock.vol, Time: stock.time };
        this.Data.Stock = { Symbol: stock.symbol, Name: stock.name };

        /*
        var aryPrice=stock.pricelist;
        var aryVol=stock.vollist;
        for (let i=0;i<aryPrice.length;++i) 
        {
            let item = {Price:aryPrice[i], Vol: aryVol[i]};
            if (stock.vol>0) item.Rate=item.Vol/stock.vol;  //占比
           
            this.Data.PriceList.push(item);
        }
        */

        var stockPrice = data.statistics[0];
        for (var i in stockPrice.list) {
            var item = stockPrice.list[i];

            var newItem = { Price: item[0], Vol: item[1], BuyVol: item[2], SellVol: item[3], NoneVol: item[4] };
            if (stock.vol > 0) newItem.Proportion = newItem.Vol / stock.vol;

            this.Data.PriceList.push(newItem);
        }

        if (this.UpdateUICallback) this.UpdateUICallback(this);

        this.AutoUpate();
    };

    this.RecvError = function (request, dataType) {};
}

//最新分笔数据
function LatestDetailData(symbol) {
    this.newMethod = IStockData; //派生
    this.newMethod();
    delete this.newMethod;

    this.IsAutoUpdate = false;
    this.Symbol = symbol; //单个股票
    this.PageSize = 20;

    this.Request = function (pageIndex, pageSize) {
        this.Error = null;
        var self = this;
        var start = pageIndex * pageSize;
        var end = start + pageSize;
        var apiUrl = g_JSStockResource.Domain + "/API/StockDetail";
        console.log("[LatestDetailData::RequestData] url=" + apiUrl + ", start=" + start + " , end=" + end);

        _jquery2.default.ajax({
            url: apiUrl,
            data: {
                "symbol": this.Symbol,
                "start": start,
                "end": end
            },
            type: "post",
            dataType: 'json',
            async: true,
            success: function success(data) {
                self.RecvData(data, RECV_DATA_TYPE.LATEST_DETAIL_DATA);
            },
            error: function error(request) {
                self.RecvError(request, RECV_DATA_TYPE.LATEST_DETAIL_DATA);
            }
        });
    };

    this.RequestData = function () //第1次请求
    {
        this.Data = { Deal: [], Count: 0, Reqeust: { PageIndex: 0 }, Response: {} };
        this.Request(0, this.PageSize);
    };

    this.RequestPage = function (pageIndex) {
        if (!this.Data) this.Data = { Deal: [], Count: 0 };
        this.Data.Reqeust = { PageIndex: pageIndex };
        this.Data.Response = {};

        var start = pageIndex * this.PageSize;
        var end = start + this.PageSize;
        //检测内存里是否已经有了
        var bCache = true;
        for (var i = start; i < end; ++i) {
            if (!this.Data.Deal[i]) {
                bCache = false;
                break;
            }
        }

        if (bCache) {
            this.Data.Response = { Start: start, End: end };
            this.InvokeUpdateUICallback();
        } else {
            this.Request(pageIndex, this.PageSize);
        }
    };

    this.RecvData = function (data, dataType) {
        this.Data.Count = data.count;
        if (!data.detail) {
            this.InvokeUpdateUICallback();
            return;
        }

        this.Data.Day = { YClose: data.yclose, Open: data.open, Close: data.price, Date: data.date };
        this.Data.Stock = { Symbol: data.symbol, Name: data.name };

        var start = data.start;
        for (var i = 0, index = start; i < data.detail.length; ++i, ++index) {
            var item = data.detail[i];
            var detailItem = { Time: item[0], Price: item[1], Vol: item[2], Amount: item[3], Flag: '' };
            if (item[4] === 0) detailItem.Flag = 'B';else if (item[4] === 1) detailItem.Flag = 'S';

            this.Data.Deal[index] = detailItem;
        }

        this.Data.Response = { Start: data.start, End: data.end };
        this.InvokeUpdateUICallback();
    };

    this.RecvError = function (request, dataType) {
        console.log("[LatestDetailData::RecvError] status=" + request.status + " statusText=" + request.statusText + " responseText=" + request.responseText);

        this.Error = { Status: request.status, Message: request.responseText };
        this.InvokeUpdateUICallback();
    };
}

//分析板块请求数据
function AnalylisPlate() {
    this.newMethod = IStockData; //派生
    this.newMethod();
    delete this.newMethod;

    this.ApiUrl = g_JSStockResource.Domain + "/api/StockListAnalyze";
    this.PolicyGuid; //查询策略的Guid
    this.Plate = ""; //板块id
    this.SymbolList = []; //股票列表

    this.RequestData = function () {
        var self = this;
        _jquery2.default.ajax({
            url: self.ApiUrl,
            data: {
                "PolicyGuid": self.PolicyGuid,
                "Plate": self.Plate,
                "Symbol": self.SymbolList
            },
            type: "post",
            dataType: 'json',
            async: true,
            success: function success(data) {
                self.RecvData(data);
            },
            error: function error(request) {
                self.RecvError(request);
            }
        });
    };

    this.RecvData = function (recvData) {
        this.Data = {};
        // console.log(recvData.data,"recvData,分析板块:::::")
        var data = recvData;
        if (data.count == 0) return;

        if (data.concept) {
            //概念占比
            // 0 = 概念名称 1 = 代码 0 = 占比 3 = 个数 4 = 涨幅 5 = 最新价 6 = 一周涨幅 7 = 四周涨幅
            var conceptList = [];
            for (var i in data.concept.data) {
                var item = data.concept.data[i];
                var info = {};
                info.Name = item[0];
                info.Symbol = item[1];
                info.Ratio = item[2];
                info.Count = item[3];
                info.Increase = item[4];
                info.Price = item[5];
                info.Week1 = item[6];
                info.Week4 = item[7];
                conceptList.push(info);
            }
            this.Data.Concept = conceptList;
        }
        if (data.distributed) {
            //股票类型占比
            this.Data.Distributed = data.distributed;
        }
        if (data.industry) {
            //行业占比
            this.Data.Industry = data.industry;
        }
        if (data.quadrant) {
            //四象限占比
            this.Data.Quadrant = data.quadrant;
        }
        if (data.region) {
            //四象限占比
            this.Data.Region = data.region;
        }

        // console.log(this.Data,"this.Data")
        if (this.UpdateUICallback) this.UpdateUICallback(this);
    };

    this.RecvError = function (request) {
        console.log(request);
    };
}

var STOCK_MARKET = {
    SH: '.SH',
    SZ: '.SZ',
    HK: '.HK',
    SHFE: '.SHF', //上期所 (Shanghai Futures Exchange)
    CFFEX: '.CFE', //中期所 (China Financial Futures Exchange)
    DCE: '.DCE', //大连商品交易所(Dalian Commodity Exchange)
    CZCE: '.CZC', //郑州期货交易所
    USA: '.USA', //美股

    IsUSA: function IsUSA(upperSymbol) //是否是美股
    {
        if (!upperSymbol) return false;
        return upperSymbol.indexOf(this.USA) > 0;
    },

    IsSH: function IsSH(upperSymbol) {
        //需要精确匹配最后3位
        var pos = upperSymbol.length - this.SH.length;
        var find = upperSymbol.indexOf(this.SH);
        return find == pos;
    },

    IsSZ: function IsSZ(upperSymbol) {
        var pos = upperSymbol.length - this.SZ.length;
        var find = upperSymbol.indexOf(this.SZ);
        return find == pos;
    },

    IsHK: function IsHK(upperSymbol) {
        var pos = upperSymbol.length - this.HK.length;
        var find = upperSymbol.indexOf(this.HK);
        return find == pos;
    },

    IsSHFE: function IsSHFE(upperSymbol) {
        return upperSymbol.indexOf(this.SHFE) > 0;
    },

    IsCFFEX: function IsCFFEX(upperSymbol) {
        return upperSymbol.indexOf(this.CFFEX) > 0;
    },

    IsDCE: function IsDCE(upperSymbol) {
        return upperSymbol.indexOf(this.DCE) > 0;
    },

    IsCZCE: function IsCZCE(upperSymbol) {
        return upperSymbol.indexOf(this.CZCE) > 0;
    },

    IsChinaFutures: function IsChinaFutures(upperSymbol) //是否是国内期货
    {
        return this.IsCFFEX(upperSymbol) || this.IsCZCE(upperSymbol) || this.IsDCE(upperSymbol) || this.IsSHFE(upperSymbol);
    },

    IsSHSZ: function IsSHSZ(upperSymbol) //是否是沪深的股票
    {
        return this.IsSZ(upperSymbol) || this.IsSH(upperSymbol);
    },

    IsSHSZFund: function IsSHSZFund(upperSymbol) //是否是交易所基金
    {
        if (!upperSymbol) return false;

        if (this.IsSH(upperSymbol)) //51XXXX.SH
            {
                if (upperSymbol.charAt(0) == '5' && upperSymbol.charAt(1) == '1') return true;
            } else if (this.IsSZ(upperSymbol)) //15XXXX.sz, 16XXXX.sz, 17XXXX.sz, 18XXXX.sz
            {
                if (upperSymbol.charAt(0) == '1' && (upperSymbol.charAt(1) == '5' || upperSymbol.charAt(1) == '6' || upperSymbol.charAt(1) == '7' || upperSymbol.charAt(1) == '8')) return true;
            }

        return false;
    },

    IsSHSZIndex: function IsSHSZIndex(symbol) //是否是沪深指数代码
    {
        if (!symbol) return false;
        var upperSymbol = symbol.toUpperCase();
        if (this.IsSH(upperSymbol)) {
            var temp = upperSymbol.replace('.SH', '');
            if (upperSymbol.charAt(0) == '0' && parseInt(temp) <= 3000) return true;
        } else if (this.IsSZ(upperSymbol)) {
            if (upperSymbol.charAt(0) == '3' && upperSymbol.charAt(1) == '9') return true;
        } else if (upperSymbol.indexOf('.CI') > 0) //自定义指数
            {
                return true;
            }

        return false;
    },

    IsSHSZStockA: function IsSHSZStockA(symbol) //是否是沪深A股
    {
        if (!symbol) return false;
        var upperSymbol = symbol.toUpperCase();
        if (this.IsSH(upperSymbol)) {
            var temp = upperSymbol.replace('.SH', '');
            if (upperSymbol.charAt(0) == '6') return true;
        } else if (this.IsSZ(upperSymbol)) {
            if (upperSymbol.charAt(0) == '0') {
                if (upperSymbol.charAt(1) == '0' && upperSymbol.charAt(1) == '2') return true; //002 中小板
                if (upperSymbol.charAt(1) != '7' && upperSymbol.charAt(1) != '8') return true;
            }
        }

        return false;
    },

    IsSHStockSTAR: function IsSHStockSTAR(symbol) // 是否是科创板 Sci-Tech innovAtion boaRd (STAR Market)
    {
        if (!symbol) return false;
        var upperSymbol = symbol.toUpperCase();
        if (!this.IsSH(upperSymbol)) return false;
        if (upperSymbol.charAt(0) == '6' && upperSymbol.charAt(1) == '8' && upperSymbol.charAt(2) == '8') return true;

        return false;
    },

    GetMarketStatus: function GetMarketStatus(symbol) //获取市场状态 0=闭市 1=盘前 2=盘中 3=盘后
    {
        if (!symbol) return 0;
        var upperSymbol = symbol.toUpperCase();
        if (this.IsUSA(upperSymbol)) {
            var usaDate = GetLocalTime(-4);
            day = usaDate.getDay(), time = usaDate.getHours() * 100 + usaDate.getMinutes();
            if (day == 6 || day == 0) return 0; //周末

            //9:30 - 16:00 考虑夏令时间时间增加1小时 9:30 - 17:00
            if (time > 1730) return 3;
            if (time < 930) return 1;

            return 2;
        } else {

            var nowDate = new Date(),
                day = nowDate.getDay(),
                time = nowDate.getHours() * 100 + nowDate.getMinutes();
            if (day == 6 || day == 0) return 0; //周末

            //9:30 - 15:40
            if (time > 1540) return 3;
            if (time < 925) return 1;
            return 2;
        }
    }
};

/*外部导入*/


/*暴露外部用的方法*/
exports.default = (_JSStockInit$STOCK_FI = {
    JSStockInit: JSStock.Init,
    STOCK_FIELD_NAME: STOCK_FIELD_NAME,

    //类导出
    JSStock: JSStock,
    StockRead: StockRead
}, (0, _defineProperty3.default)(_JSStockInit$STOCK_FI, "STOCK_FIELD_NAME", STOCK_FIELD_NAME), (0, _defineProperty3.default)(_JSStockInit$STOCK_FI, "RECV_DATA_TYPE", RECV_DATA_TYPE), _JSStockInit$STOCK_FI);
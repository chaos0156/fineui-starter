import { shortcut } from '@core/decorator';
import './mark.less';

@shortcut()
export class Mark extends BI.Widget {
    static xtype = 'app.layout_home_introduction_mark';

    public props = {
        baseCls: 'app-layout-home-product-banner-mark',
    };

    private content = [
        {
            img: 'https://www.fanruan.com/images/page/company/700+.png',
            text1: '组织规模',
            text2: '2021年公司员工1600多人， “素质高、学历高、能力强”是帆软员工的普遍特征',
        },
        {
            img: 'https://www.fanruan.com/images/page/company/2.78.png',
            text1: '销售业绩',
            text2: '2021年帆软实现销售额超11.4亿元，连续保持高增长率',
        },
        {
            img: 'https://www.fanruan.com/images/page/company/100.png',
            text1: '服务范围',
            text2: '海内外共有16个分支机构；服务网点全国省份覆盖率100%，快速响应客户需求',
        },
        {
            img: 'https://www.fanruan.com/images/page/company/233.png',
            text1: '行业覆盖',
            text2: '帆软客户覆盖国家统计标准（ GBT 4754-2017）涉及的几乎全部细分行业',
        },
        {
            img: 'https://www.fanruan.com/images/page/company/7000.png',
            text1: '客户数量',
            text2: '帆软累计合作客户总量超过18000家，众多500强企业都选择信任帆软产品与服务',
        },
        {
            img: 'https://www.fanruan.com/images/page/company/20000.png',
            text1: '用户规模',
            text2: '帆软产品已在近70000个企业信息化项目上得到成功实施和应用',
        },
    ];

    public render() {
        const markGroup = this.content.map(item => {
            return {
                type: 'bi.vertical',
                cls: 'mark',
                items: [
                    {
                        type: 'bi.horizontal_adapt',
                        items: [
                            {
                                type: 'bi.img',
                                width: 90,
                                height: 90,
                                src: item.img,
                            },
                        ],
                    },
                    {
                        type: 'bi.label',
                        cls:'text1',
                        text: item.text1,
                    },
                    {
                        type: 'bi.label',
                        cls:'text2',
                        whiteSpace:'normal',
                        text: item.text2,
                    },
                ],
            };
        });
        return <BI.FloatLeftLayout>{markGroup}</BI.FloatLeftLayout>;
    }
}

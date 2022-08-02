import { shortcut } from '@core/decorator';
import './banner.less';
import { Title } from './title/title';
import { Head } from './head/head';
import {Tag} from "./tag/tag"

@shortcut()
export class Banner extends BI.Widget {
    static xtype = 'app.layout_home_product_banner';

    public props: BannerProps = {
        baseCls: 'app-layout-home-product-banner',
        place: 1,
    };

    private content = [
        {
            head: {
                text1: '固定式数据展现',
                text2: 'FineReport',
                cls:'head1'
            },
            mid: {
                title1: `以IT为中心的预定义报表平台；主要面向IT部门，为企业日常管理提供固定式的报表展示。` ,
                title2: '具备基础SQL知识的IT人员。',
                title3: ['复杂报表', '参数查询', '数据填报', '定时调度', '打印输出', '管理驾驶舱'],
            },
            foot: {
                url: 'https://www.fanruan.com/finereport',
            },
        },
        {
            head: {
                text1: '自助式数据分析',
                text2: 'FineBI',
                cls:'head2'
            },
            mid: {
                title1: '以业务为中心的自助大数据分析平台；主要面向业务和数据分析师，以问题为导向的探索分析；也支持简单报表制作。',
                title2: '具备业务逻辑和数据素养的业务人员或数据分析师。',
                title3: ['业务数据包', '自助数据集', '智能图表', '大数据引擎', 'OLAP分析', '故事仪表板'],
            },
            foot: {
                url: 'https://www.fanruan.com/finebi',
            },
        },
        {
            head: {
                text1: '自助式应用搭建',
                text2: '简道云',
                cls:'head3'
            },
            mid: {
                title1: '零代码，快速实现业务上云的轻应用搭建平台；业务可以快速解决需求，自下而上发挥创造力；IT可以释放长尾边缘需求，解放生产力。',
                title2: '企业全员。',
                title3: ['表单', '流程', '仪表盘', '知识库'],
            },
            foot: {
                url: 'https://www.jiandaoyun.com/',
            },
        },
    ];

    public render() {
        const { place } = this.options;
        const showContent = this.content[place];
        return (
            <BI.VerticalLayout>
                <Head text1={showContent.head.text1} text2={showContent.head.text2} place={place}></Head>
                <BI.VerticalLayout cls={'mid'}>
                    <Title topic={'定位'}></Title>
                    <BI.Label text={showContent.mid.title1} lgap={40} height={52} rgap={30} textAlign={'left'} whiteSpace={'normal'} cls={'subcontent'}></BI.Label>
                    <Title topic={'典型用户'}></Title>
                    <BI.Label text={showContent.mid.title2} lgap={40} textAlign={'left'} whiteSpace={'normal'} cls={'subcontent'}></BI.Label>
                    <Title topic={'典型功能'}></Title>
                    <Tag tags={showContent.mid.title3}></Tag>
                </BI.VerticalLayout>
                <BI.Button
                    text={`了解${showContent.head.text2}`}
                    cls={'foot'}
                    tgap={35}
                    bgap={40}
                    hgap={40}
                    height={40}
                    handler={() => {
                        window.open(showContent.foot.url);
                    }}
                ></BI.Button>
            </BI.VerticalLayout>
        );
    }
}
interface BannerProps {
    baseCls: string;
    place: number;
}

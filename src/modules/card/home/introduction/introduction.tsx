import { shortcut } from '@core/decorator';
import './introduction.less';
import { Mark } from './mark/mark';
/**
 * 了解帆软Tab
 */
@shortcut()
export class HomeIntroduction extends BI.Widget {
    static xtype = 'app.layout_home_introduction';

    public props = {
        baseCls: 'app-layout-home-introduction',
    };

    public render() {
        return (
            <BI.VerticalLayout>
                <BI.VerticalLayout cls={'headtop'}>
                    <BI.Label text="了解帆软" cls="big"></BI.Label>
                    <BI.Label
                        text="帆软软件有限公司（以下简称“帆软”）成立于2006年，是中国专业的大数据BI和分析平台提供商，专注商业智能和数据分析领域，致力于为全球企业提供一站式商业智能解决方案。"
                        whiteSpace={'normal'}
                        tgap={15}
                        bgap={10}
                        cls="small"
                    ></BI.Label>
                    <BI.Label
                        text="帆软在专业水准、组织规模、服务范围、企业客户数量上均为业内前列，先后获得包括Gartner、IDC、CCID在内的众多专业咨询机构的认可。2021年销售额超11.4亿，2018年-2021年，连续4年入选中国大数据企业50强，连续多年中国BI市场占有率第一。"
                        whiteSpace={'normal'}
                        bgap={30}
                        cls="small"
                    ></BI.Label>
                </BI.VerticalLayout>
                <Mark/>
            </BI.VerticalLayout>
        );
    }
}

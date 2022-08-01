import { shortcut } from '@core/decorator';
import './product.less';

/**
 * 了解帆软Tab
 */
@shortcut()
export class HomeProduct extends BI.Widget {
    static xtype = 'app.layout_home_product';

    public props = {
        baseCls: 'app-layout-home-product',
    };

    public render() {
        return (
            <BI.VerticalLayout>
                <BI.VerticalLayout cls={'headtop'}>
                    <BI.Label text="全面、专业、高效的大数据BI产品" cls='big'></BI.Label>
                    <BI.Label text="帆软为企业发展的不同阶段提供一站式大数据BI解决方案" tgap={15} cls='small'></BI.Label>
                </BI.VerticalLayout>
                <BI.HorizontalLayout cls={'banner'}>
                    <BI.VerticalLayout cls={'finereport'} width={700}>
                        <BI.Label text='固定式数据展现'/>
                    </BI.VerticalLayout>
                    <BI.VerticalLayout cls={'finebi'} width={700}>
                        <BI.Label text='自助式数据分析'/>
                    </BI.VerticalLayout>
                    <BI.VerticalLayout cls={'jiandaoyun'} width={700}>
                        <BI.Label text='自助式应用搭建'/>
                    </BI.VerticalLayout>
                </BI.HorizontalLayout>
            </BI.VerticalLayout>
        );
    }
}

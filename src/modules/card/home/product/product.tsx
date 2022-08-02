import { shortcut } from '@core/decorator';
import './product.less';
import { Banner } from './banner/banner';
import { SmallBanner } from './smallBanner/smallBanner';
/**
 * 产品解决方案Tab
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
                    <BI.Label text="全面、专业、高效的大数据BI产品" cls="big"></BI.Label>
                    <BI.Label text="帆软为企业发展的不同阶段提供一站式大数据BI解决方案" tgap={15} bgap={30} cls="small"></BI.Label>
                </BI.VerticalLayout>
                <BI.HorizontalLayout>
                    <Banner place={0}></Banner>
                    <Banner place={1}></Banner>
                    <Banner place={2}></Banner>
                </BI.HorizontalLayout>
                <BI.VerticalLayout cls={'headtop'}>
                    <BI.Label text="多屏幕的数据呈现方案" cls="big" tgap={30}></BI.Label>
                    <BI.Label text="帆软产品均支持多屏幕的数据展示，PC端设计即可多终端展示，无需额外开发" tgap={15} bgap={30} cls="small"></BI.Label>
                </BI.VerticalLayout>
                <BI.HorizontalLayout>
                    <SmallBanner place={0}></SmallBanner>
                    <SmallBanner place={1}></SmallBanner>
                    <SmallBanner place={2}></SmallBanner>
                </BI.HorizontalLayout>
            </BI.VerticalLayout>
        );
    }
}

import { shortcut } from '@core/decorator';
import './smallBanner.less';

@shortcut()
export class SmallBanner extends BI.Widget {
    static xtype = 'app.layout_home_product_small_banner';

    public props: SmallBannerProps = {
        baseCls: 'app-layout-home-product-smallbanner',
        place: 1,
    };

    private content = [
        {
            url: 'https://www.fanruan.com/finemobile',
            head: 'https://www.fanruan.com/images/index-finemobile2.png',
            mid: '移动端',
            foot: '基于FineMobile的原生APP、HTML5等多种方式，帮助企业构建专属的移动数据应用。',
        },
        {
            url: 'https://www.fanruan.com/finemax',
            head: 'https://www.fanruan.com/images/index-finemax2.png',
            mid: '数据大屏',
            foot: '基于丰富的可视化组件和自由布局方式，帮助企业构建全局的数据可视化大屏。',
        },
        {
            url: 'http://demo.finereport.com/decision',
            head: 'https://www.fanruan.com/images/index-finereport2.png',
            mid: 'PC端',
            foot: '基于PC端的数据决策系统，为企业提供数据查看分析和决策的统一门户。',
        },
    ];

    public render() {
        const { place } = this.options;
        const showContent = this.content[place];
        return (
            <BI.VerticalLayout>
                <BI.A
                    href={showContent.url}
                    el={
                        <BI.DefaultLayout>
                            <BI.Img src={showContent.head} cls={'head'}></BI.Img>
                            <BI.Label text={showContent.mid} cls={'mid'}/>
                            <BI.Label text={showContent.foot} whiteSpace={'normal'} cls={'foot'}/>
                        </BI.DefaultLayout>
                    }
                ></BI.A>
            </BI.VerticalLayout>
        );
    }
}
interface SmallBannerProps {
    baseCls: string;
    place: number;
}

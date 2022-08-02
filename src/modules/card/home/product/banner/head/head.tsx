import { shortcut } from '@core/decorator';
import './head.less';

@shortcut()
export class Head extends BI.Widget {
    static xtype = 'app.layout_home_product_head';

    public props: HeadProps = {
        baseCls: 'app-layout-home-product-banner-head',
        text1: '',
        text2: '',
        place: 0,
    };

    private img = [
        'https://www.fanruan.com/images/index-logo_1-5.png',
        'https://www.fanruan.com/images/index-logo_3-5.png',
        'https://www.fanruan.com/images/index-logo_jdy.png',
    ];
    public render() {
        const { text1, text2, place } = this.options;
        let Img:BI.Img;
        if (place == 2) {
           Img = <BI.Img src={this.img[place]} width={135} height={135} cls={'imgr'} lgap={50}></BI.Img>;
        } else {
           Img = <BI.Img src={this.img[place]} width={340} height={170} cls={'img'} lgap={60}></BI.Img>;
        }
        return (
            <BI.HorizontalLayout height={135} cls={'head'} scrollable={false}>
                <BI.VerticalLayout hgap={15}>
                    <BI.Label text={text1} cls={'text1'} textAlign={'left'} />
                    <BI.Label text={text2} cls={'text2'} textAlign={'left'}></BI.Label>
                </BI.VerticalLayout>
                {Img}
            </BI.HorizontalLayout>
        );
    }
}
interface HeadProps {
    baseCls: string;
    text1: string;
    text2: string;
    place: number;
}

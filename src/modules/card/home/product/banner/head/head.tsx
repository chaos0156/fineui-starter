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

    private imgUrl = [
        'https://www.fanruan.com/images/index-logo_1-5.png',
        'https://www.fanruan.com/images/index-logo_3-5.png',
        'https://www.fanruan.com/images/index-logo_jdy.png',
    ];
    public render() {
        const { text1, text2, place } = this.options;
        let img;
        if (place == 2) {
            img = <BI.Img src={this.imgUrl[place]} width={135} height={135} cls={'imgr'} lgap={40}></BI.Img>;
        } else {
            img = <BI.Img src={this.imgUrl[place]} width={340} height={170} cls={'img'} lgap={50}></BI.Img>;
        }
        return (
            <BI.HorizontalLayout height={135} cls={'head'} scrollable={false}>
                <BI.VerticalLayout hgap={15}>
                    <BI.Label text={text1} cls={'text1'} textAlign={'left'} />
                    <BI.Label text={text2} cls={'text2'} textAlign={'left'}></BI.Label>
                </BI.VerticalLayout>
                {img}
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

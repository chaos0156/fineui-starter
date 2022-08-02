import { shortcut } from '@core/decorator';
import './title.less';

@shortcut()
export class Title extends BI.Widget {
    static xtype = 'app.layout_home_product_title';

    public props:TitleProps = {
        baseCls: 'app-layout-home-product-banner-title',
        topic:'',
    };

    public render() {
        const {topic} = this.options;
        return (
            <BI.HorizontalLayout tgap={20} bgap={20}>
                <BI.CenterAdaptLayout height={20} lgap={60}>
                    <BI.IconButton cls={'dot-h-font'}></BI.IconButton>
                </BI.CenterAdaptLayout>
                <BI.Label text={topic} cls={'title'}/>
            </BI.HorizontalLayout>
        );
    }
}
interface TitleProps {
    baseCls:string;
    topic:string;
}

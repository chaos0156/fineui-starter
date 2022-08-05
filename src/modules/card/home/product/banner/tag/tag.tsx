import { shortcut } from '@core/decorator';
import './tag.less';

@shortcut()
export class Tag extends BI.Widget {
    static xtype = 'app.layout_home_product_tag';

    public props: TagProps = {
        baseCls: 'app-layout-home-product-banner-tag',
        tags: [],
    };

    public render() {
        const { tags } = this.options;
        let tagGroup = tags.map(item => {
            return {
                type: 'bi.label',
                text: item,
                width: 100,
                height: 36,
                cls:'tag'
            };
        });
        return <BI.FloatLeftLayout height={88}>{tagGroup}</BI.FloatLeftLayout>;
    }
}
interface TagProps {
    baseCls: string;
    tags: string[];
}

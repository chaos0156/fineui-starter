import { shortcut, store } from '@core/decorator';
import { LayoutHeader } from './header/header';
import { LayoutSider } from './sider/sider';
import { LayoutContent } from './content/content';
import LayoutConstant from './layout.constant';
import LayoutModel from './layout.model';
import './layout.less';

/**
 * 应用布局
 */
@shortcut()
@store(LayoutModel)
export default class Layout extends BI.Widget {
    static xtype = 'app.layout';

    public props = {
        baseCls: 'app-layout',
    };
    private model: LayoutModel['model'];
    public render() {
        const { HEADER_HEIGHT} = LayoutConstant;
        console.log('layout',this.model);
        return (
            <BI.VerticalFillLayout>
                <LayoutHeader height={HEADER_HEIGHT} />
                <BI.HorizontalFillLayout cls="app-layout-body" columnSize={["", 'fill']} height={'fill'}>
                    <LayoutSider />
                    <LayoutContent />
                </BI.HorizontalFillLayout>
            </BI.VerticalFillLayout>
        );
    }
}

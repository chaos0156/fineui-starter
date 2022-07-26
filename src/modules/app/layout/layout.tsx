import { shortcut,store } from '@core/decorator';
import { LayoutHeader } from './header/header';
import { LayoutSider } from './sider/sider';
import { LayoutContent } from './content/content';
import LayoutConstant from './layout.constant';
import './layout.less';
import LayoutModel from './layout.model';

/**
 * 应用布局
 */
@shortcut()
@store(LayoutModel)
export default class Layout extends BI.Widget {
    static xtype = 'app.layout';
    private model: LayoutModel['model'];
    public props = {
        baseCls: 'app-layout',
    };
    public render() {
        const { HEADER_HEIGHT } = LayoutConstant;
        console.log(this.model);
        return (
            <BI.VerticalFillLayout>
                <LayoutHeader height={HEADER_HEIGHT} />
                <BI.HorizontalFillLayout cls="app-layout-body" columnSize={['', 'fill']} height={'fill'}>
                    <LayoutSider />
                    <LayoutContent />
                </BI.HorizontalFillLayout>
            </BI.VerticalFillLayout>
        );
    }
}

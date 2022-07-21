import { shortcut } from '@core/decorator';
import './drawer.less';

/**
 * Drawer
 */
@shortcut()
export class HeaderDrawer extends BI.Widget {
    static xtype = 'app.layout_header_drawer';
    public props = {
        baseCls: 'app-layout-header-drawer',
    };

    // 头部内容
    private top = ['Logo 主题色设置', '侧边栏主题色设置', 'Header 主题色设置'].map(item => {
        return (
            <BI.VerticalLayout vgap={10}>
                <BI.Label text={item} textAlign="left" vgap={5}></BI.Label>
                <BI.ColorChooser value={'red'}></BI.ColorChooser>
            </BI.VerticalLayout>
        );
    });

    // 中部内容
    private mid = BI.map(['内容区域宽度', '固定 Header', '下滑时隐藏 Header', '固定侧边栏'], (index, item) => {
        if (index == 0) {
            return (
                <BI.LeftRightVerticalAdaptLayout
                    vgap={15}
                    items={{
                        left: [<BI.Text text={item} vgap={10} />],
                        right: [<BI.TextValueCombo width={80} height={24} value={1} text="流式" items={[{ text: '流式', value: 1 }]}></BI.TextValueCombo>],
                    }}
                />
            );
        } else {
            return (
                <BI.LeftRightVerticalAdaptLayout
                    vgap={15}
                    items={{
                        left: [<BI.Text text={item} vgap={10} />],
                        right: [<BI.Switch></BI.Switch>],
                    }}
                />
            );
        }
    });

    // 底部内容
    private bottom = (
        <BI.VerticalLayout vgap={15}>
            <BI.Button iconCls="" text='拷贝设置' clear/>
            <BI.Label tgap={16} cls={'bottomText'}></BI.Label>
        </BI.VerticalLayout>
    );

    public render() {
        return (
            <BI.VerticalLayout>
                <BI.VerticalLayout cls={'top'}>{this.top}</BI.VerticalLayout>
                <BI.VerticalLayout cls={'mid'}>{this.mid}</BI.VerticalLayout>
                <BI.VerticalLayout cls={'bottom'}>{this.bottom}</BI.VerticalLayout>
            </BI.VerticalLayout>
        );
    }
}

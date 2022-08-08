import { shortcut } from '@core/decorator';
import './drawerSetting.less';
import { Drawer } from './drawer/drawer';

@shortcut()
export class DrawerSetting extends BI.Widget {
    static xtype = 'app.layout_drawerSetting';
    private context = this;

    public props = {
        baseCls: 'app-layout-drawerSetting',
    };

    /*
    打开Drawer */
    private showDrawer() {
        BI.Drawers.removeAll();
        const id = '弹出层id' + BI.UUID();
        BI.Drawers.create(
            id,
            {
                header: '设置页面',
                headerHeight: 60,
                body: (
                    <BI.VerticalLayout>
                        <Drawer />
                    </BI.VerticalLayout>
                ),
            },
            this.context
        ).show(id);
    }

    public render() {
        return (
            <BI.IconButton
                width={50}
                height={36}
                title={'主题设置'}
                cls="setting-font settingButton"
                handler={() => {
                    this.showDrawer();
                }}
            />
        );
    }
}

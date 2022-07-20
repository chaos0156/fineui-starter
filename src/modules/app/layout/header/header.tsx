import { shortcut } from '@core/decorator';
import LayoutConstant from '../layout.constant';
import { HeaderPopup } from './popup/popup';
import './header.less';

// 测试用的用户信息
const userInfo = {
    name: 'Fanruan BI',
    avatarSrc: 'https://s3.bmp.ovh/imgs/2022/07/15/f0d12aabc9264e96.webp',
};

/**
 * 应用布局的顶栏，包括应用logo、标题和用户信息
 */
@shortcut()
export class LayoutHeader extends BI.Widget {
    static xtype = 'app.layout_header';

    public props = {
        baseCls: 'app-layout-header',
    };

    /*
    打开Drawer */
    private showDrawer() {
        BI.Drawers.removeAll();
        let id = '弹出层id' + BI.UUID();
        BI.Drawers.create(id, {
            header: '设置页面',
            body: {
                type: 'bi.label',
                text: '整体风格设置',
            },
        }).show(id);
    }

    public render() {
        const { APP_TITLE_TEXT, MAIN_MENU_WIDTH, HEADER_HEIGHT } = LayoutConstant;
        const logoUrl = 'https://www.fanruan.com/';
        return (
            <BI.LeftRightVerticalAdaptLayout
                rhgap={24}
                items={{
                    left: [
                        <BI.CenterAdaptLayout cls="logo bi-high-light-background" width={MAIN_MENU_WIDTH} height={HEADER_HEIGHT}>
                            <BI.A href={logoUrl} el={<BI.IconLabel cls="logo-font"></BI.IconLabel>} />
                        </BI.CenterAdaptLayout>,
                        <BI.Text cls="title" hgap={8} text={APP_TITLE_TEXT} />,
                    ],
                    right: [
                        <BI.VerticalAdaptLayout rgap={10}>
                            <BI.Combo
                                trigger={'hover'}
                                el={
                                    <BI.VerticalAdaptLayout cls="user" width={100} height={HEADER_HEIGHT}>
                                        <BI.Img cls="avatar" width={30} height={30} rgap={8} src={userInfo.avatarSrc} />
                                        <BI.Text cls="name" text={userInfo.name} />
                                    </BI.VerticalAdaptLayout>
                                }
                                popup={{
                                    animation: "bi-slide-up",
                                    animationDuring: 500,
                                    el:<HeaderPopup/>
                                }}
                            />
                            <BI.IconButton
                                width={50}
                                height={HEADER_HEIGHT}
                                cls="setting-font settingButton"
                                handler={() => {
                                    this.showDrawer();
                                }}
                            />
                        </BI.VerticalAdaptLayout>,
                    ],
                }}
            />
        );
    }
}
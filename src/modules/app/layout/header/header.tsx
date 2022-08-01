import { shortcut, store } from '@core/decorator';
import LayoutConstant from '../layout.constant';
import { HeaderPopup } from './popup/popup';
import { HeaderDrawer } from './drawer/drawer';
import './header.less';
import LayoutHeaderModel from './header.model';

// 测试用的用户信息
const userInfo = {
    name: 'Fanruan BI',
    avatarSrc: 'https://s3.bmp.ovh/imgs/2022/07/15/f0d12aabc9264e96.webp',
};

/**
 * 应用布局的顶栏，包括应用logo、标题和用户信息
 */
@shortcut()
@store(LayoutHeaderModel)
export class LayoutHeader extends BI.Widget {
    static xtype = 'app.layout_header';

    public props = {
        baseCls: 'app-layout-header',
    };

    public watch = {
        headerColor:()=>{
            let color = this.store.getHeaderColor();
            this.headerRef.element.css('background', `${color}`);
        },
        fontColor: () => {
            let color = this.store.getFontColor();
            this.headerRef.element.css('color', color);
        },
    };
    // private model: LayoutHeaderModel['model'];
    private store: LayoutHeaderModel['store'];
    private logoUrl = 'https://www.fanruan.com/';
    private docUrl = 'https://fanruan.design/doc.html?post=';
    private context = this;
    private headerRef: BI.LeftRightVerticalAdaptLayout;
    /*
    打开Drawer */
    private showDrawer() {
        BI.Drawers.removeAll();
        let id = '弹出层id' + BI.UUID();
        BI.Drawers.create(
            id,
            {
                header: '设置页面',
                headerHeight: 60,
                body: {
                    type: 'bi.vertical',
                    items: [<HeaderDrawer />],
                },
            },
            this.context
        ).show(id);
    }

    /* 打开Popover */
    private showPopover() {
        BI.Popovers.removeAll();
        var id = '弹出层id' + BI.UUID();
        BI.Popovers.create(id, {
            type: 'bi.bar_popover',
            // String或者是json都行
            header: '弹出层',
            size: 'small',
            body: {
                type: 'bi.label',
                text: '是否查看FineUI文档？',
                css: { 'font-size': '20px' },
            },
            listeners: [
                {
                    eventName: 'EVENT_CANCEL',
                    action: () => {
                        BI.Msg.toast('点击了取消');
                    },
                },
                {
                    eventName: 'EVENT_CONFIRM',
                    action: () => {
                        location.href = this.docUrl;
                    },
                },
            ],
        }).show(id);
    }

    // 初始化header背景色\字体颜色
    private setDefaultColor() {
        const defalutHeaderColor = this.store.getHeaderColor();
        const defalutFontColor = this.store.getFontColor();
        this.headerRef.element.css('background', defalutHeaderColor);
        this.headerRef.element.css('color',defalutFontColor);
    }

    public render() {
        const { APP_TITLE_TEXT, MAIN_MENU_WIDTH, HEADER_HEIGHT } = LayoutConstant;
        return (
            <BI.LeftRightVerticalAdaptLayout
                ref={ref => {
                    this.headerRef = ref;
                }}
                rhgap={24}
                items={{
                    left: [
                        <BI.CenterAdaptLayout cls="logo bi-high-light-background" width={MAIN_MENU_WIDTH} height={HEADER_HEIGHT}>
                            <BI.A href={this.logoUrl} el={<BI.IconLabel cls="logo-font"></BI.IconLabel>} />
                        </BI.CenterAdaptLayout>,
                        <BI.Text cls="title" hgap={8} text={APP_TITLE_TEXT} />,
                    ],
                    right: [
                        <BI.VerticalAdaptLayout cls={'headerright'} rgap={10}>
                            <BI.Combo
                                trigger={'hover'}
                                el={
                                    <BI.VerticalAdaptLayout cls="user" width={130} height={HEADER_HEIGHT}>
                                        <BI.Img cls="avatar" width={40} height={40} rgap={8} src={userInfo.avatarSrc} />
                                        <BI.Text cls="name" text={userInfo.name} />
                                    </BI.VerticalAdaptLayout>
                                }
                                popup={{
                                    animation: 'bi-slide-up',
                                    animationDuring: 500,
                                    el: <HeaderPopup />,
                                }}
                            />
                            <BI.IconButton
                                width={50}
                                height={HEADER_HEIGHT}
                                cls="detail-font detailButton"
                                title={'开发文档'}
                                handler={() => {
                                    this.showPopover();
                                }}
                            />
                            <BI.IconButton
                                width={50}
                                height={HEADER_HEIGHT}
                                title={'主题设置'}
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
    /**
     * beforeMounted
     * 在render方法里的子组件被渲染到页面之前，给子组件设置背景色
     */
    public beforeMount() {
        this.setDefaultColor();
    }
}

import { shortcut } from '@core/decorator';
import './popup.less';

/**
 * 弹出框
 */
@shortcut()
export class HeaderPopup extends BI.Widget {
    static xtype = 'app.layout_header_popup';

    public props = {
        baseCls: 'app-layout-header-popup',
    };

    static EVENT = {
        CHANGE: 'EVENT_CHANGE',
    };

    private githubUrl = 'https://github.com/chaos0156/fineui-starter';

    /* 打开Popover */
    private showPopover() {
        BI.Popovers.removeAll();
        var id = '弹出层id' + BI.UUID();
        BI.Popovers.create(
            id,
            <BI.BarPopover
                header="弹出层"
                size="small"
                body={<BI.Label css={{ 'font-size': '20px' }}>{'是否打开项目地址？'}</BI.Label>}
                listeners={[
                    {
                        eventName: 'EVENT_CANCEL',
                        action: () => {
                            BI.Msg.toast('点击了取消');
                        },
                    },
                    {
                        eventName: 'EVENT_CONFIRM',
                        action: () => {
                            BI.Msg.toast('点击了确定');
                            location.href = this.githubUrl;
                        },
                    },
                ]}
            ></BI.BarPopover>
        ).show(id);
    }

    private arr = [
        {
            text: '首页',
            iconCls: 'dashboard-font',
            listeners: [
                {
                    eventName: 'EVENT_CHANGE',
                    action: () => {
                        this.fireEvent(HeaderPopup.EVENT.CHANGE);
                    },
                },
            ],
        },
        {
            text: '项目地址',
            iconCls: 'github-font',
            listeners: [
                {
                    eventName: 'EVENT_CHANGE',
                    action: () => {
                        this.showPopover();
                    },
                },
            ],
        },
    ].map(item => {
        return Object.assign(
            {
                type: 'bi.button',
                clear: true,
                height: 40,
                baseCls: 'PopupItem',
            },
            item
        );
    });

    public render() {
        return <BI.ButtonGroup height={this.arr.length * 40} layouts={[<BI.VerticalLayout horizontalAlign="center"></BI.VerticalLayout>]} items={this.arr} />;
    }
}

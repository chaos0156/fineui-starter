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

    private docUrl = 'https://fanruan.design/doc.html?post=';

    private arr = [
        {
            text: '首页',
            iconCls: 'dashboard-font',
        },
        {
            text: '项目地址',
            iconCls: 'github-font',
            listeners: [
                {
                    eventName: 'EVENT_CHANGE',
                    action: () => {
                        location.href = this.docUrl;
                    },
                },
            ],
        },
        {
            text: '开发文档',
            iconCls: 'docs-font',
            listeners: [
                {
                    eventName: 'EVENT_CHANGE',
                    action: () => {
                        location.href = this.docUrl;
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
                cls: 'popupbutton',
            },
            item
        );
    });

    public render() {
        return (
            <BI.ButtonGroup height={this.arr.length * 40}>
                <BI.VerticalLayout horizontalAlign="left">{this.arr}</BI.VerticalLayout>
            </BI.ButtonGroup>
        );
    }
}

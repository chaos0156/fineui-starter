import { BasicButton } from '@fui/core';
import { shortcut } from '@core/decorator';
import { NavItemStyle, NAV_ITEM_STYLE_CLASSES_MAP } from '../nav';
import './item.less';

@shortcut()
export class NavItem extends BI.BasicButton {
    static xtype = 'app.base.nav_item';

    static EVENT = {
        CLOSE: 'EVENT_CLOSE',
    };

    public props: NavItemProps & BasicButton['props'] = {
        baseCls: 'app-base-nav-item bi-split-left bi-split-right',
        value: '',
        text: '',
        closable: false,
        style: NavItemStyle.Block,
    };

    public render() {
        const { value, text, closable, style } = this.options;
        const cls = NAV_ITEM_STYLE_CLASSES_MAP[style];

        return (
            <BI.VerticalAdaptLayout cls={cls} hgap={16}>
                <BI.Text cls="text" text={text} />
                <BI.IconButton
                    cls="close close-font"
                    width={16}
                    height={16}
                    invisible={!closable}
                    stopPropagation={true}
                    handler={() => {
                        this.fireEvent(NavItem.EVENT.CLOSE, value);
                    }}
                />
            </BI.VerticalAdaptLayout>
        );
    }
}

interface NavItemProps {
    baseCls: string;
    value: string;
    text: string;
    closable: boolean;
    style: NavItemStyle;
}

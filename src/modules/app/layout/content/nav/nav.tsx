import { ButtonGroup } from '@fui/core';
import { shortcut } from '@core/decorator';
import { NavItem } from './item/item';
import './nav.less';

// 导航选项信息
export interface NavItemInfo {
    value: string;
    text: string;
    closable: boolean;
}

// 导航选项风格
export enum NavItemStyle {
    Block,
    Underline,
}

// 导航选项风格与class的映射关系
export const NAV_ITEM_STYLE_CLASSES_MAP = {
    [NavItemStyle.Block]: 'bi-list-item-select',
    [NavItemStyle.Underline]: 'app-list-item-underline',
};

@shortcut()
export class Nav extends BI.Widget {
    static xtype = 'app.base.nav';

    static EVENT = {
        CHANGE: 'EVENT_CHANGE',
        CLOSE: 'EVENT_CLOSE',
    };

    public props: NavProps = {
        baseCls: 'app-base-nav',
        height: 36,
        value: '',
        itemInfos: [],
        itemStyle: NavItemStyle.Block,
    };

    private navRef: ButtonGroup;

    /**
     * 获取导航菜单选项组件集合
     * @returns 导航菜单选项组件集合
     */
    private getNavItems(): NavItem[] {
        const { height, itemInfos, itemStyle } = this.options;

        return BI.map(itemInfos, (_index, itemInfo) => {
            const { value, text, closable } = itemInfo;

            return (
                <NavItem
                    height={height}
                    value={value}
                    text={text}
                    closable={closable}
                    style={itemStyle}
                    listeners={[
                        {
                            eventName: NavItem.EVENT.CLOSE,
                            action: value => {
                                this.fireEvent(Nav.EVENT.CLOSE, value);
                            },
                        },
                    ]}
                />
            );
        });
    }

    /**
     * 设置itemInfos，并根据其值更新navRef
     * @param itemInfos 要设置的itemInfos
     */
    public setItemInfos(itemInfos: NavItemInfo[]) {
        this.options.itemInfos = itemInfos;
        const navItems = this.getNavItems();
        this.navRef.populate(navItems);
    }

    /**
     * 设置itemStyle，并根据其值更新navRef
     * @param itemStyle 要设置的itemStyle
     */
    public setItemStyle(itemStyle: NavItemStyle) {
        this.options.itemStyle = itemStyle;
        const navItems = this.getNavItems();
        this.navRef.populate(navItems);
    }

    /**
     * 设置value
     * @param value 要设置的value值
     */
    public setValue(value: string) {
        this.options.value = value;
        this.navRef.setValue(value);
    }

    public render() {
        const { value } = this.options;
        const navItems = this.getNavItems();

        return (
            <BI.ButtonGroup
                ref={ref => {
                    this.navRef = ref;
                }}
                layouts={[<BI.VerticalAdaptLayout />]}
                listeners={[
                    {
                        eventName: BI.ButtonGroup.EVENT_CHANGE,
                        action: value => {
                            this.fireEvent(Nav.EVENT.CHANGE, value);
                        },
                    },
                ]}
                items={navItems}
                value={value}
            />
        );
    }
}

interface NavProps {
    baseCls: string;
    height: number;
    value: string;
    itemInfos: NavItemInfo[];
    itemStyle: NavItemStyle;
}

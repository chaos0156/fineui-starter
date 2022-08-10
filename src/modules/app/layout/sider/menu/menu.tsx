import { Widget, CustomTree } from '@fui/core';
import { shortcut } from '@core/decorator';
import { MenuNode } from './node/node';
import { MenuItem } from './item/item';
import './menu.less';

// 菜单选项信息
export interface MenuItemInfo {
    value: string;
    text: string;
    icon: string;
    card?: typeof Widget;
    cards?: MenuItemInfo[];
    children?: MenuItemInfo[];
}

// 菜单选项风格
export enum MenuItemStyle {
    Main,
    Sub,
}

/**
 * 菜单，有一级菜单和二级菜单两种风格
 */
@shortcut()
export class Menu extends BI.Widget {
    static xtype = 'app.base.menu';

    static EVENT = {
        CHANGE: 'EVENT_CHANGE',
        EXPEND: '',
    };

    public props: MenuProps = {
        baseCls: 'app-base-menu',
        value: '',
        itemInfos: [],
        itemStyle: MenuItemStyle.Main,
    };

    private menuRef: CustomTree;

    /**
     * 创建菜单选项组件
     * @param itemInfos 菜单选项信息
     * @param itemStyle 菜单选项风格
     * @param level 菜单选项层次
     * @returns 菜单选项组件
     */
    private createMenuItems(itemInfos: MenuItemInfo[], itemStyle: MenuItemStyle, level: number): (MenuNode | MenuItem)[] {
        return BI.map(itemInfos, (_index, itemInfo) => {
            const { value, text, icon, cards, children } = itemInfo;
            const valueOrValues = cards ? BI.map(cards, (_index, card) => card.value).join(',') : value;

            return children ? (
                <MenuNode value={valueOrValues} text={text} icon={icon} level={level} children={this.createMenuItems(children, itemStyle, level + 1)} />
            ) : (
                <MenuItem value={valueOrValues} text={text} icon={icon} level={level} style={itemStyle} />
            );
        });
    }

    /**
     * 获取菜单选项组件
     * @returns 菜单选项组件
     */
    private getMenuItems(): (MenuNode | MenuItem)[] {
        const { itemInfos, itemStyle } = this.options;

        return this.createMenuItems(itemInfos, itemStyle, 0);
    }

    /**
     * 设置itemInfos，会根据其值更新menuRef
     * @param itemInfos 要设置的itemInfos值
     */
    public setItemInfos(itemInfos: MenuItemInfo[]) {
        this.options.itemInfos = itemInfos;
        const menuItems = this.getMenuItems();
        this.menuRef.populate(menuItems);
    }

    /**
     * 设置value
     * @param value 要设置的value值
     */
    public setValue(value: string) {
        this.options.value = value;
        this.menuRef.setValue(value);
    }

    public render() {
        const { itemStyle, value } = this.options;
        const menuItems = this.getMenuItems();
        const vgap = itemStyle === MenuItemStyle.Main ? 24 : 0;
        return (
            <BI.CustomTree
                ref={ref => {
                    this.menuRef = ref;
                }}
                // 可展开菜单栏
                expander={<BI.Expander isDefaultInit={false} cls={'expander'} popup={<BI.CustomTree />} />}
                el={<BI.ButtonTree layouts={[<BI.VerticalLayout vgap={vgap} />]} chooseType={BI.Selection.Single} />}
                items={menuItems}
                value={value}
                listeners={[
                    {
                        eventName: BI.CustomTree.EVENT_CHANGE,
                        action: (value: string) => {
                            const valueOrValues = value.includes(',') ? value.split(',') : value;
                            this.fireEvent(Menu.EVENT.CHANGE, valueOrValues);
                        },
                    },
                ]}
            />
        );
    }
}

interface MenuProps {
    baseCls: string;
    value: string;
    itemInfos: MenuItemInfo[];
    itemStyle: MenuItemStyle;
}

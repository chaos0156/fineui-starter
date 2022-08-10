import { BasicButton } from '@fui/core';
import { shortcut, store } from '@core/decorator';
import { MenuItemStyle } from '../menu';
import './item.less';
import LayoutMenuItemModel from './item.model';
import { Text } from '@fui/core';
/**
 * 菜单选项
 */
@shortcut()
@store(LayoutMenuItemModel)
export class MenuItem extends BI.BasicButton {
    static xtype = 'app.base.menu_item';

    private subMenuItemTextRef: Text;
    private model: LayoutMenuItemModel['model'];
    public props: MenuItemProps & BasicButton['props'] = {
        baseCls: 'app-base-menu-item',
        value: '',
        text: '',
        icon: '',
        level: 0,
        style: MenuItemStyle.Main,
    };

    public watch = {
        collapse: () => {
            this.subMenuItemTextRef && this.subMenuItemTextRef.element.css('display', this.model.collapse ? 'block' : 'none');
        },
    };

    /**
     * 创建Main风格的菜单选项组件
     * @returns 创建的菜单选项组件
     */
    private createMainMenuItem() {
        const { text, icon } = this.options;

        return (
            <BI.VerticalLayout cls="app-base-menu-item-main app-list-item-border-left">
                <BI.IconLabel cls={`icon ${icon} icon-size-30`} height={48} />
                <BI.Label cls="text" text={text} height={24} />
            </BI.VerticalLayout>
        );
    }

    /**
     * 创建Sub风格的菜单选项组件
     * @returns 创建的菜单选项组件
     */
    private createSubMenuItem() {
        const { text, icon, level } = this.options;
        return (
            <BI.VerticalAdaptLayout cls="app-base-menu-item-sub bi-list-item-active2" height={40} hgap={8}>
                <BI.IconLabel cls={`icon ${icon}`} lgap={4 + 24 * level} title={text} />
                <BI.Text cls="text" text={text} ref={ref => (this.subMenuItemTextRef = ref)} />
            </BI.VerticalAdaptLayout>
        );
    }

    public render() {
        const { style } = this.options;
        // 菜单选项与组件创建函数的映射关系
        const menuItemStyleCreatorsMap = {
            [MenuItemStyle.Main]: this.createMainMenuItem.bind(this),
            [MenuItemStyle.Sub]: this.createSubMenuItem.bind(this),
        };
        return menuItemStyleCreatorsMap[style]();
    }

    public beforeMount() {
        this.subMenuItemTextRef && this.subMenuItemTextRef.element.css('display', this.model.collapse ? 'block' : 'none');
    }
}

interface MenuItemProps {
    baseCls: string;
    value: string;
    text: string;
    icon: string;
    level: number;
    style: MenuItemStyle;
}

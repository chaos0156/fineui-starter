import { BasicButton } from '@fui/core';
import { shortcut } from '@core/decorator';
import { MenuItemStyle } from '../menu';
import './item.less';

/**
 * 菜单选项
 */
@shortcut()
export class MenuItem extends BI.BasicButton {
    static xtype = 'app.base.menu_item';

    private mainMenuRef: BI.VerticalLayout;

    public props: MenuItemProps & BasicButton['props'] = {
        baseCls: 'app-base-menu-item',
        value: '',
        text: '',
        icon: '',
        level: 0,
        style: MenuItemStyle.Main,
    };

    public changeClass(style: string) {
        console.log('bbbbb',style)
        if (style === 'light') {
            console.log('cccccc',style)
            // this.mainMenuRef.element.get(0).classList.remove('app-list-item-border-left')
            // this.mainMenuRef.element.get(0).classList.add('app-list-item-border-left-light')
            console.log(this.mainMenuRef.element.get(0).classList.contains('app-list-item-border-left.active'))
            this.mainMenuRef.element.css('color','#000')
        } else {
            this.mainMenuRef.element.get(0).classList.remove('app-list-item-border-left-light')
            this.mainMenuRef.element.get(0).classList.add('app-list-item-border-left')
        }
    }

    /**
     * 创建Main风格的菜单选项组件
     * @returns 创建的菜单选项组件
     */
    private createMainMenuItem() {
        const { text, icon } = this.options;

        return (
            <BI.VerticalLayout
                ref={ref => {
                    this.mainMenuRef = ref;
                }}
                cls="app-base-menu-item-main app-list-item-border-left"
            >
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
                <BI.IconLabel cls={`icon ${icon}`} lgap={4 + 24 * level} />
                <BI.Text cls="text" text={text} />
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
}

interface MenuItemProps {
    baseCls: string;
    value: string;
    text: string;
    icon: string;
    level: number;
    style: MenuItemStyle;
}

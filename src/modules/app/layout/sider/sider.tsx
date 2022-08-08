import { shortcut, store } from '@core/decorator';
import { Menu, MenuItemInfo, MenuItemStyle } from './menu/menu';
import { RouteType, RouteInfo, ROUTE_INFOS } from '@/routes';
import LayoutSiderModel from './sider.model';
import LayoutConstant from '../layout.constant';
import './sider.less';

/**
 * 应用布局的侧栏，包括一级菜单和二级菜单
 */
@shortcut()
@store(LayoutSiderModel)
export class LayoutSider extends BI.Widget {
    static xtype = 'app.layout_sider';

    public props = {
        baseCls: 'app-layout-sider',
    };

    public watch = {
        openedCards: (values: string[]) => {
            this.updateSubMenuValueByOpenedCardChange(values);
        },
        activeCard: (value: string) => {
            this.updateSubMenuValueByActiveCardChange(value);
        },
        collapse: () => {
            const collapsed = this.model.collapse;
            this.subMenuRef.setWidth(collapsed ? this.subMenuWidth : 50);
        },
        siderColor: () => {
            const color = this.model.siderColor;
            this.subMenuRef.element.css('background', `${color}`);
            this.mainMenu.element.css('background', `${color}`);
        },
        fontColor: () => {
            const color = this.model.fontColor;
            this.subMenuRef.element.css('color', color);
            this.mainMenu.element.css('color', color);
        },
        mainMenuShow: () => {
            const state = this.model.mainMenuShow;
            this.mainMenu.element.css('display', state ? 'block' : 'none');
        },
        subMenuShow: () => {
            const state = this.model.subMenuShow;
            this.subMenuRef.element.css('display', state ? 'block' : 'none');
        },
    };

    private model: LayoutSiderModel['model'];
    private store: LayoutSiderModel['store'];
    // 一级菜单
    private mainMenu: Menu;
    // 二级菜单
    private subMenuRef: Menu;
    private subMenuWidth: number;

    /**
     * 更新二级菜单的itemInfos
     * @param value 当前选中的一级菜单选项的value值
     */
    private updateSubMenuItemInfos(value: string) {
        const mainMenuItemInfo = BI.find(ROUTE_INFOS, { value }) as RouteInfo;
        const subMenuItemInfos = mainMenuItemInfo.children as MenuItemInfo[];
        this.subMenuRef.setItemInfos(subMenuItemInfos);
    }

    /**
     * 更新二级菜单的value
     */
    private updateSubMenuValueByOpenedCardChange(values: string[]) {
        // console.log('openedcard change', values);
        const mainRouteInfo = BI.find(ROUTE_INFOS, { value: values[0] });
        if (mainRouteInfo && mainRouteInfo.type === RouteType.Single && values.length === 1) {
            this.subMenuRef.setValue('');
        }
    }

    /**
     * 更新二级菜单的value
     */
    private updateSubMenuValueByActiveCardChange(value: string) {
        // console.log('activecard change', value);
        const mainRouteInfo = BI.find(ROUTE_INFOS, { value: this.model.openedCards[0] });
        if (mainRouteInfo && mainRouteInfo.type === RouteType.Single) {
            this.subMenuRef.setValue(value);
        }
    }

    // 初始化sider背景色
    private setDefaultColor() {
        const defaultMainMenuColor = this.model.siderColor;
        const defaultFontColor = this.model.fontColor;
        this.subMenuRef.element.css('background', defaultMainMenuColor);
        this.mainMenu.element.css('background', defaultMainMenuColor);
        this.subMenuRef.element.css('color', defaultFontColor);
        this.mainMenu.element.css('color', defaultFontColor);
    }

    public render() {
        const { MAIN_MENU_WIDTH, SUB_MENU_WIDTH } = LayoutConstant;
        this.subMenuWidth = SUB_MENU_WIDTH;
        const mainMenuItemInfos = BI.map(ROUTE_INFOS, (_index, routeInfo) => {
            const { value, text, icon } = routeInfo;

            return {
                value,
                text,
                icon,
            };
        });
        const subMenuItemInfos = ROUTE_INFOS[0].children;
        return (
            <BI.HorizontalFillLayout columnSize={[MAIN_MENU_WIDTH, '']}>
                {/* 一级菜单 */}
                <Menu
                    ref={ref => {
                        this.mainMenu = ref;
                    }}
                    cls="app-layout-sider-main-menu"
                    itemInfos={mainMenuItemInfos}
                    itemStyle={MenuItemStyle.Main}
                    value={ROUTE_INFOS[0].value}
                    listeners={[
                        {
                            eventName: Menu.EVENT.CHANGE,
                            action: (value: string) => {
                                this.store.closeAllCards();
                                this.store.openSingleCard(value);
                                this.updateSubMenuItemInfos(value);
                            },
                        },
                    ]}
                />
                {/* 二级菜单 */}
                <Menu
                    ref={ref => {
                        this.subMenuRef = ref;
                    }}
                    cls="app-layout-sider-sub-menu bi-background"
                    itemInfos={subMenuItemInfos}
                    itemStyle={MenuItemStyle.Sub}
                    value=""
                    listeners={[
                        {
                            eventName: Menu.EVENT.CHANGE,
                            action: (valueOrValues: string | string[]) => {
                                if (!valueOrValues) return;
                                BI.isArray(valueOrValues) ? this.store.openMultipleCards(valueOrValues) : this.store.openSingleCard(valueOrValues);
                            },
                        },
                    ]}
                />
            </BI.HorizontalFillLayout>
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

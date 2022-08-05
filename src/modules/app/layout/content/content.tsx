import { Tab } from '@fui/core';
import { shortcut, store } from '@core/decorator';
import { Nav, NavItemInfo, NavItemStyle } from './nav/nav';
import { RouteType, RouteInfo, ROUTE_INFOS } from '@/routes';
import LayoutContentModel from './content.model';
import LayoutConstant from '../layout.constant';
import './content.less';
import { DrawerSetting } from './drawerSetting/drawerSetting';

// 路由信息value与页面内容的映射关系，可以理解成一个经过faltten的路由信息集合
export interface ContentsMap {
    [key: string]: NavItemInfo & Required<Pick<RouteInfo, 'card'>> & Partial<Pick<RouteInfo, 'type'>>;
}

// 路由类别与导航选项风格的映射关系
export const ROUTE_TYPE_NAV_ITEM_STYLE_MAP = {
    [RouteType.Single]: NavItemStyle.Block,
    [RouteType.Multiple]: NavItemStyle.Underline,
};

/**
 * 应用布局的内容区域，包括导航栏和实际内容区域
 */
@shortcut()
@store(LayoutContentModel)
export class LayoutContent extends BI.Widget {
    static xtype = 'app.layout_content';

    public props = {
        baseCls: 'app-layout-content',
    };

    public watch = {
        openedCards: (values: string[]) => {
            this.udpateNavItemInfos(values);
            this.updateNavValue();
        },
        activeCard: (value: string) => {
            this.updateNavItemStyle(value);
            this.updateNavValue();
            this.tabRef.setSelect(value);
        },
    };

    private model: LayoutContentModel['model'];
    private store: LayoutContentModel['store'];
    private navRef: Nav;
    private tabRef: Tab;
    private iconRef: BI.IconChangeButton;
    private flag: boolean;
    private contentsMap: ContentsMap;

    /**
     * 初始化ContentsMap
     * @param routeInfos 路由信息集合
     * @param closable 当前路由信息对应的导航选项是否可关闭
     */
    private initContentsMap(routeInfos: RouteInfo[], closable: boolean) {
        if (!this.contentsMap) {
            this.contentsMap = {};
        }
        for (const routeInfo of routeInfos) {
            const { type, value, text, card: Card, cards, children } = routeInfo;
            const isHome = type !== undefined;
            const newClosable = type === RouteType.Single ? true : closable;
            this.contentsMap[value] = {
                type,
                value,
                text: isHome ? '首页' : text,
                closable: isHome ? false : newClosable,
                card: Card ? <Card cardName={text} /> : <BI.Layout />,
            };
            if (children) {
                this.initContentsMap(children, newClosable);
            }
            if (cards) {
                this.initContentsMap(cards, newClosable);
            }
        }
    }

    /**
     * 更新导航组件的itemInfos
     * @param values 当前打卡的卡片们的values
     */
    private udpateNavItemInfos(values: string[]) {
        const itemInfos = BI.map(values, (_index, value) => this.contentsMap[value]);
        this.navRef.setItemInfos(itemInfos);
    }

    /**
     * 更新导航组件的itemStyle
     * @param value 当前激活卡片的value
     */
    private updateNavItemStyle(value: string) {
        const { type } = this.contentsMap[value];
        if (type !== undefined) {
            const itemStyle = ROUTE_TYPE_NAV_ITEM_STYLE_MAP[type];
            this.navRef.setItemStyle(itemStyle);
        }
    }

    /**
     * 根据当前激活卡片的value更新导航组件的值
     */
    private updateNavValue() {
        this.navRef.setValue(this.model.activeCard);
    }

    /*
    Hamburger处理函数*/
    private toggle() {
        this.store.handleCollapse();
        this.flag = !this.flag;
        this.iconRef.setIcon(this.flag ? 'left-font' : 'right-font');
    }

    public setHome() {
        this.store.changeCard('directory')
    }

    // 生命周期函数
    public init() {
        this.initContentsMap([{ value: '', text: 'blank', icon: '' }, ...ROUTE_INFOS], false);
    }

    // 生命周期函数
    public render() {
        const { NAV_HEIGHT } = LayoutConstant;
        const navValue = ROUTE_INFOS[0].value;
        const navItemInfo = this.contentsMap[navValue];
        const navItemType = navItemInfo.type as RouteType;
        const navItemStyle = ROUTE_TYPE_NAV_ITEM_STYLE_MAP[navItemType];


        return (
            <BI.VTapeLayout>
                <BI.LeftRightVerticalAdaptLayout
                    height={NAV_HEIGHT}
                    items={{
                        left: [
                            <BI.VerticalAdaptLayout>
                                <BI.IconChangeButton
                                    cls={'changeButton'}
                                    iconCls="right-font"
                                    height={NAV_HEIGHT}
                                    ref={ref => {
                                        this.iconRef = ref;
                                    }}
                                    handler={() => {
                                        this.toggle();
                                    }}
                                ></BI.IconChangeButton>
                                <Nav
                                    ref={ref => {
                                        this.navRef = ref;
                                    }}
                                    cls="nav bi-background"
                                    itemInfos={[navItemInfo]}
                                    itemStyle={navItemStyle}
                                    value={ROUTE_INFOS[0].value}
                                    listeners={[
                                        {
                                            eventName: Nav.EVENT.CHANGE,
                                            action: (value: string) => {
                                                this.store.changeCard(value);
                                            },
                                        },
                                        {
                                            eventName: Nav.EVENT.CLOSE,
                                            action: (value: string) => {
                                                this.store.closeCard(value);
                                                this.tabRef.removeTab(value);
                                            },
                                        },
                                    ]}
                                />
                            </BI.VerticalAdaptLayout>,
                        ],
                        right: [<DrawerSetting />],
                    }}
                />
                <BI.Tab
                    ref={ref => {
                        this.tabRef = ref;
                    }}
                    cls="card bi-card"
                    cardCreator={key => this.contentsMap[key].card}
                    showIndex={ROUTE_INFOS[0].value}
                />
            </BI.VTapeLayout>
        );
    }
}

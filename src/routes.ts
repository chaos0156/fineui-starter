import { Widget } from '@fui/core';
import { Home } from '@card/home/home';
import { Demo } from '@card/demo/demo';
import { Todolist } from '@card/todolist/todolist';

// 路由类型
export enum RouteType {
    Single,
    Multiple,
}

// 路由信息
export interface RouteInfo {
    type?: RouteType;
    value: string;
    text: string;
    icon: string;
    card?: typeof Widget;
    cards?: RouteInfo[];
    children?: RouteInfo[];
}

/*
 *  路由映射信息，配置说明：
 *  1.顶层路由将作为一级菜单，第二层及更深层路由将作为二级菜单
 *  2.为顶层路由配置type属性
 *    2.1 RouteType.Single: 每个二级菜单选项对应一个card，导航标签可关闭，其形式类似BI的目录页面
 *    2.2 RouteType.Multiple: 每个二级菜单选项对应多个card，导航标签不可关闭，其形式类似BI的管理系统页面
 *  3.路由公共配置如下：
 *    3.1 value: 路由的唯一索引
 *    3.2 text: 路由对应的菜单项名称和导航标签名称
 *    3.3 icon: 路由对应的菜单项图标
 *    3.4 children: 路由的子路由
 *    3.5 card|cards:
 *      3.5.1 card: 顶层路由的type为RouteType.Single时可用，表示该路由对应的单个card
 *      3.5.2 cards: 顶层路由的type为RouteType.Multiple时可用，表示该路由对应的多个card
 *      3.5.3 顶层路由的card表示一级菜单对应的默认card
 */
export const ROUTE_INFOS: RouteInfo[] = [
    {
        type: RouteType.Single,
        value: 'directory',
        text: '模板目录',
        icon: 'directory-font',
        card: Home,
        children: [
            {
                value: 'todolist',
                text: 'Todolist',
                icon: 'date-font',
                card: Todolist,
            },
            {
                value: 'menu-level-1',
                text: '一级菜单',
                icon: 'text-align-center-font',
                children: [
                    {
                        value: 'menu-level-1-todolist',
                        text: '一级 Todolist',
                        icon: 'date-font',
                        card: Todolist,
                    },
                    {
                        value: 'menu-level-2',
                        text: '二级菜单',
                        icon: 'text-align-center-font',
                        children: createDemoRouteInfos(4, '二级'),
                    },
                    {
                        value: 'menu-level-2-another',
                        text: '另一个二级菜单',
                        icon: 'text-align-center-font',
                        children: createDemoRouteInfos(4, '另一个二级'),
                    },
                    ...createDemoRouteInfos(4, '一级'),
                ],
            },
            ...createDemoRouteInfos(8),
        ],
    },
    {
        type: RouteType.Multiple,
        value: 'management',
        text: '系统管理',
        icon: 'management-font',
        card: Home,
        children: [
            {
                value: 'series-1',
                text: '系列一',
                icon: 'copy-font',
                cards: createDemoRouteInfos(4, '系列一的'),
            },
            {
                value: 'series-2',
                text: '系列二',
                icon: 'copy-font',
                cards: [...createDemoRouteInfos(4, '系列二的'), ...createDemoRouteInfos(4, '另一个')],
            },
            {
                value: 'series-level-1',
                text: '一级菜单',
                icon: 'text-align-center-font',
                children: [
                    {
                        value: 'series-level-1-1',
                        text: '一级系列一',
                        icon: 'copy-font',
                        cards: createDemoRouteInfos(8, '一级系列一的'),
                    },
                    {
                        value: 'series-level-1-2',
                        text: '一级系列二',
                        icon: 'copy-font',
                        cards: createDemoRouteInfos(8, '一级系列二的'),
                    },
                    {
                        value: 'series-level-2',
                        text: '二级菜单',
                        icon: 'text-align-center-font',
                        children: [
                            {
                                value: 'series-level-2-1',
                                text: '二级系列一',
                                icon: 'copy-font',
                                cards: createDemoRouteInfos(5, '二级系列一的'),
                            },
                            {
                                value: 'series-level-2-2',
                                text: '二级系列二',
                                icon: 'copy-font',
                                cards: createDemoRouteInfos(6, '二级系列二的'),
                            },
                            {
                                value: 'series-level-2-3',
                                text: '二级系列三',
                                icon: 'copy-font',
                                cards: createDemoRouteInfos(7, '二级系列三的'),
                            },
                            {
                                value: 'series-level-2-4',
                                text: '二级系列四',
                                icon: 'copy-font',
                                cards: createDemoRouteInfos(8, '二级系列四的'),
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

// ================ 以下为测试用的工具函数 ================

/**
 * 生成用于测试的路由信息集合
 * @param number 要生成路由信息的数量
 * @param textPrefix 要生成路由信息的名称前缀
 * @returns 所生成的路由信息集合
 */
function createDemoRouteInfos(number: number, textPrefix = ''): RouteInfo[] {
    const iconList = [
        'search-font',
        'date-font',
        'time-font',
        'date-change-h-font',
        'copy-font',
        'primary-key-font',
        'text-bold-font',
        'text-italic-font',
        'text-underline-font',
        'text-color-font',
        'text-background-font',
    ];

    return BI.map(BI.range(0, number, 1), index => {
        return {
            value: BI.UUID(),
            text: `${textPrefix} Demo ${index + 1}`,
            icon: iconList[index % iconList.length],
            card: Demo,
        };
    });
}

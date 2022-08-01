import { model, Model } from '@core/decorator';
import { ROUTE_INFOS } from '@/routes';
import LayoutConstant from './layout.constant';

@model()
export default class LayoutModel extends Model {
    static xtype = 'app.model.layout';


    // 父组件定义childContext数组，表示需要将哪些数据放置到context内容中
    public childContext = <const>['openedCards', 'activeCard','collapse','siderColor','headerColor','fontColor'];

    // 默认值
    public state(): LayoutModelState {
        const {SIDER_COLOR,HEADER_COLOR,DARK_FONT_COLOR} = LayoutConstant;
        return {
            collapse: true,
            openedCards: [ROUTE_INFOS[0].value],
            activeCard: ROUTE_INFOS[0].value,
            siderColor:SIDER_COLOR,
            headerColor:HEADER_COLOR,
            fontColor:DARK_FONT_COLOR,
        };
    }
}

interface LayoutModelState {
    collapse: boolean; // 是否展开二级菜单
    openedCards: string[]; // 打开卡片的key的集合
    activeCard: string; // 当前卡片的key
    siderColor: string; //Sider 的颜色
    headerColor:string; //Header 的颜色
    fontColor:string; //默认字体颜色
}

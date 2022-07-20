import { model, Model } from '@core/decorator';
import { ROUTE_INFOS } from '@/routes';

@model()
export default class LayoutModel extends Model {
    static xtype = 'app.model.layout';

    // 父组件定义childContext数组，表示需要将哪些数据放置到context内容中
    public childContext = <const>['openedCards', 'activeCard','collapse'];

    // 默认值
    public state(): LayoutModelState {
        return {
            collapse: true,
            openedCards: [ROUTE_INFOS[0].value],
            activeCard: ROUTE_INFOS[0].value,
        };
    }
}

interface LayoutModelState {
    collapse: boolean; // 是否展开二级菜单
    openedCards: string[]; // 打开卡片的key的集合
    activeCard: string; // 当前卡片的key
}

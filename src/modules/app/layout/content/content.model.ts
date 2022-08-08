import { model, Model } from '@core/decorator';
import LayoutModel from '../layout.model';

@model()
export default class LayoutContentModel extends Model<{
    types: {
        collapse: LayoutModel['TYPE']['collapse'];
        openedCards: LayoutModel['TYPE']['openedCards'];
        activeCard: LayoutModel['TYPE']['activeCard'];
    };
    context: LayoutContentModel['context'];
}> {
    static xtype = 'app.model.layout_content';

    // 子组件定义context数组，表示需要接收哪些context内容
    public context = <const>['openedCards', 'activeCard','collapse'];

    public actions = {
        /**
         * 切换card
         * @param value 要切换的card的key
         */
        changeCard: (value: string) => {
            this.model.activeCard = value;
        },
        /**
         * 关闭card
         * @param value 要关闭的card的key
         */
        closeCard: (value: string) => {
            // 获取要关闭card在已打开cards中的下标
            const index = BI.indexOf(this.model.openedCards, value);
            // 如果要关闭card就是当前card，则自动切换至其它card
            if (value === this.model.activeCard) {
                const [prevIndex, nextIndex] = [index - 1, index + 1];
                const [prevCard, nextCard] = [this.model.openedCards[prevIndex], this.model.openedCards[nextIndex]];
                this.model.activeCard = nextCard || prevCard;
            }
            // 然后从已打开cards中移除目标card
            BI.removeAt(this.model.openedCards, index);
        },
        /**
         *  切换collapse
        */
       handleToggleCollapse:()=>{
            this.model.collapse = !this.model.collapse;
       }
    };
}

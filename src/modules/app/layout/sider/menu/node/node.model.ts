import { model, Model } from '@core/decorator';
import LayoutModel from '@/modules/app/layout/layout.model';

@model()
export default class LayoutNodeModel extends Model<{
    types: {
        collapse: LayoutModel['TYPE']['collapse'];
        isExpend: LayoutModel['TYPE']['isExpend'];
    };
    context: LayoutNodeModel['context'];
}> {
    static xtype = 'app.model.layout_sider_menu_node';

    public context = <const>['collapse', 'isExpend'];

    public actions = {
        /**
         *  展开
         */
        setExpend: () => {
            this.model.collapse = true;
            this.model.isExpend = true;
        },
    };
}

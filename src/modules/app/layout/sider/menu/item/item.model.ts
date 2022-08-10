import { model, Model } from '@core/decorator';
import LayoutModel from '@/modules/app/layout/layout.model';

@model()
export default class LayoutMenuItemModel extends Model<{
    types: {
        collapse: LayoutModel['TYPE']['collapse'];
    };
    context: LayoutMenuItemModel['context'];
}> {
    static xtype = 'app.model.layout_sider_menu_item';

    public context = <const>['collapse'];

    public actions = {

    };
}

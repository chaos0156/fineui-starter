import { model, Model } from '@core/decorator';
import LayoutModel from '@/modules/app/layout/layout.model';

@model()
export default class LayoutNodeModel extends Model<{
    types: {
        collapse: LayoutModel['TYPE']['collapse'];
        siderColor:LayoutModel['TYPE']['siderColor'];
        fontColor:LayoutModel['TYPE']['fontColor'];
    };
    context: LayoutNodeModel['context'];
}> {
    static xtype = 'app.model.layout_sider_menu_node';

    public context = <const>['collapse','siderColor','fontColor'];

    public actions = {
        valueOfCollapse:()=>{
            return this.model.collapse;
        },
        getBackgroundColor:()=>{
            return this.model.siderColor;
        },
        getFontColor:()=>{
            return this.model.fontColor;
        }
    };
}

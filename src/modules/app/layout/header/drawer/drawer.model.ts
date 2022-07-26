import { model, Model } from '@core/decorator';
import LayoutModel from '@/modules/app/layout/layout.model';

@model()
export default class LayoutDrawerModel extends Model<{
    types: {
        collapse: LayoutModel['TYPE']['collapse'];
        siderColor:LayoutModel['TYPE']['siderColor'];
    };
    context:  LayoutDrawerModel['context'];
}> {
    static xtype = 'app.model.drawer';

    public context = <const>['collapse','siderColor'];

    public actions = {
        getSiderColor:()=>{
            return this.model.siderColor;   // undefined
        },
        setSiderColor:(value:string)=>{
            this.model.siderColor = value;
        }
    };
}

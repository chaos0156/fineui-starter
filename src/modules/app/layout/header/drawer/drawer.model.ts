import { model, Model } from '@core/decorator';
import LayoutModel from '@/modules/app/layout/layout.model';

@model()
export default class LayoutDrawerModel extends Model<{
    types: {
        siderColor:LayoutModel['TYPE']['siderColor'];
        headerColor:LayoutModel['TYPE']['headerColor'];
    };
    context:  LayoutDrawerModel['context'];
}> {
    static xtype = 'app.model.drawer';

    public context = <const>['siderColor','headerColor'];

    public actions = {
        getSiderColor:()=>{
            return this.model.siderColor;
        },
        setSiderColor:(value:string)=>{
            this.model.siderColor = value;
        },
        getHeaderColor:()=>{
            return this.model.headerColor;
        },
        setHeaderColor:(value:string)=>{
            this.model.headerColor = value;
        }
    };
}

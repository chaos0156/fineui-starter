import { model, Model } from '@core/decorator';
import LayoutModel from '../layout.model';

@model()
export default class LayoutHeaderModel extends Model<{
    types: {
        headerColor:LayoutModel['TYPE']['headerColor'];
    };
    context:  LayoutHeaderModel['context'];
}> {
    static xtype = 'app.model.layout_header';

    public context = <const>['headerColor'];

    public actions = {
        getHeaderColor:()=>{
            return this.model.headerColor;
        },
    };
}

import { model, Model } from '@core/decorator';
import LayoutModel from '@/modules/app/layout/layout.model';

@model()
export default class LayoutDrawerModel extends Model<{
    types: {
        siderColor:LayoutModel['TYPE']['siderColor'];
        headerColor:LayoutModel['TYPE']['headerColor'];
        fontColor:LayoutModel['TYPE']['fontColor'];
        headerShow:LayoutModel['TYPE']['headerShow'];
        mainMenuShow:LayoutModel['TYPE']['mainMenuShow'];
        subMenuShow:LayoutModel['TYPE']['subMenuShow'];
    };
    context:  LayoutDrawerModel['context'];
}> {
    static xtype = 'app.model.drawer';

    public context = <const>['siderColor','headerColor','fontColor','headerShow','mainMenuShow','subMenuShow'];

    public actions = {
        setSiderColor:(value:string)=>{
            this.model.siderColor = value;
        },
        setHeaderColor:(value:string)=>{
            this.model.headerColor = value;
        },
        setFontColor:(value:string)=>{
            this.model.fontColor = value;
        },
        setHeaderShow:(state:boolean)=>{
            this.model.headerShow = state;
        },
        setMainMenuShow:(state:boolean) =>{
            this.model.mainMenuShow = state;
        },
        setSubMenuShow:(state:boolean) =>{
            this.model.subMenuShow = state;
        },
    };
}

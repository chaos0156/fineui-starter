import { model, Model } from '@core/decorator';

@model()
export default class LayoutHomeModel extends Model {
    static xtype = 'app.model.Home';

    // segment默认值
    public state() {
        return {
            chooseValue:1
        }
    }

    // 获取值
    public actions = {
        getValue:()=>{
            return this.model.chooseValue;
        },
        setValue:(value:number)=>{
            this.model.chooseValue = value;
        }
    };
}

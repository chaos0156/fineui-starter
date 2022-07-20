import { model, Model } from '@core/decorator';
import LayoutModel from '@app/layout/layout.model';

@model()
export default class DemoModel extends Model<{
    types: {
        openedCards: LayoutModel['TYPE']['openedCards'];
        activeCard: LayoutModel['TYPE']['activeCard'];
    };
    context: DemoModel['context'];
}> {
    static xtype = 'app.model.demo';

    public context = <const>['openedCards', 'activeCard'];
}

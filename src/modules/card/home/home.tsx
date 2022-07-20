import { shortcut } from '@core/decorator';
import './home.less';

/**
 * 用于充当各一级菜单首页的测试组件
 */
@shortcut()
export class Home extends BI.Widget {
    static xtype = 'app.home';

    public props: HomeProps = {
        baseCls: 'app-home',
        cardName: '',
    };

    public render() {
        const { cardName } = this.options;
        const labelText = `我是一级菜单 ${cardName} 的首页`;

        return <BI.Label cls="bi-high-light" text={labelText} />;
    }
}

interface HomeProps {
    baseCls: string;
    cardName: string;
}

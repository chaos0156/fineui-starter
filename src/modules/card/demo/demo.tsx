import { Label } from '@fui/core';
import { shortcut, store } from '@core/decorator';
import DemoModel from './demo.model';
import './demo.less';

/**
 * 用于进行基本演示的测试组件
 */
@shortcut()
@store(DemoModel)
export class Demo extends BI.Widget {
    static xtype = 'app.demo';

    public props: DeomProps = {
        baseCls: 'app-demo',
        cardName: '',
    };

    public watch = {
        openedCards: () => {
            this.updateLabelRef();
        },
        activeCard: () => {
            this.updateLabelRef();
        },
    };

    private model: DemoModel['model'];
    private labelRef: Label;

    /**
     * 基于cardName和model获取标签的文本内容
     * @returns 标签的文本内容
     */
    private getLabelText(): string {
        const { cardName } = this.options;
        const { openedCards, activeCard } = this.model;
        const text = `
            组件名称为 ${cardName}，
            openedCards 为 [ ${openedCards} ]，
            openedCards 的长度为 ${openedCards.length}，
            activeCard 为 ${activeCard}
            `;

        return text;
    }

    /**
     * 更新标签的文本内容
     */
    private updateLabelRef() {
        const labelText = this.getLabelText();
        this.labelRef.setText(labelText);
    }

    public render() {
        const labelText = this.getLabelText();

        return (
            <BI.Label
                ref={ref => {
                    this.labelRef = ref;
                }}
                text={labelText}
            />
        );
    }
}

interface DeomProps {
    baseCls: string;
    cardName: string;
}

import { shortcut, store } from '@core/decorator';
import './home.less';
import LayoutHomeModel from './home.model';
import { HomeProduct } from './product/product';
import { HomeIntroduction } from './introduction/introduction';
/**
 * 用于充当各一级菜单首页的测试组件
 */
@shortcut()
@store(LayoutHomeModel)
export class Home extends BI.Widget {
    static xtype = 'app.home';

    // private model: LayoutHomeModel['model'];
    // private store: LayoutHomeModel['store'];
    private segmentRef: BI.LinearSegment;
    private tabRef: BI.Layout;
    private cardRef: BI.VerticalLayout;
    public props: HomeProps = {
        baseCls: 'app-home',
        cardName: '',
    };

    private showTab() {
        let val = this.segmentRef.getValue()[0];
        if (val === 1) {
            this.tabRef.populate([<HomeIntroduction />]);
        } else {
            this.tabRef.populate([<HomeProduct />]);
        }
    }

    public render() {
        const fanruanLogo = 'https://www.fanruan.com/images/logo-fanruan.png';
        const finedesignLogo =
            'data:image/png;base64,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';
        const fanruanUrl = 'https://www.fanruan.com/';
        const labelText = `欢迎使用FineUI`;
        const headline = 'FineUI是一套用于构建用户界面的解决方案。';
        const description = [
            { text: 'FineUI是一套视图层框架，与其他框架不同的是，FineUI专注于页面构图与自定义' },
            { text: 'FineUI是一套数据流框架，与其他框架不同的是，FineUI可以做到把视图与状态完全分离，设计灵感来源于Vue的响应式方案' },
            { text: 'FineUI还是一套组件库，利用FineUI，我们实现了一套面向企业级应用而设计的组件库供大家使用，组件库里列出了这些组件' },
        ].map(item => {
            return Object.assign(
                {
                    type: 'bi.label',
                    width: 800,
                    whiteSpace: 'normal',
                    textAlign: 'left',
                },
                item
            );
        });
        return (
            <BI.VerticalLayout hgap={25} vgap={25}>
                <BI.Label text={labelText} textAlign={'left'}></BI.Label>
                <BI.VerticalLayout cls={'description'} ref={ref => (this.cardRef = ref)}>
                    <BI.VerticalAdaptLayout>
                        <BI.VerticalLayout>
                            <BI.Label text={headline} textAlign={'left'} cls="headline"></BI.Label>
                            <BI.ButtonGroup
                                items={description}
                                layouts={<BI.VerticalLayout></BI.VerticalLayout>}
                                height={description.length * 20}
                                cls={'content'}
                            />
                        </BI.VerticalLayout>
                        <BI.Img src={fanruanLogo} width={90} height={30} hgap={40}></BI.Img>
                        <BI.Img src={finedesignLogo} width={36} height={36} lgap={40}></BI.Img>
                        <BI.Label text="Fine Design" cls={'design'} rgap={30} />
                        <BI.Button
                            text="点击使用"
                            width={150}
                            height={46}
                            cls={'use'}
                            handler={() => {
                                window.open(fanruanUrl);
                            }}
                        ></BI.Button>
                    </BI.VerticalAdaptLayout>
                    <BI.LinearSegment
                        value={1}
                        width={300}
                        ref={ref => {
                            this.segmentRef = ref;
                        }}
                        items={[
                            { text: '了解帆软', value: 1, items: { type: 'bi.label', text: '你好' } },
                            { text: '产品解决方案', value: 2 },
                        ]}
                        listeners={[
                            {
                                eventName: 'EVENT_CHANGE',
                                action: () => {
                                    this.showTab();
                                },
                            },
                        ]}
                    ></BI.LinearSegment>
                    <BI.Layout
                        ref={ref => {
                            this.tabRef = ref;
                        }}
                    ></BI.Layout>
                </BI.VerticalLayout>
            </BI.VerticalLayout>
        );
    }
    // 初始时默认渲染value为1的组件
    public beforeMount() {
        this.showTab();
    }
}

interface HomeProps {
    baseCls: string;
    cardName: string;
}

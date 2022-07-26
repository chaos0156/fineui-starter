import { shortcut, store } from '@core/decorator';
import LayoutDrawerModel from './drawer.model';
import './drawer.less';

/**
 * Drawer
 */
@shortcut()
@store(LayoutDrawerModel)
export class HeaderDrawer extends BI.Widget {
    static xtype = 'app.layout_header_drawer';
    public props = {
        baseCls: 'app-layout-header-drawer',
    };

    private model: LayoutDrawerModel['model'];
    private store: LayoutDrawerModel['store'];

    private lightStyle = 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg';
    private darkStyle = 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg';

    private choosecolor: BI.ColorChooser;

    private changeColor() {
        let color = this.choosecolor.getValue();
        this.store.setSiderColor(color);
    }

    private wholeStyle = (
        <BI.VerticalLayout bgap={10}>
            <BI.Label text="整体风格设置" textAlign="left"></BI.Label>
            <BI.HorizontalLayout tgap={10}>
                <BI.Img
                    // ref={ref=>{
                    //     this.darkImg = ref
                    // }}
                    src={this.darkStyle}
                    width={48}
                    height={42}
                    rgap={20}
                    title={'暗黑菜单风格'}
                    listeners={[
                        {
                            eventName: 'EVENT_CHANGE',
                            action: () => {
                                BI.Msg.toast('1111');
                            },
                        },
                    ]}
                ></BI.Img>
                <BI.Img src={this.lightStyle} title={'亮色菜单风格'} width={48} height={42}></BI.Img>
            </BI.HorizontalLayout>
        </BI.VerticalLayout>
    );

    // 头部内容
    private top = ['侧边栏主题色设置', 'Header 主题色设置'].map((item, index) => {
        return (
            <BI.VerticalLayout vgap={8}>
                <BI.Label text={item} textAlign="left" vgap={5}></BI.Label>
                <BI.VerticalAdaptLayout>
                    <BI.IconLabel cls={'theme-font'} rgap={20} css={{ 'font-size': '20px' }}></BI.IconLabel>
                    {index === 0 && (
                        <BI.ColorChooser
                            width={250}
                            height={24}
                            cls={'colorChoose'}
                            value={'blue'}
                            ref={ref => {
                                this.choosecolor = ref;
                            }}
                            listeners={[
                                {
                                    eventName: 'EVENT_CHANGE',
                                    action: () => {
                                        this.changeColor();
                                    },
                                },
                            ]}
                        ></BI.ColorChooser>
                    )}
                </BI.VerticalAdaptLayout>
            </BI.VerticalLayout>
        );
    });

    // 中部内容
    private mid = BI.map(['内容区域宽度', '固定 Header', '下滑时隐藏 Header', '固定侧边栏'], (index, item) => {
        if (index == 0) {
            return (
                <BI.LeftRightVerticalAdaptLayout
                    vgap={10}
                    items={{
                        left: [<BI.Text text={item} vgap={10} />],
                        right: [<BI.TextValueCombo width={70} height={24} value={1} text="流式" items={[{ text: '流式', value: 1 }]}></BI.TextValueCombo>],
                    }}
                />
            );
        } else {
            return (
                <BI.LeftRightVerticalAdaptLayout
                    vgap={10}
                    items={{
                        left: [<BI.Text text={item} vgap={10} />],
                        right: [<BI.Switch></BI.Switch>],
                    }}
                />
            );
        }
    });

    private str = '配置栏只在开发环境用于预览，生产环境不会展现，请拷贝后手动修改配置文件';
    // 底部内容
    private bottom = (
        <BI.VerticalLayout vgap={5}>
            <BI.Button vgap={5} iconCls="copy-font" text="拷贝设置" height={50} level={'common'} light={true} />
            <BI.Label vgap={15} whiteSpace={'normal'} cls={'bottomText'} textWidth={250} text={this.str}></BI.Label>
        </BI.VerticalLayout>
    );

    public render() {
        console.log('this.model',this.model)
        return (
            <BI.VerticalLayout>
                <BI.VerticalLayout>{this.wholeStyle}</BI.VerticalLayout>
                <BI.VerticalLayout cls={'top'}>{this.top}</BI.VerticalLayout>
                <BI.VerticalLayout cls={'mid'}>{this.mid}</BI.VerticalLayout>
                <BI.VerticalLayout cls={'bottom'}>{this.bottom}</BI.VerticalLayout>
            </BI.VerticalLayout>
        );
    }
}

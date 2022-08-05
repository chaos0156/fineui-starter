import { shortcut, store } from '@core/decorator';
import LayoutDrawerModel from './drawer.model';
import LayoutConstant from '@/modules/app/layout/layout.constant';
import './drawer.less';

/**
 * Drawer
 */
@shortcut()
@store(LayoutDrawerModel)
export class Drawer extends BI.Widget {
    static xtype = 'app.layout_header_drawer';
    public props = {
        baseCls: 'app-layout-header-drawer',
    };

    private model: LayoutDrawerModel['model'];
    private store: LayoutDrawerModel['store'];
    private switchHeaderRef: BI.Switch;
    private switchMainMenuRef: BI.Switch;
    private switchSubMenuRef: BI.Switch;
    private choosecolorSider: BI.ColorChooser;
    private choosecolorHeader: BI.ColorChooser;

    // 修改侧边栏背景色
    private changeSiderColor() {
        let color = this.choosecolorSider.getValue();
        this.store.setSiderColor(color);
    }
    // 修改Header栏背景色
    private changeHeaderColor() {
        let color = this.choosecolorHeader.getValue();
        this.store.setHeaderColor(color);
    }
    // 设置为暗色菜单风格
    private chooseDarkStyle() {
        this.store.setFontColor(LayoutConstant.DARK_FONT_COLOR);
        this.choosecolorSider.setValue(LayoutConstant.SIDER_COLOR);
        this.store.setSiderColor(LayoutConstant.SIDER_COLOR);
        this.choosecolorHeader.setValue(LayoutConstant.HEADER_COLOR);
        this.store.setHeaderColor(LayoutConstant.HEADER_COLOR);
    }
    // 设置为亮色菜单风格
    private chooseLightStyle() {
        this.store.setFontColor(LayoutConstant.LIGHT_FONT_COLOR);
        this.choosecolorSider.setValue(LayoutConstant.LIGHT_SIDER_COLOR);
        this.store.setSiderColor(LayoutConstant.LIGHT_SIDER_COLOR);
        this.choosecolorHeader.setValue(LayoutConstant.LIGHT_HEADER_COLOR);
        this.store.setHeaderColor(LayoutConstant.LIGHT_HEADER_COLOR);
    }

    // 控制显示内容
    /* 1：Header
       2：一级侧边栏
       3：二级侧边栏
    */
    private headerToggle() {
        let state = this.switchHeaderRef.isSelected();
        this.store.setHeaderShow(state);
        if (state) {
            BI.Msg.toast('显示 Header');
        } else {
            BI.Msg.toast('隐藏 Header', { level: 'warning' });
        }
    }

    private mainMenuToggle() {
        let state = this.switchMainMenuRef.isSelected();
        this.store.setMainMenuShow(state);
        if (state) {
            BI.Msg.toast('显示一级侧边栏');
        } else {
            BI.Msg.toast('隐藏一级侧边栏', { level: 'warning' });
        }
    }

    private subMenuToggle() {
        let state = this.switchSubMenuRef.isSelected();
        this.store.setSubMenuShow(state);
        if (state) {
            BI.Msg.toast('显示二级侧边栏');
        } else {
            BI.Msg.toast('隐藏二级侧边栏', { level: 'warning' });
        }
    }

    // 恢复默认设置
    private restoreDefault() {
        this.chooseDarkStyle();
        this.store.setHeaderShow(true);
        this.store.setMainMenuShow(true);
        this.store.setSubMenuShow(true);
        this.switchHeaderRef.setSelected(this.store.getHeaderShow());
        this.switchMainMenuRef.setSelected(this.store.getMainMenuShow());
        this.switchSubMenuRef.setSelected(this.store.getSubMenuShow());
    }

    private wholeStyle = (
        <BI.VerticalLayout bgap={10}>
            <BI.Label text="整体风格设置" textAlign="left"></BI.Label>
            <BI.HorizontalLayout tgap={10}>
                <BI.BasicButton
                    title={'暗色菜单风格'}
                    width={52}
                    height={42}
                    cls={'darkstyle'}
                    rgap={20}
                    listeners={[
                        {
                            eventName: 'BasicButton.EVENT_CHANGE',
                            action: () => {
                                BI.Msg.toast('选择暗色菜单风格', { level: 'success' });
                                this.chooseDarkStyle();
                            },
                        },
                    ]}
                />
                <BI.BasicButton
                    width={52}
                    height={42}
                    title={'亮色菜单风格'}
                    cls={'lightstyle'}
                    listeners={[
                        {
                            eventName: 'BasicButton.EVENT_CHANGE',
                            action: () => {
                                BI.Msg.toast('选择亮色菜单风格', { level: 'success' });
                                this.chooseLightStyle();
                            },
                        },
                    ]}
                />
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
                            ref={ref => {
                                this.choosecolorSider = ref;
                            }}
                            listeners={[
                                {
                                    eventName: 'EVENT_CHANGE',
                                    action: () => {
                                        this.changeSiderColor();
                                    },
                                },
                            ]}
                        ></BI.ColorChooser>
                    )}
                    {index === 1 && (
                        <BI.ColorChooser
                            width={250}
                            height={24}
                            cls={'colorChoose'}
                            ref={ref => {
                                this.choosecolorHeader = ref;
                            }}
                            listeners={[
                                {
                                    eventName: 'EVENT_CHANGE',
                                    action: () => {
                                        this.changeHeaderColor();
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
    private mid = BI.map(['内容区域', 'Header', '一级侧边栏', '二级侧边栏'], (index, item) => {
        if (index == 0) {
            return (
                <BI.LeftRightVerticalAdaptLayout
                    vgap={5}
                    items={{
                        left: [<BI.Text text={item} vgap={10} />],
                        right: [],
                    }}
                />
            );
        } else if (index == 1) {
            return (
                <BI.LeftRightVerticalAdaptLayout
                    vgap={5}
                    items={{
                        left: [<BI.Text text={item} vgap={10} />],
                        right: [
                            <BI.Switch
                                ref={ref => {
                                    this.switchHeaderRef = ref;
                                }}
                                handler={() => {
                                    this.headerToggle();
                                }}
                            ></BI.Switch>,
                        ],
                    }}
                />
            );
        } else if (index == 2) {
            return (
                <BI.LeftRightVerticalAdaptLayout
                    vgap={5}
                    items={{
                        left: [<BI.Text text={item} vgap={10} />],
                        right: [
                            <BI.Switch
                                ref={ref => {
                                    this.switchMainMenuRef = ref;
                                }}
                                handler={() => {
                                    this.mainMenuToggle();
                                }}
                            ></BI.Switch>,
                        ],
                    }}
                />
            );
        } else {
            return (
                <BI.LeftRightVerticalAdaptLayout
                    vgap={5}
                    items={{
                        left: [<BI.Text text={item} vgap={10} />],
                        right: [
                            <BI.Switch
                                ref={ref => {
                                    this.switchSubMenuRef = ref;
                                }}
                                handler={() => {
                                    this.subMenuToggle();
                                }}
                            ></BI.Switch>,
                        ],
                    }}
                />
            );
        }
    });

    private str = '配置栏只在开发环境用于预览，生产环境不会展现，请拷贝后手动修改配置文件';
    // 底部内容
    private bottom = (
        <BI.VerticalLayout vgap={5}>
            <BI.Button
                vgap={5}
                iconCls="copy-font"
                text="拷贝设置"
                height={50}
                level={'common'}
                ghost
                handler={() => {
                    BI.Msg.toast('拷贝成功', { level: 'success' });
                }}
            />
            <BI.Label vgap={5} whiteSpace={'normal'} cls={'bottomText'} textWidth={250} text={this.str}></BI.Label>
            <BI.Button
                vgap={5}
                iconCls="default-font"
                text="恢复默认设置"
                height={50}
                ghost
                level={'success'}
                handler={() => {
                    BI.Msg.toast('恢复默认设置成功', { level: 'success' });
                    this.restoreDefault();
                }}
            ></BI.Button>
        </BI.VerticalLayout>
    );

    public render() {
        return (
            <BI.VerticalLayout>
                <BI.VerticalLayout>{this.wholeStyle}</BI.VerticalLayout>
                <BI.VerticalLayout cls={'top'}>{this.top}</BI.VerticalLayout>
                <BI.VerticalLayout cls={'mid'}>{this.mid}</BI.VerticalLayout>
                <BI.VerticalLayout cls={'bottom'}>{this.bottom}</BI.VerticalLayout>
            </BI.VerticalLayout>
        );
    }

    /**
     * beforeMount
     */
    public beforeMount() {
        // 渲染之前设置header和sider的在选色器中的默认颜色
        this.choosecolorSider.setValue(this.model.siderColor);
        this.choosecolorHeader.setValue(this.model.headerColor);
        this.switchHeaderRef.setSelected(this.store.getHeaderShow());
        this.switchMainMenuRef.setSelected(this.store.getMainMenuShow());
        this.switchSubMenuRef.setSelected(this.store.getSubMenuShow());
    }
}

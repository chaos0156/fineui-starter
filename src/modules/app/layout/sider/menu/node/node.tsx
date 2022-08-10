import { NodeButton, IconChangeButton } from '@fui/core';
import { shortcut, store } from '@core/decorator';
import { MenuItem } from '../item/item';
import './node.less';
import LayoutNodeModel from './node.model';
import { Text } from '@fui/core';

// 节点展开和折叠状态分别对应的类名
export const ARROW_CLASSES_MAP = {
    collapse: 'column-next-page-h-font',
    expand: 'column-pre-page-h-font',
};

/**
 * 菜单选项中的展开/折叠节点
 */
@shortcut()
@store(LayoutNodeModel)
export class MenuNode extends BI.NodeButton {
    static xtype = 'app.base.menu_node';

    public props: MenuNodeProps & NodeButton['props'] = {
        baseCls: 'app-base-menu-node bi-list-item',
        height: 36,
        open: false,
        value: '',
        text: '',
        icon: '',
        level: 0,
        children: [],
    };

    private arrowRef: IconChangeButton;
    private textRef: Text;
    private model: LayoutNodeModel['model'];
    private store: LayoutNodeModel['store'];

    public watch = {
        collapse: () => {
            if (!this.model.isExpend) this.triggerCollapse();
            this.textRef.element.css('display', this.model.collapse ? 'block' : 'none');
        },
    };

    /**
     * 设置菜单节点的展开情况
     * @param opened 要设置的展开情况，ture表示展开，false表示折叠
     */
    public setOpened(opened: boolean) {
        Object.getPrototypeOf(MenuNode).prototype.setOpened.call(this, opened);
        const arrowCls = ARROW_CLASSES_MAP[opened ? 'expand' : 'collapse'];
        this.arrowRef.setIcon(arrowCls);
        if (opened && !this.model.collapse) {

            this.store.setExpend();
        }
    }

    public render() {
        const { text, icon, level } = this.options;

        return (
            <BI.LeftRightVerticalAdaptLayout lhgap={8} rhgap={16}>
                <left>
                    <BI.IconLabel cls={`icon ${icon}`} lgap={8 + 24 * level} title={text} />
                    <BI.Text cls="text" text={text} ref={ref => (this.textRef = ref)} />
                </left>
                <right>
                    <BI.IconChangeButton
                        ref={ref => {
                            this.arrowRef = ref;
                        }}
                        iconCls="arrow"
                    />
                    ,
                </right>
            </BI.LeftRightVerticalAdaptLayout>
        );
    }

    public beforeMount() {
        this.textRef.element.css('display', this.model.collapse ? 'block' : 'none');
    }
}

interface MenuNodeProps {
    baseCls: string;
    height: number;
    value: string;
    text: string;
    icon: string;
    level: number;
    children: (MenuNode | MenuItem)[];
}

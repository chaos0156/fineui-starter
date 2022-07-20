import { NodeButton, IconChangeButton } from '@fui/core';
import { shortcut } from '@core/decorator';
import { MenuItem } from '../item/item';
import './node.less';

// 节点展开和折叠状态分别对应的类名
export const ARROW_CLASSES_MAP = {
    collapse: 'column-next-page-h-font',
    expand: 'column-pre-page-h-font',
};

/**
 * 菜单选项中的展开/折叠节点
 */
@shortcut()
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

    /**
     * 设置菜单节点的展开情况
     * @param opened 要设置的展开情况，ture表示展开，false表示折叠
     */
    public setOpened(opened: boolean) {
        Object.getPrototypeOf(MenuNode).prototype.setOpened.call(this, opened);
        const arrowCls = ARROW_CLASSES_MAP[opened ? 'expand' : 'collapse'];
        this.arrowRef.setIcon(arrowCls);
    }

    public render() {
        const { text, icon, level } = this.options;

        return (
            <BI.LeftRightVerticalAdaptLayout
                lhgap={8}
                rhgap={16}
                items={{
                    left: [<BI.IconLabel cls={`icon ${icon}`} lgap={8 + 24 * level} />, <BI.Text cls="text" text={text} />],
                    right: [
                        <BI.IconChangeButton
                            ref={ref => {
                                this.arrowRef = ref;
                            }}
                            iconCls="arrow"
                        />,
                    ],
                }}
            />
        );
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

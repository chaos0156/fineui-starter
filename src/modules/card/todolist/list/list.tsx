import { Widget, Label, VirtualGroup } from '@fui/core';
import { shortcut } from '@core/decorator';
import { TodolistItemInfo } from '../todolist';
import './list.less';

/**
 * ToDoList中的List组件，表示待办事项清单
 */
@shortcut()
export class TodolistList extends BI.Widget {
    static xtype = 'app.todolist_list';

    static EVENT = {
        FINISH: 'EVENT_FINISH',
        REMOVE: 'EVENT_REMOVE',
    };

    public props: TodolistListProps = {
        baseCls: 'app-todolist-list',
        title: '',
        itemInfos: [],
    };

    private countRef: Label;
    private itemsRef: VirtualGroup;

    /**
     * 根据itemInfos获取待办事项列表的items
     * @returns 用于传给itemsRef的items
     */
    private getItems(): Widget[] {
        const { itemInfos } = this.options;

        return BI.map(itemInfos, (_index, itemInfo) => {
            const { text, done } = itemInfo;

            return (
                <BI.VerticalAdaptLayout cls="item" height={36}>
                    <BI.MultiSelectItem
                        cls="check"
                        width={36}
                        selected={done}
                        disabled={done}
                        handler={() => {
                            this.fireEvent(TodolistList.EVENT.FINISH, itemInfo);
                        }}
                    />
                    <BI.Label cls="text" text={text} />
                    <BI.IconButton
                        cls="close close-ha-font"
                        width={36}
                        handler={() => {
                            this.fireEvent(TodolistList.EVENT.REMOVE, itemInfo);
                        }}
                    />
                </BI.VerticalAdaptLayout>
            );
        });
    }

    /**
     * 设置itemInfos，并更新itemsRef
     * @param itemInfos 待办事项信息集合
     */
    public setItemInfos(itemInfos: TodolistItemInfo[]) {
        this.options.itemInfos = itemInfos;
        const items = this.getItems();
        this.itemsRef.populate(items);
        this.countRef.setText(`${items.length}`);
    }

    public render() {
        const { title } = this.options;
        const items = this.getItems();
        const count = `${items.length}`;

        return (
            <BI.VerticalLayout horizontalAlign="center">
                <BI.LeftRightVerticalAdaptLayout
                    cls="header"
                    width={720}
                    height={48}
                    lhgap={24}
                    rhgap={24}
                    items={{
                        left: [<BI.Text cls="title" height={36} text={title} />],
                        right: [
                            <BI.Label
                                ref={ref => {
                                    this.countRef = ref;
                                }}
                                cls="count"
                                width={24}
                                height={24}
                                text={count}
                            />,
                        ],
                    }}
                />
                <BI.VirtualGroup
                    ref={ref => {
                        this.itemsRef = ref;
                    }}
                    cls="items"
                    layouts={[<BI.VerticalLayout width={720} hgap={24} />]}
                    items={items}
                />
            </BI.VerticalLayout>
        );
    }
}

interface TodolistListProps {
    baseCls: string;
    title: string;
    itemInfos: TodolistItemInfo[];
}

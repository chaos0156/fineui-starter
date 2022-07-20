import { shortcut } from '@core/decorator';
import { TodolistHeader } from './header/header';
import { TodolistList } from './list/list';
import './todolist.less';

// 待办事项信息
export interface TodolistItemInfo {
    id: string;
    text: string;
    done: boolean;
}

/**
 * ToDoList组件，由header和list两个组件组成
 */
@shortcut()
export class Todolist extends BI.Widget {
    static xtype = 'app.todolist';

    public props: TodolistProps = {
        baseCls: 'app-todolist',
        storageKey: 'app.todolist',
    };

    private undoneListRef: TodolistList;
    private doneListRef: TodolistList;

    /**
     * 从window.localStorage中获取待办事项信息集合，并将其转换为对象格式
     * @returns 对象格式的待办事项信息集合
     */
    private getItemInfos(): TodolistItemInfo[] {
        const { storageKey } = this.options;
        const itemsInfosStr = localStorage.getItem(storageKey) || JSON.stringify([]);

        return JSON.parse(itemsInfosStr);
    }

    /**
     * 更新localStorage中存储的待办事项信息集合，并更新undoneListRef和doneListRef
     * @param itemInfos 待办事项信息集合
     */
    private setItemInfos(itemInfos: TodolistItemInfo[]) {
        const { storageKey } = this.options;
        const itemsInfosStr = JSON.stringify(itemInfos);
        localStorage.setItem(storageKey, itemsInfosStr);
        this.updateListRefs();
    }

    /**
     * 添加待办事项
     * @param itemInfo 要添加的待办事项信息
     */
    private addItemInfo(itemInfo: TodolistItemInfo) {
        const itemInfos = this.getItemInfos();
        itemInfos.push(itemInfo);
        this.setItemInfos(itemInfos);
    }

    /**
     * 完成待办事项
     * @param itemInfo 要完成的待办事项信息
     */
    private finishItemInfo(itemInfo: TodolistItemInfo) {
        const itemInfos = this.getItemInfos();
        (BI.find(itemInfos, { id: itemInfo.id }) as TodolistItemInfo).done = true;
        this.setItemInfos(itemInfos);
    }

    /**
     * 删除待办事项
     * @param itemInfo 要删除的待办事项信息
     */
    private removeItemInfo(itemInfo: TodolistItemInfo) {
        const itemInfos = this.getItemInfos();
        BI.remove(itemInfos, (_index: number, curItemInfo: TodolistItemInfo) => curItemInfo.id === itemInfo.id);
        this.setItemInfos(itemInfos);
    }

    /**
     * 获取未完成的待办事项信息集合
     * @returns 未完成的待办事项信息集合
     */
    private getUndoneItemInfos(): TodolistItemInfo[] {
        const itemInfos = this.getItemInfos();

        return BI.filter(itemInfos, (_index, itemInfo) => itemInfo.done === false);
    }

    /**
     * 获取已完成的待办事项信息集合
     * @returns 已完成的待办事项信息集合
     */
    private getDoneItemInfos(): TodolistItemInfo[] {
        const itemInfos = this.getItemInfos();

        return BI.filter(itemInfos, (_index, itemInfo) => itemInfo.done === true);
    }

    /**
     * 更新undoneListRef和doneListRef
     */
    private updateListRefs() {
        const undoneItemInfos = this.getUndoneItemInfos();
        const doneItemInfos = this.getDoneItemInfos();
        this.undoneListRef.setItemInfos(undoneItemInfos);
        this.doneListRef.setItemInfos(doneItemInfos);
    }

    public render() {
        const undoneItemInfos = this.getUndoneItemInfos();
        const doneItemInfos = this.getDoneItemInfos();

        return (
            <BI.VerticalLayout>
                <TodolistHeader
                    listeners={[
                        {
                            eventName: TodolistHeader.EVENT.ADD,
                            action: (text: string) => {
                                this.addItemInfo({
                                    id: BI.UUID(),
                                    text,
                                    done: false,
                                });
                            },
                        },
                    ]}
                />
                <TodolistList
                    ref={ref => {
                        this.undoneListRef = ref;
                    }}
                    title="待办"
                    itemInfos={undoneItemInfos}
                    listeners={[
                        {
                            eventName: TodolistList.EVENT.FINISH,
                            action: itemInfo => {
                                this.finishItemInfo(itemInfo);
                            },
                        },
                        {
                            eventName: TodolistList.EVENT.REMOVE,
                            action: itemInfo => {
                                this.removeItemInfo(itemInfo);
                            },
                        },
                    ]}
                />
                <TodolistList
                    ref={ref => {
                        this.doneListRef = ref;
                    }}
                    title="已办"
                    itemInfos={doneItemInfos}
                    listeners={[
                        {
                            eventName: TodolistList.EVENT.REMOVE,
                            action: itemInfo => {
                                this.removeItemInfo(itemInfo);
                            },
                        },
                    ]}
                />
            </BI.VerticalLayout>
        );
    }
}

interface TodolistProps {
    baseCls: string;
    storageKey: string;
}

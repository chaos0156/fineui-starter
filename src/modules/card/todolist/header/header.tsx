import { TextEditor, Button } from '@fui/core';
import { shortcut } from '@core/decorator';
import './header.less';

/**
 * ToDoList中的Header组件，包括标题，以及用于添加待办事项的编辑框和按钮
 */
@shortcut()
export class TodolistHeader extends BI.Widget {
    static xtype = 'app.todolist_header';

    static EVENT = {
        ADD: 'EVENT_ADD',
    };

    public props = {
        baseCls: 'app-todolist-header',
    };

    private editorRef: TextEditor;
    private buttonRef: Button;

    public render() {
        return (
            <BI.CenterAdaptLayout>
                <BI.LeftRightVerticalAdaptLayout
                    width={720}
                    height={48}
                    lhgap={24}
                    rhgap={24}
                    items={{
                        left: [<BI.Label cls="title" text="Todolist 应用" />],
                        right: [
                            <BI.TextEditor
                                ref={ref => {
                                    this.editorRef = ref;
                                }}
                                cls="editor"
                                width={256}
                                height={32}
                                allowBlank
                                watermark="请填写待办事项"
                                listeners={[
                                    {
                                        eventName: BI.Editor.EVENT_CHANGE,
                                        action: () => {
                                            const editorValue = this.editorRef.getValue();
                                            const buttonEnabled = editorValue.length > 0;
                                            this.buttonRef.setEnable(buttonEnabled);
                                        },
                                    },
                                ]}
                            />,
                            <BI.Button
                                ref={ref => {
                                    this.buttonRef = ref;
                                }}
                                cls="button"
                                height={32}
                                text="添加"
                                iconCls="plus-font"
                                disabled
                                handler={() => {
                                    const editorValue = this.editorRef.getValue();
                                    this.fireEvent(TodolistHeader.EVENT.ADD, editorValue);
                                    this.editorRef.setValue('');
                                    this.buttonRef.setEnable(false);
                                }}
                            />,
                        ],
                    }}
                />
            </BI.CenterAdaptLayout>
        );
    }
}

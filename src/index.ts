import Layout from '@app/layout/layout';
import './index.less';

// 创建一个组件实例 BI.createWidget
BI.createWidget({
    type: Layout.xtype,
    // 指定渲染到哪个组件上
    element: '#wrapper',
});

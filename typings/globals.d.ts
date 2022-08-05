// eslint-disable-next-line spaced-comment
/// <reference path="../node_modules/@fui/core/dist/lib/shims-tsx.d.ts" />
// 引入依赖的声明文件，三斜线指令

//.d.ts是ts用来声明变量、模块、type、interface等等的。
// 在.d.ts文件中声明的变量，在其他ts文件中，可以不用import导入，就可以直接用。
// 需要预编译，在tsconfig.json的include数组中添加这个文件


interface Obj {
    [key: string]: any;
}

// 声明全局变量BI
// &为交叉类型
declare const BI: Obj & import('@fui/core').BI;
declare const Fix: Obj;
declare const $: ((el: any) => any) & Obj;

// 扩展全局变量
interface String {
    replaceAll(regx: string | RegExp, callback: (str: string) => void): string;
}

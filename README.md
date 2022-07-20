# README

## 准备工作

### 克隆仓库

```shell
git clone https://code.fineres.com/scm/fui/fineui-starter.git
```

### 安装依赖

```shell
# 账户：public
# 密码：fr123456
# 邮箱：任意
npm adduser --registry https://npm.fineres.com
npm install
```

### 安装扩展

以 VSCode 为例，为保证代码规范和格式统一，请安装`ESLint`、`stylelint`、`Prettier`、`EditorConfig`扩展，以使相关配置文件生效。

## 开发工作

### 项目基础配置

布局配置请见`src/modules/app/layout/layout.constant.ts`。

样式配置请见`src/less/`，譬如`src/less/lib/constant`中的`@color-app-primary`表示项目的主色。

### 项目调试、打包与测试

```shell
# 调试
npm run start

# 打包
npm run build

# 测试
npm run test
```

### 项目规范和格式检查

```shell
# 代码规范
npm run eslint
npm run eslint:fix

# 样式规范
npm run stylelint
npm run stylelint:fix

# 代码格式
npm run prettier
```

## 效果预览

![页面截图](./screenshots/demo.jpeg)

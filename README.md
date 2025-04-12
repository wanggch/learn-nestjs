# NestJS 学习示例项目

- [01.hello-world](01.hello-world)

## 项目创建工具

本仓库包含一个便捷的项目创建脚本 `create-project.js`，可以通过复制现有项目来快速创建新的 NestJS 项目。

### 使用方法

```bash
# 基本用法
./create-project.js <源项目> <新项目名>

# 例如，基于 01.hello-world 创建一个名为 02.my-project 的新项目
./create-project.js 01.hello-world 02.my-project

# 自定义排除的文件/目录（除默认排除项外）
./create-project.js <源项目> <新项目名> --exclude=文件1,文件2,目录1
```

### 功能特点

- 自动复制源项目中的所有文件和目录到新项目
- 默认排除以下文件和目录：
  - `node_modules`
  - `dist`
  - `.git`
  - `pnpm-lock.yaml`/`yarn.lock`/`package-lock.json`
  - `coverage`
  - `.DS_Store`
  - `.vscode`
  - `.idea`
- 自动更新新项目 `package.json` 中的项目名称
- 支持通过 `--exclude` 参数自定义额外排除的文件和目录

### 创建项目后建议的操作

完成项目创建后，你可能需要执行以下步骤：

```bash
# 进入新项目目录
cd <新项目名>

# 安装依赖
pnpm install

# 启动开发服务器
pnpm run start:dev
```
# 🚀 GitHub Pages 部署指南

## 前置条件

1. **GitHub账户**：确保您已有一个GitHub账户
2. **Git已安装**：确保您的系统上已安装Git
3. **Node.js**：确保已安装Node.js（版本18或更高）

## 快速部署步骤

### 1️⃣ 创建GitHub仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的"+"按钮，选择"New repository"
3. 填写仓库名称（例如：`GerogeP` 或 `tutor-portal`）
4. 选择"Public"或"Private"
5. 点击"Create repository"
6. **重要**：复制仓库的HTTPS或SSH URL（格式如：`https://github.com/您的用户名/仓库名.git`）

### 2️⃣ 本地Git配置

```bash
# 初始化Git仓库（如果尚未初始化）
cd /home/panglili/products/GerogeP
git init

# 添加远程仓库（将YOUR_USERNAME和REPO_NAME替换为实际值）
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 或者使用SSH（如果已配置SSH密钥）
git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git
```

### 3️⃣ 提交代码到GitHub

```bash
# 添加所有文件
git add .

# 提交更改（替换为您的提交信息）
git commit -m "Initial commit: Add Tutor Portal with Next.js"

# 推送到GitHub
git push -u origin main
```

### 4️⃣ 配置GitHub Pages

1. 访问您的GitHub仓库页面
2. 点击"Settings"选项卡
3. 在左侧菜单中，找到"Pages"选项
4. 在"Source"部分，选择：
   - **Branch**: `main` (或 `master`)
   - **Folder**: `/(root)`
5. 点击"Save"
6. **重要**：记下您的GitHub Pages URL，格式为：
   `https://YOUR_USERNAME.github.io/REPO_NAME/`

### 5️⃣ 配置basePath（如需要）

如果您使用仓库名称作为路径（如 `https://username.github.io/repo-name/`），请更新 `next.config.ts`：

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '/REPO_NAME', // 替换为您的仓库名称
};
```

### 6️⃣ 部署到GitHub Pages

运行以下命令：

```bash
# 构建并部署
npm run deploy
```

这个命令会自动：
1. 运行 `npm run build` 构建项目
2. 使用 `gh-pages` 将 `out` 目录的内容推送到 `gh-pages` 分支

### 7️⃣ 验证部署

1. 访问您的GitHub Pages URL
2. 等待1-2分钟让GitHub处理部署
3. 刷新页面查看您的应用

## 📋 部署命令速查

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建项目
npm run build

# 预览构建结果
npm run start

# 部署到GitHub Pages
npm run deploy
```

## ⚠️ 常见问题解决

### 问题1：页面样式丢失

**原因**：可能没有正确配置 `basePath`

**解决方案**：
1. 如果您的网站在根域下（如 `https://yourname.github.io/`），保持 `basePath: ''`
2. 如果在子路径下（如 `https://yourname.github.io/repo/`），设置 `basePath: '/repo'`

### 问题2：图片无法加载

**原因**：Next.js静态导出时默认不优化图片

**解决方案**：确保 `next.config.ts` 中已设置：
```typescript
images: {
  unoptimized: true,
},
```

### 问题3：部署后页面404

**原因**：GitHub Pages可能还未完成部署

**解决方案**：
1. 等待2-3分钟
2. 刷新页面
3. 检查Actions选项卡中的部署状态

### 问题4：动态路由页面不工作

**原因**：静态导出不支持服务器端动态路由

**解决方案**：
1. 使用静态生成
2. 确保所有动态路由都有 `generateStaticParams`
3. 或者使用客户端导航替代

## 🎨 自定义域名（可选）

如果您有自定义域名：

1. 在仓库根目录创建 `CNAME` 文件
2. 在文件中写入您的域名（不含 `http://`）
3. 推送到GitHub
4. 在域名提供商处配置CNAME记录指向 `YOUR_USERNAME.github.io`

## 📝 下次更新部署

当您更新代码后，重新部署非常简单：

```bash
# 1. 提交更改
git add .
git commit -m "Update: 您的更改描述"
git push

# 2. 部署到GitHub Pages
npm run deploy
```

## ✅ 部署检查清单

- [ ] GitHub仓库已创建
- [ ] 代码已推送到GitHub
- [ ] GitHub Pages已启用
- [ ] `next.config.ts`配置正确
- [ ] 部署脚本运行成功
- [ ] 网站可访问

## 🔗 相关链接

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Next.js 静态导出文档](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [gh-pages npm包](https://www.npmjs.com/package/gh-pages)

## 📞 获取帮助

如果在部署过程中遇到问题，请：
1. 检查GitHub仓库的Actions标签页
2. 查看错误日志
3. 确保所有配置正确
4. 验证网络连接

祝您部署成功！🎉

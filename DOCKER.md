# Docker 部署说明

本项目已配置完整的 GitHub Actions CI/CD 流水线，可以自动构建前端应用并打包成 Docker 镜像。

## 文件说明

### GitHub Actions 工作流
- `.github/workflows/build-and-deploy.yml`: 主要的 CI/CD 流水线

### Docker 相关文件
- `Dockerfile`: 多阶段构建的 Docker 镜像定义
- `nginx.conf`: Nginx 服务器配置
- `docker-compose.yml`: 本地开发和测试用的 Docker Compose 配置
- `.dockerignore`: Docker 构建时忽略的文件

## 自动化流程

当代码推送到 `main` 或 `develop` 分支时，GitHub Actions 会自动：

1. **检出代码**
2. **设置 Node.js 和 pnpm 环境**
3. **安装依赖**
4. **运行类型检查** (`pnpm typecheck`)
5. **运行代码检查** (`pnpm lint`)
6. **运行测试** (`pnpm vitest`)
7. **构建前端应用** (`pnpm build`)
8. **构建 Docker 镜像**
9. **推送到 GitHub Container Registry**

## Docker 镜像

构建的 Docker 镜像会推送到：
```
ghcr.io/yoshino-s/ds-frontend
```

支持的标签：
- `latest`: 主分支的最新版本
- `main`: 主分支版本
- `develop`: 开发分支版本
- `<branch>-<sha>`: 特定提交版本

## 本地开发

### 使用 Docker Compose 运行

```bash
# 构建并启动
docker-compose up --build

# 后台运行
docker-compose up -d --build

# 停止
docker-compose down
```

访问地址：http://localhost:8080

### 手动构建 Docker 镜像

```bash
# 构建镜像
docker build -t ds-frontend .

# 运行容器
docker run -p 8080:80 ds-frontend
```

## 生产环境部署

### 从 GitHub Container Registry 拉取

```bash
# 拉取最新镜像
docker pull ghcr.io/yoshino-s/ds-frontend:latest

# 运行容器
docker run -d \
  --name ds-frontend \
  -p 80:80 \
  --restart unless-stopped \
  ghcr.io/yoshino-s/ds-frontend:latest
```

### 使用 Docker Compose

```yaml
version: '3.8'
services:
  frontend:
    image: ghcr.io/yoshino-s/ds-frontend:latest
    ports:
      - "80:80"
    restart: unless-stopped
    environment:
      - TZ=Asia/Shanghai
```

## Nginx 配置特性

- **SPA 路由支持**: 所有路径都会回退到 `index.html`
- **静态资源缓存**: JS、CSS、图片等文件缓存 1 年
- **Gzip 压缩**: 自动压缩文本类型文件
- **安全头**: 添加必要的安全响应头
- **健康检查**: 提供 `/health` 端点用于健康检查
- **API 代理**: 如需要可配置 API 反向代理

## 环境变量

可以通过环境变量自定义配置：

- `TZ`: 时区设置，默认 `Asia/Shanghai`

## 监控和日志

### 健康检查

容器提供健康检查端点：
```bash
curl http://localhost:8080/health
```

### 查看日志

```bash
# Docker Compose
docker-compose logs -f frontend

# Docker
docker logs -f ds-frontend
```

## 故障排除

### 常见问题

1. **构建失败**: 检查 Node.js 版本和依赖是否正确
2. **容器启动失败**: 检查端口是否被占用
3. **静态文件 404**: 确认构建输出目录正确

### 调试命令

```bash
# 进入容器
docker exec -it ds-frontend sh

# 检查 Nginx 配置
docker exec ds-frontend nginx -t

# 重新加载 Nginx 配置
docker exec ds-frontend nginx -s reload
```
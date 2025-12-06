# B站视频同步指南

## 🎯 功能说明

自动从您的B站账号同步最新视频到个人网站，支持：
- ✅ 自动分类（中考政策、升学规划、志愿填报、指标到校、亲子旅行等）
- ✅ 置顶管理（保持指定视频始终在前3位）
- ✅ 黑名单过滤（排除不想显示的视频）

## 📝 使用步骤

### 1. 从B站提取视频数据

1. 打开您的B站个人主页：https://space.bilibili.com/284427802/video
2. 按 `F12` 打开浏览器开发者工具
3. 切换到 `Console`（控制台）标签
4. 如果提示，输入 `allow pasting` 并回车
5. 复制并粘贴 `scripts/浏览器提取代码.js` 中的代码
6. 按 `Enter` 运行
7. 数据会自动复制到剪贴板
8. 在编辑器中新建 `scripts/bilibili-videos.json` 文件
9. `Ctrl+V` 粘贴数据并保存

### 2. 运行同步脚本

```bash
cd h:\antigravity\my_web_1.0
node scripts/sync-bilibili-videos.js
```

### 3. 查看效果

刷新浏览器 http://localhost:3000/content 即可看到最新视频！

## ⚙️ 配置选项

### 修改置顶视频

编辑 `scripts/sync-bilibili-videos.js` 第12行：

```javascript
const PINNED_VIDEOS = [
    'BV1mm4y1u7oq',  // 改成你想置顶的BV号
    'BV1SvZmYqE7B',  // 最多3个
    'BV1yV4y1r74a'
];
```

### 排除特定视频

编辑第18行：

```javascript
const EXCLUDED_BVIDS = [
    'BV1234567890',  // 添加不想显示的视频BV号
];
```

### 调整分类规则

编辑 `categorizeVideo` 函数（第23-44行），根据标题关键词自动分类。

## 🔄 完整工作流

```
B站发布新视频
    ↓
在B站主页运行浏览器代码
    ↓
保存为 bilibili-videos.json
    ↓
运行 node scripts/sync-bilibili-videos.js
    ↓
static-data.ts 自动更新
    ↓
刷新网站看到最新内容！
```

## 💡 提示

- 建议每发布3-5个新视频后同步一次
- 置顶视频会始终保持在前3位
- 分类规则可根据需要自定义
- JSON文件可以手动编辑（如修改标题、分类）

## ❓ 常见问题

**Q: 为什么不直接调用B站API？**  
A: B站API有请求频率限制，浏览器提取更稳定可靠。

**Q: 可以自动化这个过程吗？**  
A: 可以！后续可以配置GitHub Actions定时同步，或使用无头浏览器自动化。

**Q: 视频分类不准确怎么办？**  
A: 修改 `categorizeVideo` 函数中的关键词规则，或手动编辑JSON文件。

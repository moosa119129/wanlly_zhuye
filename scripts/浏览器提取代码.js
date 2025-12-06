/**
 * 在B站个人主页控制台运行此代码
 * 步骤：
 * 1. 打开 https://space.bilibili.com/284427802/video
 * 2. 按 F12 打开控制台
 * 3. 输入 allow pasting（如果提示的话）
 * 4. 复制下面的代码，粘贴到控制台运行
 * 5. 数据会自动复制到剪贴板
 * 6. 将剪贴板内容保存为 scripts/bilibili-videos.json
 * 7. 运行 node scripts/sync-bilibili-videos.js
 */

(function () {
    var videos = [];
    var cards = document.querySelectorAll('.bili-video-card');

    console.log('找到 ' + cards.length + ' 个视频');

    cards.forEach(function (card, i) {
        var link = card.querySelector('a.bili-cover-card');
        var img = card.querySelector('img');
        var title = img ? img.alt : '';
        var cover = img ? img.src : '';

        if (link && title) {
            var bvid = link.href.match(/BV[a-zA-Z0-9]+/);
            videos.push({
                id: i + 1,
                title: title,
                bvid: bvid ? bvid[0] : '',
                cover: cover.replace('@672w_378h_1c.webp', '').replace('//i', 'https://i')
            });
        }
    });

    var json = JSON.stringify(videos, null, 2);
    copy(json);
    console.log('✅ 成功提取 ' + videos.length + ' 条视频');
    console.log('📋 数据已复制到剪贴板，请粘贴保存为 bilibili-videos.json');
})();

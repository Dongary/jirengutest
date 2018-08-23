window.Model = function(options) {
    let resourceName = options.resourceName
    return {
        // 获取数据
        init: function() {
            var APP_ID = '4TtgQrSfO0ROg0LlCGk6BD14-gzGzoHsz'
            var APP_KEY = '1YO3hjk1w4x6ry0l2vsmaRwc'
            AV.init({ appId: APP_ID, appKey: APP_KEY })
        },
        fetch: function() {
            var query = new AV.Query(resourceName);
            query.limit(5); // 控制返回的数据数目
            query.descending('createdAt')
            return query.find() // Promise 对象
        },
        // 创建数据
        save: function(object) {
            var Message = AV.Object.extend(resourceName);
            var message = new Message();
            return message.save(object)
        }
    }
}
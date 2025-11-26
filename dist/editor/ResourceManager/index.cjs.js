'use strict';

var tslib_es6 = require('../../node_modules/tslib/tslib.es6/index.cjs.js');
var EventHandler = require('../../event/EventHandler/index.cjs.js');

/**
 * 资源状态
 */
var ResourceState;
(function (ResourceState) {
    /** 未加载 */
    ResourceState[ResourceState["UNLOADED"] = 0] = "UNLOADED";
    /** 加载中 */
    ResourceState[ResourceState["LOADING"] = 1] = "LOADING";
    /** 已加载 */
    ResourceState[ResourceState["LOADED"] = 2] = "LOADED";
    /** 加载失败 */
    ResourceState[ResourceState["ERROR"] = 3] = "ERROR";
})(ResourceState || (ResourceState = {}));
/**
 * 资源管理器
 * 轻量级的资源管理中间层，负责资源的生命周期管理和基础事件通知
 */
class ResourceManager {
    constructor() {
        this.resources = new Map();
        this.loaders = new Map();
        // 事件处理器
        this.onResourceLoaded = new EventHandler.EventHandler();
        this.onResourceError = new EventHandler.EventHandler();
    }
    /**
     * 注册资源加载器
     * @param loader 资源加载器
     */
    registerLoader(loader) {
        this.loaders.set(loader.getResourceType(), loader);
    }
    /**
     * 加载资源
     * @param url 资源URL
     * @param type 资源类型
     */
    load(url, type) {
        return tslib_es6.__awaiter(this, void 0, void 0, function* () {
            // 检查资源是否已存在
            let resourceInfo = this.resources.get(url);
            if (resourceInfo) {
                if (resourceInfo.state === ResourceState.LOADED) {
                    resourceInfo.refCount++;
                    return resourceInfo.data;
                }
                else if (resourceInfo.state === ResourceState.ERROR) {
                    throw resourceInfo.error;
                }
            }
            // 获取对应的加载器
            const loader = this.loaders.get(type);
            if (!loader) {
                throw new Error(`未找到类型为 ${type} 的资源加载器`);
            }
            // 创建资源信息
            resourceInfo = {
                url,
                type,
                state: ResourceState.LOADING,
                refCount: 1
            };
            this.resources.set(url, resourceInfo);
            try {
                // 加载资源
                const resource = yield loader.load(url);
                resourceInfo.state = ResourceState.LOADED;
                resourceInfo.data = resource;
                // 触发加载完成事件
                this.onResourceLoaded.emmit({ url, resource });
                return resource;
            }
            catch (error) {
                resourceInfo.state = ResourceState.ERROR;
                resourceInfo.error = error;
                // 触发错误事件
                this.onResourceError.emmit({ url, error });
                throw error;
            }
        });
    }
    /**
     * 释放资源
     * @param url 资源URL
     */
    release(url) {
        const resourceInfo = this.resources.get(url);
        if (!resourceInfo || resourceInfo.state !== ResourceState.LOADED) {
            return;
        }
        resourceInfo.refCount--;
        if (resourceInfo.refCount <= 0) {
            // 调用加载器的释放方法
            const loader = this.loaders.get(resourceInfo.type);
            if (loader && loader.release) {
                loader.release(resourceInfo.data);
            }
            this.resources.delete(url);
        }
    }
    /**
     * 预加载资源
     * @param urls 资源URL数组
     * @param type 资源类型
     */
    preload(urls, type) {
        return tslib_es6.__awaiter(this, void 0, void 0, function* () {
            yield Promise.all(urls.map(url => this.load(url, type)));
        });
    }
    /**
     * 获取已加载的资源
     * @param url 资源URL
     */
    get(url) {
        const resourceInfo = this.resources.get(url);
        return resourceInfo && resourceInfo.state === ResourceState.LOADED ? resourceInfo.data : undefined;
    }
    /**
     * 检查资源是否已加载
     * @param url 资源URL
     */
    isLoaded(url) {
        const resourceInfo = this.resources.get(url);
        return (resourceInfo === null || resourceInfo === void 0 ? void 0 : resourceInfo.state) === ResourceState.LOADED;
    }
    /**
     * 清理所有资源
     */
    clear() {
        for (const [url] of this.resources) {
            this.release(url);
        }
    }
}

exports.ResourceManager = ResourceManager;

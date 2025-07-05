import { EventHandler } from '../event/EventHandler';

/**
 * 资源加载器接口
 */
export interface IResourceLoader {
    /**
     * 加载资源
     * @param url 资源路径
     * @returns 加载的资源
     */
    load(url: string): Promise<any>;
    
    /**
     * 释放资源
     * @param resource 要释放的资源
     */
    release?(resource: any): void;
    
    /**
     * 获取该加载器支持的资源类型
     */
    getResourceType(): string;
}

/**
 * 资源状态
 */
enum ResourceState {
    /** 未加载 */
    UNLOADED,
    /** 加载中 */
    LOADING,
    /** 已加载 */
    LOADED,
    /** 加载失败 */
    ERROR
}

/**
 * 资源信息
 */
interface ResourceInfo {
    /** 资源URL */
    url: string;
    /** 资源类型 */
    type: string;
    /** 资源状态 */
    state: ResourceState;
    /** 资源数据 */
    data?: any;
    /** 引用计数 */
    refCount: number;
    /** 错误信息 */
    error?: any;
}

/**
 * 资源管理器
 * 轻量级的资源管理中间层，负责资源的生命周期管理和基础事件通知
 */
export class ResourceManager {
    private resources: Map<string, ResourceInfo> = new Map();
    private loaders: Map<string, IResourceLoader> = new Map();
    
    // 事件处理器
    public readonly onResourceLoaded = new EventHandler<{url: string, resource: any}>();
    public readonly onResourceError = new EventHandler<{url: string, error: any}>();
    
    /**
     * 注册资源加载器
     * @param loader 资源加载器
     */
    public registerLoader(loader: IResourceLoader): void {
        this.loaders.set(loader.getResourceType(), loader);
    }
    
    /**
     * 加载资源
     * @param url 资源URL
     * @param type 资源类型
     */
    public async load(url: string, type: string): Promise<any> {
        // 检查资源是否已存在
        let resourceInfo = this.resources.get(url);
        if (resourceInfo) {
            if (resourceInfo.state === ResourceState.LOADED) {
                resourceInfo.refCount++;
                return resourceInfo.data;
            } else if (resourceInfo.state === ResourceState.ERROR) {
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
            const resource = await loader.load(url);
            resourceInfo.state = ResourceState.LOADED;
            resourceInfo.data = resource;
            
            // 触发加载完成事件
            this.onResourceLoaded.emmit({url, resource});
            
            return resource;
        } catch (error) {
            resourceInfo.state = ResourceState.ERROR;
            resourceInfo.error = error;
            
            // 触发错误事件
            this.onResourceError.emmit({url, error});
            
            throw error;
        }
    }
    
    /**
     * 释放资源
     * @param url 资源URL
     */
    public release(url: string): void {
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
    public async preload(urls: string[], type: string): Promise<void> {
        await Promise.all(urls.map(url => this.load(url, type)));
    }
    
    /**
     * 获取已加载的资源
     * @param url 资源URL
     */
    public get(url: string): any | undefined {
        const resourceInfo = this.resources.get(url);
        return resourceInfo && resourceInfo.state === ResourceState.LOADED ? resourceInfo.data : undefined;
    }
    
    /**
     * 检查资源是否已加载
     * @param url 资源URL
     */
    public isLoaded(url: string): boolean {
        const resourceInfo = this.resources.get(url);
        return resourceInfo?.state === ResourceState.LOADED;
    }
    
    /**
     * 清理所有资源
     */
    public clear(): void {
        for (const [url] of this.resources) {
            this.release(url);
        }
    }
}
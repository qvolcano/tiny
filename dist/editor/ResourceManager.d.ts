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
 * 资源管理器
 * 轻量级的资源管理中间层，负责资源的生命周期管理和基础事件通知
 */
export declare class ResourceManager {
    private resources;
    private loaders;
    readonly onResourceLoaded: EventHandler<{
        url: string;
        resource: any;
    }>;
    readonly onResourceError: EventHandler<{
        url: string;
        error: any;
    }>;
    /**
     * 注册资源加载器
     * @param loader 资源加载器
     */
    registerLoader(loader: IResourceLoader): void;
    /**
     * 加载资源
     * @param url 资源URL
     * @param type 资源类型
     */
    load(url: string, type: string): Promise<any>;
    /**
     * 释放资源
     * @param url 资源URL
     */
    release(url: string): void;
    /**
     * 预加载资源
     * @param urls 资源URL数组
     * @param type 资源类型
     */
    preload(urls: string[], type: string): Promise<void>;
    /**
     * 获取已加载的资源
     * @param url 资源URL
     */
    get(url: string): any | undefined;
    /**
     * 检查资源是否已加载
     * @param url 资源URL
     */
    isLoaded(url: string): boolean;
    /**
     * 清理所有资源
     */
    clear(): void;
}

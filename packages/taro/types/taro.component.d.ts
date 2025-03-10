/// <reference types="react" />
/// <reference types="vue" />

import Taro, { ComponentOptions, Config, RouterInfo } from './index'

declare module './index' {
  // Components
  interface ComponentLifecycle<P, S, SS = any> extends NewLifecycle<P, S, SS> {
    componentWillMount?(): void
    componentDidMount?(): void
    componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void
    shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean
    componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void
    componentWillUnmount?(): void
    componentDidShow?(): void
    componentDidHide?(): void
    componentDidCatchError?(err: string): void
    componentDidNotFound?(obj: PageNotFoundObject): void
    onPullDownRefresh?(): void
    onReachBottom?(): void
    onPageScroll?(obj: PageScrollObject): void
    onShareAppMessage?(obj: ShareAppMessageObject): ShareAppMessageReturn
    onTabItemTap?(obj: TabItemTapObject): void
    onResize?(obj: any): void
  }

  interface ComponentOptions {
    addGlobalClass?: boolean
    styleIsolation?: 'isolated' | 'apply-shared' | 'shared'
  }

  interface ComponentClass<P = {}, S = any> extends StaticLifecycle<P, S> {
    new (...args: any[]): Component<P, {}>
    propTypes?: any // TODO: Use prop-types type definition.
    defaultProps?: Partial<P>
    displayName?: string
  }

  // ref: packages/taro-runtime/src/current.ts
  interface RouterInfo<TParams extends Partial<Record<string, string>> = Partial<Record<string, string>>> {
    /**
     * 路由参数。
     */
    params: TParams

    /**
     * 页面路径。
     */
    path: string

    onReady: string
    onHide: string
    onShow: string

    shareTicket: string | undefined
    scene: number | undefined
  }

  interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> {
    $scope?: any
  }

  type PropsWithChildren<P> = P & { children?: React.ReactNode }

  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): React.ReactElement | null
    propTypes?: any // TODO: Use prop-types type definition.
    defaultProps?: Partial<P>
    config?: Config
    options?: ComponentOptions
    externalClasses?: string[]
  }

  type FC<P = {}> = FunctionComponent<P>

  interface StatelessFunctionComponent {
    (): JSX.Element
  }

  type SFC = StatelessFunctionComponent

  interface Show {
    componentDidShow?(options?: unknown): void
    componentDidHide?(options?: unknown): void
    onShow?(options?: unknown): void
    onHide?(options?: unknown): void
  }

  interface AppInstance extends Show {
    mount(component: React.ComponentClass | Vue.ComponentOptions<Vue>, id: string, cb: () => void): void
    unmount(id: string, cb: () => void): void
  }

  type Target = Record<string, unknown> & { dataset: Record<string, unknown>; id: string }

  interface MpEvent {
    type: string
    detail: Record<string, unknown>
    target: Target
    currentTarget: Target
  }

  interface PageLifeCycle extends Show {
    onPullDownRefresh?(): void
    onReachBottom?(): void
    onPageScroll?(obj: { scrollTop: number }): void
    onShareAppMessage?(obj: { from: string; target?: any; webViewUrl: string }): void
    onResize?(options: unknown): void
    onTabItemTap?(obj: { index: string; pagePath: string; text: string }): void
    onTitleClick?(): void
    onOptionMenuClick?(): void
    onPopMenuClick?(): void
    onPullIntercept?(): void
    eh?(event: MpEvent): void
    onLoad(options: Record<string, unknown>): void
    onUnload(): void
  }

  interface PageInstance extends PageLifeCycle {
    /**
     * 页面配置。
     */
    config?: PageConfig
    data?: Record<string, unknown>
    path?: string
    options?: Record<string, unknown>
    /**
     * 执行关键帧动画，详见[动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)
     *
     * 最低基础库版本：[`2.9.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
     **/
    animate?(selector: string, keyFrames: KeyFrame[], duration: number, callback: () => void): void
    /**
     * 执行关键帧动画，详见[动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)
     *
     * 最低基础库版本：[`2.9.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
     **/
    animate?(
      selector: string,
      keyFrames: ScrollTimelineKeyframe[],
      duration: number,
      scrollTimeline: ScrollTimelineOption
    ): void
    /**
     * 清除关键帧动画，详见[动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)
     *
     * 最低基础库版本：[`2.9.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
     **/
    clearAnimation?(selector: string, callback: () => void): void
    /**
     * 清除关键帧动画，详见[动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)
     *
     * 最低基础库版本：[`2.9.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
     **/
    clearAnimation?(selector: string, options: ClearAnimationOptions, callback: () => void): void
  }

  interface TaroStatic {
    memo<P = {}>(
      FunctionComponent: FunctionComponent<P>,
      compare?: (oldProps: P, newProps: P) => Boolean
    ): FunctionComponent<P>
  }
}

# 状态图与决策表的接入约定

在场景详情内先渲染分镜、条件按钮、状态图和决策表，再内联 guide.css 与 state-map.js。图的节点、连线和表行用同一份业务分支数据生成。分支 key 在同一个场景内唯一，可用文本或数字字符串。

- 用初始收起的 `details[data-state-map]` 承载图。图内的 `.map-tools` 放 `button[data-zoom="out"]`、`output`、`button[data-zoom="in"]` 和 `button[data-zoom="fit"]`。为按钮提供「缩小状态图」「放大状态图」「适应窗口」等可访问名称。
- 画布使用 `.map-view[tabindex="0"]`，内部放可整体平移缩放的 `.board__diagram`。将连线 SVG 与所有节点放进 diagram；它的宽高需包住所有节点。可参考 CSS 的并列结果布局，按真实拓扑调整位置和尺寸。条件分叉、连续步骤、回路各用其对应关系绘制。
- 各分支的图节点用 `button.board__route[data-branch]`；分镜前的条件按钮也用 `data-branch`。每条需随选中态变色的 SVG path 使用 `data-wire`，置于 `.board__edges` 中。决策表每行的条件用 `button[data-route]`。三种属性值指向同一个 key。
- 调用控制器时传入单个场景的 DOM 容器和业务回调。回调根据 key 更新三帧画面、用户的操作结果和待确认项。控制器负责选中状态、图表定位及画布操作。用户选择后保持焦点；通过表行定位时焦点转到图节点。切换场景时先释放旧控制器，再替换旧 DOM 并挂载新场景。

~~~js
const map = mountGuideBranches(sceneElement, key => renderPageOutcome(key));
map.select(initialBranchKey);
// 替换这组场景元素前
map.disconnect();
~~~

离线验证时使用真实鼠标从节点起拖并释放，再用短按切换分支。放大后把目标移出画面，然后在表里点该条件，验证图中目标回到可见区域并获得焦点。随后用键盘选择另一个节点，展开决策表，验证同一分支的行已选中。

---
'$title': AMP 发布时间表
$order: 10
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: '- 发布渠道'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/contributing/release-schedule.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

- [发布渠道 ](#release-channels)
  - [每夜 ](#nightly)
  - [每周 ](#weekly)
    - [Beta 和实验渠道 ](#experimental-and-beta-channels)
  - [长期稳定 (lts) ](#long-term-stable-lts)
- [确定您的变更是否包含在某一版本中 ](#determining-if-your-change-is-in-a-release)
- [发布节奏 ](#release-cadence)
  - [详细时间表 ](#detailed-schedule)
  - [发布冻结 ](#release-freezes)

新版 AMP 会于每周二推送到所有 AMP 页面。**在 AMP 中的变更合并到 amphtml 仓库的主分支后，变更通常需要 1-2 周时间才能对所有用户生效**。

## 发布渠道 <a name="release-channels"></a>

AMP 运行时和扩展项通过各种不同的*发布渠道*提供。每种渠道均服务于开发者和 AMP HTML 项目本身的需求。请参阅[发布节奏](#release-cadence)部分，查看 [`ampproject/amphtml`](https://github.com/ampproject/amphtml) 仓库内的代码如何以及何时应用到发布构建的详细明细表。

要确定某个拉取请求是否已包含在以下任何发布渠道中，请查找 GitHub 标签 _PR Use: In Canary_、_PR Use: In Production_ 或 _PR Use: In LTS_（有关更多详细信息，请参阅[确定您的变更是否包含在某一版本中](#determining-if-your-change-is-in-a-release)部分）。

### 每夜 <a name="nightly"></a>

顾名思义，**每夜**发布渠道在每个工作日夜间更新。这是一个自动化过程，并且不能保证任何给定的每夜版都不存在错误或其他问题。每个午夜之后的凌晨（太平洋时间），将选择当日的最后一个“绿色”提交作为发布截止点。绿色构建表示该构建已通过所有自动测试。

每夜版提供了快速检测和解决问题的机制，避免问题遗留到任务量更加繁重的*每周*发布渠道中。它还可以降低受新引入问题影响的用户的数量。

用户可以选择加入**每夜**渠道，以测试在过去几天合并的拉取请求。有关详细信息，请参阅 [DEVELOPING.md] 中的[选择加入](https://github.com/ampproject/amphtml/blob/main/contributing/DEVELOPING.md#opting-in-to-pre-release-channels)部分。

### 每周 <a name="weekly"></a>

*每周*发布渠道被认为是主要的“长期有效”发布渠道。每周都会将上周的 **Beta** 版升级到**稳定**发布渠道，并将上周最后一个**每夜**版升级到**实验**和 **Beta** 发布渠道（请参阅[详细时间表](#detailed-schedule)部分）。

使用两套构建配置创建发布构建：_Canary_ 配置和*正式*配置。**实验**和 **Beta** 发布渠道源于同一提交。但是，**实验**渠道使用 _Canary_ 配置，而 **Beta** 渠道则使用*正式*配置。_Canary_ 配置支持在*正式*配置中可能会被关闭的实验性组件和功能。通过[实验页面](https://cdn.ampproject.org/experiments.html)，可以选择加入**实验**或 **Beta** 渠道。

**稳定**发布渠道使用*正式*配置构建，将提供给大多数 AMP 页面。由于 **Beta** 发布渠道同样基于*正式*配置构建，因此它代表了将于下周升级到**稳定**渠道的确切构建（有可能通过挑选来解决最后时刻出现的问题；请参阅[贡献代码](https://github.com/ampproject/amphtml/blob/main/contributing/contributing-code.md#Cherry-picks)）。

#### Beta 和实验渠道 <a name="beta-and-experimental-channels"></a>

_Beta_ 和*实验*渠道是下一个稳定版 AMP 的预发布候选。每周二（[发布冻结](#release-freezes)周除外）都会将上周的**每夜**版升级到开发者选择加入的 **Beta** 和**实验**渠道。我们将用一天的时间确认这些渠道中没有引入功能退化或性能下降问题，并于周三将此版本提供给一小部分页面。然后，在下周二将同一版本升级到**稳定**渠道。

可以选择加入这些渠道。有关详细信息，请参阅 [DEVELOPING.md] 中的[选择加入](https://github.com/ampproject/amphtml/blob/main/contributing/DEVELOPING.md#opting-in-to-pre-release-channels)部分。

选择加入 *Beta 渠道*的目的是：

- 测试并试用即将发布的 AMP 运行时版本
- 在质量保证 (QA) 中使用以确保您的网站与下一个版本的 AMP 兼容

选择加入*实验渠道*的目的是：

- 测试并试用尚未提供给所有用户的新功能
- 在质量保证 (QA) 中使用以确保您的网站与仍在开发的 AMP 功能兼容

\*实验渠道**\*可能稳定性稍差**，并且可能包含尚未提供给所有用户的新功能。

### 长期稳定 (lts) <a name="long-term-stable-lts"></a>

**lts** 发布渠道以一个月为间隔提供之前的**稳定**构建。在每个月的第二个周一，当前的**稳定**版将升级到 **lts**。并不建议所有 AMP 发布商都加入此渠道。此渠道旨在提供给不希望频繁对其网站执行 QA 的发布商，使其可以选择特定网页加入 **lts** 渠道（请参阅 <a href="https://github.com/ampproject/amphtml/blob/main/contributing/lts-release.md" data-md-type="link">**lts** 自述文件</a>）。

如果每个月的第二个周一为节假日，将在[发布冻结](#release-freezes)结束后执行升级。

重要提示：使用 **lts** 发布渠道的发布商不应使用新引入的功能。由于周期较长，**lts** 版本可能落后于 [`ampproject/amphtml`](https://github.com/ampproject/amphtml) 的 `HEAD` 长达七周时间。请参阅[确定您的变更是否包含在某一版本中](#determining-if-your-change-is-in-a-release)部分，验证变更能否在您选择的发布周期内实现。

## 确定您的变更是否包含在某一版本中 <a name="determining-if-your-change-is-in-a-release"></a>

[_Type: Release_ GitHub 问题](https://github.com/ampproject/amphtml/labels/Type%3A%20Release)用于跟踪当前和过往版本的状态；从最初着手编写，到通过**实验**/**Beta** 渠道执行测试，再到通过**稳定**和 **lts** 渠道实现最终发布。将在 [AMP Slack #release 频道](https://amphtml.slack.com/messages/C4NVAR0H3/)（[注册 Slack](https://bit.ly/amp-slack-signup)）中提供有关版本的公告。

您可以使用以下任一方式确定给定构建中的变更：

- 每个发布构建的 [_Type: Release_ GitHub 问题](https://github.com/ampproject/amphtml/labels/Type%3A%20Release)都会包含指向特定[版本页面](https://github.com/ampproject/amphtml/releases)的链接，版本页面上列出了该版本中包含的变更。
- 在拉取请求中的变更应用到*每周*或 **lts** 构建后，会对拉取请求添加 [_PR Use: In Beta / Experimental_](https://github.com/ampproject/amphtml/issues?q=label%3A%22PR+use%3A+In+Beta+%2F+Experimental%22)、[_PR Use: In Stable_](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20Production%22) 和 [_PR Use: In LTS_](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20LTS%22) 标签。创建构建和添加标签之间可能会存在延迟。

## 发布节奏 <a name="release-cadence"></a>

我们有意对发布节奏保持谨慎态度。

在确定我们应以怎样的频率向所有用户推送新版 AMP 时，我们需要权衡许多因素，其中包括：

- 保证使用 AMP 构建的数百万个网站/数十亿个页面的稳定性
- 避免推送新版本时可能发生的缓存无效化
- 用户对于快速获取新功能的渴望

在考虑所有这些因素后，我们将推送周期定为 1-2 周。到目前为止，我们认为这是一个合理的折衷方案，但我们将继续评估所有这些因素，并可能在将来进行调整。

### 详细时间表 <a name="detailed-schedule"></a>

尽管复杂问题可能会导致延迟，但我们将尽力遵循这一时间表。您可以通过 [_Type: Release_ GitHub 问题](https://github.com/ampproject/amphtml/labels/Type%3A%20Release)以及 [AMP Slack #release 频道](https://amphtml.slack.com/messages/C4NVAR0H3/)（[注册 Slack](https://bit.ly/amp-slack-signup)）跟踪有关任何版本的最新状态。

- 周二（[太平洋时间上午 11 点](https://www.google.com/search?q=11am+pacific+in+current+time+zone)）：将基于<a>通过我们所有测试的最新主构建</a>创建新的**实验**和 <strong>Beta</strong> 发布构建，并分别推送给选择加入 [AMP 实验渠道](#amp-experimental-and-beta-channels)或 [AMP Beta 渠道](#amp-experimental-and-beta-channels)的 AMP 用户。
- 周三：我们会检查*实验渠道*和 *Beta 渠道*用户的错误报告，如果一切正常，我们会将 **Beta** 版推送给 1% 的 AMP 页面
- 周四至次周一：我们会继续监测*实验渠道*和 *Beta 渠道*用户以及 1% 使用**实验**/**Beta** 构建的页面的错误率和错误报告
- 次周二：**Beta** 构建完全升级到**稳定**渠道（即所有 AMP 页面都将使用此构建）

### 发布冻结 <a name="release-freezes"></a>

在某些情况下，我们会跳过 AMP 版本发布环节而直接推送到正式环境，这称为发布冻结。

如果公布将于第 N 周执行为期一周的发布冻结：

- 上一周的发布构建仍为**实验**/**Beta** 版，延长一周，即通常情况下，第 N-1 周的版本不会于第 N 周升级到**稳定**渠道。将改为于第 N+1 周升级到**稳定**渠道。
- 冻结周（第 N 周）*不会*有新的发布构建。
- 将于第 N+1 周恢复为常规时间表，即**实验**/**Beta** 版将于第 N+1 周加入，并于第 N+2 周升级到**稳定**渠道。
- 如果于第 N-1 周升级的**稳定**版原定于第 N 周升级到 **lts**，将改为于第 N+1 周的周一升级到 **lts**。
- 仍会生成和升级**每夜**版，因为这是一个自动化过程。

执行发布冻结的原因包括：

- 没有足够的用户来推动 AMP 版本升级到**稳定**渠道并对其进行监测。目前，大多数执行 AMP 发布的用户均位于美国，因此发布冻结主要发生于美国独立日（7 月 4 日）、感恩节（ 11 月的第四个周四）、圣诞节（12 月 25 日）和新年前一天/新年当天（12 月 31 日/ 1 月 1 日）所在的周。
- 出现紧急情况，例如[技术指导委员会 (TSC)](https://github.com/ampproject/meta-tsc) 或执行发布的人员确定存在安全或隐私问题。
- 由 TSC 确定存在被认定会对代码库的稳定性造成重大影响的其他情况。

在除紧急情况外的其他所有情况下，都将至少提前一个月提供发布冻结的公告。

请注意，除非另行公告，否则发布冻结并不意味着代码冻结。在发布冻结期间，用户仍可编写、审查及合并代码。

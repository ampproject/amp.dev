---
"$title": AMP 发布时间表
order: '10'
formats:
- websites
- email
- stories
- ads
teaser:
  text: "- 发布渠道"
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/contributing/release-schedule.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

- [Release Channels](#release-channels)
    - [Nightly](#nightly)
    - [Weekly](#weekly)
        - [Experimental and Beta channels](#experimental-and-beta-channels)
    - [Long-Term Stable (lts)](#long-term-stable-lts)
- [Determining if your change is in a release](#determining-if-your-change-is-in-a-release)
- [Release Cadence](#release-cadence)
    - [Detailed schedule](#detailed-schedule)
    - [Release Freezes](#release-freezes)

A new release of AMP is pushed to all AMP pages every week on Tuesday. **Once a change in AMP is merged into the master branch of the amphtml repository, it will typically take 1-2 weeks for the change to be live for all users.**

## 发布渠道 <a name="release-channels"></a>

AMP 运行时和扩展项通过各种不同的*发布渠道*提供。每种渠道均服务于开发者和 AMP HTML 项目本身的需求。请参阅[发布节奏](#release-cadence)部分，查看 [`ampproject/amphtml`](https://github.com/ampproject/amphtml) 仓库内的代码如何以及何时应用到发布构建的详细明细表。

要确定某个拉取请求是否已包含在以下任何发布渠道中，请查找 GitHub 标签 *PR Use: In Canary*、*PR Use: In Production* 或 *PR Use: In LTS*（有关更多详细信息，请参阅[确定您的变更是否包含在某一版本中](#Determining-if-your-change-is-in-a-release)部分）。

### 每夜 <a name="nightly"></a>

顾名思义，**每夜**发布渠道在每个工作日夜间更新。这是一个自动化过程，并且不能保证任何给定的每夜版都不存在错误或其他问题。每个午夜之后的凌晨（太平洋时间），将选择当日的最后一个“绿色”提交作为发布截止点。绿色构建表示该构建已通过所有自动测试。

每夜版提供了快速检测和解决问题的机制，避免问题遗留到任务量更加繁重的*每周*发布渠道中。它还可以降低受新引入问题影响的用户的数量。

用户可以选择加入**每夜**渠道，以测试在过去几天合并的拉取请求。有关详细信息，请参阅 [DEVELOPING.md] 中的[选择加入](https://github.com/ampproject/amphtml/blob/master/contributing/DEVELOPING.md#opting-in-to-pre-release-channels)部分。

### 每周 <a name="weekly"></a>

*每周*发布渠道被认为是主要的“长期有效”发布渠道。每周都会将上周的 **Beta** 版升级到**稳定**发布渠道，并将上周最后一个**每夜**版升级到**实验**和 **Beta** 发布渠道（请参阅[详细时间表](#detailed-schedule)部分）。

使用两套构建配置创建发布构建：*Canary* 配置和*正式*配置。**实验**和 **Beta** 发布渠道源于同一提交。但是，**实验**渠道使用 *Canary* 配置，而 **Beta** 渠道则使用*正式*配置。*Canary* 配置支持在*正式*配置中可能会被关闭的实验性组件和功能。通过[实验页面](https://cdn.ampproject.org/experiments.html)，可以选择加入**实验**或 **Beta** 渠道。

**稳定**发布渠道使用*正式*配置构建，将提供给大多数 AMP 页面。由于 **Beta** 发布渠道同样基于*正式*配置构建，因此它代表了将于下周升级到**稳定**渠道的确切构建（有可能通过挑选来解决最后时刻出现的问题；请参阅[贡献代码](https://github.com/ampproject/amphtml/blob/master/contributing/contributing-code.md#Cherry-picks)）。

#### Beta 和实验渠道 <a name="beta-and-experimental-channels"></a>

*Beta* 和*实验*渠道是下一个稳定版 AMP 的预发布候选。每周二（[发布冻结](#release-freezes)周除外）都会将上周的**每夜**版升级到开发者选择加入的 **Beta** 和**实验**渠道。我们将用一天的时间确认这些渠道中没有引入功能退化或性能下降问题，并于周三将此版本提供给一小部分页面。然后，在下周二将同一版本升级到**稳定**渠道。

可以选择加入这些渠道。有关详细信息，请参阅 [DEVELOPING.md] 中的[选择加入](https://github.com/ampproject/amphtml/blob/master/contributing/DEVELOPING.md#opting-in-to-pre-release-channels)部分。

选择加入 *Beta 渠道*的目的是：

- 测试并试用即将发布的 AMP 运行时版本
- 在质量保证 (QA) 中使用以确保您的网站与下一个版本的 AMP 兼容

选择加入*实验渠道*的目的是：

- 测试并试用尚未提供给所有用户的新功能
- 在质量保证 (QA) 中使用以确保您的网站与仍在开发的 AMP 功能兼容

*实验渠道***可能稳定性稍差**，并且可能包含尚未提供给所有用户的新功能。

### 长期稳定 (lts) <a name="long-term-stable-lts"></a>

**lts** 发布渠道以一个月为间隔提供之前的**稳定**构建。在每个月的第二个周一，当前的**稳定**版将升级到 **lts**。并不建议所有 AMP 发布商都加入此渠道。此渠道旨在提供给不希望频繁对其网站执行 QA 的发布商，使其可以选择特定网页加入 **lts** 渠道（请参阅 <a href="https://github.com/ampproject/amphtml/blob/master/contributing/lts-release.md" data-md-type="link">**lts** 自述文件</a>）。

If the second Monday of the month falls on a holiday, the promotion will be performed after the end of the [release freeze](#release-freezes).

重要提示：使用 **lts** 发布渠道的发布商不应使用新引入的功能。由于周期较长，**lts** 版本可能落后于 [`ampproject/amphtml`](https://github.com/ampproject/amphtml) 的 `HEAD` 长达七周时间。请参阅[确定您的变更是否包含在某一版本中](#Determining-if-your-change-is-in-a-release)部分，验证变更能否在您选择的发布周期内实现。

## 确定您的变更是否包含在某一版本中 <a name="determining-if-your-change-is-in-a-release"></a>

[*Type: Release* GitHub issues](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) are used to track the status of current and past releases; from the initial cut, to testing via **experimental**/**beta** channels, to eventual release via the **stable** and **lts** channels. Announcements about releases are made on the [AMP Slack #release channel](https://amphtml.slack.com/messages/C4NVAR0H3/) ([sign up for Slack](https://bit.ly/amp-slack-signup)).

您可以使用以下任一方式确定给定构建中的变更：

- 每个发布构建的 [*Type: Release* GitHub 问题](https://github.com/ampproject/amphtml/labels/Type%3A%20Release)都会包含指向特定[版本页面](https://github.com/ampproject/amphtml/releases)的链接，版本页面上列出了该版本中包含的变更。
- 在拉取请求中的变更应用到*每周*或 **lts** 构建后，会对拉取请求添加 [*PR Use: In Beta / Experimental*](https://github.com/ampproject/amphtml/issues?q=label%3A%22PR+use%3A+In+Beta+%2F+Experimental%22)、[*PR Use: In Stable*](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20Production%22) 和 [*PR Use: In LTS*](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20LTS%22) 标签。创建构建和添加标签之间可能会存在延迟。

## 发布节奏 <a name="release-cadence"></a>

我们有意对发布节奏保持谨慎态度。

在确定我们应以怎样的频率向所有用户推送新版 AMP 时，我们需要权衡许多因素，其中包括：

- 保证使用 AMP 构建的数百万个网站/数十亿个页面的稳定性
- cache-busting that might happen when we push a new version
- 用户对于快速获取新功能的渴望

在考虑所有这些因素后，我们将推送周期定为 1-2 周。到目前为止，我们认为这是一个合理的折衷方案，但我们将继续评估所有这些因素，并可能在将来进行调整。

### 详细时间表 <a name="detailed-schedule"></a>

尽管复杂问题可能会导致延迟，但我们将尽力遵循这一时间表。您可以通过 [*Type: Release* GitHub 问题](https://github.com/ampproject/amphtml/labels/Type%3A%20Release)以及 [AMP Slack #release 频道](https://amphtml.slack.com/messages/C4NVAR0H3/)（[注册 Slack](https://bit.ly/amp-slack-signup)）跟踪有关任何版本的最新状态。

- Tuesday @ [11am Pacific](https://www.google.com/search?q=11am+pacific+in+current+time+zone): new **experimental** and **beta** release builds are created from the [latest master build that passes all of our tests](https://travis-ci.com/ampproject/amphtml/branches) and are pushed to users who opted into the [AMP Experimental Channel](#amp-experimental-and-beta-channels) or [AMP Beta Channel](#amp-experimental-and-beta-channels), respectively.
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

- Times when there are not enough people available to push the AMP release to **stable** and monitor it. Currently, most of the people performing AMP releases are based in the United States, so this will usually be the weeks of the major US holidays of Independence Day (July 4), Thanksgiving (fourth Thursday in November), Christmas (25 December), and New Year's Eve/Day (December 31/January 1).
- 出现紧急情况，例如[技术指导委员会 (TSC)](https://github.com/ampproject/meta-tsc) 或执行发布的人员确定存在安全或隐私问题。
- Other situations when the stability of the codebase is deemed to be particularly important as determined by the TSC.

In all cases, except emergencies, the release freezes will be announced at least one month in advance.

请注意，除非另行公告，否则发布冻结并不意味着代码冻结。在发布冻结期间，用户仍可编写、审查及合并代码。

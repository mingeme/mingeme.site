---
title: 我是如何自建图床服务的
pubDate: '2025-01-05T22:00:43+08:00'
public: true
tags:
  - svelte
  - bulma
  - windsurf
  - cursor
  - AI
  - cloudflare
  - namecheap
---

## 背景

一直在用的图床服务是[sm.ms](https://sm.ms/)，因为自己想学习下前端知识，加上 AI 大模型发展火热，所以模仿[sm.ms](https://sm.ms/)搭建了一个图床服务[imgood](https://github.com/mingeme/imgood)，这里记录一下我搭建图床服务的过程。

## 准备工作

### AI 编辑器

开发过程中使用了 `Windsurf` 和 `Cursor` 两个 AI 编辑器，这两个工具的安装和使用方法请看[Windsurf 官方文档](https://codeium.com/windsurf)和[Cursor 官方文档](https://www.cursor.com/)。新账号注册有免费试用额度，额度用完了需要付费订阅，Pro版本 Cursor 一个月20刀，Windsurf 一个月15刀，这里直接选择淘宝和闲鱼购买账号，价格不到一半。

除此之外，我也尝试了 Vscode 的开源插件 [Continue](https://www.continue.dev/) 搭配国内的 [Deepseek](https://www.deepseek.com/)模型使用，不知道是否我配置问题， TAB 的自动代码补全没有生效，而且相较于 Cursor 的 Compose 模式和 Windsurf 的 Cascade 模式，这两个强大的功能可以检索整个代码仓，根据上下文生成的代码更加精准，最终是用 Cursor 搭建了项目，开发了一部分，然后用 Windsurf 完成了剩下的部分，关于编辑器之间的差异不做过多介绍。体验下来 claude-3.5-sonnet 模型对代码的理解能力非常强，达到了预期的效果。

### 前端框架

使用 [SvelteKit](https://svelte.dev/docs/kit/introduction) 作为服务端渲染的前端框架，[Bulma](https://bulma.io/) 作为基础的样式库。

前端近些年陆续出现优秀的框架，选择很多，像是 React 系列的 Nextjs 和 Remix 都是不错的选择，为什么不提及 Vue？个人喜好问题，更喜欢 React 系列，符合自己的开发品味，倾向使用设计简洁的东西，不想增加认知负荷，另外想尝试新鲜的东西，所以选择了 Svelte。

样式框架现在主流是 Tailwindcss，从推出以来一直在关注，也用它写了一些小玩具项目，非常好用，体现在主流的框架和平台都支持了它，在 AI 的加持下，生成带有原子化CSS的代码更加方便快捷，这对于我一个不怎么会设计前端样式的人来说简直是大大提高了效率（至少界面能看的过去了。。。）。既然这次也是学习的玩具项目，不妨再试试新的东西，Bulma（布尔玛，怀疑作者是龙珠的粉丝） 就决定是你了。

### 对象存储 OSS

[缤纷云](https://www.bitiful.com/)主要是存图片。为什么选择它，因为在 v2ex 看到的推广（本文不是缤纷云的广子，缤纷云看到请打钱！！！），价格相较于国内大厂阿里云等算是便宜一些，主要是可以白嫖免费额度，另外 cloudflare 的 R2 服务也有免费额度，有闲情的时候再去开个新坑研究一下。

### 数据存储 Supabase

[Supabase](https://supabase.com/)用来存图片的关联关系，并且自带用户认证服务，省去重复的注册登录逻辑。不得不说这类云服务是真方便，在此之前我可能会搞个服务器自己搭数据库balabala，现在真恨不得一切上云，小玩具免费额度完全够用，单兵作战，需要运维的场景 All-In-Cloud。

## 开发过程

历经几次迭代，在 Cursor 和 Windsurf 之间反复横跳，两个编辑器都尝试了一遍，功能上重叠度很高，平分秋色，个人更偏向于使用 Windsurf。开发细节就不过多描述，主要是使用 AI 编辑器的心得。

1、Cursor 除了设置全局的提示词外，还支持设置项目级别的提示词`.cursorrules`文件放在根目录下，GitHub 上有个项目 [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules)提供了常用的提示词模板，这里使用的是[svelte-5-vs-svelte-4-cursorrules-prompt-file](https://github.com/PatrickJS/awesome-cursorrules/blob/main/rules/svelte-5-vs-svelte-4-cursorrules-prompt-file/.cursorrules)。
![uyVBNNS.webp](https://imgood.s3.bitiful.net/2025/1/5/uyVBNNS.webp)

2、做好功能拆分，尽可能把功能拆分的小一些，尽量保证一个文件代码行数不超过500行，尽可能模块化有利于 AI 理解。大模型上下文长度有限，过长会导致代码检索不完全。AI 对话长了之后会出现降智，这时候就需要不断纠错和调整，建议每个功能新开一个对话，避免上下文污染。

3、代码提交信息通过 AI 生成。可以看到生成的提交信息符合规范，描述的也准确，至少比我自己写的蹩脚英文描述要好了些，从开发质量和效率来说是一个极大的进步。

![uyYf5B7.webp](https://imgood.s3.bitiful.net/2025/1/5/uyYf5B7.webp)

## 项目部署

### 网站托管

选择 Vercel 托管。

1、从 GitHub 导入项目
![uyYkF5s.webp](https://imgood.s3.bitiful.net/2025/1/5/uyYkF5s.webp)

2、配置构建参数

这里使用默认配置，vercel 这点做的比较好自动识别了项目框架，基本都配置好了。
![uyZlS8F.webp](https://imgood.s3.bitiful.net/2025/1/5/uyZlS8F.webp)

选则构建的 Node 版本，创建项目的时候默认给我选了 22.x，Svelte 不支持导致构建失败，所以我改成了 20.x。
![uyZmUYV.webp](https://imgood.s3.bitiful.net/2025/1/5/uyZmUYV.webp)

3、配置环境变量

配置 OSS 的地址和访问密钥，Supabase 的地址和访问密钥。

![uyZlga6.webp](https://imgood.s3.bitiful.net/2025/1/5/uyZlga6.webp)

### 域名

选择在 Namecheap 购买域名[imgood.ink](https://imgood.ink)，看名字就知道，主打一个价格便宜，3刀一年拿下。本想绑定 Stripe 支付，但是绑定银联信用卡时一直不通过，最后只好注册了 Paypal 账户进行支付。

### 域名解析

使用 Cloudflare 进行解析域名，增强网站的防护能力。

1、添加域，我这里已经添加过了，使用的免费计划。
![uz0HPZf.webp](https://imgood.s3.bitiful.net/2025/1/5/uz0HPZf.webp)

2、添加域名解析记录，指向 Vercel 的域名服务器，这样可以绕过 GFW，在国内访问。

添加 CNAME 记录，指向根路径`@`，内容为`cname-china.vercel-dns.com`。

添加 CNAME 记录，指向`www`，内容为`cname-china.vercel-dns.com`，如果不需要`www`二级域名，可以不添加。

![uz0IgqB.webp](https://imgood.s3.bitiful.net/2025/1/5/uz0IgqB.webp)

3、Namecheap 配置域名服务器，使用上一步 Cloudflare 提供的名称服务器。

dylan.ns.cloudflare.com

marge.ns.cloudflare.com

![uz0Jwhf.webp](https://imgood.s3.bitiful.net/2025/1/5/uz0Jwhf.webp)

4、在 Vercel 上添加域名，虽然 Vercel 推荐第一个，但是我这里选择了第二个，重定向`www`到根域名。

![uz0KZCH.webp](https://imgood.s3.bitiful.net/2025/1/5/uz0KZCH.webp)

5、配置加密模式，使用 HTTPS，选择`完全`模式，如果出现重定向问题，可以尝试选择`完全（严格）`模式。

![uz0LVDW.webp](https://imgood.s3.bitiful.net/2025/1/5/uz0LVDW.webp)

至此，配置完后，可以访问[imgood.ink](https://imgood.ink)。
![uz0NPnX.webp](https://imgood.s3.bitiful.net/2025/1/5/uz0NPnX.webp)
附上效果图，哈哈这是我第一次看演唱会，2024年最后一场广州站，陶喆老 baby 风韵犹存。
![uz0NED7.webp](https://imgood.s3.bitiful.net/2025/1/5/uz0NED7.webp)

## 结语

这是我第一次完整的写一篇关于技术性的博客，记录下来，希望以后能够多多分享自己的技术经验，不止是技术，也包括生活，看到自己成长的过程，也是非常有意义的。

该文章的所有图片均来源于本篇介绍的图床服务，效果还不错哦。

## 注意事项

1、为避免在公网环境被滥用，只允许我自己的账号登录后才能上传图片，注册逻辑未实现。

2、项目左上角 LOGO 暂时贴的 Bulma，后续会改成自己的。

3、功能整体上模仿 sm.ms 设计，暂时作为一个简单的图床服务，没有突出的功能点。

4、功能上有一些不完善的地方，比如图片的大小和数量限制，存储空间限制等等，后续会进行完善。

## 相关链接

项目地址 [imgood](https://github.com/mingeme/imgood)

网站地址 [imgood.ink](https://imgood.ink)

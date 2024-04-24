---
layout: ../../layouts/MarkdownPostLayout.astro
title: Keycloak on Docker 安装完后无法访问https://＜domain＞/auth/admin
pubDate: 2021-04-08 10:53:53
---

首先按照[官方文档](https://www.keycloak.org/getting-started/getting-started-docker)通过 Docker 安装 Keyclak

```shell
docker run -p 8080:8080 -e KEYCLOAK_USER=admin KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:12.0.4
```

问题如图所示
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210408103916328.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9oZTAwaGFwcHk=,size_16,color_FFFFFF,t_70#pic_center)
提示 keycloak.js 无法通过http访问，通过 Keycloak 官方论坛查阅大量帖子得出解决方案。
在启动 Docker 容器时添加 `-e PROXY_ADDRESS_FORWARDING=true`参数。
完整命令如下：

```shell
docker run -p 8080:8080 -e PROXY_ADDRESS_FORWARDING=true -e KEYCLOAK_USER=admin KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:12.0.4
```

划重点：`PROXY_ADDRESS_FORWARDING=true`一定要加入到环境变量中。

引用
[Not able to deploy Keycloak into Kubernetes](https://keycloak.discourse.group/t/not-able-to-deploy-keycloak-into-kubernetes/5299/2)

---
title: Spring Boot 中 spring.jpa.open-in-view 使用踩坑
pubDate: '2020-08-26T12:25:16+08:00'
public: true
tags:
  - spring-boot
  - jpa
  - java
---

本篇记录我在使用Spring JPA中遇到的问题。

在使用Spring Boot JPA时，open-in-view 选项默认为true。启动时在日志中会出现警告。

> WARN 9560 --- [ restartedMain] aWebConfiguration$JpaWebMvcConfiguration : spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning

按照日志要求将 open-in-view=false。再次启动，如果在实体类中外键字段使用了懒加载模式，在视图层中调用数据时，则会出现 no session 异常。

解决方法：手动注册`OpenEntityManagerInViewFilter`过滤器，改变session的生命周期，当web请求关闭时才结束session。

```java
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    public FilterRegistrationBean<OpenEntityManagerInViewFilter> registerOpenEntityManagerInViewFilterBean() {
        FilterRegistrationBean<OpenEntityManagerInViewFilter> registrationBean = new FilterRegistrationBean<>();
        OpenEntityManagerInViewFilter filter = new OpenEntityManagerInViewFilter();
        registrationBean.setFilter(filter);
        registrationBean.setOrder(5);
        return registrationBean;
    }

}
```

注：

- 如果使用的是 `JPA` 则对应 `OpenEntityManagerInViewFilter`，`Hibernate` 对应 `OpenSessionInViewFilter`

疑问：

- `registrationBean.setOrder(5)`，order为什么是5
- `OpenSessionInViewInterceptor` & `OpenSessionInViewFilter`, `OpenEntityManagerInViewInterceptor` & `OpenEntityManagerInViewFilter` 这几个类的区别以及使用的场景

---
title: PAT 乙级 1090 C语言
pubDate: '2018-10-09T22:20:14+08:00'
public: true
tags:
  - pat
  - c
---

1090 危险品装箱 （25 分）
集装箱运输货物时，我们必须特别小心，不能把不相容的货物装在一只箱子里。比如氧化剂绝对不能跟易燃液体同箱，否则很容易造成爆炸。

本题给定一张不相容物品的清单，需要你检查每一张集装箱货品清单，判断它们是否能装在同一只箱子里。

输入格式：
输入第一行给出两个正整数：N (≤10^4## ) 是成对的不相容物品的对数；M (≤100) 是集装箱货品清单的单数。

随后数据分两大块给出。第一块有 N 行，每行给出一对不相容的物品。第二块有 M 行，每行给出一箱货物的清单，格式如下：

K G[1] G[2] ... G[K]
其中 K (≤1000) 是物品件数，G[i] 是物品的编号。简单起见，每件物品用一个 5 位数的编号代表。两个数字之间用空格分隔。

输出格式：
对每箱货物清单，判断是否可以安全运输。如果没有不相容物品，则在一行中输出 Yes，否则输出 No。

输入样例：
6 3
20001 20002
20003 20004
20005 20006
20003 20001
20005 20004
20004 20006
4 00001 20004 00002 20003
5 98823 20002 20003 20006 10010
3 12345 67890 23333
输出样例：
No
Yes
Yes

一开始做的时候没有AC然后百度发现大多数是c++描述的，c++对于写题目确实很方便，但我很无助，只会c语言，所以就打消了这个念头，决定自己用c来写，中间有个点琢磨了好久，好在最后终于通过了，所以我想分享一下我的想法，第一次在这个网站写文章，所以描述的可能不太清楚，请多多指教。

```c
#include <stdio.h>
#include <stdlib.h>

#define MAXSIZE 100001
#define false 0
#define true 1

//用结构体来模拟物品之间的映射关系
typedef struct Node List;
struct Node
{
    int a[1001];
    int cnt;
};
List num[MAXSIZE];

int main()
{
    int N, M;
    scanf("%d%d", &N, &M);
    int i = 0, j = 0;
    for (i = 0; i < N; ++i)
    {
        int goods1, goods2;
        scanf("%d%d", &goods1, &goods2);
        //存储数据，一一对应
        num[goods1].a[num[goods1].cnt++] = goods2;
        num[goods2].a[num[goods2].cnt++] = goods1;
    }
    for (i = 0; i < M; ++i)
    {
        int Uncomfortable[MAXSIZE] = {false};
        int HadShown[MAXSIZE] = {false};
        int K = 0;
        int flag = true;
        scanf("%d", &K);
        for (j = 0; j < K; ++j)
        {
            int number;
            scanf("%d", &number);
            //如果物品出现在了不相容列表里，就判定不相容,否则，就把这个物品所有的不容物品写进不相容列表，并且把这个物品记录
            if (Uncomfortable[number] == false)
            {
                int z;
                HadShown[number] = true;
                for (z = 0; z < num[number].cnt && flag; ++z)
                {
                    Uncomfortable[num[number].a[z]] = true;
                    //当不相容物品已经出现过的时候，就可以判断不相容
                    if (HadShown[num[number].a[z]])
                    {
                        flag = false;
                    }
                }
            }
            else
            {
                flag = false;
            }
        }
        if (flag)
            printf("Yes\n");
        else
            printf("No\n");
    }
    return 0;
}

```

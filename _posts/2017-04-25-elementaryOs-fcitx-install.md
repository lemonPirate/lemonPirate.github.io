---
layout: post
title: "如何在elementary os中安装fcitx输入法"
date: 2017-04-25
---

1. 避免冲突，先卸载掉ibus
```
sudo apt-get remove ibus   // 卸载ibus
sudo apt-get remove scim 
sudo apt-get autoremove   // 删除依赖包
sudo apt-get -f install   // 修正安装过程中出现的依赖性关系
```
2. 增加软件源
```
sudo add-apt-repository ppa:fcitx-team/nightly
```
这个命令可能会报错：
~~~~~
sudo: add-apt-repository:command not found
~~~~~
原来是因为add-apt-repository依赖于python-software-properties和software-properties-common，再执行以下命令即可：
~~~~~
sudo apt-get install python-software-properties
sudo apt-get software-properties-common
~~~~~
3. 安装fcitx及相关软件包
4. 重启操作系统，即可使用fcitx

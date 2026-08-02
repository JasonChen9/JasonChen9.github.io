---
layout: about
title: about
permalink: /
subtitle: Ph.D. Student in Data Science and Analytics · HKUST(GZ)

selected_papers: true
social: true

announcements:
  enabled: false

latest_posts:
  enabled: false
---

<div class="row align-items-start">
  <div class="col-md-8" markdown="1">

I am a Ph.D. student in **Data Science and Analytics** at The Hong Kong University of Science and Technology (Guangzhou), advised by [Prof. Xiaowen Chu](https://facultyprofiles.hkust-gz.edu.cn/faculty-personal-page/CHU-Xiaowen/xwchu). My research focuses on machine learning systems, particularly efficient and elastic systems for large language model training and inference. My broader interests include GPU computing, distributed systems, and communication–computation co-optimization.

Before joining HKUST(GZ), I received my master's degree in Software Engineering from Peking University and my bachelor's degree in Software Engineering from the University of Electronic Science and Technology of China.

  </div>
  <div class="col-md-4 mb-4">
    {% include figure.liquid loading="eager" path="assets/img/guangyu-xiang.jpg" class="img-fluid rounded z-depth-1" alt="Portrait of Guangyu Xiang" %}
    <div class="mt-2 font-monospace">
      <p class="mb-0" lang="zh-CN">向广宇</p>
      <p class="mb-0">Guangzhou, China</p>
    </div>
  </div>
</div>

## Research interests

- Machine Learning Systems
- Efficient and Elastic LLM Training and Inference
- GPU Computing and AI Compilers
- Distributed Systems
- Communication–Computation Co-optimization

<h2>
  <a href="{{ '/news/' | relative_url }}" style="color: inherit">news</a>
</h2>

<div class="news">
  <div class="table-responsive">
    <table class="table table-sm table-borderless">
      {% assign news = site.news | reverse %}
      {% for item in news limit: 3 %}
        <tr>
          <th scope="row" style="width: 20%">{{ item.date | date: "%b %Y" }}</th>
          <td>{{ item.content | remove: '<p>' | remove: '</p>' | emojify }}</td>
        </tr>
      {% endfor %}
    </table>
  </div>
</div>

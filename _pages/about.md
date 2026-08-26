---
layout: about
title: about
permalink: /
subtitle: Ph.D. Student in Data Science and Analytics · HKUST(GZ)
lang: en
og_locale: en_US
translation_key: about
translation_url: /zh/
description: Guangyu Xiang is a Ph.D. student working on machine learning systems, efficient LLM training and inference, and GPU computing.

selected_papers: true
selected_publications_label: Selected Publications
publications_url: /publications/
experience: true
experience_label: Experience
visitor_map: true
visitor_map_label: Visitors
social: true
contact_note: Email is the best way to reach me.

announcements:
  enabled: false

latest_posts:
  enabled: false
---

<div class="row align-items-start">
  <div class="col-md-8" markdown="1">

I am a second-year Ph.D. student in **Data Science and Analytics** at The Hong Kong University of Science and Technology (Guangzhou), advised by [Prof. Xiaowen Chu](https://facultyprofiles.hkust-gz.edu.cn/faculty-personal-page/CHU-Xiaowen/xwchu). My research focuses on machine learning systems, particularly efficient and elastic systems for large language model training and inference. My broader interests include GPU computing, distributed systems, and communication–computation co-optimization.

Before joining HKUST(GZ), I received my master's degree in Software Engineering from Peking University and my bachelor's degree in Software Engineering from the University of Electronic Science and Technology of China.

  </div>
  <div class="col-md-4 mb-4">
    {% include figure.liquid loading="eager" path="assets/img/guangyu-xiang-outdoor.jpg" class="img-fluid rounded z-depth-1 profile-showcase-photo" alt="Guangyu Xiang in a mountain landscape" %}
    <div class="mt-2 font-monospace">
      <p class="mb-0" lang="zh-CN">向广宇</p>
      <p class="mb-0 small" style="overflow-wrap: anywhere">
        <a href="mailto:gxiang190@connect.hkust-gz.edu.cn">gxiang190@connect.hkust-gz.edu.cn</a>
      </p>
    </div>
  </div>
</div>

## Education

{% include education.liquid lang="en" %}

## Research Interests

- [Diffusion Models and Diffusion Transformers (DiTs)](https://jasonchen9.github.io/dit-paper-landscape/)
- Communication–Computation Co-optimization
- Efficient and Elastic LLM Training and Inference
- GPU Computing and AI Compilers
- Distributed Systems

<h2>
  <a href="{{ '/news/' | relative_url }}" style="color: inherit">News</a>
</h2>

{% include news-list.liquid lang="en" limit=3 %}

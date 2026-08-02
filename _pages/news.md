---
layout: page
title: news
permalink: /news/
---

<div class="news">
  <div class="table-responsive">
    <table class="table table-sm table-borderless">
      {% assign news = site.news | reverse %}
      {% for item in news %}
        <tr>
          <th scope="row" style="width: 20%">{{ item.date | date: "%b %Y" }}</th>
          <td>{{ item.content | remove: '<p>' | remove: '</p>' | emojify }}</td>
        </tr>
      {% endfor %}
    </table>
  </div>
</div>

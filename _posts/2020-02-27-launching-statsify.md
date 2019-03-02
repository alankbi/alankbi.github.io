---
layout: blog_layout
title: My experience launching Statsify, my first-ever product
image: /assets/images/blog-images/2019/launching_statsify.png
permalink: /blog/2019-03-XX/my-experience-launching-statsify/
date: March XX, 2019
links: https://www.statsify.us|Statsify Home^^^https://www.producthunt.com/posts/statsify|Statsify on Product Hunt
---

On February 18, I launched my first-ever product Statsify on Product Hunt. I was lucky enough to have Statsify featured within a few minutes of posting, which gave it a decent spike of traffic. This blog post talks about my experience throughout both the development process and launch. 

Before we get into the details, here are some basic numbers for those of you curious: 

* Upvotes on Product Hunt: 143
* Unique visitors within first week: 3186
* Chrome extension users within first week: 49

# Idea Formation

As a second semester senior in high school, I knew that I was at risk of contracting [senioritis](https://en.wikipedia.org/wiki/Senioritis). To try and combat this, I decided to keep myself busy with random coding projects. 

I always wanted to learn web scraping, so I decided that I would play around with the Python [requests](http://docs.python-requests.org/en/master/) and [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/) libraries and see if I could come up with an idea for a full-fledged project along the way. 

Eventually, I came up with Statsify: a tool that visualizes interesting stats and info about a web page/website. I always wanted a tool that would help me better understand the sites I visit on a daily basis; this was the perfect chance for me to develop my own solution to the problem! 

Looking back, if there's anything I learned from this process, it's that, like everyone says, the idea _really_ isn't that important. If you're a student just trying to improve your programming skills, any decent idea would do. Take Statsify: the idea is very simple, yet I still learned many a lot while making it (more on that below). And despite not solving some grand issue, it still did pretty well on Product Hunt. 

# Development

Before I started developing the product, I did a _ton_ of research on best design practices, testing frameworks, etc. This hindered my progress at first, but in the end, I think it helped me maintain my pace as the project grew larger and more complex. 

I started off coding the actual web scraping functionality, leaving visualizations for when I got around to the frontend code. I came up with lot of new ideas along the way, so it was helpful to create a [Kanban board](https://en.wikipedia.org/wiki/Kanban_board) in Trello to organize these in Backlog, Pending, In Progress, and Done lists. I found that having lists also helps you prioritize which features to include in the MVP and which you'll have to come back to. 

Along with the Trello board, unit tests saved me a ton of time. This was my first project where I had real unit tests, and I've lost count of the number of times I changed a few lines of code and broke several unit tests. Without the unit tests and PyCharm's debugger, I don't know if I'd have finished the project, what with all the obscure bugs I encountered along the way. I now see why everyone emphasizes having them, even in the smallest of side projects. 

Finally, after I felt good about the backend, I built a simple REST API with Flask and hosted the app on a free Heroku dyno. This ended up being more than enough to support the app, with the only downside being that free dynos automatically sleep after 30 minutes of inactivity (I was able to work around this using [New Relic pings](https://coderwall.com/p/u0x3nw/avoid-heroku-idling-with-new-relic-pings)). 

Now on to the frontend! Since my original goal was to learn more about web scraping, I put a lot less effort into the code for https://www.statsify.us. My goal was simply to create a beautiful home page that could hold its own on Product Hunt. Below is the progression of the website: 

![Screenshot of website at beginning](/assets/images/blog-images/2019/statsify_beginning.png)
![Screenshot of website halfway through](/assets/images/blog-images/2019/statsify_beginning.png)
![Screenshot of website at the end](/assets/images/blog-images/2019/statsify_beginning.png)
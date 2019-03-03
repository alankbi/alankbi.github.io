---
layout: blog_layout
title: My experience launching Statsify, my first-ever product
image: /assets/images/blog-images/2019/launching_statsify.png
permalink: /blog/2019-03-03/my-experience-launching-statsify/
date: March 3, 2019
links: https://www.statsify.us|Statsify Home Page^^^https://www.producthunt.com/posts/statsify|Statsify on Product Hunt^^^https://www.webdesignernews.com/entry/2550208|Statsify on Web Designer News
---

On February 18, I launched [Statsify](https://www.statsify.us) on Product Hunt. After a little while, Statsify was featured on the front page, which gave it a decent spike of traffic over the next few days. This blog post talks about my experience throughout both the development process and launch. 

Before we get into the details, here are some basic numbers for those of you curious: 

* Upvotes on [Product Hunt](https://www.producthunt.com/posts/statsify): 143
* Upvotes on [Web Designer News](https://www.webdesignernews.com/entry/2550208): 475
* Unique visitors within first week: 3186
* Chrome extension users within first week: 49

# Idea Formation

As a second semester senior in high school, I knew that I was at risk of contracting [senioritis](https://en.wikipedia.org/wiki/Senioritis). To combat this, I decided to keep myself busy by working on random coding projects. 

I felt like learning web scraping, so I decided that I would play around with the Python [requests](http://docs.python-requests.org/en/master/) and [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/) libraries and see if I could come up with an idea for a full-fledged project along the way. 

Eventually, I came up with Statsify: a web app that visualizes interesting stats and info about a web page/website. I've always wanted a tool that could summarize the sites I visit on a daily basis, so this was the perfect chance for me to improve my programming skills while solving a problem! 

Looking back, if there's anything I learned from this process, it's that, like everyone says, the idea _really_ isn't that important. If you're a student just trying to improve your programming skills, any decent idea will do. Take Statsify: the idea is very simple, yet I still learned a ton while making it. And despite not solving some grand issue, it still did pretty well on Product Hunt. 

# Development

Before I started developing the product, I did a lot of research on best design practices, testing frameworks, etc. This hindered my progress at first, but in the end, I think it helped me maintain my pace as the project grew larger and more complex. If you're starting a new project, I'd recommending doing a small amount of research before diving in: too little and your codebase might be a mess later on, while too much and you end up over-thinking instead of just doing. 

I began by coding the backend web scraping functionality. Along the way, I came up with lot of new ideas, so it was helpful to create a [Kanban board](https://en.wikipedia.org/wiki/Kanban_board) in Trello to organize these in Backlog, Pending, In Progress, and Done lists. I found that having lists also helps you prioritize which features to include in your MVP and which you'll have to come back to. 

![My Trello board](/assets/images/blog-images/2019/statsify_trello.png)
<br><br>

Along with the Trello board, unit tests saved me a ton of time. This was my first project with real unit tests, and I've lost count of the number of times I changed a few lines of code and broke several unit tests, alerting me of a mistake. If I had to choose one thing I learned the most from the development process, it would be to write unit tests whenever possible, even for small side projects. 

Finally, after I felt good about the backend, I built a simple REST API with Flask and hosted the app on a free Heroku dyno (see [here](https://www.statsify.us/api) for documentation). This ended up being more than enough to support the app, with the only downside being that free dynos automatically sleep after 30 minutes of inactivity (I was able to work around this using [New Relic pings](https://coderwall.com/p/u0x3nw/avoid-heroku-idling-with-new-relic-pings)). 

Now on to the frontend! Since my original goal was to learn more about web scraping, I put a lot less effort into the code for [https://www.statsify.us](https://www.statsify.us). My goal was simply to create a beautiful home page that could hold its own on Product Hunt. Below is the progression of the website: 

![Screenshot of website at beginning](/assets/images/blog-images/2019/statsify_beginning.png)
_So far, I've just laid out all the elements using default Bootstrap styles._
<br><br>

![Screenshot of website halfway through](/assets/images/blog-images/2019/statsify_middle.png)
_Added some shadows, sharpened corners, and messed with font styling. Looks a lot better!_
<br><br>

![Screenshot of website at the end](/assets/images/blog-images/2019/statsify_end.png)
_Finishing touches, including a background image and better header/footer buttons._
<br><br>

I used [Chart.js](https://www.chartjs.org/) for the visualizations: 

![Screenshot of website visualizations](/assets/images/blog-images/2019/statsify_visualizations.png)
<br><br>

And lastly, the Chrome extension, which would allow users to visualize the pages they're currently browsing. The extension is really just loading an iframe of statsify.us with a query string for the url to visualize, so it was very low effort. Some parts of the website (search bar, JSON response, and a few other buttons) I felt weren't worth showing in the Chrome extension, but there was an easy workaround to accomplish that: I simply included the query string extensionMode=true in the iframe src url, and the website JavaScript code could then check for this and change the UI accordingly (click [here](https://www.statsify.us?extensionMode=true&url=alanbi.com) to see what it looks like). 

# Launch

At this point, Statsify was ready to launch. After reading Product Hunt's [guidelines](https://blog.producthunt.com/how-to-launch-on-product-hunt-7c1843e06399) and preparing all my press materials, I submitted Statsify a few minutes after midnight on Monday, February 18. The result is as follows: 

![Statsify traffic following the launch](/assets/images/blog-images/2019/statsify_traffic.png)
<br><br>

In the first two days, the website got 2165 unique visitors. Suprisingly, Product Hunt was not the only source of traffic; Statsify got posted by other people (or maybe bots?) on sites like [Web Designer News](https://www.webdesignernews.com/entry/2550208) (this is probably where that mysterious spike in traffic came from). In fact, Statsify did _really_ well on Web Designer News, becoming the top voted submission in the past 90 days:

![Statsify on Web Designer News](/assets/images/blog-images/2019/statsify_webdesignernews.png)
<br><br>

I ended up getting almost as much traffic from Web Designer News as Product Hunt. 

![Statsify traffic sources (Product Hunt and Web Designer News)](/assets/images/blog-images/2019/statsify_traffic_sources.png)
<br><br>

Overall, I'm very lucky that Statsify was featured on these two sites. A few days later, I posted Statsify on sites like Hacker News and Indie Hackers, although none did nearly as well. 

# Main Takeaway

I'm probably not the most qualified person to give advice about launching a product; I'm still working out how I can improve myself. However, the one suggestion that I feel confident making is to keep your initial product simple. At first, I thought Statsify didn't have enough features, but then I realized it's better to wait and gather feedback from users rather than painstakingly developing something that nobody ends up using. If you're a student like me, you have to balance programming with school and other responsibilities, so it's important to manage your time well. 

# Conclusion

Statsify was an amazing learning experience. At the beginning, I never even planned to publicize it. But after deciding to do so, it forced me to hold the project to a higher standard than my other projects, knowing that others could end up using it. I think I learned a lot more this way. 

If you're working on a side project, it's worth considering posting it on sites like Product Hunt. The worst case scenario is that no one likes it or uses it, in which case you can go back to developing it as a side project or move on to something else. However, I'd imagine it's more likely that you'll get good feedback and insights that you wouldn't have otherwise. 
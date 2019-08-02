---
layout: blog_layout
title: Getting started with coding
image: /assets/images/blog-images/2019/start_coding.png
permalink: /blog/2019-07-27/getting-started-with-coding/
date: July 27, 2019
links: 
  - url: /
    desc: Home
---

Following up with my latest post on ways to learn coding, in this article, I present some tangible pieces of knowledge that I think are good to know and would give you an edge up as a beginner programmer. 

The topics I will cover include programming languages, text editors and IDEs, debuggers, version control, and command line. A lot of these topics can become very complex, but I’ll try to explain them at a basic level where someone with no programming experience can understand, leaving further learning up to the reader. 

One of the first questions that one asks when beginning to learn programming is what language they should start with. At this point, the most common response you’ll get is that it doesn’t matter. There are many reasons for this. One is that most languages aren’t inherently better or worse than others; each has pros and cons, but choosing a language generally won’t limit the type of programs you can create with it (e.g. Python can be used for web development, data visualization, scripting, etc.). Another is that after learning the fundamentals of computing in one language, switching to another is as simple as memorizing a slightly different set of syntax. For example, after learning French, it’s not too difficult to learn Spanish, as both languages share some common rules and practices. 

Nevertheless, below I’ve listed details about several popular languages and the use cases of each: 

Java: java is the chosen language for AP Computer Science taught in high schools and often used in intro college classes as well. Its frequently used for web development. 

Python: generally regarded as a good beginner language due to its simple syntax. Can be used in areas such as data visualization/science and web development. 

C/C++: two “low-level” languages in that they’re useful for creating things like compilers? or programs that require speed and precision 

JavaScript: despite its name, it’s not at all related to Java. It’s run in web browsers (e.g. Chrome) and is used in a huge number of websites on the front end (whereas languages like Java and Python would be considered backend languages, being run on a server) 

Once you pick a language, it’s time to start coding. To code, you most likely need to use a text editor or IDE (integrated development environment). 

You can think of text editors as Word or Google Docs for code, usually providing useful tools like syntax highlighting or code completion. Most of these are programs you download onto your computer (some come with a default text editor, like NotePad++ on Windows), but you can also find websites that let you write and edit code online. Popular text editors include Sublime Text and Visual Studio Code. 

IDEs are just like text editors but typically heavier duty. XCode, IntelliJ, Visual Studio (not to be confused with Visual Studio Code), and Eclipse are all popular IDEs. They contain advanced features like debuggers and version control. 

Debuggers are very useful for when something has gone wrong with your code. Maybe your code doesn't do as expected, shows an error such as ArrayIndexOutOfBoundsException, or simply runs infinitely. A debugger allows you to walk through your program line by line, seeing what's going on internally and helping you find any bugs. By setting "breakpoints" at certain lines, your program will run normally and then pause once it hits a breakpoint, giving you full control as you traverse your program. Although they may seem intimidating, they're quite easy to learn, and using them can save you a lot of time when writing your first few programs. 

Version control is kind of like Google Docs, which allows multiple people to work on a single document and saves all edits into its history. Both of these things are important when coding, and as such, version control is definitely something to look into as you pursue programming further. There are many version control "systems" and hosting providers, but today I'll be focusing on Git and GitHub, the most popular of them all. 

First, GitHub is a code hosting platform that allows you collaborate with other programmers, show off your code/software to others, or simply keep store your code files for safe-keeping. You create "repositories" to store your code; for example, you might have one repository for your computer course's homework assignments and another repository for a 2D shooter game your building. If you make your repository public, others can freely submit code changes that you can choose whether to approve and "merge" into your "master" repository. For both public and private repositories, you can also add collaborators who have access to make changes without your approval. 

Unlike Google Docs, you can't edit these repositories live. Instead, what people most commonly do is to pair GitHub with Git, a version control system that's set up on one's computer. To make changes to a repository on GitHub, you can copy, or clone, the files in the repository onto your computer using Git. Then, using a text editor or IDE, you can add, edit, or delete whatever you want, and when your done, you can save these changes in a "commit," which is similar to creating a snapshot of your changes that you can revert to at any time. Finally, you can "push" the snapshots you make back up to GitHub, and programmers who have their own copies of the repository on GitHub can "pull" the changes you made onto their computer to stay up to date with the latest version of the codebase. Thus, through Git and GitHub, you can collaborate on coding projects as well as have a detailed history of the project through commits. 

This is all a simplified explanation, but how do you actually "clone," "commit," "push," or "pull" as described? One way is to use the built-in version control functionality that comes with many IDEs, as mentioned above. These IDEs handle the git operations behind the scenes, instead presenting you with a graphical interface to do these operations. As a result, pulling and pushing can be as simple as clicking a button, and committing is just a matter of typing a description of your changes into a text box and clicking enter. The other main way is to directly use the git operations in a command line interface. 

The command line is an alternative way to interact with your computer. Most people use a graphical interface, which is essentially all the apps and functionality you have on your computer with a UI (web browsers, file explorer, etc.). With the command line, you type in commands to interact with your computer rather than clicking or dragging and dropping. On macOS and Linux, you type these commands into an app called Terminal, whereas for Windows, you use an app called Command Prompt. For example, to list files in the current folder, you can type the command <code>ls</code> (or <code>dir</code> on Windows, which uses a different system). To change folders (or directories), type <code>cd foldername</code>, where cd stands for "change directory." If you have Git on your computer, running git operations is just like running any other command: <code>git pull</code>, <code>git push</code>, etc. 

Although it seems insane that anyone would use the command line instead of a graphical user interface, it's actually very common among programmers and definitely an important topic to learn. More powerful capabilities and faster execution are just a few of its benefits over graphical user interfaces. 

While I definitely wouldn't expect any beginner to delve into these topics all at once, I think it's helpful to at least familiarize oneself with them on a broad level. As you continue to learn programming, getting a head start in these areas will give you a leg up in pursuing an education in computer science. And don't worry if you didn't fully understand everything explained here; it will all make sense eventually!

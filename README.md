# cs0320 Term Project 2021

### Team Members and Their Strengths and Weaknesses

Xinzhe Chai\
Strength: Front-end technologies (React, CSS), Exploring new packages\
Weakness: Coming up with original design, Error Handling

Jacqueline Zhang\
Strength: Algorithm, Math\
Weakness: Can’t work late at night, Frontend, Good at creating null pointer exceptions

Jinoo Hong\
Strength: Algorithm and data structures, Some React background\
Weakness: Can’t work early in the morning, Testing

Kira Kelly Clarke\
Strength: Front-end technologies (HTML, CSS), Design\
Weakness: Backend, Algorithm

### Project Idea 1
The web app we are proposing attempts to allow users gauge where they stand on any given question compared to other web app users. These questions could be as trivial as “favorite soft drink” or as contentious as “pro-life vs pro-choice”. It also comes with a game section that allows the platform to be used in ice-breaker games.

The web app’s main screen will be an infinitely scrollable page like instagram with suggested polls that are either trending or related to any interest groups that they are a part of. Users will then answer the poll themselves (polls support either a multiple choice or dragging a button along a bar from 0-100%). Once answering, they will get to see how they stand compared to other web app users. Maybe they like pineapples on pizza whereas only 38% of people feel the same way. More interesting however will be the fact that users will be able to filter answers. For example, they can see if liberals like pineapple on pizza whereas conservatives don’t. Other filters could be based on age, gender, university, education level, ethnicity and so on. We will talk about how we protect user privacy later on - we ensure that all user answers are fully anonymized. In all, we want engagement with the web app to be instant, like tictok or instagram rather than reddit forums. Therefore, we want to only stick to polling and showing colorful charts and graphs that instantly give users a sense of what others think rather than long forum discussion (we believe Reddit already fills this space well).

At first, this web app was proposed to provide people with a fun way to see how they stack up compared to public opinion. Linux users could gauge and see what percentage of people like a certain distro, people into fashion could see what people think about white boots or a certain clothing lineup, etc. After further thought however, this web app aims to solve a myriad of other issues. First of all, this web app will hopefully allow users to realize whether or not they are in a bubble. If they see that a majority of people think have differing opinions to your closed circle of friends, this web app could help them show them how people actually feel. Institutions, event planners and clubs could also use data from this web app to help gauge public opinion or interest in nearly anything. With the media, especially in the US, diverging public opinion, we want to create a place for all people to share their opinions safely and honestly.

We want to create 5 critical features:
- Users should be able to create their own polls: write a question, add a photo if they want and choose the possible answer mechanism (multiple choice or dragging a button along a bar from 0-100%).
- A game that users can play. This is being implemented so that users can use this as an icebreaker and hopefully use this web app in their free time. This will get more user engagement and hopefully get our web app to grow its database of answers quickly.
    - The game is like a survival game where you have 3 lives. You then are given a random poll and you need to answer it yourself. Once answering it yourself, you need to then guess what the average/most popular answer is for that given poll. If you guessed correctly or are within 5-10% of the answer, you get a point and move
      on to the next poll. Each poll you answer in a row gives you a bonus streak. If you
      guess wrong, you then lose a life.
- We should be able to import currently existing polls from online. This way, we can start
  with some polls that have already been answered. We want to have at least 100-500 polls
  on the web app so that early adopters don’t get too bored.
- We want to create a suggestion algorithm on the backend so that users are shown polls
  that they would be interested in. This could be done in two ways: trending polls and allowing users to select “interest groups”. The algorithm can be relatively simple and use trending polls and interest groups to rank polls by potential interest for a given user.
- Users should be able to search for polls. For example polls related to politics, COVID, etc.

Challenges:
- One challenge is ensuring user answers stay private and anonymized. To do this, we don’t send any unique identifying information to our backend. Instead, add the answer to our database and mark down the fact that that user has answered this poll (this way users cannot respond to a poll twice). We think that filtering answers based on demographic can reveal/single out individuals and their answers. Especially if this web app was used in a closed environment where you know who has answered a poll (like in an ice breaker). Therefore, we will only allow filtering options after 100 people have answered a poll.
- Another challenge is making sure that users are answering questions honestly. We don’t really know how we can solve this problem except by perhaps putting some community guidelines on the loading screen when entering the web app. Telling users that their answers make a real difference and so encouraging them to be honest and not spam fake answers. One way to mitigate this problem is to limit the number of polls that a user can participate in each day (100 polls).
- Keeping users engaged and answering questions often is another challenge. This requires a good suggestion algorithm, an enjoyable game and enough controversial poll answers that keep people surprised and interested. A sleek and fun UI always helps as well.
- We also need to recognize the ethical issues with creating this sort of web app. Because users have the freedom to create their own polls, we want to make sure that no polls that have a racist or hate-speech agenda are being created. This will initially be done by human moderators. Another ethical concern is that this app could encourage a “you vs me” attitude towards others. We really want to encourage users to see this app as a way for people to share their opinions honestly and gauge how others think. We don’t want users to feel attacked or threatened. E.g. conservatives could be like “pffft... liberals... They like pineapple on their pizza!?!”
- Another challenge is growing our dataset of answers. We can get a kick start by importing already online existing polls but this requires solving challenges 3.
- To be transparent we will also have a page that breaks down the demographics of pollster users. This way, if 90% of poster users are between the ages of 18-25 years old, those looking at these graphs will know that this bias in an over representation of this age range has influenced the statistics they are looking at. We can also do a similar thing with all poll results (show who is represented in these polls).

### HTA Approval
dpark20: Idea approved (Pollster) contingent on your suggestion page algorithm being fairly complex. Make sure to fill your info in on this README, not on a separate pdf! Good idea!

### Mentor TA
Milanca Wang

### Meetings
_On your first meeting with your mentor TA, you should plan dates for at least the following meetings:_

**Specs, Mockup, and Design Meeting:** _(Schedule for on or before March 15)_

**4-Way Checkpoint:** _(Schedule for on or before April 5)_

**Adversary Checkpoint:** _(Schedule for on or before April 12 once you are assigned an adversary TA)_

### How to Build and Run
_A necessary part of any README!_

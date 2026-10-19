const { tbl, stats, callout, lanes } = require('./h');

module.exports = {
'why-i-keep-losing': {
  tag: 'Matchmaking & psychology',
  crumb: 'Why I keep losing',
  h1: 'Why do I keep losing in Dota 2 <span class="d">when I play well?</span>',
  metaTitle: 'Why do I keep losing in Dota 2? Forced 50%, loss streaks and the draft | Outdraft',
  description: 'Is there a forced 50% win rate in Dota 2, where loss streaks come from, and what you can actually control. Based on Valve’s own words, CHI research and a million pub matches.',
  card: 'Forced 50%, loss streaks and tilt: what Valve, research and pub stats actually say.',
  lead: 'Short answer: there is no “forced 50%”. According to Valve, the matchmaker builds each game so the <b>players</b> have equal odds. But it knows nothing about <b>picks</b>: the draft starts after the match is already made. So some games are uneven before the first creep wave, and that feels unfair. The good news: the draft is exactly the part you can influence.',
  body: `
<h2>Is there a forced 50% win rate? What Valve says</h2>
<p>The theory goes like this: after a win streak, the game gives you bad teammates on purpose to keep you at 50%. In 2021 Valve developer Jeff Hill answered this directly [1]. The matchmaker tries to make every game an even match for both teams, and your personal 50% is just a <b>result</b> of that, not the goal. He said the matchmaker does not optimize for retention or engagement and does not look at how much you spend.</p>
<p>So why won’t the theory die? Because it <i>can</i> be done. In 2017 researchers at EA described EOMM, a matchmaking system that picks opponents to stop players from quitting [5]. In their PvP game, the risk of quitting within a week after a losing streak was <b>5.1%</b>, almost double the 2.6–2.7% in “safe” states. So the idea is not crazy. Valve just says publicly that Dota doesn’t work like that. Nobody outside Valve has seen the matchmaker code, so the honest version is: there is no proof of a forced 50%, and the official position is that it doesn’t exist.</p>
<p>Valve does admit that match quality can be a problem. In 2019 it said high-MMR games had gotten worse and changed the rules: five-stacks only play against five-stacks, and a solo player can face at most one party of two [2].</p>

<h2>Where streaks come from: what players say</h2>
<p>The most detailed study of how players experience streaks is by Kou and co-authors at CHI 2018 [3]. They went through 773 forum threads about League of Legends, 4,620 coded entries in total. It is not Dota, but the setup is the same: ranked 5v5 matchmaking.</p>
${tbl(['How players explain a streak', 'Share'], [
  ['Mental state: tilt, fatigue', '45%'],
  ['How matchmaking works', '33%'],
  ['Their own play', '20%'],
  ['Teammates', '12%'],
  ['Luck', '11%'],
], [1])}
<p>The most common reaction was negative emotion (57%), and 35% of players quit the game for a while. Streaks hurt both ways: even after a win streak, people expect “the losing to start now”. The second most popular folk strategy was “pick the OP hero” (20%). That makes sense, but it is only half true: a strong hero in general and a strong hero <i>in this draft</i> are not the same thing.</p>

<h2>Tilt was measured: it is real, but small</h2>
<p>In 2024 a team from Tampere University checked streaks with data instead of feelings: 597,680 matches of top LoL players [4]. Streaks are linked to performance, but only <b>weakly</b>: KDA is a bit lower after losses and a bit higher after wins. The bigger finding: during a losing streak, players switch heroes and roles more often, and sticking to the same hero and role is linked to better results. One more uncomfortable detail: taking a break after a losing streak barely changes anything (correlation r = 0.017).</p>
<p>So “I’m tilted, that’s why I lose” explains less than it seems. Jumping between heroes is a much more measurable problem.</p>

<h2>Some games are uneven before the first creep</h2>
<p>The matchmaker balances rating, but not the map side and not the picks. You can see it in the numbers:</p>
${stats([
  ['53.5%', 'of pubs are won by Radiant on patch 7.41 (1,087,115 matches)'],
  ['44.9%', 'Meepo win rate vs Earthshaker, compared to ~53% normally', true],
  ['38.7%', 'Huskar win rate vs Ancient Apparition', true],
])}
<p>The map side gives Radiant +6.9 points in pubs [6]. A normal matchup moves the odds by 0–3 points, a hard counter by 6–8 points [7] [8]. Five picks add up: if the enemy countered two of your key heroes and you countered nobody, the game starts with a clear minus. The matchmaker can’t see this, because its job ended before the hero selection screen.</p>
<p>One more detail: the lower the rank, the more the draft decides. A study of 5 million matches found that picks alone predict the winner best at normal skill and worst at very high skill (ROC AUC 0.706 vs 0.660) [9]. The authors explain that strong players know how to play into counters, while at lower ranks people are confident on fewer heroes.</p>

<h2>What you can actually control</h2>
<ol>
<li><b>The draft.</b> It is the only part of the match where you change the odds before the game starts. You don’t need to win the draft by a mile, just don’t give away free percent.</li>
<li><b>Consistency.</b> A small hero pool and your own role are linked to better results [4]. A counter from your pool beats a “perfect” hero you have five games on.</li>
<li><b>The long run.</b> +3 points of win rate is about +6 net wins every 100 games. You won’t feel it in one evening, but you will in a month.</li>
<li><b>Honest review.</b> Not every loss is your fault. Sometimes the game was 40/60 already at hero selection, and knowing that stops you from breaking what works.</li>
</ol>

<h2>How Outdraft shows it</h2>
<p>Outdraft shows exactly the part the matchmaker can’t see. During picks, the overlay shows each hero’s impact in % and rates the lanes: ${lanes}. The most influential hero gets a ⭐, the weakest gets a 🔻, and the result is shown as a win chance, for example “Dire 64%”.</p>
${callout('od', 'Try this', '<p>For your next 10 games, look at the draft chance before the game starts and write down the result. You will quickly see which losses started at 40% and which ones were really on you.</p>')}
`,
  faq: [
    ['Is there a forced 50% win rate in Dota 2?', 'According to Valve, no. The matchmaker tries to make each game even, and your ~50% is a result of that. There is no independent proof of a forced 50%, although such matchmaking is technically possible (EA described a similar system in 2017).'],
    ['Why do I lose 10 games in a row?', 'Streaks happen even with a fair coin. On top of that, some games are uneven because of the draft and map side: Radiant wins 53.5% of pubs. LoL data also shows that players switch heroes and roles more during streaks, which is worth keeping in check.'],
    ['Does taking a break after a loss streak help?', 'It helps your mood. But in a study of 597,680 matches, breaks had almost no effect on results (r = 0.017). Sticking to the same hero and role was more strongly linked to results.'],
    ['How do I know I lost because of the draft?', 'Check if your team had an answer to the enemy’s key hero and how many lanes were hard. In Outdraft you see this during picks: the draft win chance in % and a rating for each lane.'],
  ],
  note: 'Jeff Hill’s quotes come from a secondary source (win.gg). The streak studies are about League of Legends; we didn’t find comparable open research for Dota.',
},

'can-you-win-in-draft': {
  tag: 'Draft science',
  crumb: 'Can you win in the draft',
  h1: 'Can you win a Dota 2 game <span class="r">in the draft?</span> What research says',
  metaTitle: 'Can you win a Dota 2 game in the draft? 10 years of research | Outdraft',
  description: 'How much the draft decides in Dota 2: OpenAI Five, Stanford and HSE studies, a 3.5M-match benchmark. Why average win rates lie and what “Dire 64%” means.',
  card: 'OpenAI Five, Stanford, 5M matches: how well picks predict the winner, and why average win rates lie.',
  lead: 'You can’t win a game <i>only</i> with the draft, but you can move the odds. Models that see nothing but the picks guess the winner in 56–70% of games, and the honest ceiling on large modern datasets is about 58–60%. That is a lot: the draft is the biggest lever you have before minute one.',
  body: `
<h2>OpenAI Five: 95% and 2.9%</h2>
<p>In August 2018 OpenAI showed its bot, OpenAI Five, playing against humans [1]. Before game 1 the network looked at the draft and gave itself a <b>95%</b> chance to win, even though the matchup looked even to people. It won in 21:37. In game 2 the prediction was 76.2%, another win.</p>
<p>In game 3 the audience picked the bot’s heroes. The prediction after the draft: <b>2.9%</b>. During the game it peaked at 17%, and the bot lost at 35:47.</p>
${callout('', 'What this tells us', '<p>A model can see things in a draft that even strong players miss. But notice: the 2.9% game lasted over half an hour. A bad draft doesn’t mean an instant loss. It means you have to outplay the other team.</p>')}

<h2>10 years of research: from 69.8% to 58.7%</h2>
<p>Students at Stanford, HSE (Moscow), NTU and independent teams have all tried to predict the winner from picks. Here is what they got:</p>
${tbl(['Year', 'Study', 'Matches', 'Picks only'], [
  ['2013', 'Stanford, Conley & Perry [2]', '56,691', '69.8%'],
  ['2015', 'UCSD, Kalyanaraman [3]', '30,426', '69.4%'],
  ['2015', 'Kinkade & Lim, via review [5]', '—', '72.9%'],
  ['2017', 'HSE / Yandex Data Factory, Semenov et al. [4]', '5,071,858', 'AUC 0.66–0.71'],
  ['2020', 'NTU, Wu Hao [6]', '181,717', '60.1%'],
  ['2026', 'batru.gg benchmark [7]', '3,579,956', '58.7%'],
], [3])}
<p>Why did the number go down? Early studies used small or filtered samples from old patches, often only high skill and without leavers. Modern benchmarks test on millions of normal games from all ranks. The batru authors say directly that much higher numbers usually mean information from the finished match leaked into the model [7]. So be careful with big claims like “81% accuracy”.</p>
<p>The honest result: from picks alone you can predict about 58–60 games out of 100. People decide the rest. But 58–60 is clearly more than 50, and that edge exists before anyone leaves the fountain.</p>

<h2>Why average win rates lie</h2>
<p>The most common mistake is looking at a hero’s overall win rate. In the batru benchmark, simply averaging the heroes’ win rates predicted the result in <b>52.2%</b> of games. That is <i>worse</i> than “always bet on Radiant”, which gets 53.1% just from the side advantage [7] [9]. Even when the average was confident (65% or more), it was right only 56.0% of the time.</p>
<p>Older studies show the same. According to a 2017 review, a model built on the sum of individual win rates got 63%, while adding hero pairs, meaning synergy and counters, raised it to 72.9% [5]. In the HSE study, models that account for hero interactions (Factorization Machines and XGBoost) beat simple logistic regression [4].</p>
${callout('', 'Key point', '<p>What matters is not “which hero is strong” but “who plays against whom, and with whom”. A tier list answers the first question. The draft answers the second.</p>')}

<h2>The draft matters more at lower ranks</h2>
<p>The HSE study of 5 million matches split games by skill level, and the difference was clear [4]:</p>
${tbl(['Skill level', 'ROC AUC from picks (best model)'], [
  ['Normal', '0.706'], ['High', '0.670'], ['Very High', '0.660'],
], [1])}
<p>ROC AUC is not the share of correct guesses. It measures how well the model separates wins from losses: 0.5 is a coin flip, 1.0 is perfect. The meaning is simple: at normal ranks the result depends more on picks. The authors explain that strong players know how to play into counters, while at lower skill people are confident on fewer heroes. If you are not high rated, the draft matters more for you than for pros.</p>

<h2>Why the edge grows so fast</h2>
<p>Once you add in-game data, predictions get accurate very fast. In the study by Hodge et al., a model on live ESL One Hamburg 2017 games reached <b>up to 85% after just 5 minutes</b> [8]. According to the 2017 review, another study got 82.23% at minute 5 [5]. A draft advantage turns into won lanes, and won lanes snowball. That is why the draft and the lanes should be looked at together.</p>

<h2>What “Dire 64%” means in Outdraft</h2>
<p>Outdraft rates the draft using thousands of matches from the last four weeks and shows the result as a win chance. “Dire 64%” means: in similar drafts, Dire wins about 64 games out of 100. It is not a guarantee. In 36 of those 100 games, Radiant wins.</p>
<p>A good prediction has a simple test called calibration. If a model says “60–65%”, those games should end in a win roughly 60–65% of the time. For example, batru publishes this check for its model: predictions of 60–65% came true in 62.8% of games [7]. This is the right way to read any “draft percent”: as odds over many games, not a promise for one game.</p>
<p>Along with the overall percent, Outdraft shows each hero’s impact, a ⭐ on the most influential hero and a 🔻 on the weakest, plus a lane rating: ${lanes}.</p>

<h2>Signs of a lost draft, and what to do</h2>
<ul>
<li><b>Nothing can kill the enemy’s key hero.</b> No healing reduction, no silence, no area damage against illusions. More in <a href="/en/cant-kill-this-hero/">“Why can’t I kill this hero?”</a>.</li>
<li><b>Two or three hard lanes.</b> If almost every lane is Hard or Very hard, the enemy will have a clear lead by minute 10.</li>
<li><b>No control or initiation.</b> Your team can’t start a fight or catch a single hero.</li>
</ul>
<p>If the draft really is lost: play around your strongest lane and your timing, build items against this specific enemy lineup, and don’t fight on their terms. And remember OpenAI Five’s 2.9%: even a very bad draft leaves a game to play, you just have to win it with your head.</p>
`,
  faq: [
    ['How important is the draft in Dota 2?', 'From picks alone, studies predict the winner in 56–70% of games, and about 58–60% on large modern datasets. The draft clearly moves the odds, but it doesn’t decide the game by itself.'],
    ['What should I do if my draft is lost?', 'Play around your strongest lane and timing, build items against the enemy lineup, and don’t fight on their terms. Even the 2.9% draft of OpenAI Five lasted 35 minutes.'],
    ['Why not just pick heroes with a high win rate?', 'Average win rate ignores matchups and synergy. On 3.58 million matches, averaging win rates predicted results worse than “always bet on Radiant”.'],
    ['What does “Dire 64%” mean in Outdraft?', 'It is an estimate of the odds: in similar drafts, Dire wins about 64 games out of 100. It is not a guarantee for one game, it is an edge over many games.'],
  ],
  note: 'The Kinkade & Lim and Johansson & Wikström numbers come from the 2017 CEUR review; we didn’t open the originals. The batru benchmark is published by the service itself and is not independently verified.',
},

'last-pick-counter-math': {
  tag: 'Counter-picking',
  crumb: 'Who to last pick',
  h1: 'Who to last pick in Dota 2: <span class="r">the math of counter-picking</span>',
  metaTitle: 'Who to last pick in Dota 2: the math of counter-picking | Outdraft',
  description: 'How much a counter pick really changes your odds in Dota 2: Huskar vs AA 38.7%, Meepo vs ES 44.9%. Why a “strong hero” depends on your rank, and a step-by-step last pick.',
  card: 'How many percent a counter pick is worth, why tier lists fail at your rank, and how to choose the fifth pick.',
  lead: 'Your last pick should not be “the strongest hero of the patch”. It should be the hero that shuts down the enemy’s main threat and doesn’t lose its own lane. A normal matchup moves the odds by 0–3 points, a hard counter by 6–8. So the goal is not to “counter everyone”, it is to find <b>who exactly</b> to counter.',
  body: `
<h2>How strong is a counter pick? The numbers</h2>
<p>Let’s take two heroes people most often call “annoying” and look at their worst matchups on Dotabuff [1] [2]:</p>
${tbl(['Matchup', 'Win rate in matchup', 'Overall win rate', 'Matches'], [
  ['Meepo vs Earthshaker', '<span class="dn">44.88%</span>', '52.95%', '28,458'],
  ['Huskar vs Ancient Apparition', '<span class="dn">38.70%</span>', '45.76%', '28,846'],
  ['Huskar vs Viper', '<span class="dn">41.16%</span>', '45.76%', '48,510'],
  ['Huskar vs Wraith King', '<span class="dn">38.68%</span>', '45.76%', '—'],
], [1, 2, 3])}
<p>Meepo’s Dotabuff “Disadvantage” is 8.38% vs Earthshaker, 8.40% vs Elder Titan, 8.04% vs Winter Wyvern and 8.00% vs Underlord. But for most of his matchups it is under 3% [1]. Even in his best matchup (vs Anti-Mage), Huskar wins only 51.06% [2].</p>
<p>That gives a rule: most matchups barely matter, and a few specific ones matter a lot. A good last pick is one that lands one of those hard matchups on the most dangerous enemy.</p>

<h2>Why the last pick is so valuable</h2>
<p>The last pick has one big advantage: information. You see all five enemies and can counter the one that matters most to them. The first pick has to take a strong hero blind.</p>
<p>In pro play it is a bit different. At TI 2024, the team with first pick won 58.8% of 51 playoff games, and 63.6% of 22 games at the Royal Arena [3]. There, grabbing the strongest hero of the patch matters more. But even pro drafting is an information game: in game 2 of the grand final, Liquid left Naga Siren open on purpose (she was banned in the first phase in 48 of 51 playoff games) and made GG take her [3]. In pubs, the last pick simply has more information than the first, so use it.</p>

<h2>Synergy or counters: which matters more?</h2>
<p>Both. According to a 2017 review of studies, a model built on the sum of individual win rates got 63% accuracy, and adding hero pairs raised it to 72.9% [4]. Those pairs include both allies (synergy) and enemies (counters). The HSE study of 5 million matches also found that models which account for hero interactions predict better than simple ones [5].</p>
<p>The flip side: if you only look at a hero’s average win rate, the prediction is almost useless. In a 3.58-million-match benchmark, averaging win rates predicted results worse than “always bet on Radiant” [7]. So check your last pick both ways: who it plays against, and who it plays with.</p>

<h2>A “strong hero” depends on your rank</h2>
<p>Another reason not to trust tier lists: the same heroes perform differently at different ranks. OpenDota data from 19 Oct 2026 [6]:</p>
${tbl(['Hero', 'Herald', 'Divine', 'Change'], [
  ['Bristleback', '53.8%', '45.4%', '<span class="dn">−8.4</span>'],
  ['Ogre Magi', '53.6%', '48.5%', '<span class="dn">−5.1</span>'],
  ['Shadow Fiend', '45.7%', '40.7%', '<span class="dn">−5.0</span>'],
  ['Bane', '43.3%', '50.3%', '<span class="up">+7.0</span>'],
  ['Visage', '48.6%', '55.6%', '<span class="up">+7.0</span>'],
  ['Enigma', '48.2%', '56.1%', '<span class="up">+7.9</span>'],
  ['Shadow Demon', '37.3%', '47.0%', '<span class="up">+9.7</span>'],
], [1, 2, 3])}
<p>Bristleback is one of the best heroes in Herald and one of the worst in Divine. Shadow Demon is the opposite. The gap between ranks here is bigger than the effect of most counter picks. So “pick what the pros pick” can work against you at your rating.</p>

<h2>A step-by-step last pick</h2>
<ol>
<li><b>Find the main threat.</b> Which enemy hero decides the game? In Outdraft it is marked with ⭐. Does your team already have an answer? If not, that is priority one.</li>
<li><b>Check the lanes.</b> Which of your lanes is Hard or Very hard? The last pick should help it, or at least not lose its own lane.</li>
<li><b>Don’t take the weak link.</b> A hero that ends up 🔻 weakest in this draft is a bad choice, even if it is meta.</li>
<li><b>Pick from your pool.</b> Hero consistency is linked to better results. A counter you play confidently beats a “perfect” hero you have three games on.</li>
<li><b>Check the total.</b> See how the overall draft chance changed. If the pick barely moves it, there may be a better option.</li>
</ol>

<h2>Common last pick mistakes</h2>
<ul>
<li><b>Countering a hero that is already weak.</b> If an enemy hero is the 🔻 weakest in this draft, countering it wastes your pick. Look at the ⭐.</li>
<li><b>Picking from a tier list.</b> A meta hero with no link to the draft gives less than a hard matchup on the main threat. And at your rank it may not even be strong.</li>
<li><b>Forgetting your own lane.</b> The last pick has a lane too. If it loses that lane Very hard, the counter pick bonus can be gone before minute 10.</li>
<li><b>Picking a hero you don’t play.</b> A couple of percent from a table is not worth learning a hero in a ranked game.</li>
</ul>
<h2>How it looks in Outdraft</h2>
<p>During hero selection, Outdraft shows each hero’s impact in % and a lane rating: ${lanes}. ⭐ marks the most influential hero, 🔻 the weakest, and at the top you see the overall chance, like “Dire 64%”. Pick suggestions take your role, the enemies and your allies into account, and are based on matches from the last four weeks, so they fit the current patch.</p>
${callout('od', 'In practice', '<p>If the enemy ⭐ is on Huskar and your team has no healing reduction and no break, the best last pick is almost always the hero that fixes that. Even if it is not the strongest hero of the patch.</p>')}
`,
  faq: [
    ['Who should I last pick in Dota 2?', 'A hero that counters the most dangerous enemy, doesn’t lose its own lane and is in your pool. The patch’s strongest hero, picked without looking at the draft, is not the best last pick.'],
    ['How much does a counter pick change the odds?', 'A normal matchup moves them by 0–3 points, a hard counter by 6–8. For example, Huskar wins 38.7% against Ancient Apparition, compared to 45.8% overall.'],
    ['What matters more: synergy or counters?', 'Both. Models that look at hero pairs (allies and enemies) predict results much better than average win rates.'],
    ['Why don’t tier lists work at my rank?', 'Hero strength depends on the bracket. Bristleback wins 53.8% in Herald and only 45.4% in Divine, and Shadow Demon is the other way around.'],
  ],
  note: 'Dotabuff and OpenDota win rates were taken on 19 Oct 2026 (patch 7.41) and change with every patch. The Kinkade & Lim numbers come from the 2017 CEUR review.',
},

'cant-kill-this-hero': {
  tag: 'Counter-picking',
  crumb: 'Why can’t I kill this hero',
  h1: 'Why can’t I kill <span class="d">this hero?</span>',
  metaTitle: 'Why can’t I kill this hero in Dota 2? How to counter Huskar and Meepo | Outdraft',
  description: 'Huskar won’t die, Meepo can’t be caught? Using Dotabuff numbers, we break down which mechanics and heroes really counter “unkillable” heroes, and why it is decided in the draft.',
  card: 'Huskar, Meepo and other “unkillable” heroes: which mechanics shut them down, and why it is a draft problem.',
  lead: 'When a hero feels “unkillable”, the problem is almost never the hero. It is that your team has no tool against it: nothing to cut healing, break a passive or hit an area. The numbers back this up: the right answer drops Huskar’s win rate from 45.8% to 38.7%. The easiest place to fix it is hero selection.',
  body: `
<h2>Why “unfair” is usually the draft</h2>
<p>When nothing works, it is easiest to blame the system. In the CHI 2018 study on losing streaks, a third of players (33%) blamed how matchmaking works [3]. But the feeling of “I can’t kill him” usually has a very concrete cause: your lineup has no mechanic that works against that hero.</p>
<p>It shows more at lower ranks. The HSE study of 5 million matches found that at normal skill the result depends more on picks than at very high skill [4]. Strong players know how to play into counters, while most of us are confident on a few heroes and can’t always adapt.</p>

<h2>Mechanics that shut down “unkillable” heroes</h2>
<p>Almost every “unkillable” hero relies on one strength. Turn it off and the hero becomes normal.</p>
${tbl(['What the hero relies on', 'What works', 'Examples'], [
  ['Healing and regen', 'Healing reduction or block', 'Ancient Apparition (Ice Blast), Spirit Vessel, Eye of Skadi'],
  ['A strong passive', 'Break', 'Viper (Nethertoxin), Silver Edge'],
  ['Many bodies: clones, illusions', 'Area damage and control', 'Earthshaker, Elder Titan, Underlord, Winter Wyvern'],
  ['Saving spells and abilities', 'Silence', 'Orchid Malevolence, Bloodthorn'],
  ['Armor or magic resistance', 'The other damage type', 'If they tank physical damage, use magic, and the other way around'],
])}
<p>A good check during the draft: name <i>how</i> your team will kill the enemy’s main hero. If there is no answer, take it with the last pick or plan it in your items.</p>

<h2>Breakdown: Huskar</h2>
<p>Huskar gets stronger the lower his health is, and relies on his passive, Berserker’s Blood, and on healing. His overall win rate is 45.76%, and his worst matchups on Dotabuff look like this [1]:</p>
${stats([
  ['38.70%', 'vs Ancient Apparition (28,846 matches)', true],
  ['41.16%', 'vs Viper (48,510 matches)', true],
  ['38.68%', 'vs Wraith King', true],
])}
<p>The logic is clear: Ancient Apparition stops healing, Viper breaks the passive. Even in his best matchup, vs Anti-Mage, Huskar wins only 51.06% [1]. He only becomes “OP” when the enemy has no answer.</p>

<h2>Breakdown: Meepo</h2>
<p>Meepo is a strong hero overall (52.95%), but he has very specific weaknesses [2]. Against Earthshaker his win rate drops to 44.88% over 28,458 matches. His Dotabuff Disadvantage is 8.38% vs Earthshaker, 8.40% vs Elder Titan, 8.04% vs Winter Wyvern and 8.00% vs Underlord.</p>
<p>What they have in common: area damage and control that hits all clones at once, and in Winter Wyvern’s case a curse that makes the Meepos attack each other. Meanwhile, for most of his other matchups Meepo’s Disadvantage is under 3% [2]. So “countering Meepo” doesn’t mean any hero with a stun. It means a few specific ones.</p>

<h2>“Can’t kill” = “didn’t answer in the draft”</h2>
<p>In most drafts the enemy has one or two heroes the game depends on. If you have no answer to them, the problem keeps growing. Live prediction studies show that by minute 5 the result can be predicted up to 85% of the time [6], so an early edge snowballs fast. An answer that shows up at minute 25 is often too late.</p>
<p>That is why the best moment to deal with a threat is hero selection. And it is better to answer the main threat than to try to counter everyone. Models that look at specific hero pairs predict results much better than overall win rates [5].</p>

<h2>No answer in the draft? Items</h2>
<ul>
<li><b>Against healing and regen:</b> Spirit Vessel, Eye of Skadi.</li>
<li><b>Against passives:</b> Silver Edge.</li>
<li><b>Against saving spells:</b> Orchid Malevolence, Bloodthorn.</li>
<li><b>Against magic damage and control:</b> Black King Bar.</li>
</ul>
<p>Items are not as strong as the right hero, because you have to farm them first. But they beat hoping the enemy makes a mistake.</p>

<h2>A quick check during the draft</h2>
<p>Before the last picks, ask your team five questions. If any answer is “no”, that is your future “unkillable” hero.</p>
<ol>
<li>How do we cut healing if the enemy has regen or heals?</li>
<li>Do we have break against a strong passive?</li>
<li>What hits an area if the enemy has clones or illusions?</li>
<li>Do we have a silence for a hero that saves itself with spells?</li>
<li>Is all our damage one type, only physical or only magic?</li>
</ol>
<h2>How Outdraft highlights an unanswered threat</h2>
<p>In Outdraft, ⭐ marks the most influential hero in the draft. Very often it is the same hero you later “can’t kill”. If the star is on the enemy side and you have no answer, you see it before the game starts. The lane rating (${lanes}) shows where it will be hard, and the item build in the overlay adapts to the enemy lineup, with the minute to buy each item.</p>
`,
  faq: [
    ['How do you kill Huskar in Dota 2?', 'Turn off what he relies on: healing and his passive. On Dotabuff, Huskar does worst against Ancient Apparition (38.7%), Wraith King (38.7%) and Viper (41.2%). Spirit Vessel, Eye of Skadi and Silver Edge help as items.'],
    ['Who counters Meepo?', 'On Dotabuff the strongest counters are Earthshaker (Meepo wins 44.9%), Elder Titan, Winter Wyvern and Underlord. They all have area damage and control. Against most other heroes Meepo loses very little.'],
    ['Why can’t I kill anyone at my rank?', 'At normal ranks the draft affects the result more: players are confident on fewer heroes and adapt less. If your lineup has no healing reduction, break or area damage, some heroes will feel unkillable.'],
    ['What if it’s too late to counter pick?', 'Answer the threat with items (Spirit Vessel, Silver Edge, Orchid, BKB) and avoid fighting where the enemy’s main hero is strongest. Next time, solve it in the draft.'],
  ],
  note: 'Win rates were taken from Dotabuff on 19 Oct 2026 (patch 7.41). Hero mechanics can change with patches, so check current ability descriptions.',
},
};

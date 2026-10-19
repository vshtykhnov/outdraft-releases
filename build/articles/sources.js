// Sources per article. Footnote [N] in content = index N (1-based) in this list.
const S = {
  hill: ['win.gg — Valve developer debunks Dota 2 players\' forced 50% win rate theory (Jeff Hill, 2021; secondary source)', 'https://win.gg/news/valve-dev-debunks-dota-2-players-forced-50-win-rate-theory/'],
  valve2019: ['Valve — Continuing Matchmaking Updates, 10 Oct 2019', 'https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/3051677487676270896'],
  kou: ['Kou, Li, Gui, Suzuki-Gill — Playing with Streakiness in Online Games, CHI 2018 (DOI 10.1145/3173574.3174152)', 'https://www.researchgate.net/publication/322799172'],
  deng: ['Deng, Trepanowski et al. — Streaks and Coping: Decoding Player Performance in League of Legends, CHI PLAY 2024', 'https://trepo.tuni.fi/bitstream/10024/211780/1/Streaks_and_Coping._Decoding_Player_Performance_in_League_of_Legends_Using_Big_Data_from_Top_Players_Matches.pdf'],
  eomm: ['Chen et al. (EA) — EOMM: An Engagement Optimized Matchmaking Framework, WWW 2017', 'https://arxiv.org/abs/1702.06820'],
  d2pt: ['Dota2ProTracker — Radiant vs Dire, patch 7.41 (1,087,115 pub and 3,153 pro matches, 18 Oct 2026)', 'https://dota2protracker.com/radiant-dire'],
  meepo: ['Dotabuff — Meepo counters (19 Oct 2026)', 'https://www.dotabuff.com/heroes/meepo/counters'],
  huskar: ['Dotabuff — Huskar counters (19 Oct 2026)', 'https://www.dotabuff.com/heroes/huskar/counters'],
  semenov: ['Semenov, Romov, Korolev, Yashkov, Neklyudov — Performance of Machine Learning Algorithms in Predicting Game Outcome from Drafts in Dota 2, AIST 2016 (Springer 2017)', 'https://www.researchgate.net/publication/313010005'],
  openai: ['OpenAI — OpenAI Five Benchmark: Results, 5 Aug 2018', 'https://openai.com/index/openai-five-benchmark-results/'],
  conley: ['Conley, Perry — How Does He Saw Me? A Recommendation Engine for Picking Heroes in Dota 2, Stanford CS229, 2013', 'https://cs229.stanford.edu/proj2013/PerryConley-HowDoesHeSawMeARecommendationEngineForPickingHeroesInDota2.pdf'],
  kalya: ['Kalyanaraman — To win or not to win? A prediction model to determine the outcome of a Dota 2 match, UCSD CSE255, 2015', 'https://cseweb.ucsd.edu/classes/wi15/cse255-a/reports/wi15/Kaushik_Kalyanaraman.pdf'],
  ceur: ['Semenov et al. — Applications of Machine Learning in Dota 2: Literature Review and Practical Knowledge Sharing, CEUR-WS Vol-1842, 2017', 'https://ceur-ws.org/Vol-1842/paper_05.pdf'],
  wu: ['Wu Hao — Dota 2 pre-game prediction, Nanyang Technological University, 2020', 'https://dr.ntu.edu.sg/entities/publication/be15e66e-8de1-460b-a569-3053ebd97b88'],
  batru: ['batru.gg — Dota 2 prediction benchmark, 3,579,956 held-out ranked matches (publisher\'s own numbers)', 'https://batru.gg/dota2/benchmark'],
  hodge: ['Hodge et al. — Win Prediction in Multi-Player Esports: Live Professional Match Prediction, IEEE Transactions on Games, 2021', 'https://eprints.whiterose.ac.uk/id/eprint/152931/'],
  gosu: ['GosuGamers — Analyzing the first pick advantage at The International 2024 (datDota data)', 'https://www.gosugamers.net/dota2/features/73236-analyzing-the-first-pick-advantage-at-the-international-2024'],
  opendota: ['OpenDota API — /heroStats, win rate by bracket (19 Oct 2026)', 'https://api.opendota.com/api/heroStats'],
};
module.exports = {
  // 1 hill, 2 valve2019, 3 kou, 4 deng, 5 eomm, 6 d2pt, 7 meepo, 8 huskar, 9 semenov
  'why-i-keep-losing': [S.hill, S.valve2019, S.kou, S.deng, S.eomm, S.d2pt, S.meepo, S.huskar, S.semenov],
  // 1 openai, 2 conley, 3 kalya, 4 semenov, 5 ceur, 6 wu, 7 batru, 8 hodge, 9 d2pt
  'can-you-win-in-draft': [S.openai, S.conley, S.kalya, S.semenov, S.ceur, S.wu, S.batru, S.hodge, S.d2pt],
  // 1 meepo, 2 huskar, 3 gosu, 4 ceur, 5 semenov, 6 opendota, 7 batru, 8 d2pt
  'last-pick-counter-math': [S.meepo, S.huskar, S.gosu, S.ceur, S.semenov, S.opendota, S.batru, S.d2pt],
  // 1 huskar, 2 meepo, 3 kou, 4 semenov, 5 ceur, 6 hodge
  'cant-kill-this-hero': [S.huskar, S.meepo, S.kou, S.semenov, S.ceur, S.hodge],
};

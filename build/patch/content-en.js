const { tbl, stats, callout } = require('../articles/h');

module.exports = {
  tag: 'Patch 7.42',
  crumb: 'Patch 7.42',
  h1: 'Dota 2 patch 7.42: <span class="r">what matters for drafts and item builds</span>',
  metaTitle: 'Dota 2 patch 7.42: new items, builds and drafting changes | Outdraft',
  description: 'Patch 7.42 is hundreds of changes. Here is only what matters for picks and builds: 6 new items, Khanda and Javelin gone, 4 neutral tiers, reworked heroes.',
  card: 'Six new items, removed Khanda and Javelin, four neutral tiers: only the 7.42 changes that touch picks and builds.',
  data: 'Source: official 7.42 patch notes, 18 Nov 2026',
  lead: 'A patch like 7.42 arrives as hundreds of small edits to items, heroes, neutrals and the map. Reading them takes an evening, and the question that matters most, how they add up inside a draft, is not something the notes can answer. This page keeps only the changes that touch picks and item builds. What actually works will be decided by real matches: Outdraft builds its suggestions from match data, and the first 7.42 numbers will appear here in the next few days.',
  body: `
<h2>Patch 7.42 at a glance</h2>
<p>Valve released gameplay update 7.42 on 18 November 2026 [1]. It changes every one of the 127 heroes, rebuilds a good part of the shop and reshapes neutral items. For the draft and the item screen, these are the numbers to keep in mind:</p>
${stats([
  ['6', 'new shop items, plus the returning Quarterstaff'],
  ['3', 'shop items removed: Khanda, Javelin, Helm of the Overlord', true],
  ['3', 'hero abilities removed: Swiftslash, MegaMeepo, Drums of Slom', true],
  ['5 → 4', 'neutral item tiers'],
  ['13', 'neutral artifacts cycled out', true],
  ['120 → 200', 'base hero health'],
])}

<h2>Six new items: recipes and cost</h2>
<p>All six come from items you already know, so they slot into existing build paths rather than replace them outright [1][2].</p>
${tbl(['Item', 'Recipe', 'Cost', 'What it brings'], [
  ['<b>Bloodslinger</b>', 'Sage Mask, 2× Mantle of Intelligence, Blood Grenade, recipe 420', '925', '+100 health, +8 Intelligence, +1.25 mana regen. Sling Grenade: 1200 range, 30% slow that fades to 15% over 5 s, costs 75 health'],
  ['<b>Ristul’s Devotion</b>', 'Vladmir’s Offering, Splintmail, Voodoo Mask', '3800', '+8 armor. Aura in 1200 radius: 20% lifesteal, 18% spell lifesteal, 18% bonus damage, 2 armor, 1 mana regen'],
  ['<b>Caduceus</b>', 'Force Staff, Phylactery, recipe 600', '5400', 'Force Staff active. Your next targeted spell deals 175 bonus damage and slows an enemy by 40%, or heals an ally for 200 and speeds them up'],
  ['<b>Sabatons of Mordiggian</b>', 'Phase Boots, Armlet of Mordiggian, recipe 2000', '5950', 'Boots with +40 damage, +30 attack speed, +10 armor. Toggle drains 45 health/s for +40 damage, +30 Strength, +5 armor and up to 40% slow resistance'],
  ['<b>Skypiercer</b>', 'Heaven’s Halberd, Sange, Talisman of Evasion, recipe 300', '6000', '+35 Strength, 25% evasion, 25% slow resistance. 3 s Disarm whose cooldown runs faster near enemy heroes'],
  ['<b>Starforge</b>', 'Meteor Hammer, Ultimate Orb, recipe 450', '6000', '+24 Strength, +24 Agility, +40 Intelligence. Stronger Meteor Hammer (+15% max health damage); enemies burn and slow after your disables end'],
], [2])}
<p>Read on paper, Ristul’s Devotion and Caduceus are team items: one is an aura for a right-click lineup, the other turns the Phylactery path into something that also helps allies. Skypiercer and Sabatons are late, expensive answers for melee cores. Bloodslinger is a cheap early piece for Intelligence heroes and supports. Who should actually buy them, and when, is exactly what the first weeks of matches will show.</p>

<h2>Quarterstaff returns; Khanda, Javelin and Helm of the Overlord are gone</h2>
<ul>
  <li><b>Quarterstaff</b> is back: 900 gold, +10 damage and +10 attack speed. It now builds into Butterfly (5000, was 5450; replaces Claymore), Monkey King Bar (replaces Javelin) and Mask of Madness (1800, was 1900) [1].</li>
  <li><b>Javelin</b> is removed. Maelstrom takes a 900-gold recipe instead and still costs 2950. Bloodthorn no longer needs Javelin, costs 6250 and loses its Pierce passive. Monkey King Bar no longer gives melee heroes +50 attack range.</li>
  <li><b>Khanda</b> and <b>Helm of the Overlord</b> are removed from the game.</li>
  <li><b>Recipes that change build paths:</b> Heaven’s Halberd is now Ogre Axe + Helm of Iron Will (2400, was 3300), gives +12 Strength and no evasion. Abyssal Blade and Harpoon now build from Dragon Lance, and Dragon Lance gives melee heroes +25 attack range. Crimson Guard includes a Buckler and its aura. Sange, Yasha and Kaya cost 2000 each, so their combinations cost 4000.</li>
</ul>
${callout('', 'For builds', '<p>Builds saved from 7.41 can quietly break: any path through Javelin, Khanda or the old Butterfly, Abyssal Blade, Harpoon and Heaven’s Halberd recipes no longer exists in that form.</p>')}

<h2>Less spell power, more Item Potency</h2>
<p>Two system changes reach almost every build [1]:</p>
<ul>
  <li><b>Spell Power Reduction.</b> Items now add less to ability scaling (spell amplification, area of effect, cast range), and most magic and pure damage spells deal less. Examples: Kaya amplification 10% → 6%, Aether Lens cast range +225 → +200, Octarine Core cooldown reduction 25% → 20%, Shiva’s Guard slow 40% → 30%.</li>
  <li><b>Item Potency.</b> On-hit effects such as Desolator’s armor reduction, Eye of Skadi’s slow or Skull Basher’s bash chance now scale with the attack’s potency, 100% by default. Illusions have 20% potency and can now apply most on-hit effects (Skull Basher is one of the exceptions); Manta Style illusions have 35%, Illusion rune ones 40%.</li>
</ul>
<p>On paper, this takes some value away from magic burst built on amplification items and gives illusion heroes a new reason to buy on-hit items. How large either effect is in practice cannot be read from the notes.</p>

<h2>Neutral items: four tiers and pools known in advance</h2>
<ul>
  <li><b>Tiers:</b> 0:00, 15:00, 30:00 and 50:00; infinite Madstone from 65:00 [1].</li>
  <li><b>Pools:</b> each tier is split into pools, one artifact is picked from each, and all options are fixed at the start of the game. You can see them in the Neutrals tab of the shop, which makes it easier to plan item timings.</li>
  <li><b>New:</b> Red Ledger (tier 1), Brick (tier 2), Balmhook and Vile Phial (tier 3), Helm of the Hivemind (tier 4). <b>Returning:</b> Imp Claw and Safety Bubble (tier 2), Ceremonial Robe (tier 3), Flicker, Giant’s Ring and Mind Breaker (tier 4). Revenant’s Brooch is reworked into a tier 3 artifact.</li>
  <li><b>Cycled out (13):</b> Dagger of Ristul, Duelist Gloves, Occult Bracelet, Essence Ring, Medallion of Courage, Poor Man’s Shield, Searing Signet, Cloak of Flames, Flayer’s Bota, Giant’s Maul, Unrelenting Eye, Spider Legs and Stygian Desolator.</li>
</ul>

<h2>Heroes: removed abilities and moved Aghanim’s upgrades</h2>
${tbl(['Hero', 'Main change'], [
  ['Juggernaut', 'Swiftslash removed. Blade Fury now fully disarms him; Aghanim’s Scepter lets him attack during it for 75% damage'],
  ['Meepo', 'MegaMeepo removed. Meepo is now a Universal hero; Dig moves to Aghanim’s Scepter, and the Shard lets him pick up and fling a Meepo'],
  ['Beastmaster', 'Drums of Slom removed. Aghanim’s Scepter now summons an Ancient Thunderhide'],
  ['Lycan, Chaos Knight, Nyx Assassin', 'Innates removed: Apex Predator, Fundamental Forging and Mana Burn'],
  ['Abaddon, Death Prophet, Pugna, Sand King, Undying', 'Aghanim’s upgrades moved: Borrowed Time, Exorcism, Life Drain, Epicenter and Tombstone lose theirs; Mist Coil, Spirit Siphon, Oblivion Savant, Burrowstrike and the new Zombie Bite get one'],
])}
<p>For these heroes, matchup numbers from 7.41 describe a hero that no longer exists, so old counterpicks deserve a fresh look [1][3].</p>

<h2>Global changes that shift the draft</h2>
<ul>
  <li><b>Sturdier heroes:</b> base health 120 → 200; health per point of Strength 22 → 20; magic resistance per Intelligence 0.1% → 0.125%.</li>
  <li><b>Experience:</b> every hero passively gets 50 experience per minute after the horn, even while dead; level 30 now takes 66,600 experience instead of 64,400.</li>
  <li><b>Gold:</b> passive gold stays at 90 per minute instead of growing to 111 by 60:00; hero kill bounty changes from 125 + 8 × level to 100 + 10 × level; towers and Roshan give less.</li>
  <li><b>Tormentor:</b> first spawn at 15:00 instead of 20:00. Each kill drops the new Greater Horn of Battle, which summons a mega creep wave in every lane; from the second kill it also drops Aghanim’s Shard.</li>
  <li><b>Roshan:</b> the respawn timer shrinks by one minute after each kill, down to 5 minutes.</li>
  <li><b>Glyph:</b> 2 charges with a 6-minute replenish, no longer reset by losing buildings.</li>
  <li><b>Vision and ganks:</b> Smoke of Deceit holds 4 charges and restocks in 330 s; the Invisibility rune also grants a disguise against True Sight away from enemies.</li>
</ul>

<h2>What this means for picks, counterpicks and builds</h2>
<p>Each point below is a direction, not a verdict. Hundreds of changes interact with each other, and only matches show the result.</p>
<ul>
  <li><b>Early fights carry more margin.</b> With 80 more base health, level 1–3 kill combos have more room to fall short. How much this reshapes lanes is a question for the data.</li>
  <li><b>Magic versus physical.</b> Lower spell power and Item Potency on illusions both point the same way: a little less for burst-magic lineups, a little more for right-click and illusion carries.</li>
  <li><b>Habit builds break first.</b> Without Javelin and Khanda, and with new recipes for Butterfly, MKB, Abyssal Blade, Harpoon and Halberd, a familiar build may simply be impossible to assemble.</li>
  <li><b>Reworked heroes need new counters.</b> Juggernaut, Meepo, Beastmaster, Lycan, Chaos Knight and Nyx Assassin play differently enough that last patch’s matchups say little.</li>
  <li><b>Objectives come earlier.</b> Tormentor at 15:00 with a mega creep wave and a Shard, plus a shrinking Roshan timer, favours lineups that can take objectives early.</li>
</ul>

<h2 class="soon">Outdraft stats for 7.42: coming soon</h2>
${callout('od', 'In the next few days', `<p>Outdraft’s picks, counterpicks and item builds come from real match data, so after a patch the answer comes from fresh games rather than from reading notes. 7.42 matches are only starting to come in. As they accumulate, this page will get:</p>
<ul><li>how the new items perform, and on which heroes;</li><li>which heroes rose and fell compared with 7.41;</li><li>counterpicks that changed with the patch.</li></ul>
<p>The address stays the same, so it is worth saving.</p>`)}
`,
  faq: [
    ['When was Dota 2 patch 7.42 released?', 'On 18 November 2026. The full notes are on the official Dota 2 site [1].'],
    ['Which items were removed in 7.42?', 'Khanda, Javelin and Helm of the Overlord are gone from the shop, and 13 neutral artifacts were cycled out. Quarterstaff returned.'],
    ['What are the new items in patch 7.42?', 'Bloodslinger (925), Ristul’s Devotion (3800), Caduceus (5400), Sabatons of Mordiggian (5950), Skypiercer (6000) and Starforge (6000). Tormentor also drops a new consumable, Greater Horn of Battle.'],
    ['How many neutral item tiers are there in 7.42?', 'Four, at 0:00, 15:00, 30:00 and 50:00. All artifact options for a game are fixed at the start and shown in the Neutrals tab of the shop.'],
    ['Does Outdraft already have 7.42 statistics?', 'Not yet. Outdraft’s suggestions are built from real match data, and 7.42 matches are just starting to arrive. Numbers for the new patch will be added to this page in the coming days.'],
  ],
  ctaTitle: 'Let real matches read the patch',
  ctaText: 'Outdraft is a free Dota 2 overlay. It recognizes the draft on your screen and suggests picks, counterpicks and item builds drawn from real match data, so after a big patch it leans on fresh games rather than guesswork.',
  note: 'Every number on this page is taken from the official 7.42 patch notes. Statistics from real 7.42 matches will be added once there are enough games.',
};

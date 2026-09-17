---
title: Translate Leaf
description: Start a new language for the Leaf interface, or finish one that is partly done, using the template of every translatable string.
---

![中文](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FUtility-Muffin-Research-Kitchen%2FJawaka%2Fmain%2Fi18n%2Fcoverage.json&query=%24.languages.zh_CN.percent&suffix=%25&label=%E4%B8%AD%E6%96%87&color=7FB069&labelColor=0F160E&cacheSeconds=300) ![Français](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FUtility-Muffin-Research-Kitchen%2FJawaka%2Fmain%2Fi18n%2Fcoverage.json&query=%24.languages.fr_FR.percent&suffix=%25&label=Fran%C3%A7ais&color=7FB069&labelColor=0F160E&cacheSeconds=300) ![Español](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FUtility-Muffin-Research-Kitchen%2FJawaka%2Fmain%2Fi18n%2Fcoverage.json&query=%24.languages.es_MX.percent&suffix=%25&label=Espa%C3%B1ol&color=7FB069&labelColor=0F160E&cacheSeconds=300)

Leaf's interface is translated by people who use it. This page is how to start a
new language, or fill in one that is partly done. You do not need to build Leaf
or write any code.

If you only want to correct a line in a language that already ships, see
[Fixing a translation](/guide/language/#fixing-a-translation) instead. It is a
smaller job and does not need any of this.

## What you work from

Every translatable string lives in one generated file:

**[`i18n/leaf.pot`](https://github.com/Utility-Muffin-Research-Kitchen/Jawaka/blob/main/i18n/leaf.pot)**

It is a template, so every entry has an empty translation waiting to be filled
in. It is regenerated from the code, which means it is always the complete list -
if a string is not in there, it is not translatable yet, and that is a bug worth
reporting rather than something you can fix in the file.

The badges at the top of this page are how complete each language is, live from
the repository. A language sitting at 70 percent is not stalled, it is waiting
for someone.

## Starting a language

1. Download `leaf.pot` and rename it to your language code: `de_DE.po`,
   `pt_BR.po`, `ja_JP.po`. Use the `language_REGION` form.
2. Fill in the `msgstr ""` lines. Leave anything you are unsure of empty - an
   empty entry falls back to English, which is always better than a guess.
3. Send it in (see [Sending it in](#sending-it-in)).

An entry looks like this. The English is the key, so **never change `msgid`**:

```
#: internal/settings/settings.c
msgid "Auto Sleep"
msgstr "Reposo automático"
```

## Things that will bite you

These are the ones that have actually caused problems, not a general style guide.

**Keep the placeholders exactly.** `%s` is a word Leaf drops in, `%d` is a
number. They must survive into your translation, in a form that still makes
sense, or Leaf can crash when it draws that line. The tooling rejects a `%d`
that became `%s`, so a mistake here fails a check rather than reaching a device,
but it is still the easiest thing to get wrong.

```
msgid "%d games"
msgstr "%d juegos"
```

**Some keys carry a prefix before a `|`.** In `verb|Open`, only `Open` is the
text - the `verb|` part tells Leaf which of several identical English words this
one is. Keep the prefix in `msgid`, and put only the translation in `msgstr`.

**Leave the English in when you are not sure.** Mixed English is normal in a
translation in progress and nobody minds. A confidently wrong line is harder to
find later than an empty one.

**Space is tight.** Leaf draws on a 960x720 handheld screen, and a label that is
twice as long as the English will be cut off with an ellipsis. Where a shorter
phrasing is honest, prefer it.

**Some strings are hard to place.** A few only appear in one situation - a shader
caveat shown mid-game, an error you would have to break something to see. The
`#:` comment above each entry names the source file it comes from, which is
usually enough of a clue. If it is not, ask rather than guess.

## Testing it on the device

You do not have to wait for a release to see your work. Leaf reads a plain
tab-separated file from the SD card and prefers it over anything built in, so you
can drop a file on the card and restart.

1. Convert your `.po` to a `.tsv` of `English<TAB>translation` lines, one per
   line.
2. Put it on the SD card at `.umrk/mlp1/i18n/<your code>.tsv`, for example
   `.umrk/mlp1/i18n/de_DE.tsv`.
3. Restart Leaf. Your language appears in **Settings > System > Language** just
   from the file being there.

That is the same mechanism used to correct a shipped translation, so anything you
test this way behaves exactly as it will once merged.

## Sending it in

Open an issue on the
[Jawaka repository](https://github.com/Utility-Muffin-Research-Kitchen/Jawaka/issues)
with your `.po` attached, or say so on [Discord](https://discord.gg/leaf) and we
will take it from there. Tell us the name you want credited, or that you would
rather not be.

Partial work is welcome. Half a language that someone else can finish is worth
far more than nothing, and the coverage badge is there so the next person can see
where to pick it up.

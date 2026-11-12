---
title: Translate Leaf
description: Start a new language for the Leaf interface, or finish one that is partly done, using the template of every translatable string.
---

Leaf's interface is translated by people who use it. This page covers starting a new
language, or filling in one that is partly done. You don't need to build Leaf or
write any code.

To report a single wrong line in a language that already ships, see
[Fixing a translation](/guide/language/#fixing-a-translation).

## What you work from

Every translatable string lives in one generated file:

**[`i18n/leaf.pot`](https://github.com/Utility-Muffin-Research-Kitchen/Jawaka/blob/main/i18n/leaf.pot)**

It is a template, so every entry has an empty translation waiting to be filled in. It
is regenerated from the code, so it is always the complete list. If a string isn't in
there, it isn't translatable yet: report it instead of adding it to the file.

These are the languages that exist today, with how much of each is covered and its
current file:

<table id="leaf-translations">
  <thead>
    <tr><th>Language</th><th>Covered</th><th>Current file</th></tr>
  </thead>
  <tbody>
    <tr><td>Deutsch</td><td>50%</td><td><a href="https://raw.githubusercontent.com/Utility-Muffin-Research-Kitchen/Jawaka/main/i18n/de_DE.po">de_DE.po</a></td></tr>
    <tr><td>Español (México)</td><td>45%</td><td><a href="https://raw.githubusercontent.com/Utility-Muffin-Research-Kitchen/Jawaka/main/i18n/es_MX.po">es_MX.po</a></td></tr>
    <tr><td>Français</td><td>45%</td><td><a href="https://raw.githubusercontent.com/Utility-Muffin-Research-Kitchen/Jawaka/main/i18n/fr_FR.po">fr_FR.po</a></td></tr>
    <tr><td>Nederlands (België)</td><td>100%</td><td><a href="https://raw.githubusercontent.com/Utility-Muffin-Research-Kitchen/Jawaka/main/i18n/nl_BE.po">nl_BE.po</a></td></tr>
    <tr><td>Português (Brasil)</td><td>61%</td><td><a href="https://raw.githubusercontent.com/Utility-Muffin-Research-Kitchen/Jawaka/main/i18n/pt_BR.po">pt_BR.po</a></td></tr>
    <tr><td>Tiếng Việt</td><td>46%</td><td><a href="https://raw.githubusercontent.com/Utility-Muffin-Research-Kitchen/Jawaka/main/i18n/vi_VN.po">vi_VN.po</a></td></tr>
    <tr><td>Русский</td><td>62%</td><td><a href="https://raw.githubusercontent.com/Utility-Muffin-Research-Kitchen/Jawaka/main/i18n/ru_RU.po">ru_RU.po</a></td></tr>
    <tr><td>中文</td><td>93%</td><td><a href="https://raw.githubusercontent.com/Utility-Muffin-Research-Kitchen/Jawaka/main/i18n/zh_CN.po">zh_CN.po</a></td></tr>
    <tr><td>日本語</td><td>29%</td><td><a href="https://raw.githubusercontent.com/Utility-Muffin-Research-Kitchen/Jawaka/main/i18n/ja_JP.po">ja_JP.po</a></td></tr>
    <tr><td>한국어</td><td>100%</td><td><a href="https://raw.githubusercontent.com/Utility-Muffin-Research-Kitchen/Jawaka/main/i18n/ko_KR.po">ko_KR.po</a></td></tr>
  </tbody>
</table>

<script>
/* The table above is written out as real rows so the page is useful with no
   JavaScript, and is stale only until this runs. Reading coverage.json means a
   language added to Leaf appears here on its own, with no edit to this page. */
(async function () {
  var table = document.getElementById('leaf-translations');
  if (!table) return;
  var BASE = 'https://raw.githubusercontent.com/Utility-Muffin-Research-Kitchen/Jawaka/main/i18n/';
  /* Endonyms we prefer over what the browser produces ("中文", not "中文（中国）"). */
  var NAMES = { zh_CN: '中文', fr_FR: 'Français', es_MX: 'Español (México)', ja_JP: '日本語',
                vi_VN: 'Tiếng Việt', ru_RU: 'Русский', de_DE: 'Deutsch',
                nl_BE: 'Nederlands (België)', pt_BR: 'Português (Brasil)', ko_KR: '한국어' };
  try {
    var res = await fetch(BASE + 'coverage.json', { cache: 'no-cache' });
    if (!res.ok) return;
    var data = await res.json();
    var langs = Object.keys(data.languages || {});
    if (!langs.length) return;
    /* Resolve every name first, then sort by it, so the order always matches
       what is shown -- the same order the Language list uses in Leaf. */
    var items = langs.map(function (code) {
      var name = NAMES[code];
      if (!name) {
        try {
          name = new Intl.DisplayNames([code.replace('_', '-')], { type: 'language' })
            .of(code.split('_')[0]);
        } catch (e) { name = code; }
      }
      return { code: code, name: name };
    });
    items.sort(function (a, b) { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; });
    var rows = items.map(function (it) {
      return '<tr><td>' + it.name + '</td><td>' + data.languages[it.code].percent +
             '%</td><td><a href="' + BASE + it.code + '.po">' + it.code + '.po</a></td></tr>';
    });
    table.querySelector('tbody').innerHTML = rows.join('');
  } catch (e) {
    /* Offline, blocked, or GitHub having a moment: the written rows stand. */
  }
})();
</script>

Each file lists every string in the template. Anything nobody has translated yet is
there with an empty `msgstr ""`, so to finish a language, download its file from the
table and fill in the empty lines. Start from a fresh copy each time, since every new
string Leaf gains is added to every file. If you are partway through an older copy,
Poedit's **Translation > Update from POT File** with `leaf.pot` brings in the strings
added since.

## Starting a language

1. Download `leaf.pot` and rename it to your language code: `de_DE.po`,
   `pt_BR.po`, `ja_JP.po`. Use the `language_REGION` form.
2. Fill in the `msgstr ""` lines. Leave anything you're unsure of empty - an empty
   entry falls back to English.
3. Send it in (see [Sending it in](#sending-it-in)).

An entry looks like this. The English is the key, so **never change `msgid`**:

```
#: internal/settings/settings.c
msgid "Auto Sleep"
msgstr "Reposo automático"
```

## What to watch for

**Keep the placeholders exactly.** `%s` is a word Leaf drops in, `%d` is a
number. They must survive into your translation, in a form that still makes
sense, or Leaf can crash when it draws that line. A check rejects a `%d` that
became `%s` before it reaches a device.

```
msgid "%d games"
msgstr "%d juegos"
```

**Some keys carry a prefix before a `|`.** In `verb|Open`, only `Open` is the
text - the `verb|` part tells Leaf which of several identical English words this
one is. Keep the prefix in `msgid`, and put only the translation in `msgstr`.

**Space is tight.** Leaf draws on a 960x720 handheld screen, and a label that is
twice as long as the English is cut off. Prefer a shorter phrasing where one works.

**Some strings are hard to place.** A few only appear in one situation - a shader
caveat shown mid-game, an error you would have to break something to see. The
`#:` comment above each entry names the source file it comes from. If that isn't
enough of a clue, ask.

## Testing it on the device

You don't have to wait for a release to see your work. Leaf reads a plain
tab-separated file from the SD card and prefers it over the built-in translation. The
same file corrects a language that already ships, and it survives updates.

1. Convert your `.po` to a `.tsv` of `English<TAB>translation` lines, one per
   line.
2. Put it on the SD card at `.umrk/mlp1/i18n/<your code>.tsv`, for example
   `.umrk/mlp1/i18n/de_DE.tsv`.
3. Restart Leaf. A new language appears in **Settings > System > Language** from the
   file being there.

A string that contains a line break, such as a two-paragraph message, can't be written
as a single `.tsv` line, so it stays in English while you test.

## Sending it in

Open an issue on the
[Jawaka repository](https://github.com/Utility-Muffin-Research-Kitchen/Jawaka/issues)
with your `.po` attached, or say so on [Discord](https://discord.gg/q5F7cZ7KRp). Say
which name you want credited, or that you'd rather not be.

Partial work is welcome. The table above shows the next person where to pick it up.

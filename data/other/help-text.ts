

const books = `
    **Knihy:**

\t\`?bg 2.2\` - kapitola 2 verš 2
\t\`?bgi 2.2\` - kapitola 2 verš 2 (obrázková verzia)
\t\`?bg r\` - náhodný verš
\t\`?bgi r\` - náhodný verš (obrázková verzia)
\t\`?bg top\` - najviac zaujímave verše
\t\`?bgi top\` - najviac zaujímave verše (obrázková verzia)
\t\`?bgcz 2.2\` - kapitola 2 verš 2 (CZ)
\t\`?bgicz 2.2\` - kapitola 2 verš 2 (obrázková verzia, CZ)
\t\`?bgen 2.2\` - kapitola 2 verš 2 (EN)
\t\`?bgien 2.2\` - kapitola 2 verš 2 (obrázková verzia, EN)

\t\`?sb 2.2.2\` - spev 2 kapitola 2 verš 2
\t\`?sbi 2.2.2\` - spev 2 kapitola 2 verš 2 (obrázková verzia)
\t\`?sb top\` - najviac zaujímave verše
\t\`?sbi top\` - najviac zaujímave verše (obrázková verzia)
\t\`?sb r\` - náhodný verš
\t\`?sbi r\` - náhodný verš (obrázková verzia)

\t\`?cc 2.2.2\` - kniha 2 (madhya-lila) kapitola 2 verš 2
\t\`?cci 2.2.2\` - kniha 2 (madhya-lila) kapitola 2 verš 2 (obrázková verzia)
\t\`?cc r\` - náhodný verš z CC
\t\`?cci r\` - náhodný verš z CC (obrázková verzia)

\t\`?si 2\` - Sri isopanisad - 2 verš

\t\`?np 2\` - Nektár Pokynov - 2 verš

\t\`?brsm 2\` - Brahma Samhita - 2 verš
`

const mantras = `
    **Mantry:**

\t\`?mantras\` - vypíše mantry
\t\`?nazovmantry\` - hociaka mantra z predošleho prikazu (?mantras)
`

const numerology = `
    **Numerologia:**

\t\`?numname jakub bezak\` - vypočíta numerologicke menné číslo    
\t\`?numpsychic 3.3.2000\` - vypočíta numerologicke psychicke číslo    
\t\`?numdestiny 3.3.2000\` - vypočíta numerologicke osudové číslo    
výpočty robené podla knihy: https://www.pdfdrive.com/numerology-with-tantra-ayurveda-and-astrology-d176038913.html
`

const others = `
    **Vanipedia:**

\t\`?vanipedia ability\` - vypíše náhodny citát z kategorie (ability)
\t\`?vanipedia r\` - vypíše náhodny citát z kategorii
zoznam kategorií: https://vanipedia.org/wiki/Category:Essential_Subjects

    **Ostatné:**

\t\`?kv events\` - obrázok udalosti v tomto mesiaci
\t\`?kv events221\` - obrázok udalosti z roku 20(22), januara(1)

\t\`?sanskrit r\` - pošle náhodne sanskritske slovo ( z http://www.prabhupada-books.de/gita/glossary/glossary_complete.html )

\t\`?chatgpt kolko je 2 + 2\` - opytaš sa chatgpt, kolko je 2 + 2
\t\`?roll\` - vrati ti čislo 1-100

\t\`/createevent\` - vytvori udalost
\t\`/findQuote\` - nájde verš (bg, sb)`

const mantrasText = { books, mantras, numerology, others }

export default mantrasText
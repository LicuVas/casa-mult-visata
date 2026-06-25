# REGISTRU DE ADEVĂR — Google Ads casamultvisata.ro (după atac adversarial)
Metodă: triangulare. Fiecare afirmație a lui ChatGPT a fost ATACATĂ (cere sursă sau degradare) ȘI verificată independent de Claude Code pe surse oficiale Google (WebSearch). Adevărul nu depinde de niciun AI singur. 25 iunie 2026.
Principiu: AI-urile halucinează cu încredere — contează doar ce supraviețuiește atacului cu sursă.

## ✅ FAPTE care NU mai pot fi negate (verificate independent + sursă)
1. **Cifra „30 conversii" e OFICIALĂ Google — dar pentru EVALUARE, nu prag de pornire.**
   - Verificat independent (Google Ads Help): „we recommend driving at least 30 conversions per month, per ad group" pentru a atinge ținta consistent. Target CPA: ≥30 conversii/30 zile la nivel de campanie. Target ROAS: 50. Maximize Conversions: ~15.
   - Smart Bidding POATE funcționa și pe campanii noi fără date; cele 30 sunt recomandare de evaluare, nu „ai voie / n-ai voie".
   - ChatGPT a confirmat și el (98/100). **Convergență independentă → FAPT.**
2. **Keyword Planner fără spend activ = INTERVALE (10K-100K, 1K-10K), nu volume exacte.**
   - Verificat independent: confirmat de Google Ads Community + comportament; „parțial oficial" (nu o pagină de politică crisp). Volume exacte ⇒ campanie activă cu spend.
   - Bonus real (nemenționat de ChatGPT): workaround în meniul Forecast — setezi max CPC mare (~$99) → coloana Impressions ≈ proxy de volum.
3. **Bugetul se setează la nivel de CAMPANIE (sau buget comun), NU pe ad group.**
   - Sursă: Google Ads Help (citat de ChatGPT; fapt fundamental Google, necontestat). Control pe pilon real ⇒ campanii separate.
4. **Inventar real site (din repo, de necontestat):** 34 anunțuri — 12 Case, 12 Apartamente, 7 Terenuri, 3 Spații comerciale. Pagini-pilon fizice EXISTĂ deja în Astro; zone via `cartiere/[slug]`, anunțuri via `proprietati/[slug]`; `zone` e select (enum) în CMS.

## ⚠️ EURISTICI — degradate (ChatGPT a recunoscut: „inventat de mine, 0 surse")
- **Pragul de inventar 10+/6–9/1–5 pentru buget.** Nu există la Google. Euristică ChatGPT, neverificată extern. Utilă ca disciplină („nu plăti rafturi goale"), dar NU regulă. Utilitate practică ~45/100.

## 🟡 OPINII / JUDECĂȚI — de validat cu date înainte de a le crede
- **Keywords propuse** („case de vanzare piatra neamt" etc.): ipoteze semantice, **fără volume reale**. Sunt „keywords CANDIDATE", de verificat în Keyword Planner / Search Console — nu „keywords bune".
- **Split buget 40/40/20** (case/apartamente/terenuri): judecată tactică, nu calcul. Putea fi 50/30/20 sau altele. Se validează cu volum KP + CPC + Search Terms + cost-per-lead + calitate lead.
- **„olx" ca negative keyword:** RETRAS din recomandarea inițială. Presupunere riscantă (comparatorul poate fi cumpărător). Corect: pe watchlist în Search Terms → negative DOAR după date (cost > prag, clickuri fără lead).

## Ce rămâne valid din planul Ads, cu etichete corecte
Structura inventory-gated (case+apartamente buget principal, terenuri test, spații comerciale 0) rămâne rezonabilă — dar ca **opinie de start disciplinată**, nu ca adevăr. Numerele exacte (praguri, split, keywords) se validează cu date reale înainte de a cheltui.

## 🔒 CONFIRMARE 3 VENDORI (triangulare independentă)
Gemini, întrebat independent (fără a ști răspunsurile ChatGPT), a confirmat aceleași verdicte:
- 30 conversii = OFICIAL Google, prag de EVALUARE nu de pornire (poți porni cu 0; Target ROAS 15). [Smart Bidding - Google Ads Help]
- Keyword Planner fără spend = OFICIAL doar intervale; volume exacte doar cu spend recent + campanii active. [About Keyword Planner — „Limitele datelor"]
- Buget = OFICIAL strict la nivel de campanie (sau Shared budget); tehnic NU există plafon pe ad group. [About campaign budgets]
- Prag de inventar pe landing = NU există oficial; e CRO/bun-simț; Google nu penalizează o pagină cu 1 ofertă, cere doar relevanță + destinație validă. [Destination requirements - Google Ads Policies]

Convergență Claude (WebSearch surse oficiale) + ChatGPT (sub atac) + Gemini (independent) = adevăr triplu-confirmat.

## RUNDA 2 DE ATAC — CPC RON & promo (CPC + promoția)

### CPC & rata de conversie imobiliare RO
- ✅ **FAPT (3 vendori convergent):** NU există date oficiale Google la nivel de oraș pentru RO. Orice cifră e estimare din surse terțe.
- ⚠️ **Divergență între vendori (= incertitudine reală):** ChatGPT susține CPC 3–15 RON (15–25+ pe termeni competitivi); Gemini susține 1,5–4,5 RON. Surse terțe: DAFE Digital ~1,5–8 RON. Concluzie: **niciun număr punctual nu e de încredere** — planifică cu SCENARII, nu cu o cifră.
- 🟡 **Conversie:** WordStream ~2,5–3,28% (real estate, dar US). Onest pt site local nou: 0,5–2,5%, până la 4% dacă pagina+oferta sunt bune.
- **Model de calcul (ChatGPT, util):** cost/lead pe scenarii — pesimist 15 RON×0,5% = 3000 RON/lead; prudent 10×1% = 1000; acceptabil 7×2% = 350; bun 5×3% = 167.

### Promoția de credit Google Ads
- ✅ **FAPT (3 vendori + verificat de mine):** oferta NU e universală/automată pe orice cont nou. Trebuie creat contul printr-un link/banner promoțional sau introdus un cod; se verifică în **Facturare → Promoții**; cheltuiala dinainte de revendicare NU contează.
- ✅ **FAPT VERIFICAT (corectează planul + corectează AI-urile):** suma NU e fixă — există **mai multe trepte** în RO 2026: 1500 RON la 1500 RON (specific conturilor legate de Google Partner) ȘI oferte mai mari (ex. ~9000 RON cheltuiți → ~4500 RON credit). Deci „1500+1500 universal" din planul inițial e GREȘIT ca regulă generală.
- ❌ **HALUCINAȚIE PRINSĂ:** Gemini a „corectat" cu „2000 RON la 2000 RON" — **NU s-a confirmat** în verificarea mea (am găsit 1500/1500 partner-linked și 9000→4500, nu 2000/2000). Lecție: până și „corecția" unui AL DOILEA AI poate fi inventată; doar sursa primară decide.

## Concluzie metodologică
Atacul a funcționat: din 5 afirmații confidente, 1 a rezistat ca fapt oficial (30 conversii, încadrată corect), 1 ca fapt parțial-oficial (KP intervale), iar 3 s-au degradat la euristică/opinie. Lecția: nu accepta niciodată un număr „confident" de la un AI fără sursă — forțează FAPT/EURISTICĂ/OPINIE.

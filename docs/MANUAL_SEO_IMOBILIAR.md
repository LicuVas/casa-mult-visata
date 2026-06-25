# Manual SEO Imobiliar Local — casamultvisata.ro

> **Document viu / suport de curs.** Strânge tot ce am învățat despre SEO/AEO local pentru un
> site imobiliar (din sursele NotebookLM 2009→2026 + audituri + munca reală pe casamultvisata.ro).
> **Se consultă la fiecare task SEO** și **se actualizează cu strat datat** (vezi Changelog la final).
> Nu șterge straturi vechi — adaugă deasupra. Anchor de proiect: dosarul Cozma + skill `/seo`.
>
> Început: 2026-06-25 · Ultima revizuire: 2026-06-25

---

## 0. Cum folosești manualul

- **Înainte de orice recomandare SEO pe acest site** → citește Partea III (starea reală) ca să nu
  recomanzi ce e deja făcut. *Lecția zilei: am „pierdut" 3 runde spunând că GBP nu există / că lipsesc
  lucruri care erau deja pe site, pentru că vorbeam din rezumat, nu din realitate.*
- **Pentru „de ce nu apar / nu rankez"** → Partea I cap. 1 (indexare ≠ ranking ≠ AI) decide în ce
  găleată cade problema și deci ce fix se aplică.
- **Pentru un site nou / alt client imobiliar** → Partea IV cap. 14 (playbook reutilizabil).
- Fiecare afirmație tehnică despre site trebuie **verificată live/disk**, nu din memorie.

---

# PARTEA I — TEORIA (cum funcționează căutarea azi)

## 1. Legea-rege: indexare ≠ ranking ≠ citare AI

Trei lucruri DIFERITE, cu fix-uri DIFERITE. Nu le amesteca niciodată:

| Întrebare | Înseamnă | Unde se rezolvă |
|---|---|---|
| **E indexat?** | Google are pagina în index | On-site/tehnic (robots, noindex, canonical, sitemap, JS) — **noi controlăm** |
| **Rankează?** | Apare SUS la o căutare | Off-page: proeminență, recenzii, linkuri, timp, brand — **mai mult NU se rezolvă în cod** |
| **E citat de AI?** | ChatGPT/Gemini/Perplexity îl folosesc ca sursă | AEO/GEO: llms.txt, schema, entitate, mențiuni — **parțial controlăm** |

**Niciodată nu promite poziții.** Spune ce putem mișca (semnale tehnice, schema, pagini locale) și ce
mișcă doar timpul/off-page. *Promisiunea de ranking = neetic + neverificabil.*

**Caz-școală (casamultvisata, iunie 2026):** site indexat, 57 clicuri — DAR toate pe nume (brand);
la căutări de descoperire („apartamente piatra neamt") = 0 clicuri. Deci NU e problemă de indexare,
ci de ranking/proeminență. Două probleme diferite, confundate ușor.

## 2. Cum decide Google azi (interpretarea scurgerilor din procesul DOJ 2024-2026)

> Sursă: distilarea Hobo a documentelor din procesul DOJ vs Google. E **interpretarea industriei**,
> nu documentație oficială Google — tratează ca model de lucru solid, nu ca adevăr absolut.

- **Q\* (Quality / Trust per domeniu):** încredere la nivel de site — „Despre noi" real, HTTPS, brand
  autentic, transparență. Dacă Q* ≈ 0 (site anonim, fără identitate), site-ul **nu rankează** pe YMYL.
- **P\* (Popularity):** brand căutat + linkuri de la site-uri mari/reale.
- **T\* (Topicality / relevanța ABC):** baza on-page (cuvintele de pe pagină) — DAR puternic modulată de…
- **Navboost:** semnalele de **click reale**. Un titlu bun → CTR mai mare → Navboost ridică pagina.
  *De-aici pârghia „preț în title": prețul e cel mai puternic declanșator de click la imobiliare.*

**Concluzie operațională:** on-page (T*) e necesar dar nu suficient; trust-ul (Q*) e poarta pe YMYL;
clicurile reale (Navboost) decid coada. Conținut subțire / fără identitate = ratare algoritmică.

## 3. E-E-A-T & YMYL — de ce contează dublu la imobiliare

**YMYL** = „Your Money or Your Life". Imobiliarele = tranzacții financiare uriașe → intră direct sub
YMYL → Google cere dovezi de încredere mai stricte. **E-E-A-T** = Experiență, Expertiză, Autoritate,
**Încredere** (Trust = pilonul central, restul îl susțin).

Ce cere concret (și ce am implementat pe casamultvisata — vezi Partea III):
- **Cine** deține? → pagina „Despre" cu identitate reală + foto + bio.
- **Date legale** → PFA/CUI/reg.com. vizibile (footer + pagini legale).
- **Adresă & contact** transparente; politici (confidențialitate, cookies, termeni).
- **Autor + dată** pe conținutul informativ (ghiduri) = semnal de prospețime + responsabilitate.
- **Politică editorială** = transparență despre cum se face conținutul (inclusiv folosirea AI).

## 4. Ce a rămas valabil (2009→2026) vs ce e MORT

**Rămâne valabil (fundația):**
- Conținut relevant pentru intenția utilizatorului (informațional / navigațional / tranzacțional).
- `<title>` + meta description bine scrise (acum hrănesc și CTR/Navboost).
- Structură logică / silozuri / linkuri interne / breadcrumbs.
- Conținut **unic și original** (azi e chestiune de viață-și-moarte din cauza Helpful Content Update).
- Viteză + mobile (Core Web Vitals).

**MORT / riscant (nu face — atrage penalizări):**
- **Keyword stuffing** („case PN, vile PN, imobiliare PN" repetat) → Panda/HCU.
- **Meta keywords** (`<meta name=keywords>`) — ignorat din 2009. Pierdere de timp.
- **Scheme de linkuri** / cumpărare linkuri / directoare slabe → Penguin.
- **Doorway pages** (pagini-poartă goale pe oraș/județ create doar pt trafic) → Spam.
- **Article spinning** / sindicalizare de calitate slabă → recunoscut ca „copiat cu modificări minime".
- **Schema Review proprie pe site** care se auto-dă stele → Google taie stelele + risc de flag.
  *(Recenziile-stele vin din GBP, nu din schema de pe site.)*

## 5. AEO / GEO — vizibilitate în motoarele AI + Mentions Economy

Motoarele AI (ChatGPT, Gemini, AI Overviews, Perplexity) lucrează cu **entități** și cu surse pe care
le pot cita. Ținta: site-ul devine **„Sursa Canonică a Adevărului"** despre entitatea ta.

- **`llms.txt`** = fișier canonic pt crawlerele AI (entitate, servicii, contact, CUI, sameAs, sitemap).
- **robots.txt deschis pt AI** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) = lasă AI-ul să citească.
- **Schema completă** = AI-ul preia date corecte de la tine, nu „halucinează".
- **Mentions Economy:** o **mențiune** a brandului în presa locală (chiar FĂRĂ link) = dovada de
  consens pe care AI-ul o caută. Mențiunile ne-linkate au devenit „aur curat".
- **Tehnica „Cyborg":** draft cu AI → editare umană severă pt E-E-A-T (fapte verificate de om).

## 6. SEO Local & Google Business Profile (Map pack)

Căutările imobiliare sunt geografice. **Ranking local Google = relevanță + distanță + proeminență**
(proeminența = recenzii + completitudine + vechime pe hartă + linkuri).

**Lecția cheie despre GBP (învățată dur pe casamultvisata):**
- A fi „pe Google" (căutare pe nume) ≠ a fi „pe Google companii / hartă". Sunt lucruri diferite.
- Ca să apari în lista „imobiliare <oraș>" de pe hartă, profilul TREBUIE să aibă **adresă fizică = pin**.
- Un profil **service-area „Fără locație" NU primește pin** → nu apare în acea listă, **oricâte recenzii**.
  (Dovadă: un concurent cu 1 recenzie apărea, fiindcă avea adresă; profilul fără adresă nu apărea deloc.)
- Fix: adaugă o adresă reală → reverificare Google → pin → apari în listă. Compromis: adresa devine **publică**.
- Recenziile sunt pârghia de **proeminență** (urcă în Map pack) DUPĂ ce ai pin. Primele 5-6 mișcă cel mai mult.
- **Politica recenzii 2026:** fără cadouri/stimulente, fără „menționează numele agentului", fără tabletă/kiosk
  pe loc, fără review-gating (să ceri doar celor mulțumiți). Permis: trimite linkul/QR tuturor clienților reali.
- **Q&A a fost desființat** (nov 2025). Acum „Ask Maps" (AI) răspunde din profil+recenzii+site → completitudinea
  profilului hrănește direct răspunsurile AI.

---

# PARTEA II — APLICAT pe un site imobiliar local

## 7. Arhitectură on-page

- **Silozuri clare:** Homepage → categorii (apartamente / case / terenuri / spații) → proprietăți.
- **Pagini hiperlocale pe cartiere/zone** („case de vânzare <cartier> <oraș>") — acolo portalurile
  (imobiliare.ro/OLX/Storia) sunt subțiri = fereastra noastră reală. Conținut non-banal, geografic real.
- **`<title>` 50-60c, meta 150-160c, exact 1 `<h1>`** per pagină.
- **Pattern title cu PREȚ** pe paginile de proprietate: `<titlu client> – <preț>, <zonă> | brand`.
  Prețul = declanșator de click (Navboost). Dedup zona dacă-i deja în titlu.
- **Linkuri interne** categorie ↔ cartier ↔ proprietate (distribuie autoritatea tematică).

## 8. Tehnic & structured data

Checklist (toate prezente pe casamultvisata — vezi Partea III):
- HTTPS + HSTS · robots.txt (deschis + AI) · sitemap submis · llms.txt.
- Imagini optimizate la build (webp/avif responsive, lazy, width/height = zero CLS). *Sursele grele JPG
  nu contează dacă build-ul livrează webp/avif via CDN — nu comprima manual.*
- **Schema (JSON-LD):** RealEstateAgent, LocalBusiness, Organization, WebSite+SearchAction, FAQPage,
  BreadcrumbList, ItemList, CollectionPage, RealEstateListing+Offer+price.
- GA4 consent-gated (GDPR). Search Console pt monitorizare clicuri/afișări.

## 9. Conținut

- **Ghiduri de cartier** = conținut informativ hiperlocal cu autor + dată (E-E-A-T).
- **Outbound links editoriale** către surse oficiale relevante (ANCPI/Primărie/Notari) pe paginile
  informative = semnal de calitate. URL-uri REALE, verificate (nu inventate).
- **Politică editorială / AI** = pagină de transparență (cine scrie, cum verifici, folosirea AI).
- **Blog** (proces/legal/fiscal + market report) = trafic informațional + topical authority.
  *NU* articole geo per-cartier (canibalizează paginile /cartiere).
- **Descrieri proprietăți** = treaba CLIENTULUI (el editează anunțurile); noi dăm template, nu scriem în locul lui.

---

# PARTEA III — casamultvisata.ro: STAREA VIE

> Snapshot verificat pe disk+live. **Actualizează la fiecare schimbare.** Raport delta complet:
> `C:\00\AI_0\data\seo_audits\casamultvisata_20260625_notebooklm_delta.md`.

## 10. Stare reală (snapshot 2026-06-25)

**✅ DEJA FĂCUT (nu reface):** arhitectură categorii · identitate Cozma (foto+bio) · date fiscale PFA
(CUI 50412580) · GDPR (confidențialitate/cookies/termeni) · schema completă (toate tipurile de la cap. 8)
· HTTPS+HSTS · robots+AI · sitemap · llms.txt · GA4 consent-gated · imagini webp/avif la build · width/height
100% · 5+1 ghiduri cartiere (Centru/Precista/Mărăței/Dărmănești/1 Mai + **Dumbrava Roșie**) + index silo ·
recenzii afișate (3×5★, fără schema Review proprie = corect) · social în footer + sameAs · 404 custom util ·
**author byline + dateModified pe ghiduri** · **pattern title cu preț pe proprietăți** · **pagină Politică
Editorială/AI** · **outbound links oficiale (ANCPI/Primărie/Notari) pe ghiduri**.

**🟡 TODO REAL (al nostru, aditiv):**
1. **Blog editorial** (`/blog` lipsește) — articole proces/legal/fiscal + market report.
2. **streetAddress + postalCode în JSON-LD** (`Layout.astro`, ambele PostalAddress au doar addressLocality)
   — DE FĂCUT **după** ce GBP primește pinul + cod poștal; string adresă IDENTIC peste GBP+schema+legale.
3. (extinderi viitoare de ghiduri pe alte zone cu inventar, dacă apar.)

**🚫 CLIENT-SIDE (Cozma, în CMS):** 300+ cuvinte/anunț; rescrierea câmpului `title` al anunțului cu cuvinte-cheie.

**⛔ WRONG/RISKY (recomandări de ignorat):** pagină „Echipă/Brokeri" (Cozma e PFA, un singur operator) ·
reinstalare GA4 (există) · comprimare manuală JPG / migrare astro:assets (CDN o face) · schema Review proprie
(risc flag).

## 11. Pârghii rămase, prioritizate (impact real)

1. **GBP: service-area → adresă cu pin** (decizie 25.06: adresa de domiciliu) + facilitare **recenzii noi**
   (link/QR `GBP_poze\`). → cel mai mare impact pe „apare pe hartă + Map pack". *Interfață GBP + Cozma; noi ghidăm.*
2. **Blog** (topical authority + AEO).
3. **streetAddress în schema** (după pin).
4. Mențiuni presă locală (Mentions Economy) — *outreach Cozma*.

## 12. Constrângeri & reguli de proiect (OBLIGATORII)

- **NU edita anunțurile** `src/content/proprietati/*.md` — clientul le editează singur în CMS (Sveltia).
  Tot ce ține de listinguri se face la nivel de **template**, nu de conținut.
- **DEPLOY ≠ push GitHub.** Netlify face build din git-ul LUI intern (`nsvcs.net`), NU din GitHub
  (acela e doar backup). **Metoda corectă:**
  `npm run build && netlify deploy --prod --no-build --dir=dist --site=661dcad7-eac6-4f24-9249-4536939163e3`
  apoi **verifică live cu curl+marker** pe domeniul real. (Site ID: `661dcad7-eac6-4f24-9249-4536939163e3`.)
- **GBP:** profil verificat din aug 2024, ~80% optimizat; tutorial + capturi în
  `C:\00\AI_0\Tutorials\Google_Business_Profile_optimizare_agentie_imobiliara`; pachet texte/poze/QR în
  `C:\00\Antigravity\Sites\CozmaVasile\Docs\GBP_poze\`. Cont firmă `casamultvisata.ro@gmail.com`.
- **Drept la imagine:** poze cu persoane pe site comercial = consimțământ (verifică înainte de go-live).
- **Concurează cu omonimul** `casatamultvisata.ro` (firmă construcții Cluj) pe brand.

---

# PARTEA IV — Operare

## 13. Capcane MĂSURATE (greșeli din 25.06 — nu le repeta)

- **Am vorbit din dosarul DISTILAT și am ghicit greșit de 2-3x** (am zis că GBP nu există; că lipsesc
  lucruri care erau pe site). → La subiect numit: **rulează `recall.py` + deschide artefactele/Tutorials
  ÎNAINTE** de a afirma starea. Rezumatul comprimat poate omite faptul decisiv.
- **GBP există ≠ apare pe hartă.** Cauza reală a invizibilității = service-area fără adresă (fără pin),
  NU lipsa profilului, NU numărul de recenzii.
- **GitHub push ≠ deploy Netlify** (build din git intern). Verifică LIVE, nu presupune.
- **WebFetch strips `<head>`** la audit SEO → folosește curl/Read pt title/meta/canonical/schema.
- **Rapoartele SEO AI (NotebookLM/Gemini) halucinează** „de făcut" lucruri deja făcute → confruntă
  fiecare recomandare cu realitatea pe disk/live înainte de a acționa.
- **Nu comprima manual imaginile** dacă build-ul deja livrează webp/avif (CDN).

## 14. Playbook reutilizabil (alt site imobiliar local)

1. **Due-diligence:** ce indexare/ranking are deja (GSC), ce GBP are, ce arhitectură.
2. **Confruntă cerințele cu realitatea** (audit delta DONE/TODO/CLIENT/WRONG) — nu reface ce există.
3. **On-site:** silozuri + pagini hiperlocale pe zone cu inventar + title cu preț + schema completă + llms.txt.
4. **Trust (YMYL):** Despre/Contact/Politici/identitate legală/Politică editorială.
5. **Local:** GBP cu adresă→pin + recenzii (politica 2026) + NAP consistent.
6. **Off-page (long game):** mențiuni presă locală, brand, timp.
7. **Deploy verificat live**, draft-then-prod, fără promisiuni de ranking.

## 15. Surse + Changelog

**Surse NotebookLM (PDF-uri SEO, 2009→2026):** Hobo Guide V1 (2009), 2013, 2016 (intro Quality Rater
Guidelines + YMYL + Panda), 2018 (E-A-T + intenție + anti-doorway), Google SEO Starter Guide, Hobo-Beginner-
SEO-2025 (Q*/P*/Navboost/HCU), Hobo-Strategic-AiSEO-2025 + hobo-strategic-seo-2025 (Canonical Source of Truth,
Cyborg, Mentions Economy).
**Prompt tunat pt NotebookLM** (produce delta, nu generalități): în raportul delta de pe disk (cap. 10).

### Changelog
- **2026-06-25** — Creat manualul. Livrat & verificat LIVE pe casamultvisata: author byline + dateModified
  pe ghiduri; pattern title cu preț pe proprietăți; fix email rupt (despre); ghid hiperlocal Dumbrava Roșie;
  pagină Politică Editorială/AI; outbound links oficiale (ANCPI/Primărie/Notari) pe ghiduri. Documentat:
  metoda de deploy corectă (Netlify direct, nu GitHub) + site ID. *Următor: blog + GBP pin + streetAddress.*

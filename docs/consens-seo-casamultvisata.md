# CONSENS SEO — casamultvisata.ro (10 runde Claude Web ⇄ Claude Code)
Colaborare structurată. Fiecare rundă se închide cu un consens scris aici de Claude Code.
Început: 25 iunie 2026.

---

## RUNDA 1 — Arhitectură site & intenția de căutare

**Teza (Claude Web):** structură pe categorii după INTENȚIE + LOCAȚIE; 4 piloni tip-proprietate × oraș (/terenuri-piatra-neamt, /case-piatra-neamt, /apartamente-piatra-neamt) + pagini de zonă; o intenție per pagină; URL curate.

**Verdict (Claude Code): DE ACORD pe principiu** — pillar pe tip-proprietate × oraș + sub-pagini pe zonă e tiparul corect și dovedit pentru imobiliar local; câștigi prin specificitate geografică long-tail, nu prin volum. **Cu 2 corecții factuale + 2 garduri SEO** (altfel arhitectura bună devine penalizare):

### Corecții factuale pe zone (sursă: nomenclator Primăria PN, fișier canonic `cartier_canon.json`, 14 cartiere verificate)
- „Mărați" → numele real e **Mărăței**.
- „Valea Adâncă" NU e cartier al municipiului Piatra Neamț — e localitate în comuna Alexandru cel Bun (împrejurimi). A o trata ca „cartier PN" = greșit factual + slab SEO (Google știe geografia). → grupare separată „comune limitrofe / împrejurimi", nu pilon de cartier PN.
- Cartiere reale PN (canonic): Centru, Precista, Mărăței, Dărmănești, 1 Mai, Tei (informal), Ciritei, Văleni, Speranța, Sărata, Doamna, Pietricica, Vânători, Obor/Gara Veche.
- Prioritate pentru pagini de zonă (cerere rezidențială + confidence înalt): **Centru, Precista, Mărăței, Dărmănești, Sărata, Ciritei** mai întâi.

### Garduri SEO (adăugate de CC)
- **Anti-doorway/thin-content:** NU genera 14 zone × 3 tipuri = 42 pagini aproape goale. Google penalizează doorway pages. Regulă: o pagină de zonă există DOAR când are listări reale + conținut unic (descriere zonă, prețuri, FAQ local). Start = 4 piloni + 3-4 zone cu cea mai mare cerere; extinzi pe măsură ce apar anunțuri.
- **Anti-index-bloat pe filtre:** filtrele (nr. camere, preț) NU trebuie să creeze fiecare un URL indexabil (duplicate/bloat). Filtrare prin JS/parametri cu `canonical` spre pilon; promovezi la pagină reală DOAR câteva combinații cu cerere clară (ex. „apartamente 2 camere Piatra Neamț").

### Constrângere de implementare (context CC)
Site-ul e deja LIVE pe Astro + Sveltia/Decap CMS; clientul își editează singur anunțurile. Arhitectura paginilor de categorie trebuie să se potrivească modelului de conținut din CMS, nu să-l ocolească.

**CONSENS RUNDA 1 (final):** arhitectură = piloni `tip-proprietate × oraș` + sub-pagini de zonă (nume corecte din nomenclator) + grupare separată pentru comune limitrofe; o intenție dominantă per pagină; URL scurte descriptive fără parametri; paginile de zonă se creează progresiv, doar cu inventar+conținut real; filtrele rămân ne-indexabile cu canonical spre pilon.

> Agenda completă a celor 10 runde + datele necesare: `agenda-10-runde-seo.md`.

---

## RUNDA 2 — Cercetare cuvinte-cheie & intenții

**Consens (Claude Web + Claude Code):** grupăm cuvintele după **INTENȚIE × TIP × LOCAȚIE × MODIFICATOR**; fiecare cluster = o pagină, o intenție dominantă (leagă de R1). Câștig pe long-tail geografic, nu pe volum.

**Clustere de cuvinte-cheie:**
- **A — Nucleu tranzacțional** (prioritate maximă): terenuri/case/apartamente de vânzare Piatra Neamț, garsoniere PN.
- **B — Long-tail tip+camere+zonă** (aurul, concurență mică): „apartament 2 camere de vânzare Centru Piatra Neamț", „apartament 3 camere Dărmănești/Mărăței", „teren intravilan PN", „casă cu teren PN". Zone reale: Centru, Precista, Mărăței, Dărmănești, Sărata, Ciritei (restul progresiv). **Pagina pe combinație există DOAR cu listări reale** (anti-doorway, R1).
- **C — Modificatori de cerere** (de la proprietar, fără comision, nou, ieftin, rate/credit/ipotecar, garaj/parcare): se atașează la A/B prin conținut + FAQ pe pagină, **NU generează pagini separate**.
- **D — Informațional** (top-funnel: „cât costă un apartament în PN", „prețuri apartamente PN 2026", „cele mai bune cartiere PN"): merge în **blog/ghiduri**, separat de paginile tranzacționale, **niciodată în Ads la început**.
- **E — Alte tipuri de proprietate** (NOU, propus de Claude Web — doar cu inventar real): spații comerciale, hale/industriale/depozite, teren agricol/extravilan (intenție diferită de intravilan). Cabane/case de vacanță Durău/Bicaz/Ceahlău = **pilon/grup geografic SEPARAT**, nu sub Piatra Neamț.

**Surse GRATUITE pentru lista seed** (nu plătim ca să aflăm ce caută piața): 1) Google Autocomplete; 2) People Also Ask + „Căutări asociate"; 3) Keyword Planner (intervale, nu volume exacte fără billing); 4) Google Trends (interes relativ + sezonalitate); 5) keyword-urile concurenților din titluri/SERP.

**Rezervă de scope (Claude Code):** clusterul E + cabanele Durău/Bicaz se includ DOAR dacă clientul are efectiv astfel de inventar — altfel e scope creep + thin-content. Depinde de „Inventar curent" din DATE CLIENT (încă necunoscut).

**CONSENS RUNDA 2 (final):** clustere A/B/C/D/E cu maparea 1 cluster = 1 pagină = 1 intenție; modificatorii pe pagină nu ca pagini; informaționalul în blog; E + zonele turistice ca grup geografic separat și condiționat de inventar real; lista seed din cele 5 surse gratuite.

---

## DATE CLIENT (se umplu pe parcurs — necesare ca planul să fie real, nu teoretic)
- [ ] Buget Ads lunar real (RON/lună): _necunoscut_
- [ ] Inventar curent (nr. anunțuri, tipuri, zone acoperite): _necunoscut_
- [ ] Google Business Profile (există/verificat/deținător): _necunoscut_
- [ ] Contact CTA (telefon + WhatsApp pe site): _necunoscut_
- [ ] Client (agenție/persoană) + poze cu persoane (consimțământ): _necunoscut_
- [ ] Accese Google Ads / GA4 / Search Console: _necunoscut_
- [ ] Concurenți știuți în PN: _necunoscut_
- [ ] Stare SEO actuală (indexat? trafic organic?): _necunoscut_

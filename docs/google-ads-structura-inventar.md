# GOOGLE ADS — structură de campanie ANCORATĂ în inventarul real
Sursă: dialog AI-to-AI (Claude Code ⇄ ChatGPT), 25 iunie 2026. Grounded pe repo-ul real (34 anunțuri).
Principiu central ChatGPT: **inventarul = filtru de buget.** „Nu dăm bani ca să promovăm rafturi goale. Google poate aduce oameni în magazin; nu poate inventa marfă pe raft."

## Inventar real (din src/content/proprietati, 34 anunțuri)
| Pilon | Inventar | Decizie Ads |
|---|---|---|
| Case | 12 | DA — buget principal |
| Apartamente | 12 | DA — buget principal |
| Terenuri | 7 | DA, test limitat |
| Spații comerciale | 3 | NU acum (pilon general) |

## Prag operațional de inventar pentru trafic plătit
| Nivel | Inventar activ/pilon | Decizie |
|---|---|---|
| 🟢 Verde | 10+ | buget principal |
| 🟡 Galben | 6–9 | buget mic, doar exact/phrase, test controlat |
| 🔴 Roșu | 1–5 | fără buget pe pilon; doar SEO/GBP sau reclamă pe anunț individual |

**Pragul concret:** sub 6 listări active → fără buget plătit general; 6–9 → doar test mic; 10+ → buget principal.

## Structură la 30 RON/zi (2 campanii)
- **Campania 1 — CMV_Search_Rezidential_PN_Core** (25 RON/zi): ad group Case → `/case-de-vanzare-piatra-neamt/` (~13), ad group Apartamente → `/apartamente-de-vanzare-piatra-neamt/` (~12). Notă: bugetul NU se setează pe ad group — control prin keywords/match/CPC cap; pentru split dur → campanii separate.
- **Campania 2 — CMV_Search_Terenuri_PN_Test** (5 RON/zi): ad group Terenuri → `/terenuri-de-vanzare-piatra-neamt/`, exact+phrase.
- **Spații comerciale:** 0 RON/zi (pauză) — doar SEO până la ≥6 listări (ideal 8–10). Excepție: reclamă pe anunț individual dacă o ofertă e foarte bună.

## Structură la 50 RON/zi (4 campanii separate, control mai curat)
| Campanie | Buget | Status |
|---|---|---|
| Search — Case PN | 20 RON/zi | Activ |
| Search — Apartamente PN | 20 RON/zi | Activ |
| Search — Terenuri PN | 10 RON/zi | Activ limitat |
| Search — Spații comerciale PN | 0 RON/zi | Pauză |

## Keywords (phrase + exact, NU broad la început)
- **Case** → `/case-de-vanzare-piatra-neamt/`: „case de vanzare piatra neamt", [case de vanzare piatra neamt], „casa de vanzare piatra neamt", „vila de vanzare piatra neamt", „case piatra neamt", „case de vanzare neamt".
- **Apartamente** → `/apartamente-de-vanzare-piatra-neamt/`: „apartamente de vanzare piatra neamt", „apartament 2/3 camere piatra neamt", „garsoniera piatra neamt".
- **Terenuri** → `/terenuri-de-vanzare-piatra-neamt/`: „teren de vanzare piatra neamt", „teren intravilan piatra neamt", „teren constructii piatra neamt" (doar phrase/exact).
- **Spații comerciale:** fără campanie de pilon acum.

## Negative keywords din prima
chirie, inchiriere, gratis, olx, job, angajari, model contract, curs, pdf, harta, program, primarie, licitatie, executare silita. (Atenție la „olx" — taie trafic de comparație; ok la început.)

## Reguli de decizie după 14–30 zile (optimizăm după LEAD-uri, nu impresii)
| Situație | Decizie |
|---|---|
| Case au clickuri + lead-uri | crește bugetul la case |
| Apartamente clickuri dar 0 lead-uri | verifică pagina/preț/CTA, nu doar campania |
| Terenuri >20% buget și 0 lead-uri | pauză sau exact-match only |
| Spații comerciale ajung la 6+ / 8–10 listări | test 5 RON/zi / campanie normală |
| CTR slab + căutări irelevante | negative keywords + restrânge match |

## Alocare finală recomandată (ChatGPT)
Case 40% · Apartamente 40% · Terenuri 20% (test) · Spații comerciale 0%. Conversii de măsurat: formular, telefon, WhatsApp (definite ÎNAINTE de a plăti — leagă de R6).

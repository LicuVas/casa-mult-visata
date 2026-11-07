# Ramura `publicare` — doar publicarea pe Netlify

Ramura asta nu conține situl. Conține doar acțiunea care îl publică (`.github/workflows/publica.yml`).

- Situl se construiește pe `master`, în `deploy.yml`, ca înainte (fără nicio cheie Netlify).
- `deploy.yml` pornește apoi `publica.yml` **de pe ramura asta**. Doar rulările de pe ramura asta ajung la mediul
  `productie`, unde stă cheia Netlify.
- Ramura e păzită de o regulă a depozitului: nu se poate schimba, șterge sau rescrie (o schimbă doar proprietarul,
  oprind regula pentru câteva minute).
- `publica.yml` nu rulează cod din depozit: descarcă situl gata construit și îl urcă pe Netlify.

Făcut pe 07.11.2026, ca cheia contului Netlify să nu mai stea în secretele depozitului.

// Ghiduri de cartier Piatra Neamț — conținut hiperlocal pe intenție de căutare
// ("case/apartamente de vânzare <cartier> piatra neamț"), zonă în care portalurile
// (Storia/OLX/imobiliare.ro) sunt subțiri. ADITIV: nu atinge anunțurile .md.
// `zoneMatch` se potrivește cu câmpul `zone` din frontmatter-ul anunțurilor.

export interface CartierGuide {
  slug: string;
  name: string;
  // Eticheta de deasupra titlului. Default „Cartier Piatra Neamț"; pt comune/zone din afara
  // orașului se suprascrie (ex. „Zonă lângă Piatra Neamț").
  label?: string;
  zoneMatch: string[];
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  // Data ultimei revizuiri a ghidului (ISO) — semnal E-E-A-T de prospețime + autor.
  updated: string;
  // Paragrafe de orientare reală pentru cumpărător (titlu + corp).
  sections: { h2: string; body: string }[];
}

export const cartiere: CartierGuide[] = [
  {
    slug: 'centru',
    name: 'Centru',
    zoneMatch: ['Centru'],
    updated: '2026-06-25',
    title: 'Case și Apartamente de Vânzare în Centru Piatra Neamț',
    metaDescription:
      'Proprietăți de vânzare în Centrul Piatra Neamț: apartamente și case lângă Curtea Domnească și zona pietonală. Oferte verificate de agentul Cozma Vasile.',
    h1: 'Proprietăți de Vânzare în Centrul Piatra Neamț',
    intro:
      'Centrul este zona cu cea mai mare cerere și cea mai mică ofertă din oraș — totul este la câțiva pași: instituții, școli, spital, comerț și zona pietonală. Mai jos vezi ce am acum la vânzare în Centru; proprietățile bune pleacă repede, așa că merită să fii pe listă.',
    sections: [
      {
        h2: 'Cum e să locuiești în Centru',
        body:
          'Centrul Piatra Neamț îmbină istoria cu viața de zi cu zi: Ansamblul Curtea Domnească, Turnul lui Ștefan cel Mare și Piața Ștefan cel Mare sunt reperele zonei, iar telegondola spre Cozla pleacă de aproape. Locuințele sunt un amestec de blocuri bine poziționate și case mai vechi, multe cu vad comercial la parter. Pentru cine vrea să aibă totul la îndemână, fără să depindă de mașină, este cea mai practică alegere din oraș.',
      },
      {
        h2: 'La ce să fii atent când cumperi în Centru',
        body:
          'La apartamentele din blocurile vechi contează anul construcției, structura și starea instalațiilor; la casele din centru, situația cadastrală și regimul de înălțime (multe sunt în zona protejată). Verific pentru fiecare proprietate actele, intabularea și cartea funciară înainte să ți-o recomand, te însoțesc la vizionări și mă ocup de negociere. Pentru cumpărători, comisionul meu este 0%.',
      },
    ],
  },
  {
    slug: 'precista',
    name: 'Precista',
    zoneMatch: ['Precista'],
    updated: '2026-06-25',
    title: 'Case și Apartamente de Vânzare în Precista, Piatra Neamț',
    metaDescription:
      'Proprietăți de vânzare în cartierul Precista, Piatra Neamț — zonă rezidențială liniștită aproape de centru. Oferte verificate, agent Cozma Vasile, comision 0% cumpărător.',
    h1: 'Proprietăți de Vânzare în Cartierul Precista',
    intro:
      'Precista este una dintre zonele rezidențiale căutate ale orașului — destul de aproape de centru cât să ajungi rapid oriunde, dar suficient de retrasă cât să fie liniște. Mai jos vezi ofertele pe care le am acum în Precista.',
    sections: [
      {
        h2: 'Cum e cartierul Precista',
        body:
          'Cartierul își ia numele de la Mănăstirea Precista, una dintre ctitoriile legate de epoca lui Ștefan cel Mare, reper recunoscut al zonei. Este o zonă predominant rezidențială, cu un amestec de case și blocuri, apreciată pentru echilibrul dintre acces la oraș și atmosferă liniștită — potrivită mai ales pentru familii.',
      },
      {
        h2: 'Ce verific pentru tine',
        body:
          'Pentru fiecare proprietate din Precista verific actele, intabularea, cartea funciară și starea reală a construcției înainte să ți-o prezint. Îți spun sincer ce merită și ce nu, te însoțesc la vizionări și mă ocup de negociere și de pașii până la notar. Comision 0% pentru cumpărător.',
      },
    ],
  },
  {
    slug: 'maratei',
    name: 'Mărăței',
    zoneMatch: ['Mărăței'],
    updated: '2026-06-25',
    title: 'Case și Apartamente de Vânzare în Mărăței, Piatra Neamț',
    metaDescription:
      'Proprietăți de vânzare în cartierul Mărăței, Piatra Neamț — zonă rezidențială cu prețuri accesibile și acces bun. Oferte verificate de agentul Cozma Vasile.',
    h1: 'Proprietăți de Vânzare în Cartierul Mărăței',
    intro:
      'Mărăței este un cartier rezidențial mare, cu prețuri pe metru pătrat adesea mai prietenoase decât în centru și cu tot ce ai nevoie la îndemână. Mai jos vezi ce am acum la vânzare în Mărăței.',
    sections: [
      {
        h2: 'Cum e cartierul Mărăței',
        body:
          'Este o zonă rezidențială întinsă, predominant cu blocuri, cu școli, comerț de proximitate și acces bun către ieșirile din oraș. Raportul preț-suprafață îl face una dintre cele mai bune alegeri pentru prima locuință sau pentru un apartament spațios fără bugetul din centru.',
      },
      {
        h2: 'Ce verific pentru tine',
        body:
          'Verific actele, intabularea și starea instalațiilor pentru fiecare apartament sau casă din Mărăței înainte să ți-o recomand, te însoțesc la vizionări și negociez în numele tău. Pentru cumpărători, comisionul este 0%.',
      },
    ],
  },
  {
    slug: 'darmanesti',
    name: 'Dărmănești',
    zoneMatch: ['Dărmănești'],
    updated: '2026-06-25',
    title: 'Case și Apartamente de Vânzare în Dărmănești, Piatra Neamț',
    metaDescription:
      'Proprietăți de vânzare în cartierul Dărmănești, Piatra Neamț — zonă rezidențială liniștită, potrivită pentru familii. Oferte verificate, agent Cozma Vasile.',
    h1: 'Proprietăți de Vânzare în Cartierul Dărmănești',
    intro:
      'Dărmănești este o zonă rezidențială liniștită, apreciată de familii pentru atmosfera mai relaxată, păstrând în același timp accesul facil către restul orașului. Mai jos vezi ofertele pe care le am acum în Dărmănești.',
    sections: [
      {
        h2: 'Cum e cartierul Dărmănești',
        body:
          'Cartierul îmbină case și blocuri, cu un ritm mai liniștit decât zona centrală și cu spații verzi în apropiere. Este o alegere bună pentru cei care vor o locuință confortabilă, fără agitația din centru, dar la câteva minute de el.',
      },
      {
        h2: 'Ce verific pentru tine',
        body:
          'Pentru fiecare proprietate din Dărmănești verific situația cadastrală, actele și starea construcției, îți spun sincer ce merită, te însoțesc la vizionări și mă ocup de negociere. Comision 0% pentru cumpărător.',
      },
    ],
  },
  {
    slug: '1-mai',
    name: '1 Mai',
    zoneMatch: ['1 Mai'],
    updated: '2026-06-25',
    title: 'Apartamente și Case de Vânzare în Cartierul 1 Mai, Piatra Neamț',
    metaDescription:
      'Proprietăți de vânzare în cartierul 1 Mai, Piatra Neamț — zonă rezidențială cu acces bun și comerț de proximitate. Oferte verificate, agent Cozma Vasile.',
    h1: 'Proprietăți de Vânzare în Cartierul 1 Mai',
    intro:
      'Cartierul 1 Mai este o zonă rezidențială practică, cu comerț de proximitate și acces bun în oraș. Mai jos vezi ce am acum la vânzare în 1 Mai.',
    sections: [
      {
        h2: 'Cum e cartierul 1 Mai',
        body:
          'Zonă predominant de blocuri, cu infrastructură de proximitate (magazine, transport, școli) și un raport bun preț-suprafață. Potrivită pentru prima locuință sau pentru o investiție cu cerere constantă la închiriere.',
      },
      {
        h2: 'Ce verific pentru tine',
        body:
          'Verific actele, intabularea și starea instalațiilor pentru fiecare proprietate din 1 Mai, te însoțesc la vizionări și negociez în numele tău. Pentru cumpărători, comisionul este 0%.',
      },
    ],
  },
  {
    slug: 'dumbrava-rosie',
    name: 'Dumbrava Roșie',
    label: 'Zonă lângă Piatra Neamț',
    zoneMatch: ['Dumbrava Roșie'],
    updated: '2026-06-25',
    title: 'Case și Terenuri de Vânzare în Dumbrava Roșie, lângă Piatra Neamț',
    metaDescription:
      'Proprietăți de vânzare în Dumbrava Roșie, comuna de la marginea Piatra Neamț — case noi și terenuri, la câteva minute de oraș. Oferte verificate, agent Cozma Vasile, comision 0% cumpărător.',
    h1: 'Proprietăți de Vânzare în Dumbrava Roșie',
    intro:
      'Dumbrava Roșie este comuna lipită de Piatra Neamț, peste râul Bistrița, spre Bacău — una dintre cele mai căutate zone pentru cine vrea o casă cu curte la câteva minute de oraș. Mai jos vezi ce am acum la vânzare în Dumbrava Roșie și satele din jur.',
    sections: [
      {
        h2: 'Cum e să locuiești în Dumbrava Roșie',
        body:
          'Așezată chiar la marginea estică a municipiului, pe DN15 spre Bacău, Dumbrava Roșie (cu satele Cut, Brășăuți și Izvoare) a devenit zona de extindere rezidențială a orașului: multe case noi, loturi de teren și un ritm mai liniștit, dar cu orașul la 5–10 minute cu mașina. Este alegerea potrivită pentru familiile care vor curte și aer mai curat fără să se rupă de Piatra Neamț — de școli, spital sau locul de muncă.',
      },
      {
        h2: 'La ce să fii atent când cumperi în Dumbrava Roșie',
        body:
          'La terenuri contează statutul (intravilan/extravilan), accesul la utilități și deschiderea la drum; la casele noi, autorizația, recepția la terminarea lucrărilor și intabularea. Verific pentru fiecare proprietate actele, cartea funciară și situația reală în teren înainte să ți-o recomand, te însoțesc la vizionări și mă ocup de negociere. Pentru cumpărători, comisionul meu este 0%.',
      },
    ],
  },
];

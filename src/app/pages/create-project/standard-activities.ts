export const activities = [
  {
    title: 'Uppdragsförfrågan',
    desc: 'Inkommande uppdrag registeras i Pyramid och projektmapp upprättas. Ny kund kontrolleras via UC av ekonomiavd. Uppdragsansvarig utses, vilken även utser uppdragsorganisationen.',
    hideSubActivities: true,
    routines: [{
      label: 'Skapa nytt projekt i pyramid',
      type: 'document',
      file: 'pyramid/new_project.md'
    }],
    style: {
      color: 'dark',
      icon: 'none',
      arrow: ''
    },
    blocks: [
      {
        type: 'checkList',
        title: 'Checkpoints',
        checkPoints: [
          { label: 'Projekt registrerat i pyramid', state: false, flag: 'project_registerd' },
          { label: 'Projektmapp skapad', state: false },
          { label: 'Uppdragsansvarig utsedd', state: false },
          { label: 'Uppdragsorganisation', state: false },
        ]
      }
    ]
    ,
  },
  {
    title: 'Behovsanalys/Offert',
    desc: 'Uppdragsansvarig genomför en behovsanalys med kund där uppdraget definieras (omfattning, tider, ansvar, kompetens, risker, ect). Offert upprättars för uppdraget. Offert presenteras personligen för kund.',
    style: {
      color: 'dark',
      icon: 'chalkboard-teacher',
      arrow: ''
    },
    blocks: [
      {
        type: 'checkList',
        title: 'Checkpoints',
        checkPoints: [
          { label: 'Startmöte utfört', state: false },
          { label: 'Behovsanalys utförd', state: false },
          { label: 'Uppdraget definierat', state: false },
          { label: 'Offert upprättad', state: false },
          { label: 'Offert Levererad/Pressenterad', state: false }
        ]
      }

    ]
  },
  {
    title: 'Uppdragsbekräftelse/Avtal',
    desc: 'När kunden har godkänt upprättad offert bekräftas uppdraget genom ett avtal som kunden upprättar alt skickar uppdragsansvarig (UA) uppdragsbekräftelse. (Uppdragsbekräftelse måste godkännas av kund  alt signerat avtal innan arbete påbörjas.)',
    style: {
      color: 'dark',
      icon: 'chalkboard-teacher',
      arrow: ''
    },
    blocks: [
      {
        type: 'checkList',
        title: 'Checkpoints',
        checkPoints: [
          { label: 'Offert godkänd av kund', state: false },
          { label: 'Uppdragsbekräftelse/Avtal skickat', state: false },
          { label: 'Uppdragsbekräftelse/Avtal godkänt', state: false },
          { label: 'Faktureringsrutiner fastställda i pramid', state: false },
        ]
      }

    ]
  },
  {
    title: 'Genomförande',
    desc: `
      #### Uppdragsplan
      Uppdragsplan (ekonomi, tidplan med (milstolpar), aktiviteter att genomföras, risker, leverans, organisation, mötesintervaller) upprättas av uppdragsansvarig. Genomgång av uppdragsplan med uppdragsorganisation.

      #### Startmöte
      Startmöte med kund (genomgång av uppdrag, uppdragsplan)

      #### Kvalitets och miljöplan
      Kvalitets och miljöplan skall upprättas

      #### Utförande
      Uppdraget utförs enligt gällande tjänstebeskrivning

      #### Avstämningar
      Kontinuerliga avstämmningar internt och externt (kund) (aktiviteter, tidplan, ekonomi, omfattning, risker,  ev ÄTA) 
      `,
    style: {
      color: 'primary',
      icon: 'tools',
      arrow: 'to'
    },
    blocks: [

    ]
  },
  {
    title: 'Intern granskning',
    desc: 'Resultatet intern granskas av mer erfaren konsult, ',
    style: {
      color: 'info',
      icon: 'glasses',
    }
  },
  {
    title: 'Leverans',
    desc: 'Resultatet ska levereras och presenteras för kund (personligen)',
    style: {
      color: 'info',
      icon: 'glasses',
    }
  },
  {
    title: 'Fortsatt Uppdrag?',
    desc: 'Löpande utvärderas om det finns mer vi kan göra i projektet...',
    style: {
      color: 'warning',
      icon: 'refresh',
      arrow: 'from'
    }
  },
  {
    title: 'Fakturering',
    desc: 'Uppdragsansvarig godkänner fakturaunderlag utifrån tidrapporter av involverade konsulter och säkerställer att det stämmer överens enligt gällande avtal/oderbekräftelse. ',
    style: {
      color: 'dark',
      icon: 'invoice',
      arrow: ''
    }
  },
  {
    title: 'Uppdraget avslutas',
    desc: `
      #### Avslutningsmöte
      Avslutningsmöte hålls med kund för utvärdering och erfarenhetsåterföring
      
      #### Diskussion om kommande projekt
      Diskussion förs med kund ang. eventuella kommande projekt där vi kan vara delaktiga
      
      #### Avsluta projektet i pyramid
      Projektet avslutas i pyramid
      
      #### Lönsamhetsanalys
      Lönsamhetsanalys upprättas`,
    style: {
      color: 'success',
      icon: 'smile',
      arrow: ''
    }
  }

]
export const activities = [
  {
    title: 'Uppdragsförfrågan',
    desc: 'Inkommande uppdrag registeras i Pyramid och projektmapp upprättas. Ny kund kontrolleras via UC av ekonomiavd. Uppdragsansvarig utses, vilken även utser uppdragsorganisationen.',
    hideSubActivities: true,
    routines: [{
      label: 'Skapa nytt projekt i pyramid',
      type: 'document',
      file: 'pyramid/new_project.md'
    },
    ],
    style: {
      color: 'dark',
      icon: 'none',
      arrow: ''
    },
    checkListTitle: 'Checkpoints',
    checkPoints: [
      { label: 'Projekt registrerat i pyramid', state: false, flag: 'project_registerd', identity: 'pyramid_registerd' },
      { label: 'Projektmapp skapad', state: false, identity: 'folder_created' },
      { label: 'Uppdragsansvarig utsedd', state: false, identity: 'owner_selected' },
      { label: 'Uppdragsorganisation', state: false, identity: 'project_organisation_created' },
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
    checkListTitle: 'Checkpoints',
    checkPoints: [
      { label: 'Startmöte utfört', state: false, identity: 'start_meeting' },
      { label: 'Behovsanalys utförd', state: false, identity: 'resource_planing_done' },
      { label: 'Uppdraget definierat', state: false, identity: 'project_defined' },
      { label: 'Offert upprättad', state: false, identity: 'estimate_created' },
      { label: 'Offert Levererad/Pressenterad', state: false, identity: 'estimate_delivered' }
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

    type: 'checkList',
    checkListTitle: 'Checkpoints',
    checkPoints: [
      { label: 'Offert godkänd av kund', state: false, identity: 'estimate_aproved' },
      { label: 'Uppdragsbekräftelse/Avtal skickat', state: false, identity: 'confirmation_sent' },
      { label: 'Uppdragsbekräftelse/Avtal godkänt', state: false, flag: 'project_order', identity: 'confirmation_aproved' },
      { label: 'Faktureringsrutiner fastställda i pramid', state: false, identity: 'invoice_routine_set' },
    ]
  },

  {
    title: 'Genomförande',
    routines: [{
      label: 'Agendo',
      type: 'link',
      url: 'https://agendo.se'
    },
    {
      label: 'Riskanalys i fält',
      type: 'create-doc',
      template: 'risk'
    }],
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

    checkListTitle: 'Checkpoints',
    checkPoints: [
      { label: 'Uppdragsplan Upprättad', state: false, identity: 'project_plan_created' },
      { label: 'Startmöte utfört', state: false, identity: 'start_meeting_done' },
      { label: 'Kvalitets och miljöplan upprättad', state: false, identity: 'quality_plan_done' },
      { label: 'Avstämning med kund', state: false, identity: 'walktrough_with_customer' },
    ]
  },
  {
    title: 'Intern granskning',
    desc: 'Resultatet intern granskas av mer erfaren konsult, ',
    style: {
      color: 'info',
      icon: 'glasses',
    },
    checkListTitle: 'Checkpoints',
    checkPoints: [
      { label: 'Interngranskning Utförd', state: false, identity: 'internal_review_done' },
    ]
  },
  {
    title: 'Leverans',
    desc: 'Resultatet ska levereras och presenteras för kund (personligen)',
    style: {
      color: 'info',
      icon: 'glasses',
    },
    checkListTitle: 'Checkpoints',
    checkPoints: [
      { label: 'Slutleverans Utförd', state: false, identity: 'final_delivery' },
    ]
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
    },
    checkListTitle: 'Checkpoints',
    checkPoints: [
      { label: 'Fakturering utförd', state: false, identity: 'invoice_done' },
    ]
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
    },
    checkListTitle: 'Checkpoints',
    checkPoints: [
      { label: 'Avslutningsmöte', state: false, identity: 'closing_meeting' },
      { label: 'Lönsamhetsanalys', state: false, identity: 'profit_check' },
    ]
  },

]

export const activitiesSmall = [
  {
    title: 'Uppdragsförfrågan',
    desc: 'Inkommande uppdrag registeras i Pyramid och projektmapp upprättas. Ny kund kontrolleras via UC av ekonomiavd. Uppdragsansvarig utses, vilken även utser uppdragsorganisationen.',
    hideSubActivities: true,
    routines: [{
      label: 'Skapa nytt projekt i pyramid',
      type: 'document',
      file: 'pyramid/new_project.md'
    },
    ],
    style: {
      color: 'dark',
      icon: 'none',
      arrow: ''
    },
    checkListTitle: 'Checkpoints',
    checkPoints: [
      { label: 'Projekt registrerat i pyramid', state: false, flag: 'project_registerd', identity: 'pyramid_registerd' },
      { label: 'Projektmapp skapad', state: false, identity: 'folder_created' },
      { label: 'Uppdragsansvarig utsedd', state: false, identity: 'owner_selected' },
      { label: 'Uppdragsorganisation', state: false, identity: 'project_organisation_created' },
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
    checkListTitle: 'Checkpoints',
    checkPoints: [
      { label: 'Startmöte utfört', state: false, identity: 'start_meeting' },
      { label: 'Behovsanalys utförd', state: false, identity: 'resource_planing_done' },
      { label: 'Uppdraget definierat', state: false, identity: 'project_defined' },
      { label: 'Offert upprättad', state: false, identity: 'estimate_created' },
      { label: 'Offert Levererad/Pressenterad', state: false, identity: 'estimate_delivered' }
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

    type: 'checkList',
    checkListTitle: 'Checkpoints',
    checkPoints: [
      { label: 'Offert godkänd av kund', state: false, identity: 'estimate_aproved' },
      { label: 'Uppdragsbekräftelse/Avtal skickat', state: false, identity: 'confirmation_sent' },
      { label: 'Uppdragsbekräftelse/Avtal godkänt', state: false, flag: 'project_order', identity: 'confirmation_aproved' },
      { label: 'Faktureringsrutiner fastställda i pramid', state: false, identity: 'invoice_routine_set' },
    ]
  },

  {
    title: 'Genomförande',
    routines: [{
      label: 'Agendo',
      type: 'link',
      url: 'https://agendo.se'
    }],
    desc: `
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

    checkListTitle: 'Checkpoints',
    checkPoints: [
      { label: 'Avstämning med kund', state: false, identity: 'walktrough_with_customer' },
    ]
  },
  {
    title: 'Intern granskning',
    desc: 'Resultatet intern granskas av mer erfaren konsult, ',
    style: {
      color: 'info',
      icon: 'glasses',
    },
    checkListTitle: 'Checkpoints',
    checkPoints: [
      { label: 'Interngranskning Utförd', state: false, identity: 'internal_review' },
    ]
  },
  {
    title: 'Leverans',
    desc: 'Resultatet ska levereras och presenteras för kund (personligen)',
    style: {
      color: 'info',
      icon: 'glasses',
    },
    checkListTitle: 'Checkpoints',
    checkPoints: [
      { label: 'Slutleverans Utförd', state: false, identity: 'final_delivery' },
    ]
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
    },
    checkListTitle: 'Checkpoints',
    checkPoints: [
      { label: 'Fakturering utförd', state: false, identity: 'invoice_done' },
    ]
  },
  {
    title: 'Uppdraget avslutas',
    desc: `    
      #### Diskussion om kommande projekt
      Diskussion förs med kund ang. eventuella kommande projekt där vi kan vara delaktiga
      
      #### Avsluta projektet i pyramid
      Projektet avslutas i pyramid
      `,
    style: {
      color: 'success',
      icon: 'smile',
      arrow: ''
    },
  },

]
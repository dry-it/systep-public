import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ElectronService } from '../../core/services';
import { FireBaseService } from '../../services/firebase.service';
import { Location } from '@angular/common';
import { StateService } from 'app/services/state.service';

interface Activity {
  title: string;
  desc: string
  style: Style
  subActivities?: Activity[]
  hideSubActivities?: boolean
  blocks?: Block[]
  tools?: Tool[]
  owners?: Owner[]
}

interface Style {
  color: string;
  icon: string;
  arrow?: string;
}

interface CheckPoint {
  label: string
  state: boolean,
  action?: Action
  deletable?: boolean
}

interface Meeting {
  title: string
  participants: Participant[],
  date: Date
  protocol?: File,
}

interface Measurement {
  title: string
  subtitle: string
  type: string
  checkPoints: CheckPoint[]
}

interface Participant {
  name: string
  company: string
  position: string
}

interface Action {
  label: string,
  execute: string
}

interface Block {
  title: string
  type: string,
  checkPoints?: CheckPoint[]
  meeting?: Meeting
  blocks?: Block[]
  measurements?: Measurement[]
}

interface Tool {
  name: string,
  icon: string,
  type: string,
  path?: string
}

interface Owner {
  icon: string
  name: string,
  bullets?: string[]
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  act: Activity[]
  project$: Observable<any>
  project: any
  id: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private data: DataService,
    private electron: ElectronService,
    private fireBaseService: FireBaseService,
    private _location: Location,
    private stateService: StateService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id')

    // this.project$ = this.data.get('project/5f2d3bdb2a7883725b161c19')
    this.project$ = this.stateService.returnCurrentProject()


    this.act = [
      {
        title: 'Uppdrag  ',
        desc: 'Uppdraget tas emot och registreras i Pyramid (affärssystem). Regionansvarig utser handläggare, vilken är knuten till en specifik uppdragsansvarig.',
        hideSubActivities: true,
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
              { label: 'Registrera projekt i pyramid', state: false },
              { label: 'Skapa projektmapp', state: true },
              { label: 'Skicka orderbekräftelse', state: false, action: { label: 'Generera Orderbekräftelse', execute: 'order' } }
            ]
          }
        ]
        ,
        owners: [
          { name: 'Uppdragsansvarig', icon: 'apple', bullets: ['Skapa projektmapp', 'Riskanalys upprättas', 'Se över resursbehov'] },
          { name: 'Handläggare', icon: 'apple', bullets: ['👈 Gör som hen säger!'] },
        ],
        tools: [
          {
            name: 'Rutinbeskrivning nytt uppdrag',
            icon: 'rocket',
            type: 'link',
            path: '/Users/jespermartinsson/development/systep/desktop/static/pdf/rutinbeskrivning_-_nytt_projekt_rutin_110_p4.pdf'
          },
          {
            name: 'Rutinbeskrivning nytt uppdrag',
            icon: 'rocket',
            type: 'link',
            path: '/Users/jespermartinsson/development/systep/desktop/static/pdf/rutinbeskrivning_-_nytt_projekt_rutin_110_p4.pdf'
          }
        ],
      },
      {
        title: 'Startmöte / Kundkontakt',
        desc: 'Handläggaren genomför ett startmöte där uppdraget definieras och upprättar därefter en budget/prisuppskattning för uppdraget.',
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
              { label: 'Boka startmöte', state: false },
              { label: 'Möte/Platsbesök', state: true },
              { label: 'Skriva mötesprotokoll', state: false, action: { label: 'Generera Mötesprotokoll', execute: 'order' } }
            ]
          }
          ,
          {
            type: 'meeting',
            title: 'Startmöte',
            meeting: {
              title: 'Startmöte',
              date: new Date('2020-08-04'),
              participants: [
                { name: 'Jesper Martinsson', company: 'Dry-IT', position: 'Uppdragsansvarig' },
                { name: 'John Doe', company: 'Testbolaget AB', position: 'Platschef' },
              ]
            }
          }
        ]
      },
      {
        title: 'Uppdragsbekräftelse',
        desc: 'När kunden har beställt uppdraget bekräftas det genom ett avtal som kunden upprättar alternativt upprättas det av Dry-IT:s uppdragsansvariga.',
        style: {
          color: 'dark',
          icon: 'envelope',
          arrow: ''
        },
        tools: [
          {
            name: 'Mall Uppdragsbekräftelse',
            icon: 'envelope',
            type: 'link',
            path: '/Users/jespermartinsson/development/systep/desktop/static/pdf/rutinbeskrivning_-_nytt_projekt_rutin_110_p4.pdf'
          }
        ]
      },
      {
        title: 'Genomförande',
        desc: `Handläggande konsulten utför uppdraget enligt överenskommet innehåll. Uppdraget kan avse nyproduktion och befintliga fastigheter. Arbetsmiljöriskanalys ska genomföras av uppdragsansvarig innan arbete påbörjas. Uppdraget kan innebära att ta fram en plan för t ex fuktkontroller samt utföra de mätningar som är överenskomna.

        Resultat och analyser sammanställs i en rapport/RBK-protokoll. I rapporten finns en bedömning av uppmätta resultat, eventuellt åtgärdsförslag.
        `,
        style: {
          color: 'primary',
          icon: 'tools',
          arrow: 'to'
        },
        blocks: [
          {
            type: 'measurement',
            title: 'Mätningar',
            measurements: [
              {
                title: 'Hus A',
                subtitle: 'Trapphus 1',
                type: 'RBK',
                checkPoints: [
                  { label: 'Skicka Indatablankett', state: false },
                  { label: 'Boka Startmöte', state: false },
                  { label: 'Mätning utförd', state: false, },
                  { label: 'Protokoll levererat', state: false, }
                ]
              },
              {
                title: 'Hus A',
                subtitle: 'Trapphus 2',
                type: 'RBK',
                checkPoints: [
                  { label: 'Skicka Indatablankett', state: false },
                  { label: 'Boka Startmöte', state: false },
                  { label: 'Mätning utförd', state: false, },
                  { label: 'Protokoll levererat', state: false, }
                ]
              }
            ]
          }
        ]
      },
      {
        title: 'Fortsatt Uppdrag?',
        desc: 'Just enter some example description here!',
        style: {
          color: 'warning',
          icon: 'refresh',
          arrow: 'from'
        }
      },
      {
        title: 'Fakturering',
        desc: 'Fakturering sker enligt rutiner överenskomna med uppdragsgivaren (vanligtvis löpande, men kan även vara månadsvis). Uppdragsansvarig godkänner fakturaunderlag utifrån tidrapporter av involverade konsulter och administrationen fakturerar uppdraget.',
        style: {
          color: 'dark',
          icon: 'invoice',
          arrow: ''
        }
      },
      {
        title: 'Uppdraget avslutas',
        desc: 'Uppdragsansvarig eller handläggande konsult avslutar uppdraget i Pyramid samt dokumenterar avvikelser i uppdraget eller förbättringspotentialer. Dokumentationen arkiveras elektroniskt. ',
        style: {
          color: 'success',
          icon: 'smile',
          arrow: ''
        }
      }
    ]
  }

  addDummy() {
    const dummy = {
      name: 'This is a test',
      pNumber: 'P4321',
      owner: 'Jesper Martinsson',
      activities: this.act
    }

    this.data.patch('project/5f2d3bdb2a7883725b161c19', dummy)
      .subscribe((res: any) => {
      })
  }

  save(activity, index) {

    this.project.activities[index] = activity

    this.data.patch('project/5f2d3bdb2a7883725b161c19', this.project)
      .subscribe()
  }

  generate() {

    this.data.post('generate/5f2d3bdb2a7883725b161c19', {})
      .subscribe((res: any) => {
        const p = res.path + '.pdf'
        console.log(p)
        this.electron.shell.openPath(p)
          .then((res) => console.log(res))
          .catch((err) => console.error(err))
      })
  }

  goBack() {
    this._location.back()
  }

  execute(e: string) {
    console.log(e)
    if (e === 'order') {
      this.generate()
    }
  }

  goToStart() {
    this.router.navigateByUrl('/home/start')
  }


  openExternal() {
    this.electron.shell.openPath('/Users/jespermartinsson/development/systep/desktop/static/pdf/rutinbeskrivning_-_nytt_projekt_rutin_110_p4.pdf')
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }

}

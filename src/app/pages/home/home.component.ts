import { Component, OnInit, HostBinding, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { AngularFireAuth } from '@angular/fire/auth';
import { FireBaseService } from '../../services/firebase.service';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { auditTime } from 'rxjs/operators';
import { StateService } from '../../services/state.service';
import { ElectronService } from 'app/core/services';

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
  icon: string
}

interface Owner {
  icon: string
  name: string,
  bullets?: string[]
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        width: '200px',
        height: '300px',
        marginRight: '2px'
      })),
      state('closed', style({
        width: '35px',
        height: '60px'
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
    trigger('openCloseProject', [
      // ...
      state('open', style({
        width: '200px',
        minHeight: '400px',
        marginRight: '2px'
      })),
      state('closed', style({
        width: '35px',
        height: '30px'
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
    trigger('openCloseImage', [
      // ...
      state('open', style({
        width: '100px',
        marginLeft: '5px',
        border: '5px #fff solid'
      })),
      state('closed', style({
        width: '20px',
        marginTop: '2px',
        border: 'none'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
    trigger('move', [
      // ...
      state('open', style({
        top: '365px',
      })),
      state('closed', style({
        top: '122px',
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),

  ]
})
export class HomeComponent implements OnInit {

  activities: Activity[]
  projects$: Observable<any>
  user$: Observable<any>

  searchForm = new FormGroup({
    term: new FormControl('')
  })

  constructor(
    private router: Router,
    private data: DataService,
    private auth: AngularFireAuth,
    private fireBaseService: FireBaseService,
    public _location: Location,
    public route: ActivatedRoute,
    private stateService: StateService,
    private electron: ElectronService) { }

  results: any

  profilePic$: Observable<any>

  hideSidebar: boolean
  currentProject$: Observable<any> = this.stateService.returnCurrentProject()

  mobileSidebar: boolean
  isElectron: boolean = this.electron.isElectron

  downloadLink: string = 'https://firebasestorage.googleapis.com/v0/b/systep-26719.appspot.com/o/files%2FSYSTEP%20Setup%201.0.1.exe?alt=media&token=49319892-5907-4710-b9e3-944426f6ef79'



  ngOnInit(): void {

    this.route.params.subscribe((res) => console.log(res))

    if (this.route.snapshot.paramMap.get('sHidden') === 'true') {
      this.hideSidebar = true
    }

    this.stateService.loadUsers()

    this.checkUser()

    this.searchForm.valueChanges
      .pipe(auditTime(500))
      .subscribe((result) => {
        if (result.term.length > 1) {
          this.fireBaseService.searchProjects(result.term)
            .subscribe((res) => {
              this.results = res;
            })
        } else {
          this.results = undefined
        }

      })


    this.user$ = this.stateService.returnCurrentUser()

    this.projects$ = this.fireBaseService.getCollectionSnapshot('projects')

    this.activities = [
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
            icon: 'rocket'
          },
          {
            name: 'Rutinbeskrivning nytt uppdrag',
            icon: 'rocket'
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
            icon: 'envelope'
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

  isOpen = false;
  isOpenProject = false;

  activated: boolean
  activate: boolean = true;

  toggleUser() {
    this.isOpen = !this.isOpen;
  }

  signOut() {
    this.auth.signOut()
      .then(() => {
        this.router.navigateByUrl('/login')
      })
  }

  toggleProject() {
    this.isOpenProject = !this.isOpenProject;
  }

  displayProjectMenu() {

    if (this.router.url.includes('projectview')) {
      return true
    }

  }

  addDummy() {
    const dummy = {
      name: 'This is a test',
      pNumber: 'P4321',
      owner: 'Jesper Martinsson',
      activities: this.activities
    }

    this.data.patch('project/5f2d3bdb2a7883725b161c19', dummy)
      .subscribe((res: any) => {
      })
  }

  checkUser() {
    this.auth.currentUser.then((u: any) => {
      if (u) {
        this.stateService.loadUser(u.uid);
        this.stateService.returnCurrentUser()
          .subscribe((user: any) => {
            if (user.profilePicture) {
              this.profilePic$ = this.fireBaseService.getImgUrl(user.profilePicture)
            }
          })
      }
      localStorage.uid = u.uid
      if (localStorage.getItem('activated') === u.uid) {
        this.activated = true;
        this.activate = false;
      } else {
        this.fireBaseService.getDocumentValueChanges('users', u.uid)
          .subscribe((user: any) => {
            if (user.active) {
              this.activated = true;
              this.activate = false;
              localStorage.setItem('activated', u.uid)
            } else {
              this.activate = true
            }
          })
      }
    })


  }


  openProject(id: string) {
    this.mobileSidebar = false;
    this.router.navigateByUrl(`/home/projectview/${id}/project`)
    this.searchForm.patchValue({ term: '' });
    this.results = undefined;
  }


}

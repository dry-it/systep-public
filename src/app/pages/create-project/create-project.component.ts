import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FireBaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  createProjectForm = new FormGroup({
    name: new FormControl(''),
    pNumber: new FormControl(''),
    company: new FormControl(''),
    owner: new FormControl('')
  });

  activities: any

  users$: Observable<any>

  newProject: any
  selectedOwner: any

  constructor(private fireBaseService: FireBaseService) { }


  ngOnInit(): void {

    this.createProjectForm.patchValue({owner: localStorage.activated})

    this.users$ = this .fireBaseService.getCollectionSnapshot('users')

    this.newProject = {
      name: 'My test project',
      pNumber: 'P1234',
      flags: {
        order_confirmed: false,
        project_registered: false,
      }
    }


    this.activities = [
      {
        title: 'Uppdragsförfrågan',
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
        desc: `Handläggande konsulten utför uppdraget enligt överenskommet innehåll. Uppdraget kan avse nyproduktion och befintliga fastigheter. Arbetsmiljöriskanalys ska genomföras av uppdragsansvarig innan arbete påbörjas. Uppdraget kan innebära att ta fram en plan för t ex fuktkontroller samt utföra de mätningar som är överenskomna.

        Resultat och analyser sammanställs i en rapport/RBK-protokoll. I rapporten finns en bedömning av uppmätta resultat, eventuellt åtgärdsförslag.
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
  
  onSubmit() {
    const newProject = {
      ...this.createProjectForm.value,
      activities: this.activities,
      flags: {
        order_confirmed: false,
        project_registered: false,
      }
    }

    this.fireBaseService.getDocumentValueChanges('users', newProject.owner)
    .subscribe((owner:any) => {
      newProject.owner = owner
      this.fireBaseService.addDocument('projects', {...this.createProjectForm.value, owner: owner})
      .then((doc) => {
        console.log(doc)
        console.log(doc.id)
        for (let i = 0; i < this.activities.length; i++) {

          this.fireBaseService.setDocumentPath(`projects/${doc.id}/activities/${i}`, { ...this.activities[i], blocks: [] })
            .then((res) => {
              if (this.activities[i].blocks) {
                for (let j = 0; j < this.activities[i].blocks.length; j++) {
                  this.fireBaseService.setDocumentPath(`projects/${doc.id}/activities/${i}/blocks/${j}`, { ...this.activities[i].blocks[j], checkPoints: [] })
                    .then(() => {
                      if (this.activities[i].blocks[j].checkPoints) {
                        for (let k = 0; k < this.activities[i].blocks[j].checkPoints.length; k++) {
                          this.fireBaseService.setDocumentPath(`projects/${doc.id}/activities/${i}/blocks/${j}/checkpoints/${k}`, { ...this.activities[i].blocks[j].checkPoints[k] })
                            .then(() => console.log('done'))
                        }
                      }


                    })
                }
              }

            })

          /*   this.fireBaseService.addDocumentActivities('projects', doc.id, 'activities', i.toString(), {...this.activities[i], blocks: undefined})
            .then((res) => {
    
            }) */
        }
      })
    })

    
    console.log(newProject);
  }

  save(e, i) {
    // Save here
  }

  execute (e) {
    // execute
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { StateService } from 'app/services/state.service';

@Component({
  selector: 'pv-mp-construction',
  templateUrl: './mp-construction.component.html',
  styleUrls: ['./mp-construction.component.scss']
})
export class MpConstructionComponent implements OnInit {
  @Input() id:string

  mp$: Observable<any>

  constructor(private statService: StateService) { }

  form = new FormGroup({
    name: new FormControl(''),
    constructionType: new FormControl(''),
    thickness: new FormControl(''),
    vct: new FormControl(''),
    castingDate: new FormControl(''),
    concreteType: new FormControl(''),
    levelingScreed: new FormControl(''),
    concreteAddons: new FormControl(''),
    flooring: new FormControl(''),
  })


  ngOnInit(): void {
    this.statService.getMp(this.id)
    .subscribe((mp:any) => {
      this.form.patchValue(mp)
    })
  }

}

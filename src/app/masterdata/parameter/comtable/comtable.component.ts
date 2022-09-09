import { Component, OnInit, Input, Output, AfterViewInit, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-comtable',
  templateUrl: './comtable.component.html',
  styleUrls: ['./comtable.component.less'],
  providers: [DecimalPipe]
})
export class ComtableComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() res: [];
  @Input() showcol: [];
  @Output() sendCodeParent: EventEmitter<any> = new EventEmitter();
  Keys = [];
  results = [];
  constructor(private decimalPipe: DecimalPipe) { }
  ngOnChanges(changes: SimpleChanges) {
    this.showDetail(this.res, this.showcol);
  }
  ngOnInit() {
    this.showDetail(this.res, this.showcol);
  }

  ngAfterViewInit() {

  }

  showDetail(res, excludecol) {
    this.Keys = (res.length || []) &&
      Object.keys(res[0]);

    this.results = res.map(
      element => {
        let obj = [];
        this.Keys.filter(f => excludecol.includes(f)).forEach(key => {
          if (key === 'Price') {
            obj.push({ key: key, value: this.decimalPipe.transform(element[key], '2.') })
          } else {
            obj.push({ key: key, value: element[key] })
          }
          // obj.push({ key: key, value: element[key] })
        })
        return obj;
      }
    )
    this.Keys = this.Keys.filter(f => excludecol.includes(f));
  }

  sendCode(obj) {
    this.sendCodeParent.emit(obj);
  }
}

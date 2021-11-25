import {Directive, ElementRef, Input} from '@angular/core';
import * as Inputmask from 'inputmask';


@Directive({
  selector: '[app-restrict-input]',
})
export class RestrictInputDirective {

  // map of some of the regex strings I'm using (TODO: add your own)
  private regexMap = {
    integer: '^[0-9]*$',
    float: '^[+-]?([0-9]*[.])?[0-9]+$',
    words: '([A-z]*\\s)*',
    point25: '^\-?[0-9]*(?:\\.25|\\.50|\\.75|)$'
  };

  constructor(private el: ElementRef) {}

  @Input('app-restrict-input')
  public set defineInputType(type: string) {
    Inputmask({regex: this.regexMap[type], placeholder: ''})
      .mask(this.el.nativeElement);
  }

}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileUrlName'
})
export class FileUrlNamePipe implements PipeTransform {

  transform(value): unknown {

    if (value) {
      try {
        var split = value.split('/');
        var name = split[split.length - 1];
        name = name.split('?')[0]
        name = name.split('%')[1]
      } catch (error) {
        name = value;
      }

      return name;
    }

    return ''
  }

}

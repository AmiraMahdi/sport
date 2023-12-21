import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customVoy'
})
export class CustomVoyPipe implements PipeTransform {

  transform(ch: string): any {
    let newCh: string = "";
    let v: any = ["A", "a", "E", "e", "U", "u", "I", "i", "Y", "y", "O", "o"];
    for (let i = 0; i < ch.length; i++) {
      let x: string = ch[i];
      for (let j = 0; j < v.length; j++) {
        if (ch[i] == v[j]) {
          x = "*";
          break
        }

      }
      newCh=newCh+x;

    }
    return newCh;
  }

}

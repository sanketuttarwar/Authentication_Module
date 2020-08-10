import { PipeTransform, Pipe } from '@angular/core'

@Pipe({
  name: 'summaryShorten'
})
export class SummaryShortenPipe implements PipeTransform{
    transform(value: any) {
      return value.substr(0, 15)+' ...';
    }
}

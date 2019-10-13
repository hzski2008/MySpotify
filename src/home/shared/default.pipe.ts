import { Pipe, PipeTransform } from "@angular/core";
import _ from "lodash";

@Pipe({
  name: "default"
})
export class DefaultPipe implements PipeTransform {
  transform(obj: any, path: string,  fallback = "loading..."): string {
    return obj ? (_.get(obj, path) ? _.get(obj, path) : fallback) : fallback;
  }
}

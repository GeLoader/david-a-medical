import {Injectable} from '@angular/core';
import { itemroute } from 'src/app/pages/items/items.routingkeys';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  menuLink: any =itemroute.base
  constructor() { }
}
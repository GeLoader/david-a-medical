import {
  Component,
  ViewChild,
  TemplateRef,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

import { BsModalService } from 'ngx-bootstrap/modal';
import { LoginregisterService } from './services/loginregister.service';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: any = null;
  title = 'med-supply';

  public modalRef!: BsModalRef;

  @ViewChild('childModal', { static: false }) childModal!: ModalDirective;
  ngOnInit(): void {
    console.log(1);
  }
  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private router: Router,
    private loginservice: LoginregisterService,
    private modalService: BsModalService
  ) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(60 * 30);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(36000);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      console.log(this.idleState);
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.childModal.hide();
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      sessionStorage.removeItem('keys');
      this.router.navigate(['/']);
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = "You've gone idle!";
      console.log(this.idleState);
      this.childModal.show();
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
      console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => (this.lastPing = new Date()));

    if (this.loginservice.ckecktoken()) {
      idle.watch();
      this.timedOut = false;
    } else {
      idle.stop();
    }

    // this.reset();
  }

  reset() {
    this.hideChildModal();
    this.idle.watch();
    //xthis.idleState = 'Started.';
    this.timedOut = false;
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  stay() {
    this.childModal.hide();
    this.reset();
  }

  logout() {
    this.childModal.hide();
    sessionStorage.removeItem('keys');
    this.router.navigate(['/']);
  }
}

import { Directive, Input } from '@angular/core';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from "rxjs";
import { SessionQuery } from './state/session.query';

@Directive({selector: '[showIfLoggedIn]'})
export class ShowIfLoggedInDirective {
  subscription;
  @Input('showIfLoggedIn') renderTemplate;

  constructor( private templateRef : TemplateRef<any>,
               private viewContainer : ViewContainerRef,
               private authQuery: SessionQuery
              ) {
  }

  ngOnInit() {
    this.subscription = this.authQuery.isLoggedIn$.subscribe(isLoggedIn => {
      // console.log(isLoggedIn)
      this.viewContainer.clear();
     if( isLoggedIn ) {
        if( this.renderTemplate ) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      } else {
        if( this.renderTemplate ) {
          this.viewContainer.clear();
        } else {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      }
    });
  }

  ngOnDestory() {
    this.subscription.unsubscribe();
 }
}
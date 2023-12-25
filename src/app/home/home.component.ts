import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observer, Subscription, interval } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() {}

  ngOnInit(): void {
  
    const customIntervalObservable = new Observable<number>((observer ) => {
      let count = 0;
      setInterval( () => {
        observer.next(count);

        if ( count == 2){
          observer.complete();
        }

        if(count > 3) {
          observer.error(new Error("Count passed the limit!"));
        }

        count++;
      }, 1000);
    });

  
    this.firstObsSubscription = customIntervalObservable.pipe(
      filter( (data) => {
        return data > 0;
      }),
      map((data) => {
        return 'Round: ' + (data + 1);
      })
     ).subscribe(data => {
      console.log(data);
     }, error => {
      console.log(error);
      alert(error.message);
     }, () => {
      console.log("Completed!")
     })
     
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
} 

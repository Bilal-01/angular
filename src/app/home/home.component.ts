import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observer, Subscription, interval } from 'rxjs';
import { Observable } from 'rxjs-compat';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() {}

  ngOnInit(): void {
  // this.firstObsSubscription = interval( 1000 ).subscribe( count => {
  //     console.log(count)
  //   })
  
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
  
    this.firstObsSubscription = customIntervalObservable.subscribe(data => {
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
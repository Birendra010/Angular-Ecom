import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.css'],
})
export class FailedComponent {
  constructor(private http: HttpClient) {}
  url: string = environment.API_URL;

  ngOnInit(): void{
    this.check();
  }
  check() {
      this.http
        .post(this.url + '/paymentStatus', {
          id: JSON.parse(localStorage.getItem('paymentResponse') || '').id,
        })
        .subscribe((res) => {
          localStorage.setItem('paymentIntent', JSON.stringify(res));
        });
  }
}

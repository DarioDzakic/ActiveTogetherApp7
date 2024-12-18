import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Validators, FormBuilder, FormsModule } from '@angular/forms';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'app-add-data',
  standalone: true,  // standalone-Komponente
  imports: [SharedModule, MatInputModule, MatFormFieldModule, MatError, MatCheckboxModule, FormsModule,
     MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatButtonModule],  // Import der benötigten Module
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css'],
  providers: []
})
export class AddDataComponent implements OnInit {
  constructor(private formbuilder: FormBuilder, public storeService: StoreService, private backendService: BackendService) {
  }
  public registrationForm: any;
  public newsletter: boolean = false;



  ngOnInit(): void {
    this.registrationForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      courseId: ['', Validators.required],
      birthdate: [null, Validators.required],
      email: [null, [Validators.email]]
    })
    
  }


  onSubmit() {
    if(this.registrationForm.valid) {
      this.backendService.addRegistration(this.registrationForm.value, this.storeService.currentPage);
    }
  }

}

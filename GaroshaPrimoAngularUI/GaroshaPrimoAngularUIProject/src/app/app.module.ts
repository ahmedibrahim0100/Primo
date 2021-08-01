import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './Authentication/Components/sign-up/sign-up.component';
import { SignInComponent } from './Authentication/Components/sign-in/sign-in.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './Authorization/auth.guard';
import { UserService } from './Authentication/Services/user.service';
import { ItemsSelectorComponent } from './Items/Components/items-selector/items-selector.component';
import { ItemsListComponent } from './Items/Components/items-list/items-list.component';
import { ItemsService } from './Items/Services/items.service';
import { SellingInvoiceComponent } from './Selling/Components/selling-invoice/selling-invoice.component';
import { TestComponent } from './Selling/Components/test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ItemsBrowserComponent } from './Items/Components/items-browser/items-browser.component';
import { CustomersSelectorComponent } from './Customers/Components/customers-selector/customers-selector.component';
import { CustomersBrowserComponent } from './Customers/Components/customers-browser/customers-browser.component';
import { AssignUserComponent } from './Authentication/Components/assign-user/assign-user.component';
import { InvoicePaymentComponent } from './Selling/Components/invoice-payment/invoice-payment.component';
import { NewItemComponent } from './Items/Components/new-item/new-item.component';
import { NewItemRepetitionErrorComponent } from './Items/Components/new-item-repetition-error/new-item-repetition-error.component';
import { SimpleAlertWindowComponent } from './SharedTools/simple-alert-window/simple-alert-window.component';




@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    SellingInvoiceComponent,
    ItemsSelectorComponent,
    ItemsListComponent,
    TestComponent,
    ItemsBrowserComponent,
    CustomersSelectorComponent,
    CustomersBrowserComponent,
    AssignUserComponent,
    InvoicePaymentComponent,
    NewItemComponent,
    NewItemRepetitionErrorComponent,
    SimpleAlertWindowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    AuthGuard,
    UserService,
    ItemsService
  ],
  entryComponents: [
    ItemsBrowserComponent,
    CustomersBrowserComponent,
    AssignUserComponent,
    InvoicePaymentComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

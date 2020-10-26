import { Routes } from '@angular/router';
import { SignUpComponent } from './Authentication/Components/sign-up/sign-up.component';
import { SignInComponent } from './Authentication/Components/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './Authorization/auth.guard';
import { Component } from '@angular/core';
import { ItemsListComponent } from './Items/Components/items-list/items-list.component';
import { ItemsSelectorComponent } from './Items/Components/items-selector/items-selector.component';
import { SellingInvoiceComponent } from './Selling/Components/selling-invoice/selling-invoice.component';
import { CustomersSelectorComponent } from './Customers/Components/customers-selector/customers-selector.component';


export const appRoutes : Routes = [
    { path : '', redirectTo : '/sign-in', pathMatch : 'full' },
    { path : 'home', component : HomeComponent, canActivate: [AuthGuard] },
    { path: 'sign-up', component: SignUpComponent },
    { path : 'sign-in', component : SignInComponent },
    { path: 'items-list', component: ItemsListComponent },
    { path: 'items-selector', component: ItemsSelectorComponent },
    { path: 'selling-invoice', component: SellingInvoiceComponent },
    { path : 'customers-selector', component : CustomersSelectorComponent }
]
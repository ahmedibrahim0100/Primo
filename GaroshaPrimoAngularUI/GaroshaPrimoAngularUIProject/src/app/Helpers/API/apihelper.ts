import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';

export class APIHelper implements OnInit{

    constructor(private apiClient : HttpClient){
        
    }
    ngOnInit(): void {
        this.InitializeClient();
    }

    InitializeClient(){
        
    }
}

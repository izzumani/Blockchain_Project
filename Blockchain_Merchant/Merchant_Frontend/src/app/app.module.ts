import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HttpClientModule }    from '@angular/common/http';
import {MerchandiseDataService} from './services/MerchandiseDataService'
import { MerchandiselistComponent } from './main/merchandiselist/merchandiselist.component';
import { ViewcartmodalComponent } from './main/viewcartmodal/viewcartmodal.component';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// import { SocketIoModule, SocketIoConfig } from 'ng6-socket-io';

import { GraphQLModule } from './graphql.module';
//  const config: SocketIoConfig = { url: `${environment.blockchainapiUrl}`, options: {} };
//const config: SocketIoConfig = { url: `${environment.socketioapiUrl}`, options: {} };
// 
@NgModule({
  declarations: [
    AppComponent,
    MerchandiselistComponent,
    ViewcartmodalComponent

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgbModule,
   // SocketIoModule.forRoot(config),
    GraphQLModule 
  ],
  providers: [MerchandiseDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

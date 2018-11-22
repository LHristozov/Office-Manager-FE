import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './guards/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { routing } from './app-routing.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {ObserversModule} from '@angular/cdk/observers';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { HttpModule } from '@angular/http';
import { ItemService } from './shared/items/item.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './item-list/item-list.component';
import { UsersService } from './shared/users/users.service';
import { CustomItemComponent } from './custom-item-button/custom-item-button.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormPopUpComponent } from './form-pop-up/form-pop-up.component';
import { SummaryComponent } from './summary/summary.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReqItemListComponent } from './req-item-list/req-item-list.component';
import { RequestedComponent } from './requested/requested.component';
import { TextEllipsisPipe } from './text-ellipsis.pipe';
import { NgxLoadingModule } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';

/**
 * NgModule that includes all Material modules that are required to serve
 * the Plunker.
 */
@NgModule({
  exports: [
    // CDK
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    ScrollDispatchModule,
    CdkStepperModule,
    CdkTableModule,

    // Material
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
  ],

imports: [BrowserAnimationsModule],
declarations: []
})
export class MaterialModule {}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    ItemListComponent,
    CustomItemComponent,
    FormPopUpComponent,
    SummaryComponent,
    SearchBarComponent,
    ReqItemListComponent,
    RequestedComponent,
    TextEllipsisPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    routing,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    NgxLoadingModule.forRoot({}),
    ToastrModule.forRoot({})
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    HttpClient,
    ItemService,
    UsersService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    FormPopUpComponent
  ]

})
export class AppModule { }

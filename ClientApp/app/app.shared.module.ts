import { AppErrorHandler } from './app.error-handler';
import { ErrorHandler } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {ToastyModule} from 'ng2-toasty';

import { MarcaService } from './services/marca.service';
import { UnidadeMedidaService } from './services/unidade-medida.service';
import { ProdutoService } from './services/produto.service';
import { ClienteService } from './services/cliente.service';
import { VendaService } from './services/venda.service';
import * as Raven from 'raven-js';

import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { CpfPipe } from './pipes/cpf.pipe';
import { CnpjPipe } from './pipes/cnpj.pipe';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { MarcaFormComponent } from './components/marca/marca-form/marca-form.component';
import { ViewMarcaComponent } from './components/marca/view-marca/view-marca.component';
import { MarcaListComponent } from './components/marca/marca-list/marca-list.component';
import { UnidadeMedidaFormComponent } from './components/unidade-medida/unidade-medida-form/unidade-medida-form.component';
import { UnidadeMedidaListComponent } from './components/unidade-medida/unidade-medida-list/unidade-medida-list.component';
import { ViewUnidadeMedidaComponent } from './components/unidade-medida/view-unidade-medida/view-unidade-medida.component';
import { ViewClienteComponent } from './components/cliente/view-cliente/view-cliente.component';
import { ClienteFormComponent } from './components/cliente/cliente-form/cliente-form.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ProdutoFormComponent } from './components/produto/produto-form/produto-form.component';
import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';
import { ViewProdutoComponent } from './components/produto/view-produto/view-produto.component';
import { VendaFormComponent } from './components/venda/venda-form/venda-form.component';
import { VendaListComponent } from './components/venda/venda-list/venda-list.component';
import { ViewVendaComponent } from './components/venda/view-venda/view-venda.component';
Raven
  .config('https://fea869838b90474aaa0dfb21e1bcad0f@sentry.io/1222781')
  .install();


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        MarcaFormComponent,
        ViewMarcaComponent,
        MarcaListComponent,
        UnidadeMedidaFormComponent,
        UnidadeMedidaListComponent,
        ViewUnidadeMedidaComponent,
        ViewClienteComponent,
        ClienteFormComponent,
        ClienteListComponent,
        ProdutoFormComponent,
        ProdutoListComponent,
        ViewProdutoComponent,
        VendaFormComponent,
        VendaListComponent,
        ViewVendaComponent,
        CpfPipe,
        CnpjPipe
    ],
    imports: [
        DateValueAccessorModule,
        CommonModule,
        HttpModule,
        FormsModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'vendas', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'marcas/new', component: MarcaFormComponent },
            { path: 'marcas/edit/:id', component: MarcaFormComponent },
            { path: 'marcas/:id', component: ViewMarcaComponent },
            { path: 'marcas', component: MarcaListComponent },
            { path: 'unidadeMedida/new', component: UnidadeMedidaFormComponent },
            { path: 'unidadeMedida/edit/:id', component: UnidadeMedidaFormComponent },
            { path: 'unidadeMedida/:id', component: ViewUnidadeMedidaComponent },
            { path: 'unidadeMedida', component: UnidadeMedidaListComponent },
            { path: 'clientes/new', component: ClienteFormComponent },
            { path: 'clientes/edit/:id', component: ClienteFormComponent },
            { path: 'clientes/:id', component: ViewClienteComponent },
            { path: 'clientes', component: ClienteListComponent },
            { path: 'produtos/new', component: ProdutoFormComponent },
            { path: 'produtos/edit/:id', component: ProdutoFormComponent },
            { path: 'produtos/:id', component: ViewProdutoComponent },
            { path: 'produtos', component: ProdutoListComponent },
            { path: 'vendas/new', component: VendaFormComponent },
            { path: 'vendas/:id/:clienteId/:produtoId', component: ViewVendaComponent },
            { path: 'vendas', component: VendaListComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'vendas' }
        ])
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },
        MarcaService,
        UnidadeMedidaService,
        ClienteService,
        ProdutoService,
        VendaService
    ]
})
export class AppModuleShared {
}

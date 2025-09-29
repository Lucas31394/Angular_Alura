import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './componentes/container/container.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { SeparadorComponent } from './componentes/separador/separador.component';
import { ContatoComponent } from './componentes/contato/contato.component';
import { FormsModule } from '@angular/forms';

interface Contato {
  id: number
  nome: string
  telefone: string
}

import agenda from './agenda.json'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ContainerComponent,
    CabecalhoComponent,
    SeparadorComponent,
    ContatoComponent,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  alfabeto: string = 'abcdefghijklmnopqrstuvwxyz'
  contatos: Contato[] = agenda

  filtroPorTexto: string = ''

  normalizarString(texto: string): string {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  filtrarContatosPorTexto(): Contato[] {
    return this.contatos.filter(contato => {
      return this.normalizarString(contato.nome).includes(this.normalizarString(this.filtroPorTexto.toLowerCase()))
    })
  }

  filtrarContatosPorLetra(letra: string): Contato[] {
    return this.filtrarContatosPorTexto().filter(contato => {
      return this.normalizarString(contato.nome).startsWith(this.normalizarString(letra))
    }
    )
  }
}

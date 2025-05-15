import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface PathItem {
  id: number;
  path: string;
}

@Component({
  selector: 'app-path-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './path-generator.component.html',
  styleUrls: ['./path-generator.component.scss']
})
export class PathGeneratorComponent {
  filePath: string = '';
  commitHash: string = '';
  output: string = '';
  pathList: PathItem[] = [];
  nextId: number = 1;
  copiedItemId: number | null = null;

  // Novas propriedades para posicionamento da mensagem "Copiado!"
  showCopiedMessage: boolean = false;
  copiedMessageTop: number = 0;
  copiedMessageLeft: number = 0;

  generateOutput(): void {
    // Validar se ambos os campos foram preenchidos
    if (!this.filePath.trim() || !this.commitHash.trim()) {
      alert('Por favor, preencha o caminho do arquivo e a hash do commit.');
      return;
    }

    // Garantir que a hash tenha apenas os 10 primeiros caracteres
    const trimmedHash = this.commitHash.trim().substring(0, 10);

    // Gerar a saída no formato desejado
    const formattedPath = `${this.filePath.trim()}#${trimmedHash}`;

    // Adicionar à lista
    this.pathList.push({
      id: this.nextId++,
      path: formattedPath
    });

    // Mostrar o último item gerado como output
    this.output = formattedPath;

    // Limpar os inputs automaticamente
    this.filePath = '';
    this.commitHash = '';
  }

  removeItem(id: number): void {
    this.pathList = this.pathList.filter(item => item.id !== id);
  }

  copyItemToClipboard(id: number, path: string, event: MouseEvent): void {
    navigator.clipboard.writeText(path)
      .then(() => {
        // Define qual item foi copiado para mostrar feedback visual
        this.copiedItemId = id;

        // Posiciona a mensagem "Copiado!" próximo ao botão clicado
        const buttonRect = (event.target as HTMLElement).getBoundingClientRect();
        this.copiedMessageTop = buttonRect.top - 40; // 40px acima do botão
        this.copiedMessageLeft = buttonRect.left - 25; // Centralizado acima do botão

        // Mostra a mensagem
        this.showCopiedMessage = true;

        // Reseta após 1.5 segundos
        setTimeout(() => {
          this.copiedItemId = null;
          this.showCopiedMessage = false;
        }, 1500);
      })
      .catch(err => {
        console.error('Erro ao copiar texto: ', err);
      });
  }

  copyAllToClipboard(): void {
    if (this.pathList.length === 0) {
      alert('Não há itens para copiar.');
      return;
    }

    const allPaths = this.pathList.map(item => item.path).join('\n');

    navigator.clipboard.writeText(allPaths)
      .then(() => {
        alert(`${this.pathList.length} itens copiados para a área de transferência!`);
      })
      .catch(err => {
        console.error('Erro ao copiar texto: ', err);
      });
  }

  clear(): void {
    this.filePath = '';
    this.commitHash = '';
  }

  clearList(): void {
    if (confirm('Tem certeza que deseja limpar toda a lista?')) {
      this.pathList = [];
      this.output = '';
      this.nextId = 1;
    }
  }
}
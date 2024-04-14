import { TestBed } from '@angular/core/testing';

import { ConexaoPersonagemService } from './conexao-personagem.service';

describe('ConexaoPersonagemService', () => {
  let service: ConexaoPersonagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexaoPersonagemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

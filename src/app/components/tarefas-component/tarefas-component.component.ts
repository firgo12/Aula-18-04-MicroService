import { Tarefa } from './../../interfaces/Tarefa';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TarefaServiceService } from '../../services/tarefa-service.service';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarefas-component.component.html',
  styleUrl: './tarefas-component.component.css'
})
export class TarefasComponentComponent {

  tarefas:Tarefa[] = [];
  tarefaForm: FormGroup = new FormGroup ({})

   constructor(private tarefaService:TarefaServiceService, private formBuilder: FormBuilder) {
    this.tarefaForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      dataVencimento: ['', Validators.required]
    })
  }

  generateRandomString(length: number): string  {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  inserir(){
    if(this.tarefaForm.valid) {
      const TarefaNovo: Tarefa = {
        titulo: this.tarefaForm.value.titulo,
        descricao: this.tarefaForm.value.descricao,
        dataVencimento: this.tarefaForm.value.dataVencimento,
        id: this.generateRandomString(6)
      }
      this.tarefaForm.reset()
      this.tarefaService.adicionar(TarefaNovo)
      alert('Cadastrado com sucesso!')
    } else {
      alert('Preencha todos os campos')
    }

  }

  listar():void{
      this.tarefas = this.tarefaService.listar();
  }

  remover(id:string):void{
    this.tarefaService.remover(id);
    alert('Removido com Sucesso!');
  }

  ngOnInit():void{
    this.listar();
  }

}

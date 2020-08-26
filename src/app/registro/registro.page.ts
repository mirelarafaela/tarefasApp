import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CpfValidator } from '../validators/cpf.validators';
import { ComparacaoValidator } from '../validators/comparacao-validator';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public formRegistro: FormGroup;

  public mensagens_validacao = {
    nome: [
      {tipo: 'required', mensagem: 'O campo nome é obrigatório!' },
      {tipo: 'minlength', mensagem: 'O nome deve conter pelo menos 3 caracters!'}
    ],
    cpf: [
      {tipo: 'required', mensagem: 'O campo cpf é obrigatório!'},
      {tipo: 'minlength', mensagem: 'O cpf deve ter pelo menos 11 caracters!'},
      {tipo: 'maxlength', mensagem: ' O cpf deve ter no máximo 14 caracteres!'},
      {tipo: 'invalido', mensagem: 'CPF inválido!'}
    ],
    dataNascimento: [
      {tipo: 'required', mensagem: 'O campo Data de Nascimento é obrigatório!' },
    ],
    genero: [
      {tipo: 'required', mensagem: 'Escolha um gênero!' },
    ],
    celular: [
      {tipo: 'required', mensagem: 'O campo celular é obrigatório!'},
      {tipo: 'maxlength', mensagem: 'O celular deve ter no máximo 16 caracters!'},
      {tipo: 'minlength', mensagem: 'O celular deve ter pelo menos 10 caracters!'}
    ],
    email: [
      {tipo: 'required', mensagem: 'O campo email é obrigatório!'},
      {tipo: 'email', mensagem: 'e-mail inválido!'}
    ],
    senha: [
      {tipo: 'required', mensagem: 'O campo senha é obrigatório!'},
      {tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracters!'}
    ],
    confirma: [
      {tipo: 'required', mensagem: 'O campo confirmar senha é obrigatório!'},
      {tipo: 'minlength', mensagem: 'O campo confirmar senha deve ter pelo menos 6 caracters!'},
      {tipo: 'comparacao', mensagem: 'Deve ser igual a senha'}
    ],

  };
  

  constructor(private formBuilder: FormBuilder, private router:Router) { 
   this.formRegistro = formBuilder.group({
    nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(14),
    CpfValidator.cpfValido
    ])],
    dataNascimento: ['', Validators.compose([Validators.required])],
    genero: ['', Validators.compose([Validators.required])],
    celular: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(16)])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    confirma: ['', Validators.compose([Validators.required, Validators.minLength(6)])],

  },{
    validators: ComparacaoValidator('senha', 'confirma')
  }
  );
 }

 ngOnInit() {
}

public registro(){
  if(this.formRegistro.valid){
console.log('formulário válido!!');
this.router.navigateByUrl('/home');
  }else{
console.log('formulário inválido!')
  }
}

}
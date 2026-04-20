
const dadosProjetos = {
    "projeto-1": {
        titulo: "Sistema PDV Restaurante",
        tag: "C# / .NET",
        descricao: "Sistema funcional para gerir estoque e vendas de um restaurante.",
        desafio: "Criar uma interface rápida e eficiente para gestão do PDV.",
        metodos: "Utilização da plataforma .NET e Windows Forms.",
        github: "https://github.com/nycolasAugusto/Sistema-Funcional-Restaurante",
        imagens: ["../home/imgs/imgs-projetos/sisPDV.jpeg"],
        codigo: `
// Controller REST construído com ASP.NET Core
// Utiliza injeção de dependência e Entity Framework Core
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Espeto.Data;
using Espeto.Models;

namespace Espeto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClienteController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes()
        {
            return await _context.Clientes.ToListAsync();
        }

        [HttpGet("pesquisar/{termo}")]
        public async Task<ActionResult<IEnumerable<Cliente>>> PesquisarClientes(string termo)
        {
            var clientes = await _context.Clientes
                .Where(c => c.Nome.Contains(termo) || (c.Telefone != null && c.Telefone.Contains(termo)))
                .Take(5)
                .ToListAsync();

            return clientes;
        }
    }
}
        `
    },
    "projeto-2": {
        titulo: "Sistema G.A.M",
        tag: "Java / Docker / Equipe",
        descricao: "Aplicação conectora de médicos (Gestão Ágil).",
        desafio: "Coordenar a arquitetura do sistema em equipa.",
        metodos: "Uso de Java e princípios de desenvolvimento ágil.",
        github: "https://github.com/nycolasAugusto/Aplica-o-conectora-de-m-dicos---G.A.M",
        imagens: ["../home/imgs/imgs-projetos/imgp2.jpeg"],
        codigo: `
// Serviço Spring com regras de negócio e validações
// Implementação de encriptação de senhas (PasswordEncoder)
@Service
public class MedicoService {
    private final MedicoRepository medicoRepository;
    private final MedicoMapper mapMedico;
    private final PasswordEncoder codificaSenha;

    public MedicoService(MedicoRepository medicoRepository, MedicoMapper mapMedico, PasswordEncoder codificaSenha) {
        this.medicoRepository = medicoRepository;
        this.mapMedico = mapMedico;
        this.codificaSenha = codificaSenha;
    }

    public MedicoDTO criarMedico(MedicoDTO medicoDTO) {
        if (medicoRepository.existsByCpf(medicoDTO.getCpf())) {
            throw new RegraDeNegocioException("CPF já cadastrado");
        }
        if (medicoRepository.existsByEmail(medicoDTO.getEmail())) {
            throw new RegraDeNegocioException("E-mail já cadastrado");
        }
        
        Medico medicoEntidade = mapMedico.toEntity(medicoDTO);
        medicoEntidade.setSenha(codificaSenha.encode(medicoDTO.getSenha()));
        Medico medicoSalvo = medicoRepository.save(medicoEntidade);
        return mapMedico.toDto(medicoSalvo);
    }
}
        `
    },
    "projeto-3": {
        titulo: "Automatizações Python",
        tag: "Python",
        descricao: "Scripts para automatizar tarefas e processos.",
        desafio: "Criar scripts limpos e eficientes.",
        metodos: "Uso de bibliotecas Python para manipulação de dados/arquivos.",
        github: "https://github.com/nycolasAugusto/Automatiza-es-com-Python",
        imagens: [],
        codigo: `
# Robô em Python que consome uma API externa e grava os dados localmente
# Utiliza a biblioteca requests e SQLite3
import requests
import sqlite3
from datetime import datetime
import schedule
import time

def coletar_dados():
    print(f"\\n[{datetime.now().strftime('%H:%M:%S')}] Iniciando nova coleta...")
    
    conexao = sqlite3.connect("meus_investimentos.db")
    cursor = conexao.cursor()
    
    url = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL"
    resposta = requests.get(url)
    dados = resposta.json()

    dolar = float(dados['USDBRL']['bid'])
    euro = float(dados['EURBRL']['bid'])
    bitcoin = float(dados['BTCBRL']['bid'])
    data_hora = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    comando = "INSERT INTO historico_cotacoes (data_hora, moeda, valor_brl) VALUES (?, ?, ?)"
    cursor.execute(comando, (data_hora, "USD", dolar))
    cursor.execute(comando, (data_hora, "EUR", euro))
    cursor.execute(comando, (data_hora, "BTC", bitcoin))

    conexao.commit()
    conexao.close()
    print("Coleta finalizada! Aguardando o próximo ciclo...")

print("--- Robô Financeiro Iniciado ---")
schedule.every(10).seconds.do(coletar_dados) 
        `
    },
    "projeto-4": {
        titulo: "Landing Page Farmácia",
        tag: "Web",
        descricao: "Página web desenvolvida para a Farmácia Águas Claras.",
        desafio: "Criar um design responsivo e atrativo.",
        metodos: "HTML, CSS e estruturação semântica.",
        github: "https://github.com/nycolasAugusto/Farmaciaaguasclarass",
        imagens: ["../home/imgs/imgs-projetos/LandingPageFarmacia.jpeg"],
        codigo: `
// Consumo de API assíncrona (Fetch) e manipulação dinâmica do DOM
async function carregarBanners() {
    try {
        const response = await fetch(\`\${API_BASE_URL}/api/banners\`);
        const banners = await response.json();

        const slidesContainer = document.querySelector(".slides");
        const dotsContainer = document.querySelector(".indicators");

        slidesContainer.innerHTML = "";
        dotsContainer.innerHTML = "";

        if (banners.length === 0) {
            slidesContainer.innerHTML = '<div class="slide active"><img src="./imgs/logo.jpeg"><div class="slide-caption"><h2>Bem-vindo</h2></div></div>';
            return;
        }

        totalSlides = banners.length;

        banners.forEach((banner, index) => {
            const slideDiv = document.createElement("div");
            slideDiv.classList.add("slide");
            if (index === 0) slideDiv.classList.add("active");

            const imgUrl = \`\${API_BASE_URL}\${banner.imagemUrl}\`;

            slideDiv.innerHTML = \`
                <img src="\${imgUrl}" alt="\${banner.titulo}" onerror="this.src='./imgs/logo.jpeg'">
                <div class="slide-caption">
                    <h2>\${banner.titulo || ""}</h2>
                    <p>\${banner.descricao || ""}</p>
                </div>
            \`;
            slidesContainer.appendChild(slideDiv);
        });
        
        configurarControles();
        iniciarAutoPlay();

    } catch (error) {
        console.error("Erro:", error);
    }
}
        `
    },
    "projeto-5": {
        titulo: "Sistema Biblioteca",
        tag: "Java",
        descricao: "Gestão de acervo de uma biblioteca (BibliotecaNW).",
        desafio: "Gerenciar o empréstimo e devolução de livros.",
        metodos: "Lógica orientada a objetos em Java.",
        github: "https://github.com/nycolasAugusto/BibliotecaNW",
        imagens: [],
        codigo: `
// Demonstração de conhecimentos em Java Streams API e Lambdas
public class BibliotecaController {

    private List<Livro> livros;
    private List<Usuario> usuarios;
    private List<Emprestimo> livrosEmprestados;
    private List<Atrasos> emprestimosAtrasados;
    
    public BibliotecaController(List<Livro> livros, List<Usuario> usuarios, List<Emprestimo> livrosEmprestados,
            List<Atrasos> emprestimosAtrasados) {
        this.livros = livros;
        this.usuarios = usuarios;
        this.livrosEmprestados = livrosEmprestados;
        this.emprestimosAtrasados = emprestimosAtrasados;
    }

    public Livro pesquisarLivro(int codigoUser){
        return livros.stream()
        .filter(c -> c.getCodigo() == codigoUser)
        .findFirst()
        .orElse(null);            
    }

    public List<Livro> pesquisaLivrosPorAutor(String autorUser){
        return livros.stream()
        .filter(a -> a.getAutorLivro().trim().equalsIgnoreCase(autorUser))
        .collect(Collectors.toList());
    }    
    
    public boolean cadastrarLivro(String nome, String autor, int anoPublicacao, int codigo, String categoria, int quantidade){
        for (Livro l : livros) {
            if (l.getCodigo() == codigo) return false;
        }
        Livro livro1 = BibliotecaFactory.criaLivro(nome, autor, anoPublicacao, codigo, Categoria.getCategoria(categoria), quantidade);
        livros.add(livro1);
        return true;
    }   
}
        `
    },
    "projeto-6": {
        titulo: "Sistema Locadora",
        tag: "Java",
        descricao: "Aplicação para a Locadora Nova Faculdade.",
        desafio: "Aplicar conceitos avançados de POO (Herança, Polimorfismo).",
        metodos: "Java com foco em arquitetura de classes.",
        github: "https://github.com/nycolasAugusto/LocadoraNovaFaculdade",
        imagens: [],
        codigo: `
// Menu interativo via CLI interagindo com métodos de controlador
public class ClienteView {

    public static void menuCliente(LocadoraController controller, Scanner scanner) {
        int opcaoCliente;
        do {
            System.out.println("\\n--- Área do Cliente ---");
            System.out.println("1. Explorar Catálogo de Produtos");
            System.out.println("2. Meus Aluguéis Ativos");
            System.out.println("3. Minhas Compras");
            System.out.println("0. Voltar ao Menu Principal");
            System.out.print("Escolha uma opção: ");
            opcaoCliente = ConversorUtil.testarInt(scanner.nextLine());

            switch (opcaoCliente) {
                case 1:
                    // ... Lógica de exploração ...
                    break;
                case 2:
                    System.out.println("\\nDigite seu cpf");
                    Long cpfCliente = ConversorUtil.testarLong(scanner.nextLine());
                    if (controller.clientePossuiEmprestimo(cpfCliente)) {
                        System.out.println(controller.mostrarEmprestimoCliente(cpfCliente));
                    } else {
                        System.out.println("Cliente nao encontrado");
                    }
                    break;
                case 0:
                    System.out.println("Voltando ao Menu Principal...");
                    break;
                default:
                    System.out.println("Opção inválida. Tente novamente.");
            }
        } while (opcaoCliente != 0);
    }
}
        `
    },
    "projeto-7": {
        titulo: "Task Checker",
        tag: "Java",
        descricao: "Gerenciador e verificador de tarefas.",
        desafio: "Manter o estado das tarefas atualizado e sincronizado.",
        metodos: "Uso de estruturas de dados para fila/lista de tarefas.",
        github: "https://github.com/nycolasAugusto/task-checker",
        imagens: [],
        codigo: `
// Classe Main (Bootstrap) de uma aplicação Spring Boot
package com.example.task;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TaskApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskApplication.class, args);
    }

}
        `
    },
    "projeto-8": {
        titulo: "Algoritmos em C",
        tag: "C",
        descricao: "Resolução de exercícios e estrutura de dados em C.",
        desafio: "Gerenciamento manual de memória e ponteiros.",
        metodos: "Implementação de lógica procedural.",
        github: "https://github.com/nycolasAugusto/C-exercises",
        imagens: [],
        codigo: `
// Manipulação procedural básica e algoritmos em linguagem C
#include <stdio.h>

int x,a, b, num;

int ler(){
    int num;
    printf("digite :");
    scanf("%i", &num);
    return num;
}

void troca(){
    x = a;
    a = b;
    b = x;
}

int main(){
    a = ler();
    b = ler();

    printf("A = %i \\tB = %i",a, b);
    troca();
    
    printf("\\n\\nA = %i \\tB = %i",a, b);
    return 0;
}
        `
    },
    "projeto-9": {
        titulo: "Robôs UiPath",
        tag: "UiPath",
        descricao: "Automação de Processos Robóticos (RPA) para empresas.",
        desafio: "Mapear seletores complexos em ecrãs dinâmicos.",
        metodos: "Uso da plataforma UiPath Studio.",
        github: "https://github.com/nycolasAugusto/Projetos-UiPath",
        imagens: [],
        codigo: `
// Definição e dependências de um processo RPA no UiPath (project.json)
{
  "name": "Automatizar Cotação ATIVOS",
  "projectId": "43f226a5-659e-4a65-850f-ca77835e9a66",
  "description": "PEGAR PLANILHA, PEGAR VALOR DOS ATIVOS, COLOCAR VALOR NA PLANILHA",
  "main": "Main.xaml",
  "dependencies": {
    "UiPath.GSuite.Activities": "3.8.0-preview",
    "UiPath.System.Activities": "[26.2.4]",
    "UiPath.UIAutomation.Activities": "[25.10.28]"
  },
  "schemaVersion": "4.0",
  "studioVersion": "26.0.190.0",
  "runtimeOptions": {
    "autoDispose": false,
    "netFrameworkLazyLoading": false,
    "isPausable": true,
    "isAttended": false,
    "requiresUserInteraction": true
  }
}
        `
    },
    "projeto-10": {
        titulo: "Gestão de Faculdade",
        tag: "C# / Equipe",
        descricao: "Sistema de gerenciamento de pessoas e cursos.",
        desafio: "Integrar diferentes módulos (alunos, professores, cursos) num único sistema.",
        metodos: "Desenvolvimento em C# .NET.",
        github: "https://github.com/nycolasAugusto/Sistema-Faculdade---gerenciamento-de-pessoas-e-cursos---C-.NET",
        imagens: [],
        codigo: `
// Implementação do Padrão Repository e Entity Framework
using ApiFaculdade.Models;
using ApiFaculdade.Data;
using Microsoft.EntityFrameworkCore;

namespace ApiFaculdade.Repository;

public interface ICursoRepository {
    Task<IEnumerable<Curso>> GetAllAsync();
    Task<Curso?> GetByIdAsync(int id);
    Task AddAsync(Curso curso);
    Task UpdateAsync(Curso curso);
    Task DeleteAsync(int id);
}

public class CursoRepository : ICursoRepository
{
    private readonly AppDbContext _context;

    public CursoRepository(AppDbContext context) {
        _context = context;
    }

    public async Task<IEnumerable<Curso>> GetAllAsync() {
        return await _context.Cursos.ToListAsync();
    }

    public async Task AddAsync(Curso curso) {
        if (curso.Coordenadores == null || curso.Coordenadores.Count < 1) {
            throw new Exception("O curso precisa de pelo menos 1 coordenador.");
        }

        curso.TempoDoCursoEmMeses = ((curso.DataFim.Year - curso.DataInicio.Year) * 12)
                                    + curso.DataFim.Month - curso.DataInicio.Month;

        await _context.Cursos.AddAsync(curso);
        await _context.SaveChangesAsync();
    }
}
        `
    }
};

const projetoId = new URLSearchParams(window.location.search).get('id');
const projeto = dadosProjetos[projetoId];

if (projeto) {
    // Preencher textos
    document.getElementById('p-titulo').innerText = projeto.titulo;
    document.getElementById('p-tag').innerText = projeto.tag;
    document.getElementById('p-resumo').innerText = projeto.descricao;
    document.getElementById('p-desafio').innerText = projeto.desafio;
    document.getElementById('p-metodos').innerText = projeto.metodos;
    document.getElementById('p-github').href = projeto.github;

    // Destacar sintaxe do código
    const pCodigo = document.getElementById('p-codigo');
    pCodigo.textContent = projeto.codigo;

    const tagMap = { 'java': 'java', 'c#': 'csharp', 'python': 'python', 'c': 'c' };
    const tagLower = projeto.tag.toLowerCase();
    const linguagem = Object.keys(tagMap).find(k => tagLower.includes(k));
    if (linguagem) pCodigo.className = `language-${tagMap[linguagem]}`;

    // === LÓGICA DA IMAGEM ÚNICA ===
    const imgElement = document.getElementById('p-imagem');
    const caixaImagem = document.getElementById('caixa-imagem');
    
    // Verifica se o array tem pelo menos 1 imagem
    if (projeto.imagens && projeto.imagens.length > 0) {
        imgElement.src = projeto.imagens[0]; // Pega sempre a primeira foto
    } else {
        caixaImagem.style.display = 'none'; // Esconde a caixa preta se não houver foto
    }

    if (typeof Prism !== 'undefined') Prism.highlightAll();

} else {
    document.getElementById('p-titulo').innerText = "Projeto não encontrado";
    document.getElementById('p-resumo').innerText = "Por favor, volte à página inicial e selecione um projeto válido.";
    document.getElementById('caixa-imagem').style.display = 'none';
}
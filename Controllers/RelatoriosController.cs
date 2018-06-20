using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Estoque.Controllers.Resource;
using Estoque.Core;
using Estoque.Core.Models;
using Estoque.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Estoque.Controllers
{
    [Route("/api/relatorios")]
    public class RelatoriosController : Controller
    {
        private readonly IVendaRepository vendaRepository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly IProdutoRepository produtoRepository;
        private readonly EstoqueDbContext context;
        public RelatoriosController(EstoqueDbContext context, IVendaRepository vendaRepository, IProdutoRepository produtoRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.vendaRepository = vendaRepository;
            this.produtoRepository = produtoRepository;
        }

        [HttpGet]
        [Route("/api/relatorios/totalProdutos")]
        public ValorProduto GetValorTotalProdutos()
        {
            var valor = context.Produtos.Sum(x => x.PrecoCusto * x.QuantEstoque);

            ValorProduto val = new ValorProduto();

            val.Valor = valor;

            return val;
        }

        [HttpGet]
        [Route("/api/relatorios/mediaProdutos")]
        public ValorProduto GetValorMedioProdutos()
        {
            var count = context.Produtos.Where(t => t.DataValidade > DateTime.Now).Sum(t => t.QuantEstoque);
            var valor = context.Produtos.Sum(x => x.PrecoCusto * x.QuantEstoque);

            ValorProduto val = new ValorProduto();

            val.Valor = valor/count;

            return val;
        }

        [HttpGet]
        [Route("/api/relatorios/produtosVencidos")]
        public async Task<IEnumerable<Produto>> GetProdutosVencidos()
        {
            var vencidos = await context.Produtos
                .Where(t => t.DataValidade < DateTime.Now)
                .Include(p => p.Marca)
                .Include(p => p.UnidadeMedida)
                .ToListAsync();
            return vencidos;
        }

    }
}
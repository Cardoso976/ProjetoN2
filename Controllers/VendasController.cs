using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Estoque.Controllers.Resource;
using Estoque.Core;
using Estoque.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Estoque.Controllers
{
    [Route("/api/vendas")]
    public class VendasController : Controller
    {
        private readonly IVendaRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        public VendasController(IVendaRepository repository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<VendaResource>> GetVendas()
        {
            var vendas = await repository.GetVendas();

            return mapper.Map<IEnumerable<ProdutoCliente>, IEnumerable<VendaResource>>(vendas);
        }

        [HttpGet("{clienteId}&{produtoId}")]        
        public async Task<IActionResult> GetVenda(int clienteId, int produtoId)
        {
            var venda = await repository.GetVenda(clienteId, produtoId);
            if (venda == null) return NotFound();

            var result = mapper.Map<ProdutoCliente, VendaResource>(venda);
            return Ok(result);
        }
    }
}
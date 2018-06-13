using System;
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

        [HttpGet("{id}&{clienteId}&{produtoId}")]        
        public async Task<IActionResult> GetVenda(int id, int clienteId, int produtoId)
        {
            var venda = await repository.GetVenda(id, clienteId, produtoId);
            if (venda == null) return NotFound();

            var result = mapper.Map<ProdutoCliente, VendaResource>(venda);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateVenda([FromBody] VendaResource vendaResource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var venda = mapper.Map<VendaResource, ProdutoCliente>(vendaResource);
            venda.DataCompra = DateTime.Now;

            repository.Add(venda);
            await unitOfWork.CompleteAsync();

            venda = await repository.GetVenda(venda.Id, venda.ClienteId, venda.ProdutoId);
            var result = mapper.Map<ProdutoCliente, VendaResource>(venda);

            return Ok(result);
        }

        // Nao funciona
        // [HttpPut("{id}&{clienteId}&{produtoId}")]
        // public async Task<IActionResult> UpdateVenda([FromBody] VendaResource vendaResource, int id, int clienteId, int produtoId)
        // {
        //     var venda = await repository.GetVenda(id, clienteId, produtoId);
        //     if (venda == null) return NotFound();

        //     mapper.Map<VendaResource, ProdutoCliente>(vendaResource, venda);

        //     await unitOfWork.CompleteAsync();

        //     venda = await repository.GetVenda(id, clienteId, produtoId);
        //     var result = mapper.Map<ProdutoCliente, VendaResource>(venda);

        //     return Ok(result);
        // }

        [HttpDelete("{id}&{clienteId}&{produtoId}")]
        public async Task<IActionResult> DeleteProduto(int id, int clienteId, int produtoId)
        {
            var venda = await repository.GetVenda(id, clienteId, produtoId);
            if (venda == null) return NotFound();

            repository.Delete(venda);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }
    }
}
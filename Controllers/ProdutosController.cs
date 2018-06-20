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
    [Route("/api/produtos")]
    public class ProdutosController : Controller
    {
        private readonly IProdutoRepository repository;
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        public ProdutosController(IProdutoRepository repository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<ProdutoResource>> GetProdutosAsync()
        {
            var produtos = await repository.GetProdutos();

            return mapper.Map<IEnumerable<Produto>, IEnumerable<ProdutoResource>>(produtos);            
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProdutoAsync(int id)
        {
            var produto = await repository.GetProduto(id);
            if (produto == null) return NotFound();

            var result = mapper.Map<Produto, ProdutoResource>(produto);

            return Ok(result);
        }   

        [HttpPost]
        public async Task<IActionResult> CreateProduto([FromBody] SaveProdutoResource produtoResource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var produto = mapper.Map<SaveProdutoResource, Produto>(produtoResource);
            produto.UltimaModificacao = DateTime.Now;

            repository.Add(produto);
            await unitOfWork.CompleteAsync();

            produto = await repository.GetProduto(produto.Id);

            var result = mapper.Map<Produto, ProdutoResource>(produto);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduto(int id, [FromBody]SaveProdutoResource produtoResource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var produto = await repository.GetProduto(id);
            if (produto == null) return NotFound();

            mapper.Map<SaveProdutoResource, Produto>(produtoResource, produto);
            produto.UltimaModificacao = DateTime.Now;

            await unitOfWork.CompleteAsync();

            produto = await repository.GetProduto(id);
            var result = mapper.Map<Produto, ProdutoResource>(produto);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduto(int id)
        {
            var produto = await repository.GetProduto(id);
            if (produto == null) return NotFound();

            repository.Delete(produto);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }
    }
}
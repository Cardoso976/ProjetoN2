using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Estoque.Controllers.Resource;
using Estoque.Core.Models;
using Estoque.Core;
using Estoque.Persistence;

namespace Estoque.Controllers
{
    [Route("/api/marcas")]
    public class MarcasController : Controller
    {
        private readonly IMapper mapper;
        private readonly IMarcaRepository repository;
        private readonly IUnitOfWork unitOfWork;
        public MarcasController(IMarcaRepository repository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateMarca([FromBody] MarcaResource marcaResource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var marca = mapper.Map<MarcaResource, Marca>(marcaResource);

            repository.Add(marca);
            await unitOfWork.CompleteAsync();

            marca = await repository.GetMarca(marca.Id);

            var result = mapper.Map<Marca, MarcaResource>(marca);

            return Ok(result);
        }

        [HttpGet]
        public async Task<IEnumerable<MarcaResource>> GetMarcasAsync()
        {
            var marcas = await repository.GetMarcas();

            return mapper.Map<IEnumerable<Marca>, IEnumerable<MarcaResource>>(marcas);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMarca(int id, [FromBody] MarcaResource marcaResource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var marca = await repository.GetMarca(id);

            if (marca == null) return NotFound();

            mapper.Map<MarcaResource, Marca>(marcaResource, marca);
            
            await unitOfWork.CompleteAsync();

            marca = await repository.GetMarca(id);
            var result = mapper.Map<Marca, MarcaResource>(marca);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMarca(int id)
        {
            var marca = await repository.GetMarca(id);

            if (marca == null) return NotFound();

            var marcaResource = mapper.Map<Marca, MarcaResource>(marca);

            return Ok(marcaResource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMarca(int id)
        {
            var marca = await repository.GetMarca(id);
            if (marca == null) 
                return NotFound();

            repository.Remove(marca);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }       

    }
}
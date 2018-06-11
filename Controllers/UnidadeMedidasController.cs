using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Estoque.Controllers.Resource;
using Estoque.Core;
using Estoque.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Estoque.Controllers
{
    [Route("/api/unidadeMedidas")]
    public class UnidadeMedidasController : Controller
    {
        private readonly IUnidadeMedidaRepository repository;
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        public UnidadeMedidasController(IUnidadeMedidaRepository repository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<UnidadeMedidaResource>> GetUnidadeMedidas()
        {
            var unidadeMedidas = await repository.GetUnidadeMedidas();

            return mapper.Map<IEnumerable<UnidadeMedida>, IEnumerable<UnidadeMedidaResource>>(unidadeMedidas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUnidadeMedida(int id)
        {
            var unidadeMedida = await repository.GetUnidadeMedida(id);

            if (unidadeMedida == null) return NotFound();

            var result = mapper.Map<UnidadeMedida, UnidadeMedidaResource>(unidadeMedida);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUnidadeMedida([FromBody] UnidadeMedidaResource unidadeMedidaResource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var unidadeMedida = mapper.Map<UnidadeMedidaResource, UnidadeMedida>(unidadeMedidaResource);

            repository.Add(unidadeMedida);
            await unitOfWork.CompleteAsync();

            unidadeMedida = await repository.GetUnidadeMedida(unidadeMedida.Id);

            var result = mapper.Map<UnidadeMedida, UnidadeMedidaResource>(unidadeMedida);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUnidadeMedida(int id)
        {
            var unidadeMedida = await repository.GetUnidadeMedida(id);
            if (unidadeMedida == null) 
                return NotFound();

            repository.Remove(unidadeMedida);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUnidadeMedida(int id, [FromBody] UnidadeMedidaResource unidadeMedidaResource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var unidadeMedida = await repository.GetUnidadeMedida(id);
            
            if (unidadeMedida == null) return NotFound();

            mapper.Map<UnidadeMedidaResource, UnidadeMedida>(unidadeMedidaResource, unidadeMedida);

            await unitOfWork.CompleteAsync();

            unidadeMedida = await repository.GetUnidadeMedida(id);
            var result = mapper.Map<UnidadeMedida, UnidadeMedidaResource>(unidadeMedida);

            return Ok(result);
        }
    }
}
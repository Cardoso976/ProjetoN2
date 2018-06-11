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
    [Route("/api/clientes")]
    public class ClientesController : Controller
    {
        private readonly IClienteRepository repository;
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        public ClientesController(IClienteRepository repository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<ClienteResource>> GetClientes()
        {
            var clientes = await repository.GetClientes();

            return mapper.Map<IEnumerable<Cliente>, IEnumerable<ClienteResource>>(clientes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCliente(int id) 
        {
            var cliente = await repository.GetCliente(id);

            if (cliente == null) return NotFound();

            var marcaResource = mapper.Map<Cliente, ClienteResource>(cliente);

            return Ok(marcaResource);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCliente([FromBody] ClienteResource clienteResource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var cliente = mapper.Map<ClienteResource, Cliente>(clienteResource);

            cliente.UltimaModificacao = DateTime.Now;
            
            repository.Add(cliente);
            await unitOfWork.CompleteAsync();

            cliente = await repository.GetCliente(cliente.Id);
            
            var result = mapper.Map<Cliente, ClienteResource>(cliente);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCliente(int id, [FromBody] ClienteResource clienteResource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var cliente = await repository.GetCliente(id);

            if (cliente == null) return NotFound();

            mapper.Map<ClienteResource, Cliente>(clienteResource, cliente);
            await unitOfWork.CompleteAsync();

            cliente = await repository.GetCliente(cliente.Id);
            var result = mapper.Map<Cliente, ClienteResource>(cliente);

            return Ok(result);
        } 

    }
}
using AutoMapper;
using Estoque.Controllers.Resource;
using Estoque.Core.Models;

namespace Estoque.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            CreateMap<Cliente, ClienteResource>();
            CreateMap<Marca, MarcaResource>();
            CreateMap<Produto, ProdutoResource>();            
            CreateMap<ProdutoCliente, VendaResource>();
            CreateMap<UnidadeMedida, UnidadeMedidaResource>();

            // API Resource to Domain
            //CreateMap<ProdutoResource, Produto>();
        }
        
    }
}
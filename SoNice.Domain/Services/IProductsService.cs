using SoNice.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoNice.Domain.Services
{
    public interface IProductsService
    {
        Task<List<Product>> GetAllProducts(bool isnew = false);
        Task<Product> GetProductById(int id);
    }
}

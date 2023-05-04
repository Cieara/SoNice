using Microsoft.AspNetCore.Mvc;
using SoNice.DAL.Entities;
using SoNice.Domain.Services;
using SoNice.ViewModels;
using System.Collections.Generic;
using System.Reflection.Metadata.Ecma335;

namespace SoNice.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductShopController : ControllerBase
    {
        private readonly IProductsService _productsService;

        public ProductShopController(IProductsService productsService)
        {
            _productsService = productsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProductsFrontPage()
        {
            var result = await _productsService.GetAllProducts(isnew: true);

            return Ok(ConvertToProductViewModel(result));
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetProductWithCategories()
        {
            var result = await _productsService.GetAllProducts(isnew: false);

            var products = new
            {
                Products = result.Select(x => ConvertDetailedToProductViewModel(x)).ToList(),
                Categories = result.Select(x => x.Category.Name).Distinct().ToList(),
                PriceMax = result.Max(x => x.Price),
                PriceMin = result.Min(x => x.Price),
            };

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var result = await _productsService.GetProductById(id);

            return Ok(ConvertDetailedToProductViewModel(result));
        }

        private List<ProductViewModel> ConvertToProductViewModel(List<Product> products)
        {
            var productsViewModel = new List<ProductViewModel>();

            foreach (var p in products)
            {
                var productviewmodel = new ProductViewModel
                {
                    Price = p.Price,
                    CategoryId = p.CategoryId,
                    CreatedAt = DateTime.Now,
                    Description = p.Description,
                    Id = p.Id,
                    IsNew = p.IsNew,
                    Name = p.Name,
                    Rating = p.Rating,
                    Stock = p.Stock,
                    UpdatedAt = p.UpdatedAt,
                };
                productviewmodel.Image = p.ProductImages.Count > 0 ? Convert.ToBase64String(p.ProductImages.FirstOrDefault().Data) : "";
                productsViewModel.Add(productviewmodel);
            }
            return productsViewModel;
        }

        private ProductViewModel ConvertDetailedToProductViewModel(Product p)
        {
            return new ProductViewModel
            {
                Price = p.Price,
                CategoryId = p.CategoryId,
                CreatedAt = DateTime.Now,
                Description = p.Description,
                Id = p.Id,
                IsNew = p.IsNew,
                Name = p.Name,
                Rating = p.Rating,
                Stock = p.Stock,
                UpdatedAt = p.UpdatedAt,
                Category = p.Category.Name,
                Image = p.ProductImages.Count > 0 ? Convert.ToBase64String(p.ProductImages.FirstOrDefault().Data) : ""
            };
        }

    }
}

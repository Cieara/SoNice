using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoNice.DAL.Entities
{
    public class Product:BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public int CategoryId { get; set; }
        public int Rating { get; set; }
        public Category Category { get; set; }
        public List<ProductImage> ProductImages { get; set; }
        public bool IsNew { get; set; }
    }
}

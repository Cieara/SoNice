using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoNice.DAL.Entities
{
    public class Discount:BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal DiscountAmount { get; set; }
        public int DiscountType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int ProductId { get; set; }
        public bool Active { get; set; }
        public Product Product { get; set; }
    }
}

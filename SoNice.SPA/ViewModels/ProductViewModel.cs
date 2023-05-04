using SoNice.DAL.Entities;

namespace SoNice.ViewModels
{
    public class ProductViewModel
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public int CategoryId { get; set; }
        public int Rating { get; set; }
        public bool IsNew { get; set; }
        public string Category { get; internal set; }
        public string Image { get; set; }
    }
}

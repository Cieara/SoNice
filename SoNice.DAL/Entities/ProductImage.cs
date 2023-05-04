namespace SoNice.DAL.Entities
{
    public class ProductImage:BaseEntity
    {
        public byte[] Data { get; set; }
        public string Name { get; set; }
        public bool IsFrontPage { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
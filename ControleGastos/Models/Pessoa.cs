using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ControleGastos.Models
{
    public class Pessoa
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; } = string.Empty;

        [Required]
        public int Idade { get; set; }

        public List<Transacao>? Transacoes { get; set; } = new List<Transacao>();
    }

    public class Transacao
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Valor { get; set; }

        [Required]
        public string Tipo { get; set; } = string.Empty;

        [Required]
        public int PessoaId { get; set; }

        [ForeignKey("PessoaId")]
        public Pessoa? Pessoa { get; set; }
    }
}

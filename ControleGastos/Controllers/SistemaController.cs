using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ControleGastos.Data;
using ControleGastos.Models;

namespace ControleGastos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SistemaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SistemaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("pessoas")]
        public async Task<IActionResult> CriarPessoa([FromBody] Pessoa pessoa)
        {
            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();
            return Ok(pessoa);
        }

        [HttpGet("pessoas")]
        public async Task<IActionResult> ListarPessoas()
        {
            var pessoas = await _context.Pessoas.ToListAsync();
            return Ok(pessoas);
        }

        [HttpDelete("pessoas/{id}")]
        public async Task<IActionResult> DeletarPessoa(int id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);
            if (pessoa == null) return NotFound("Pessoa nao encontrada.");

            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();
            return Ok("Pessoa e suas transacoes foram removidas.");
        }

        [HttpPost("transacoes")]
        public async Task<IActionResult> CriarTransacao([FromBody] Transacao transacao)
        {
            var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);
            if (pessoa == null) return BadRequest("A pessoa informada nao existe.");

            if (pessoa.Idade < 18 && transacao.Tipo.ToLower() == "receita")
            {
                return BadRequest("Menores de idade so podem registrar despesas.");
            }

            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();
            return Ok(transacao);
        }

        [HttpGet("transacoes")]
        public async Task<IActionResult> ListarTransacoes()
        {
            var transacoes = await _context.Transacoes.ToListAsync();
            return Ok(transacoes);
        }

        [HttpGet("totais")]
        public async Task<IActionResult> ConsultarTotais()
        {
            var pessoas = await _context.Pessoas.Include(p => p.Transacoes).ToListAsync();

            var resumoPorPessoa = pessoas.Select(p => {
                var receitas = p.Transacoes?.Where(t => t.Tipo.ToLower() == "receita").Sum(t => t.Valor) ?? 0;
                var despesas = p.Transacoes?.Where(t => t.Tipo.ToLower() == "despesa").Sum(t => t.Valor) ?? 0;
                return new {
                    p.Id,
                    p.Nome,
                    TotalReceitas = Math.Round(receitas, 2),
                    TotalDespesas = Math.Round(despesas, 2),
                    Saldo = Math.Round(receitas - despesas, 2)
                };
            }).ToList();

            var totalGeralReceitas = resumoPorPessoa.Sum(x => x.TotalReceitas);
            var totalGeralDespesas = resumoPorPessoa.Sum(x => x.TotalDespesas);

            return Ok(new {
                ResumoPorPessoa = resumoPorPessoa,
                TotalGeral = new {
                    Receitas = Math.Round(totalGeralReceitas, 2),
                    Despesas = Math.Round(totalGeralDespesas, 2),
                    SaldoLiquido = Math.Round(totalGeralReceitas - totalGeralDespesas, 2)
                }
            });
        }
    }
}


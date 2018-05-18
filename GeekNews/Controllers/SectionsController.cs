using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GeekNews.Models;
using Microsoft.AspNetCore.Authorization;

namespace GeekNews.Controllers
{
    [Produces("application/json")]
    [Route("api/Sections")]
    public class SectionsController : Controller
    {
        private readonly NewsBaseContext _context;

        public SectionsController(NewsBaseContext context)
        {
            _context = context;
        }

        // GET: api/Sections
        [HttpGet]
        public IEnumerable<Section> GetSection()
        {
            return _context.Section;
        }

        // GET: api/Sections/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSection([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var section = await _context.Section.SingleOrDefaultAsync(m => m.SectionId == id);

            if (section == null)
            {
                return NotFound();
            }

            return Ok(section);
        }

        // PUT: api/Sections/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutSection([FromRoute] int id, [FromBody] Section section)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != section.SectionId)
            {
                return BadRequest();
            }

            _context.Entry(section).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SectionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sections
        [HttpPost]
        public async Task<IActionResult> PostSection([FromBody] Section section)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Section.Add(section);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSection", new { id = section.SectionId }, section);
        }

        // DELETE: api/Sections/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteSection([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var section = await _context.Section.SingleOrDefaultAsync(m => m.SectionId == id);
            if (section == null)
            {
                return NotFound();
            }

            _context.Section.Remove(section);
            await _context.SaveChangesAsync();

            return Ok(section);
        }

        private bool SectionExists(int id)
        {
            return _context.Section.Any(e => e.SectionId == id);
        }
    }
}
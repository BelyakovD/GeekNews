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
    [Route("api/UserLikes")]
    public class UserLikesController : Controller
    {
        private readonly NewsBaseContext _context;

        public UserLikesController(NewsBaseContext context)
        {
            _context = context;
        }

        // GET: api/UserLikes
        [HttpGet]
        public IEnumerable<UserLikes> GetUserLikes()
        {
            return _context.UserLikes;
        }

        // GET: api/UserLikes/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserLikes([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userLikes = await _context.UserLikes.SingleOrDefaultAsync(m => m.ID == id);

            if (userLikes == null)
            {
                return NotFound();
            }

            return Ok(userLikes);
        }

        // PUT: api/UserLikes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserLikes([FromRoute] int id, [FromBody] UserLikes userLikes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userLikes.ID)
            {
                return BadRequest();
            }

            _context.Entry(userLikes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserLikesExists(id))
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

        // POST: api/UserLikes
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostUserLikes([FromBody] UserLikes userLikes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.UserLikes.Add(userLikes);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserLikes", new { id = userLikes.ID }, userLikes);
        }

        // DELETE: api/UserLikes/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUserLikes([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userLikes = await _context.UserLikes.SingleOrDefaultAsync(m => m.ID == id);
            if (userLikes == null)
            {
                return NotFound();
            }

            _context.UserLikes.Remove(userLikes);
            await _context.SaveChangesAsync();

            return Ok(userLikes);
        }

        private bool UserLikesExists(int id)
        {
            return _context.UserLikes.Any(e => e.ID == id);
        }
    }
}
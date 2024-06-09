using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MetroNav;
using MetroNav.Models;
using System.Diagnostics;
using MetroNav.ViewModels;

namespace MetroNav.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainsController : ControllerBase
    {
        private readonly AppContext _context;

        public TrainsController(AppContext context)
        {
            _context = context;
        }

        // GET: api/Trains
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Train>>> GetTrains()
        {
            return await _context.Trains.ToListAsync();
        }

        // GET: api/Trains/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Train>> GetTrain(int id)
        {
            var train = await _context.Trains.FindAsync(id);

            if (train == null)
            {
                return NotFound();
            }

            return train;
        }

        // PUT: api/Trains/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrain(int id, Train train)
        {
            if (id != train.Id)
            {
                return BadRequest();
            }

            _context.Entry(train).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainExists(id))
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

        // POST: api/Trains
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Train>> PostTrain(Train train)
        {
            _context.Trains.Add(train);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTrain", new { id = train.Id }, train);
        }

        // DELETE: api/Trains/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrain(int id)
        {
            var train = await _context.Trains.FindAsync(id);
            if (train == null)
            {
                return NotFound();
            }

            _context.Trains.Remove(train);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TrainExists(int id)
        {
            return _context.Trains.Any(e => e.Id == id);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchLocation(int id, TrainLocationViewModel model)
        {
            if (id != model.Id)
            {
                return BadRequest();
            }

            var train = await _context.Trains.FindAsync(id);
            if (train == null)
            {
                return NotFound();
            }

            train.CurrentLocationX = model.CurrentLocationX;
            train.CurrentLocationY = model.CurrentLocationY;

            _context.Entry(train).Property(t => t.CurrentLocationX).IsModified = true;
            _context.Entry(train).Property(t => t.CurrentLocationY).IsModified = true;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainExists(id))
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
    }
}

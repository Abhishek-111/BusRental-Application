using BusinessLogicLayer.BusServices;
using BusinessLogicLayer.Modals;
using DataAccessLayer.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusRental.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusController : ControllerBase
    {
        private readonly IBusManager _busManager;

        public BusController(IBusManager BusManager)
        {
            _busManager = BusManager;
        }

        [HttpGet]
        [Route("get-bus")]
        public async Task<IActionResult> GetAllBuss()
        {
            var Buss = await _busManager.GetAllBusDetails();
            return Ok(Buss);
        }

        [HttpPost]
        [Route("add-bus")]
        public async Task<IActionResult> AddBus([FromBody] BusModal BusData)
        {
            var result = await _busManager.AddBus(BusData);
            if(result > 0)
            {
                return Ok(new { message = "Success" });
            }
            return BadRequest();
        }

        [HttpGet]
        [Route("get-a-bus/{id:int}")]
        public async Task<IActionResult> GetBus(int id)
        {
            var bus = await _busManager.GetBusDetail(id);
            return Ok(bus);
        }

        [HttpDelete]
        [Route("delete-a-bus/{id:int}")]
        public async Task<IActionResult> DeleteBus([FromRoute] int id)
        {
            var result = await _busManager.DeleteBus(id);
            if (result > 0)
                return Ok(new { message = "Bus Deleted" });
            return BadRequest(new { message = "Bus not Available" });
        }

        [HttpPut]
        [Route("update-a-bus/{id:int}")]
        public async Task<IActionResult> UpdateCar([FromRoute] int id, BusModal updatedData)
        {
            var result = await _busManager.UpdateBus(id, updatedData);
            if (result > 0)
            {
                return Ok(new { message = "Bus Updated" });
            }
            return BadRequest(new { message = "Update Failed" });
        }

        [HttpPost]
        [Route("rental-agreement")]
        public async Task<IActionResult> RentalAgreement([FromBody] RentalAgreementModal rentalAgreement)
        {
            int result = await _busManager.AddRentalAgreement(rentalAgreement);
            if (result > 0)
            {
                return Ok(new { message = "Agreement Added" });
            }
            else
                return BadRequest(new { message = "An Error Occured"});
        }

        [HttpGet]
        [Route("user-rental-agreement/{userId:int}")]
        public async Task<IActionResult> GetAllUserRentalAgreement(int userId)
        {
            var result = await _busManager.GetUserRentalAgreement(userId);
            if(result != null)
            {
                return Ok(result);
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("return-request")]
        public async Task<IActionResult> ReturnBus([FromBody] BusReturnRequest returnRequest)
        {
            int result = await _busManager.RequestForReturn(returnRequest);
            if(result > 0)
            {
                return Ok(new {message="Request Accepted" });
            }
            return BadRequest();
        }

        [HttpGet]
        [Route("all-agreements")]
        public async Task<IActionResult> GetAllRentalAgreements()
        {
            var result = await _busManager.GetAllRentalAggrements();
            if(result != null)
            {
                return Ok(result);
            }
            return BadRequest();
        }

        [HttpDelete]
        [Route("validate-return-request/{agreementId:int}")]
        public async Task<IActionResult> ValidateReturnRequest(int agreementId)
        {
            var result = await _busManager.ValidateReturnRequest(agreementId);
            if (result > 0)
                return Ok();
            return BadRequest();
        }
        
    }
}

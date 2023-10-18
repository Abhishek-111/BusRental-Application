using DataAccessLayer.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repository
{
    public class BusRepository : IBusRepository
    {
        private readonly BusRentalContext _context = null;
        public BusRepository(BusRentalContext context)
        {
            _context = context;
        }

        public async Task<List<BusDetails>> GetAllBusDetails()
        {
            var allBuss = await _context.BusDetails.ToListAsync();
            //var allBuss = await _context.BusDetails.Where(bus => bus.IsAvailable == true).ToListAsync();
            return allBuss;
        }

        public async Task<int> AddBus(BusDetails newBusDTO)
        {
            await _context.BusDetails.AddAsync(newBusDTO);
            await _context.SaveChangesAsync();
            return newBusDTO.Id;
        }

        public async Task<int> DeleteBus(int id)
        {
            var carToDelete = await _context.BusDetails.FirstOrDefaultAsync(
                car => car.Id == id
                && car.IsAvailable == true);

            if (carToDelete != null)
            {
                _context.BusDetails.Remove(carToDelete);
                await _context.SaveChangesAsync();
                return 1;
            }
            return 0;
        }

        public async Task<int> UpdateBus(int id, BusDetails carDetails)
        {
            var car = await _context.BusDetails.FindAsync(id);
            if (car != null)
            {
                car.Model = carDetails.Model;
                car.Maker = carDetails.Maker;
                car.RentalPrice = carDetails.RentalPrice;
                car.NumberPlate = carDetails.NumberPlate;
                car.Image = carDetails.Image;
                //car.IsAvailable = carDetails.IsAvailable;

                await _context.SaveChangesAsync();
                return 1;
            }
            return 0;
        }

        public async Task<BusDetails> GetBusDetail(int id)
        {
            var bus = await _context.BusDetails.FirstOrDefaultAsync(x => x.Id == id);
            return bus;
        }

        public async Task<List<UserRentalAgreement>> GetUserRentalAgreement(int userId)
        {
            var userAgreement = new List<UserRentalAgreement>();
            var allBookedBuss = new List<BusDetails>();
            var vehicleIds = new List<int>();
            var rentalDuration = new List<int>();
            var totalCost = new List<decimal>();
            var dateOfAgreement = new List<DateTime>();

            var aggrement = await _context.RentalAgreement.Where(x => x.UserId == userId && x.RequestForReturn == false)
                .Select(x => new { x.RentalDuration,x.TotalCost,x.VehicleId,x.RequestForReturn,x.ValidateReturnRequest,x.DateAdded})
                .ToListAsync();
            if(aggrement != null)
            {
                foreach(var item in aggrement)
                {
                    vehicleIds.Add(item.VehicleId);
                    rentalDuration.Add(item.RentalDuration);
                    totalCost.Add(item.TotalCost);
                    dateOfAgreement.Add(item.DateAdded);
                }

                // search Buss 
                foreach(var id in vehicleIds)
                {
                    var oneOfBus = await _context.BusDetails.FindAsync(id);
                    allBookedBuss.Add(oneOfBus);
                }

                // user detail
                //var userDetail = _context.User.FindAsync(userId);
                if(allBookedBuss != null)
                {
                    int respectiveItem = 0;
                    foreach(var bus in allBookedBuss)
                    {
                        userAgreement.Add(new UserRentalAgreement()
                        {
                            BusId = vehicleIds[respectiveItem],
                            Model = bus.Model,
                            Maker = bus.Maker,
                            RentalDuration = rentalDuration[respectiveItem],
                            TotalCost = totalCost[respectiveItem],
                            AgreementDate = dateOfAgreement[respectiveItem++]
                            

                        }) ;
                    }
                    return userAgreement;
                }

            }
            return null;
        }

        public async Task<List<RentalDetails>> GetAllRentalAggrements()
        {
            var Buss = new List<BusDetails>();
            var users = new List<User>();
            var rentalDetails = new List<RentalDetails>();
            var personIds = new List<int>();
            var vehicleIds = new List<int>();
            var allAggrements = await _context.RentalAgreement.ToListAsync();
            if(allAggrements != null)
            {
                foreach(var agreement in allAggrements)
                {
                    personIds.Add(agreement.UserId);
                    vehicleIds.Add(agreement.VehicleId);
                }

                // search Buss 
                foreach (var id in vehicleIds)
                {
                    var oneOfBus = await _context.BusDetails.FindAsync(id);
                    Buss.Add(oneOfBus);
                }

                foreach(var id in personIds)
                {
                    var oneUser = await _context.User.FindAsync(id);
                    users.Add(oneUser);

                }

                if(Buss != null && users != null)
                {
                    int respective = 0;
                    foreach (var agreement in allAggrements)
                    {
                        rentalDetails.Add(new RentalDetails()
                        {
                            AgreementId = agreement.Id,
                            BusId = agreement.VehicleId,
                            UserId = agreement.UserId,
                            UserName = users[respective].UserName,
                            UserPhone = users[respective].Phone,
                            BusModel = Buss[respective].Model,
                            BusMaker = Buss[respective++].Maker,
                            RentalDuration = agreement.RentalDuration,
                            TotalCost = agreement.TotalCost,
                            RequestForReturn = agreement.RequestForReturn,
                            ValidateReturnRequest = agreement.ValidateReturnRequest,
                            BookingDate = agreement.DateAdded

                        });
                    }
                    return rentalDetails;
                }

            }
            return null;
        }

        public async Task<int> AddRentalAgreement(RentalAgreement rentalAgreementDTO)
        {
            await _context.RentalAgreement.AddAsync(rentalAgreementDTO);
            await _context.SaveChangesAsync();
            // Updating selected bus as not available
            var bus = await _context.BusDetails.FirstOrDefaultAsync(x => x.Id == rentalAgreementDTO.VehicleId);
            bus.IsAvailable = false;
            await _context.SaveChangesAsync();
            return rentalAgreementDTO.Id;
        }

        public async Task<int> RequestForReturn(BusReturnRequest returnRequest)
        {
            var rentalData = await _context.RentalAgreement
                .Where(person => person.UserId == returnRequest.UserId && person.VehicleId == returnRequest.BusId)
                .ToListAsync();
            if (rentalData!= null && rentalData.Any())
            {
                //Updating the RequestForReturn to false for matching records
                foreach(var agreement in rentalData)
                {
                    agreement.RequestForReturn = true;
                }
                await _context.SaveChangesAsync();
                 //_context.RentalAgreement.RemoveRange(rentalData);
                
                //await _context.SaveChangesAsync();
                // Updating bus as Available
                //var bus = await _context.BusDetails.FirstOrDefaultAsync(bus => bus.Id == returnRequest.BusId);
                //bus.IsAvailable = true;
                //await _context.SaveChangesAsync();
                return 1;
            }
            return 0;
        }

        public async Task<int> ValidateReturnRequest(int agreementId)
        {
            var result = await _context.RentalAgreement.FindAsync(agreementId);
            result.ValidateReturnRequest = true;
        
            // searching the vehicle and updating isAvailable as true;
            var vehicleId = await _context.BusDetails.FindAsync(result.VehicleId);
            vehicleId.IsAvailable = true;
            await _context.SaveChangesAsync();
            return result.Id;
        }

    }
}

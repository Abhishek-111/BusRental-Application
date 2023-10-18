using BusinessLogicLayer.Modals;
using DataAccessLayer.Data;
using DataAccessLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.BusServices
{
    public class BusManager : IBusManager
    {
        private readonly IBusRepository _BusRepository;
        public BusManager(IBusRepository BusRepository)
        {
            _BusRepository = BusRepository;
        }

        public async Task<List<BusModal>> GetAllBusDetails()
        {
            var Buss = new List<BusModal>();
            var allBuss = await _BusRepository.GetAllBusDetails();
            if (allBuss?.Any() == true)
            {
                foreach (var bus in allBuss)
                {
                    Buss.Add(new BusModal()
                    {
                        Id = bus.Id,
                        NumberPlate = bus.NumberPlate,
                        Maker = bus.Maker,
                        Model = bus.Model,
                        RentalPrice = bus.RentalPrice,
                        IsAvailable = bus.IsAvailable,
                        Image = bus.Image
                    });
                }
            }
            return Buss;
        }

        public async Task<int> AddBus(BusModal BusData)
        {
            var newBusData = new BusDetails()
            {
                NumberPlate = BusData.NumberPlate,
                Maker = BusData.Maker,
                Model = BusData.Model,
                Image = BusData.Image,
                RentalPrice = BusData.RentalPrice,
                IsAvailable = true,
                DateAdded = DateTime.Now,
            };

           return await _BusRepository.AddBus(newBusData);

        }
        public async Task<int> UpdateBus(int id, BusModal busData)
        {
            var carToUpdate = new BusDetails()
            {
                NumberPlate = busData.NumberPlate,
                Maker = busData.Maker,
                Model = busData.Model,
                Image = busData.Image,
                RentalPrice = busData.RentalPrice,
                IsAvailable = true,
                //DateAdded = DateTime.Now,
            };
            return await _BusRepository.UpdateBus(id, carToUpdate);
        }

        public async Task<int> DeleteBus(int carId)
        {
            return await _BusRepository.DeleteBus(carId);
        }

        public async Task<BusModal> GetBusDetail(int id)
        {
            if (id > 0)
            {
                var result = await _BusRepository.GetBusDetail(id);
                var BusDetail = new BusModal()
                {
                    Id = result.Id,
                    NumberPlate = result.NumberPlate,
                    Maker = result.Maker,
                    Model = result.Model,
                    RentalPrice = result.RentalPrice,
                    IsAvailable = result.IsAvailable,
                    Image = result.Image

                };
                return BusDetail;
            }
            return null;
            
        }

        public async Task<List<UserRentalAgreement>> GetUserRentalAgreement(int userId)
        {
           return await _BusRepository.GetUserRentalAgreement(userId);
        }

        public async Task<int> AddRentalAgreement(RentalAgreementModal rentalAgreement)
        {
            var rentalAgreementData = new RentalAgreement()
            {
                UserId = rentalAgreement.UserId,
                VehicleId = rentalAgreement.VehicleId,
                RentalDuration = rentalAgreement.RentalDuration,
                TotalCost = rentalAgreement.TotalCost,
                RequestForReturn = false,
                ValidateReturnRequest = false,
                DateAdded = DateTime.Now
            };
            return await _BusRepository.AddRentalAgreement(rentalAgreementData);
        }

        public async Task<int> RequestForReturn(BusReturnRequest returnRequest)
        {
            return await _BusRepository.RequestForReturn(returnRequest);
        }

        public async Task<List<RentalDetails>> GetAllRentalAggrements()
        {
            return await _BusRepository.GetAllRentalAggrements();
        }
        public async Task<int> ValidateReturnRequest(int agreementId)
        {
            return await _BusRepository.ValidateReturnRequest(agreementId);
        }
    }
}

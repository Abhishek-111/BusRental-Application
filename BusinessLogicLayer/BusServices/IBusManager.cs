using BusinessLogicLayer.Modals;
using DataAccessLayer.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogicLayer.BusServices
{
    public interface IBusManager
    {
        Task<List<BusModal>> GetAllBusDetails();
        Task<BusModal> GetBusDetail(int id);
        //Task<List<RentalAgreementModal>> GetUserRentalAgreement(int userId);
        Task<List<UserRentalAgreement>> GetUserRentalAgreement(int userId);
        Task<int> UpdateBus(int id, BusModal busData);
        Task<int> DeleteBus(int carId);
        Task<int> AddRentalAgreement(RentalAgreementModal rentalAgreement);
        Task<int> RequestForReturn(BusReturnRequest returnRequest);
        Task<List<RentalDetails>> GetAllRentalAggrements();
        Task<int> ValidateReturnRequest(int agreementId);
        Task<int> AddBus (BusModal BusData);
    }
}
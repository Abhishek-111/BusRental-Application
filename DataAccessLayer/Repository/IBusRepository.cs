using DataAccessLayer.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataAccessLayer.Repository
{
    public interface IBusRepository
    {
        Task<List<BusDetails>> GetAllBusDetails();
        Task<BusDetails> GetBusDetail(int id);
        Task<List<RentalDetails>> GetAllRentalAggrements();
        Task<int> AddBus(BusDetails newBusDTO);
        Task<int> UpdateBus(int id, BusDetails carDetails);
        Task<int> DeleteBus(int id);
        Task<int> AddRentalAgreement(RentalAgreement rentalAgreementDTO);
        Task<List<UserRentalAgreement>> GetUserRentalAgreement(int userId);
        Task<int> RequestForReturn(BusReturnRequest returnRequest);
        Task<int> ValidateReturnRequest(int agreementId);
    }
}
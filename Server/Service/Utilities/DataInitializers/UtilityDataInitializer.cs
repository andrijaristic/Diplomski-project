using Domain.Enums;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Utilities.DataInitializers;
using Domain.Models;
using Domain.Models.AppSettings;
using Microsoft.Extensions.Options;

namespace Service.Utilities.DataInitializers
{
    public class UtilityDataInitializer : IAmenityDataInitializer
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IOptions<AppSettings> _settings;

        public UtilityDataInitializer(IUnitOfWork unitOfWork, IOptions<AppSettings> settings)
        {
            _unitOfWork = unitOfWork;
            _settings = settings;
        }
        public void InitializeData()
        {
            Task<IEnumerable<Amenity>> task = _unitOfWork.Amenities.GetAll();
            task.Wait();

            List<AccommodationAmenities> propertyUtilities = Enum.GetValues<AccommodationAmenities>().ToList();
            if (task.Result.Count() == propertyUtilities.Count)
            {
                return;
            }

            foreach (var util in propertyUtilities)
            {
                if (task.Result.Any(x => x.AccommodationAmenity == util))
                {
                    continue;
                }

                Amenity newPropertyUtility = new Amenity()
                {
                    AccommodationAmenity = util
                };

                _unitOfWork.Amenities.Add(newPropertyUtility).Wait();
                _unitOfWork.Save().Wait();
            }
        }
    }
}

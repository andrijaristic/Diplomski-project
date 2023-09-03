using Microsoft.Extensions.Options;
using Domain.Enums;
using Domain.Models;
using Domain.Models.AppSettings;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Utilities.DataInitializers;

namespace Service.Utilities.DataInitializers
{
    public class UtilityDataInitializer : IUtilityDataInitializer
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
            Task<IEnumerable<PropertyUtility>> task = _unitOfWork.PropertyUtilities.GetAll();
            task.Wait();

            List<PropertyUtilities> propertyUtilities = Enum.GetValues<PropertyUtilities>().ToList();
            if (task.Result.Count() == propertyUtilities.Count)
            {
                return;
            }

            foreach (var util in propertyUtilities)
            {
                if (task.Result.Any(x => x.Utility == util))
                {
                    continue;
                }

                PropertyUtility newPropertyUtility = new PropertyUtility()
                {
                    Utility = util
                };

                _unitOfWork.PropertyUtilities.Add(newPropertyUtility).Wait();
                _unitOfWork.Save().Wait();
            }
        }
    }
}

using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Api
{
    public class ValuesController : Controller
    {
        private IValuesRepository valuesRepository;

        public ValuesController(IValuesRepository valuesRepository)
        {
            this.valuesRepository = valuesRepository;
        }

        [HttpGet]
        [Route("api/values")]
        public IActionResult GetValues()
        {
          var values = this.valuesRepository.GetValues();
          return new ObjectResult(values);
        }
    }
}

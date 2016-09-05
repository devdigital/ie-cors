using System;
using System.Collections.Generic;

namespace Api
{
  public interface IValuesRepository
  {
    IEnumerable<Value> GetValues();
  }
}

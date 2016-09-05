using System;
using System.Collections.Generic;

namespace Api
{
  public class DefaultValuesRepository : IValuesRepository
  {
    public IEnumerable<Value> GetValues()
    {
      return new List<Value>
      {
        new Value(1),
        new Value(3),
        new Value(5),
        new Value(8)
      };
    }
  }
}

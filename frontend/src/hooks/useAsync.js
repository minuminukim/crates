import { useCallback, useEffect, useState } from 'react';

const useAsync = (asyncFunction, shouldExecute = true) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const callback = useCallback(() => {
    setStatus('pending');
    setData(null);
    setError(null);

    return asyncFunction()
      .then((response) => {
        setData(response);
        setStatus('fulfilled');
      })
      .catch((error) => {
        setError(error);
        setStatus('rejected');
      });
  }, [asyncFunction]);

  // useEffect(() => {
  //   if (predicateFunction()) {
  //     execute();
  //   }
  // }, [callback, shouldExecute]);

  return { callback, status, data, error };
};

export default useAsync;

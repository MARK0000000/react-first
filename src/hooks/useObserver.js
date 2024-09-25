import React, {useEffect, useRef} from 'react';

export const useObserver = (ref, canload, isLoading, callback) => {
   const observer = useRef();
   useEffect(() => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      var observeFun = function (entries, observer) {
         if (entries[0].isIntersecting && canload) {
            callback()
         }
       };
      observer.current = new IntersectionObserver(observeFun);
      observer.current.observe(ref.current)
   }, [isLoading])
}
